// ---------- Floating emojis background ----------
(function floaters() {
  const container = document.getElementById('floaters');
  const emojis = ['💗', '🎈', '✨', '🎉', '💕', '🐹'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('span');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    el.style.animationDuration = (8 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(el);
  }
})();

// ---------- Scroll button ----------
document.getElementById('scrollBtn').addEventListener('click', () => {
  document.querySelector('.letter-section').scrollIntoView({ behavior: 'smooth' });
});

// ---------- Countdown to Oct 18 ----------
(function countdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  const label = document.getElementById('countdown-label');
  const wrap = document.getElementById('countdown');

    function nextBirthday() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(year, 9, 18, 0, 0, 0); // month 9 = October
    if (target.getTime() <= now.getTime()) {
      const endOfDay = new Date(year, 9, 18, 23, 59, 59);
      if (now.getTime() <= endOfDay.getTime()) return null; // it's today!
      target = new Date(year + 1, 9, 18, 0, 0, 0);
    }
    return target;
  }

  
  function tick() {
    const target = nextBirthday();
    if (!target) {
      wrap.innerHTML = '<div class="countdown-box" style="min-width:auto;padding:0.8rem 1.4rem;"><span style="font-size:1.6rem;">🎂 ¡HOY! 🎂</span></div>';
      label.textContent = '¡Es tu día, Stefy!';
      return;
    }
    const diff = target.getTime() - Date.now();
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    daysEl.textContent = d;
    hoursEl.textContent = h;
    minsEl.textContent = m;
    secsEl.textContent = s;
  }

  tick();
  setInterval(tick, 1000);
})();

// ---------- Gallery lightbox ----------
(function gallery() {
  const imgs = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightboxClose');

  imgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  function close() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  }

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
})();

// ---------- Confetti ----------
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const confettiColors = ['#ff5fa2', '#8b5cf6', '#ffd166', '#2ec4b6', '#ff9fc9'];

function burstConfetti(originX, originY, count = 80) {
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: originX,
      y: originY,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 4,
      size: Math.random() * 7 + 4,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      life: 0,
      maxLife: 110 + Math.random() * 40,
      shape: Math.random() > 0.5 ? 'rect' : 'circle'
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles = confettiParticles.filter(p => p.life < p.maxLife);

  confettiParticles.forEach(p => {
    p.vy += 0.28; // gravity
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.life++;

    const alpha = 1 - p.life / p.maxLife;
    ctx.save();
    ctx.globalAlpha = Math.max(alpha, 0);
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// ---------- Quiz ----------
const quizData = [
  {
    question: '¿Dónde nos conocimos por primera vez?',
    options: [
      'En una fiesta',
      'En la agencia para ir juntos a la universidad',
      'Por redes sociales',
      'En un cumpleaños'
    ],
    correct: 1
  },
  {
    question: '¿Dónde fue nuestra primera cita?',
    options: [
      'En el cine',
      'En la playa',
      'En una cafetería',
      'En un restaurante elegante'
    ],
    correct: 2
  },
  {
    question: '¿Cuál es "nuestra" canción especial?',
    options: [
      'Perfect - Ed Sheeran',
      "Can't Take My Eyes Off You",
      'All of Me - John Legend',
      'Thinking Out Loud'
    ],
    correct: 1
  },
  {
    question: '¿Cómo le dice Emy a Stefy de cariño?',
    options: [
      'Mi princesa',
      'Bebé',
      'Mi cuysita',
      'Mi reina'
    ],
    correct: 2
  },
  {
    question: '¿Qué día es nuestra fecha?',
    options: [
      '20 de octubre',
      '28 de Septiembre',
      '10 de Diciembre',
      '14 de Febrero'
    ],
    correct: 1
  }
];

(function quiz() {
  let current = 0;
  let score = 0;
  let locked = false;

  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const feedbackEl = document.getElementById('quizFeedback');
  const countEl = document.getElementById('quizCount');
  const progressBar = document.getElementById('quizProgress');
  const quizCard = document.getElementById('quizCard');
  const resultCard = document.getElementById('quizResult');
  const resultTitle = document.getElementById('resultTitle');
  const resultText = document.getElementById('resultText');
  const retryBtn = document.getElementById('retryBtn');

  function render() {
    const q = quizData[current];
    questionEl.textContent = q.question;
    countEl.textContent = `Pregunta ${current + 1} de ${quizData.length}`;
    progressBar.style.width = `${((current) / quizData.length) * 100}%`;
    feedbackEl.textContent = '';
    optionsEl.innerHTML = '';
    locked = false;

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(idx, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(idx, btn) {
    if (locked) return;
    locked = true;
    const q = quizData[current];
    const buttons = optionsEl.querySelectorAll('.quiz-option');
    buttons.forEach(b => b.classList.add('disabled'));

    if (idx === q.correct) {
      btn.classList.add('correct');
      feedbackEl.textContent = '¡Correcto! 🎉 Nos conoces bien';
      feedbackEl.style.color = '#117a68';
      score++;
      const rect = btn.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top, 60);
    } else {
      btn.classList.add('wrong');
      buttons[q.correct].classList.add('correct');
      feedbackEl.textContent = 'Casi... ¡pero el amor sigue intacto! 💗';
      feedbackEl.style.color = '#a33131';
    }

    setTimeout(() => {
      current++;
      if (current < quizData.length) {
        render();
      } else {
        showResult();
      }
    }, 1400);
  }

  function showResult() {
    progressBar.style.width = '100%';
    quizCard.style.display = 'none';
    resultCard.classList.add('active');

    let title, text, emoji;
    if (score === quizData.length) {
      title = '¡Puntaje perfecto! 💯';
      text = `Respondiste ${score} de ${quizData.length} correctamente. Se nota que esto que tenemos es real, mi cuysita. Te amo.`;
      emoji = '🏆';
    } else if (score >= quizData.length - 2) {
      title = '¡Muy bien, mi amor! 💕';
      text = `Respondiste ${score} de ${quizData.length}. Nos conocemos bastante bien, ¡y cada día conociéndonos más!`;
      emoji = '🎉';
    } else {
      title = '¡Para seguir conociéndonos! 😅💗';
      text = `Respondiste ${score} de ${quizData.length}. No importa, lo que sí sé es que te amo con toda mi alma.`;
      emoji = '🐹';
    }
    document.querySelector('.result-emoji').textContent = emoji;
    resultTitle.textContent = title;
    resultText.textContent = text;

    const rect = resultCard.getBoundingClientRect();
    burstConfetti(window.innerWidth / 2, rect.top + 80, 140);
  }

  retryBtn.addEventListener('click', () => {
    current = 0;
    score = 0;
    resultCard.classList.remove('active');
    quizCard.style.display = 'block';
    render();
  });

  render();
})();
