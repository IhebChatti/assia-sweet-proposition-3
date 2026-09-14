/* Assia Sweet — Royaume gourmand. Original art direction; inherited shop flows. */
brand=()=>`<a class="brand" href="#accueil" aria-label="Assia Sweet, accueil"><span class="wordmark">assia sweet<small>Le royaume gourmand</small></span></a>`;
const inheritedHeader=header;
header=function(){return inheritedHeader().replace('Un petit bonheur se prépare. <span>Découvrez la nouvelle boutique Assia Sweet.</span>','Entrez, la gourmandise est chez elle.').replace('Tous les bonbons','La boutique').replace('<a href="#boutique/Gélifiés">Les gélifiés</a>','');};
const gummy='/assets/royal-gummy.png';
const cloud='/assets/sugar-clouds.png';
home=function(){const selected=products.filter(p=>state.homeCategory==='Tous'||p.category===state.homeCategory).slice(0,4);return `<main class="kingdom-home">
<section class="realm-hero" aria-labelledby="realm-title"><div class="realm-stage">
 <div class="castle-scene"><img class="castle-image" src="/assets/candy-castle.webp" alt="Un château de confiserie rose et crème au milieu de jardins de sucre" fetchpriority="high" width="1536" height="1024"></div>
 <div class="realm-copy"><span class="eyebrow">Assia Sweet vous ouvre ses portes</span><h1 id="realm-title">Un royaume<br><em>à croquer.</em></h1><p>Les bonbons qu’on aime.<br>Un monde de petites envies.</p><a class="btn royal-btn" href="#boutique">Entrer dans la boutique ${icon('arrow')}</a></div>
 <div class="candy-orbit orbit-left" aria-hidden="true"><img src="${gummy}" alt="" width="1024" height="1536"></div><div class="candy-orbit orbit-right" aria-hidden="true"><img src="${gummy}" alt="" width="1024" height="1536"></div>
 <img class="cloud-front cloud-left" src="${cloud}" alt="" aria-hidden="true" width="1942" height="809"><img class="cloud-front cloud-right" src="${cloud}" alt="" aria-hidden="true" width="1942" height="809">
 <button class="scroll-invitation" data-scroll-realm>Il était une fois une envie <span>↓</span></button>
 </div><div class="journey-mist" aria-hidden="true"></div><section class="journey-destination" id="les-envies" aria-labelledby="journey-title"><div class="journey-heading"><span class="eyebrow">Bienvenue dans le royaume</span><h2 id="journey-title">À chaque envie,<br><em>son petit bonheur.</em></h2></div><div class="kingdom-realms container"><a class="flavor-realm realm-pink" href="#boutique/Gélifiés"><span class="realm-number">01 / Tout doux</span><h3>Les tendres.</h3><p>Les classiques qu’on aime retrouver.</p><img src="${gummy}" alt="" aria-hidden="true" width="1024" height="1536" loading="lazy"><span class="realm-link">Les gélifiés ${icon('arrow')}</span></a><a class="flavor-realm realm-blue" href="#boutique/Acidulés"><span class="realm-number">02 / Ça pétille</span><h3>Les intrépides.</h3><p>Un petit frisson à chaque bouchée.</p><img src="${img(products[2])}" alt="Rubans arc-en-ciel acidulés" width="900" height="900" loading="lazy"><span class="realm-link">Les acidulés ${icon('arrow')}</span></a><a class="flavor-realm realm-cream" href="#boutique/Guimauves"><span class="realm-number">03 / Sur un nuage</span><h3>Les rêveurs.</h3><p>La douceur, tout simplement.</p><img src="${img(products.find(p=>p.id==='marshmallow'))}" alt="Fleurs de guimauve" width="458" height="458" loading="lazy"><span class="realm-link">Les guimauves ${icon('arrow')}</span></a></div>
</section></section>
<section class="royal-selection container"><div class="section-heading"><div><span class="eyebrow">Les trésors de la boutique</span><h2 class="serif">Difficile de n’en<br>choisir <em>qu’un.</em></h2></div><a class="text-link" href="#boutique">Voir les 16 gourmandises ${icon('arrow')}</a></div><div class="category-tabs" aria-label="Filtrer la sélection">${['Tous','Gélifiés','Acidulés','Guimauves'].map(c=>`<button data-action="home-filter" data-value="${c}" class="${state.homeCategory===c?'active':''}">${c==='Tous'?'Nos incontournables':c}</button>`).join('')}</div><div class="products">${selected.map(productCard).join('')}</div></section>
<section class="gummy-chapter"><div class="chapter-inner container"><div class="chapter-art"><div class="halo" aria-hidden="true"></div><img class="giant-gummy" src="${gummy}" alt="Sculpture gourmande d’un ourson rouge" width="1024" height="1536" loading="lazy"><span class="chapter-caption">La gourmandise n’a pas d’âge.</span></div><div class="chapter-copy"><span class="eyebrow">À partager. Ou pas.</span><h2>Un petit<br>dernier ?<br><em>Promis.</em></h2><p>Une fraise, un ourson, un ruban acidulé…<br>Composez votre sélection, choisissez votre format, et laissez parler vos envies.</p><a href="#boutique" class="btn royal-btn">Composer mon panier ${icon('bag')}</a></div></div></section>
<div class="royal-ribbon" aria-hidden="true"><div class="ribbon-track">${Array(4).fill('<span>Un peu.</span><i>✦</i><span>Beaucoup.</span><i>✦</i><span>À la folie.</span><i>✦</i>').join('')}</div></div>
<section class="new-treasures container"><div class="section-heading"><div><span class="eyebrow">Encore des découvertes</span><h2 class="serif">Laissez-vous<br><em>surprendre.</em></h2></div><a class="text-link" href="#boutique">Explorer la collection ${icon('arrow')}</a></div><div class="products">${[products[8],products[10],products[11],products[13]].map(productCard).join('')}</div></section>
<section class="royal-house container"><span class="eyebrow">La maison Assia</span><h2 class="serif">Les petits plaisirs<br>font les <em>grands moments.</em></h2><p>La sélection Assia Sweet, imaginée pour vos envies au détail.<br>Des classiques à retrouver et de nouveaux goûts à découvrir.</p><a class="text-link" href="#histoire">Pousser la porte ${icon('arrow')}</a></section>
</main>`;};
const baseRender=render,baseAdd=add;
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=motionPreference.matches,animationContext=null,cleanups=[];
const reduced=()=>motionPaused||motionPreference.matches;
function cleanupKingdom(){cleanups.forEach(fn=>fn());cleanups=[];animationContext?.revert();animationContext=null;document.querySelector('.realm-hero')?.classList.remove('motion-journey');}
function setupKingdom(enter=false){if(!window.gsap||!window.ScrollTrigger||reduced())return;gsap.registerPlugin(ScrollTrigger);animationContext=gsap.context(ctx=>{
 const desktop=matchMedia('(min-width: 900px)').matches;
 if(document.querySelector('.realm-stage')){
  if(enter){gsap.timeline({defaults:{ease:'power3.out'}}).from('.realm-copy .eyebrow',{opacity:0,y:15,duration:.65}).from('.realm-copy h1',{opacity:0,y:60,rotation:2,duration:1.25},.1).from('.realm-copy p,.realm-copy .btn',{opacity:0,y:25,stagger:.12,duration:.8},.65).from('.candy-orbit',{opacity:0,y:100,scale:.65,stagger:.2,duration:1.2,ease:'back.out(1.3)'},.5);}
  gsap.to('.orbit-left img',{y:-24,rotation:9,duration:3.2,repeat:-1,yoyo:true,ease:'sine.inOut'});gsap.to('.orbit-right img',{y:28,rotation:-10,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  const hero=document.querySelector('.realm-hero');
  const mm=gsap.matchMedia();cleanups.push(()=>mm.revert());
  mm.add('(min-width: 900px) and (min-height: 650px)',()=>{
   hero.classList.add('motion-journey');
   const destination=document.querySelector('.journey-destination');
   const copy=document.querySelector('.realm-copy');
   gsap.set('.journey-destination',{autoAlpha:0,y:55});
   gsap.set('.journey-mist',{opacity:0});
   destination.inert=true;
   const story=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'castle-journey',trigger:hero,start:()=>`top ${document.querySelector('.header').offsetHeight}px`,end:()=>'+='+Math.round(innerHeight*2.1),pin:true,scrub:.65,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>{destination.inert=self.progress<.69;copy.inert=self.progress>.12;}}});
   story.to('.realm-copy',{y:-55,autoAlpha:0,duration:.17},0)
    .to('.scroll-invitation',{autoAlpha:0,duration:.1},0)
    .to('.castle-image',{scale:2.75,yPercent:-12,transformOrigin:'50% 72%',duration:.74,ease:'power1.inOut'},0)
    .to('.orbit-left',{xPercent:-150,yPercent:-35,rotation:-35,autoAlpha:0,duration:.38},0)
    .to('.orbit-right',{xPercent:150,yPercent:-40,rotation:35,autoAlpha:0,duration:.38},0)
    .to('.cloud-left',{xPercent:25,yPercent:-25,scale:1.65,duration:.43},.23)
    .to('.cloud-right',{xPercent:-25,yPercent:-25,scale:1.65,duration:.43},.23)
    .to('.journey-mist',{opacity:1,duration:.3,ease:'power1.inOut'},.43)
    .to('.journey-destination',{autoAlpha:1,y:0,duration:.24,ease:'power2.out'},.64)
    .fromTo('.journey-destination .flavor-realm',{y:45},{y:0,stagger:.035,duration:.2,ease:'power2.out'},.7)
    .to({}, {duration:.08},.92);
   return ()=>{hero.classList.remove('motion-journey');destination.inert=false;copy.inert=false;};
  });
 }
 if(document.querySelector('.ribbon-track'))gsap.to('.ribbon-track',{xPercent:-50,duration:28,repeat:-1,ease:'none'});
 if(document.querySelector('.giant-gummy')){gsap.fromTo('.giant-gummy',{rotation:-14,y:40},{rotation:12,y:-30,ease:'none',scrollTrigger:{trigger:'.gummy-chapter',start:'top bottom',end:'bottom top',scrub:1.4}});gsap.from('.halo',{scale:.7,scrollTrigger:{trigger:'.gummy-chapter',start:'top bottom',end:'center center',scrub:1}});}
 document.querySelectorAll('.section-heading,.products,.chapter-copy,.royal-house,.newsletter').forEach(el=>{if(!enter&&el.getBoundingClientRect().top<innerHeight)return;gsap.from(el.classList.contains('products')?el.children:el,{opacity:0,y:45,stagger:.1,duration:.9,clearProps:'opacity,transform',ease:'power3.out',scrollTrigger:{trigger:el,start:'top 93%',once:true}});});
 if(!document.querySelector('.realm-stage')&&enter)gsap.from('main .breadcrumb,main .page-title,.detail-gallery,.detail-content,.kpi,.admin-title',{opacity:0,y:20,duration:.6,stagger:.05,clearProps:'opacity,transform'});
 if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.flavor-realm,.royal-btn,.quick-add').forEach((el,i)=>{ctx.add('over'+i,()=>gsap.to(el,{y:-6,rotation:el.classList.contains('flavor-realm')?-.8:0,duration:.4,ease:'power2.out',overwrite:'auto'}));ctx.add('out'+i,()=>gsap.to(el,{y:0,rotation:0,duration:.5,ease:'power2.out',overwrite:'auto'}));const over=ctx['over'+i],out=ctx['out'+i];el.addEventListener('pointerenter',over);el.addEventListener('pointerleave',out);cleanups.push(()=>{el.removeEventListener('pointerenter',over);el.removeEventListener('pointerleave',out)});});}
 },document.getElementById('app'));requestAnimationFrame(()=>ScrollTrigger.refresh());}
