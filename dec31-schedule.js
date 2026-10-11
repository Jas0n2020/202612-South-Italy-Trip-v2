(() => {
  const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const link = (label, query) => `<a href="${maps(query)}" target="_blank" rel="noopener">${label}</a>`;
  const red = (text) => `<small style="color: #b84635; font-weight: 800;">${text}</small>`;

  const schedule = [
    { time: "09:00", text: `早餐 + 打卡<br><span class='schedule-label'>${link("Piazza del Plebiscito (公民投票广场)", "Piazza del Plebiscito, Napoli, Italy")}</span> <button class='tip-btn' data-tip-key='plebiscito'>TIPS</button>`, type: "spot" },
    { time: "09:30", text: `<span class='schedule-label'>${link("Basilica di San Francesco di Paola (保罗圣方济各圣殿 / 那不勒斯版万神殿)", "Basilica di San Francesco di Paola, Piazza del Plebiscito, Napoli, Italy")}</span> <button class='tip-btn' data-tip-key='san-francesco-paola'>TIPS</button>`, type: "spot" },
    { time: "10:00", text: "退房", type: "transport" },
    { time: "11:00", text: `那不勒斯火车站 ${link("Europcar Mobility 租车行取车", "Europcar Mobility, V73F+QF Naples, Metropolitan City of Naples, Italy")}`, type: "transport" },
    { time: "12:00", text: "自驾 1.5 hr：那不勒斯 - 索伦托", type: "transport" },
    { time: "13:30", text: `入住 ${link("索伦托民宿", "40.626750, 14.383611")}`, type: "transport" },
    { time: "15:30", text: `<span class='schedule-label'>15:30 - 16:30 ${link("Villa Comunale", "Villa Comunale, Sorrento, Italy")} / ${link("Chiostro di San Francesco", "Chiostro di San Francesco, Via San Francesco, Sorrento, Italy")} 看海景和日落</span> <button class='tip-btn' data-tip-key='sorrento-chiostro'>TIPS</button>`, type: "spot" },
    { time: "17:00", text: `老城散步：${link("Piazza Tasso", "Piazza Tasso, Sorrento, Italy")}、${link("Corso Italia", "Corso Italia, Sorrento, Italy")}、${link("Via San Cesareo", "Via San Cesareo, Sorrento, Italy")}`, type: "spot" },
    { time: "19:00", text: `吃跨年晚餐 Cenone di Capodanno<br>${red("选择 & 预约餐厅")}` },
    { time: "22:30", text: `22:30 - 23:00 慢慢走回 ${link("Piazza Tasso", "Piazza Tasso, Sorrento, Italy")}`, type: "transport" },
    { time: "00:00", text: `<span class='schedule-label'>${link("Piazza Tasso", "Piazza Tasso, Sorrento, Italy")} / ${link("Marina Piccola", "Marina Piccola, Sorrento, Italy")} 方向看跨年烟花和活动</span> <button class='tip-btn' data-tip-key='sorrento-nye'>TIPS</button>`, type: "spot" }
  ];

  function applyDec31Schedule() {
    const data = window.TRAVEL_PLAN_DATA;
    if (!data?.days) return false;
    const day = data.days.find((item) => item.date === "2026-12-31" || item.day === 8);
    if (!day) return false;
    day.title = "那不勒斯早餐打卡 - 前往索伦托跨年";
    day.schedule = schedule;
    day.notes = day.notes || [];
    if (!day.notes.includes("租车单号：1207333082")) day.notes.push("租车单号：1207333082");
    if (typeof renderTimeline === "function") renderTimeline();
    return true;
  }

  if (applyDec31Schedule()) return;
  document.addEventListener("travel-data-ready", () => setTimeout(applyDec31Schedule, 0), { once: true });
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (applyDec31Schedule() || attempts > 30) clearInterval(timer);
  }, 200);
})();
