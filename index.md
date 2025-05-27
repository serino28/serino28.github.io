---
layout: default
title: "Antonio Serino"
---

<!-- 1) IMPORT FONTS & THEME SWITCHER -->
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Audiowide&family=Anton&display=swap" rel="stylesheet">

<style>
  /* CSS CUSTOM PROPERTIES & TRI-TEMA */
  :root {
    --bg: radial-gradient(ellipse at center, #181a20 0%, #0e0e0e 100%);
    --fg: #00ffe7;
    --accent: #ff4d00;
    --font-main: 'Roboto Mono', monospace;
    transition: background 0.5s, color 0.5s;
  }

  body {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-main);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    text-align: center;
  }

  /* Inferno (After Hours) */
  body.inferno {
    --bg: #0a0a0a;
    --fg: #e31b23;
    --accent: #ff4d00;
    --font-main: 'Cinzel', serif;
  }

  /* Purgatorio (Dawn FM) */
  body.purgatorio {
    --bg: #1b1c3a;
    --fg: #c69cf0;
    --accent: #5ce1e6;
    --font-main: 'Audiowide', cursive;
  }

  /* Paradiso (Hurry Up Tomorrow) */
  body.paradiso {
    --bg: #f7f2ea;
    --fg: #1a1a1a;
    --accent: #ffffff;
    --font-main: 'Anton', sans-serif;
  }

  /* GLOBAL ELEMENT STYLES */
  a, .pub-venue, .news-icon {
    color: var(--accent);
    text-shadow: 0 0 8px var(--accent);
    transition: color 0.5s;
  }
  h1, h2, h3 {
    font-family: var(--font-main);
    color: var(--accent);
    text-shadow: 0 0 8px var(--accent), 0 0 30px var(--accent)50;
    border-bottom: 1px solid #2a2a2a;
    letter-spacing: 2px;
    margin-bottom: 0.5em;
  }

  /* THEME SWITCHER BUTTONS */
  #theme-switcher {
    position: fixed;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 8px;
    z-index: 1000;
  }
  #theme-switcher button {
    background: transparent;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    filter: drop-shadow(0 0 4px var(--accent));
    transition: filter 0.3s;
  }
  #theme-switcher button:hover {
    filter: drop-shadow(0 0 8px var(--accent));
  }

  /* Centered blocks */
  .centered-block {
    max-width: 900px;
    margin: 0 auto 32px auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Profile pic */
  .profile-pic {
    width: 120px;
    height: 120px;
    border-radius: 100px;
    border: 4px solid var(--accent);
    box-shadow: 0 0 30px var(--accent)66, 0 0 6px var(--accent)cc;
    object-fit: cover;
    background: #181a20;
  }

  /* News Ticker */
  .news-ticker-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 32px auto;
    background: linear-gradient(90deg, var(--accent) 0, #222 100%);
    box-shadow: 0 0 16px var(--accent)88, 0 0 8px var(--accent)88;
    border-radius: 7px;
    border-bottom: 2px solid var(--accent);
    display: flex;
    align-items: center;
    overflow: hidden;
    min-height: 48px;
    font-family: var(--font-main);
  }
  .news-icon {
    font-size: 1.65em;
    animation: pulseIcon 1.3s infinite alternate;
    margin: 0 16px 0 10px;
    filter: drop-shadow(0 0 6px var(--accent));
    flex-shrink: 0;
  }
  @keyframes pulseIcon {
    0% { filter: drop-shadow(0 0 2px var(--accent)); }
    100% { filter: drop-shadow(0 0 12px var(--accent)); }
  }
  .news-ticker {
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: ticker-scroll 24s linear infinite;
    font-size: 1.09em;
    padding-left: 0;
  }
  .ticker-item {
    display: inline-block;
    margin-right: 54px;
    color: #fffbe7;
    font-weight: 500;
    text-shadow: 0 0 8px #222, 0 0 14px var(--accent)55;
  }
  .pub-date { color: #ffb300; font-weight: bold; margin-right: 10px; letter-spacing: 1px; }
  .pub-title { color: #00ffe7; font-weight: bold; margin-right: 7px; }
  .pub-venue {
    color: #fff; background: var(--accent);
    padding: 2px 10px; border-radius: 11px;
    margin-left: 12px; font-weight: bold; font-size: 0.92em;
    box-shadow: 0 0 4px #ff4d00aa;
  }
  @keyframes ticker-scroll {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-60%); }
  }

  /* Dino Game */
  #dino-game-container {
    width: 100%;
    max-width: 900px;
    background: transparent;
    border-bottom: 4px solid var(--accent);
    border-radius: 16px 16px 0 0;
    box-shadow: 0 0 40px var(--accent)88, 0 0 16px var(--accent)bb;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #dinoGame {
    width: 100%;
    max-width: 900px;
    background: #181a20;
    border-bottom: 4px solid #ff4d00;
    border-radius: 0 0 12px 12px;
  }
  #dino-score {
    color: var(--accent);
    font-family: var(--font-main);
    font-size: 1.25em;
    margin: 0.4em 0 0.2em;
  }
  @media (max-width: 600px) {
    .profile-container { flex-direction: column; gap: 1em; }
    .centered-block, .news-ticker-container { max-width: 100vw; padding: 0 4vw; }
    #dinoGame { max-width: 100vw; }
    .profile-pic { width: 80px; height: 80px; }
  }
