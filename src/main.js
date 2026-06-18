gsap.registerPlugin(ScrollTrigger);

const texts = [
  "The Life and Death of a Chicken",
  "To lay a clutch of fertilized eggs, a hen must have first mated with a rooster. The hen will then form an egg- a process which takes all of approximately 25 hours. This process will begin with the formation of the egg yolk, it is produced by the hens ovary during the ovulation process- the yolk is referred to as the oocyte at this stage. As it travels down the oviduct, it will be fertilized internally by the sperm of the rooster.As it continues to travel down the oviduct it becomes covered with a white membrane called ‘vitelline membrane’, as well as some layers of the egg white or ‘albumen’. Still travelling further down the oviduct, a casing for the egg white and yolk will begin to form. Eventually, the shell will be completely developed, and thus the egg is completely formed! The hen will then lay this new life form in a comfortable and quiet spot. A hen will generally lay a clutch of approximately 12 eggs, with each egg being laid a day apart.",
  "Every strand holds a story worth slurping.",];

const bgs = ["#fff8f0", "#fff0e0", "#fef3e8"]; //bg colors for each img incase i need it

texts.forEach((t, i) => {
  document.getElementById(`desc-${i}`).textContent = t;
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const bg = document.getElementById("bg");

let current = 0;
let animating = false;

function goTo(next) {
  if (next === current || animating) return;
  animating = true;

  const from = slides[current];
  const to = slides[next];

  bg.style.background = bgs[next];
  dots[current].classList.remove("active");
  dots[next].classList.add("active");

  gsap.set(to, { opacity: 0 });
  gsap.set(to.querySelector("img"), { scale: 0.94, y: 16 });
  gsap.set(to.querySelector("p"), { opacity: 0, y: 18 });
  to.classList.add("active");

  gsap.timeline({
    onComplete: () => {
      from.classList.remove("active");
      gsap.set(from, { opacity: 0 });
      gsap.set(from.querySelector("img"), { scale: 1, y: 0 });
      gsap.set(from.querySelector("p"), { opacity: 1, y: 0 });
      animating = false;
    },
  })
  .to(from.querySelector("img"), { scale: 1.06, y: -10, duration: 0.45, ease: "power2.in" }, 0)
  .to(from.querySelector("p"),   { opacity: 0, y: -14, duration: 0.3 }, 0)
  .to(from,                      { opacity: 0, duration: 0.4 }, 0.15)
  .to(to,                        { opacity: 1, duration: 0.45, ease: "power2.out" }, 0.35)
  .to(to.querySelector("img"),   { scale: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.4)
  .to(to.querySelector("p"),     { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.6);

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