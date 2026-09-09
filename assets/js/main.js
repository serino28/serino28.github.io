/* =====================================================
   ANTONIO SERINO: MAIN JAVASCRIPT
   Features: Theme Toggle, Animations, Snake Game
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavScroll();
    initNavMenu();
    initScrollProgress();
    initCardSpotlight();
    initScrollAnimations();
    initEasterEgg();
    initSnakeGame();
    initGlobe();
    initSafetyModal();
    initYear();
});

/* ===== THEME TOGGLE ===== */
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('theme');

    // Default to dark
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
}

/* ===== NAV SCROLL EFFECT ===== */
function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const checkScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
}

/* ===== MOBILE NAV MENU ===== */
function initNavMenu() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!nav || !toggle || !links) return;

    const close = () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close after picking a destination
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', close);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
}

/* ===== SCROLL PROGRESS BAR ===== */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const update = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        bar.style.width = pct + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
}

/* ===== CARD SPOTLIGHT (cursor-following glow) ===== */
function initCardSpotlight() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
    });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-anim]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

/* ===== EASTER EGG: Triple-click on footer hint ===== */
function initEasterEgg() {
    const trigger = document.getElementById('easter-egg-trigger');
    if (!trigger) return;

    let clickCount = 0;
    let clickTimer = null;

    trigger.style.cursor = 'pointer';
    trigger.style.userSelect = 'none';

    trigger.addEventListener('click', (e) => {
        clickCount++;

        if (clickTimer) clearTimeout(clickTimer);

        if (clickCount >= 3) {
            clickCount = 0;
            activateSnake();
        } else {
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
        }
    });
}


/* ===== SNAKE GAME ===== */
let snakeGame = null;

function activateSnake() {
    const overlay = document.getElementById('snake-overlay');
    if (overlay) {
        overlay.classList.add('active');
        if (!snakeGame) {
            snakeGame = new SnakeGame();
        }
        snakeGame.start();
    }
}

function deactivateSnake() {
    const overlay = document.getElementById('snake-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        if (snakeGame) {
            snakeGame.stop();
        }
    }
}

function initSnakeGame() {
    const closeBtn = document.getElementById('snake-close');
    const overlay = document.getElementById('snake-overlay');

    if (closeBtn) {
        closeBtn.addEventListener('click', deactivateSnake);
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                deactivateSnake();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            deactivateSnake();
        }
    });
}

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snake-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreEl = document.getElementById('snake-score');
        this.highEl = document.getElementById('snake-high');

        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;

        this.highScore = parseInt(localStorage.getItem('snakeHigh') || '0');
        if (this.highEl) this.highEl.textContent = `High: ${this.highScore}`;

        this.boundKeyHandler = this.handleKey.bind(this);
        this.running = false;
        this.specialMessageShown = false;
    }

    start() {
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 0, y: 0 };
        this.nextDirection = { x: 0, y: 0 };
        this.food = this.randomFood();
        this.score = 0;
        this.updateScore();
        this.specialMessageShown = false;

        document.addEventListener('keydown', this.boundKeyHandler);

        this.running = true;
        this.lastTime = 0;
        this.accumulator = 0;
        this.gameLoop();
    }

    stop() {
        this.running = false;
        document.removeEventListener('keydown', this.boundKeyHandler);
    }

    handleKey(e) {
        const key = e.key.toLowerCase();

        if ((key === 'arrowup' || key === 'w') && this.direction.y !== 1) {
            this.nextDirection = { x: 0, y: -1 };
        } else if ((key === 'arrowdown' || key === 's') && this.direction.y !== -1) {
            this.nextDirection = { x: 0, y: 1 };
        } else if ((key === 'arrowleft' || key === 'a') && this.direction.x !== 1) {
            this.nextDirection = { x: -1, y: 0 };
        } else if ((key === 'arrowright' || key === 'd') && this.direction.x !== -1) {
            this.nextDirection = { x: 1, y: 0 };
        }

        if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
            e.preventDefault();
        }
    }

    randomFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(s => s.x === food.x && s.y === food.y));
        return food;
    }

    gameLoop(timestamp = 0) {
        if (!this.running) return;

        const delta = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.accumulator += delta;

        const speed = 100; // ms per tick

        if (this.accumulator >= speed) {
            this.accumulator = 0;
            this.update();
        }

        this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update() {
        this.direction = { ...this.nextDirection };

        if (this.direction.x === 0 && this.direction.y === 0) return;

        const head = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };

        // Wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }

        // Self collision
        if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Eat food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.randomFood();

            // Special message at 50 points
            if (this.score >= 50 && !this.specialMessageShown) {
                this.specialMessageShown = true;
                setTimeout(() => {
                    alert("🎉 You're crushing it! Keep working like this and you'll master interpretability too! 🐍");
                }, 100);
            }
        } else {
            this.snake.pop();
        }
    }

    draw() {
        // Clear
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim() || '#0a0a0f';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Grid (subtle)
        this.ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }

        // Food
        const gradient = this.ctx.createRadialGradient(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            0,
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2
        );
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(1, '#ee5a5a');
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();

        // Snake
        this.snake.forEach((segment, i) => {
            const alpha = 1 - (i / this.snake.length) * 0.5;
            if (i === 0) {
                this.ctx.fillStyle = '#667eea';
            } else {
                this.ctx.fillStyle = `rgba(102, 126, 234, ${alpha})`;
            }
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
    }

    updateScore() {
        if (this.scoreEl) this.scoreEl.textContent = `Score: ${this.score}`;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHigh', this.highScore.toString());
            if (this.highEl) this.highEl.textContent = `High: ${this.highScore}`;
        }
    }

    gameOver() {
        this.running = false;
        document.removeEventListener('keydown', this.boundKeyHandler);

        // Draw game over
        this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 24px JetBrains Mono';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);

        this.ctx.font = '16px JetBrains Mono';
        this.ctx.fillStyle = '#667eea';
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);

        this.ctx.fillStyle = '#888';
        this.ctx.font = '12px JetBrains Mono';
        this.ctx.fillText('Press any arrow to restart', this.canvas.width / 2, this.canvas.height / 2 + 50);

        // Restart on any arrow
        const restartHandler = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
                document.removeEventListener('keydown', restartHandler);
                this.start();
            }
        };
        document.addEventListener('keydown', restartHandler);
    }
}

