---
layout: default
title: "Antonio Serino"
---

<!--
  Revamped single‑file homepage
  - Professional, clean aesthetic
  - Accessible, responsive, and fast
  - System dark/light with toggle + localStorage
  - Subtle animations honoring prefers-reduced-motion
  - Semantic HTML, improved typography
  Updated: added EMNLP 2025 Industry Track (Suzhou, China)
-->

<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Antonio Serino — Data Scientist & PhD in NLP. AI evaluation, interpretability, and language technologies for business and society." />
<meta property="og:title" content="Antonio Serino" />
<meta property="og:description" content="Data Scientist & PhD in NLP. AI evaluation, interpretability, and language technologies." />
<meta property="og:type" content="website" />
<meta name="theme-color" content="#0D1117" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

<style>
  :root{
    --bg: #0D1117;           /* GitHub dark */
    --panel: #0f1622;        /* card bg */
    --text: #d1d6de;
    --muted: #94a3b8;
    --brand: #58A6FF;
    --brand-2: #7ee7ff;
    --border: #273043;
    --ring: #2b6cb0;

    --bg-light: #ffffff;
    --panel-light: #f7fafc;
    --text-light: #1f2937;
    --muted-light: #475569;
    --border-light: #e5e7eb;
    --brand-light: #0B5FFF;

    --radius: 14px;
    --shadow: 0 10px 30px rgba(0,0,0,.25);
  }

  @media (prefers-color-scheme: light){
    :root{
      --bg: var(--bg-light);
      --panel: var(--panel-light);
      --text: var(--text-light);
      --muted: var(--muted-light);
      --border: var(--border-light);
      --brand: var(--brand-light);
      --brand-2: #2ea6ff;
    }
  }

  html,body{margin:0;padding:0}
  body{
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    background: radial-gradient(90vmax 90vmax at 100% -10%, #0a1120 0%, var(--bg) 45%, var(--bg) 100%);
    color: var(--text);
    line-height: 1.6;
  }
  @media (prefers-color-scheme: light){
    body{background: radial-gradient(90vmax 90vmax at 100% -10%, #f2f7ff 0%, var(--bg) 50%, var(--bg) 100%);}  
  }

  /* Layout */
  .container{max-width:1040px;margin:0 auto;padding:24px}
  header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 0}
  nav{display:flex;gap:18px;flex-wrap:wrap}
  nav a{color:var(--muted);text-decoration:none;font-weight:600;border:1px solid transparent;padding:8px 12px;border-radius:10px}
  nav a:hover{border-color:var(--border)}

  /* Theme toggle */
  .toggle{display:inline-flex;gap:6px;align-items:center;background:var(--panel);border:1px solid var(--border);border-radius:999px;padding:6px}
  .toggle button{appearance:none;border:0;background:transparent;color:var(--muted);padding:6px 10px;border-radius:999px;font:600 14px/1 Inter;cursor:pointer}
  .toggle button.active{background:var(--brand);color:white}

  /* Hero */
  .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:28px;align-items:center;margin-top:22px}
  .avatar{width:140px;height:140px;border-radius:50%;box-shadow:var(--shadow);border:2px solid var(--border);object-fit:cover}
  .badge{display:inline-flex;align-items:center;gap:8px;color:white;background:linear-gradient(135deg,var(--brand),var(--brand-2));padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.3px}
  .hero h1{font-size:clamp(28px,4vw,44px);margin:.4rem 0 .6rem}
  .subtitle{color:var(--muted);font-size:clamp(15px,2vw,18px)}
  .cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px}
  .btn{display:inline-flex;align-items:center;gap:8px;font-weight:700;text-decoration:none;border-radius:12px;border:1px solid var(--border);padding:10px 14px;color:var(--text);background:var(--panel)}
  .btn.primary{background:linear-gradient(135deg,var(--brand),var(--brand-2));color:#061224;border-color:transparent}
  .btn:hover{box-shadow:0 8px 24px rgba(80,80,120,.15)}

  /* Section */
  section{margin:42px 0}
  .section-title{display:flex;align-items:center;gap:10px;margin:0 0 16px}
  .section-title .dot{width:10px;height:10px;border-radius:50%;background:var(--brand)}
  .card{background:var(--panel);border:1px solid var(--border);border-radius:var(--radius);padding:18px}

  /* Highlights */
  .highlights{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
  .highlights .item{position:relative}
  .pill{display:inline-block;border:1px solid var(--border);border-radius:999px;padding:3px 10px;font-size:12px;color:var(--muted);margin-right:8px}
  .item h3{margin:.4rem 0 .2rem;font-size:18px}
  .item .venue{font:600 12px/1 Inter;color:var(--brand)}

  /* Two-column grid section */
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  @media (max-width:860px){.hero{grid-template-columns:1fr}.grid-2{grid-template-columns:1fr}}

  /* Lists */
  .list{list-style:none;padding:0;margin:0}
  .list li{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px dashed var(--border)}
  .list li:last-child{border-bottom:none}
  .left{max-width:70%}
  .right{white-space:nowrap;color:var(--muted)}

  /* Projects cards */
  .projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
  .project{display:flex;flex-direction:column;gap:10px}
  .project h3{margin:.2rem 0 .1rem}
  .project p{margin:0;color:var(--muted)}
  .project .tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto}
  .tag{font:600 11px/1 Inter;border:1px solid var(--border);border-radius:999px;padding:6px 10px;color:var(--muted)}

  /* Education timeline */
  .timeline{position:relative}
  .timeline:before{content:"";position:absolute;left:10px;top:4px;bottom:4px;width:2px;background:linear-gradient(var(--brand),transparent);border-radius:2px}
  .edu{position:relative;padding-left:28px;margin:18px 0}
  .edu:before{content:"";position:absolute;left:4px;top:8px;width:12px;height:12px;border-radius:50%;background:var(--brand)}
  .edu h3{margin:.1rem 0}
  .edu .where{color:var(--muted);font-size:14px}

  /* Footer */
  footer{margin:48px 0 16px;color:var(--muted);font-size:14px}

  /* Animations */
  [data-anim]{opacity:0;transform:translateY(8px);transition:opacity .5s ease, transform .6s ease}
  [data-anim].in{opacity:1;transform:translateY(0)}
</style>

<header class="container" aria-label="Site header">
  <nav aria-label="Primary">
    <a href="#about">About</a>
    <a href="#pubs">Publications</a>
    <a href="#projects">Projects</a>
    <a href="#experience">Experience</a>
    <a href="#education">Education</a>
    <a href="#contact">Contact</a>
  </nav>
  <div class="toggle" aria-label="Color scheme toggle">
    <button id="theme-dark" aria-pressed="false" title="Dark">🌙</button>
    <button id="theme-light" aria-pressed="false" title="Light">☀️</button>
  </div>
</header>

<main class="container">
  <!-- HERO -->
  <section class="hero card" id="about" data-anim>
    <div>
      <span class="badge" aria-label="Role">AI • NLP • Interpretability</span>
      <h1>Antonio Serino</h1>
      <p class="subtitle">Data Scientist &amp; PhD Student (NLP). I work on <strong>evaluation</strong> and <strong>interpretability</strong> of ML systems—bringing language technologies into real‑world products with reliability and clarity.</p>
      <div class="cta" role="group" aria-label="Primary actions">
        <a class="btn primary" href="mailto:a.serino3@campus.unimib.it">Contact me</a>
        <a class="btn" href="https://github.com/serino28" target="_blank" rel="noopener">GitHub</a>
        <a class="btn" href="https://www.linkedin.com/in/antonio-serino-881799205" target="_blank" rel="noopener">LinkedIn</a>
        <a class="btn" href="/assets/cv/Antonio_Serino_CV.pdf" target="_blank" rel="noopener">Download CV</a>
      </div>
    </div>
    <div style="display:flex;justify-content:center">
      <img class="avatar" src="assets/img/Antonio.jpeg" alt="Portrait of Antonio Serino" loading="eager" width="140" height="140" />
    </div>
  </section>

  <!-- HIGHLIGHTS / LATEST -->
  <section data-anim>
    <div class="section-title"><span class="dot"></span><h2 style="margin:0">Recent highlights</h2></div>
    <div class="highlights">
      <article class="card item" aria-labelledby="h0">
        <div><span class="pill">2025</span> <span class="venue">EMNLP — Industry Track</span></div>
        <h3 id="h0">SFAL: Semantic‑Functional Alignment Scores for Distributional Evaluation of Auto‑Interpretability in Sparse Autoencoders</h3>
        <p class="subtitle">Suzhou, China.</p>
      </article>
      <article class="card item" aria-labelledby="h1">
        <div><span class="pill">May 2025</span> <span class="venue">ECML‑PKDD</span></div>
        <h3 id="h1">A Benchmark to Evaluate LLMs’ Proficiency on Italian Student Competencies</h3>
        <p class="subtitle">With colleagues from University of Milano‑Bicocca. Porto, Portugal.</p>
      </article>
      <article class="card item" aria-labelledby="h2">
        <div><span class="pill">Mar 2025</span> <span class="venue">IJCAI</span></div>
        <h3 id="h2">Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs</h3>
        <p class="subtitle">Montreal, Canada — TEAI/TRAI indices for AI exposure.</p>
      </article>
      <article class="card item" aria-labelledby="h3">
        <div><span class="pill">Mar 2025</span> <span class="venue">ACM SAC</span></div>
        <h3 id="h3">SkiLLMo: Normalized ESCO Skill Extraction</h3>
        <p class="subtitle">Catania, Italy — standardizing skills with transformers.</p>
      </article>
    </div>
  </section>

  <!-- PUBLICATIONS + MAP SIDE BY SIDE -->
  <section id="pubs" class="grid-2" data-anim>
    <div>
      <div class="section-title"><span class="dot"></span><h2 style="margin:0">Publications</h2></div>
      <ul class="list" aria-label="Selected publications">
        <li>
          <div class="left"><strong>SFAL: Semantic-Functional Alignment Scores for Distributional Evaluation of Auto-Interpretability in Sparse Autoencoders</strong> — EMNLP Industry Track, Suzhou (China)</div>
          <div class="right">2025</div>
        </li>
        <li>
          <div class="left"><strong>Disce aut Deficere</strong> — Evaluating LLMs on INVALSI (ECML‑PKDD 2025)</div>
          <div class="right">2025</div>
        </li>
        <li>
          <div class="left"><strong>Towards the Terminator Economy</strong> — TEAI/TRAI (IJCAI 2025)</div>
          <div class="right">2025</div>
        </li>
        <li>
          <div class="left"><strong>SkiLLMo</strong> — Normalized ESCO Skill Extraction (ACM SAC 2025)</div>
          <div class="right">2025</div>
        </li>
        <li>
          <div class="left">An approach to Evaluative AI through LLMs (ECAI 2024)</div>
          <div class="right">2024</div>
        </li>
        <li>
          <div class="left">Augmenting XAI with LLMs (XAI World 2024)</div>
          <div class="right">2024</div>
        </li>
        <li>
          <div class="left">Skills‑Hunter (AIxIA 2023)</div>
          <div class="right">2023</div>
        </li>
      </ul>
    </div>
    <div>
      <div class="section-title"><span class="dot"></span><h2 style="margin:0">Where in the world</h2></div>
      <div class="card" style="padding:0;overflow:hidden">
        <div id="map" style="height:340px"></div>
      </div>
      <details class="card" style="margin-top:10px">
        <summary>Show BibTeX / citation info</summary>
        <pre style="white-space:pre-wrap;overflow:auto;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--muted)">{Add your BibTeX entries here}</pre>
      </details>
    </div>
  </section>

  <!-- PROJECTS -->
  <section id="projects" data-anim>
    <div class="section-title"><span class="dot"></span><h2 style="margin:0">Projects</h2></div>
    <div class="projects">
      <article class="card project">
        <h3>MHEO Report</h3>
        <p>Labour market analytics on 100K+ Lombardy graduates.</p>
        <div class="tags"><span class="tag">Python</span><span class="tag">Econometrics</span><span class="tag">Dashboards</span></div>
      </article>
      <article class="card project">
        <h3>TEAI &amp; TRAI</h3>
        <p>Measuring AI exposure and replacement risk across occupations.</p>
        <div class="tags"><span class="tag">LLMs</span><span class="tag">Policy</span><span class="tag">Causal</span></div>
      </article>
      <article class="card project">
        <h3>Skills‑Hunter &amp; SkiLLMo</h3>
        <p>Standardizing skill extraction with ESCO.</p>
        <div class="tags"><span class="tag">NLP</span><span class="tag">Transformers</span><span class="tag">ETL</span></div>
      </article>
    </div>
  </section>

  <!-- EXPERIENCE & SERVICE -->
  <section id="experience" class="grid-2" data-anim>
    <div>
      <div class="section-title"><span class="dot"></span><h2 style="margin:0">Experience</h2></div>
      <ul class="list">
        <li>
          <div class="left"><strong>Research collaboration</strong> — University of Milan (MHEO Report)</div>
          <div class="right">2024 – 2025</div>
        </li>
        <li>
          <div class="left"><strong>NLP Researcher</strong> — CRISP, Interuniversity Research Centre for Public Services</div>
          <div class="right">2023 – 2024</div>
        </li>
      </ul>
    </div>
    <div>
      <div class="section-title"><span class="dot"></span><h2 style="margin:0">Review & Service</h2></div>
      <ul class="list">
        <li><div class="left">ECML‑PKDD — Research Track</div><div class="right">2024</div></li>
        <li><div class="left">COLING — Industry Track</div><div class="right">2025</div></li>
        <li><div class="left">Knowledge‑Based Systems (Q1)</div><div class="right">–</div></li>
        <li><div class="left">Intl. Journal of IT & Decision Making (Q2)</div><div class="right">–</div></li>
      </ul>
    </div>
  </section>

  <!-- EDUCATION -->
  <section id="education" data-anim>
    <div class="section-title"><span class="dot"></span><h2 style="margin:0">Education</h2></div>
    <div class="card timeline">
      <div class="edu">
        <div class="when">2023 – now</div>
        <h3>PhD — Big Data &amp; Analytics</h3>
        <div class="where">University of Milano‑Bicocca</div>
      </div>
      <div class="edu">
        <div class="when">2021 – 2023</div>
        <h3>MSc — Data Science</h3>
        <div class="where">University of Milano‑Bicocca</div>
      </div>
      <div class="edu">
        <div class="when">2018 – 2021</div>
        <h3>BSc — Computer Science</h3>
        <div class="where">University of Bari</div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact" data-anim>
    <div class="section-title"><span class="dot"></span><h2 style="margin:0">Contact</h2></div>
    <div class="card">
      <p>Email: <a href="mailto:a.serino3@campus.unimib.it">a.serino3@campus.unimib.it</a></p>
      <p>GitHub: <a href="https://github.com/serino28" target="_blank" rel="noopener">serino28</a> · LinkedIn: <a href="https://www.linkedin.com/in/antonio-serino-881799205" target="_blank" rel="noopener">antonio‑serino</a></p>
      <details style="margin-top:10px">
        <summary>Play the hidden dino 🦖</summary>
        <canvas id="dino" width="820" height="150" style="width:100%;max-width:820px;border-radius:10px;border:1px solid var(--border);margin-top:10px"></canvas>
        <p style="color:var(--muted);font-size:13px;margin-top:6px">Space = jump. It’s just for fun 🙂</p>
      </details>
    </div>
  </section>

  <footer class="container" role="contentinfo">
    © <span id="y"></span> Antonio Serino — Built with love for clarity & impact.
  </footer>
</main>

<!-- Map + Dino + Theme JS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin="" defer></script>
<script>
  // Respect system theme + allow manual toggle
  (function(){
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const key='theme';
    const saved = localStorage.getItem(key);
    const isLight = saved ? saved==='light' : prefersLight;
    if(isLight) document.documentElement.style.colorScheme='light';
    else document.documentElement.style.colorScheme='dark';

    function setTheme(mode){
      document.documentElement.style.colorScheme=mode;
      localStorage.setItem(key, mode);
      document.getElementById('theme-light').classList.toggle('active', mode==='light');
      document.getElementById('theme-dark').classList.toggle('active', mode==='dark');
      document.getElementById('theme-light').setAttribute('aria-pressed', mode==='light');
      document.getElementById('theme-dark').setAttribute('aria-pressed', mode==='dark');
    }
    window.addEventListener('DOMContentLoaded',()=>{
      setTheme(isLight? 'light' : 'dark');
      document.getElementById('theme-light').onclick=()=>setTheme('light');
      document.getElementById('theme-dark').onclick=()=>setTheme('dark');
      document.getElementById('y').textContent = new Date().getFullYear();

      // fade-in on scroll
      const els=[...document.querySelectorAll('[data-anim]')];
      const ro = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target);} });
      },{threshold:.12});
      els.forEach(el=>ro.observe(el));
    });
  })();

  // Simple Dino game (minimal footprint)
  (function(){
    function dinoInit(){
      const c=document.getElementById('dino'); if(!c) return; const ctx=c.getContext('2d');
      let w=c.width,h=c.height,ground=h-28;
      let x=26,y=ground-26,vy=0,jumping=false,score=0,dead=false;
      let obs=[]; const G=.8,J=-12;
      function spawn(){
        const small=Math.random()<.6; const w= small? 16+Math.random()*10 : 22+Math.random()*16; const hgt= small? 24+Math.random()*10 : 38+Math.random()*16;
        obs.push({x:c.width+2,w:w,h:hgt});
      }
      let f=0; function tick(){
        ctx.clearRect(0,0,w,h);
        // ground
        ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--border');
        ctx.fillRect(0,ground+10,w,2);
        // dino
        ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--brand');
        ctx.fillRect(x,y,26,26);
        // physics
        y+=vy; vy+=G; if(y>ground-26){y=ground-26;vy=0;jumping=false}
        // obstacles
        if(!dead && f%70===0) spawn();
        for(let i=obs.length-1;i>=0;i--){
          const o=obs[i]; o.x-=4+Math.min(6,score/80);
          ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--brand-2');
          ctx.fillRect(o.x,ground-o.h,o.w,o.h);
          if(x<o.x+o.w && x+26>o.x && y+26>ground-o.h){dead=true}
          if(o.x+o.w<0){obs.splice(i,1); if(!dead) score++;}
        }
        // score
        ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--muted');
        ctx.font='12px "JetBrains Mono"'; ctx.fillText('Score: '+score, w-90, 16);
        if(!dead){f++; requestAnimationFrame(tick);} else {ctx.font='bold 18px "JetBrains Mono"'; ctx.fillText('GAME OVER — press Space', w/2-120, h/2)}
      }
      function jump(){ if(!dead && !jumping){vy=J;jumping=true;} else if(dead){dead=false;score=0;obs=[];f=0;tick();} }
      document.addEventListener('keydown',e=>{ if(e.code==='Space') { e.preventDefault(); jump(); }});
      tick();
    }
    window.addEventListener('DOMContentLoaded', dinoInit);
  })();

  // Leaflet map of venues (kept lightweight)
  window.addEventListener('load', function(){
    const el = document.getElementById('map'); if(!el || !window.L) return;
    const map = L.map('map',{zoomControl:false, scrollWheelZoom:false, dragging:true}).setView([41.1621,12.5], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(map);
    const pubs = [
      {lat:31.2989,lng:120.5853,label:'EMNLP 25 — Suzhou'},
      {lat:41.1621,lng:-8.6291,label:'ECML‑PKDD 25 — Porto'},
      {lat:45.5017,lng:-73.5673,label:'IJCAI 25 — Montreal'},
      {lat:37.5022,lng:15.0873,label:'ACM SAC 25 — Catania'},
      {lat:42.8782,lng:-8.5449,label:'ECAI 24 — Santiago de Compostela'},
      {lat:35.9375,lng:14.5001,label:'XAI World 24 — Malta'},
      {lat:41.9028,lng:12.4964,label:'AIxIA 23 — Rome'}
    ];
    const group=[]; pubs.forEach(p=>{ L.marker([p.lat,p.lng]).addTo(map).bindPopup(p.label); group.push([p.lat,p.lng]); });
    if(group.length){ map.fitBounds(group, {padding:[30,30]}); }
  });
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Antonio Serino",
  "jobTitle": "Data Scientist, PhD Student",
  "alumniOf": [
    {"@type":"CollegeOrUniversity","name":"University of Milano-Bicocca"},
    {"@type":"CollegeOrUniversity","name":"University of Bari"}
  ],
  "email": "mailto:a.serino3@campus.unimib.it",
  "image": "/assets/img/Antonio.jpeg",
  "sameAs": [
    "https://github.com/serino28",
    "https://www.linkedin.com/in/antonio-serino-881799205"
  ],
  "url": "/"
}
</script>
