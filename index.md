---
layout: default
title: "Antonio Serino"
---

<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Audiowide&family=Anton&family=Orbitron:wght@400;700&display=swap" rel="stylesheet">

<style>
  /* CSS CUSTOM PROPERTIES & TRI-TEMA */
  :root {
    --bg: radial-gradient(ellipse at center, #181a20 0%, #0e0e0e 100%);
    --fg: #00ffe7;
    --accent: #ff4d00;
    --font-main: 'Roboto Mono', monospace;
    transition: background 0.5s, color 0.5s;

    /* Default Game Colors */
    --dino-color: #00ffe7;
    --obstacle-color: #ff4d00;
    --game-text-color: #00ffe7;
    --game-ground-color: #353535;
    --dino-eye-color: #181a20;
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
    --bg: #000000;
    --fg: #e31b23;
    --accent: #ff0000; /* Rosso puro per accenti */
    --font-main: 'Cinzel', serif;

    /* Game Colors for Inferno */
    --dino-color: #e31b23;
    --obstacle-color: #e31b23;
    --game-text-color: #e31b23;
    --game-ground-color: #222222; /* Grigio scuro per contrasto su nero */
    --dino-eye-color: #000000;
  }

  /* Specific overrides for Inferno theme to enforce black & red */
  body.inferno .ticker-item {
    color: var(--fg); /* Rosso */
    text-shadow: 0 0 8px #000, 0 0 10px var(--accent)55;
  }
  body.inferno .pub-date,
  body.inferno .pub-title {
    color: var(--fg); /* Rosso */
  }
  body.inferno .pub-venue {
    color: #000000; /* Testo nero */
    background: var(--accent); /* Sfondo rosso */
    box-shadow: 0 0 4px var(--accent)aa;
  }
  body.inferno #jump-btn,
  body.inferno #restart-btn { /* Anche il restart button segue l'accento */
    background: var(--accent); /* Rosso */
    color: #000000; /* Testo nero */
  }
   body.inferno #dino-score { /* Assicura che il testo sotto il gioco sia leggibile */
    color: var(--fg);
   }


  /* Purgatorio (Dawn FM) */
  body.purgatorio {
    --bg: #1b1c3a;
    --fg: #c69cf0;
    --accent: #5ce1e6;
    --font-main: 'Audiowide', cursive;

    /* Game Colors for Purgatorio */
    --dino-color: #c69cf0;
    --obstacle-color: #5ce1e6;
    --game-text-color: #c69cf0;
    --game-ground-color: #10112A;
    --dino-eye-color: #1b1c3a;
  }

  /* Paradiso (Hurry Up Tomorrow) */
  body.paradiso {
    --bg: #f7f2ea;
    --fg: #1a1a1a;
    --accent: #4CAF50; /* Cambiato accento per avere colore, es. verde. Il bianco originale era problematico */
    --font-main: 'Anton', sans-serif;

    /* Game Colors for Paradiso */
    --dino-color: #1a1a1a; /* Dino nero */
    --obstacle-color: #ff4d00; /* Ostacoli arancioni per contrasto */
    --game-text-color: #1a1a1a;
    --game-ground-color: #b0b0b0; /* Grigio medio */
    --dino-eye-color: #f7f2ea; /* Occhio chiaro su dino scuro */
  }
   body.paradiso #jump-btn,
   body.paradiso #restart-btn {
    color: #FFFFFF; /* Testo bianco per contrasto con accento verde/arancio */
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
    background: #181a20; /* Sfondo nel caso l'immagine non carichi */
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
    padding-left: 0; /* Rimuovi per far partire da sx */
  }
  .ticker-item {
    display: inline-block;
    margin-right: 54px;
    color: #fffbe7; /* Colore di default, sovrascritto da temi specifici se necessario */
    font-weight: 500;
    text-shadow: 0 0 8px #222, 0 0 14px var(--accent)55;
  }
  .pub-date { color: #ffb300; font-weight: bold; margin-right: 10px; letter-spacing: 1px; }
  .pub-title { color: #00ffe7; font-weight: bold; margin-right: 7px; }
  .pub-venue { /* Stile di default, può essere sovrascritto da temi specifici */
    color: #fff; background: var(--accent);
    padding: 2px 10px; border-radius: 11px;
    margin-left: 12px; font-weight: bold; font-size: 0.92em;
    box-shadow: 0 0 4px var(--accent)aa; /* Usare var(--accent) per coerenza */
  }
  @keyframes ticker-scroll {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-60%); } /* Regola se il contenuto è più lungo */
  }

  /* Dino Game */
  #dino-game-container {
    width: 100%;
    max-width: 900px;
    background: transparent; /* Lo sfondo del canvas sarà gestito dal canvas stesso o dal tema */
    border-bottom: 4px solid var(--accent);
    border-radius: 16px 16px 0 0;
    box-shadow: 0 0 40px var(--accent)88, 0 0 16px var(--accent)bb;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #dinoGame { /* Il canvas stesso */
    width: 100%;
    max-width: 900px;
    background: #181a20; /* Sfondo di fallback se non disegnato da JS o tema */
    /* La linea di terra è disegnata nel canvas, quindi non serve bordo inferiore qui */
    border-radius: 0 0 12px 12px; /* Arrotonda angoli sotto se il container ha il top arrotondato */
  }
  #dino-score { /* Messaggio sotto il canvas del gioco */
    color: var(--accent); /* Usa accento di default */
    font-family: var(--font-main);
    font-size: 1.25em;
    margin: 0.4em 0 0.2em;
  }

  /* Stili per i bottoni del gioco, per coerenza con temi */
  #jump-btn, #restart-btn {
    padding:8px 16px; font-size:1em; border:none; border-radius:6px;
    background:var(--accent); color:#000; /* Default: accento come bg, testo nero */
    cursor: pointer;
    transition: filter 0.3s, background-color 0.3s, color 0.3s;
  }
  #jump-btn:hover, #restart-btn:hover {
    filter: brightness(1.2);
  }
  /* Se vuoi un colore specifico per restart non legato all'accento (ma lo abbiamo legato per Inferno) */
  /* #restart-btn { background:#ff4d00; color:#fff; } */


  @media (max-width: 600px) {
    .profile-container { flex-direction: column; gap: 1em; }
    .centered-block, .news-ticker-container { max-width: 100vw; padding: 0 4vw; box-sizing: border-box;}
    #dinoGame { max-width: 100vw; }
    .profile-pic { width: 80px; height: 80px; }
    .news-ticker { animation: ticker-scroll 18s linear infinite; } /* Più veloce su mobile */
  }
