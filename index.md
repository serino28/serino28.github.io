---
layout: default
title: ""
---

<link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Roboto+Mono:wght@400;500;700&family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>

<style>
  :root {
    --bg: #0D1117;
    --bg-gradient: radial-gradient(ellipse at center, #1A222F 0%, #0D1117 100%);
    --fg: #C9D1D9;
    --accent: #58A6FF;
    --accent-hover: #79C0FF;
    --border-color: #30363D;
    --card-bg: #161B22;

    --font-heading: 'Audiowide', cursive;
    --font-body: 'Roboto Mono', monospace;
    --font-game: 'Orbitron', monospace;

    --dino-color: var(--accent);
    --obstacle-color: #F78166;
    --game-text-color: var(--fg);
    --game-ground-color: var(--border-color);
    --dino-eye-color: var(--bg);
    --game-canvas-bg: var(--card-bg);

    transition: background 0.3s, color 0.3s;
  }

  body.day-mode {
    --bg: #F6F8FA;
    --bg-gradient: linear-gradient(180deg, #FFFFFF 0%, #F6F8FA 100%);
    --fg: #24292F;
    --accent: #0969DA;
    --accent-hover: #0C82FB;
    --border-color: #D0D7DE;
    --card-bg: #FFFFFF;

    --dino-color: var(--fg);
    --obstacle-color: #CF222E;
    --game-text-color: var(--fg);
    --game-ground-color: var(--border-color);
    --dino-eye-color: var(--bg);
    --game-canvas-bg: var(--card-bg);
  }

  body {
    background: var(--bg-gradient);
    color: var(--fg);
    font-family: var(--font-body);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    text-align: center;
    line-height: 1.6;
  }

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
    text-shadow: 0 0 8px var(--accent)33;
    letter-spacing: 1.5px;
    margin-bottom: 0.75em;
    margin-top: 1.5em;
  }
  h1 { font-size: 2.2em; }
  h2 { font-size: 1.8em; border-bottom: 1px solid var(--border-color); padding-bottom: 0.3em;}
  h3 { font-size: 1.4em; }

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
    font-size: 1.3em;
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
  #theme-switcher button.active {
    background: var(--accent);
    color: var(--bg);
    border-color: var(--accent);
  }

  .centered-block {
    max-width: 900px;
    margin: 24px auto 32px auto;
    padding: 24px;
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    text-align: left;
  }
  .content-section {
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

  .profile-pic {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid var(--accent);
    box-shadow: 0 0 15px var(--accent)77;
    object-fit: cover;
    background: var(--bg);
  }
  .profile-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    text-align: left;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding-top: 3em;
    padding-bottom: 1em;
    max-width: 900px;
    margin: 0 auto 24px auto;
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

  .news-ticker-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 32px auto;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 8px var(--accent)22;
    border-radius: 7px;
    display: flex;
    align-items: center;
    overflow: hidden;
    min-height: 48px;
    padding: 0 10px;
    position: relative;
    height: 54px;
  }
  .news-icon {
    font-size: 1.5em;
    color: var(--accent);
    margin-right: 12px;
    filter: drop-shadow(0 0 4px var(--accent)55);
    flex-shrink: 0;
  }
  .news-ticker {
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: ticker-scroll 40s linear infinite;
    font-size: 1.07em;
    will-change: transform;
  }
  .ticker-item {
    display: inline-block;
    margin-right: 48px;
    color: var(--fg);
    font-weight: 500;
  }
  .ticker-item .pub-date { color: var(--accent); font-weight: bold; margin-right: 8px; }
  .ticker-item .pub-title { color: var(--fg); font-weight: normal; margin-right: 5px; }
  .ticker-item .pub-venue {
    color: var(--bg);
    background: var(--accent);
    padding: 2px 8px; border-radius: 4px;
    margin-left: 8px; font-weight: bold; font-size: 0.9em;
  }
  @keyframes ticker-scroll {
    0% { transform: translateX(100%);}
    100% { transform: translateX(-100%);}
  }

  #dino-game-container {
    width: 100%;
    max-width: 900px;
    background: var(--game-canvas-bg);
    border: 1px solid var(--border-color);
    border-bottom: 4px solid var(--accent);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    margin: 0 auto 24px auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #dinoGame {
    width: 100%;
    background: var(--game-canvas-bg);
    border-radius: 4px;
  }
  #dino-score-text {
    color: var(--fg);
    opacity: 0.7;
    font-size: 0.9em;
    margin-top: 8px;
  }
  #dino-game-controls button {
    padding: 8px 16px; font-size: 1em; border: 1px solid var(--border-color); border-radius: 6px;
    background: var(--accent); color: var(--bg);
    cursor: pointer;
    font-family: var(--font-body);
    transition: background 0.3s, filter 0.3s;
  }
  #dino-game-controls button:hover {
    filter: brightness(1.15);
  }
  #dino-game-controls { margin-top: 12px; display:flex; gap:12px; }

  .timeline {
    position: relative;
    padding: 20px 0;
    margin-top: 1em;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 20px;
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
    padding-left: 50px;
    border-bottom: none;
  }
  .timeline li::before {
    content: '';
    position: absolute;
    left: 21.5px;
    top: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--accent);
    border: 3px solid var(--bg);
    z-index: 1;
    transform: translateX(-50%);
  }
  .timeline-content {
    background-color: var(--bg);
    padding: 15px;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  .timeline-content h3 {
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
  .timeline-date {
    display: block;
    font-size: 0.9em;
    color: var(--accent);
    font-weight: bold;
    margin-bottom: 5px;
  }

  .about-me-fancy .fancy-intro {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }
  .about-me-fancy .intro-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    transition: transform;
    transform: scale(1.0);
  }
  .about-me-fancy .intro-card:hover {
    transform: scale(1.05);
  }
  .about-me-fancy .intro-card h3 {
    color: var(--accent);
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 1.1em;
  }
  .about-me-fancy .intro-card p {
    font-size: 0.9em;
    color: var(--fg);
    opacity: 0.8;
    margin-bottom: 0;
  }
  .about-me-fancy .intro-card .icon {
    font-size: 1.5em;
    opacity: 0.7;
    display: block;
    margin-top: 10px;
  }
  .about-me-fancy .intro-details {
    font-size: 0.95em;
    color: var(--fg);
    opacity: 0.9;
    line-height: 1.7;
    margin-top: 20px;
  }

  #publications-map {
    height: 350px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    margin-bottom: 20px;
  }
  .publication-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .publication-marker .sigla {
    background-color: var(--accent);
    color: var(--bg);
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.8em;
    white-space: nowrap;
    margin-bottom: 4px;
  }
  .publication-label {
    background-color: var(--card-bg);
    color: var(--fg);
    padding: 8px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.9em;
    white-space: nowrap;
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -150%);
    transition: opacity 0.2s ease-in-out;
    z-index: 1000;
    pointer-events: none;
  }
  .leaflet-marker-icon:hover + .publication-label {
    opacity: 1;
  }
  .leaflet-div-icon {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    width: auto !important;
    height: auto !important;
  }
