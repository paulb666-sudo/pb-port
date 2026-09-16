import * as THREE from '../GPT-6_Astra/vendor/three.module.min.js';
import {createRoundedTrunkGeometry} from './bonsai-trunk.mjs';
import {createCloudGeometry} from './bonsai-cloud.mjs';

// Reuse the authored silhouette for a round trunk, curved branch tubes and foliage.
// The original SVG remains the GSAP growth model and the non-WebGL fallback.
window.createBonsai3D = function createBonsai3D(viewport, {onSelect}) {
  const svg = viewport.querySelector('.bonsai-tree');
  const canvas = document.createElement('canvas');
  canvas.className = 'bonsai-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  let renderer;
  // Keep the last complete frame available while this on-demand renderer is idle.
  try { renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true, preserveDrawingBuffer:true, powerPreference:'low-power'}); }
  catch { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.7));
  renderer.setClearColor(0x06070f, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-350,350,270,-270,1,3000);
  camera.position.set(0,0,1100);
  const model = new THREE.Group();
  scene.add(model);
  scene.add(new THREE.HemisphereLight(0xe2eeff,0x1b3040,2.7));
  const key = new THREE.DirectionalLight(0xe8f2ff,3.5);
  key.position.set(-200,450,600);scene.add(key);
  const rim = new THREE.DirectionalLight(0x798dff,2.5);
  rim.position.set(350,150,-350);scene.add(rim);
  const fill = new THREE.DirectionalLight(0x829fb1,1.5);
  fill.position.set(-350,-100,100);scene.add(fill);
  const bark = new THREE.MeshStandardMaterial({color:0x8094a2,roughness:.65,metalness:.15});
  const leafMaterial = new THREE.MeshPhysicalMaterial({color:0x130b2b,roughness:.62,metalness:.16,clearcoat:.24,clearcoatRoughness:.58});
  const outlineMaterial = new THREE.LineBasicMaterial({color:0x758ba2,transparent:true,opacity:.24});

  function extrude(shape,depth,bevel) {
    const geometry=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:32});
    geometry.translate(0,0,-depth/2);
    return geometry;
  }
  const trunkPath=svg.querySelector('#trunk-shape'),trunkLength=trunkPath.getTotalLength();
  const trunkProfile=Array.from({length:721},(_,i)=>{
    const point=trunkPath.getPointAtLength(trunkLength*i/720);
    return {x:point.x-350,y:270-point.y};
  });
  const trunkGeometry=createRoundedTrunkGeometry(THREE,trunkProfile);
  const trunkMaterial=bark.clone();
  const trunkLevel={value:40};
  trunkMaterial.onBeforeCompile=shader=>{
    shader.uniforms.trunkLevel=trunkLevel;
    shader.vertexShader='varying float bonsaiHeight;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nbonsaiHeight=position.y;');
    shader.fragmentShader='uniform float trunkLevel; varying float bonsaiHeight;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif(bonsaiHeight>trunkLevel) discard;');
  };
  model.add(new THREE.Mesh(trunkGeometry,trunkMaterial));

  const leafGeometry=createCloudGeometry(THREE);
  const coordinates=[[140,346,-48],[560,346,48],[166,232,66],[534,232,-60],[210,115,-82],[490,115,76]];
  const sourceBranches=[...svg.querySelectorAll('.branch')];
  const sourceGrowth=[...svg.querySelectorAll('.tuft-growth')];
  const branches=[], leaves=[],cloudStates=[];
  let motionEnabled=document.querySelector('#sf-motion-toggle')?.getAttribute('aria-pressed')!=='true';
  coordinates.forEach(([x,y,z],index)=>{
    const source=sourceBranches[index],length=source.getTotalLength();
    const samples=Array.from({length:51},(_,i)=>{
      const t=i/50,p=source.getPointAtLength(length*t);
      return new THREE.Vector3(p.x-350,270-p.y,z*t*t*(3-2*t));
    });
    const geometry=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(samples),80,index<4?6:4.5,10,false);
    const branch=new THREE.Mesh(geometry,bark);model.add(branch);branches.push(branch);
    const trace=new THREE.Line(new THREE.BufferGeometry().setFromPoints(samples),outlineMaterial);model.add(trace);
    const state={selection:0,hover:0,reveal:1,baseY:270-y};cloudStates.push(state);
    const material=leafMaterial.clone();
    // Light the silhouette, leaving the central label area in deep violet.
    material.onBeforeCompile=shader=>{
      shader.uniforms.cloudSelection={get value(){return state.selection;}};
      shader.uniforms.cloudHover={get value(){return state.hover;}};
      shader.fragmentShader='uniform float cloudSelection; uniform float cloudHover;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',
        'float cloudRim=pow(1.0-max(dot(normal,geometryViewDir),0.0),3.0);\n'+
        'outgoingLight+=vec3(0.13,0.045,0.30)*cloudRim*(0.5+cloudSelection*1.4+cloudHover*0.7);\n#include <opaque_fragment>');
    };
    const leaf=new THREE.Mesh(leafGeometry,material);leaf.position.set(x-350,270-y,z);
    leaf.rotation.y=(index%2===0?-1:1)*.1;model.add(leaf);leaves.push(leaf);
  });
  const pot=new THREE.Mesh(new THREE.CylinderGeometry(130,110,40,60),new THREE.MeshStandardMaterial({color:0x26374a,roughness:.6,metalness:.2}));
  pot.position.set(0,-207,0);model.add(pot);
  const lip=new THREE.Mesh(new THREE.TorusGeometry(130,4,10,80),bark);lip.rotation.x=Math.PI/2;lip.position.set(0,-187,0);model.add(lip);
  const soil=new THREE.Mesh(new THREE.CylinderGeometry(125,125,3,60),new THREE.MeshStandardMaterial({color:0x111d26,roughness:1}));soil.position.set(0,-186,0);model.add(soil);
  const footGeometry=new THREE.BoxGeometry(28,9,34);
  for(const x of [-83,83])for(const z of [-54,54]){const foot=new THREE.Mesh(footGeometry,bark);foot.position.set(x,-230,z);model.add(foot);}

  function roundedShape(w,h,r) {
    const s=new THREE.Shape(),x=-w/2,y=-h/2;
    s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
    s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
    s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
  }
  const judgement=new THREE.Mesh(extrude(roundedShape(210,90,20),18,3),new THREE.MeshStandardMaterial({color:0x192b70,roughness:.65,metalness:.12}));
  judgement.position.set(0,-35,105);model.add(judgement);

  const labels=document.createElement('div');labels.className='bonsai-labels';
  const anchors=[];
  [...svg.querySelectorAll('[data-tree-stage]')].forEach(source=>{
    const index=Number(source.dataset.treeStage);
    const button=document.createElement('button');button.type='button';button.className='tree-label'+(index===0?' tree-label-parent':'');button.dataset.treeStage=String(index);
    button.setAttribute('aria-label',source.getAttribute('aria-label'));button.setAttribute('aria-pressed',source.getAttribute('aria-pressed'));button.setAttribute('aria-controls','bonsai-detail');
    for(const [selector,cls] of [['.tuft-label, .judgement-title','tree-label-title'],['.tuft-number, .judgement-number','tree-label-number'],['.parent-label','tree-label-caption']]){
      const text=source.querySelector(selector);if(!text)continue;const span=document.createElement('span');span.className=cls;span.textContent=text.textContent;button.append(span);
    }
    button.addEventListener('click',()=>onSelect(index));labels.append(button);
    if(index>0){
      button.addEventListener('pointerenter',()=>highlightCloud(index-1,1));
      button.addEventListener('pointerleave',()=>highlightCloud(index-1,0));
      button.addEventListener('focus',()=>highlightCloud(index-1,1));
      button.addEventListener('blur',()=>highlightCloud(index-1,0));
    }
    const point=index===0?new THREE.Vector3(0,-35,120):new THREE.Vector3(coordinates[index-1][0]-350,270-coordinates[index-1][1]+12,coordinates[index-1][2]+48);
    anchors.push({button,point,index});
  });
  viewport.append(canvas,labels);
  svg.setAttribute('aria-hidden','true');svg.querySelectorAll('[data-tree-stage]').forEach(button=>button.setAttribute('tabindex','-1'));
  viewport.classList.add('has-3d');
  let width=1,height=1,visible=true,active=0,lost=false,disposed=false,renderFrame=null;
  const rotation={x:0,y:0};
  function updateClouds() {
    leaves.forEach((leaf,i)=>{
      const state=cloudStates[i],emphasis=state.selection*.035+state.hover*.025;
      leaf.scale.setScalar(Math.max(.001,state.reveal)*(1+emphasis));
      leaf.position.y=state.baseY+state.selection*3+state.hover*2;
    });
    render();
  }
  function moveCloud(state,values) {
    if(motionEnabled && window.gsap)window.gsap.to(state,{...values,duration:.55,ease:'power2.out',overwrite:'auto',onUpdate:updateClouds});
    else {Object.assign(state,values);updateClouds();}
  }
  function highlightCloud(index,hover){moveCloud(cloudStates[index],{hover});}
  function render() {
    // Growth, selection and rotation can change in the same GSAP tick. Draw their
    // final combined state once on the next frame, including the projected labels.
    if(renderFrame!==null || disposed)return;
    renderFrame=requestAnimationFrame(draw);
  }
  function draw() {
    renderFrame=null;
    if(!visible||lost||disposed||document.hidden)return;
    model.rotation.set(THREE.MathUtils.degToRad(rotation.x),THREE.MathUtils.degToRad(rotation.y),0,'YXZ');
    model.updateMatrixWorld(true);
    renderer.render(scene,camera);
    const scale=height/(camera.top-camera.bottom);
    for(const {button,point,index} of anchors){
      const anchor=point.clone();
      if(index>0)anchor.y+=leaves[index-1].position.y-cloudStates[index-1].baseY;
      const projected=anchor.applyMatrix4(model.matrixWorld).project(camera);
      button.style.left=`${(projected.x*.5+.5)*width}px`;button.style.top=`${(-projected.y*.5+.5)*height}px`;
      button.style.setProperty('--label-scale',String(scale));
      button.style.setProperty('--label-title-size',`${Math.max(index===0?10:11,20*scale)}px`);
      button.style.setProperty('--label-number-size',`${Math.max(9,14*scale)}px`);
      button.style.setProperty('--label-caption-size',`${Math.max(8,15*scale)}px`);
      button.style.zIndex=String(Math.round((1-projected.z)*1000)+(index===0?1:0));
      button.classList.toggle('is-current',index===active);
    }
    viewport.dataset.rotationX=rotation.x.toFixed(2);viewport.dataset.rotationY=rotation.y.toFixed(2);
  }
  function sync() {
    trunkLevel.value=270-Number(svg.querySelector('.trunk-reveal').getAttribute('y'));
    sourceBranches.forEach((source,i)=>{
      const progress=Math.max(0,Math.min(1,1-(parseFloat(source.style.strokeDashoffset)||0)));
      branches[i].geometry.setDrawRange(0,Math.floor(progress*80)*10*6);
      const transform=sourceGrowth[i].transform.baseVal.consolidate();
      const leafScale=transform?Math.hypot(transform.matrix.a,transform.matrix.b):1;
      cloudStates[i].reveal=leafScale;
      leaves[i].visible=leafScale>.005;
    });
    updateClouds();
  }
  function resize() {
    const rect=viewport.getBoundingClientRect();width=rect.width;height=rect.height;
    if(!width||!height)return;
    const aspect=width/height,vertical=Math.max(540,700/aspect);
    camera.left=-vertical*aspect/2;camera.right=vertical*aspect/2;camera.top=vertical/2;camera.bottom=-vertical/2;
    camera.updateProjectionMatrix();renderer.setSize(width,height,false);render();
  }
  const resizer=new ResizeObserver(resize);resizer.observe(viewport);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)sync();});observer.observe(viewport);
  document.addEventListener('visibilitychange',sync);
  canvas.addEventListener('webglcontextlost',event=>{
    event.preventDefault();lost=true;viewport.classList.remove('has-3d');labels.hidden=true;
    svg.removeAttribute('aria-hidden');svg.querySelectorAll('[data-tree-stage]').forEach(button=>button.setAttribute('tabindex','0'));
  });
  canvas.addEventListener('webglcontextrestored',()=>{
    lost=false;viewport.classList.add('has-3d');labels.hidden=false;svg.setAttribute('aria-hidden','true');
    svg.querySelectorAll('[data-tree-stage]').forEach(button=>button.setAttribute('tabindex','-1'));resize();sync();
  });
  resize();sync();
  return {
    rotation,sync,
    setRotation(x,y){rotation.x=x;rotation.y=y;render();},
    setActive(index){active=index;cloudStates.forEach((state,i)=>moveCloud(state,{selection:i===index-1?1:0}));render();},
    setMotionEnabled(enabled){motionEnabled=enabled;if(!enabled)cloudStates.forEach(state=>window.gsap?.killTweensOf(state));},
    dispose(){disposed=true;if(renderFrame!==null)cancelAnimationFrame(renderFrame);cloudStates.forEach(state=>window.gsap?.killTweensOf(state));resizer.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',sync);const geometries=new Set(),materials=new Set();scene.traverse(node=>{if(node.geometry)geometries.add(node.geometry);if(node.material)materials.add(node.material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());leafMaterial.dispose();renderer.dispose();canvas.remove();labels.remove();}
  };
};
