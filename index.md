---
layout: default
title: "Antonio Serino"
---

<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Antonio Serino — PhD in AI & NLP, AI Scientist, Data Scientist." />
<meta property="og:title" content="Antonio Serino | PhD in AI & NLP" />
<meta property="og:description" content="PhD in AI & NLP, AI Scientist, Data Scientist." />
<meta property="og:type" content="website" />
<meta name="theme-color" content="#F4F4F4">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">

<style>
  /* THEME: "RAW CONCRETE" + "EARTH" ACCENT (SINGLE THEME) */
  :root{
    --bg: #F4F4F4;
    --panel: #ffffff;
    --text: #0A0A0A;
    --muted: #555555;
    --border: #BBBBBB;
    
    /* "Beige/Brown" Palette */
    --brand-bg: #8A7B68;   /* Stone/Khaki Brown (per sfondi: ticker, badge) */
    --brand-text: #5D4037; /* Dark Earth Brown (per testo: nav, link) */
    
    /* Nuovi colori per i pulsanti */
    --spotify-green: #1DB954;

    --radius: 0px;
    --shadow: none;
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
  
  /* Link generici (es. contatto, card) */
  a {
    color: var(--brand-text);
  }
  
  /* Layout (Container) - MARGINI RIDOTTI */
  .container{
    max-width: 1280px; /* Contenuto più largo */
    margin:0 auto;
    padding:16px
  }
  
  /* ----- NEW SITE HEADER (Title + Ticker) ----- */
  .site-header {
    padding: 16px 0 0; /* Padding sopra, no padding sotto */
  }
  .site-title {
    font-family: "JetBrains Mono", monospace;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    color: var(--text);
    margin-bottom: 16px; /* Spazio tra titolo e ticker */
  }
  
  /* ----- HEADER TICKER ----- */
  #ticker-wrap {
    width: 100%; /* Full width *of the container* */
    overflow: hidden;
    background: var(--brand-bg); /* New Brand Brown! */
    border: 1px solid var(--border);
    padding: 10px 0;
  }
  #ticker {
    display: flex;
    white-space: nowrap;
    animation: ticker-scroll 30s linear infinite;
  }
  #ticker .tick-item {
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    font-weight: 600;
    color: #FFFFFF; /* White text on brown */
    padding: 0 24px;
    text-transform: uppercase;
  }
  #ticker .tick-item strong {
    color: #FFFFFF;
    margin-right: 8px;
  }
  @keyframes ticker-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /*
    HERO (NUOVO LAYOUT FLESSIBILE) 
  */
  .hero{
    display: flex; /* Non più grid */
    flex-direction: column;
    gap: 24px;
    margin-top: 48px;
    margin-bottom: 48px;
  }
  
  /* Riga 1: [Avatar] [Nome] [Album] */
  .hero-top-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
  }
  
  .hero-col-avatar {
    flex: 0 0 280px; /* Foto grande */
  }
  .hero-col-title {
    flex: 1 1 auto; /* Cresci e stringi per riempire lo spazio */
    padding-top: 12px; /* Allinea visivamente il badge con la foto */
  }
  .hero-col-album {
    flex: 0 0 152px; /* Album piccolo (120px + 32px padding) */
    max-width: 152px; 
  }
  
  /* Riga 2: [Bio] (sotto tutto) */
  .hero-bottom-bio {
    /* Si estende in orizzontale per natura */
  }
  
  .avatar{
    width: 280px;
    height: 280px;
    aspect-ratio: 1 / 1;
    border-radius: var(--radius); /* SQUARE AVATAR */
    border: 1px solid var(--border);
    object-fit: cover;
  }
  
  .badge{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: white;
    background: var(--brand-bg); /* Solid accent color */
    padding: 8px 12px;
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 8px; /* Spazio tra badge e h1 */
  }
  .hero h1{
    font-size: clamp(38px, 5vw, 54px);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0;
  }
  /* "THE MOTTO" */
  .motto {
    font-size: clamp(18px, 2.5vw, 20px);
    font-weight: 500;
    font-style: italic;
    color: var(--text);
    margin: 10px 0;
    padding-left: 14px;
    border-left: 3px solid var(--brand-bg);
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
    background: var(--brand-bg);
    color: white;
    border-color: var(--brand-bg);
  }
  .btn.primary:hover {
    background: var(--brand-text); /* Scurisce al hover */
    border-color: var(--brand-text);
  }

  /* ----- ALBUM WIDGET (TENDINA) ----- */
  #album-widget {
    background: var(--panel);
    border: 1px solid var(--border);
    width: 100%; /* Si adatta al genitore .hero-col-album */
  }
  #album-trigger {
    font-family: "JetBrains Mono", monospace;
    text-transform: uppercase;
    font-size: 12px;
    margin: 0;
    padding: 16px;
    position: relative;
    cursor: pointer;
  }
  /* Indicatore + / X */
  #album-trigger::after {
    content: '+';
    font-family: "JetBrains Mono", monospace;
    font-size: 16px;
    line-height: 1;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.3s ease;
    color: var(--muted);
  }
  .album-open #album-trigger::after {
    transform: translateY(-50%) rotate(45deg);
  }
  
  /* Contenuto collassabile */
  #album-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-out;
    padding: 0 16px; /* Padding laterale */
  }
  .album-open #album-content {
    max-height: 600px; /* Valore alto per permettere l'apertura */
    padding-bottom: 16px; /* Padding sotto quando aperto */
  }
  
  #album-cover-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    background: #333; /* Fallback */
    margin-bottom: 12px; /* Spazio prima dei bottoni */
  }
  #album-cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #album-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px; /* Padding più piccolo */
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  }
  #album-title {
    font-size: 14px; /* Più piccolo */
    font-weight: 700;
    color: white;
    margin: 0;
    text-transform: uppercase;
  }
  #album-artist {
    font-size: 11px; /* Più piccolo */
    font-weight: 500;
    color: #E0E0E0;
    margin: 0;
    text-transform: uppercase;
  }
  #album-links {
    display: flex;
    flex-direction: column; /* Pulsanti impilati */
    align-items: stretch;   /* Pulsanti a larghezza piena */
    gap: 8px;
    margin-top: 12px;
  }
  #album-links a {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: none;
    color: var(--text);
    background: var(--panel);
    padding: 8px 10px; /* Padding aggiornato */
    border: 1px solid var(--border);
    text-align: center;
    display: flex; /* Per allineare logo e testo */
    justify-content: center; /* Centra orizzontalmente */
    align-items: center; /* Centra verticalmente */
  }
  #album-links a:hover {
    background: var(--bg);
  }
  /* Pulsante Spotify a tema */
  .btn-spotify {
    background: var(--spotify-green) !important;
    border-color: var(--spotify-green) !important;
    color: white !important;
  }
  .btn-spotify svg {
    margin-right: 8px; /* Spazio tra logo e testo */
    width: 16px; /* Dimensione del logo */
    height: 16px;
    fill: white; /* Colore del logo (bianco) */
  }

  /* Section */
  section{margin: 64px 0} /* More whitespace */
  .section-title{display:flex;align-items:center;gap:10px;margin:0 0 14px}
  .section-title .dot{width:10px;height:10px;border-radius:var(--radius);background:var(--brand-bg)}
  .section-title h2 { margin: 0; font-weight: 800; letter-spacing: -0.5px; }
  .card{
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
  }
  /* Card titles */
  .card h3 {
    font-family: "JetBrains Mono", monospace;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    margin-top: 0;
  }

  /* Two-column grid section (still used for Experience/Service) */
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  
  @media (max-width: 1060px){
    /* Su mobile, la "linea" hero diventa una colonna */
    .hero-top-line { flex-direction: column; } 
    .hero-col-avatar { order: -3; } /* Avatar in cima */
    .hero-col-title { order: -2; }
    .hero-col-album { 
      order: -1; 
      max-width: 100%; /* Album a larghezza piena su mobile */
      flex-basis: auto;
    }
    
    .grid-2{ grid-template-columns: 1fr }
    .site-title { font-size: 12px; padding: 0 16px; }
  }

  /* Lists */
  .list{list-style:none;padding:0;margin:0}
  .list li{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)}
  .list li:last-child{border-bottom:none}
  .left{max-width:70%}
  .right{white-space:nowrap;color:var(--muted); font-family: "JetBrains Mono", monospace; font-size: 14px;}
  
  /* NUOVA CLASSE per descrizioni in lista */
  .pub-desc {
    font-size: 14px;
    color: var(--muted);
    margin: 4px 0 0 0;
    padding: 0;
    line-height: 1.5;
  }

  /* Projects cards (now handles 1 item better) */
  .projects{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 14px;
  }
  .project{display:flex;flex-direction:column;gap:8px}
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
  .timeline:before{content:"";position:absolute;left:10px;top:4px;bottom:4px;width:2px;background:var(--brand-bg);border-radius:0}
  .edu{position:relative;padding-left:28px;margin:16px 0}
  .edu:before{content:"";position:absolute;left:4px;top:8px;width:12px;height:12px;border-radius:0;background:var(--brand-bg); border: 1px solid var(--border);}
  .edu h3{font-family: Inter; text-transform: none; font-size: 18px; margin:.1rem 0} /* Override card h3 */
  .edu .where{color:var(--muted);font-size:14px; line-height: 1.5;} /* Aggiornato per leggibilità */
  .edu .when{font-family: "JetBrains Mono", monospace; font-size: 14px;}

  /* Footer */
  footer{margin:42px 0 14px;color:var(--muted);font-size:14px; text-align: center;}

  /* Animations */
  [data-anim]{opacity:0;transform:translateY(8px);transition:opacity .5s ease, transform .6s ease}
  [data-anim].in{opacity:1;transform:translateY(0)}

