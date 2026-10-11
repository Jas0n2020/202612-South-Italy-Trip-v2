(() => {
  const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const link = (label, query) => `<a href="${maps(query)}" target="_blank" rel="noopener">${label}</a>`;
  const naplesHome = link("民宿", "40.8349483, 14.2466886");

  const schedule = [
    { time: "08:30", text: "出门", type: "transport" },
    { time: "09:00", text: `<span class='schedule-label'>${link("Museo Cappella Sansevero (圣塞维诺小堂)", "Museo Cappella Sansevero, Via Francesco de Sanctis, 19/21, Napoli, Italy")}<br><small>蒙面纱的耶稣</small><br><small style="color: #b84635; font-weight: 800;">Artecard 折价 €8&nbsp;&nbsp;10月30日预约</small></span> <button class='tip-btn' data-tip-key='sansevero'>TIPS</button>`, type: "spot" },
    { time: "走路 8 min", text: "步行前往那不勒斯主教座堂", type: "transport" },
    { time: "10:15", text: `<span class='schedule-label'>${link("Duomo di Napoli (那不勒斯主教座堂)", "Duomo di Napoli, Via Duomo, 147, Napoli, Italy")}<br><small style="color: #2563eb; font-weight: 800;">免预约 / 门票</small></span> <button class='tip-btn' data-tip-key='duomo-napoli'>TIPS</button>`, type: "spot" },
    { time: "走路 8 min", text: "步行前往 MANN 国家考古博物馆", type: "transport" },
    { time: "11:30", text: `<span class='schedule-label'>${link("MANN 国家考古博物馆", "Museo Archeologico Nazionale di Napoli, Piazza Museo, 19, Napoli, Italy")}<br><small style="color: #2563eb; font-weight: 800;">Artecard 半价 €10 / 免预约</small></span> <button class='tip-btn' data-tip-key='mann'>TIPS</button>`, type: "spot" },
    { time: "13:30", text: "午餐 45 min" },
    { time: "14:15", text: "地铁 L1 15 min", type: "transport" },
    { time: "14:35", text: `<span class='schedule-label'>${link("Royal Palace of Naples (王宫)", "Royal Palace of Naples, Piazza del Plebiscito, 1, Napoli, Italy")}<br><small style="color: #2563eb; font-weight: 800;">Artecard 半价 €7.5 / 免预约</small></span> <button class='tip-btn' data-tip-key='royal-palace-naples'>TIPS</button>`, type: "spot" },
    { time: "15:11", text: "出发，140 公交 + F2 缆车 34 min，15:45 到", type: "transport" },
    { time: "15:45", text: `<span class='schedule-label'>${link("Panorama Sant'Antonio a Posillipo", "Panorama Sant'Antonio a Posillipo, Napoli, Italy")}<br>${link("Lungomare Mergellina (美人鱼大道)", "Lungomare Mergellina, Napoli, Italy")}<br><small>那不勒斯“明信片同款”全景（半月形海湾 + 维苏威火山）</small><br><small>16:42 日落</small></span> <button class='tip-btn' data-tip-key='posillipo-mergellina'>TIPS</button>`, type: "spot" },
    { time: "晚餐", text: "海边晚餐" },
    { time: "晚上", text: `公交回 ${naplesHome}`, type: "transport" }
  ];

  function applyDec30Schedule() {
    const data = window.TRAVEL_PLAN_DATA;
    if (!data?.days) return false;
    const day = data.days.find((item) => item.date === "2026-12-30" || item.day === 7);
    if (!day) return false;
    day.title = "那不勒斯老城、考古馆与海湾日落";
    day.schedule = schedule;
    day.notes = day.notes || [];
    if (typeof renderTimeline === "function") renderTimeline();
    return true;
  }

  if (applyDec30Schedule()) return;
  document.addEventListener("travel-data-ready", () => setTimeout(applyDec30Schedule, 0), { once: true });
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (applyDec30Schedule() || attempts > 30) clearInterval(timer);
  }, 200);
})();
