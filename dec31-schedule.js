(() => {
  const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const link = (label, query) => `<a href="${maps(query)}" target="_blank" rel="noopener">${label}</a>`;

  const morning = [
    { time: "09:00", text: `早餐 + 打卡<br><span class='schedule-label'>${link("Piazza del Plebiscito (公民投票广场)", "Piazza del Plebiscito, Napoli, Italy")}</span> <button class='tip-btn' data-tip-key='plebiscito'>TIPS</button>`, type: "spot" },
    { time: "09:30", text: `<span class='schedule-label'>${link("Basilica di San Francesco di Paola (保罗圣方济各圣殿 / 那不勒斯版万神殿)", "Basilica di San Francesco di Paola, Piazza del Plebiscito, Napoli, Italy")}</span> <button class='tip-btn' data-tip-key='san-francesco-paola'>TIPS</button>`, type: "spot" },
    { time: "10:00", text: "退房", type: "transport" },
    { time: "11:00", text: "到租车行取车 [Naples Railway Station, Corso Meridionale, 60]", type: "transport" }
  ];

  function applyDec31Schedule() {
    const data = window.TRAVEL_PLAN_DATA;
    if (!data?.days) return false;
    const day = data.days.find((item) => item.date === "2026-12-31" || item.day === 8);
    if (!day) return false;
    day.title = "那不勒斯早餐打卡 - 前往索伦托跨年";
    const rest = (day.schedule || []).filter((item) => !String(item.text || "").includes("取租车"));
    day.schedule = [...morning, ...rest];
    day.notes = day.notes || [];
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
