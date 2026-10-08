(() => {
  const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const link = (label, query) => `<a href="${maps(query)}" target="_blank" rel="noopener">${label}</a>`;
  const naplesHome = link("民宿", "40.8349483, 14.2466886");

  const schedule = [
    { time: "09:00", text: "吃早餐" },
    { time: "09:30", text: "出发，走路 + 地铁 L1 20 min", type: "transport" },
    { time: "09:56", text: "火车 9:56 - 10:24（约 30 min 一班）", type: "transport" },
    { time: "10:30", text: `<span class='schedule-label'>${link("Pompeii (庞贝古城)", "Pompeii Archaeological Park, Pompei, Italy")}<br><small style="color: #2563eb; font-weight: 800;">10:30 - 12:30&nbsp;&nbsp;Artecard 免票 / 免预约</small></span> <button class='tip-btn' data-tip-key='pompeii'>TIPS</button>`, type: "spot" },
    { time: "12:30", text: "12:30 - 13:45 午饭" },
    { time: "13:45", text: `火车 + 走路 45 min<br><small>${link("Ercolano Scavi 站", "Ercolano Scavi station, Ercolano, Italy")}</small>`, type: "transport" },
    { time: "14:30", text: `<span class='schedule-label'>${link("Herculaneum (赫库兰尼姆)", "Parco Archeologico di Ercolano, Corso Resina, Ercolano, Italy")}<br><small style="color: #2563eb; font-weight: 800;">14:30 - 16:00&nbsp;&nbsp;Artecard 免票 / 免预约</small><br><small>建议 14:00 到，15:30 停止进场</small></span> <button class='tip-btn' data-tip-key='herculaneum'>TIPS</button>`, type: "spot" },
    { time: "16:00", text: `火车 + 走路 1 hr 回 ${naplesHome}`, type: "transport" }
  ];

  function applyDec29Schedule() {
    const data = window.TRAVEL_PLAN_DATA;
    if (!data?.days) return false;
    const day = data.days.find((item) => item.date === "2026-12-29" || item.day === 6);
    if (!day) return false;
    day.title = "庞贝与赫库兰尼姆古城探秘";
    day.schedule = schedule;
    day.notes = day.notes || [];
    if (typeof renderTimeline === "function") renderTimeline();
    return true;
  }

  if (applyDec29Schedule()) return;
  document.addEventListener("travel-data-ready", () => setTimeout(applyDec29Schedule, 0), { once: true });
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (applyDec29Schedule() || attempts > 30) clearInterval(timer);
  }, 200);
})();