</style>

<div id="theme-switcher">
  <button data-theme="inferno" title="Inferno">🌙</button>
  <button data-theme="purgatorio" title="Purgatorio">🌗</button>
  <button data-theme="paradiso" title="Paradiso">☀️</button>
</div>

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
<div id="dino-game-container" class="centered-block">
  <canvas id="dinoGame" width="900" height="160"></canvas>
  <div id="dino-score"></div> <p style="margin:0;font-size:0.95em;opacity:0.7;">
    Jump over obstacles! (Spacebar or Button)
  </p>
  <div style="margin-top:12px; display:flex; gap:12px;">
    <button id="jump-btn">Jump</button>
    <button id="restart-btn">Restart</button>
  </div>
</div>
<div class="profile-container centered-block" style="display: flex; align-items: center; gap: 24px;">
  <img src="assets/img/Antonio.jpeg" alt="Antonio Serino" class="profile-pic"/>
  <div style="text-align: left;"> <h1>👨‍💻 Antonio Serino</h1>
    <p class="subtitle" style="margin-top: -0.5em; margin-bottom: 1em; font-size: 1.1em;">Data Scientist · PhD Student · NLP Researcher</p>
    <blockquote style="font-style: italic; border-left: 3px solid var(--accent); padding-left: 12px; margin-left:0;">
      “Luck does not exist: there is a moment when talent meets opportunity.”
    </blockquote>
  </div>
</div>

