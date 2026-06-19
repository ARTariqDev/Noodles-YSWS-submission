gsap.registerPlugin(ScrollTrigger);

const FunFacts = [
  "A hen's egg takes about 25 hours to form, start to finish.",
  "Chicks use an 'egg tooth' to peck their way out — it falls off a few days after hatching.",
  "Chickens can recognize over 100 different faces, including human ones.",
  "A hen's first moult usually means she stops laying eggs for a while.",
  "Chickens dream, and they have something close to REM sleep.",
  "A chicken's average lifespan is 5-10 years, but most farmed chickens live only 6-8 weeks.",
  "The chicken is the closest living relative to the T-Rex, genetically speaking.",
];

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("progress");
const bg = document.getElementById("bg");
const mascot = document.getElementById("mascot");
const mascotBubble = document.getElementById("mascot-bubble");

let current = 0;
let animating = false;
let wrapping = false;

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = i === 0 ? "dot active" : "dot";
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll(".dot");

const track = document.querySelector(".scroll-track");
const SCROLL_PER_SLIDE = window.innerHeight * 2.5;
track.style.height = `${slides.length * SCROLL_PER_SLIDE}px`;

function showMascot(slideIndex) {
  const fact = FunFacts[slideIndex % FunFacts.length];
  mascotBubble.textContent = fact;

  gsap.killTweensOf(mascot);
  gsap.fromTo(
    mascot,
    { x: 120, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
  );
}

function hideMascot() {
  gsap.killTweensOf(mascot);
  gsap.to(mascot, { x: 120, opacity: 0, duration: 0.4, ease: "power2.in" });
}

function goTo(index) {
  index = ((index % slides.length) + slides.length) % slides.length; // wrap around with mod logic/circular queue stuff ig
  if (index === current || animating) return;
  animating = true;

  const old = slides[current];
  const New = slides[index];

  dots[current].classList.remove("active");
  dots[index].classList.add("active");

  New.classList.add('active');
  showMascot(index);

  gsap.timeline({
    onComplete: () => {
      old.classList.remove("active");
      animating = false;
      gsap.delayedCall(1.4, hideMascot);
    },
  })
    .to(old, { opacity: 0, duration: 0.3 }, 0)
    .to(bg, { backgroundColor: New.dataset.bg || "#fff8f0", duration: 0.6, ease: "power1.inOut" }, 0.15)
    .fromTo(New, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.2);

  current = index;
}

let st;

st = ScrollTrigger.create({
  trigger: track,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    if (wrapping) return;

    const index = Math.min(Math.floor(self.progress * slides.length), slides.length - 1);
    goTo(index);

    if (self.progress >= 0.98) {
      wrapTo(1);
    } else if (self.progress <= 0.02 && self.direction === -1) {
      wrapTo(document.body.scrollHeight - window.innerHeight - 1);
    }
  },
});

function wrapTo(scrollY) {
  wrapping = true;
  st.disable(false);
  window.scrollTo(0, scrollY);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    st.enable();
    wrapping = false;
  });
}