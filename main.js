// 你只需要在这里“填内容”：直接用照片，不用导出 Pixso 大图
const memories = [
  {
    type: "cover",
    image: "assets/cover.png",
    title: "这一年，我们一起走过",
    subtitle: "向上滑动继续",
    chips: ["2025", "我们的回忆"]
  },
  {
    type: "memory",
    image: "assets/trip1.png",
    title: "第一次旅行",
    meta: "2025-05-02 · 杭州",
    desc: "那天的风很温柔，你笑得特别好看。",
    chips: ["旅行", "纪念日"]
  },
  {
    type: "memory",
    image: "assets/food.png",
    title: "最爱的一顿饭",
    meta: "2025-08-18 · 某家小店",
    desc: "我们说好下次还要来。",
    chips: ["美食", "日常"]
  },
  {
    type: "stats",
    image: "assets/cover.png",
    title: "年度小统计",
    stats: [
      { label: "一起见面", value: "52 次" },
      { label: "一起旅行", value: "3 次" },
      { label: "去过城市", value: "6 个" },
      { label: "最甜的月份", value: "10 月" },
    ]
  },
  {
    type: "end",
    image: "assets/cover.jpg",
    title: "谢谢你",
    subtitle: "下一年也请多多指教",
    chips: ["❤️"]
  },
  {
  type: "collage",
  title: "我们的江南小旅行",
  meta: "2025-05 · 杭州 & 苏州",
  desc: "西湖的风、平江路的灯、还有你在我身边的那种安心。",
  photos: [
    { src: "assets/cover.jpg", tag: "杭州" },
    { src: "assets/cover.jpg", tag: "苏州" }
  ],
  chips: ["旅行", "江南", "甜度超标"]
 }
];

const story = document.getElementById("story");
const dotsEl = document.getElementById("dots");

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}

function renderPage(item) {
  // collage：多图布局页
  if (item.type === "collage") {
    const page = el("div", "page plain");

    const layout = el("div", "layout");

    const header = el("div", "header");
    header.appendChild(el("h2", "", item.title || ""));
    if (item.meta) header.appendChild(el("div", "meta", item.meta));
    layout.appendChild(header);

    const gallery = el("div", "gallery" + (item.photos?.length === 3 ? " three" : ""));
    (item.photos || []).forEach(ph => {
      const box = el("div", "photo");
      const img = document.createElement("img");
      img.src = ph.src;
      img.alt = ph.tag || "photo";
      box.appendChild(img);
      if (ph.tag) box.appendChild(el("div", "tag", ph.tag));
      gallery.appendChild(box);
    });
    layout.appendChild(gallery);

    const card = el("div", "card");
    if (item.desc) card.appendChild(el("div", "desc", item.desc));
    if (item.chips?.length) {
      const chips = el("div", "chips");
      item.chips.forEach(t => chips.appendChild(el("span", "chip", t)));
      card.appendChild(chips);
    }
    layout.appendChild(card);

    page.appendChild(layout);
    return page;
  }

  // 其他页面：原来的背景图版
  const page = el("div", "page");
  if (item.image) page.style.backgroundImage = `url("${item.image}")`;

  const content = el("div", "content");
  const card = el("div", "card");

  const title = el("h1", "title", item.title || "");
  card.appendChild(title);

  if (item.meta) card.appendChild(el("div", "meta", item.meta));
  if (item.desc) card.appendChild(el("div", "desc", item.desc));
  if (item.subtitle) card.appendChild(el("div", "desc", item.subtitle));

  if (item.chips?.length) {
    const chips = el("div", "chips");
    item.chips.forEach(t => chips.appendChild(el("span", "chip", t)));
    card.appendChild(chips);
  }

  if (item.type === "stats" && item.stats?.length) {
    const statsWrap = el("div", "stats");
    item.stats.forEach(s => {
      const row = el("div", "stat");
      row.appendChild(el("span", "", s.label));
      row.appendChild(el("b", "", s.value));
      statsWrap.appendChild(row);
    });
    card.appendChild(statsWrap);
  }

  content.appendChild(card);
  page.appendChild(content);
  return page;
}

// 渲染所有页面
const pages = memories.map(renderPage);
pages.forEach(p => story.appendChild(p));

// 进度圆点
const dots = pages.map((_, i) => {
  const d = el("div", "dot" + (i === 0 ? " active" : ""));
  d.addEventListener("click", () => story.scrollTo({ top: i * story.clientHeight, behavior: "smooth" }));
  dotsEl.appendChild(d);
  return d;
});

function updateActiveDot() {
  const i = Math.round(story.scrollTop / story.clientHeight);
  dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
}
story.addEventListener("scroll", () => requestAnimationFrame(updateActiveDot));

// 音乐：需要用户点击触发
const start = document.getElementById("start");
const startBtn = document.getElementById("startBtn");
const bgm = document.getElementById("bgm");

startBtn.addEventListener("click", async () => {
  try { await bgm.play(); } catch (e) { console.log("Audio blocked:", e); }
  start.style.display = "none";
});
start.addEventListener("click", (e) => { if (e.target === start) startBtn.click(); });