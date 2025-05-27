---
layout: default
title: "Antonio Serino"
---

<link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Roboto+Mono:wght@400;500;700&family=Orbitron:wght@400;700&display=swap" rel="stylesheet">

<style>
  /* CSS CUSTOM PROPERTIES & THEME (Night/Day) */
  :root { /* NIGHT MODE (Default) */
    --bg: #0D1117; /* GitHub Dark Dimmed BG */
    --bg-gradient: radial-gradient(ellipse at center, #1A222F 0%, #0D1117 100%);
    --fg: #C9D1D9; /* GitHub Dark Dimmed Text */
    --accent: #58A6FF; /* GitHub Dark Dimmed Blue Accent */
    --accent-hover: #79C0FF;
    --border-color: #30363D;
    --card-bg: #161B22; /* Sfondo per elementi "card" o container */

    --font-heading: 'Audiowide', cursive;
    --font-body: 'Roboto Mono', monospace;
    --font-game: 'Orbitron', monospace;

    /* Game Colors - Night Mode */
    --dino-color: var(--accent);
    --obstacle-color: #F78166; /* Arancione GitHub Dark Dimmed */
    --game-text-color: var(--fg);
    --game-ground-color: var(--border-color);
    --dino-eye-color: var(--bg);
    --game-canvas-bg: var(--card-bg); /* Sfondo del canvas gioco */

    transition: background 0.3s, color 0.3s;
  }

  body.day-mode { /* DAY MODE */
    --bg: #F6F8FA; /* GitHub Light BG */
    --bg-gradient: linear-gradient(180deg, #FFFFFF 0%, #F6F8FA 100%);
    --fg: #24292F; /* GitHub Light Text */
    --accent: #0969DA; /* GitHub Light Blue Accent */
    --accent-hover: #0C82FB;
    --border-color: #D0D7DE;
    --card-bg: #FFFFFF;

    /* Game Colors - Day Mode */
    --dino-color: var(--fg); /* Dino scuro su sfondo chiaro */
    --obstacle-color: #CF222E; /* Rosso GitHub Light */
    --game-text-color: var(--fg);
    --game-ground-color: var(--border-color);
    --dino-eye-color: var(--bg);
    --game-canvas-bg: var(--card-bg);
  }

  body {
    background: var(--bg-gradient); /* Usa il gradiente */
    color: var(--fg);
    font-family: var(--font-body);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    text-align: center;
    line-height: 1.6;
  }

  /* GLOBAL ELEMENT STYLES */
  a {
    color: var(--accent);
    text-decoration: none;
    transition: color 0.3s;
  }
  a:hover {
    color: var(--accent-hover);
    text-decoration: underline;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--accent);
    text-shadow: 0 0 8px var(--accent)33; /* Ombra più leggera */
    letter-spacing: 1.5px;
    margin-bottom: 0.75em;
    margin-top: 1.5em;
  }
  h1 { font-size: 2.2em; }
  h2 { font-size: 1.8em; border-bottom: 1px solid var(--border-color); padding-bottom: 0.3em;}
  h3 { font-size: 1.4em; }

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
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    color: var(--fg);
    font-size: 1.3em; /* Leggermente più piccolo */
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: background 0.3s, color 0.3s, border-color 0.3s, filter 0.3s;
  }
  #theme-switcher button:hover {
    border-color: var(--accent);
    filter: brightness(1.1);
  }
  #theme-switcher button.active { /* Stile per il bottone del tema attivo */
    background: var(--accent);
    color: var(--bg); /* O un colore di testo che contrasta bene con l'accento */
    border-color: var(--accent);
  }


  /* Centered blocks & Content Sections */
  .centered-block {
    max-width: 900px;
    margin: 24px auto 32px auto; /* Aumentato margine sopra */
    padding: 24px;
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    text-align: left; /* Contenuto allineato a sinistra di default */
  }
  .content-section { /* Usato per About, Publications, etc. */
     margin-bottom: 2em;
  }
  .content-section ul {
    list-style: none;
    padding-left: 0;
  }
  .content-section li {
    padding: 0.3em 0;
    border-bottom: 1px dashed var(--border-color);
  }
  .content-section li:last-child {
    border-bottom: none;
  }


  /* Profile pic */
  .profile-pic {
    width: 120px;
    height: 120px;
    border-radius: 50%; /* Cerchio perfetto */
    border: 3px solid var(--accent);
    box-shadow: 0 0 15px var(--accent)77;
    object-fit: cover;
    background: var(--bg); /* Sfondo nel caso l'immagine non carichi */
  }
  .profile-container { /* Blocco specifico per il profilo */
    display: flex;
    flex-direction: row; /* Default: riga */
    align-items: center;
    gap: 24px;
    text-align: left;
    background: transparent !important; /* Rimuove lo sfondo da .centered-block */
    border: none !important;
    box-shadow: none !important;
    padding-top: 3em; /* Più spazio sopra */
    padding-bottom: 1em;
  }
  .profile-container h1 { margin-top: 0;}
  .profile-container .subtitle {
    font-size: 1.1em;
    color: var(--fg);
    opacity: 0.85;
    margin-top: -0.5em;
    margin-bottom: 1em;
  }
  .profile-container blockquote {
    font-style: italic;
    border-left: 3px solid var(--accent);
    padding-left: 12px;
    margin-left: 0;
    color: var(--fg);
    opacity: 0.9;
  }


  /* News Ticker */
  .news-ticker-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 32px auto; /* Allineato con centered-block */
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 8px var(--accent)22;
    border-radius: 7px;
    display: flex;
    align-items: center;
    overflow: hidden;
    min-height: 48px;
    padding: 0 10px; /* Padding interno */
  }
  .news-icon {
    font-size: 1.5em; /* Leggermente ridotto */
    color: var(--accent);
    margin-right: 12px;
    filter: drop-shadow(0 0 4px var(--accent)55);
    flex-shrink: 0;
  }
  .news-ticker {
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: ticker-scroll 24s linear infinite;
    font-size: 0.95em; /* Leggermente ridotto */
  }
  .ticker-item {
    display: inline-block;
    margin-right: 48px;
    color: var(--fg);
    font-weight: 500;
  }
  .ticker-item .pub-date { color: var(--accent); font-weight: bold; margin-right: 8px; }
  .ticker-item .pub-title { color: var(--fg); font-weight: normal; margin-right: 5px; } /* Testo normale per il titolo */
  .ticker-item .pub-venue {
    color: var(--bg); /* Testo scuro/chiaro a seconda del tema */
    background: var(--accent);
    padding: 2px 8px; border-radius: 4px; /* Più squadrato */
    margin-left: 8px; font-weight: bold; font-size: 0.9em;
  }


  /* Dino Game Container */
  #dino-game-container {
    width: 100%;
    max-width: 900px;
    background: var(--game-canvas-bg); /* Sfondo del container */
    border: 1px solid var(--border-color);
    border-bottom: 4px solid var(--accent); /* Bordo inferiore accentuato */
    border-radius: 8px; /* Stessa curvatura del .centered-block */
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    margin: 0 auto 24px auto; /* Centrato */
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #dinoGame { /* Il canvas stesso */
    width: 100%;
    /* max-width gestito dal container */
    background: var(--game-canvas-bg); /* Sfondo del canvas, può essere var(--bg) per integrarsi */
    border-radius: 4px; /* Leggera curvatura interna */
  }
  #dino-score-text { /* Testo "Jump over obstacles" */
    color: var(--fg);
    opacity: 0.7;
    font-size: 0.9em;
    margin-top: 8px;
  }
  #dino-game-controls button {
    padding: 8px 16px; font-size: 1em; border: 1px solid var(--border-color); border-radius: 6px;
    background: var(--accent); color: var(--bg); /* O testo bianco/nero fisso */
    cursor: pointer;
    font-family: var(--font-body); /* Usa il font del body */
    transition: background 0.3s, filter 0.3s;
  }
  #dino-game-controls button:hover {
    filter: brightness(1.15);
  }
  #dino-game-controls { margin-top: 12px; display:flex; gap:12px; }


  /* EDUCATION TIMELINE */
  .timeline {
    position: relative;
    padding: 20px 0;
    margin-top: 1em;
  }
  .timeline::before { /* La linea verticale centrale */
    content: '';
    position: absolute;
    left: 20px; /* Spostata a sinistra per layout a colonna singola */
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--accent);
    border-radius: 2px;
  }
  .timeline ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .timeline li {
    margin-bottom: 30px;
    position: relative;
    padding-left: 50px; /* Spazio per il pallino e la linea */
    border-bottom: none; /* Rimuovi la linea tratteggiata di default delle li */
  }
  .timeline li::before { /* Il pallino sulla linea */
    content: '';
    position: absolute;
    left: 9.5px; /* Centra il pallino sulla linea (20px - (20px/2) - (width/2) approx ) -> (20px - 10px - width/2) */
    top: 5px; /* Allineamento verticale del pallino */
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--accent);
    border: 3px solid var(--bg); /* Crea effetto "buco" */
    z-index: 1;
    transform: translateX(-50%); /* Centra esattamente sulla linea */
     left: 21.5px; /* (line-left + line-width/2) */
  }
  .timeline-content {
    background-color: var(--bg); /* Sfondo leggermente diverso per staccare */
    padding: 15px;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  .timeline-content h3 { /* Titolo dell'evento nella timeline */
    margin-top: 0;
    font-size: 1.2em;
    color: var(--accent);
  }
  .timeline-content p {
    margin-bottom: 0;
    font-size: 0.95em;
    color: var(--fg);
    opacity: 0.9;
  }
  .timeline-date { /* Per le date, se vuoi separarle */
    display: block;
    font-size: 0.9em;
    color: var(--accent);
    font-weight: bold;
    margin-bottom: 5px;
  }


  @media (max-width: 768px) { /* Tablet e Mobile */
    .profile-container {
      flex-direction: column; /* Profilo in colonna */
      text-align: center; /* Testo centrato se in colonna */
    }
    .profile-container .profile-pic { margin-bottom: 1em; }
    .profile-container div { text-align: center; } /* Allinea testo del profilo al centro */
    .profile-container blockquote { margin: 1em auto; }

    h1 { font-size: 2em; }
    h2 { font-size: 1.6em; }
  }

  @media (max-width: 600px) { /* Mobile Specific */
    .centered-block, .news-ticker-container, #dino-game-container {
      max-width: 100vw; padding: 16px; box-sizing: border-box;
      border-radius: 0; border-left:0; border-right:0; /* Full width */
    }
    .profile-container { padding-left: 16px; padding-right: 16px; }

    .news-ticker { animation: ticker-scroll 18s linear infinite; }
    .profile-pic { width: 100px; height: 100px; }

    /* Timeline su mobile: già a colonna singola, va bene */
    .timeline::before { left: 15px; } /* Linea più vicina al bordo */
    .timeline li { padding-left: 40px; } /* Meno padding */
    .timeline li::before { left: 16.5px; }
  }