render=function(enter=false){const active=document.activeElement;const focus={id:active?.id,action:active?.dataset?.action,value:active?.dataset?.value,flavor:active?.dataset?.flavor};cleanupKingdom();baseRender(enter);document.body.classList.toggle('in-kingdom',(!location.hash||location.hash==='#accueil'));const note=document.querySelector('.prototype-note');if(note){note.firstChild.textContent='Le royaume Assia ';const b=document.createElement('button');b.className='motion-switch';b.dataset.motionToggle='true';b.type='button';b.textContent=reduced()?'Animations : arrêt':'Mettre en pause';b.setAttribute('aria-pressed',String(reduced()));note.append(b);}document.title=location.hash.startsWith('#gestion')?'Gestion — Assia Sweet':'Assia Sweet — Le royaume gourmand';setupKingdom(enter);if(!enter){const target=focus.id?document.getElementById(focus.id):[...document.querySelectorAll('[data-action],[data-flavor]')].find(el=>focus.flavor?el.dataset.flavor===focus.flavor:focus.action&&el.dataset.action===focus.action&&el.dataset.value===focus.value);target?.focus({preventScroll:true});}};
add=function(...args){baseAdd(...args);if(animationContext&&!reduced())animationContext.add(()=>gsap.fromTo('.cart-badge',{scale:.5},{scale:1,duration:.65,ease:'elastic.out(1,.4)'}));};
document.addEventListener('click',e=>{const scroll=e.target.closest('[data-scroll-realm]');if(scroll){const journey=window.ScrollTrigger?.getById('castle-journey');if(journey)window.scrollTo({top:journey.end,behavior:'smooth'});else document.getElementById('les-envies')?.scrollIntoView({behavior:reduced()?'instant':'smooth'});return;}const button=e.target.closest('[data-motion-toggle]');if(!button)return;if(motionPreference.matches){toast('Votre appareil demande des mouvements réduits.');return;}motionPaused=!motionPaused;cleanupKingdom();setupKingdom(false);button.textContent=reduced()?'Animations : arrêt':'Mettre en pause';button.setAttribute('aria-pressed',String(reduced()));});
motionPreference.addEventListener('change',()=>render(false));window.addEventListener('load',()=>window.ScrollTrigger?.refresh(),{once:true});document.fonts?.ready.then(()=>window.ScrollTrigger?.refresh());
routeChange();