</style>

<div id="theme-switcher">
  <button id="night-mode-btn" title="Night Mode">🌙</button>
  <button id="day-mode-btn" title="Day Mode">☀️</button>
</div>

<!-- NEWS TICKER (ULTIMI 3 PAPER) -->
<div class="news-ticker-container">
  <span class="news-icon">📰</span>
  <div class="news-ticker" id="news-ticker">
    <span class="ticker-item">
      <span class="pub-date">May 2025</span> – <span class="pub-title">A Benchmark to Evaluate LLMs’ Proficiency on Italian Student Competencies</span> <span class="pub-venue">ECML-PKDD 2025</span>
    </span>
    <span class="ticker-item">
      <span class="pub-date">Mar 2025</span> – <span class="pub-title">Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs </span> <span class="pub-venue">IJCAI 2025</span>
    </span>
    <span class="ticker-item">
      <span class="pub-date">Mar 2025</span> – <span class="pub-title">SkiLLMo: Normalized ESCO Skill Extraction</span> <span class="pub-venue">ACM SAC 2025</span>
    </span>
  </div>
</div>

<!-- PROFILE CONTAINER (ora subito sotto il ticker) -->
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

<!-- DINO GAME -->
<div id="dino-game-container">
  <canvas id="dinoGame" width="850" height="160"></canvas> <p id="dino-score-text">Jump over obstacles! (Spacebar or Button)</p>
  <div id="dino-game-controls">
    <button id="jump-btn">Jump</button>
    <button id="restart-btn">Restart</button>
  </div>
