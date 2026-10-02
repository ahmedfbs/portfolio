/* =========================================================
   YOUR CONTENT — edit these lists when you add files.
   Put photos in /images and videos in /videos.
   Anything whose file doesn't exist yet shows a soft placeholder.

   shape: "tall" | "square" | "wide"   (how the tile is cropped)
   ========================================================= */
const GALLERY = [
  { type: "photo", src: "images/photo-01.jpg", title: "Monochrome", tag: "Editorial", shape: "tall" },
  { type: "photo", src: "images/photo-02.jpg", title: "Golden Glow", tag: "Festive", shape: "square" },
  { type: "photo", src: "images/photo-03.jpg", title: "Scarlet", tag: "Saree", shape: "tall" },
  { type: "video", src: "videos/video-01.mp4", poster: "videos/video-01.jpg", title: "Hearts & Glasses", tag: "Cute", shape: "tall" },
  { type: "photo", src: "images/photo-04.jpg", title: "Bubbles", tag: "Candid", shape: "tall" },
  { type: "photo", src: "images/photo-05.jpg", title: "Love You This Much", tag: "Cute", shape: "tall" },
  { type: "photo", src: "images/photo-06.jpg", title: "Dusk", tag: "Evening", shape: "wide" },
  { type: "photo", src: "images/photo-07.jpg", title: "Afternoon Light", tag: "Saree", shape: "tall" },
  { type: "photo", src: "images/photo-08.jpg", title: "In Motion", tag: "Night", shape: "tall" },
  { type: "video", src: "videos/video-02.mp4", poster: "videos/video-02.jpg", title: "Little Flower", tag: "Candid", shape: "tall" },
  { type: "photo", src: "images/photo-09.jpg", title: "Best Friends", tag: "Candid", shape: "tall" },
  { type: "photo", src: "images/photo-10.jpg", title: "Sunshine", tag: "Garden", shape: "tall" },
  { type: "photo", src: "images/photo-11.jpg", title: "Stairway Muse", tag: "Saree", shape: "tall" },
  { type: "photo", src: "images/photo-12.jpg", title: "In Bloom", tag: "Formal", shape: "tall" },
  { type: "photo", src: "images/photo-13.jpg", title: "Fairy Lights", tag: "Editorial", shape: "square" },
  { type: "photo", src: "images/photo-14.jpg", title: "Street Style", tag: "Casual", shape: "tall" },
  { type: "video", src: "videos/video-03.mp4", poster: "videos/video-03.jpg", title: "Twirl", tag: "Fun", shape: "tall" },
  { type: "photo", src: "images/photo-15.jpg", title: "Teal Dreams", tag: "Eastern", shape: "tall" },
  { type: "photo", src: "images/photo-16.jpg", title: "Nerdy Cutie", tag: "Cute", shape: "tall" },
  { type: "photo", src: "images/photo-17.jpg", title: "City Lights", tag: "Night", shape: "tall" },
  { type: "photo", src: "images/photo-18.jpg", title: "Daydream", tag: "Moody", shape: "square" },
  { type: "photo", src: "images/photo-19.jpg", title: "Sunflowers", tag: "Candid", shape: "tall" },
  { type: "photo", src: "images/photo-20.jpg", title: "Golden Hour", tag: "Garden", shape: "tall" },
  { type: "photo", src: "images/photo-21.jpg", title: "Silhouette", tag: "Editorial", shape: "square" },
  { type: "photo", src: "images/photo-22.jpg", title: "Mehndi Night", tag: "Festive", shape: "square" },
  { type: "photo", src: "images/photo-23.jpg", title: "Festive", tag: "Eastern", shape: "tall" },
  { type: "photo", src: "images/photo-24.jpg", title: "Soft Smile", tag: "Portrait", shape: "tall" },
];

const REELS = [
  { src: "videos/reel-01.mp4", poster: "videos/reel-01.jpg", title: "Lady in Red" },
  { src: "videos/reel-02.mp4", poster: "videos/reel-02.jpg", title: "Golden Dupatta" },
  { src: "videos/reel-03.mp4", poster: "videos/reel-03.jpg", title: "Midnight Lace" },
  { src: "videos/reel-04.mp4", poster: "videos/reel-04.jpg", title: "Love of My Life" },
  { src: "videos/reel-05.mp4", poster: "videos/reel-05.jpg", title: "Sunshine Yellow" },
  { src: "videos/reel-06.mp4", poster: "videos/reel-06.jpg", title: "Garden Breeze" },
  { src: "videos/reel-07.mp4", poster: "videos/reel-07.jpg", title: "Olive Grace" },
  { src: "videos/reel-08.mp4", poster: "videos/reel-08.jpg", title: "Bows & Curls" },
];

