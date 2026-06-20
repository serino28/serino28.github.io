/* =====================================================
   ANTONIO SERINO — MAIN JAVASCRIPT
   Features: Theme Toggle, Animations, Snake Game, Albums
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavScroll();
    initNavMenu();
    initScrollProgress();
    initCardSpotlight();
    initScrollAnimations();
    initNowPlaying();
    initEasterEgg();
    initSnakeGame();
    initGlobe();
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

/* ===== NOW PLAYING (ALBUM WIDGET) ===== */
const ALBUMS = [
    // The Weeknd
    { title: 'After Hours', artist: 'The Weeknd', img: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png', spotifyUrl: 'https://open.spotify.com/album/4yP0hdKOZPNshxUOjY0cZj' },
    { title: 'Starboy', artist: 'The Weeknd', img: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png', spotifyUrl: 'https://open.spotify.com/album/2ODvWsOgouMbaA5xf0RkJe' },
    { title: 'Dawn FM', artist: 'The Weeknd', img: 'https://upload.wikimedia.org/wikipedia/en/b/b9/The_Weeknd_-_Dawn_FM.png', spotifyUrl: 'https://open.spotify.com/album/2nLOHgzXzwFEpl62zAgCEC' },

    // Drake
    { title: 'Take Care', artist: 'Drake', img: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Drake_-_Take_Care_cover.jpg', spotifyUrl: 'https://open.spotify.com/album/6X1x82kppWZmDzlXXK3y3q' },
    { title: 'Nothing Was The Same', artist: 'Drake', img: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Nothing_Was_the_Same_cover_2.png', spotifyUrl: 'https://open.spotify.com/album/4mR7DzBrP5t1xFBiwgFpgy' },

    // Kanye West
    { title: 'Graduation', artist: 'Kanye West', img: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg', spotifyUrl: 'https://open.spotify.com/album/4SZko61aMnmgvNhfhgTuD3' },
    { title: 'My Beautiful Dark Twisted Fantasy', artist: 'Kanye West', img: 'https://upload.wikimedia.org/wikipedia/en/a/a3/My_Beautiful_Dark_Twisted_Fantasy.jpg', spotifyUrl: 'https://open.spotify.com/album/20r762YmB5HeofjMCiPMLv' },

    // Dua Lipa
    { title: 'Future Nostalgia', artist: 'Dua Lipa', img: 'https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png', spotifyUrl: 'https://open.spotify.com/album/5lKlFlReHOLShQKyRv6AL9' },

    // Ariana Grande
    { title: 'Dangerous Woman', artist: 'Ariana Grande', img: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png', spotifyUrl: 'https://open.spotify.com/album/3pdKBLSvnFIHVKxHOJCheT' },
    { title: 'thank u, next', artist: 'Ariana Grande', img: 'https://upload.wikimedia.org/wikipedia/en/d/dd/Thank_U%2C_Next_album_cover.png', spotifyUrl: 'https://open.spotify.com/album/2fYhqwDWXjbpZSRaWoNqRv' },

    // Michael Jackson
    { title: 'Thriller', artist: 'Michael Jackson', img: 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png', spotifyUrl: 'https://open.spotify.com/album/2ANVost0y2y52ema1E9xAZ' },
    { title: 'Bad', artist: 'Michael Jackson', img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png', spotifyUrl: 'https://open.spotify.com/album/1gIC63gC3B7o7FfpPACZQJ' },

    // Tyler, The Creator
    { title: 'IGOR', artist: 'Tyler, The Creator', img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg', spotifyUrl: 'https://open.spotify.com/album/5zi7WsKlIiUXv09tbGLKsE' },
    { title: 'CHROMAKOPIA', artist: 'Tyler, The Creator', img: 'https://upload.wikimedia.org/wikipedia/en/0/03/Chromakopia.jpg', spotifyUrl: 'https://open.spotify.com/album/0U28P0QVB1QRxpqp5IHOlH' },

    // Phil Collins
    { title: 'Face Value', artist: 'Phil Collins', img: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Facevaluealbum.jpg', spotifyUrl: 'https://open.spotify.com/album/58SshOWr7rXdnsbD9IrAAE' },

    // Duran Duran
    { title: 'Rio', artist: 'Duran Duran', img: 'https://upload.wikimedia.org/wikipedia/en/8/8e/DuranDuranRio.jpg', spotifyUrl: 'https://open.spotify.com/album/3LWIZJX8whRH2TqNVKFmPK' },

    // Queen
    { title: 'A Night at the Opera', artist: 'Queen', img: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png', spotifyUrl: 'https://open.spotify.com/album/1GbtB4zTqAsyfZEsm1RZfx' },

    // Prince
    { title: 'Purple Rain', artist: 'Prince', img: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Princepurplerain.jpg', spotifyUrl: 'https://open.spotify.com/album/7nXJ5k4XgRj5OLg9m8V3zc' },
    { title: 'Sign o\' the Times', artist: 'Prince', img: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Prince_Sign_O_the_Times.jpg', spotifyUrl: 'https://open.spotify.com/album/5sG7foNBBsI9yYlfu26qxY' },

    // Frank Ocean
    { title: 'Blonde', artist: 'Frank Ocean', img: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg', spotifyUrl: 'https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf' }
];

function dailyIndex(n) {
    const d = new Date();
    const seed = d.getFullYear() * 1000 + (d.getMonth() + 1) * 50 + d.getDate();
    return seed % n;
}

function initNowPlaying() {
    const widget = document.getElementById('now-playing');
    const trigger = document.getElementById('now-playing-trigger');
    const img = document.getElementById('now-playing-img');
    const title = document.getElementById('now-playing-title');
    const artist = document.getElementById('now-playing-artist');
    const link = document.getElementById('now-playing-link');

    if (!widget || !img) return;

    const album = ALBUMS[dailyIndex(ALBUMS.length)];

    img.src = album.img;
    img.alt = `${album.title} by ${album.artist}`;
    if (title) title.textContent = album.title;
    if (artist) artist.textContent = album.artist;
    if (link) link.href = album.spotifyUrl;

    if (trigger) {
        trigger.addEventListener('click', () => {
            widget.classList.toggle('open');
        });
    }
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
        { lat: 1.3483, lng: 103.6831, visiting: true, tag: 'NTU Singapore', venue: 'NTU Singapore · Visiting 2026',
          title: 'AI Safety through Mechanistic Interpretability' }
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

/* ===== YEAR ===== */
function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}
