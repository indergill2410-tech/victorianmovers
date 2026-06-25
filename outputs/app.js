const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const quoteForm = document.querySelector("[data-quote-form]");
const quoteResult = document.querySelector("[data-quote-result]");
const areaButtons = document.querySelectorAll("[data-area]");
const areaCard = document.querySelector("[data-area-card]");
const reviewText = document.querySelector("[data-review-text]");
const reviewCredit = document.querySelector("[data-review-credit]");
const reviewPrev = document.querySelector("[data-review-prev]");
const reviewNext = document.querySelector("[data-review-next]");

const areaPlans = {
  Melbourne: "Same-day surveys, apartment access planning and settlement-day support.",
  Geelong: "Coastal and bayside relocations with regional scheduling and larger truck planning.",
  Ballarat: "Heritage-home care, long driveway access checks and weather-aware timing.",
  Bendigo: "Regional Victoria moves with staged loading for larger family homes.",
  Mornington: "Peninsula homes, storage transitions and careful high-value furniture handling.",
  Gippsland: "Long-distance Victorian relocations with inventory-led loading and delivery windows."
};

const reviews = [
  {
    text: "The crew treated our old terrace like a gallery. They protected the floors, moved the piano without drama and had us in before dinner.",
    credit: "Amelia, Carlton North"
  },
  {
    text: "It felt organised from the first call. Every carton was labelled, the truck arrived early and the team made a stressful settlement day feel simple.",
    credit: "Ravi, Glen Iris"
  },
  {
    text: "We moved from Melbourne to Bendigo with storage in between. The communication was sharp, calm and exactly what we needed.",
    credit: "Sophie, Bendigo"
  }
];

let reviewIndex = 0;

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 18);
};

const closeNav = () => {
  nav?.classList.remove("open");
  document.body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open");
  document.body.classList.toggle("nav-open", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const size = String(data.get("size"));
  const support = String(data.get("support"));
  const crew = size.includes("4") ? "4 movers + 10 tonne truck" : size.includes("1") ? "2 movers + 4.5 tonne truck" : "3 movers + 8 tonne truck";
  const addOn = support === "Move only" ? "standard protection" : support.toLowerCase();
  const from = String(data.get("from")).trim();
  const to = String(data.get("to")).trim();

  if (quoteResult) {
    quoteResult.innerHTML = `
      <span class="result-label">Recommended plan</span>
      <strong>${crew}</strong>
      <p>${from || "Your home"} to ${to || "your new address"} with ${addOn}, labelled loading and a move manager check-in.</p>
    `;
  }
});

areaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const area = button.dataset.area || "Melbourne";
    areaButtons.forEach((item) => item.classList.toggle("active", item === button));
    if (areaCard) {
      areaCard.innerHTML = `
        <span>Live plan</span>
        <strong>${area}</strong>
        <p>${areaPlans[area]}</p>
      `;
    }
  });
});

const showReview = (direction) => {
  reviewIndex = (reviewIndex + direction + reviews.length) % reviews.length;
  const review = reviews[reviewIndex];
  if (reviewText) reviewText.textContent = `“${review.text}”`;
  if (reviewCredit) reviewCredit.textContent = review.credit;
};

reviewPrev?.addEventListener("click", () => showReview(-1));
reviewNext?.addEventListener("click", () => showReview(1));