/* =========================================================
   Below here you don't need to change anything.
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);

// Builds an <img>/<video> that removes itself if the file is missing,
// so the placeholder underneath shows instead of a broken icon.
function media(item, { controls = false } = {}) {
  let el;
  if (item.type === "video") {
    el = document.createElement("video");
    Object.assign(el, { src: item.src, muted: true, loop: true, playsInline: true, preload: "metadata" });
    if (item.poster) el.poster = item.poster;
    if (controls) { el.controls = true; el.muted = false; el.autoplay = true; }
  } else {
    el = document.createElement("img");
    Object.assign(el, { src: item.src, alt: item.title || "", loading: "lazy" });
  }
  el.addEventListener("error", () => el.remove());
  return el;
}

function hoverPlay(card) {
  card.addEventListener("mouseenter", () => { const v = $("video", card); if (v) v.play().catch(() => {}); });
  card.addEventListener("mouseleave", () => { const v = $("video", card); if (v) { v.pause(); v.currentTime = 0; } });
}

// ---------- Gallery ----------
const gallery = $("#gallery");
GALLERY.forEach((item, i) => {
  const tile = document.createElement("div");
  tile.className = `frame tile tile--${item.shape || "tall"} reveal`;
  tile.dataset.type = item.type;
  tile.dataset.label = `${item.type === "video" ? "Video" : "Photo"} ${String(i + 1).padStart(2, "0")}`;
  tile.appendChild(media(item));
  tile.insertAdjacentHTML("beforeend",
    `${item.type === "video" ? '<span class="tile__play">▶</span>' : ""}
     <div class="tile__info"><h3>${item.title}</h3><span>${item.tag || ""}</span></div>`);
  tile.addEventListener("click", () => openLightbox(visibleItems(), visibleItems().indexOf(item)));
  if (item.type === "video") hoverPlay(tile);
  gallery.appendChild(tile);
});

let currentFilter = "all";
const visibleItems = () => GALLERY.filter(it => currentFilter === "all" || it.type === currentFilter);

$("#filters").addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  currentFilter = btn.dataset.filter;
  document.querySelectorAll("#filters button").forEach(b => b.classList.toggle("is-active", b === btn));
  gallery.querySelectorAll(".tile").forEach(t => {
    t.classList.toggle("is-hidden", currentFilter !== "all" && t.dataset.type !== currentFilter);
  });
});

// ---------- Reels ----------
const reelsRow = $("#reelsRow");
const reelItems = REELS.map(r => ({ ...r, type: "video" }));
reelItems.forEach((item, i) => {
  const card = document.createElement("div");
  card.className = "frame reel reveal";
  card.dataset.label = "Your reel here";
  card.appendChild(media(item));
  card.insertAdjacentHTML("beforeend",
    `<span class="reel__num">${String(i + 1).padStart(2, "0")}</span>
     <span class="tile__play">▶</span>
     <div class="tile__info"><h3>${item.title}</h3></div>`);
  card.addEventListener("click", () => openLightbox(reelItems, i));
  hoverPlay(card);
  reelsRow.appendChild(card);
});

// ---------- Lightbox ----------
const lb = $("#lightbox"), stage = $("#lbStage"), caption = $("#lbCaption");
let lbList = [], lbIndex = 0;

function renderLightbox() {
  const item = lbList[lbIndex];
  stage.innerHTML = "";
  const holder = document.createElement("div");
  holder.className = "frame";
  holder.dataset.label = "Add your file to see it here";
  holder.appendChild(media(item, { controls: true }));
  stage.appendChild(holder);
  caption.textContent = item.title || "";
}
function openLightbox(list, index) {
  lbList = list; lbIndex = Math.max(0, index);
  renderLightbox();
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  stage.innerHTML = "";
}
const step = d => { lbIndex = (lbIndex + d + lbList.length) % lbList.length; renderLightbox(); };

$("#lbClose").addEventListener("click", closeLightbox);
$("#lbPrev").addEventListener("click", () => step(-1));
$("#lbNext").addEventListener("click", () => step(1));
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

// ---------- Nav ----------
const nav = $("#nav"), burger = $("#burger"), links = $("#navLinks");
addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 40), { passive: true });
burger.addEventListener("click", () => {
  burger.classList.toggle("is-open");
  links.classList.toggle("is-open");
});
links.addEventListener("click", e => {
  if (e.target.tagName === "A") { burger.classList.remove("is-open"); links.classList.remove("is-open"); }
});

// ---------- Static-image fallbacks (hero / about) ----------
document.querySelectorAll(".frame > img").forEach(img => {
  img.addEventListener("error", () => img.remove());
  if (img.complete && img.naturalWidth === 0) img.remove();
});

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

$("#year").textContent = new Date().getFullYear();

// ---------- Touch screens: autoplay videos (muted) while they're on screen ----------
if (matchMedia("(hover: none)").matches) {
  const vio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      const v = en.target;
      if (en.isIntersecting) v.play().catch(() => {}); else v.pause();
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".tile video, .reel video").forEach(v => vio.observe(v));
}