<div class="centered-block" style="text-align: left;"> <h2>🔍 About Me</h2>
  <p>
  Currently a PhD student at the University of Milano-Bicocca in <strong>Big Data Analytics for Business</strong>.
  My research area focuses on <strong>Artificial Intelligence</strong> and <strong>Natural Language Processing</strong>, with a specific focus on the <strong>evaluation</strong>, <strong>explanation</strong> and <strong>interpretation</strong> of <strong>Machine Learning</strong>, <strong>Transformer</strong> and <strong>Large Language Models</strong>. 
  Moreover, every day i try to tackle the challenge of smartly integrating these systems into a business perspective to improve the human-machine collaboration paradigm.
  I love being multi-disciplinary and drinking sugar-free coffee.
  </p>
  ---
  <h2>📚 Publications</h2>
  <ul style="list-style: none; padding-left: 0;">
    <li style="margin-bottom: 0.5em;"><strong>Mar 2025</strong> – <em>SkiLLMo: Normalized ESCO Skill Extraction through Transformer Models</em> – ACM SAC 2025</li>
    <li style="margin-bottom: 0.5em;"><strong>Feb 2025</strong> – <em>Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs</em> – IJCAI 2025</li>
    <li style="margin-bottom: 0.5em;"><strong>Oct 2024</strong> – <em>An approach to Evaluative AI through LLMs</em> – ECAI 2024</li>
    <li style="margin-bottom: 0.5em;"><strong>Jul 2024</strong> – <em>Augmenting XAI with LLMs</em> – XAI World Conf 2024 <em style="color: var(--accent);">(Best Presentation Award)</em></li>
    <li style="margin-bottom: 0.5em;"><strong>Jun 2024</strong> – <em>Disce aut Deficere: Evaluating LLMs Proficiency on INVALSI</em> – arXiv - Under Review at ECML-PKDD 2025</li>
    <li style="margin-bottom: 0.5em;"><strong>Nov 2023</strong> – <em>Skills-Hunter: Adapting LLMs to Labour Market Skill Extraction</em> – AIxIA 2023</li>
  </ul>
  ---
  <h2>🚀 Projects</h2>
  <ul style="list-style: none; padding-left: 0;">
    <li style="margin-bottom: 0.5em;"><strong>MHEO Report</strong> – Labour market analysis on 100K+ Lombardy graduates</li>
    <li style="margin-bottom: 0.5em;"><strong>TEAI & TRAI Indexes</strong> – Framework to assess AI exposure to job occupations </li>
    <li style="margin-bottom: 0.5em;"><strong>Skills-Hunter & SkiLLMo</strong> – NLP pipelines for ESCO skill extraction and standardization</li>
  </ul>
  ---
  <h2>💼 Experience</h2>
  <ul style="list-style: none; padding-left: 0;">
    <li style="margin-bottom: 0.5em;"><strong>2024–2025</strong> – Research collaboration at Univ. of Milan – MHEO Report (Statale & Bicocca)</li>
    <li style="margin-bottom: 0.5em;"><strong>2023–2024</strong> – NLP Researcher – Interuniversity Research Centre for Public Services</li>
  </ul>
  ---
  <h2>✍🏻 Review Activities</h2>
  <ul style="list-style: none; padding-left: 0;">
    <li style="margin-bottom: 0.5em;"><strong>ECML-PKDD 2024</strong> – Research Track</li>
    <li style="margin-bottom: 0.5em;"><strong>COLING 2025</strong> – Industry Track</li>
    <li style="margin-bottom: 0.5em;"><strong>Knowledge-Based Systems</strong> – Journal Q1</li>
    <li style="margin-bottom: 0.5em;"><strong>International Journal of Information Technology & Decision Making</strong> - Journal Q2</li>
  </ul>
  ---
  <h2>🎓 Education</h2>
  <ul style="list-style: none; padding-left: 0;">
    <li style="margin-bottom: 0.5em;"><strong>PhD</strong> – Big Data & Analytics – Univ. Milan-Bicocca (2023–Now)</li>
    <li style="margin-bottom: 0.5em;"><strong>MSc</strong> – Data Science – Univ. Milan-Bicocca (2021–2023)</li>
    <li style="margin-bottom: 0.5em;"><strong>BSc</strong> – Computer Science – Univ. Bari (2018–2021)</li>
  </ul>
  ---
  <h2>📫 Contact</h2>
  <ul style="list-style: none; padding-left: 0;">
    <li style="margin-bottom: 0.5em;">📧 Email: a.serino3@campus.unimib.it</li>
    <li style="margin-bottom: 0.5em;">🔗 GitHub: <a href="https://github.com/serino28" target="_blank" rel="noopener noreferrer">serino28</a></li>
    <li style="margin-bottom: 0.5em;">💼 LinkedIn: <a href="https://www.linkedin.com/in/antonio-serino-881799205" target="_blank" rel="noopener noreferrer">antonio-serino</a></li>
  </ul>
