/* Audio-led ending; isolated from scenario state, RNG and save journals. */
(function(g){'use strict';
 class EndingCredits{
  constructor(config){this.config=config;this.active=false;this.generation=0;}
  open({autoplay=false,volume=.3,onFinish=()=>{}}={}){
   this.dispose();this.active=true;this.onFinish=onFinish;this.generation++;const token=this.generation;
   this.previousFocus=document.activeElement;this.inerted=[...document.body.children].filter(e=>e.tagName!=='SCRIPT').map(e=>[e,e.inert]);
   for(const [e]of this.inerted)e.inert=true;
   const root=document.createElement('section');root.className='ending-credits';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label','恒常性メモリアル エンドロール');root.dataset.state='ready';this.root=root;
   root.innerHTML=`<div class="ed-landscape"></div><div class="ed-veil"></div><div class="ed-halo"></div><div class="ed-orbit"></div><div class="ed-grain"></div>
    <header class="ed-masthead"><span>HOMEOSTASIS MEMORIAL</span><span>ENDING · THIRTY SEVEN DEGREES</span></header>
    <div class="ed-scene ed-intro"><p class="ed-kicker">OUR DAYS, OUR STORY</p><h1 class="ed-title"></h1><div class="ed-rule"></div><p class="ed-song"></p><p class="ed-subtitle">あの日々が、いまも胸のなかに。</p></div>
    <div class="ed-graphic-backdrop" aria-hidden="true"><div class="ed-cast-shape"></div></div><div class="ed-scene ed-cast"><div class="ed-big-number" aria-hidden="true"></div><div class="ed-quote-lead"><span>WORDS WE REMEMBER</span><blockquote></blockquote></div><div class="ed-person-copy"><p class="ed-person-index"></p><h2 class="ed-person-name"></h2><div class="ed-name-line"></div><blockquote class="ed-person-quote"></blockquote></div><div class="ed-portrait"><div class="ed-art ed-art-stage"><div class="ed-color-shadow" aria-hidden="true"></div><img alt=""><img alt=""></div></div></div>
    <div class="ed-scene ed-staff"><dl class="ed-roll"></dl></div>
    <div class="ed-scene ed-finale"><p class="ed-thanks">Thank you for playing.</p><h2 class="ed-title"></h2><div class="ed-rule"></div><p class="ed-subtitle">あなたと過ごした日々に、ありがとう。</p></div>
    <div class="ed-gate"><h2></h2><p></p><button type="button">音楽とともに再生</button><small>約3分 ／ いつでもスキップできます</small></div>
    <footer class="ed-toolbar"><button type="button" class="ed-pause" disabled>一時停止</button><button type="button" class="ed-mute" aria-pressed="false">消音</button><input type="range" min="0" max="181" step=".1" value="0" aria-label="エンドロールの再生位置"><span class="ed-time"></span><button type="button" class="ed-skip">スキップ</button></footer>`;
   this.$=selector=>root.querySelector(selector);this.$('.ed-landscape').style.backgroundImage='url("'+this.config.background+'")';
   for(const el of root.querySelectorAll('.ed-title'))el.textContent=this.config.title;
   this.$('.ed-song').textContent=this.config.theme;
   for(const credit of this.config.staff){const block=document.createElement('div');block.className='ed-credit';const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=credit.role;dd.textContent=credit.name;block.append(dt,dd);this.$('.ed-roll').append(block);}
   this.duration=this.config.duration;this.lastIndex=-1;this.lastPhase=null;this.buffer=0;this.imageToken=0;this.readyIndex=-1;this.preloads=new Map();this.ending=false;
   this.audio=new Audio(this.config.audio);const audio=this.audio;audio.preload='auto';audio.volume=Math.max(0,Math.min(1,volume));audio.loop=false;
   this.seek=this.$('input');this.seek.max=this.duration;
   audio.addEventListener('loadedmetadata',()=>{if(!this.active||token!==this.generation)return;if(Number.isFinite(audio.duration)&&audio.duration>0){this.duration=audio.duration;this.seek.max=this.duration;}this.draw();});
   audio.addEventListener('seeked',()=>{if(this.active&&token===this.generation)this.draw();});
   audio.addEventListener('ended',()=>{if(token===this.generation)this.finish('ended');});
   audio.addEventListener('error',()=>{if(this.active&&!this.ending&&token===this.generation)this.showGate('音源を読み込めませんでした','接続を確認して再試行するか、スキップしてゲームに戻れます。','再試行');});
   this.$('.ed-gate button').addEventListener('click',()=>{if(audio.error)audio.load();this.play();});
   this.$('.ed-pause').addEventListener('click',()=>audio.paused?this.play():this.pause());
   this.$('.ed-mute').addEventListener('click',()=>{audio.muted=!audio.muted;this.$('.ed-mute').textContent=audio.muted?'音を戻す':'消音';this.$('.ed-mute').setAttribute('aria-pressed',String(audio.muted));});
   this.seek.addEventListener('input',()=>this.seekTo(Number(this.seek.value)));
   this.$('.ed-skip').addEventListener('click',e=>{e.stopPropagation();this.finish('skipped');});
   this.keyHandler=e=>{if(!this.active||this.ending)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();this.finish('skipped');}else if(e.key==='Tab'){const items=[...root.querySelectorAll('button:not(:disabled),input')].filter(el=>el.getClientRects().length);if(!items.length)return;const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};
   this.visibilityHandler=()=>{if(document.hidden&&this.active&&!audio.paused)this.pause();};document.addEventListener('keydown',this.keyHandler,true);document.addEventListener('visibilitychange',this.visibilityHandler);
   document.body.append(root);document.body.classList.add('ending-open');root.getBoundingClientRect();root.classList.add('is-visible');
   this.showGate(this.config.theme,'季節を彩ったみんなと、物語の余韻を。','音楽とともに再生');this.draw();this.preload(0);this.preload(1);
   this.$('.ed-gate button').focus({preventScroll:true});if(autoplay)this.play();return this;
  }
  showGate(title,text,label){this.pause();this.$('.ed-gate').hidden=false;this.$('.ed-gate h2').textContent=title;this.$('.ed-gate p').textContent=text;this.$('.ed-gate button').textContent=label;this.root.dataset.state='ready';}
  async play(){
   if(!this.active||this.ending)return;const token=this.generation;
   try{await this.audio.play();if(!this.active||this.ending||token!==this.generation)return;this.$('.ed-gate').hidden=true;this.root.dataset.state='playing';this.$('.ed-pause').disabled=false;this.$('.ed-pause').textContent='一時停止';this.tick();}
   catch(error){if(this.active&&!this.ending&&token===this.generation)this.showGate('音楽とともに、もう一度。','再生ボタンを押すと、エンドロールが始まります。','再生する');}
  }
  pause(){if(!this.active)return;this.audio.pause();cancelAnimationFrame(this.frame);this.root.dataset.state='paused';this.$('.ed-pause').textContent='再生';}
  seekTo(seconds){if(!this.active||this.ending)return;const value=Math.max(0,Math.min(this.duration-.05,seconds));try{this.audio.currentTime=value;}catch(error){return;}this.draw();}
  preload(index){
   const person=this.config.cast[index];if(!person)return null;
   if(this.preloads.has(person.image))return this.preloads.get(person.image);
   const img=new Image(),entry={image:img,ready:false};
   entry.promise=new Promise((resolve,reject)=>{img.onload=()=>Promise.resolve(img.decode?.()).then(()=>{entry.ready=true;resolve(img);},reject);img.onerror=()=>reject(Error('Ending image unavailable: '+person.id));});
   // Keep failures handled even when this is only a speculative next-card preload.
   entry.promise.catch(()=>{});this.preloads.set(person.image,entry);img.src=person.image;return entry;
  }
  async prepareCard(index){
   const ticket=++this.imageToken,token=this.generation,person=this.config.cast[index],entry=this.preload(index),slot=this.buffer++%2;
   this.readyIndex=-1;this.$('.ed-cast').style.opacity='0';
   try{
    await entry.promise;if(!this.active||token!==this.generation||ticket!==this.imageToken)return;
    const images=[...this.root.querySelectorAll('.ed-art-stage img')],next=images[slot];
    next.classList.remove('is-active');next.alt=person.name;next.src=person.image;await next.decode();
    if(!this.active||token!==this.generation||ticket!==this.imageToken)return;
    const card=this.$('.ed-cast');card.classList.add('ed-reset');
    this.root.style.setProperty('--ed-accent',person.accent);this.root.style.setProperty('--ed-person-art','url("'+person.image+'")');
    this.$('.ed-person-name').textContent=person.name;this.$('.ed-person-index').textContent='CAST / '+String(index+1).padStart(2,'0');
    this.$('.ed-person-quote').textContent='「'+person.quote+'」';this.$('.ed-quote-lead blockquote').textContent='「'+person.quote+'」';this.$('.ed-big-number').textContent=String(index+1).padStart(2,'0');
    for(const image of images)image.classList.toggle('is-active',image===next);
    this.readyIndex=index;this.draw();card.getBoundingClientRect();card.classList.remove('ed-reset');
    this.preload(index+1);this.preload(index+2);
    // Bound decoded image ownership on memory-constrained tablets.
    const keep=new Set(this.config.cast.slice(Math.max(0,index-1),index+3).map(c=>c.image));for(const key of this.preloads.keys())if(!keep.has(key))this.preloads.delete(key);
   }catch(error){if(this.active&&ticket===this.imageToken){this.root.dataset.imageError=person.id;console.error(error);}}
  }
  envelope(elapsed,length,fade=.42){return Math.max(0,Math.min(1,elapsed/fade,(length-elapsed)/fade));}
  draw(){
   if(!this.active)return;const time=this.audio.currentTime||0,p=time/this.duration,phase=p<.047?'intro':p<.71?'cast':p<.94?'staff':'finale';
   this.root.dataset.phase=phase;
   if(phase!==this.lastPhase){for(const el of this.root.querySelectorAll('.ed-scene')){const active=el.classList.contains('ed-'+phase);el.classList.toggle('is-active',active);el.setAttribute('aria-hidden',String(!active));el.style.opacity='0';}this.lastPhase=phase;}
   if(phase==='cast'){
    const length=this.duration*(.71-.047)/this.config.cast.length,beat=(time-this.duration*.047)/length,index=Math.min(this.config.cast.length-1,Math.floor(beat)),progress=beat-index;
    const shot=progress<.19?'quote':progress<.57?'bust':'full';this.root.dataset.shot=shot;this.root.style.setProperty('--ed-zoom',shot==='full'?'100%':matchMedia('(max-width:600px)').matches?'207%':'220%');
    if(index!==this.lastIndex){this.lastIndex=index;this.prepareCard(index);}
    const ready=this.readyIndex===index;this.$('.ed-cast').style.opacity=String(ready?this.envelope(progress*length,length):0);
    if(ready)this.root.dataset.cast=this.config.cast[index].id;else delete this.root.dataset.cast;
   }else{
    delete this.root.dataset.cast;delete this.root.dataset.shot;
    const [start,end]=phase==='intro'?[0,.047]:phase==='staff'?[.71,.94]:[.94,1];
    this.$('.ed-'+phase).style.opacity=String(this.envelope(time-this.duration*start,this.duration*(end-start),.5));
   }
   if(phase==='staff'){const progress=(p-.71)/(.94-.71),host=this.$('.ed-staff'),roll=this.$('.ed-roll');roll.style.transform='translateY('+(host.clientHeight-(host.clientHeight+roll.offsetHeight)*progress)+'px)';}
   this.seek.value=time;this.$('.ed-time').textContent=this.format(time)+' / '+this.format(this.duration);
  }
  tick(){cancelAnimationFrame(this.frame);if(!this.active||this.ending)return;this.draw();if(!this.audio.paused)this.frame=requestAnimationFrame(()=>this.tick());}
  format(value){const secs=Math.max(0,Math.floor(value));return Math.floor(secs/60)+':'+String(secs%60).padStart(2,'0');}
  finish(reason='skipped'){
   if(!this.active||this.ending)return;this.ending=true;this.pause();this.root.classList.add('is-leaving');const done=this.onFinish;this.finishTimer=setTimeout(()=>{this.dispose();done(reason);},matchMedia('(prefers-reduced-motion: reduce)').matches?120:650);
  }
  dispose(){
   if(!this.active)return;this.active=false;this.generation++;clearTimeout(this.finishTimer);cancelAnimationFrame(this.frame);this.imageToken++;
   this.audio.pause();this.audio.removeAttribute('src');this.audio.load();this.root.remove();document.body.classList.remove('ending-open');document.removeEventListener('keydown',this.keyHandler,true);document.removeEventListener('visibilitychange',this.visibilityHandler);
   for(const [el,inert]of this.inerted)if(el.isConnected)el.inert=inert;
   if(this.previousFocus?.isConnected)this.previousFocus.focus({preventScroll:true});
  }
 }
 g.HMEndingCredits=EndingCredits;
})(globalThis);
