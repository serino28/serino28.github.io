---
layout: default
title: "Antonio Serino"
---

<!-- ==== TICKER NEWS ==== -->
<div class="news-ticker-container">
  <span class="news-icon"></span>
  <div class="news-ticker" id="news-ticker">
    <span class="ticker-item">
      <span class="pub-date">Mar 2025</span> – <span class="pub-title">SkiLLMo: Normalized ESCO Skill Extraction through Transformer Models</span> <span class="pub-venue">ACM SAC</span>
    </span>
    <span class="ticker-item">
      <span class="pub-date">Feb 2025</span> – <span class="pub-title">Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs</span> <span class="pub-venue">IJCAI</span>
    </span>
    <span class="ticker-item">
      <span class="pub-date">Oct 2024</span> – <span class="pub-title">An approach to Evaluative AI through LLMs</span> <span class="pub-venue">ECAI</span>
    </span>
  </div>
</div>
<!-- ==== FINE TICKER ==== -->

<!-- ==== INIZIO GIOCO DINO CENTRATO ==== -->
<div id="dino-game-container" class="centered-block">
  <canvas id="dinoGame" width="900" height="160"></canvas>
  <div id="dino-score"></div>
  <p style="margin:0;font-size:0.95em;opacity:0.7;">
    Jump over obstacles! <b>Space</b> = jump / restart
  </p>
  <!-- qui inseriamo i bottoni -->
  <div style="margin-top:12px; display:flex; gap:12px;">
    <button id="jump-btn" style="padding:8px 16px; font-size:1em; border:none; border-radius:6px; background:#00ffe7; color:#000;">
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