</div>

<script>
document.addEventListener("DOMContentLoaded", function(){
  const ticker = document.getElementById('news-ticker');
  if (ticker && ticker.children.length > 0) { // Check if ticker has children before duplicating
      const originalContent = ticker.innerHTML;
      // Duplica il contenuto solo se serve per lo scrolling, basandosi sulla larghezza
      // Questo è un miglioramento opzionale, per ora lo lascio come prima
      ticker.innerHTML += originalContent;
      // Potresti voler aggiungere più copie se il contenuto è molto corto
      // if (ticker.offsetWidth < ticker.parentElement.offsetWidth * 1.5) {
      //   ticker.innerHTML += originalContent; // Aggiungi ancora se necessario
      // }
  }
});

// Tri-tema toggle + save
(function(){
  const btns = document.querySelectorAll('#theme-switcher button');
  btns.forEach(b => b.addEventListener('click', ()=>{
    document.body.className = b.dataset.theme;
    localStorage.setItem('site-theme', b.dataset.theme);
    // Dispatch a custom event to notify other scripts (like dino game) about theme change
    document.dispatchEvent(new CustomEvent('themeChanged'));
  }));
  const saved = localStorage.getItem('site-theme');
  if (saved) {
    document.body.className = saved;
  }
  // Dispatch event on initial load as well, after theme is set
  document.dispatchEvent(new CustomEvent('themeChanged'));
})();

