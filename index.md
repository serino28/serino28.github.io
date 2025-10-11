---
layout: default
title: "Antonio Serino"
---

<!--
  Revamped homepage — Patch 2025-10-11 (v2)
  Changes in this patch:
  1) Wider content: container width increased, tighter margins.
  2) New hero layout (3 columns): left=mini chat, center=intro, right=album widget.
  3) Hook for model: google/gemma-3-270m via BACKEND_URL (serverless proxy recommended).
  4) Album of the day uses your curated list (names). If IDs not provided, it renders smart links to Spotify/Apple Music.
-->

<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Antonio Serino — Data Scientist & PhD in NLP. AI evaluation, interpretability, and language technologies for business and society." />
<meta property="og:title" content="Antonio Serino" />
<meta property="og:description" content="Data Scientist & PhD in NLP. AI evaluation, interpretability, and language technologies." />
<meta property="og:type" content="website" />
<meta id="meta-theme-dark" name="theme-color" content="#0D1117">
<meta id="meta-theme-light" name="theme-color" content="#ffffff">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

<style>
  /* THEME TOKENS (dark default) */
  :root{
    --bg: #0D1117;           /* GitHub dark */
    --panel: #0f1622;        /* card bg */
    --text: #d1d6de;
    --muted: #94a3b8;
    --brand: #58A6FF;
    --brand-2: #7ee7ff;
    --border: #273043;
    --radius: 14px;
    --shadow: 0 10px 30px rgba(0,0,0,.25);
  }
  /* Light overrides */
  :root[data-theme="light"]{
    --bg: #ffffff;
    --panel: #f7fafc;
    --text: #1f2937;
    --muted: #475569;
    --border: #e5e7eb;
    --brand: #0B5FFF;
    --brand-2: #2ea6ff;
  }

  html,body{margin:0;padding:0}
  body{
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    background: radial-gradient(90vmax 90vmax at 100% -10%, rgba(10,17,32,.9) 0%, var(--bg) 45%, var(--bg) 100%);
    color: var(--text);
    line-height: 1.6;
  }
  :root[data-theme="light"] body{background: radial-gradient(90vmax 90vmax at 100% -10%, #f2f7ff 0%, var(--bg) 50%, var(--bg) 100%);}  

  /* Layout */
  .container{max-width:1320px;margin:0 auto;padding:16px}
  header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 0}
  nav{display:flex;gap:16px;flex-wrap:wrap}
  nav a{color:var(--muted);text-decoration:none;font-weight:600;border:1px solid transparent;padding:6px 10px;border-radius:10px}
  nav a:hover{border-color:var(--border)}

  /* Theme toggle */
  .toggle{display:inline-flex;gap:6px;align-items:center;background:var(--panel);border:1px solid var(--border);border-radius:999px;padding:4px}
  .toggle button{appearance:none;border:0;background:transparent;color:var(--muted);padding:6px 10px;border-radius:999px;font:600 14px/1 Inter;cursor:pointer}
  .toggle button.active{background:var(--brand);color:white}

  /* Hero (3 columns) */
  .hero{display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:18px;align-items:stretch;margin-top:18px}
  .hero-col{display:flex;flex-direction:column;gap:12px}
  .avatar{width:110px;height:110px;border-radius:50%;box-shadow:var(--shadow);border:2px solid var(--border);object-fit:cover}
  .badge{display:inline-flex;align-items:center;gap:8px;color:white;background:linear-gradient(135deg,var(--brand),var(--brand-2));padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.3px}
  .hero h1{font-size:clamp(28px,4vw,44px);margin:.4rem 0 .6rem}
  .subtitle{color:var(--muted);font-size:clamp(15px,2vw,18px)}
  .cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
  .btn{display:inline-flex;align-items:center;gap:8px;font-weight:700;text-decoration:none;border-radius:12px;border:1px solid var(--border);padding:8px 12px;color:var(--text);background:var(--panel)}
  .btn.primary{background:linear-gradient(135deg,var(--brand),var(--brand-2));color:#061224;border-color:transparent}
  .btn:hover{box-shadow:0 8px 24px rgba(80,80,120,.15)}

  /* Section */
  section{margin:36px 0}
  .section-title{display:flex;align-items:center;gap:10px;margin:0 0 14px}
  .section-title .dot{width:10px;height:10px;border-radius:50%;background:var(--brand)}
  .card{background:var(--panel);border:1px solid var(--border);border-radius:var(--radius);padding:16px}

  /* Highlights */
  .highlights{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}
  .highlights .item{position:relative}
  .pill{display:inline-block;border:1px solid var(--border);border-radius:999px;padding:3px 10px;font-size:12px;color:var(--muted);margin-right:8px}
  .item h3{margin:.4rem 0 .2rem;font-size:18px}
  .item .venue{font:600 12px/1 Inter;color:var(--brand)}

  /* Two-column grid section */
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media (max-width:1060px){.hero{grid-template-columns:1fr}.grid-2{grid-template-columns:1fr}}

  /* Lists */
  .list{list-style:none;padding:0;margin:0}
  .list li{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px dashed var(--border)}
  .list li:last-child{border-bottom:none}
  .left{max-width:70%}
  .right{white-space:nowrap;color:var(--muted)}

  /* Projects cards */
  .projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px}
  .project{display:flex;flex-direction:column;gap:8px}
  .project h3{margin:.2rem 0 .1rem}
  .project p{margin:0;color:var(--muted)}
  .project .tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto}
  .tag{font:600 11px/1 Inter;border:1px solid var(--border);border-radius:999px;padding:6px 10px;color:var(--muted)}

  /* Education timeline */
  .timeline{position:relative}
  .timeline:before{content:"";position:absolute;left:10px;top:4px;bottom:4px;width:2px;background:linear-gradient(var(--brand),transparent);border-radius:2px}
  .edu{position:relative;padding-left:28px;margin:16px 0}
  .edu:before{content:"";position:absolute;left:4px;top:8px;width:12px;height:12px;border-radius:50%;background:var(--brand)}
  .edu h3{margin:.1rem 0}
  .edu .where{color:var(--muted);font-size:14px}

  /* Footer */
  footer{margin:42px 0 14px;color:var(--muted);font-size:14px}

  /* Animations */
  [data-anim]{opacity:0;transform:translateY(8px);transition:opacity .5s ease, transform .6s ease}
  [data-anim].in{opacity:1;transform:translateY(0)}

  /* Live Corner components */
  .chat{display:flex;flex-direction:column;gap:10px}
  .chat-log{height:240px;overflow:auto;border:1px solid var(--border);border-radius:12px;padding:10px;background:var(--panel)}
  .bubble{max-width:82%;padding:10px 12px;border-radius:12px;margin:6px 0}
  .me{background:linear-gradient(135deg,var(--brand),var(--brand-2));color:#061224;align-self:flex-end}
  .bot{background:#0b1524;border:1px solid var(--border)}
  :root[data-theme="light"] .bot{background:#ffffff}
  .chat-input{display:flex;gap:8px}
  .chat-input input{flex:1;border:1px solid var(--border);border-radius:10px;padding:10px 12px;background:transparent;color:var(--text)}
  .chat-input button{border:1px solid var(--border);border-radius:10px;padding:10px 12px;background:var(--panel);color:var(--text);font-weight:700}
  .player{height:240px;border:1px solid var(--border);border-radius:12px;overflow:hidden}

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
  <!-- HERO (3 columns: left chat, center intro, right album) -->
  <section class="hero" id="about" data-anim>
    <!-- LEFT: Chat -->
    <div class="hero-col card">
      <strong>Ask a quick question</strong>
      <div id="chat-log" class="chat-log" aria-live="polite"></div>
      <div class="chat-input">
        <input id="chat-input" type="text" placeholder="Ask about my work…" aria-label="Chat message"/>
        <button id="chat-send">Send</button>
      </div>
      <small class="subtitle">Powered (via proxy) by <code>google/gemma-3-270m</code>. On GitHub Pages, use a serverless proxy (see code).</small>
    </div>

    <!-- CENTER: Intro -->
    <div class="hero-col card" style="align-items:flex-start">
      <span class="badge" aria-label="Role">AI • NLP • Interpretability</span>
      <h1>Antonio Serino</h1>
      <p class="subtitle">Data Scientist &amp; PhD Student (NLP). I work on <strong>evaluation</strong> and <strong>interpretability</strong> of ML systems—bringing language technologies into real‑world products with reliability and clarity.</p>
      <div class="cta" role="group" aria-label="Primary actions">
        <a class="btn primary" href="mailto:a.serino3@campus.unimib.it">Contact me</a>
        <a class="btn" href="https://github.com/serino28" target="_blank" rel="noopener">GitHub</a>
        <a class="btn" href="https://www.linkedin.com/in/antonio-serino-881799205" target="_blank" rel="noopener">LinkedIn</a>
      </div>
      <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
        <img class="avatar" src="assets/img/Antonio.jpeg" alt="Portrait of Antonio Serino" loading="eager" width="110" height="110" />
        <div class="subtitle">EMNLP 2025 (Industry) — SFAL, Suzhou · IJCAI 2025 — TEAI/TRAI · ECML‑PKDD 2025 — Disce aut Deficere</div>
      </div>
    </div>

    <!-- RIGHT: Album of the day -->
    <div class="hero-col card">
      <strong>Album of the day</strong>
      <div class="player" id="album-wrap">
        <!-- Embed or smart links inserted by JS -->
      </div>
      <small class="subtitle">From your curated list. Add Spotify IDs to enable direct embeds.</small>
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
    </div>
  </section>

  <footer class="container" role="contentinfo">
    © <span id="y"></span> Antonio Serino — Built with love for clarity & impact.
  </footer>
</main>

<!-- Leaflet CSS/JS -->
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
      document.getElementById('meta-theme-light').setAttribute('content', mode==='light' ? '#ffffff' : '#ffffff');
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
        <a class="btn" href="${spotify}" target="_blank" rel="noopener">Open in Spotify</a>
        <a class="btn" href="${apple}" target="_blank" rel="noopener">Open in Apple Music</a>
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