</style>

<!-- 2) SWITCHER HTML -->
<div id="theme-switcher">
  <button data-theme="inferno" title="Inferno">🌙</button>
  <button data-theme="purgatorio" title="Purgatorio">🌗</button>
  <button data-theme="paradiso" title="Paradiso">☀️</button>
</div>

<!-- ==== TICKER NEWS ==== -->
<div class="news-ticker-container">
  <span class="news-icon">📰</span>
  <div class="news-ticker" id="news-ticker">
    <span class="ticker-item">
      <span class="pub-date">May 2025</span> – <span class="pub-title">Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs</span> <span class="pub-venue">IJCAI 2025</span>
    </span>
    <span class="ticker-item">
      <span class="pub-date">Mar 2025</span> – <span class="pub-title">SkiLLMo: Normalized ESCO Skill Extraction through Transformer Models</span> <span class="pub-venue">ACM SAC 2025</span>
    </span>
    <span class="ticker-item">
      <span class="pub-date">Oct 2024</span> – <span class="pub-title">An approach to Evaluative AI through LLMs</span> <span class="pub-venue">ECAI 2024</span>
    </span>
  </div>
</div>
<!-- ==== FINE TICKER ==== -->

<!-- ==== INIZIO GIOCO DINO CENTRATO ==== -->
<div id="dino-game-container" class="centered-block">
  <canvas id="dinoGame" width="900" height="160"></canvas>
  <div id="dino-score"></div>
  <p style="margin:0;font-size:0.95em;opacity:0.7;">
    Jump over obstacles!
  </p>
  <div style="margin-top:12px; display:flex; gap:12px;">
    <button id="jump-btn" style="padding:8px 16px; font-size:1em; border:none; border-radius:6px; background:var(--accent); color:#000;">
      Jump
    </button>
    <button id="restart-btn" style="padding:8px 16px; font-size:1em; border:none; border-radius:6px; background:#ff4d00; color:#fff;">
      Restart
    </button>
  </div>
</div>
<!-- ==== FINE GIOCO DINO ==== -->

<!-- ==== PROFILO CENTRATO ==== -->
<div class="profile-container centered-block">
  <img src="assets/img/Antonio.jpeg" alt="Antonio Serino" class="profile-pic"/>
  <div>
    <h1>👨‍💻 Antonio Serino</h1>
    <p class="subtitle">Data Scientist · PhD Student · NLP Researcher</p>
    <blockquote>
      “Luck does not exist: there is a moment when talent meets opportunity.”
    </blockquote>
  </div>
</div>

<!-- ==== CONTENUTO PRINCIPALE CENTRATO ==== -->
## 🔍 About Me

Currently a PhD student at the University of Milano-Bicocca in **Big Data Analytics for Business**.
My research area focuses on **Artificial Intelligence** and **Natural Language Processing**, with a specific focus on the **evaluation**, **explanation** and **interpretation** of **Machine Learning**, **Transformer** and **Large Language Models**. 
Moreover, every day i try to tackle the challenge of smartly integrating these systems into a business perspective to improve the human-machine collaboration paradigm.
I love being multi-disciplinary and drinking sugar-free coffee.

---

## 📚 Publications

- **Mar 2025** – *SkiLLMo: Normalized ESCO Skill Extraction through Transformer Models* – ACM SAC 2025
- **Feb 2025** – *Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs* – IJCAI 2025
- **Oct 2024** – *An approach to Evaluative AI through LLMs* – ECAI 2024
- **Jul 2024** – *Augmenting XAI with LLMs* – XAI World Conf 2024 _(Best Presentation Award)_
- **Jun 2024** – *Disce aut Deficere: Evaluating LLMs Proficiency on INVALSI* – arXiv - Under Review at ECML-PKDD 2025
- **Nov 2023** – *Skills-Hunter: Adapting LLMs to Labour Market Skill Extraction* – AIxIA 2023

---

## 🚀 Projects

- **MHEO Report** – Labour market analysis on 100K+ Lombardy graduates
- **TEAI & TRAI Indexes** – Framework to assess AI exposure to job occupations 
- **Skills-Hunter & SkiLLMo** – NLP pipelines for ESCO skill extraction and standardization

---

## 💼 Experience

