/* =====================================================
   ANTONIO SERINO — MAIN JAVASCRIPT
   Features: Theme Toggle, Animations, Snake Game, Albums
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavScroll();
    initScrollAnimations();
    initNowPlaying();
    initEasterEgg();
    initSnakeGame();
    initMap();
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

/* ===== LEAFLET MAP ===== */
function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl || !window.L) return;

    const map = L.map('map', {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: true
    }).setView([41.1621, 12.5], 4);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO'
    }).addTo(map);

    const publications = [
        { lat: 34.0209, lng: -6.8416, label: '<strong>EACL 2026</strong> — Rabat<br>Safe-Unsafe Concept Separation' },
        { lat: 31.2989, lng: 120.5853, label: '<strong>EMNLP 2025</strong> — Suzhou<br>SFAL: Auto-Interpretability' },
        { lat: 41.1621, lng: -8.6291, label: '<strong>ECML-PKDD 2025</strong> — Porto<br>Disce aut Deficere' },
        { lat: 45.5017, lng: -73.5673, label: '<strong>IJCAI 2025</strong> — Montreal<br>Terminator Economy' },
        { lat: 37.5022, lng: 15.0873, label: '<strong>ACM SAC 2025</strong> — Catania<br>SkiLLMo' },
        { lat: 42.8782, lng: -8.5449, label: '<strong>ECAI 2024</strong> — Santiago<br>Evaluative AI' },
        { lat: 35.9375, lng: 14.5001, label: '<strong>XAI World 2024</strong> — Malta<br>🏆 Best Presentation' },
        { lat: 41.9028, lng: 12.4964, label: '<strong>AIxIA 2023</strong> — Rome<br>Skills-Hunter' },
        { lat: 33.3617, lng: 126.5292, label: '<strong>XAI-IJCAI 2024</strong> — Jeju<br>Augmenting XAI' }
    ];

    const bounds = [];

    // Custom marker icon
    const markerIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="width:12px;height:12px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;border:2px solid white;box-shadow:0 0 10px rgba(102,126,234,0.5);"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    publications.forEach(pub => {
        L.marker([pub.lat, pub.lng], { icon: markerIcon })
            .addTo(map)
            .bindPopup(pub.label);
        bounds.push([pub.lat, pub.lng]);
    });

    if (bounds.length) {
        map.fitBounds(bounds, { padding: [30, 30] });
    }
}

/* ===== YEAR ===== */
function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}