// Dino game
(function() {
  const canvas = document.getElementById('dinoGame');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const scoreDisplay = document.getElementById('dino-score');

  let cw = canvas.width, ch = canvas.height;
  let dino = { x:30, y:0, vy:0, jumping:false, w:32, h:26 }; // Adjusted w/h for a more typical dino proportion
  let ground = ch-40, gravity=0.8, jumpForce=-13, speedMul=1.2;
  let obstacles=[], frame=0, score=0, gameOver=false;

  // Game Colors - will be populated by CSS variables
  let dinoColor, obstacleColor, gameTextColor, gameGroundColor, dinoEyeColor, gameBgColor;

  function getCssVariable(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }

  function updateGameColors() {
    dinoColor = getCssVariable('--dino-color');
    obstacleColor = getCssVariable('--obstacle-color');
    gameTextColor = getCssVariable('--game-text-color');
    gameGroundColor = getCssVariable('--game-ground-color');
    dinoEyeColor = getCssVariable('--dino-eye-color');
    gameBgColor = getComputedStyle(canvas).backgroundColor; // Legge il colore di sfondo effettivo del canvas
  }

  function resize(){
    const containerWidth = canvas.parentElement.offsetWidth;
    cw = canvas.width = Math.min(900, containerWidth > 0 ? containerWidth : 900); // Assicura che ci sia una larghezza valida
    ch = canvas.height = 160; // Altezza fissa
    ground = ch - 40; 
    if(dino) dino.y = ground - dino.h; // Riposiziona dino se esiste
    // Non è necessario ridisegnare qui, il loop di gioco lo farà
  }
  addEventListener('resize', resize);
  // Chiamata iniziale a resize dopo che il DOM è pronto e le variabili CSS sono applicate
  // setTimeout(resize, 0); // Chiamato dopo il setup iniziale

  function reset(){
    updateGameColors(); // Aggiorna i colori al reset (importante se tema cambia in game over)
    dino.y = ground - dino.h; 
    dino.vy = 0; 
    dino.jumping = false;
    obstacles = []; 
    frame = 0; 
    score = 0; 
    gameOver = false;
    if(scoreDisplay) scoreDisplay.innerText = '';
    if(!rafId) update(); // Riavvia il loop di gioco solo se non è già in corso
  }

  function drawDino(){
    ctx.fillStyle = dinoColor;
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
    // Occhio
    ctx.fillStyle = dinoEyeColor;
    ctx.fillRect(dino.x + dino.w - 9, dino.y + 6, 5, 5); // Occhio semplice
  }

  function drawObs(o){
    ctx.fillStyle = obstacleColor;
    if (o.type === 'cactus_small' || o.type === 'cactus_large') {
      ctx.fillRect(o.x, ground - o.h + 1, o.w, o.h); // Base
      if (o.hasArm) { // Disegna un braccio stilizzato se presente
        const armWidth = o.w / 3;
        const armHeight = o.h * 0.4;
        const armY = ground - o.h * 0.7 + 1;
        if (o.armSide === 'left') {
          ctx.fillRect(o.x - armWidth +2, armY, armWidth, armHeight);
        } else {
          ctx.fillRect(o.x + o.w -2, armY, armWidth, armHeight);
        }
      }
    } else if (o.type === 'bird') {
      // Corpo dell'uccello
      ctx.fillRect(o.x, o.yPos, o.w, o.h);
      // Ali stilizzate (triangoli)
      ctx.beginPath();
      ctx.moveTo(o.x - o.w * 0.4, o.yPos + o.h / 2); // Ala sinistra
      ctx.lineTo(o.x + o.w / 2, o.yPos - o.h * 0.3);
      ctx.lineTo(o.x + o.w / 2, o.yPos + o.h * 1.3);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(o.x + o.w + o.w * 0.4, o.yPos + o.h / 2); // Ala destra
      ctx.lineTo(o.x + o.w / 2, o.yPos - o.h * 0.3);
      ctx.lineTo(o.x + o.w / 2, o.yPos + o.h * 1.3);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  let rafId; // Per tenere traccia dell'animation frame

  function update(){
    if (gameOver) {
      ctx.font="bold 36px Orbitron, monospace";
      ctx.fillStyle = obstacleColor; // Usa colore ostacolo per "GAME OVER" per coerenza
      const text = "GAME OVER";
      const textWidth = ctx.measureText(text).width;
      ctx.fillText(text, (cw - textWidth) / 2, ch / 2);
      if(scoreDisplay) scoreDisplay.innerText = "Press Space or Restart";
      cancelAnimationFrame(rafId); // Ferma il loop
      rafId = null;
      return;
    }

    ctx.clearRect(0, 0, cw, ch); // Pulisce il canvas
    // Riempi lo sfondo del canvas con il colore del body o un colore specifico per il canvas
    // ctx.fillStyle = getCssVariable('--bg'); // Potrebbe essere pesante leggerlo ogni frame
    // In alternativa, imposta canvas.style.backgroundColor in updateGameColors()
    // Per ora, lo sfondo del canvas è definito nel CSS per #dinoGame

    // Linea di terra
    ctx.fillStyle = gameGroundColor;
    ctx.fillRect(0, ground + (ch - ground - 5)/2 , cw, 5); // Linea di terra un po' più spessa e centrata nello spazio sotto

    drawDino();
    
    dino.y += dino.vy; 
    dino.vy += gravity;
    if(dino.y >= ground - dino.h){
      dino.y = ground - dino.h; 
      dino.vy = 0;
      dino.jumping = false;
    }
    
    // Genera ostacoli
    // Aumenta la frequenza di generazione degli ostacoli con il punteggio per aumentare difficoltà
    const obstacleFrequency = Math.max(20, 60 - Math.floor(score / 200)); // Da 60 a 20 frames
    if(frame % obstacleFrequency === 0) {
      let type;
      const rand = Math.random();
      if (rand < 0.5) type = 'cactus_small';
      else if (rand < 0.85) type = 'cactus_large';
      else type = 'bird';
      
      let newObstacle = { x: cw, type: type };

      if (type === 'cactus_small') {
        newObstacle.w = 18 + Math.random() * 10;
        newObstacle.h = 30 + Math.random() * 15;
      } else if (type === 'cactus_large') {
        newObstacle.w = 25 + Math.random() * 15;
        newObstacle.h = 40 + Math.random() * 20;
        if (Math.random() < 0.5) { // 50% chance di avere un braccio
            newObstacle.hasArm = true;
            newObstacle.armSide = Math.random() < 0.5 ? 'left' : 'right';
        }
      } else if (type === 'bird') {
        newObstacle.w = 28 + Math.random() * 10; 
        newObstacle.h = 18 + Math.random() * 8;  
        // Altezza uccello: può essere a due livelli (salto normale o anatra)
        newObstacle.yPos = ground - (Math.random() < 0.4 ? dino.h*0.8 : dino.h + newObstacle.h + 10 + Math.random()*20) ;
      }
      obstacles.push(newObstacle);
    }
    
    // Aggiorna e disegna ostacoli
    const currentSpeed = Math.max(6, cw/220) * speedMul * (1 + score / 2000); // Aumenta velocità con punteggio
    for (let i = obstacles.length - 1; i >= 0; i--) {
      let o = obstacles[i];
      o.x -= currentSpeed;
      drawObs(o);

      // Collision detection
      if (o.type === 'bird') {
        if (dino.x < o.x + o.w && dino.x + dino.w > o.x &&
            dino.y < o.yPos + o.h && dino.y + dino.h > o.yPos) {
          gameOver = true;
        }
      } else { // Cactus
        if (dino.x < o.x + o.w && dino.x + dino.w > o.x &&
            dino.y + dino.h > ground - o.h +1 ) { // +1 per allineare con fillRect
          gameOver = true;
        }
      }
      if (o.x + o.w < 0) { // Rimuovi ostacoli usciti dallo schermo
        obstacles.splice(i, 1);
        if (!gameOver) score++; // Incrementa punteggio per ogni ostacolo superato
      }
    }
    
    // Punteggio
    // if(frame % 4 === 0 && !gameOver) score++; // Vecchio modo di calcolare il punteggio
    ctx.font="bold 22px Orbitron, monospace";
    ctx.fillStyle = gameTextColor;
    ctx.textAlign = "right"; // Allinea a destra
    ctx.fillText(`Score: ${score}`, cw - 20, 38); // 20px dal bordo destro
    ctx.textAlign = "left"; // Resetta l'allineamento

    frame++; 
    rafId = requestAnimationFrame(update);
  }

  // Event Listeners del Gioco
  function handleJump() {
    if (gameOver) return;
    if(!dino.jumping){ 
      dino.vy = jumpForce; 
      dino.jumping = true; 
    }
  }

  function handleRestart() {
    if(gameOver){ 
      reset(); 
      // update(); // reset() ora chiama update() se necessario
    }
  }

  document.addEventListener('keydown', e => {
    if(e.code === 'Space'){ 
      e.preventDefault();
      if(gameOver) {
        handleRestart();
      } else {
        handleJump();
      }
    }
  });

  document.getElementById('jump-btn')?.addEventListener('click', handleJump);
  document.getElementById('restart-btn')?.addEventListener('click', handleRestart);

  // Ascolta l'evento custom per il cambio tema
  document.addEventListener('themeChanged', () => {
    updateGameColors();
    // Se il gioco non è "game over", il prossimo frame userà i nuovi colori.
    // Se è "game over", i colori verranno aggiornati al "reset".
    // Potremmo forzare un ridisegno se necessario, ma di solito non serve
    // se il loop di gioco è attivo o se si attende il reset.
    if (!gameOver && rafId) { // Se il gioco è in corso, assicurati che il loop continui e usi i nuovi colori
      // ctx.clearRect(0,0,cw,ch); // Pulisci subito
      // // ridisegna elementi statici se necessario, ma update() lo farà
    } else if (gameOver) { // Se è game over, ridisegna lo stato di game over con i nuovi colori
        ctx.clearRect(0,0,cw,ch);
        ctx.fillStyle = gameGroundColor;
        ctx.fillRect(0, ground + (ch - ground - 5)/2 , cw, 5);
        drawDino(); // Disegna il dino con i nuovi colori
        obstacles.forEach(o => drawObs(o)); // Disegna ostacoli con nuovi colori
        
        ctx.font="bold 36px Orbitron, monospace";
        ctx.fillStyle = obstacleColor;
        const text = "GAME OVER";
        const textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (cw - textWidth) / 2, ch / 2);
        if(scoreDisplay) scoreDisplay.innerText = "Press Space or Restart";
    }
  });
  
  // Inizializzazione
  resize(); // Chiamata a resize per impostare dimensioni iniziali
  reset();  // Chiama reset che include updateGameColors() e poi update() se non già in corso
})();
</script>