- **2024–2025** – Research collaboration at Univ. of Milan – MHEO Report (Statale & Bicocca)
- **2023–2024** – NLP Researcher – Interuniversity Research Centre for Public Services

---

## ✍🏻 Review Activities

- **ECML-PKDD 2024** – Research Track
- **COLING 2025** – Industry Track
- **Knowledge-Based Systems** – Journal Q1
- **International Journal of Information Technology & Decision Making** - Journal Q2

---

## 🎓 Education

- **PhD** – Big Data & Analytics – Univ. Milan-Bicocca (2023–Now)
- **MSc** – Data Science – Univ. Milan-Bicocca (2021–2023)
- **BSc** – Computer Science – Univ. Bari (2018–2021)

---

## 📫 Contact

- 📧 Email: a.serino3@campus.unimib.it
- 🔗 GitHub: [serino28](https://github.com/serino28)
- 💼 LinkedIn: [antonio-serino](https://www.linkedin.com/in/antonio-serino-881799205)


<!-- 3) SCRIPT: NEWS TICKER, DINO GAME & THEMING -->
<script>
document.addEventListener("DOMContentLoaded", function(){
  const ticker = document.getElementById('news-ticker');
  if (ticker) ticker.innerHTML += ticker.innerHTML;
});

// Tri-tema toggle + save
(function(){
  const btns = document.querySelectorAll('#theme-switcher button');
  btns.forEach(b => b.addEventListener('click', ()=>{
    document.body.className = b.dataset.theme;
    localStorage.setItem('site-theme', b.dataset.theme);
  }));
  const saved = localStorage.getItem('site-theme');
  if (saved) document.body.className = saved;
})();

// Dino game
(function() {
  const canvas = document.getElementById('dinoGame');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let cw = canvas.width, ch = canvas.height;
  let dino = { x:30, y:0, vy:0, jumping:false, w:32, h:26 };
  let ground = ch-40, gravity=0.8, jumpForce=-13, speedMul=1.2;
  let obstacles=[], frame=0, score=0, gameOver=false;

  function resize(){
    cw=canvas.width=Math.min(900,innerWidth-48);
    ch=canvas.height=160;
    ground=ch-40; dino.y=ground-dino.h;
  }
  addEventListener('resize', resize); resize();

  function reset(){
    dino.y=ground-dino.h; dino.vy=0; dino.jumping=false;
    obstacles=[]; frame=0; score=0; gameOver=false;
    document.getElementById('dino-score').innerText='';
  }
  function drawDino(){
    ctx.fillStyle='#00ffe7';
    ctx.fillRect(dino.x,dino.y,dino.w,dino.h);
    ctx.fillStyle='#181a20';
    ctx.fillRect(dino.x+dino.w-9, dino.y+6,5,5);
  }
  function drawObs(o){
    ctx.fillStyle='#ff4d00';
    ctx.fillRect(o.x,ground-o.h+1,o.w,o.h);
  }
  function update(){
    ctx.clearRect(0,0,cw,ch);
    ctx.fillStyle='#353535';
    ctx.fillRect(0,ground+20,cw,5);
    drawDino();
    dino.y+=dino.vy; dino.vy+=gravity;
    if(dino.y>=ground-dino.h){dino.y=ground-dino.h; dino.jumping=false;}
    if(frame%60===0) obstacles.push({x:cw,w:18+Math.random()*18,h:30+Math.random()*22});
    obstacles.forEach(o=>{
      o.x-=Math.max(6,cw/220)*speedMul; drawObs(o);
      if(dino.x+dino.w>o.x&&dino.x<o.x+o.w&&dino.y+dino.h>ground-o.h&&dino.y<ground) gameOver=true;
    });
    obstacles=obstacles.filter(o=>o.x+o.w>0);
    if(frame%4===0) score++;
    ctx.font="bold 22px Orbitron, monospace";
    ctx.fillStyle="#00ffe7";
    ctx.fillText(`Score: ${score}`, cw-180,38);
    if(gameOver){
      ctx.font="bold 36px Orbitron, monospace";
      ctx.fillStyle="#ff4d00";
      ctx.fillText("GAME OVER",cw/2-115,ch/2);
      document.getElementById('dino-score').innerText="Press Space to Retry";
      return;
    }
    frame++; requestAnimationFrame(update);
  }
  addEventListener('keydown',e=>{
    if(e.code==='Space'){ e.preventDefault();
      if(!gameOver&&!dino.jumping){ dino.vy=jumpForce; dino.jumping=true; }
      else if(gameOver){ reset(); update(); }
    }
  });
  document.getElementById('jump-btn')?.addEventListener('click',()=>{
    if(!gameOver&&!dino.jumping){ dino.vy=jumpForce; dino.jumping=true; }
  });
  document.getElementById('restart-btn')?.addEventListener('click',()=>{
    if(gameOver){ reset(); update(); }
  });
  reset(); update();
})();
</script>