/* ===== INTERACTIVE 3D GLOBE (globe.gl) ===== */
function initGlobe() {
    const el = document.getElementById('globe');
    if (!el || typeof Globe === 'undefined') return;

    const ACCENT = '#667eea';
    const VISIT = '#f5a623'; // distinct colour for the upcoming visiting stint

    const locations = [
        { lat: 34.0209, lng: -6.8416, tag: 'EACL 2026', venue: 'EACL 2026 · Rabat',
          title: 'Safe-Unsafe Concept Separation Emerges from a Single Direction in Language Models Activation Space' },
        { lat: 31.2989, lng: 120.5853, tag: 'EMNLP 2025', venue: 'EMNLP 2025 · Suzhou',
          title: 'SFAL: Semantic-Functional Alignment Scores for Distributional Evaluation of Auto-Interpretability in Sparse Autoencoders' },
        { lat: 41.1621, lng: -8.6291, tag: 'ECML-PKDD 2025', venue: 'ECML-PKDD 2025 · Porto',
          title: 'Disce aut Deficere: Evaluating LLMs Proficiency on the INVALSI Italian Benchmark' },
        { lat: 45.5017, lng: -73.5673, tag: 'IJCAI 2025', venue: 'IJCAI 2025 · Montreal',
          title: 'Towards the Terminator Economy: Assessing Job Exposure to AI through LLMs' },
        { lat: 37.5022, lng: 15.0873, tag: 'ACM SAC 2025', venue: 'ACM SAC 2025 · Catania',
          title: 'SkiLLMo: Normalized ESCO Skill Extraction through Transformer Models' },
        { lat: 42.8782, lng: -8.5449, tag: 'ECAI 2024', venue: 'ECAI 2024 · Santiago',
          title: 'An approach to Evaluative AI through Large Language Models' },
        { lat: 35.9375, lng: 14.5001, tag: 'xAI 2024 🏆', venue: 'xAI World Conference 2024 · Malta 🏆',
          title: 'Augmenting XAI with LLMs: A Case Study in Banking Marketing Recommendation' },
        { lat: 33.3617, lng: 126.5292, tag: 'IJCAI 2024', venue: 'XAI Workshop @ IJCAI 2024 · Jeju',
          title: 'Augmenting XAI with LLMs: A Case Study in Banking Marketing Recommendation' },
        { lat: 41.9028, lng: 12.4964, tag: 'AIxIA 2023', venue: 'AIxIA 2023 · Rome',
          title: 'Skills-Hunter: adapting Large Language Models to the Labour Market for Skill Extraction' },
        { lat: 1.3483, lng: 103.6831, visiting: true, tag: 'NTU Singapore', venue: 'NTU Singapore · Visiting Researcher',
          title: 'AI Safety through Mechanistic Interpretability (with Prof. Erik Cambria, Aug 2026–Jan 2027)' }
    ];

    const colorFor = d => d.visiting ? VISIT : ACCENT;
    locations.forEach(d => {
        d.label = `<div class="globe-tip"><strong>${d.venue}</strong>${d.title}</div>`;
    });

    const sizeFor = () => {
        const w = el.clientWidth || el.parentElement.clientWidth || 600;
        const h = Math.max(360, Math.min(560, Math.round(w * 0.62)));
        return { w, h };
    };

    const { w, h } = sizeFor();

    const globe = Globe()(el)
        .width(w)
        .height(h)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('/assets/img/earth-dark.jpg')
        .bumpImageUrl('/assets/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor(ACCENT)
        .atmosphereAltitude(0.16)
        .pointsData(locations)
        .pointColor(colorFor)
        .pointAltitude(0.02)
        .pointRadius(0.5)
        .pointLabel('label')
        .labelsData(locations)
        .labelText('tag')
        .labelColor(colorFor)
        .labelSize(0.9)
        .labelDotRadius(0.4)
        .labelResolution(2)
        .labelAltitude(0.01)
        .labelLabel('label')
        .ringsData(locations)
        .ringColor(d => {
            const c = d.visiting ? '245,166,35' : '102,126,234';
            return t => `rgba(${c},${1 - t})`;
        })
        .ringMaxRadius(3)
        .ringPropagationSpeed(1.4)
        .ringRepeatPeriod(1500);

    // Frame the world and rotate gently; let users grab and spin it
    globe.pointOfView({ lat: 25, lng: 25, altitude: 2.4 });
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.enableZoom = false; // keep page scrolling natural over the globe
    // Pause rotation while the user is reading / interacting
    el.addEventListener('pointerenter', () => { controls.autoRotate = false; });
    el.addEventListener('pointerleave', () => { controls.autoRotate = true; });

    // Robust sizing: handle the container being measured at 0 width on load
    // (e.g. while off-screen) and keep the globe responsive afterwards.
    const applySize = () => { const s = sizeFor(); globe.width(s.w).height(s.h); };
    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(applySize).observe(el);
    } else {
        window.addEventListener('resize', applySize, { passive: true });
    }
    applySize();
}

