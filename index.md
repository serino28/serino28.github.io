---
layout: default
title: "Antonio Serino"
---

<!-- 1) IMPORT FONTS & THEME SWITCHER -->
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Audiowide&family=Anton&family=Orbitron:wght@500&display=swap" rel="stylesheet">

<style>
  /* CSS CUSTOM PROPERTIES & TRI-TEMA */
  :root {
    --bg: radial-gradient(ellipse at center, #181a20 0%, #0e0e0e 100%);
    --fg: #00ffe7;
    --accent: #ff4d00;
    --font-main: 'Orbitron', sans-serif;
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
    line-height: 1.6;
  }

  /* Temi */
  body.inferno {
    --bg: #0a0a0a;
    --fg: #e31b23;
    --accent: #ff4d00;
    --font-main: 'Cinzel', serif;
  }

  body.purgatorio {
    --bg: #1b1c3a;
    --fg: #c69cf0;
    --accent: #5ce1e6;
    --font-main: 'Audiowide', cursive;
  }

  body.paradiso {
    --bg: #f7f2ea;
    --fg: #1a1a1a;
    --accent: #2a6bdb;
    --font-main: 'Anton', sans-serif;
  }

  /* Elementi globali */
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

  /* Theme switcher */
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

  /* Blocchi centrati */
  .centered-block {
    max-width: 900px;
    margin: 0 auto 32px auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Immagine profilo */
  .profile-pic {
    width: 120px;
    height: 120px;
    border-radius: 100px;
    border: 4px solid var(--accent);
    box-shadow: 0 0 30px var(--accent)66, 0 0 6px var(--accent)cc;
    object-fit: cover;
    background: #181a20;
    transition: transform 0.3s ease;
  }
  
  .profile-pic:hover {
    transform: rotate(5deg) scale(1.05);
  }

  /* News ticker */
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
    border-bottom: 4px solid var(--accent);
    border-radius: 0 0 12px 12px;
  }
  
  .game-controls {
    display: none;
  }
  
  @media (max-width: 768px) {
    .profile-container { flex-direction: column; gap: 1em; }
    .centered-block, .news-ticker-container { max-width: 100vw; padding: 0 4vw; }
    #dinoGame { max-width: 100vw; }
    .profile-pic { width: 80px; height: 80px; }
    
    .game-controls {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    #jump-btn, #restart-btn {
      padding: 10px 20px;
      background: var(--accent);
      border: none;
      border-radius: 5px;
      color: white;
    }
  }
</style>

<!-- 2) SWITCHER HTML -->
<div id="theme-switcher">
  <button data-theme="inferno" aria-label="Inferno Theme">🌙</button>
  <button data-theme="purgatorio" aria-label="Purgatorio Theme">🌗</button>
  <button data-theme="paradiso" aria-label="Paradiso Theme">☀️</button>
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

<!-- ==== GIOCO DINO AGGIORNATO ==== -->
<div id="dino-game-container" class="centered-block">
  <canvas id="dinoGame"></canvas>
  <div class="game-controls">
    <button id="jump-btn">Jump</button>
    <button id="restart-btn">Restart</button>
  </div>
</div>

<!-- ==== PROFILO ==== -->
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

<!-- ==== CONTENUTO PRINCIPALE ==== -->
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

<script>
document.addEventListener("DOMContentLoaded", function(){
  // News Ticker
  const ticker = document.getElementById('news-ticker');
  if (ticker) ticker.innerHTML += ticker.innerHTML;

  // Theme Switcher
  const themeButtons = document.querySelectorAll('#theme-switcher button');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.className = btn.dataset.theme;
      localStorage.setItem('site-theme', btn.dataset.theme);
    });
  });
  
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme) document.body.className = savedTheme;

  // Dino Game
  class DinoGame {
    constructor() {
      this.canvas = document.getElementById('dinoGame');
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      
      this.dino = {
        x: 50, y: 0, width: 40, height: 50,
        vy: 0, gravity: 0.8, jumpForce: -16,
        isJumping: false
      };

      this.obstacles = [];
      this.powerUps = [];
      this.score = 0;
      this.highScore = localStorage.getItem('dinoHighScore') || 0;
      this.gameSpeed = 4;
      this.gameOver = false;
      this.isInvincible = false;

      window.addEventListener('resize', () => this.resize());
      document.addEventListener('keydown', (e) => this.handleKeyDown(e));
      document.getElementById('jump-btn').addEventListener('click', () => this.jump());
      document.getElementById('restart-btn').addEventListener('click', () => this.reset());
      this.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.jump();
      });

      this.start();
    }

   // Dino Game Enhanced Class
