(() => {
  'use strict';
  const $=selector=>document.querySelector(selector);
  const $$=selector=>[...document.querySelectorAll(selector)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let preference=null;
  try { preference=localStorage.getItem('surface-flow-components-motion'); } catch {}
  let paused=preference ? preference==='paused' : reduced.matches;
  const motionButton=$('#sf-motion-toggle');
  if(window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const explorerContexts=new Map();
  function mountExplorer(explorer) {
    if(explorerContexts.has(explorer)) return;
    let context=null;
    if(!paused && window.gsap && window.ScrollTrigger) {
      context=gsap.context(()=>{
        gsap.fromTo(explorer.querySelector('.layer-planes'),{rotationZ:-35},{rotationZ:-15,ease:'none',scrollTrigger:{trigger:explorer,scroller:$('#article-overlay'),start:'top bottom',end:'bottom top',scrub:1.4}});
      },explorer);
    }
    explorerContexts.set(explorer,context);
  }
  function unmountExplorers() {
    explorerContexts.forEach(context=>context?.revert());
    explorerContexts.clear();
  }
  document.addEventListener('portfolio:article-loaded',event=>{
    event.detail.container.querySelectorAll('.sf-knowledge').forEach(mountExplorer);
    window.ScrollTrigger?.refresh();
  });
  document.addEventListener('portfolio:article-shown',()=>window.ScrollTrigger?.refresh());
  document.addEventListener('portfolio:article-close',unmountExplorers);
  document.addEventListener('click',event=>{
    const button=event.target.closest('.sf-knowledge .layer-button, .sf-knowledge .plane');
    if(!button)return;
    const explorer=button.closest('.sf-knowledge');
    const index=button.dataset.layer ?? button.dataset.plane;
    const category=explorer.querySelector(`.layer-button[data-layer="${index}"]`);
    if(!category)return;
    explorer.querySelectorAll('.layer-button').forEach(el=>{
      const selected=el===category;el.classList.toggle('active',selected);el.setAttribute('aria-pressed',String(selected));
    });
    explorer.querySelectorAll('.plane').forEach(el=>{
      const selected=el.dataset.plane===index;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));
    });
    explorer.querySelectorAll('.layer-panel').forEach(el=>el.hidden=el.id!==category.getAttribute('aria-controls'));
    const panel=explorer.querySelector('#'+category.getAttribute('aria-controls'));
    if(!paused && window.gsap) gsap.fromTo(panel,{opacity:.3,y:12},{opacity:1,y:0,duration:.45,clearProps:'all',overwrite:true});
    window.ScrollTrigger?.refresh();
  });
  const dialog=$('#media-dialog'),video=dialog.querySelector('video');
  $('#watch-prototype').addEventListener('click',()=>{
    dialog.showModal();video.play().catch(()=>{});
  });
  $('#close-media').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  dialog.addEventListener('close',()=>{video.pause();$('#watch-prototype').focus();});
  // Let the walkthrough handle Escape without closing a separate article underneath it.
  dialog.addEventListener('keydown',event=>{if(event.key==='Escape')event.stopPropagation();});
  function updateMotion() {
    motionButton.textContent=paused?'Resume animations ▷':'Pause animations Ⅱ';
    motionButton.setAttribute('aria-pressed',String(paused));
    updateBonsaiMotion();updateCanvasLoop();
    const openExplorers=[...explorerContexts.keys()];unmountExplorers();openExplorers.forEach(mountExplorer);
  }
  motionButton.addEventListener('click',()=>{
    paused=!paused;preference=paused?'paused':'enabled';
    try { localStorage.setItem('surface-flow-components-motion',preference); } catch {}
    updateMotion();
  });
  reduced.addEventListener('change',()=>{if(!preference){paused=reduced.matches;updateMotion();}});
  // Keep the showreel canvas independent of the explanatory hero.
  const reelCanvas=$('#reel-canvas'), reel=reelCanvas.getContext('2d');
  let reelWidth=1,reelHeight=1,reelVisible=false,canvasFrame=null,time=0,lastFrame=0;
  function resizeCanvases(){
    const ratio=Math.min(devicePixelRatio||1,1.6), rect=reelCanvas.getBoundingClientRect();
    reelWidth=rect.width;reelHeight=rect.height;
    reelCanvas.width=Math.max(1,Math.round(rect.width*ratio));reelCanvas.height=Math.max(1,Math.round(rect.height*ratio));
    reel?.setTransform(ratio,0,0,ratio,0,0);drawCanvases();
  }
  function drawCanvases(){
    if(reel&&reelVisible){
      reel.clearRect(0,0,reelWidth,reelHeight);
      for(let i=0;i<46;i++){
        reel.beginPath();reel.lineWidth=i%7===0?1.4:.7;
        reel.strokeStyle=`rgba(${110+i},${127+i},255,${.1+(i%8)*.035})`;
        for(let x=0;x<=reelWidth+8;x+=8){
          const normal=x/reelWidth;
          const wave=Math.sin(normal*6.7+time*.5+i*.075)*Math.sin(normal*2.9+time*.13);
          const y=reelHeight*.45+i*4+wave*(reelHeight*.33)*(normal*.8+.2);
          if(x===0)reel.moveTo(x,y);else reel.lineTo(x,y);
        }
        reel.stroke();
      }
    }
  }
  function tick(stamp){
    canvasFrame=null;
    if(paused||document.hidden||!reelVisible)return;
    if(stamp-lastFrame>30){time+=Math.min((stamp-lastFrame)/1000,.06);lastFrame=stamp;drawCanvases();}
    canvasFrame=requestAnimationFrame(tick);
  }
  function updateCanvasLoop(){
    if(canvasFrame)cancelAnimationFrame(canvasFrame);
    canvasFrame=null;drawCanvases();
    if(!paused&&!document.hidden&&reelVisible)canvasFrame=requestAnimationFrame(tick);
  }
  const canvasObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{reelVisible=entry.isIntersecting;});
    updateCanvasLoop();
  });
  canvasObserver.observe(reelCanvas);
  new ResizeObserver(resizeCanvases).observe(reelCanvas.parentElement);
  document.addEventListener('visibilitychange',updateCanvasLoop);
  const stagePanels = $$('[data-stage-copy]');
  const branchStart = .72, stageDuration = .9, stageReveal = .8;
  const stageTimes = [0, ...Array.from({length:6}, (_,i) => branchStart+i*stageDuration+stageReveal+.02)];
  const treeViewport = $('.bonsai-viewport'), treeTurntable = $('.bonsai-turntable');
  // Reserve room for the controls as the larger text wraps across viewport sizes.
  const treeFigure = $('#hero-art'), treeDetail = $('#bonsai-detail');
  const treeStory = treeFigure.closest('.sf-bonsai-story');
  function fitTreeReadingArea() {
    if (!treeFigure || !treeDetail) return;
    const figureStyle = getComputedStyle(treeFigure);
    const inset = 82;
    // Measure normal-flow content, independent of the sticky offset.
    const contentHeight = $('.bonsai-view-controls').getBoundingClientRect().bottom - treeFigure.getBoundingClientRect().top + (parseFloat(figureStyle.paddingBottom) || 0);
    const fixedHeight = contentHeight - treeDetail.offsetHeight;
    treeDetail.style.maxHeight = `${Math.max(90, Math.floor(innerHeight - inset - fixedHeight - 16))}px`;
    // A tall figure must scroll normally on small/landscape screens; never trap content
    // behind the fixed site navigation. A few pixels of top adjustment handles near fits.
    const flowing=treeFigure.offsetHeight>innerHeight-inset-16+24;
    treeStory.classList.toggle('is-flowing',flowing);
    treeStory.style.setProperty('--bonsai-top', `${flowing?inset:Math.min(inset, innerHeight-treeFigure.offsetHeight-16)}px`);
  }
  new ResizeObserver(fitTreeReadingArea).observe(treeFigure);
  addEventListener('resize', fitTreeReadingArea, {passive:true});
  let growth, growthScrub, scrollFrame, stageNavigation, bonsai3D, selectedStage = -1;
  let navigationStage = null, treeDrag = null, suppressTreeClickUntil = 0;
  const treeRotation = {x:0,y:0};
  const treeOrbit = {tilt:0,turn:0};
  let treeSelectionMotion = null;
  function renderTreeRotation() {
    const x=treeRotation.x+treeOrbit.tilt, y=treeRotation.y+treeOrbit.turn;
    if (bonsai3D) bonsai3D.setRotation(x,y);
    else if (window.gsap) gsap.set(treeTurntable,{rotationX:x,rotationY:y,force3D:true});
    else treeTurntable.style.transform=`rotateX(${x}deg) rotateY(${y}deg)`;
  }
  function tiltTree(direction) {
    treeSelectionMotion?.kill();
    treeSelectionMotion = null;
    if (paused || !window.gsap || treeDrag?.active) return;
    // A small change of angle reveals depth, then returns to the visitor's viewpoint.
    // Retarget from the current pose so quick selections never accumulate rotation.
    treeSelectionMotion=gsap.timeline({onUpdate:renderTreeRotation,onComplete:()=>{
      treeOrbit.turn=0;treeOrbit.tilt=0;treeSelectionMotion=null;renderTreeRotation();
    }}).to(treeOrbit,{tilt:5*direction,turn:8*direction,duration:.4,ease:'power2.out'})
      .to(treeOrbit,{tilt:0,turn:0,duration:.85,ease:'power2.inOut'});
  }
  function takeTreeControl() {
    treeSelectionMotion?.kill();treeSelectionMotion=null;
    treeRotation.x+=treeOrbit.tilt;
    treeRotation.y+=treeOrbit.turn;
    treeOrbit.tilt=0;treeOrbit.turn=0;
    window.gsap?.killTweensOf(treeRotation);
    renderTreeRotation();
  }
  function selectStage(index, {fromClick=false}={}) {
    if (selectedStage === index) {
      if (fromClick) tiltTree(1);
      return;
    }
    const previousStage=selectedStage;
    selectedStage = index;
    $('#bonsai-step').textContent = `0${index+1} / ${stagePanels[index].dataset.stageTitle}`;
    stagePanels.forEach((panel,i)=>{panel.hidden=i!==index;});
    $('#bonsai-detail').scrollTop=0;
    $$('[data-stage], [data-tree-stage]').forEach(control => {
      const stage = Number(control.dataset.stage ?? control.dataset.treeStage);
      control.setAttribute('aria-pressed', String(stage===index));
    });
    $('.judgement').classList.toggle('is-current', index===0);
    $$('.tuft').forEach((tuft,i) => tuft.classList.toggle('is-current', i===index-1));
    bonsai3D?.setActive(index);
    if (previousStage>=0) tiltTree(fromClick ? 1 : index>previousStage ? 1 : -1);
  }
  function selectGrowingStage() {
    bonsai3D?.sync();
    if (!growth || navigationStage !== null) return;
    const index = Math.floor((growth.time()-branchStart)/stageDuration)+1;
    selectStage(Math.min(6, Math.max(0, index)));
  }
  function stopStageNavigation() {
    if (navigationStage===null) return;
    stageNavigation?.kill();
    growthScrub?.kill();
    stageNavigation = null;
    navigationStage = null;
    selectGrowingStage();
  }
  function resetTreeDrag() {
    const pointerId = treeDrag?.pointerId;
    treeDrag = null;
    treeViewport?.classList.remove('is-dragging');
    if (pointerId !== undefined && treeViewport?.hasPointerCapture(pointerId)) treeViewport.releasePointerCapture(pointerId);
    window.gsap?.killTweensOf(treeRotation);
    treeSelectionMotion?.kill();treeSelectionMotion=null;
    treeOrbit.tilt=0;treeOrbit.turn=0;
    treeRotation.x=0;treeRotation.y=0;
    renderTreeRotation();
  }
  function initBonsai() {
    if (!window.gsap) { treeStory.style.setProperty('--bonsai-scroll','0px');selectStage(0); return; }
    // Build growth once. Motion preferences must never tear down or recreate page layout.
    gsap.context(() => {
      growth = gsap.timeline({paused:true, onUpdate:selectGrowingStage});
      // Reveal the trunk in place so its junction stays connected to every branch.
      growth.fromTo('.trunk-reveal', {attr:{y:460, height:0}}, {attr:{y:230, height:230}, duration:branchStart, ease:'none'}, 0);
      for (let i=0;i<6;i++) {
        const start = branchStart+i*stageDuration;
        growth.fromTo(`.branch-${i}`, {strokeDasharray:1, strokeDashoffset:1, opacity:0}, {strokeDashoffset:0, opacity:1, duration:.64, ease:'none'}, start);
        growth.fromTo(`[data-tuft="${i}"] .tuft-growth`, {scale:0, opacity:0, transformOrigin:'50% 100%'}, {scale:1, opacity:1, duration:.45, ease:'power2.out'}, start+.35);
        growth.addLabel(`stage-${i+1}`, stageTimes[i+1]);
      }
      // A short hold after each reveal keeps navigation clear of the next stage.
      growth.to({}, {duration:.12}, branchStart+5*stageDuration+stageReveal);
    }, treeFigure);
    if (paused) { growth.progress(1,true);selectStage(0); }
    else syncTreeScroll(true);
  }
  function treeScrollBounds() {
    const rect=treeStory.getBoundingClientRect();
    if(treeStory.classList.contains('is-flowing')) {
      return {start:scrollY+rect.top-innerHeight*.65,distance:rect.height+innerHeight*.3};
    }
    const inset=parseFloat(getComputedStyle(treeFigure).top) || 0;
    // Read the live layout, including every frame of the expanding career accordion.
    const start=scrollY+rect.top-inset;
    const distance=Math.max(1,treeStory.clientHeight-treeFigure.offsetHeight);
    return {start,distance};
  }
  function syncTreeScroll(immediate=false) {
    if (!growth || paused || navigationStage!==null) return;
    const {start,distance}=treeScrollBounds();
    const progress=Math.max(0,Math.min(1,(scrollY-start)/distance));
    growthScrub?.kill();
    if (immediate) growth.progress(progress);
    else growthScrub=gsap.to(growth,{progress,duration:.5,ease:'power1.out',overwrite:true});
  }
  function queueTreeScroll() {
    if (scrollFrame) return;
    scrollFrame=requestAnimationFrame(()=>{scrollFrame=null;syncTreeScroll();});
  }
  function updateBonsaiMotion() {
    bonsai3D?.setMotionEnabled(!paused);
    stopStageNavigation();
    growthScrub?.kill();
    if (paused) {
      // Freeze automatic motion without changing the sticky bounds or the visitor's viewpoint.
      takeTreeControl();
    } else syncTreeScroll();
  }
  function activateStage(index) {
    if (!Number.isInteger(index) || index<0 || index>=stagePanels.length) return;
    stopStageNavigation();
    selectStage(index, {fromClick:true});
    if (growth && !paused) {
      const targetTime = stageTimes[index];
      if(treeStory.classList.contains('is-flowing')) {
        // On a short screen, change the selected practice without moving it out of view.
        navigationStage=index;
        growthScrub?.kill();
        stageNavigation=gsap.to(growth,{time:targetTime,duration:.75,ease:'power2.inOut',overwrite:true,
          onComplete:()=>{stageNavigation=null;navigationStage=null;}});
        return;
      }
      const {start,distance}=treeScrollBounds();
      const targetTop = start+distance*(targetTime/growth.duration());
      const position = {top:scrollY};
      navigationStage = index;
      growthScrub?.kill();
      growthScrub=gsap.to(growth,{time:targetTime,duration:.75,ease:'power2.inOut',overwrite:true});
      stageNavigation = gsap.to(position, {
        top:targetTop, duration:.75, ease:'power2.inOut',
        onUpdate:() => window.scrollTo({top:position.top, behavior:'instant'}),
        onComplete:() => {
          growth?.time(targetTime);
          stageNavigation = null;
          navigationStage = null;
          selectStage(index);
        }
      });
    }
  }
  $$('[data-stage], [data-tree-stage]').forEach(control => {
    const activate = () => activateStage(Number(control.dataset.stage ?? control.dataset.treeStage));
    control.addEventListener('click', activate);
    if (control.hasAttribute('data-tree-stage')) control.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      if (!event.repeat) activate();
    });
  });
  // User scrolling takes ownership immediately, including during stage navigation.
  addEventListener('wheel', stopStageNavigation, {passive:true});
  addEventListener('touchstart', stopStageNavigation, {passive:true});
  addEventListener('keydown', event => {
    if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key) && !event.target.closest('[data-tree-stage], [data-stage]')) stopStageNavigation();
  });
  if (treeViewport && treeTurntable) {
    treeViewport.addEventListener('pointerdown', event => {
      suppressTreeClickUntil = 0;
      if (!event.isPrimary || event.button!==0) return;
      window.gsap?.killTweensOf(treeRotation);
      treeDrag = {pointerId:event.pointerId, x:event.clientX, y:event.clientY, active:false, rotationX:treeRotation.x, rotationY:treeRotation.y};
    });
    treeViewport.addEventListener('pointermove', event => {
      if (!treeDrag || treeDrag.pointerId!==event.pointerId) return;
      const dx = event.clientX-treeDrag.x, dy = event.clientY-treeDrag.y;
      if (!treeDrag.active) {
        if (Math.hypot(dx,dy)<6) return;
        treeDrag.active = true;
        stopStageNavigation();
        takeTreeControl();
        treeDrag.rotationX=treeRotation.x;treeDrag.rotationY=treeRotation.y;
        treeViewport.setPointerCapture(event.pointerId);
        treeViewport.classList.add('is-dragging');
      }
      if (event.cancelable) event.preventDefault();
      const sensitivity=100/Math.max(280,treeViewport.clientWidth);
      treeRotation.y=treeDrag.rotationY+dx*sensitivity;
      treeRotation.x=Math.max(-80,Math.min(80,treeDrag.rotationX+dy*sensitivity));
      renderTreeRotation();
    });
    function releaseTree(event) {
      if (!treeDrag || (event.pointerId!==undefined && treeDrag.pointerId!==event.pointerId)) return;
      const {active, pointerId} = treeDrag;
      treeDrag = null;
      treeViewport.classList.remove('is-dragging');
      if (treeViewport.hasPointerCapture(pointerId)) treeViewport.releasePointerCapture(pointerId);
      if (!active) return;
      suppressTreeClickUntil = performance.now()+500;
      // Retain the chosen viewpoint so depth can be explored and compared.
    }
    addEventListener('pointerup', releaseTree);
    addEventListener('pointercancel', releaseTree);
    addEventListener('blur', releaseTree);
    treeViewport.addEventListener('lostpointercapture', releaseTree);
    treeViewport.addEventListener('click', event => {
      if (performance.now()<suppressTreeClickUntil) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    treeViewport.addEventListener('keydown',event=>{
      if(event.target!==treeViewport)return;
      const deltas={ArrowLeft:[0,-8],ArrowRight:[0,8],ArrowUp:[-8,0],ArrowDown:[8,0]};
      if(event.key==='Home'){event.preventDefault();resetTreeDrag();return;}
      const delta=deltas[event.key];if(!delta)return;
      event.preventDefault();stopStageNavigation();takeTreeControl();
      treeRotation.x=Math.max(-80,Math.min(80,treeRotation.x+delta[0]));
      treeRotation.y+=delta[1];renderTreeRotation();
    });
    $('#reset-tree-view')?.addEventListener('click',()=>{
      if(paused||!window.gsap){resetTreeDrag();return;}
      takeTreeControl();
      const neutralTurn=Math.round(treeRotation.y/360)*360;
      gsap.to(treeRotation,{x:0,y:neutralTurn,duration:.8,ease:'power3.out',overwrite:true,onUpdate:renderTreeRotation,onComplete:()=>{treeRotation.y=0;renderTreeRotation();}});
    });
    addEventListener('resize', resetTreeDrag, {passive:true});
  }
  addEventListener('scroll',queueTreeScroll,{passive:true});
  addEventListener('pageshow',()=>{fitTreeReadingArea();syncTreeScroll(true);});
  addEventListener('resize',queueTreeScroll,{passive:true});

  resizeCanvases();fitTreeReadingArea();initBonsai();updateMotion();
  if(window.createBonsai3D && treeViewport){
    try{bonsai3D=window.createBonsai3D(treeViewport,{onSelect:activateStage});bonsai3D?.setActive(Math.max(0,selectedStage));bonsai3D?.sync();}
    catch(error){console.warn('The 3D tree is unavailable; using the SVG interaction.',error);}
  }
  document.fonts?.ready.then(()=>{fitTreeReadingArea();syncTreeScroll(true);});
  // CSS owns position; layout changes only update the growth timeline, never a pin/spacer.
  // Observe during the accordion transition as well as after fonts and viewport changes.
  let previousStoryTop;
  new ResizeObserver(()=>{
    const storyTop=scrollY+treeStory.getBoundingClientRect().top;
    if(previousStoryTop!==undefined && Math.abs(storyTop-previousStoryTop)>1 && stageNavigation) stopStageNavigation();
    previousStoryTop=storyTop;
    queueTreeScroll();
  }).observe($('.wrap'));
})();