</div>

<!-- RESTO DEL SITO -->
<div class="centered-block">
  <!-- About Me in English -->
  <div class="content-section about-me-fancy">
    <h2>🔍 About Me</h2>
    <div class="fancy-intro">
      <div class="intro-card" style="--accent-color: var(--accent);">
        <h3>Artificial Intelligence & NLP</h3>
        <p>I explore the frontiers of language and automated reasoning.</p>
        <span class="icon">🧠</span>
      </div>
      <div class="intro-card" style="--accent-color: #F78166;">
        <h3>Evaluation and Interpretability</h3>
        <p>I work on making machine learning models more transparent and reliable.</p>
        <span class="icon">💡</span>
      </div>
      <div class="intro-card" style="--accent-color: #6F42C1;">
        <h3>Business Applications</h3>
        <p>I integrate AI to enhance human-machine collaboration in business contexts.</p>
        <span class="icon">📈</span>
      </div>
    </div>
    <div class="intro-details">
      <p>I am currently a PhD student in <strong>Big Data Analytics for Business</strong> at the University of Milano-Bicocca. My research focuses on <strong>Artificial Intelligence</strong> and <strong>Natural Language Processing</strong>, with particular attention to the <strong>evaluation</strong>, <strong>explanation</strong>, and <strong>interpretation</strong> of <strong>Machine Learning</strong> models, <strong>Transformers</strong>, and <strong>Large Language Models</strong>.</p>
      <p>I tackle the challenge of smartly integrating these technologies into business environments to empower effective human-AI synergy. I believe in the value of multidisciplinary approaches, and my passion for knowledge is fueled by a cup of coffee (no sugar) ☕.</p>
    </div>
  </div>

  <!-- Publications -->
  <div class="content-section">
    <h2>📚 Publications</h2>
    <div id="publications-map" style="height:350px;width:100%;max-width:900px;margin:0 auto 20px auto;background:#eee;"></div>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function(){
  // Array di tutte le pubblicazioni con coordinate, sigla e titolo
  var pubs = [
    {
      lat: 41.1621, lng: -8.6291,
      sigla: "ECML-PKDD 25",
      title: "Disce aut Deficere: Evaluating LLMs Proficiency on INVALSI",
      city: "Porto, Portogallo"
    },
    {
      lat: 45.5017, lng: -73.5673,
      sigla: "IJCAI 25",
      title: "Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs",
      city: "Montreal, Canada"
    },
    {
      lat: 37.5022, lng: 15.0873,
      sigla: "ACM SAC 25",
      title: "SkiLLMo: Normalized ESCO Skill Extraction through Transformer Models",
      city: "Catania, Italia"
    },
    {
      lat: 42.8782, lng: -8.5449,
      sigla: "ECAI 24",
      title: "An approach to Evaluative AI through LLMs",
      city: "Santiago de Compostela, Spagna"
    },
    {
      lat: 35.9375, lng: 14.5001,
      sigla: "XAI World 24",
      title: "Augmenting XAI with LLMs",
      city: "Malta, Malta"
    },
    {
      lat: 41.9028, lng: 12.4964,
      sigla: "AIxIA 23",
      title: "Skills-Hunter: Adapting LLMs to Labour Market Skill Extraction",
      city: "Roma, Italia"
    }
  ];

    // Centra la mappa sul primo punto (puoi usare [45.4642,9.19] se vuoi Milano)
    var map = L.map('publications-map').setView([41.1621, 12.5], 3.7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Aggiungi i marker
    pubs.forEach(function(pub) {
      L.marker([pub.lat, pub.lng]).addTo(map)
        .bindPopup('<strong>' + pub.sigla + '</strong><br/>' +
                  pub.title + '<br/><i>' + pub.city + '</i>');
    });

    // Adatta la vista a tutti i marker
    var group = new L.featureGroup(pubs.map(pub => L.marker([pub.lat, pub.lng])));
    map.fitBounds(group.getBounds().pad(0.25));
    });
  </script>
  </div>

  <!-- Education spostata qui -->
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

  <!-- Projects -->
  <div class="content-section">
    <h2>🚀 Projects</h2>
    <ul>
      <li><strong>MHEO Report</strong> – Labour market analysis on 100K+ Lombardy graduates</li>
      <li><strong>TEAI & TRAI Indexes</strong> – Framework to assess AI exposure to job occupations </li>
      <li><strong>Skills-Hunter & SkiLLMo</strong> – NLP pipelines for ESCO skill extraction and standardization</li>
    </ul>
  </div>

  <!-- Experience -->
  <div class="content-section">
    <h2>💼 Experience</h2>
    <ul>
      <li><strong>2024–2025</strong> – Research collaboration at Univ. of Milan – MHEO Report (Statale & Bicocca)</li>
      <li><strong>2023–2024</strong> – NLP Researcher – Interuniversity Research Centre for Public Services</li>
    </ul>
  </div>

  <!-- Review Activities -->
  <div class="content-section">
    <h2>✍🏻 Review Activities</h2>
    <ul>
      <li><strong>ECML-PKDD 2024</strong> – Research Track</li>
      <li><strong>COLING 2025</strong> – Industry Track</li>
      <li><strong>Knowledge-Based Systems</strong> – Journal Q1</li>
      <li><strong>International Journal of Information Technology & Decision Making</strong> - Journal Q2</li>
    </ul>
  </div>

  <!-- Contact -->
  <div class="content-section">
    <h2>📫 Contact</h2>
    <ul>
      <li>📧 Email: <a href="mailto:a.serino3@campus.unimib.it">a.serino3@campus.unimib.it</a></li>
      <li>🔗 GitHub: <a href="https://github.com/serino28" target="_blank" rel="noopener noreferrer">serino28</a></li>
      <li>💼 LinkedIn: <a href="https://www.linkedin.com/in/antonio-serino-881799205" target="_blank" rel="noopener noreferrer">antonio-serino</a></li>
    </ul>
  </div>