class DinoGame {
    constructor() {
        this.canvas = document.getElementById('dinoGame');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // Game State
        this.dino = {
            x: 50,
            y: 0,
            width: 40,
            height: 50,
            vy: 0,
            gravity: 0.8,
            jumpForce: -16,
            isJumping: false
        };

        this.obstacles = [];
        this.powerUps = [];
        this.score = 0;
        this.highScore = localStorage.getItem('dinoHighScore') || 0;
        this.gameSpeed = 4;
        this.gameOver = false;
        this.isInvincible = false;

        // Sound Elements
        this.sounds = {
            jump: new Audio('assets/sfx/jump.mp3'),
            gameOver: new Audio('assets/sfx/game-over.mp3'),
            powerUp: new Audio('assets/sfx/power-up.mp3')
        };

        // Event Listeners
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.getElementById('jump-btn').addEventListener('click', () => this.jump());
        document.getElementById('restart-btn').addEventListener('click', () => this.reset());

        // Mobile Support
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.jump();
        });

        this.start();
    }

    resize() {
        this.canvas.width = Math.min(900, window.innerWidth - 40);
        this.canvas.height = 160;
        this.ground = this.canvas.height - 40;
        this.dino.y = this.ground - this.dino.height;
    }

    start() {
        this.reset();
        this.gameLoop();
    }

    gameLoop() {
        if(this.gameOver) return;

        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Dino Physics
        this.dino.y += this.dino.vy;
        this.dino.vy += this.dino.gravity;

        if(this.dino.y >= this.ground - this.dino.height) {
            this.dino.y = this.ground - this.dino.height;
            this.dino.isJumping = false;
        }

        // Generate Obstacles
        if(Math.random() < 0.02 * this.gameSpeed) {
            this.obstacles.push(this.createObstacle());
        }

        // Generate Power-ups
        if(this.score % 500 === 0 && this.score !== 0) {
            this.powerUps.push({
                x: this.canvas.width,
                y: this.ground - 60,
                type: Math.random() > 0.5 ? 'speed' : 'invincible',
                width: 20,
                height: 20
            });
        }

        // Update Elements
        this.updateElements(this.obstacles);
        this.updateElements(this.powerUps);

        // Collision Detection
        this.checkCollisions();
        this.checkPowerUpCollisions();

        this.score += Math.round(this.gameSpeed);
        this.gameSpeed += 0.001;
    }

    createObstacle() {
        const types = ['cactus-small', 'cactus-large', 'bird'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        return {
            x: this.canvas.width,
            y: type === 'bird' ? this.ground - 80 : this.ground - 50,
            width: type === 'bird' ? 40 : 30,
            height: type === 'cactus-large' ? 50 : 40,
            type: type
        };
    }

    updateElements(elements) {
        for(let i = elements.length - 1; i >= 0; i--) {
            elements[i].x -= this.gameSpeed * (this.isInvincible ? 1.5 : 1);
            
            if(elements[i].x + elements[i].width < 0) {
                elements.splice(i, 1);
            }
        }
    }

    checkCollisions() {
        if(this.isInvincible) return;

        for(const obstacle of this.obstacles) {
            if(this.checkCollision(this.dino, obstacle)) {
                this.gameOver = true;
                this.sounds.gameOver.play();
                if(this.score > this.highScore) {
                    this.highScore = this.score;
                    localStorage.setItem('dinoHighScore', this.highScore);
                }
                return;
            }
        }
    }

    checkPowerUpCollisions() {
        for(let i = this.powerUps.length - 1; i >= 0; i--) {
            if(this.checkCollision(this.dino, this.powerUps[i])) {
                this.activatePowerUp(this.powerUps[i].type);
                this.powerUps.splice(i, 1);
                this.sounds.powerUp.play();
            }
        }
    }

    activatePowerUp(type) {
        if(type === 'speed') {
            this.gameSpeed *= 1.5;
            setTimeout(() => this.gameSpeed /= 1.5, 3000);
        } else {
            this.isInvincible = true;
            setTimeout(() => this.isInvincible = false, 5000);
        }
    }

    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    draw() {
        // Clear Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Ground
        this.ctx.fillStyle = '#353535';
        this.ctx.fillRect(0, this.ground + 20, this.canvas.width, 4);

        // Draw Dino
        this.ctx.fillStyle = this.isInvincible ? '#ffeb3b' : '#00ffe7';
        this.ctx.fillRect(this.dino.x, this.dino.y, this.dino.width, this.dino.height);

        // Draw Obstacles
        this.obstacles.forEach(obs => {
            this.ctx.fillStyle = '#ff4d00';
            if(obs.type === 'bird') {
                this.ctx.beginPath();
                this.ctx.arc(obs.x + 20, obs.y + 20, 20, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
            }
        });

        // Draw Power-ups
        this.powerUps.forEach(pu => {
            this.ctx.fillStyle = pu.type === 'speed' ? '#00ff00' : '#ffff00';
            this.ctx.beginPath();
            this.ctx.arc(pu.x, pu.y, 10, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw Score
        this.ctx.font = '18px Orbitron';
        this.ctx.fillStyle = this.isInvincible ? '#ffff00' : '#00ffe7';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
        this.ctx.fillText(`High Score: ${this.highScore}`, 20, 60);

        // Game Over Screen
        if(this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#ff4d00';
            this.ctx.font = '30px Orbitron';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.canvas.width/2, this.canvas.height/2);
            this.ctx.font = '16px Orbitron';
            this.ctx.fillText('Click Restart to Play Again', this.canvas.width/2, this.canvas.height/2 + 30);
        }
    }

    jump() {
        if(!this.dino.isJumping && !this.gameOver) {
            this.dino.vy = this.dino.jumpForce;
            this.dino.isJumping = true;
            this.sounds.jump.play();
        }
    }

    reset() {
        this.obstacles = [];
        this.powerUps = [];
        this.score = 0;
        this.gameSpeed = 4;
        this.gameOver = false;
        this.isInvincible = false;
        this.dino.y = this.ground - this.dino.height;
        this.dino.vy = 0;
        this.gameLoop();
    }

    handleKeyDown(e) {
        if(e.code === 'Space' || e.code === 'ArrowUp') {
            e.preventDefault();
            this.jump();
        }
    }
}


  // Inizializza il gioco
  new DinoGame();
});
</script>

