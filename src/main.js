gsap.registerPlugin(ScrollTrigger);

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("progress");
const bg = document.getElementById("bg");
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = i === 0 ? "dot active" : "dot";
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll(".dot");

const track = document.querySelector(".scroll-track");
const slideHeight = window.innerHeight;
track.style.height = `${slides.length * slideHeight}px`;

function goTo(next) {
  next = ((next % slides.length) + slides.length) % slides.length;
  if (next === current) return;

  const oldSlide = slides[current];
  const newSlide = slides[next];

  bg.style.background = newSlide.dataset.bg || "#fff8f0";
  dots[current].classList.remove("active");
  dots[next].classList.add("active");

  newSlide.classList.add("active");

  gsap.timeline({ onComplete: () => oldSlide.classList.remove("active") })
    .to(oldSlide, { opacity: 0, duration: 0.3 }, 0)
    .fromTo(newSlide, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.2);

  current = next;
}

ScrollTrigger.create({
  trigger: track,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const index = Math.min(Math.floor(self.progress * slides.length), slides.length - 1);
    goTo(index);

    if (self.progress >= 0.98) {
      gsap.delayedCall(0.05, () => window.scrollTo(0, 1));
    } else if (self.progress <= 0.02 && self.direction === -1) {
      gsap.delayedCall(0.05, () => window.scrollTo(0, document.scrollHeight - window.innerHeight - 1));
    }
  },
});