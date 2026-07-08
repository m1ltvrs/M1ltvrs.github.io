const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const snowflakes = [];
const numFlakes = 150;


for (let i = 0; i < numFlakes; i++) {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 0.5 - 0.25
    });
}


function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    
    snowflakes.forEach(flake => {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    });
    
    ctx.fill();
    updateSnow();
}


function updateSnow() {
    snowflakes.forEach(flake => {
        flake.y += flake.speed;
        flake.x += flake.drift;
        
        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }
    });
}


setInterval(drawSnow, 20);


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



const clickSound = document.getElementById('click-sound');
const hoverSound = document.getElementById('hover-sound');



document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
    
    el.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});



const audio = document.getElementById('audio');
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    logo.classList.remove('spin');
    void logo.offsetWidth;
    logo.classList.add('spin');
});

logo.addEventListener('animationend', () => {
    logo.classList.remove('spin');
});

const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const volumeBtn = document.getElementById('volume-btn');
const volIcon = document.getElementById('vol-icon');
const muteIcon = document.getElementById('mute-icon');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');

function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function togglePlay() {
    if (audio.paused) {
        audio.play().catch(e => console.error('Play error:', e));
    } else {
        audio.pause();
    }
}

playBtn.addEventListener('click', togglePlay);

audio.addEventListener('play', () => {
    playIcon.style.display = 'none';
    pauseIcon.style.display = '';
    logo.classList.add('playing');
    document.body.classList.add('playing');
});

audio.addEventListener('pause', () => {
    playIcon.style.display = '';
    pauseIcon.style.display = 'none';
    logo.classList.remove('playing');
    document.body.classList.remove('playing');
});

audio.addEventListener('ended', () => {
    logo.classList.remove('playing');
    document.body.classList.remove('playing');
    if (!audio.loop) {
        playIcon.style.display = '';
        pauseIcon.style.display = 'none';
    }
});

audio.addEventListener('error', () => {
    console.error('Audio failed to load. Check that song3.mp3 exists at the correct path.');
});

prevBtn.addEventListener('click', () => {
    audio.currentTime = 0;
});

nextBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play().catch(e => console.log('Play error:', e));
});

repeatBtn.addEventListener('click', () => {
    audio.loop = !audio.loop;
    repeatBtn.classList.toggle('active', audio.loop);
});

volumeBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    volIcon.style.display = audio.muted ? 'none' : '';
    muteIcon.style.display = audio.muted ? '' : 'none';
});

audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    timeCurrent.textContent = formatTime(audio.currentTime);
    if (audio.duration) {
        progressFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    }
});

function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    if (audio.duration) {
        audio.currentTime = ratio * audio.duration;
    }
}

progressBar.addEventListener('click', seek);

let isDragging = false;
progressBar.addEventListener('mousedown', () => { isDragging = true; });
window.addEventListener('mousemove', (e) => { if (isDragging) seek(e); });
window.addEventListener('mouseup', () => { isDragging = false; });