</style>

<header class="container site-header" aria-label="Site header">
  <div class="site-title">
  </div>

  <div id="ticker-wrap" aria-label="Recent highlights">
    <div id="ticker"></div>
  </div>
  
</header>

<main class="container">
  
  <section class="hero" id="about" data-anim>

    <div class="hero-top-line">
      
      <div class="hero-col-avatar">
        <img class="avatar" src="assets/img/Antonio.jpeg" alt="Portrait of Antonio Serino" loading="eager" width="280" height="280" />
      </div>
      
      <div class="hero-col-title">
        <span class="badge" aria-label="Role">AI • NLP • Interpretability</span>
        <h1>Antonio Serino</h1>
      </div>
      
      <div class="hero-col-album">
        
        <div id="album-widget" data-anim>
          <h3 id="album-trigger">"ALBUM OF THE DAY"</h3>
          
          <div id="album-content">
            <div id="album-cover-wrap">
              <img id="album-cover-img" src="" alt="" loading="lazy"/>
              <div id="album-overlay">
                <h4 id="album-title"></h4>
                <p id="album-artist"></p>
              </div>
            </div>
            <div id="album-links">
              <a id="album-spotify" class="btn-spotify" href="#" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.464 17.54c-.2.28-.58.38-.88.18-2.4-1.46-5.4-1.78-8.96-.98-.34.08-.66-.16-.76-.5s.16-.66.5-.76c3.84-.86 7.12-.5 9.8 1.12.3.18.4.56.2.84zm1.44-3.18c-.26.34-.7.44-1.04.18-2.68-1.64-6.76-2.1-9.96-1.14-.42.12-.86-.12-1-.54s.12-.86.54-1c3.6-1.06 8.06-.54 11.12 1.3.34.2.44.64.18 1zm1.5-3.3c-.3.42-.84.56-1.26.26-3.24-1.98-8.5-2.42-11.82-1.32-.5.16-1.02-.16-1.18-.66-.16-.5.16-1.02.66-1.18 3.74-1.2 9.42-.72 13.06 1.5.42.26.56.8.26 1.26z"/>
                </svg>
                Spotify
              </a>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    
    <div class="hero-bottom-bio">
      <p class="motto">Create like a child, edit like a scientist.</p>
      <p class="subtitle">Currently a PhD student at the University of Milano-Bicocca, focusing on AI & NLP. My research investigates the internal mechanics of Transformer based Language Models using <strong>mechanistic interpretability</strong> to understand *how* they build representations and make decisions. The goal is to develop robust <strong>evaluation</strong> and <strong>explanation</strong> techniques, ensuring these systems are aligned with human values and exhibit safe behaviour. I love tackling the challenge of integrating trustworthy AI into the human-machine collaboration paradigm. I love being multi-disciplinary and drinking sugar-free coffee. </p>
      
      <div class="cta" role="group" aria-label="Primary actions">
        <a class="btn primary" href="mailto:a.serino3@campus.unimib.it">Contact me</a>
        <a class="btn" href="https://github.com/serino28" target="_blank" rel="noopener">GitHub</a>
        <a class="btn" href="https://www.linkedin.com/in/antonio-serino-881799205" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
    
  </section>

  <section id="pubs" data-anim>
    <div class="section-title"><span class="dot"></span><h2>"Publications"</h2></div>
    <div class="card">
      <ul class="list" aria-label="Selected publications">
        <li>
          <div class="left">
            <strong>Terminator Economy: Assessing jobs and tasks exposure to AI</strong> — AAAI 2026 (Demo Track), Singapore
          </div>
          <div class="right">2026</div>
        </li>
        <li>
          <div class="left">
            <strong>SFAL: Semantic-Functional Alignment Scores for Distributional Evaluation of Auto-Interpretability in Sparse Autoencoders</strong> — EMNLP 2025 (Industry Track)
            <p class="pub-desc">Proposing SFAL, a fast and cost-effective evaluation strategy for auto-interpretability in Sparse Autoencoders.</p>
          </div>
          <div class="right">2025</div>
        </li>
        <li>
          <div class="left">
            <strong>Disce aut Deficere: Evaluating LLMs Proficiency on the INVALSI Italian Benchmark</strong> — ECML-PKDD 2025
            <p class="pub-desc">A structured benchmark using INVALSI tests to evaluate the linguistic versatility of LLMs in non-English languages.</p>
          </div>
          <div class="right">2025</div>
        </li>
        <li>
          <div class="left">
            <strong>Towards the Terminator Economy: Assessing Job Exposure to Al through LLMs</strong> — IJCAI 2025
            <p class="pub-desc">A data-driven framework using LLMs to assess AI exposure in U.S. employment, formalising the TEAI index.</p>
          </div>
          <div class="right">2025</div>
        </li>
        <li>
          <div class="left">
            <strong>SkiLLMo: Normalized ESCO Skill Extraction through Transformer Models</strong> — ACM SAC 2025
            <p class="pub-desc">A pipeline leveraging Transformers and LLMs to extract, filter, and standardize skills from job ads to the ESCO taxonomy.</p>
          </div>
          <div class="right">2025</div>
        </li>
        <li>
          <div class="left">
            <strong>An approach to Evaluative Al through Large Language Models</strong> — ECAI 2024
            <p class="pub-desc">Introducing EADS, a framework integrating Evaluative AI with conversational explanations (pros/cons) to enhance decision-making.</p>
          </div>
          <div class="right">2024</div>
        </li>
        <li>
          <div class="left">
            <strong>Augmenting XAI with LLMs: A Case Study in Banking Marketing Recommendation</strong> — XAI World Conf-IJCAI 2024
            <p class="pub-desc">Using Generative AI to create natural language explanations for recommender systems, replacing manual expert labor.</p>
          </div>
          <div class="right">2024</div>
        </li>
        <li>
          <div class="left">
            <strong>Skills-Hunter: adapting Large Language Models to the Labour Market for Skill Extraction</strong> — AIxIA 2023
            <p class="pub-desc">An automated approach using LLMs to overcome the data labelling problem for skill extraction in job ads.</p>
          </div>
          <div class="right">2023</div>
        </li>
      </ul>
    </div>
  </section>

  <section id="map-section" data-anim>
    <div class="section-title"><span class="dot"></span><h2>"Where in the world"</h2></div>
    <div class="card" style="padding:0;overflow:hidden">
      <div id="map" style="height:400px"></div>
    </div>
  </section>

  <section id="projects" data-anim>
    <div class="section-title"><span class="dot"></span><h2>"Projects"</h2></div>
    <div class="projects">
      <article class="card project">
        <h3>MHEO Report</h3>
        <p>Labour market analytics on 100K+ Lombardy graduates.</p>
        <div class="tags"><span class="tag">Python</span><span class="tag">Econometrics</span><span class="tag">Dashboards</span></div>
      </article>
    </div>
  </section>

  <section id="experience" class="grid-2" data-anim>
    <div>
      <div class="section-title"><span class="dot"></span><h2>"Experience"</h2></div>
      <div class="card">
        <ul class="list">
          <li>
            <div class="left">
              <strong>Research collaboration</strong> — University of Milan (MHEO Report)
              <p class="pub-desc">Analyzing occupational trajectories and education-to-employment transitions for 100,000+ Lombardy graduates.</p>
            </div>
            <div class="right">2024 – 25</div>
          </li>
          <li>
            <div class="left">
              <strong>NLP Researcher</strong> — CRISP, Interuniversity Research Centre
              <p class="pub-desc">Developing methodologies for skill extraction and standardization from job ads based on the ESCO taxonomy.</p>
            </div>
            <div class="right">2023 – 24</div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="section-title"><span class="dot"></span><h2>"Review & Service"</h2></div>
      <div class="card">
        <ul class="list">
          <li><div class="left">ECML-PKDD — Research Track</div><div class="right">2024</div></li>
          <li><div class="left">COLING — Industry Track</div><div class="right">2025</div></li>
          <li><div class="left">Knowledge-Based Systems (Q1)</div><div class="right">–</div></li>
          <li><div class="left">Intl. Journal of IT & Decision Making (Q2)</div><div class="right">–</div></li>
        </ul>
      </div>
    </div>
  </section>

  <section id="education" data-anim>
    <div class="section-title"><span class="dot"></span><h2>"Education"</h2></div>
    <div class="card timeline">
      <div class="edu">
        <div class="when">2023 – now</div>
        <h3>PhD — Big Data & Analytics</h3>
        <div class="where">University of Milano-Bicocca. Researching NLP, LLM Evaluation, and XAI.</div>
      </div>
      <div class="edu">
        <div class="when">2021 – 2023</div>
        <h3>MSc — Data Science</h3>
        <div class="where">University of Milano-Bicocca. Skills in Python, Machine Learning, Deep Learning, and NLP.</div>
      </div>
      <div class="edu">
        <div class="when">2018 – 2021</div>
        <h3>BSc — Computer Science</h3>
        <div class="where">University of Bari. Skills in C, C++, Java, Algorithms, and Data Structures.</div>
      </div>
    </div>
  </section>
  
  <section id="awards" data-anim>
    <div class="section-title"><span class="dot"></span><h2>"Awards"</h2></div>
    <div class="card">
      <ul class="list">
        <li>
          <div class="left">
            <strong>Best Presentation Award</strong>
            <p class="pub-desc">Per "Augmenting XAI with LLMs" at 2nd World Conference on Explainable AI.</p>
          </div>
          <div class="right">Jul 2024</div>
        </li>
      </ul>
    </div>
  </section>

  <section id="contact" data-anim>
    <div class="section-title"><span class="dot"></span><h2>"Contact"</h2></div>
    <div class="card">
      <p>Email: <a href="mailto:a.serino3@campus.unimib.it">a.serino3@campus.unimib.it</a></p>
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
  // ===== SIMPLE LOAD HANDLERS =====
  window.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('y').textContent = new Date().getFullYear();

    // fade-in on scroll
    const els=[...document.querySelectorAll('[data-anim]')];
    const ro = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target);} });
    },{threshold:.12});
    els.forEach(el=>ro.observe(el));
    
    // Configura la tendina dell'album
    setupAlbumToggle();
  });


  // ===== HIGHLIGHTS TICKER =====
  // 1. Definisci i tuoi highlight qui
  const HIGHLIGHTS = [
    { emoji: "🤖", title: "Terminator Economy: Assessing jobs and tasks exposure to AI", venue: "AAAI 2026" },
    { emoji: "📰", title: "SFAL: Semantic-Functional Alignment Scores for Distributional Evaluation of Auto-Interpretability in Sparse Autoencoders", venue: "EMNLP 2025" },
    { emoji: "📈", title: "Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs", venue: "IJCAI 2025" },
    { emoji: "🎓", title: "A Benchmark to Evaluate LLMs’ Proficiency on Italian Student Competencies", venue: "ECML-PKDD 2025" }
  ];

  function mountTicker(){
    const ticker = document.getElementById('ticker');
    if(!ticker) return;
    
    const items = [...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS]; // Triplica per sicurezza
    
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'tick-item';
      // Nuovo formato: Emoji + "Titolo" accepted at "Venue"
      el.innerHTML = `${item.emoji} <strong>"${item.title}"</strong> accepted at ${item.venue}`;
      ticker.appendChild(el);
    });
  }
  window.addEventListener('DOMContentLoaded', mountTicker);


  // ===== ALBUM OF THE DAY (con copertine) =====
  // HO CORRETTO I LINK
  const ALBUMS = [
    { 
      title: 'After Hours', 
      artist: 'The Weeknd', 
      img: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png',
      spotifyUrl: 'https://open.spotify.com/album/4yP0hdKOZPNshxUOjY0cZj',
      appleUrl: 'https://music.apple.com/us/album/after-hours/1503387848'
    },
    { 
      title: 'IGOR', 
      artist: 'Tyler, The Creator', 
      img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg',
      spotifyUrl: 'https://open.spotify.com/album/5zi7WsKlIiUXv09tbGLKsE',
      appleUrl: 'https: music.apple.com/us/album/igor/1463409338'
    },
    { 
      title: 'Graduation', 
      artist: 'Kanye West', 
      img: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
      spotifyUrl: 'https://open.spotify.com/album/5fPglEDz9YEwRgbLRvhCZy',
      appleUrl: 'https: music.apple.com/us/album/graduation/1440838389'
    },
    { 
      title: 'Blonde', 
      artist: 'Frank Ocean', 
      img: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg',
      spotifyUrl: 'https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf',
      appleUrl: 'https: music.apple.com/us/album/blond/1146195596'
    },
  ];

  function dailyIndex(n){
    const d=new Date();
    const seed = d.getFullYear()*1000 + (d.getMonth()+1)*50 + d.getDate();
    return seed % n;
  }
  
  function mountAlbum(){
    const idx = dailyIndex(ALBUMS.length);
    const album = ALBUMS[idx];
    
    const imgEl = document.getElementById('album-cover-img');
    const titleEl = document.getElementById('album-title');
    const artistEl = document.getElementById('album-artist');
    const spotifyEl = document.getElementById('album-spotify');
    
    if(imgEl) imgEl.src = album.img;
    if(imgEl) imgEl.alt = `Cover of ${album.title} by ${album.artist}`;
    if(titleEl) titleEl.textContent = album.title;
    if(artistEl) artistEl.textContent = album.artist;
    if(spotifyEl) spotifyEl.href = album.spotifyUrl;
  }
  window.addEventListener('DOMContentLoaded', mountAlbum);

  // ===== NUOVA FUNZIONE PER LA TENDINA =====
  function setupAlbumToggle(){
    const trigger = document.getElementById('album-trigger');
    const widget = document.getElementById('album-widget');
    if(!trigger || !widget) return;
    
    trigger.addEventListener('click', (e) => {
      e.preventDefault(); // Impedisce salti di pagina
      widget.classList.toggle('album-open');
    });
  }
  
  // ===== Leaflet map =====
  window.addEventListener('load', function(){
    const el = document.getElementById('map'); if(!el || !window.L) return;
    const map = L.map('map',{zoomControl:false, scrollWheelZoom:false, dragging:true}).setView([41.1621,12.5], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(map);
    
    // MODIFICA QUI: Etichette arricchite
    const pubs = [
      {lat:1.3521, lng:103.8198, label:'AAAI 2026 (Demo) — Singapore<br><strong>Terminator Economy:</strong> Assessing jobs...'},
      {lat:31.2989,lng:120.5853,label:'EMNLP 2025 (Industry) — Suzhou<br><strong>SFAL:</strong> Semantic-Functional Alignment...'},
      {lat:41.1621,lng:-8.6291,label:'ECML-PKDD 2025 — Porto<br><strong>Disce aut Deficere:</strong> Evaluating LLMs...'},
      {lat:45.5017,lng:-73.5673,label:'IJCAI 2025 — Montreal<br><strong>Towards the Terminator Economy:</strong> ...TEAI/TRAI'},
      {lat:37.5022,lng:15.0873,label:'ACM SAC 2025 — Catania<br><strong>SkiLLMo:</strong> Normalized ESCO Skill Extraction...'},
      {lat:42.8782,lng:-8.5449,label:'ECAI 2024 — Santiago de Compostela<br><strong>An approach to Evaluative AI...</strong>'},
      {lat:35.9375,lng:14.5001,label:'XAI World 2024 — Malta<br><strong>Augmenting XAI with LLMs</strong> (Best Presentation Award)'},
      {lat:41.9028,lng:12.4964,label:'AIxIA 2023 — Rome<br><strong>Skills-Hunter:</strong> adapting LLMs...'}
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
  "jobTitle": "PhD in AI & NLP, AI Scientist, Data Scientist",
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