</div>


<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMMLjQi37JyJl1IBVWI/Km2yc4Ilv0nqhccecs0ZnFHjKjnoXtuyVcWRwGDC9QmPxaGxFKZxlIxBMwywJmQ==" crossorigin=""></script>
<script>
document.addEventListener("DOMContentLoaded", function(){

  // Theme Switcher Logic - INALTERATO
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
    document.dispatchEvent(new CustomEvent('themeChanged'));
  }

  nightModeBtn.addEventListener('click', () => applyTheme('night'));
  dayModeBtn.addEventListener('click', () => applyTheme('day'));

  const savedTheme = localStorage.getItem('site-theme') || 'night';
  applyTheme(savedTheme);

  // Dino game - INALTERATO
  (function() {
    const canvas = document.getElementById('dinoGame');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gameMessageElement = document.getElementById('dino-score-text');

    let cw = canvas.offsetWidth, ch = canvas.offsetHeight;
    let dino = { x:30, y:0, vy:0, jumping:false, w:32, h:26 };
    let ground, gravity=0.8, jumpForce=-13, speedMul=1.1;
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
      canvas.style.backgroundColor = gameCanvasBg;
    }

    function resizeCanvas(){
      cw = canvas.offsetWidth;
      ch = canvas.height;
      ground = ch - 40;
      if(dino) dino.y = ground - dino.h;
    }
    window.addEventListener('resize', resizeCanvas);

    function reset(){
      updateGameColors();
      resizeCanvas();
      dino.y = ground - dino.h;
      dino.vy = 0;
      dino.jumping = false;
      obstacles = [];
      frame = 0;
      score = 0;
      gameOver = false;
      if(gameMessageElement) gameMessageElement.innerText = "Jump over obstacles! (Spacebar or Button)";

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
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
        ctx.fillRect(o.x, o.yPos, o.w, o.h);
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
        ctx.font = `bold 30px ${getCssVariable('--font-game')}`;
        ctx.fillStyle = obstacleColor;
        const text = "GAME OVER";
        const textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (cw - textWidth) / 2, ch / 2 - 10);

        ctx.font = `16px ${getCssVariable('--font-game')}`;
        const scoreText = `Final Score: ${score}`;
        const scoreTextWidth = ctx.measureText(scoreText).width;
        ctx.fillText(scoreText, (cw - scoreTextWidth) / 2, ch / 2 + 20);

        if(gameMessageElement) gameMessageElement.innerText = "Press Space or Restart";
        rafId = null;
        return;
      }

      ctx.clearRect(0, 0, cw, ch);

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

      const obstacleFrequency = Math.max(30, 75 - Math.floor(score / 100));
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
        if (o.type === 'bird') {
          if (dino.x < o.x + o.w && dino.x + dino.w > o.x && dino.y < o.yPos + o.h && dino.y + dino.h > o.yPos) gameOver = true;
        } else {
          if (dino.x < o.x + o.w && dino.x + dino.w > o.x && dino.y + dino.h > ground - o.h +1 ) gameOver = true;
        }
        if (o.x + o.w < 0) { obstacles.splice(i, 1); if (!gameOver) score++; }
      }

      ctx.font = `bold 20px ${getCssVariable('--font-game')}`;
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
      updateGameColors();
      if (!rafId && !gameOver) {
         requestAnimationFrame(update);
      } else if (gameOver) {
          ctx.clearRect(0,0,cw,ch);
          ctx.fillStyle = gameGroundColor; ctx.fillRect(0, ground + (ch - ground - 5)/2 , cw, 5);
          drawDino(); obstacles.forEach(o => drawObs(o));
          ctx.font = `bold 30px ${getCssVariable('--font-game')}`; ctx.fillStyle = obstacleColor;
          const text = "GAME OVER"; const textWidth = ctx.measureText(text).width;
          ctx.fillText(text, (cw - textWidth) / 2, ch / 2 - 10);
          ctx.font = `16px ${getCssVariable('--font-game')}`;
          const scoreText = `Final Score: ${score}`; const scoreTextWidth = ctx.measureText(scoreText).width;
          ctx.fillText(scoreText, (cw - scoreTextWidth) / 2, ch / 2 + 20);
      }
    });

    updateGameColors();
    resizeCanvas();
    reset();
  })();

  // Publications Map Initialization
  const mapDiv = document.getElementById('publications-map');
  const publicationsList = document.getElementById('publications-list').querySelectorAll('li');

  if (mapDiv && publicationsList.length > 0) {
    const map = L.map('publications-map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    publicationsList.forEach(item => {
      const lat = parseFloat(item.dataset.lat);
      const lng = parseFloat(item.dataset.lng);
      const sigla = item.dataset.sigla;
      const title = item.dataset.title;

      if (!isNaN(lat) && !isNaN(lng)) {
        const markerDiv = document.createElement('div');
        markerDiv.className = 'publication-marker';
        markerDiv.innerHTML = `<span class="sigla">${sigla}</span><span class="publication-label">${title}</span>`;

        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: markerDiv.outerHTML,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        L.marker([lat, lng], { icon: customIcon }).addTo(map);
      }
    });

    const bounds = new L.LatLngBounds();
    publicationsList.forEach(item => {
      const lat = parseFloat(item.dataset.lat);
      const lng = parseFloat(item.dataset.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        bounds.extend([lat, lng]);
      }
    });
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }

});
</script>
