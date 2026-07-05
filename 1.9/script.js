/* =========================================================
   Interacciones del regalo para Lola
   JavaScript puro, sin dependencias ni librerias externas.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector("#intro");
  const startButton = document.querySelector("#startButton");
  const catRain = document.querySelector("#catRain");
  const introSparkles = document.querySelector("#introSparkles");
  const letterText = document.querySelector("#letterText");
  const openGalleryButton = document.querySelector("#openGallery");
  const gallery = document.querySelector("#gallery");
  const closeGalleryButton = document.querySelector("#closeGallery");
  const galleryImage = document.querySelector("#galleryImage");
  const galleryCaption = document.querySelector("#galleryCaption");
  const galleryDots = document.querySelector("#galleryDots");
  const prevPhotoButton = document.querySelector("#prevPhoto");
  const nextPhotoButton = document.querySelector("#nextPhoto");
  const noButton = document.querySelector("#noButton");
  const yesButton = document.querySelector("#yesButton");
  const answerZone = document.querySelector("#answerZone");
  const questionMessage = document.querySelector("#questionMessage");
  const noError = document.querySelector("#noError");
  const finale = document.querySelector("#finale");
  const finaleMessage = document.querySelector("#finaleMessage");
  const finaleParticles = document.querySelector("#finaleParticles");
  const fireworksCanvas = document.querySelector("#fireworksCanvas");

  const memories = [
    {
      src: "foto1.jpg",
      caption: "Ese dia me enamore un poquito mas ❤️",
    },
    {
      src: "foto2.jpg",
      caption: "Aqui seguramente me estabas llevando la contraria 😑❤️",
    },
    {
      src: "foto3.jpg",
      caption: "Mi lugar favorito siempre termina siendo donde estas tu.",
    },
    {
      src: "foto4.jpg",
      caption: "Otro recuerdo favorito desbloqueado ✨",
    },
    {
      src: "foto5.jpg",
      caption: "Tu sonrisa haciendo que todo valga la pena.",
    },
    {
      src: "foto6.jpg",
      caption: "Un ratito contigo y el mundo se pone bonito.",
    },
    {
      src: "foto7.jpg",
      caption: "La prueba de que contigo hasta lo simple es especial.",
    },
    {
      src: "foto8.jpg",
      caption: "Aqui guardo una version muy feliz de mi.",
    },
    {
      src: "foto9.jpg",
      caption: "Mi foto mental favorita: tu y yo juntitos.",
    },
    {
      src: "foto10.jpg",
      caption: "Que vengan mil recuerdos mas, Cafecito.",
    },
  ];

  let typedStarted = false;
  let galleryIndex = 0;
  let noAttempts = 0;
  let fireworksStarted = false;
  let fireworksRunning = false;
  let animationFrame = 0;
  let touchStartX = 0;

  document.body.classList.add("is-locked");

  renderPolaroids();
  renderAmbientDetails();
  setupRevealObserver();
  setupCounter();
  setupGallery();
  setupQuestion();
  setupFireworks();

  startButton.addEventListener("click", startExperience, { once: true });

  function startExperience() {
    intro.classList.add("is-transforming");
    startButton.disabled = true;
    rainCats();
    burstSparkles(introSparkles, 90);

    window.setTimeout(() => {
      document.body.classList.add("has-entered");
    }, 1300);

    window.setTimeout(() => {
      intro.classList.add("is-hidden");
      document.body.classList.remove("is-locked");
    }, 3100);
  }

  function rainCats() {
    const cats = ["🐱", "😺", "😻", "🐾", "♡", "🐈"];
    const amount = window.innerWidth < 640 ? 46 : 78;

    for (let index = 0; index < amount; index += 1) {
      const cat = document.createElement("span");
      cat.className = "cat-drop";
      cat.textContent = cats[randomInt(0, cats.length - 1)];
      cat.style.left = `${Math.random() * 100}vw`;
      cat.style.setProperty("--size", `${randomFloat(22, 46)}px`);
      cat.style.setProperty("--duration", `${randomFloat(2.2, 3.35)}s`);
      cat.style.setProperty("--drift", `${randomFloat(-90, 90)}px`);
      cat.style.setProperty("--spin", `${randomFloat(-180, 180)}deg`);
      cat.style.animationDelay = `${randomFloat(0, 0.85)}s`;
      catRain.appendChild(cat);
      cat.addEventListener("animationend", () => cat.remove());
    }
  }

  function burstSparkles(container, amount) {
    for (let index = 0; index < amount; index += 1) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.setProperty("--spark-size", `${randomFloat(3, 8)}px`);
      sparkle.style.setProperty("--spark-duration", `${randomFloat(1.1, 2.4)}s`);
      sparkle.style.animationDelay = `${randomFloat(0, 1.5)}s`;
      container.appendChild(sparkle);
      sparkle.addEventListener("animationend", () => sparkle.remove());
    }
  }

  function typeLetter() {
    if (typedStarted || !letterText) return;
    typedStarted = true;

  const fallbackLetter = [
`Mi querida Cafecito,   

Hoy cumplimos 1 año y 9 meses juntos, y aunque el tiempo ha pasado rápido, cada día contigo ha significado algo especial para mí. Gracias por cada conversación, cada risa, cada momento compartido y también por las dificultades que hemos superado juntos.

Eres una persona increíble, fuerte, inteligente y con un corazón enorme. Me siento afortunado de poder llamarte mi novia y de seguir construyendo recuerdos contigo. Desde aquel 4 de octubre hasta hoy, has llenado mi vida de felicidad, aprendizaje y amor.

No sé qué nos espera en el futuro, pero sí sé que quiero seguir viviendo muchos momentos a tu lado, apoyándote en tus sueños y celebrando cada logro contigo.

Felices 21 meses, mi Cafecito. Gracias por ser tú, por quedarte y por hacer que cada día valga más la pena.

Te amo muchísimo.

Con todo mi cariño,

Miguel tu Pimiento ❤️`
].join("\n");

    const text = letterText.dataset.letter || fallbackLetter;
    const finalText = text.trim() === "[AQUI PEGARE MI CARTA]" ? fallbackLetter : text;
    let index = 0;

    letterText.textContent = "";

    function writeNext() {
      letterText.textContent = finalText.slice(0, index);
      index += 1;

      if (index <= finalText.length) {
        const current = finalText[index - 1];
        const pause = current === "." || current === "," || current === "\n" ? 80 : 28;
        window.setTimeout(writeNext, pause);
      }
    }

    writeNext();
  }

  function renderPolaroids() {
    const polaroidGrid = document.querySelector("#polaroidGrid");
    if (!polaroidGrid) return;

    const tilts = ["-3deg", "2deg", "-1.5deg", "3deg"];
    polaroidGrid.innerHTML = memories
      .slice(0, 4)
      .map(
        (memory, index) => `
          <figure class="polaroid" style="--tilt: ${tilts[index]}">
            <div class="polaroid__photo">
              <img src="${memory.src}" alt="Recuerdo ${index + 1} con Lola" loading="lazy" />
              <span class="polaroid__placeholder" aria-hidden="true">♡</span>
            </div>
            <figcaption>${memory.caption}</figcaption>
          </figure>
        `,
      )
      .join("");

    polaroidGrid.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => {
        image.classList.add("is-missing");
      });
    });
  }

  function renderAmbientDetails() {
    const ambientLayers = document.querySelectorAll(".ambient");
    const symbols = ["✿", "♡", "✦", "❀", "🐾"];

    ambientLayers.forEach((layer, layerIndex) => {
      const amount = layerIndex === 0 ? 22 : 14;
      for (let index = 0; index < amount; index += 1) {
        const detail = document.createElement("span");
        detail.textContent = symbols[randomInt(0, symbols.length - 1)];
        detail.style.left = `${Math.random() * 100}%`;
        detail.style.setProperty("--size", `${randomFloat(13, 24)}px`);
        detail.style.setProperty("--duration", `${randomFloat(13, 24)}s`);
        detail.style.setProperty("--drift", `${randomFloat(-120, 120)}px`);
        detail.style.setProperty("--spin", `${randomFloat(-220, 220)}deg`);
        detail.style.animationDelay = `${randomFloat(-22, 2)}s`;
        layer.appendChild(detail);
      }
    });
  }

  function setupRevealObserver() {
    const revealItems = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.target.closest("#carta")) typeLetter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  function setupCounter() {
    const startDate = new Date(2024, 9, 4, 0, 0, 0);
    const fields = {
      years: document.querySelector('[data-time="years"]'),
      months: document.querySelector('[data-time="months"]'),
      days: document.querySelector('[data-time="days"]'),
      hours: document.querySelector('[data-time="hours"]'),
      minutes: document.querySelector('[data-time="minutes"]'),
      seconds: document.querySelector('[data-time="seconds"]'),
    };

    function update() {
      const now = new Date();
      const diff = getCalendarDiff(startDate, now);

      Object.entries(diff).forEach(([key, value]) => {
        if (fields[key]) fields[key].textContent = String(value).padStart(2, "0");
      });
    }

    update();
    window.setInterval(update, 1000);
  }

  function getCalendarDiff(start, end) {
    if (end < start) {
      return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes -= 1;
    }

    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }

    if (hours < 0) {
      hours += 24;
      days -= 1;
    }

    if (days < 0) {
      const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += previousMonth.getDate();
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days, hours, minutes, seconds };
  }

  function setupGallery() {
    renderGalleryDots();

    openGalleryButton.addEventListener("click", () => openGallery(0));
    closeGalleryButton.addEventListener("click", closeGallery);
    prevPhotoButton.addEventListener("click", showPreviousPhoto);
    nextPhotoButton.addEventListener("click", showNextPhoto);

    gallery.addEventListener("click", (event) => {
      if (event.target === gallery) closeGallery();
    });

    gallery.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    });

    gallery.addEventListener("touchend", (event) => {
      const diff = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) < 42) return;
      if (diff > 0) showPreviousPhoto();
      if (diff < 0) showNextPhoto();
    });

    document.addEventListener("keydown", (event) => {
      if (!gallery.classList.contains("is-open")) return;
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPreviousPhoto();
      if (event.key === "ArrowRight") showNextPhoto();
    });
  }

  function openGallery(index) {
    galleryIndex = index;
    updateGallery();
    gallery.classList.add("is-open");
    gallery.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
  }

  function closeGallery() {
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
  }

  function showPreviousPhoto() {
    galleryIndex = (galleryIndex - 1 + memories.length) % memories.length;
    updateGallery();
  }

  function showNextPhoto() {
    galleryIndex = (galleryIndex + 1) % memories.length;
    updateGallery();
  }

  function updateGallery() {
    const memory = memories[galleryIndex];
    galleryImage.classList.remove("is-missing");
    galleryImage.alt = `Recuerdo ${galleryIndex + 1} con Lola`;
    galleryImage.src = memory.src;
    galleryImage.onerror = () => {
      galleryImage.onerror = null;
      galleryImage.classList.add("is-missing");
      galleryImage.alt = "Foto pendiente por agregar";
      galleryImage.src = makePlaceholderImage(memory.caption);
    };
    galleryCaption.textContent = memory.caption;

    galleryDots.querySelectorAll("span").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === galleryIndex);
    });
  }

  function renderGalleryDots() {
    galleryDots.innerHTML = memories.map(() => "<span></span>").join("");
  }

  function setupQuestion() {
    const messages = [
      "Oye... piensa bien tu respuesta 🤨",
      "Miau, respuesta invalida 🐱",
      "Lola detectada intentando molestar 😑",
      "Ya basta de llevarme la contraria 😭",
      "Sabemos cual es la respuesta correcta ❤️",
    ];

    noButton.addEventListener("pointerenter", moveNoButton);
    noButton.addEventListener("touchstart", moveNoButton, { passive: true });
    noButton.addEventListener("focus", moveNoButton);

    noButton.addEventListener("click", (event) => {
      if (noAttempts < 5) {
        event.preventDefault();
        moveNoButton();
        return;
      }

      showNoError();
    });

    yesButton.addEventListener("click", showFinale);

    function moveNoButton() {
      noAttempts = Math.min(noAttempts + 1, 5);
      questionMessage.textContent = messages[noAttempts - 1];
      noButton.classList.add("is-running");

      const zoneRect = answerZone.getBoundingClientRect();
      const buttonRect = noButton.getBoundingClientRect();
      const maxLeft = Math.max(0, zoneRect.width - buttonRect.width);
      const maxTop = Math.max(0, zoneRect.height - buttonRect.height);
      const left = randomFloat(0, maxLeft);
      const top = randomFloat(0, maxTop);

      noButton.style.position = "absolute";
      noButton.style.left = `${left}px`;
      noButton.style.top = `${top}px`;

      if (noAttempts >= 3) {
        noButton.style.transitionDuration = "110ms";
      }

      if (noAttempts >= 4) {
        noButton.style.transform = "scale(0.68)";
        yesButton.style.transform = "scale(1.18)";
        yesButton.style.fontSize = "1.12rem";
      }

      if (noAttempts >= 5) {
        noButton.style.transform = "scale(0.28)";
        noButton.style.opacity = "0.36";
        yesButton.style.transform = "scale(1.55)";
        yesButton.style.fontSize = "1.35rem";
        yesButton.style.boxShadow = "0 26px 70px rgba(247, 168, 192, 0.62)";
      }
    }
  }

  function showNoError() {
    noError.classList.add("is-open");
    noError.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");

    window.setTimeout(() => {
      noError.classList.remove("is-open");
      noError.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
      resetNoButton();
    }, 4300);
  }

  function resetNoButton() {
    noAttempts = 0;
    questionMessage.textContent = "Elige con sabiduria, Cafecito.";
    noButton.removeAttribute("style");
    yesButton.removeAttribute("style");
    noButton.classList.remove("is-running");
  }

  function showFinale() {
    finale.classList.add("is-open");
    finale.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");

    const lines = [
      "Sabía que dirías que sí ❤️",
      "Gracias por estos 21 meses.",
      "Gracias por cada llamada.",
      "Gracias por cada abrazo.",
      "Gracias por cada momento.",
      "Gracias por quedarte.",
      "Te amo muchísimo, Cafecito ❤️<small>— Miguel</small>",
    ];

    finaleMessage.innerHTML = lines
      .map((line, index) => `<p style="animation-delay: ${index * 1150}ms">${line}</p>`)
      .join("");

    startFinalParticles();
  }

  function startFinalParticles() {
    const symbols = ["♡", "✦", "❀", "✿", "♥"];
    const colors = ["#ffd9e3", "#ffe3a3", "#ffffff", "#f7b7c8", "#d8c7ff"];

    for (let index = 0; index < 90; index += 1) {
      window.setTimeout(() => {
        if (!finale.classList.contains("is-open")) return;

        const particle = document.createElement("span");
        particle.className = "final-particle";
        particle.textContent = symbols[randomInt(0, symbols.length - 1)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.setProperty("--particle-color", colors[randomInt(0, colors.length - 1)]);
        particle.style.setProperty("--particle-size", `${randomFloat(16, 30)}px`);
        particle.style.setProperty("--particle-duration", `${randomFloat(5, 8)}s`);
        particle.style.setProperty("--particle-drift", `${randomFloat(-160, 160)}px`);
        particle.style.setProperty("--particle-spin", `${randomFloat(-160, 160)}deg`);
        finaleParticles.appendChild(particle);
        particle.addEventListener("animationend", () => particle.remove());
      }, index * 170);
    }
  }

  function setupFireworks() {
    if (!fireworksCanvas) return;

    const ctx = fireworksCanvas.getContext("2d");
    const particles = [];
    let width = 0;
    let height = 0;
    let lastLaunch = 0;

    function resize() {
      const rect = fireworksCanvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      fireworksCanvas.width = Math.floor(width * ratio);
      fireworksCanvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function launchFirework() {
      const x = randomFloat(width * 0.18, width * 0.82);
      const y = randomFloat(height * 0.18, height * 0.55);
      const colors = ["#ffd9e3", "#ffe3a3", "#ffffff", "#f7a8c0"];
      const amount = randomInt(34, 52);
      const baseColor = colors[randomInt(0, colors.length - 1)];

      for (let index = 0; index < amount; index += 1) {
        const angle = (Math.PI * 2 * index) / amount + randomFloat(-0.09, 0.09);
        const speed = randomFloat(1.2, 3.8);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: randomFloat(58, 88),
          age: 0,
          radius: randomFloat(1.2, 2.4),
          color: Math.random() > 0.24 ? baseColor : colors[randomInt(0, colors.length - 1)],
        });
      }
    }

    function draw(now) {
      if (!fireworksRunning) return;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(21, 20, 38, 0.18)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (now - lastLaunch > randomFloat(900, 1350)) {
        launchFirework();
        lastLaunch = now;
      }

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.age += 1;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.018;
        particle.vx *= 0.992;
        particle.vy *= 0.992;

        const alpha = Math.max(0, 1 - particle.age / particle.life);
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 5,
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.38, particle.color);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.globalAlpha = alpha;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 5, 0, Math.PI * 2);
        ctx.fill();

        if (particle.age >= particle.life) {
          particles.splice(index, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(draw);
    }

    const nightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || fireworksStarted) return;
          fireworksStarted = true;
          window.setTimeout(() => {
            resize();
            fireworksRunning = true;
            launchFirework();
            animationFrame = window.requestAnimationFrame(draw);
          }, 1700);
        });
      },
      { threshold: 0.4 },
    );

    nightObserver.observe(document.querySelector("#noche"));
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        fireworksRunning = false;
        window.cancelAnimationFrame(animationFrame);
      } else if (fireworksStarted) {
        resize();
        fireworksRunning = true;
        animationFrame = window.requestAnimationFrame(draw);
      }
    });
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  function makePlaceholderImage(caption) {
    const escapedCaption = caption
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#ffd9e3"/>
            <stop offset="0.55" stop-color="#d8c7ff"/>
            <stop offset="1" stop-color="#fff7e9"/>
          </linearGradient>
        </defs>
        <rect width="900" height="650" fill="url(#bg)"/>
        <circle cx="170" cy="120" r="82" fill="#fffdf8" opacity="0.5"/>
        <circle cx="760" cy="520" r="120" fill="#fffdf8" opacity="0.35"/>
        <text x="450" y="285" text-anchor="middle" font-family="Georgia, serif" font-size="82" fill="#7a3e54">♡</text>
        <text x="450" y="360" text-anchor="middle" font-family="Trebuchet MS, sans-serif" font-size="32" fill="#7a3e54">Foto pendiente</text>
        <text x="450" y="414" text-anchor="middle" font-family="Trebuchet MS, sans-serif" font-size="22" fill="#76525f">${escapedCaption}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
});
