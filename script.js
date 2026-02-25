document.getElementById("year").textContent = new Date().getFullYear();

/* ── console easter egg ──────────────────────────────── */
console.log(
  "%c💋 made by Osaym.com",
  "font-size:14px; font-family:'Nunito',sans-serif; color:#e8359a; font-weight:800; background:#fff0f8; padding:6px 12px; border-radius:999px; border:1.5px solid #ffc2e6;"
);

/* ── contact modal ────────────────────────────────────────────────────── */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbws-t6z3mHsmEZGcLorLWW-H5s9oyg83eVttDm_PaW1NvooWLomt3ycLD5qJJQeFE6p/exec";

const backdrop  = document.getElementById("modalBackdrop");
const form      = document.getElementById("contactForm");
const submitBtn = form.querySelector(".btn--submit");
const toast     = document.getElementById("toast");
let toastTimer  = null;

function openModal() {
  backdrop.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    backdrop.classList.add("is-visible");
    document.body.style.overflow = "hidden";
    backdrop.querySelector("input, textarea").focus();
  }));
}

function closeModal() {
  backdrop.classList.remove("is-visible");
  backdrop.addEventListener("transitionend", () => {
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }, { once: true });
}

function showToast(msg, isError = false) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.style.background = isError
    ? "linear-gradient(135deg, #e05, #f47)"
    : "linear-gradient(135deg, #f24fb0, #ff8fd0)";
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

document.getElementById("openContact").addEventListener("click", openModal);
document.getElementById("closeContact").addEventListener("click", closeModal);

// close on backdrop click
backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });

// close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !backdrop.hidden) closeModal();
});

const SEND_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  submitBtn.disabled = true;
  submitBtn.innerHTML = "sending… 🌸";

  try {
    const payload = {
      name:    form.fname.value.trim(),
      email:   form.femail.value.trim(),
      subject: form.fsubject.value.trim(),
      message: form.fmessage.value.trim(),
    };
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });
    form.reset();
    closeModal();
    burstConfetti();
    showToast("message sent! 💕");
  } catch {
    showToast("oops, something went wrong 🥺", true);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `${SEND_SVG} Send Message`;
  }
});

const maxSparkles = 26;
let sparkleCount = 0;
const SPARKLE_EMOJIS = ["🩷", "✨", "🌸", "💕", "💗", "🧸"];

function spawnSparkle(x, y) {
  if (sparkleCount > maxSparkles) return;
  sparkleCount += 1;
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = SPARKLE_EMOJIS[Math.floor(Math.random() * SPARKLE_EMOJIS.length)];
  sparkle.style.left = `${x + (Math.random() * 16 - 8)}px`;
  sparkle.style.top  = `${y + (Math.random() * 16 - 8)}px`;
  document.body.appendChild(sparkle);
  window.setTimeout(() => {
    sparkle.remove();
    sparkleCount = Math.max(0, sparkleCount - 1);
  }, 750);
}

let lastTick = 0;
window.addEventListener("pointermove", (event) => {
  const now = performance.now();
  if (now - lastTick < 45) return;
  lastTick = now;
  spawnSparkle(event.clientX, event.clientY);
});

/* ── right-click heart burst ─────────────────────────────────────────── */
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const emojis = ["💕", "💗", "🩷", "💖", "🌸", "✨", "🧸"];
  const count = 14;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti-piece";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = (i / count) * 360 + Math.random() * 20;
    const dist  = 45 + Math.random() * 80;
    const rad   = (angle * Math.PI) / 180;
    el.style.left = `${e.clientX}px`;
    el.style.top  = `${e.clientY}px`;
    el.style.setProperty("--dx", `${Math.cos(rad) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(rad) * dist}px`);
    el.style.setProperty("--rot", `${Math.random() * 360}deg`);
    el.style.animationDelay = `${i * 12}ms`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200 + i * 12);
  }
});
const CONFETTI_EMOJIS = ["💕", "🌸", "🩷", "💗", "✨", "💖"];

function burstConfetti() {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const count = 22;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti-piece";
    el.textContent = CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)];
    const angle = (i / count) * 360 + Math.random() * 15;
    const dist  = 80 + Math.random() * 130;
    const rad   = (angle * Math.PI) / 180;
    el.style.left = `${cx}px`;
    el.style.top  = `${cy}px`;
    el.style.setProperty("--dx", `${Math.cos(rad) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(rad) * dist}px`);
    el.style.setProperty("--rot", `${Math.random() * 360}deg`);
    el.style.animationDelay = `${i * 18}ms`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300 + i * 18);
  }
}
