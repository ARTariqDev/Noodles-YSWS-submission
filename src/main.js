gsap.registerPlugin(ScrollTrigger);

const slides = document.querySelectorAll(".slide");
const progressContainer = document.getElementById("progress");
const bg = document.getElementById("bg");

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = i === 0 ? "dot active" : "dot";
  progressContainer.appendChild(dot);
});

const dots = progressContainer.querySelectorAll(".dot");

let current = 0;
let animating = false;

// scroll track height scales with number of slides
document.querySelector(".scroll-track").style.height = `${slides.length * 100}vh`;

function goTo(next) {
  if (next === current || animating || next < 0 || next >= slides.length) return;
  animating = true;

  const from = slides[current];
  const to = slides[next];

  bg.style.background = to.dataset.bg || "#fff8f0";
  dots[current].classList.remove("active");
  dots[next].classList.add("active");

  const toInner = to.querySelector(".slide-inner");
  const toImg = to.querySelector(".slide-img");
  const toText = to.querySelector(".slide-text");

  gsap.set(to, { opacity: 0 });
  gsap.set(toInner, { y: 24 });
  gsap.set(toImg, { scale: 0.94 });
  gsap.set(toText, { opacity: 0, y: 14 });
  to.classList.add("active");

  toInner.scrollTop = 0;

  gsap.timeline({
    onComplete: () => {
      from.classList.remove("active");
      gsap.set(from, { opacity: 0 });
      gsap.set(from.querySelector(".slide-inner"), { y: 0 });
      gsap.set(from.querySelector(".slide-img"), { scale: 1 });
      gsap.set(from.querySelector(".slide-text"), { opacity: 1, y: 0 });
      animating = false;
    },
  })
  .to(from.querySelector(".slide-img"),  { scale: 1.06, duration: 0.4, ease: "power2.in" }, 0)
  .to(from.querySelector(".slide-text"), { opacity: 0, y: -12, duration: 0.3 }, 0)
  .to(from,                              { opacity: 0, duration: 0.35 }, 0.1)
  .to(to,                                { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.3)
  .to(toInner,                           { y: 0, duration: 0.5, ease: "power2.out" }, 0.35)
  .to(toImg,                             { scale: 1, duration: 0.5, ease: "power2.out" }, 0.35)
  .to(toText,                            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55);

  current = next;
}

ScrollTrigger.create({
  trigger: ".scroll-track",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const idx = Math.min(Math.floor(self.progress * slides.length), slides.length - 1);
    goTo(idx);
  },
});