</style>

<div id="theme-switcher">
  <button id="night-mode-btn" title="Night Mode">🌙</button>
  <button id="day-mode-btn" title="Day Mode">☀️</button>
</div>

<div class="profile-container">
  <img src="assets/img/Antonio.jpeg" alt="Antonio Serino" class="profile-pic"/>
  <div>
    <h1>👨‍💻 Antonio Serino</h1>
    <p class="subtitle">Data Scientist · PhD Student · NLP Researcher</p>
    <blockquote>
      “Luck does not exist: there is a moment when talent meets opportunity.”
    </blockquote>
  </div>
</div>

<div class="news-ticker-container">
  <span class="news-icon">📰</span>
  <div class="news-ticker" id="news-ticker">
    <span class="ticker-item">
      <span class="pub-date">May 2025</span> – <span class="pub-title">Towards the Terminator Economy</span> <span class="pub-venue">IJCAI 2025</span>
    </span>
    <span class="ticker-item">
      <span class="pub-date">Mar 2025</span> – <span class="pub-title">SkiLLMo: Normalized ESCO Skill Extraction</span> <span class="pub-venue">ACM SAC 2025</span>
    </span>
    <span class="ticker-item">
      <span class="pub-date">Oct 2024</span> – <span class="pub-title">An approach to Evaluative AI</span> <span class="pub-venue">ECAI 2024</span>
    </span>
  </div>