/* ===== SAFETY LATENT-SPACE 3D (three.js) ===== */
function makeDiscTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.3, 'rgba(255,255,255,0.85)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
}

function initLatent3d() {
    const el = document.getElementById('latent3d');
    if (!el || el.dataset.init || typeof THREE === 'undefined' || !window.LATENT_POINTS) return;
    el.dataset.init = '1';

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SAFE = 0x2dd4bf, UNSAFE = 0xfb7185, ACCENT = 0x7c8cf0;

    const sizeFor = () => {
        const w = el.clientWidth || el.parentElement.clientWidth || 600;
        const h = Math.max(300, Math.min(Math.round(w * 0.62), Math.round(window.innerHeight * 0.58)));
        return { w, h };
    };
    let { w, h } = sizeFor();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.06);

    const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 100);
    camera.position.set(4.2, 1.8, 4.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    const sprite = makeDiscTexture();
    const cloud = (arr, color) => {
        const g = new THREE.BufferGeometry();
        const pos = new Float32Array(arr.length * 3);
        for (let i = 0; i < arr.length; i++) {
            pos[i * 3] = arr[i][0];
            pos[i * 3 + 1] = arr[i][1];
            pos[i * 3 + 2] = arr[i][2];
        }
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const m = new THREE.PointsMaterial({
            size: 0.16, map: sprite, color: color, transparent: true, opacity: 0.9,
            depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
        });
        return new THREE.Points(g, m);
    };
    scene.add(cloud(window.LATENT_POINTS.safe, SAFE));
    scene.add(cloud(window.LATENT_POINTS.unsafe, UNSAFE));

    // The separating hyperplane (normal along x): the "single direction"
    const planeGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
        color: ACCENT, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false
    }));
    plane.rotation.y = Math.PI / 2;
    scene.add(plane);
    const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(planeGeo),
        new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.45 })
    );
    edge.rotation.y = Math.PI / 2;
    scene.add(edge);

    // Arrow showing the safety direction
    const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0), new THREE.Vector3(-3, -2.6, 0), 6, ACCENT, 0.45, 0.28
    );
    scene.add(arrow);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.7;
    el.addEventListener('pointerenter', () => { controls.autoRotate = false; });
    el.addEventListener('pointerleave', () => { controls.autoRotate = !reduce; });

    (function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    })();

    const applySize = () => {
        const s = sizeFor();
        camera.aspect = s.w / s.h;
        camera.updateProjectionMatrix();
        renderer.setSize(s.w, s.h);
    };
    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(applySize).observe(el);
    } else {
        window.addEventListener('resize', applySize, { passive: true });
    }
}

/* ===== SAFETY MODAL (opens the latent-space viz from the bio) ===== */
function initSafetyModal() {
    const trigger = document.getElementById('safety-trigger');
    const modal = document.getElementById('safety-modal');
    const closeBtn = document.getElementById('safety-modal-close');
    if (!trigger || !modal) return;

    let built = false;

    const open = () => {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Build the WebGL viz lazily, once the modal has a measurable size
        if (!built) {
            built = true;
            requestAnimationFrame(() => initLatent3d());
        }
        if (closeBtn) closeBtn.focus();
    };

    const close = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        trigger.focus();
    };

    trigger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });
}

/* ===== YEAR ===== */
function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}
