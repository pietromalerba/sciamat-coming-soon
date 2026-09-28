const translations = {
  en: {
    navCraft: "Craft", navContact: "Contact", discover: "Discover",
    craftEyebrow: "Made in Puglia · Made by hand", craftTitle: "How we make",
    craftBody: "<p>Our work is a true production line of hands. Every garment passes through expert artisans, following the most authentic tailoring tradition and a precise process that is uniquely our own.</p><p>Each Sciamat bespoke suit reveals the quality of its craftsmanship. Excellence is chosen at every stage, with care, research and the harmony that only an experienced team can achieve.</p>",
    explore: "Explore the process",
    vibeTitle: "A contemporary sartorial rhythm.",
    vibeBody: "<p>VIBE moves between emotion, reason and character. Born from the distinctive Sciamat style, it brings the sartorial world into the present through new volumes, exceptional fabrics and the personality of a modern gentleman.</p><p>Coats, double-breasted and single-breasted suits, waistcoats and high-waisted trousers find their own rhythm in exclusive patterns created for Sciamat.</p>",
    ladyTitle: "Femininity, tailored without compromise.",
    ladyBody: "<p>Lady Sciamat rediscovers an authentic nature and defines a magnetic look, combining classical tailoring with distinctly feminine detail.</p><p>Pinstripes, embossed fabrics, coloured scarves, high-waisted trousers and generous skirts create an individual wardrobe, rich in proportion and personality.</p>",
    contactEyebrow: "Private appointments", contactTitle: "Begin a conversation.", backTop: "Back to top ↑"
  },
  it: {
    navCraft: "Sartoria", navContact: "Contatti", discover: "Scopri",
    craftEyebrow: "Fatto in Puglia · Fatto a mano", craftTitle: "Come lavoriamo",
    craftBody: "<p>Il nostro lavoro è una vera filiera di mani. Ogni capo passa attraverso artigiani esperti, seguendo la più autentica tradizione sartoriale e un processo preciso, unicamente nostro.</p><p>Ogni abito su misura Sciamat rivela la qualità della sua manifattura. Scegliamo l’eccellenza in ogni fase, con cura, ricerca e l’armonia che soltanto una squadra esperta può raggiungere.</p>",
    explore: "Scopri il processo",
    vibeTitle: "Un ritmo sartoriale contemporaneo.",
    vibeBody: "<p>VIBE si muove tra emozione, ragione e carattere. Nasce dallo stile inconfondibile di Sciamat e porta la sartoria nel presente attraverso nuovi volumi, tessuti eccezionali e la personalità del gentiluomo contemporaneo.</p><p>Cappotti, abiti doppiopetto e monopetto, gilet e pantaloni a vita alta trovano il proprio ritmo in fantasie esclusive create per Sciamat.</p>",
    ladyTitle: "Femminilità, senza compromessi sartoriali.",
    ladyBody: "<p>Lady Sciamat riscopre una natura autentica e definisce un’immagine magnetica, unendo la sartoria classica a dettagli spiccatamente femminili.</p><p>Gessati, tessuti a rilievo, foulard colorati, pantaloni a vita alta e gonne ampie compongono un guardaroba personale, ricco di proporzioni e carattere.</p>",
    contactEyebrow: "Appuntamenti privati", contactTitle: "Iniziamo una conversazione.", backTop: "Torna su ↑"
  }
};

const languageButtons = document.querySelectorAll("[data-language]");
let language = "en";

function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = translations[language][node.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = translations[language][node.dataset.i18nHtml];
  });
  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  document.title = language === "en" ? "Sciamat — Bespoke tailoring, made by hand" : "Sciamat — Sartoria su misura, fatta a mano";
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});
document.querySelector("[data-year]").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

let previousY = window.scrollY;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");

function setMenu(open) {
  header.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
}

menuToggle.addEventListener("click", () => setMenu(!header.classList.contains("menu-open")));
document.querySelectorAll("#site-nav a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header.classList.contains("menu-open")) setMenu(false);
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (header.classList.contains("menu-open")) return;
  header.classList.toggle("hidden", y > previousY && y > 180);
  previousY = y;
}, { passive: true });
