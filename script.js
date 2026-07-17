function openLink(url) {
  window.open(url, "_blank");
}

function openIframe(url) {
  const overlay = document.getElementById("iframe-overlay");
  const frame = document.getElementById("iframe-frame");
  frame.src = url;
  overlay.classList.add("active");
}

function closeIframe() {
  const overlay = document.getElementById("iframe-overlay");
  const frame = document.getElementById("iframe-frame");
  overlay.classList.remove("active");
  frame.src = ""; 
}

window.onload = () => {
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");

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
      drift: Math.random() * 0.5 - 0.25,
    });
  }

  function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();

    snowflakes.forEach((flake) => {
      ctx.moveTo(flake.x + flake.radius, flake.y);
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    });

    ctx.fill();
    updateSnow();
  }

  function updateSnow() {
    snowflakes.forEach((flake) => {
      flake.y += flake.speed;
      flake.x += flake.drift;

      if (flake.y > canvas.height) {
        flake.y = 0;
        flake.x = Math.random() * canvas.width;
      }
    });
  }

  setInterval(drawSnow, 20);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const clickSound = document.getElementById("click-sound");
  const hoverSound = document.getElementById("hover-sound");

  document.querySelectorAll("button, a").forEach((el) => {
    el.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    });

    el.addEventListener("mouseenter", () => {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {});
    });
  });

  const logo = document.querySelector(".logo");

  logo.addEventListener("click", () => {
    logo.classList.remove("spin");
    void logo.offsetWidth;
    logo.classList.add("spin");
  });

  logo.addEventListener("animationend", () => {
    logo.classList.remove("spin");
  });
};