</div>

<div id="dino-game-container">
  <canvas id="dinoGame" width="850" height="160"></canvas> <p id="dino-score-text">Jump over obstacles! (Spacebar or Button)</p>
  <div id="dino-game-controls">
    <button id="jump-btn">Jump</button>
    <button id="restart-btn">Restart</button>
  </div>
</div>

<div class="centered-block">
  <div class="content-section">
    <h2>🔍 About Me</h2>
    <p>
    Currently a PhD student at the University of Milano-Bicocca in <strong>Big Data Analytics for Business</strong>.
    My research area focuses on <strong>Artificial Intelligence</strong> and <strong>Natural Language Processing</strong>, with a specific focus on the <strong>evaluation</strong>, <strong>explanation</strong> and <strong>interpretation</strong> of <strong>Machine Learning</strong>, <strong>Transformer</strong> and <strong>Large Language Models</strong>. 
    Moreover, every day I try to tackle the challenge of smartly integrating these systems into a business perspective to improve the human-machine collaboration paradigm.
    I love being multi-disciplinary and drinking sugar-free coffee.
    </p>
  </div>

  <div class="content-section">
    <h2>📚 Publications</h2>
    <ul>
      <li><span class="pub-date">Mar 2025</span> – <em>SkiLLMo: Normalized ESCO Skill Extraction through Transformer Models</em> – ACM SAC 2025</li>
      <li><span class="pub-date">Feb 2025</span> – <em>Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs</em> – IJCAI 2025</li>
      <li><span class="pub-date">Oct 2024</span> – <em>An approach to Evaluative AI through LLMs</em> – ECAI 2024</li>
      <li><span class="pub-date">Jul 2024</span> – <em>Augmenting XAI with LLMs</em> – XAI World Conf 2024 <em style="color: var(--accent);">(Best Presentation Award)</em></li>
      <li><span class="pub-date">Jun 2024</span> – <em>Disce aut Deficere: Evaluating LLMs Proficiency on INVALSI</em> – arXiv - Under Review at ECML-PKDD 2025</li>
      <li><span class="pub-date">Nov 2023</span> – <em>Skills-Hunter: Adapting LLMs to Labour Market Skill Extraction</em> – AIxIA 2023</li>
    </ul>
  </div>

  <div class="content-section">
    <h2>🚀 Projects</h2>
    <ul>
      <li><strong>MHEO Report</strong> – Labour market analysis on 100K+ Lombardy graduates</li>
      <li><strong>TEAI & TRAI Indexes</strong> – Framework to assess AI exposure to job occupations </li>
      <li><strong>Skills-Hunter & SkiLLMo</strong> – NLP pipelines for ESCO skill extraction and standardization</li>
    </ul>
  </div>

  <div class="content-section">
    <h2>💼 Experience</h2>
    <ul>
      <li><strong>2024–2025</strong> – Research collaboration at Univ. of Milan – MHEO Report (Statale & Bicocca)</li>
      <li><strong>2023–2024</strong> – NLP Researcher – Interuniversity Research Centre for Public Services</li>
    </ul>
  </div>
  
  <div class="content-section">
    <h2>✍🏻 Review Activities</h2>
    <ul>
      <li><strong>ECML-PKDD 2024</strong> – Research Track</li>
      <li><strong>COLING 2025</strong> – Industry Track</li>
      <li><strong>Knowledge-Based Systems</strong> – Journal Q1</li>
      <li><strong>International Journal of Information Technology & Decision Making</strong> - Journal Q2</li>
    </ul>
  </div>

  <div class="content-section">
    <h2>🎓 Education</h2>
    <div class="timeline">
      <ul>
        <li>
          <div class="timeline-content">
            <span class="timeline-date">2023 – Now</span>
            <h3>PhD – Big Data & Analytics</h3>
            <p>University of Milano-Bicocca</p>
          </div>
        </li>
        <li>
          <div class="timeline-content">
            <span class="timeline-date">2021 – 2023</span>
            <h3>MSc – Data Science</h3>
            <p>University of Milano-Bicocca</p>
          </div>
        </li>
        <li>
          <div class="timeline-content">
            <span class="timeline-date">2018 – 2021</span>
            <h3>BSc – Computer Science</h3>
            <p>University of Bari</p>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="content-section">
    <h2>📫 Contact</h2>
    <ul>
      <li>📧 Email: <a href="mailto:a.serino3@campus.unimib.it">a.serino3@campus.unimib.it</a></li>
      <li>🔗 GitHub: <a href="https://github.com/serino28" target="_blank" rel="noopener noreferrer">serino28</a></li>
      <li>💼 LinkedIn: <a href="https://www.linkedin.com/in/antonio-serino-881799205" target="_blank" rel="noopener noreferrer">antonio-serino</a></li>
    </ul>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function(){
  // News Ticker Duplication for seamless scroll
  const ticker = document.getElementById('news-ticker');
  if (ticker && ticker.children.length > 0) {
      if (ticker.scrollWidth > ticker.offsetWidth) { // Solo se il contenuto è più largo del contenitore
        const originalContent = ticker.innerHTML;
        ticker.innerHTML += originalContent; // Duplica una volta
        if (ticker.scrollWidth < ticker.offsetWidth * 2) { // Se ancora non basta (caso raro con poco contenuto)
             ticker.innerHTML += originalContent; // Duplica di nuovo
        }
      }
  }

  // Theme Switcher Logic
  const nightModeBtn = document.getElementById('night-mode-btn');
  const dayModeBtn = document.getElementById('day-mode-btn');
  const body = document.body;

  function setActiveButton(theme) {
    if (theme === 'day') {
        dayModeBtn.classList.add('active');
        nightModeBtn.classList.remove('active');
    } else {
        nightModeBtn.classList.add('active');
        dayModeBtn.classList.remove('active');
    }
  }

  function applyTheme(theme) {
    if (theme === 'day') {
      body.classList.add('day-mode');
    } else {
      body.classList.remove('day-mode');
    }
    localStorage.setItem('site-theme', theme);
    setActiveButton(theme);
    document.dispatchEvent(new CustomEvent('themeChanged')); // Notifica il gioco
  }

  nightModeBtn.addEventListener('click', () => applyTheme('night'));
  dayModeBtn.addEventListener('click', () => applyTheme('day'));

  // Load saved theme or default to night
  const savedTheme = localStorage.getItem('site-theme') || 'night';
  applyTheme(savedTheme);
});


