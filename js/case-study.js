(() => {
  const explorer=document.querySelector('.sf-knowledge');
  if(!explorer)return;
  explorer.addEventListener('click',event=>{
    const target=event.target.closest('.layer-button,.plane');
    if(!target)return;
    const index=target.dataset.layer ?? target.dataset.plane;
    const category=explorer.querySelector(`.layer-button[data-layer="${index}"]`);
    if(!category)return;
    explorer.querySelectorAll('.layer-button').forEach(button=>{
      const active=button===category;
      button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
    });
    explorer.querySelectorAll('.plane').forEach(plane=>{
      const active=plane.dataset.plane===index;
      plane.classList.toggle('selected',active);plane.setAttribute('aria-pressed',String(active));
    });
    explorer.querySelectorAll('.layer-panel').forEach(panel=>panel.hidden=panel.id!==category.getAttribute('aria-controls'));
    window.ScrollTrigger?.refresh();
  });
  if(window.gsap && window.ScrollTrigger && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(explorer.querySelector('.layer-planes'),{rotationZ:-35},{rotationZ:-15,ease:'none',scrollTrigger:{trigger:explorer,start:'top bottom',end:'bottom top',scrub:1.4}});
  }
})();
