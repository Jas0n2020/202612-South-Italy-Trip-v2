const DEC31_JAN03_TIP_CONTENTS = {
  "sorrento-chiostro": {
    title: "Villa Comunale / Chiostro di San Francesco TIPS",
    content: `
      <p><strong>Chiostro di San Francesco</strong> 是索伦托市中心的 <strong>圣方济各修道院回廊</strong>，就在 <strong>Villa Comunale 海景露台</strong>旁边，离 Piazza Tasso 步行大概几分钟。</p>
      <p>它不是大型博物馆，更像一个安静的小型历史建筑/庭院：</p>
      <ul>
        <li>建筑主体是中世纪修道院回廊，常见说法是 14 世纪左右形成。</li>
        <li>有拱廊、石柱、绿植和一个很安静的小庭院。</li>
        <li>很适合顺路进去看 10-15 分钟，拍几张建筑、人像、婚礼感照片。</li>
        <li>它旁边就是看海湾日落的 Villa Comunale，所以动线很顺。</li>
      </ul>
      <p>门票方面：一般 <strong>免费进入</strong>，但如果里面有展览、婚礼、音乐会或私人活动，可能会临时关闭或局部限制。建议当作 “顺路经过，有开就进去看一下” 的轻量点，不要当成必须打卡的大景点。</p>
    `
  },
  "sorrento-nye": {
    title: "Piazza Tasso 跨年 TIPS",
    content: `
      <p>跨年氛围：午夜 00:00 索伦托的主广场 Piazza Tasso 通常会有灯光秀和烟花迎新，入住民宿后可以步行去广场感受热闹氛围。</p>
    `
  },
  "capri-winter": {
    title: "Capri 冬季一日游 TIPS",
    content: `
      <p>冬季船班少，建议前一晚确认当天 Sorrento-Capri 往返船班和海况。</p>
      <p>Villa San Michele 圣米歇尔别墅要放前面，因为 1月开放时间通常是 09:00-15:30，而且 1月周二关闭；这天是周六，理论上没问题。</p>
      <p>Gardens of Augustus 奥古斯都花园 1月开放通常到 16:30，这里可以看 Faraglioni 海蚀柱和 Via Krupp，是 Capri 最经典机位之一。</p>
      <p>Monte Solaro 索拉罗山缆椅不作为固定行程：1月/2月常因冬季维护关闭，出发当天确认开放后再决定。</p>
      <p>实际返程时间以当天船班为准，冬天千万不要卡最后一班。</p>
    `
  }
};

document.addEventListener("click", (event) => {
  const button = event.target.closest(".tip-btn");
  if (!button) return;
  const data = DEC31_JAN03_TIP_CONTENTS[button.dataset.tipKey];
  if (!data) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");
  const modal = document.getElementById("commonModal");
  if (!title || !body || !modal) return;
  title.innerText = data.title;
  body.innerHTML = data.content;
  modal.style.display = "flex";
}, true);