// Dino game (stessa logica di prima, ma ora legge le variabili CSS del tema Giorno/Notte)
(function() {
  const canvas = document.getElementById('dinoGame');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  // const scoreDisplay = document.getElementById('dino-score'); // Non più usato per il testo di GAMEOVER
  const gameMessageElement = document.getElementById('dino-score-text'); // Per messaggi come "Press Space"

  let cw = canvas.offsetWidth, ch = canvas.offsetHeight; // Usa offsetWidth/Height per dimensioni reali
  let dino = { x:30, y:0, vy:0, jumping:false, w:32, h:26 };
  let ground, gravity=0.8, jumpForce=-13, speedMul=1.1; // Ridotto leggermente speedMul
  let obstacles=[], frame=0, score=0, gameOver=false;
  let rafId;

  let dinoColor, obstacleColor, gameTextColor, gameGroundColor, dinoEyeColor, gameCanvasBg;

  function getCssVariable(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  }

  function updateGameColors() {
    dinoColor = getCssVariable('--dino-color');
    obstacleColor = getCssVariable('--obstacle-color');
    gameTextColor = getCssVariable('--game-text-color');
    gameGroundColor = getCssVariable('--game-ground-color');
    dinoEyeColor = getCssVariable('--dino-eye-color');
    gameCanvasBg = getCssVariable('--game-canvas-bg');
    canvas.style.backgroundColor = gameCanvasBg; // Imposta lo sfondo del canvas
  }

  function resizeCanvas(){
    // La larghezza del canvas è 100% del suo contenitore (#dino-game-container)
    // L'altezza è fissa a 160px come da attributi HTML
    cw = canvas.offsetWidth; // Aggiorna la larghezza effettiva
    ch = canvas.height; // Altezza fissa
    ground = ch - 40; 
    if(dino) dino.y = ground - dino.h;
  }
  window.addEventListener('resize', resizeCanvas);


  function reset(){
    updateGameColors(); 
    resizeCanvas(); // Assicura che le dimensioni siano corrette
    dino.y = ground - dino.h; 
    dino.vy = 0; 
    dino.jumping = false;
    obstacles = []; 
    frame = 0; 
    score = 0; 
    gameOver = false;
    if(gameMessageElement) gameMessageElement.innerText = "Jump over obstacles! (Spacebar or Button)";
    
    if (rafId) cancelAnimationFrame(rafId); // Cancella vecchio frame se esiste
    rafId = requestAnimationFrame(update); // Riavvia loop di gioco
  }

  function drawDino(){
    ctx.fillStyle = dinoColor;
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
    ctx.fillStyle = dinoEyeColor;
    ctx.fillRect(dino.x + dino.w - 9, dino.y + 6, 5, 5);
  }

  function drawObs(o){
    ctx.fillStyle = obstacleColor;
    if (o.type === 'cactus_small' || o.type === 'cactus_large') {
      ctx.fillRect(o.x, ground - o.h + 1, o.w, o.h);
      if (o.hasArm) {
        const armWidth = o.w / 3;
        const armHeight = o.h * 0.4;
        const armY = ground - o.h * 0.7 + 1;
        ctx.fillRect(o.x + (o.armSide === 'left' ? -armWidth + 2 : o.w - 2), armY, armWidth, armHeight);
      }
    } else if (o.type === 'bird') {
      ctx.fillRect(o.x, o.yPos, o.w, o.h); // Corpo
      // Ali stilizzate
      ctx.beginPath();
      ctx.moveTo(o.x - o.w * 0.4, o.yPos + o.h / 2);
      ctx.lineTo(o.x + o.w / 2, o.yPos - o.h * 0.3);
      ctx.lineTo(o.x + o.w / 2, o.yPos + o.h * 1.3);
      ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(o.x + o.w + o.w * 0.4, o.yPos + o.h / 2);
      ctx.lineTo(o.x + o.w / 2, o.yPos - o.h * 0.3);
      ctx.lineTo(o.x + o.w / 2, o.yPos + o.h * 1.3);
      ctx.closePath(); ctx.fill();
    }
  }
  
  function update(){
    if (gameOver) {
      ctx.font = `bold 30px ${getCssVariable('--font-game')}`; // Usa il font del gioco
      ctx.fillStyle = obstacleColor;
      const text = "GAME OVER";
      const textWidth = ctx.measureText(text).width;
      ctx.fillText(text, (cw - textWidth) / 2, ch / 2 - 10);
      
      ctx.font = `16px ${getCssVariable('--font-game')}`;
      const scoreText = `Final Score: ${score}`;
      const scoreTextWidth = ctx.measureText(scoreText).width;
      ctx.fillText(scoreText, (cw - scoreTextWidth) / 2, ch / 2 + 20);

      if(gameMessageElement) gameMessageElement.innerText = "Press Space or Restart";
      rafId = null; // Indica che il loop è fermo
      return;
    }

    ctx.clearRect(0, 0, cw, ch); // Pulisce il canvas (lo sfondo è gestito da canvas.style.backgroundColor)

    ctx.fillStyle = gameGroundColor;
    ctx.fillRect(0, ground + (ch - ground - 5)/2 , cw, 5);

    drawDino();
    
    dino.y += dino.vy; 
    dino.vy += gravity;
    if(dino.y >= ground - dino.h){
      dino.y = ground - dino.h; 
      dino.vy = 0;
      dino.jumping = false;
    }
    
    const obstacleFrequency = Math.max(30, 75 - Math.floor(score / 100)); // Più frequenti con punteggio
    if(frame % obstacleFrequency === 0) {
      let type = (Math.random() < 0.45) ? 'cactus_small' : (Math.random() < 0.85 ? 'cactus_large' : 'bird');
      let newObstacle = { x: cw, type: type };
      if (type === 'cactus_small') {
        newObstacle.w = 18 + Math.random() * 10; newObstacle.h = 30 + Math.random() * 15;
      } else if (type === 'cactus_large') {
        newObstacle.w = 25 + Math.random() * 15; newObstacle.h = 40 + Math.random() * 20;
        if (Math.random() < 0.5) {newObstacle.hasArm = true; newObstacle.armSide = Math.random() < 0.5 ? 'left' : 'right';}
      } else if (type === 'bird') {
        newObstacle.w = 28 + Math.random() * 10; newObstacle.h = 18 + Math.random() * 8;  
        newObstacle.yPos = ground - (Math.random() < 0.4 ? dino.h*0.7 : dino.h + newObstacle.h + 5 + Math.random()*15) ;
      }
      obstacles.push(newObstacle);
    }
    
    const currentSpeed = Math.max(5, cw/220) * speedMul * (1 + score / 1500);
    for (let i = obstacles.length - 1; i >= 0; i--) {
      let o = obstacles[i];
      o.x -= currentSpeed;
      drawObs(o);
      if (o.type === 'bird') { // Collisione Uccello
        if (dino.x < o.x + o.w && dino.x + dino.w > o.x && dino.y < o.yPos + o.h && dino.y + dino.h > o.yPos) gameOver = true;
      } else { // Collisione Cactus
        if (dino.x < o.x + o.w && dino.x + dino.w > o.x && dino.y + dino.h > ground - o.h +1 ) gameOver = true;
      }
      if (o.x + o.w < 0) { obstacles.splice(i, 1); if (!gameOver) score++; }
    }
    
    ctx.font = `bold 20px ${getCssVariable('--font-game')}`; // Usa il font del gioco
    ctx.fillStyle = gameTextColor;
    ctx.textAlign = "right";
    ctx.fillText(`Score: ${score}`, cw - 15, 30);
    ctx.textAlign = "left";

    frame++; 
    rafId = requestAnimationFrame(update);
  }

  function handleJump() { if (!gameOver && !dino.jumping){ dino.vy = jumpForce; dino.jumping = true; }}
  function handleRestart() { if(gameOver) reset(); }

  document.addEventListener('keydown', e => {
    if(e.code === 'Space'){ e.preventDefault(); gameOver ? handleRestart() : handleJump(); }
  });
  document.getElementById('jump-btn')?.addEventListener('click', handleJump);
  document.getElementById('restart-btn')?.addEventListener('click', handleRestart);

  document.addEventListener('themeChanged', () => {
    updateGameColors(); // Aggiorna colori
    if (!rafId && !gameOver) { // Se il gioco era fermo ma non gameover (raro), ridisegna
       requestAnimationFrame(update);
    } else if (gameOver) { // Se è game over, ridisegna lo stato di game over
        ctx.clearRect(0,0,cw,ch);
        ctx.fillStyle = gameGroundColor; ctx.fillRect(0, ground + (ch - ground - 5)/2 , cw, 5);
        drawDino(); obstacles.forEach(o => drawObs(o));
        // Testo Game Over
        ctx.font = `bold 30px ${getCssVariable('--font-game')}`; ctx.fillStyle = obstacleColor;
        const text = "GAME OVER"; const textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (cw - textWidth) / 2, ch / 2 - 10);
        ctx.font = `16px ${getCssVariable('--font-game')}`;
        const scoreText = `Final Score: ${score}`; const scoreTextWidth = ctx.measureText(scoreText).width;
        ctx.fillText(scoreText, (cw - scoreTextWidth) / 2, ch / 2 + 20);
    }
  });
  
  // Inizializzazione
  updateGameColors(); // Prima chiamata per impostare i colori
  resizeCanvas();     // Imposta dimensioni canvas
  reset();            // Inizia il gioco
})();
</script>