<!-- ==== STILI E FONT ==== -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto+Mono&display=swap" rel="stylesheet">
<style>
body {
  font-family: 'Roboto Mono', monospace;
  background: radial-gradient(ellipse at center, #181a20 0%, #0e0e0e 100%);
  color: #00ffe7;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  box-sizing: border-box;
  text-align: center;
}
.centered-block {
  max-width: 900px;
  margin: 0 auto 32px auto;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.centered-content {
  max-width: 900px;
  margin: 0 auto 60px auto;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
}
h1, h2, h3 {
  font-family: 'Orbitron', 'Roboto Mono', monospace;
  color: #ff4d00;
  text-shadow: 0 0 8px #ff4d00, 0 0 30px #ffb30050;
  border-bottom: 1px solid #2a2a2a;
  letter-spacing: 2px;
  margin-bottom: 0.5em;
}
.subtitle {
  font-size: 1.25em;
  color: #00ffe7cc;
  margin-bottom: 8px;
  font-family: 'Orbitron', 'Roboto Mono', monospace;
}
blockquote {
  color: #f5a623;
  border-left: 4px solid #ff4d00;
  padding-left: 1em;
  font-style: italic;
  background: #22222760;
  text-shadow: 0 0 4px #000, 0 0 4px #00ffe7;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}
a {
  color: #00ffe7;
  text-decoration: underline;
  transition: color 0.2s;
}
a:hover {
  color: #ff4d00;
}
.profile-container {
  display: flex;
  align-items: center;
  gap: 2em;
  margin-bottom: 2em;
  justify-content: center;
}
.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 100px;
  border: 4px solid #00ffe7;
  box-shadow: 0 0 30px #00ffe766, 0 0 6px #ff4d00cc;
  object-fit: cover;
  background: #181a20;
}
hr, .hr { border: 0; height: 2px; background: linear-gradient(90deg,#ff4d00 0,#00ffe7 100%); margin: 24px 0;}
/* News Ticker */
.news-ticker-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto 32px auto;
  background: linear-gradient(90deg, #ff4d00 0, #222 100%);
  box-shadow: 0 0 16px #ff4d0088, 0 0 8px #00ffe788;
  border-radius: 7px;
  border-bottom: 2px solid #00ffe7;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  min-height: 48px;
  font-family: 'Orbitron', 'Roboto Mono', monospace;
}
.news-icon {
  font-size: 1.65em;
  animation: pulseIcon 1.3s infinite alternate;
  margin: 0 16px 0 10px;
  filter: drop-shadow(0 0 6px #ff4d00);
  flex-shrink: 0;
}
@keyframes pulseIcon {
  0% { filter: drop-shadow(0 0 2px #ff4d00); }
  100% { filter: drop-shadow(0 0 12px #ffb300); }
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
  text-shadow: 0 0 8px #222, 0 0 14px #ffb30055;
}
.pub-date {
  color: #ffb300;
  font-weight: bold;
  margin-right: 10px;
  letter-spacing: 1px;
}
.pub-title {
  color: #00ffe7;
  font-weight: bold;
  margin-right: 7px;
  text-shadow: 0 0 8px #00ffe7, 0 0 12px #fff2;
}
.pub-venue {
  color: #fff;
  background: #00ffe7;
  padding: 2px 10px;
  border-radius: 11px;
  margin-left: 12px;
  font-weight: bold;
  font-size: 0.92em;
  box-shadow: 0 0 4px #ff4d00aa;
}
@keyframes ticker-scroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-60%); }
}
#dino-game-container {
  background: transparent;
  border-bottom: 4px solid #00ffe7;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 0 40px #00ffe788, 0 0 16px #ff4d00bb;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}
#dinoGame {
  display: block;
  width: 100%;
  max-width: 900px;
  background: #181a20;
  border-bottom: 4px solid #ff4d00;
  border-radius: 0 0 12px 12px;
}
#dino-score {
  color: #00ffe7;
  font-family: 'Orbitron', monospace;
  font-size: 1.25em;
  margin-top: 0.4em;
  margin-bottom: 0.2em;
}
@media (max-width: 1000px) {
  .centered-block,
  .centered-content,
  .news-ticker-container {
    max-width: 98vw;
    padding: 0 4vw;
  }
  #dinoGame {
    max-width: 98vw;
  }
  .profile-pic { width: 80px; height: 80px; }
}
@media (max-width: 600px) {
  .profile-container {
    flex-direction: column;
    gap: 1em;
  }
  .centered-block,
  .centered-content,
  .news-ticker-container {
    max-width: 100vw;
    padding: 0 4vw;
  }
  #dinoGame {
    max-width: 100vw;
  }
}
</style>

<script>
// NEWS TICKER - Clona notizie per scroll continuo se ci sono pochi elementi
document.addEventListener("DOMContentLoaded", function(){
  const ticker = document.getElementById('news-ticker');
  if (ticker) {
    const content = ticker.innerHTML;
    // Ripeti le news almeno due volte per uno scroll continuo
    ticker.innerHTML = content + content;
  }
});

// === DINO GAME CENTRATO con controlli mobile e velocità aumentata ===
(function() {
  const canvas = document.getElementById('dinoGame');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let cw = canvas.width, ch = canvas.height;
  let dino = { x: 30, y: 0, vy: 0, jumping: false, w: 32, h: 26 };
  let ground = ch - 40;
  const gravity = 0.8;
  const jumpForce = -13;
  const speedMultiplier = 1.2;  // fattore di velocità
  let obstacles = [], frame = 0, score = 0, gameOver = false;

  function resize() {
    cw = canvas.width = Math.min(900, window.innerWidth - 48);
    ch = canvas.height = 160;
    ground = ch - 40;
    dino.y = ground - dino.h;
  }
  window.addEventListener('resize', resize);
  resize();

  function reset() {
    dino.y = ground - dino.h;
    dino.vy = 0;
    dino.jumping = false;
    obstacles = [];
    frame = 0;
    score = 0;
    gameOver = false;
    document.getElementById('dino-score').innerText = '';
  }

  function drawDino() {
    ctx.fillStyle = '#00ffe7';
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
    ctx.fillStyle = '#181a20';
    ctx.fillRect(dino.x + dino.w - 9, dino.y + 6, 5, 5);
  }

  function drawObstacle(o) {
    ctx.fillStyle = '#ff4d00';
    ctx.fillRect(o.x, ground - o.h + 1, o.w, o.h);
  }

  function update() {
    ctx.clearRect(0,0,cw,ch);
    // terra
    ctx.fillStyle = "#353535";
    ctx.fillRect(0, ground + 20, cw, 5);

    drawDino();

    // fisica
    dino.y += dino.vy;
    dino.vy += gravity;
    if (dino.y >= ground - dino.h) {
      dino.y = ground - dino.h;
      dino.jumping = false;
    }

    // spawn ostacoli più frequente
    if (frame % 60 === 0) {
      obstacles.push({
        x: cw,
        w: 18 + Math.random() * 18,
        h: 30 + Math.random() * 22
      });
    }

    // muovi ostacoli
    obstacles.forEach(o => {
      o.x -= Math.max(6, cw / 220) * speedMultiplier;
      drawObstacle(o);
      // collisione
      if (
        dino.x + dino.w > o.x && dino.x < o.x + o.w &&
        dino.y + dino.h > ground - o.h && dino.y < ground
      ) {
        gameOver = true;
      }
    });
    obstacles = obstacles.filter(o => o.x + o.w > 0);

    // punteggio
    if (frame % 4 === 0) score++;
    ctx.font = "bold 22px Orbitron, monospace";
    ctx.fillStyle = "#00ffe7";
    ctx.fillText(`Score: ${score}`, cw - 180, 38);

    if (gameOver) {
      ctx.font = "bold 36px Orbitron, monospace";
      ctx.fillStyle = "#ff4d00";
      ctx.fillText("GAME OVER", cw/2 - 115, ch/2);
      document.getElementById('dino-score').innerText = "Press Space to Retry";
      return;
    }

    frame++;
    requestAnimationFrame(update);
  }

  // controlli tastiera
  document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.keyCode === 32) {
      e.preventDefault();
      if (!gameOver && !dino.jumping) {
        dino.vy = jumpForce;
        dino.jumping = true;
      } else if (gameOver) {
        reset();
        update();
      }
    }
  });

  // controlli mobile (pulsanti)
  document.getElementById('jump-btn')?.addEventListener('click', function() {
    if (!gameOver && !dino.jumping) {
      dino.vy = jumpForce;
      dino.jumping = true;
    }
  });
  document.getElementById('restart-btn')?.addEventListener('click', function() {
    if (gameOver) {
      reset();
      update();
    }
  });

  // avvio
  reset();
  update();
})();
</script>

