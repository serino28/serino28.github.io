---
layout: default
title: "Antonio Serino"
---

<!-- ==== INIZIO GIOCO DINO ==== -->
<div id="dino-game-container">
  <h2>🎮 Quick Game: Dino Runner!</h2>
  <canvas id="dinoGame" width="400" height="80"></canvas>
  <p style="margin:0;font-size:0.9em;opacity:0.7;">
    Jump over obstacles!<br/>Press <b>Space</b> to jump.
  </p>
  <div id="dino-score"></div>
</div>
<!-- ==== FINE GIOCO DINO ==== -->

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

---

## 🔍 About Me
I’m a PhD student in **Big Data & Analytics for Business** at the University of Milan-Bicocca. My research focuses on **Natural Language Processing (NLP)** and **Large Language Models (LLMs)**, exploring their applications in the labour market and explainable AI.

I’m passionate about solving real-world problems using AI, and I’ve worked extensively on skill extraction, labour data intelligence, and explainable decision-support systems.

---

## 📚 Publications
- **Mar 2025** – *SkiLLMo: Normalized ESCO Skill Extraction through Transformer Models* – ACM SAC
- **Feb 2025** – *Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs* – IJCAI
- **Oct 2024** – *An approach to Evaluative AI through LLMs* – ECAI
- **Jul 2024** – *Augmenting XAI with LLMs* – XAI Conf _(Best Presentation Award)_
- **Jun 2024** – *Disce aut Deficere: Evaluating LLMs Proficiency on INVALSI* – arXiv
- **Nov 2023** – *Skills-Hunter: Adapting LLMs to Labour Market Skill Extraction* – AIxIA

---

## 🚀 Projects
- **MHEO Report** – Labour market analysis on 100K+ Lombardy graduates
- **TEAI Index** – Framework to assess AI task exposure
- **Skills-Hunter & SkiLLMo** – NLP pipelines for ESCO skill extraction and standardization

---

## 💼 Experience
- **2024–2025** – Research collaboration at Univ. of Milan – MHEO Report (Statale & Bicocca)
- **2023–2024** – NLP Researcher – Interuniversity Research Centre for Public Services

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

<!-- === STILE E FONT === -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto+Mono&display=swap" rel="stylesheet">
<style>
body {
  font-family: 'Roboto Mono', monospace;
  background: radial-gradient(ellipse at center, #181a20 0%, #0e0e0e 100%);
  color: #00ffe7;
  padding: 32px 10vw;
  margin: 0;
  min-height: 100vh;
  box-sizing: border-box;
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
  margin-bottom: 1.5em;
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
#dino-game-container {
  background: #191919e8;
  border: 2px solid #00ffe7;
  box-shadow: 0 0 24px #00ffe766;
  border-radius: 16px;
  margin: 2em 0 2.5em 0;
  padding: 1em 2em 1em 2em;
  max-width: 440px;
  text-align: center;
}
#dino-game-container h2 {
  font-family: 'Orbitron', monospace;
  color: #ff4d00;
  margin-top: 0;
  text-shadow: 0 0 8px #ff4d00, 0 0 30px #ffb30050;
}
#dino-score {
  color: #00ffe7;
  font-family: 'Orbitron', monospace;
  font-size: 1.1em;
  margin-top: 0.5em;
}
@media (max-width: 700px) {
  body { padding: 16px; }
  .profile-container { flex-direction: column; align-items: flex-start; gap: 1em; }
  .profile-pic { width: 80px; height: 80px; }
  #dino-game-container { padding: 1em; }
}
hr, .hr { border: 0; height: 2px; background: linear-gradient(90deg,#ff4d00 0,#00ffe7 100%); margin: 24px 0;}
</style>

<script>
(function() {
  // Simple Dino Game
  const canvas = document.getElementById('dinoGame');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let dino = { x: 30, y: 52, vy: 0, jumping: false };
  let ground = 62, gravity = 0.7, jump = -11;
  let obstacles = [], frame = 0, score = 0, gameOver = false;

  function reset() {
    dino.y = 52; dino.vy = 0; dino.jumping = false;
    obstacles = [];
    frame = 0; score = 0; gameOver = false;
    document.getElementById('dino-score').innerText = '';
  }

  function drawDino() {
    ctx.fillStyle = '#00ffe7';
    ctx.fillRect(dino.x, dino.y, 20, 18);
    // Eye
    ctx.fillStyle = '#181a20';
    ctx.fillRect(dino.x + 13, dino.y + 5, 3, 3);
  }
  function drawObstacle(o) {
    ctx.fillStyle = '#ff4d00';
    ctx.fillRect(o.x, ground - o.h + 1, o.w, o.h);
  }
  function update() {
    ctx.clearRect(0,0,400,80);
    // Draw ground
    ctx.fillStyle = "#353535";
    ctx.fillRect(0, ground + 16, 400, 4);
    drawDino();
    // Dino gravity/jump
    dino.y += dino.vy;
    dino.vy += gravity;
    if (dino.y >= 52) { dino.y = 52; dino.jumping = false; }
    // Obstacles
    if (frame % 60 === 0) {
      let h = 20 + Math.random()*18, w = 8 + Math.random()*10;
      obstacles.push({ x: 400, w: w, h: h });
    }
    for (let o of obstacles) {
      o.x -= 4;
      drawObstacle(o);
      // Collision
      if (
        dino.x + 20 > o.x && dino.x < o.x + o.w &&
        dino.y + 18 > ground - o.h && dino.y < ground
      ) {
        gameOver = true;
      }
    }
    obstacles = obstacles.filter(o => o.x + o.w > 0);
    // Score
    score += 1;
    ctx.font = "bold 16px Orbitron, monospace";
    ctx.fillStyle = "#00ffe7";
    ctx.fillText(`Score: ${score}`, 300, 22);
    if (gameOver) {
      ctx.font = "bold 20px Orbitron, monospace";
      ctx.fillStyle = "#ff4d00";
      ctx.fillText("GAME OVER", 130, 45);
      document.getElementById('dino-score').innerText = "Press Space to Retry";
      return;
    }
    frame++;
    requestAnimationFrame(update);
  }
  document.addEventListener('keydown', function(e) {
    if ((e.code === 'Space' || e.keyCode === 32)) {
      if (!gameOver && !dino.jumping) {
        dino.vy = jump;
        dino.jumping = true;
      } else if (gameOver) {
        reset();
        update();
      }
    }
  });
  // Start the game
  reset();
  update();
})();
</script>
