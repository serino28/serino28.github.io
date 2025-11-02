---
layout: default
title: "Antonio Serino"
---

<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Antonio Serino — Data Scientist & PhD in NLP. AI evaluation, interpretability, and language technologies for business and society." />
<meta property="og:title" content="Antonio Serino" />
<meta property="og:description" content="Data Scientist & PhD in NLP. AI evaluation, interpretability, and language technologies." />
<meta property="og:type" content="website" />
<meta id="meta-theme-dark" name="theme-color" content="#0D1117">
<meta id="meta-theme-light" name="theme-color" content="#F4F4F4">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">

<style>
  /* THEME: TYPOGRAPHIC BRUTALISM
    (Owens: raw palette, hard lines. Abloh: meta-typography, "quotes")
  */
  :root{
    /* Dark theme (GitHub) remains the same */
    --bg: #0D1117;
    --panel: #0f1622;
    --text: #d1d6de;
    --muted: #94a3b8;
    --brand: #58A6FF;
    --border: #273043;
    --radius: 0px; /* NO ROUNDED CORNERS */
    --shadow: none; /* NO SHADOWS */
  }
  /* Light overrides (Owens/Abloh "Raw" Theme) */
  :root[data-theme="light"]{
    --bg: #F4F4F4;        /* Raw concrete / "Pearl" */
    --panel: #ffffff;     /* Stark white panel */
    --text: #0A0A0A;      /* Stark black text */
    --muted: #555555;      /* Strong grey */
    --border: #CFCFCF;    /* Visible border */
    --brand: #0B5FFF;      /* Abloh "Blue" */
  }

  html,body{margin:0;padding:0}
  body{
    font-family: Inter, Arial, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, "Apple Color Emoji", "Segoe UI Emoji";
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    font-size: 16px;
    font-weight: 400;
  }
  :root[data-theme="light"] body{ background: var(--bg); }  

  /* Layout (Tighter Container) */
  .container{
    max-width: 1280px; /* Tighter container */
    margin:0 auto;
    padding:16px
  }
  header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 0}
  nav{display:flex;gap:4px;flex-wrap:wrap}
  nav a{
    font-family: "JetBrains Mono", monospace;
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    border: 1px solid transparent;
    padding: 8px 12px;
  }
  nav a:hover{
    border-color: var(--border);
    background: var(--panel);
    color: var(--text);
  }

  /* Theme toggle */
  .toggle{display:inline-flex;gap:0px;align-items:center;background:var(--panel);border:1px solid var(--border)}
  .toggle button{appearance:none;border:0;background:transparent;color:var(--muted);padding:8px 12px;cursor:pointer;font:600 14px/1 "JetBrains Mono"}
  .toggle button.active{
    background: var(--text);
    color: var(--bg);
  }

  /*
    NEW HERO (2 columns: Intro + Avatar) 
  */
  .hero{
    display: grid;
    grid-template-columns: 1.8fr 1fr; /* Main content vs Avatar */
    gap: 24px;
    align-items: center;
    margin-top: 48px;
    margin-bottom: 48px;
  }
  .hero-col-main {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  .hero-col-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    border: 1px solid var(--border);
    background: var(--panel);
    padding: 24px;
  }
  .avatar{
    width: 100%; /* Fill the column */
    max-width: 180px; /* But not *too* big */
    height: auto;
    aspect-ratio: 1 / 1;
    border-radius: var(--radius); /* SQUARE AVATAR */
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    object-fit: cover;
  }
  .badge{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: white;
    background: var(--brand); /* Solid accent color */
    padding: 8px 12px;
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .hero h1{
    font-size: clamp(38px, 5vw, 54px);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0;
  }
  /* "THE MOTTO" (Abloh-style) */
  .motto {
    font-size: clamp(18px, 2.5vw, 20px);
    font-weight: 500;
    font-style: italic;
    color: var(--text);
    margin: 10px 0;
    padding-left: 14px;
    border-left: 3px solid var(--brand);
  }
  .motto:before { content: "“"; }
  .motto:after { content: "”"; }

  .subtitle{
    color: var(--muted);
    font-size: clamp(16px, 2vw, 18px);
    font-weight: 400;
  }
  .cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
  .btn{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "JetBrains Mono", monospace;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    padding: 10px 14px;
    color: var(--text);
    background: var(--panel);
  }
  .btn.primary{
    background: var(--brand);
    color: white;
    border-color: var(--brand);
  }
  .btn:hover{
    box-shadow: var(--shadow); /* noop, kept for structure */
    background: var(--bg);
  }
  .btn.primary:hover {
    background: #094fc2; /* Darker blue */
    border-color: #094fc2;
  }

  /* Section */
  section{margin: 48px 0} /* More whitespace */
  .section-title{display:flex;align-items:center;gap:10px;margin:0 0 14px}
  .section-title .dot{width:10px;height:10px;border-radius:var(--radius);background:var(--brand)}
  .card{
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
  }

  /* Highlights */
  .highlights{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}
  .highlights .item{position:relative}
  .pill{
    display: inline-block;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 4px 8px;
    font-size: 11px;
    font-family: "JetBrains Mono", monospace;
    text-transform: uppercase;
    color: var(--muted);
    margin-right: 8px;
  }
  .item h3{margin:.4rem 0 .2rem;font-size:18px}
  .item .venue{font:600 12px/1 "JetBrains Mono";color:var(--brand)}

  /* Two-column grid section */
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media (max-width: 1060px){
    .hero{ grid-template-columns: 1fr } /* Stack hero on mobile */
    .hero-col-side { order: -1; align-items: center; } /* Avatar first on mobile */
    .avatar { max-width: 140px; }
    .grid-2{ grid-template-columns: 1fr }
  }

  /* Lists */
  .list{list-style:none;padding:0;margin:0}
  .list li{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px dashed var(--border)}
  .list li:last-child{border-bottom:none}
  .left{max-width:70%}
  .right{white-space:nowrap;color:var(--muted); font-family: "JetBrains Mono", monospace; font-size: 14px;}

  /* Projects cards */
  .projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px}
  .project{display:flex;flex-direction:column;gap:8px}
  .project h3{margin:.2rem 0 .1rem}
  .project p{margin:0;color:var(--muted)}
  .project .tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto}
  .tag{
    font: 600 11px/1 "JetBrains Mono";
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 6px 10px;
    color: var(--muted);
    text-transform: uppercase;
  }

  /* Education timeline */
  .timeline{position:relative}
  .timeline:before{content:"";position:absolute;left:10px;top:4px;bottom:4px;width:2px;background:var(--brand);border-radius:0}
  .edu{position:relative;padding-left:28px;margin:16px 0}
  .edu:before{content:"";position:absolute;left:4px;top:8px;width:12px;height:12px;border-radius:0;background:var(--brand); border: 1px solid var(--border);}
  .edu h3{margin:.1rem 0}
  .edu .where{color:var(--muted);font-size:14px}
  .edu .when{font-family: "JetBrains Mono", monospace; font-size: 14px;}

  /* Footer */
  footer{margin:42px 0 14px;color:var(--muted);font-size:14px}

  /* Animations */
  [data-anim]{opacity:0;transform:translateY(8px);transition:opacity .5s ease, transform .6s ease}
  [data-anim].in{opacity:1;transform:translateY(0)}

  /* Live Corner components (now styled as brutalist cards) */
  .chat{display:flex;flex-direction:column;gap:10px}
  .chat-log{height:240px;overflow:auto;border:1px solid var(--border);border-radius:var(--radius);padding:10px;background:var(--panel)}
  .bubble{max-width:82%;padding:10px 12px;border-radius:var(--radius);margin:6px 0}
  .me{background:var(--brand);color:white;align-self:flex-end}
  .bot{background:var(--panel);border:1px solid var(--border)}
  :root[data-theme="light"] .bot{background:#ffffff}
  .chat-input{display:flex;gap:8px}
  .chat-input input{flex:1;border:1px solid var(--border);border-radius:var(--radius);padding:10px 12px;background:transparent;color:var(--text); font-family: Inter;}
  .chat-input button{
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px 12px;
    background: var(--panel);
    color: var(--text);
    font-family: "JetBrains Mono", monospace;
    font-weight: 700;
  }
  .player{height:240px;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
  .player .btn { font-size: 12px; } /* Smaller buttons for album links */

</style>

<header class="container" aria-label="Site header">
  <nav aria-label="Primary">
    <a href="#about">About</a>
    <a href="#pubs">Publications</a>
    <a href="#projects">Projects</a>
    <a href="#experience">Experience</a>
  </nav>
  <div class="toggle" aria-label="Color scheme toggle">
    <button id="theme-dark" aria-pressed="false" title="Dark">🌙</button>
    <button id="theme-light" aria-pressed="false" title="Light">☀️</button>
  </div>
</header>

<main class="container">
  
  <section class="hero" id="about" data-anim>

    <div class="hero-col-main">
      <span class="badge" aria-label="Role">AI • NLP • Interpretability</span>
      <h1>Antonio Serino</h1>
      
      <p class="motto">Create like a child, edit like a scientist.</p>

      <p class="subtitle">Data Scientist & PhD Student (NLP). I work on <strong>evaluation</strong> and <strong>interpretability</strong> of ML systems—bringing language technologies into real‑world products with reliability and clarity.</p>
      
      <div class="cta" role="group" aria-label="Primary actions">
        <a class="btn primary" href="mailto:a.serino3@campus.unimib.it">Contact me</a>
        <a class="btn" href="https://github.com/serino28" target="_blank" rel="noopener">GitHub</a>
        <a class="btn" href="https://www.linkedin.com/in/antonio-serino-881799205" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>

    <div class="hero-col-side">
      <img class="avatar" src="assets/img/Antonio.jpeg" alt="Portrait of Antonio Serino" loading="eager" width="180" height="180" />
      <div class="subtitle" style="margin-top: 16px; font-size: 13px; line-height: 1.5;">
        <strong>"CONFERENCES"</strong><br/>
        EMNLP 2025 (Industry) — SFAL, Suzhou · IJCAI 2025 — TEAI/TRAI · ECML‑PKDD 2025 — Disce aut Deficere
      </div>
    </div>
  </section>

  <section class="grid-2" data-anim>
    <div class="card">
      <strong>"ASK A QUESTION"</strong>
      <div id="chat-log" class="chat-log" aria-live="polite"></div>
      <div class="chat-input">
        <input id="chat-input" type="text" placeholder="Ask about my work…" aria-label="Chat message"/>
        <button id="chat-send">Send</button>
      </div>
      <small class="subtitle" style="font-size: 12px; margin-top: 8px;">Powered (via proxy) by <code>google/gemma-3-270m</code></small>
    </div>

    <div class="card">
      <strong>"ALBUM OF THE DAY"</strong>
      <div class="player" id="album-wrap">
        </div>
      <small class="subtitle" style="font-size: 12px; margin-top: 8px;">From your curated list.</small>
    </div>
  </section>

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
    </div>
  </section>

  <section id="projects" data-anim>
    <div class="section-title"><span class="dot"></span><h2 style="margin:0">Projects</h2></div>
    <div class="projects">
      <article class="card project">
        <h3>MHEO Report</h3>
        <p>Labour market analytics on 100K+ Lombardy graduates.</p>
        <div class="tags"><span class="tag">Python</span><span class="tag">Econometrics</span><span class="tag">Dashboards</span></div>
      </article>
      <article class="card project">
        <h3>TEAI & TRAI</h3>
        <p>Measuring AI exposure and replacement risk across occupations.</p>
        <div class="tags"><span class="tag">LLMs</span><span class="tag">Policy</span><span class="tag">Causal</span></div>
      </article>
      <article class="card project">
        <h3>Skills‑Hunter & SkiLLMo</h3>
        <p>Standardizing skill extraction with ESCO.</p>
        <div class="tags"><span class="tag">NLP</span><span class="tag">Transformers</span><span class="tag">ETL</span></div>
      </article>
    </div>
  </section>

  <section id="experience" class="grid-2" data-anim>
    <div>
      <div class="section-title"><span class="dot"></span><h2 style="margin:0">Experience</h2></div>
      <ul class="list">
        <li>
          <div class="left"><strong>Research collaboration</strong> — University of Milan (MHEO Report)</div>
          <div class="right">2024 – 25</div>
        </li>
        <li>
          <div class="left"><strong>NLP Researcher</strong> — CRISP, Interuniversity Research Centre for Public Services</div>
          <div class="right">2023 – 24</div>
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

  <section id="education" data-anim>
    <div class="section-title"><span class="dot"></span><h2 style="margin:0">Education</h2></div>
    <div class="card timeline">
      <div class="edu">
        <div class="when">2023 – now</div>
        <h3>PhD — Big Data & Analytics</h3>
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

  <section id="contact" data-anim>
    <div class="section-title"><span class="dot"></span><h2 style="margin:0">Contact</h2></div>
    <div class="card">
      <p>Email: <a href="mailto:a.serino3@campus.unimib.it">a.serino3@campus.unimib.it</a></Jekyll-s-email-and-link-checker-is-weird-sometimes></p>
      <p>GitHub: <a href="https://github.com/serino28" target="_blank" rel="noopener">"serino28"</a> · LinkedIn: <a href="https://www.linkedin.com/in/antonio-serino-881799205" target="_blank" rel="noopener">"antonio‑serino"</a></p>
    </div>
  </section>

  <footer class="container" role="contentinfo">
    © <span id="y"></span> Antonio Serino — "BUILT WITH LOVE FOR CLARITY & IMPACT"
  </footer>
</main>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin="" defer></script>
<script>
  // ===== THEME HANDLER =====
  (function(){
    const key='theme';
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const saved = localStorage.getItem(key);
    const initial = saved || (prefersLight ? 'light' : 'dark');
    const root = document.documentElement;

    function setTheme(mode){
      root.setAttribute('data-theme', mode);
      localStorage.setItem(key, mode);
      document.getElementById('theme-light').classList.toggle('active', mode==='light');
      document.getElementById('theme-dark').classList.toggle('active', mode==='dark');
      // Update meta theme color
      document.getElementById('meta-theme-dark').setAttribute('content', mode==='dark' ? '#0D1117' : '#0D1117');
      document.getElementById('meta-theme-light').setAttribute('content', mode==='light' ? '#F4F4F4' : '#F4F4F4');
    }

    window.addEventListener('DOMContentLoaded',()=>{
      setTheme(initial);
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

  // ===== MINI CHAT (Gemma 3 270M via proxy) =====
  // Configure your serverless proxy URL here; it should call the model `google/gemma-3-270m` and return JSON {reply}
  // Example implementations: Netlify Function (/netlify/functions/chat) or Vercel (/api/chat)
  // IMPORTANT: Do not call Hugging Face API directly from the browser with a secret token.
  const BACKEND_URL = null; // e.g., 'https://your-vercel-app.vercel.app/api/chat'

  function appendBubble(side, text){
    const log=document.getElementById('chat-log');
    const b=document.createElement('div'); b.className='bubble '+(side==='me'?'me':'bot'); b.textContent=text; log.appendChild(b); log.scrollTop=log.scrollHeight;
  }
  async function sendMsg(){
    const inp=document.getElementById('chat-input');
    const msg=inp.value.trim(); if(!msg) return; inp.value='';
    appendBubble('me', msg);
    if(BACKEND_URL){
      try{
        const r=await fetch(BACKEND_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg, model:'google/gemma-3-270m'})});
        const data=await r.json(); appendBubble('bot', data.reply||'No reply');
      }catch(e){ appendBubble('bot','Proxy error. Check console.'); console.error(e); }
    }else{
      // Fallback scripted replies
      const canned = (
        msg.toLowerCase().includes('paper') ? 'Latest: SFAL @ EMNLP 2025 (Industry, Suzhou).' :
        msg.toLowerCase().includes('teai') ? 'TEAI/TRAI assess job exposure and replacement risks to AI.' :
        msg.toLowerCase().includes('contact') ? 'Reach me at a.serino3@campus.unimib.it' :
        'Demo mode. Add BACKEND_URL to answer with Gemma 3 270M.'
      );
      await new Promise(r=>setTimeout(r, 350));
      appendBubble('bot', canned);
    }
  }
  window.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('chat-send').addEventListener('click', sendMsg);
    document.getElementById('chat-input').addEventListener('keydown', e=>{ if(e.key==='Enter') sendMsg(); });
    appendBubble('bot', 'Hi! Ask me about my work, papers, or TEAI/TRAI.');
  });

  // ===== ALBUM OF THE DAY (names + smart links; embed if IDs provided) =====
  const ALBUMS = [
    'Nothing was the same — Drake',
    'Honestly, Nevermind — Drake',
    'More Life — Drake',
    'The College Dropout — Kanye West',
    'Graduation — Kanye West',
    'Watch the Throne — Kanye West',
    'Reggatta de Blanc — The Police',
    'Bad — Michael Jackson',
    'Thriller — Michael Jackson',
    'Off the Wall — Michael Jackson',
    'Kiss Land — The Weeknd',
    'Starboy — The Weeknd',
    'My Dear Melancholy, — The Weeknd',
    'After Hours — The Weeknd',
    'Dawn FM — The Weeknd',
    'Hurry Up Tomorrow — The Weeknd',
    'CHROMAKOPIA — Tyler, The Creator',
    'IGOR — Tyler, The Creator',
    'ASTROWORLD — Travis Scott',
    'UTOPIA — Travis Scott',
    'HARDSTONE PSYCHO — Don Toliver',
    'Radical Optimism — Dua Lipa',
    'Future Nostalgia — Dua Lipa',
    'SOS — SZA',
    'Blonde — Frank Ocean',
    'Alone at Prom — Tory Lanez'
  ];

  // Optional mapping for direct Spotify embeds when you have IDs (fill later):
  // const SPOTIFY_IDS = { 'After Hours — The Weeknd': '4yP0hdKOZPNshxUOjY0cZj', ... };
  const SPOTIFY_IDS = {};

  function dailyIndex(n){
    const d=new Date();
    const seed = d.getFullYear()*1000 + (d.getMonth()+1)*50 + d.getDate();
    return seed % n;
  }
  function smartLinks(title){
    const q = encodeURIComponent(title);
    const spotify = `https://open.spotify.com/search/${q}`;
    const apple = `https://music.apple.com/us/search?term=${q}`;
    return `<div style="display:flex;gap:8px;height:100%;align-items:center;justify-content:center;flex-direction:column">
      <div class="subtitle" style="text-align:center;padding:0 8px">${title}</div>
      <div style="display:flex;gap:8px">
        <a class="btn" href="${spotify}" target="_blank" rel="noopener">Spotify</a>
        <a class="btn" href="${apple}" target="_blank" rel="noopener">Apple</a>
      </div>
    </div>`;
  }
  function mountAlbum(){
    const idx=dailyIndex(ALBUMS.length);
    const title=ALBUMS[idx];
    const wrap=document.getElementById('album-wrap');
    if(SPOTIFY_IDS[title]){
      wrap.innerHTML = `<iframe style="border:0;width:100%;height:100%" src="https://open.spotify.com/embed/album/${SPOTIFY_IDS[title]}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    }else{
      wrap.innerHTML = smartLinks(title);
    }
  }
  window.addEventListener('DOMContentLoaded', mountAlbum);

  // ===== Leaflet map =====
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