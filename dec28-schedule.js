(() => {
  const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const link = (label, query) => `<a href="${maps(query)}" target="_blank" rel="noopener">${label}</a>`;
  const naplesHome = link("那不勒斯民宿", "40.8349483, 14.2466886");

  const schedule = [
    { time: "08:25", text: "出门，走路 + 公交 92，20 分钟前往博尔盖塞美术馆", type: "transport" },
    { time: "09:00", text: `<span class='schedule-label'>${link("Galleria Borghese (博尔盖塞美术馆)", "Galleria Borghese, Piazzale Scipione Borghese, 5, 00197 Roma RM, Italy")}<br><small style="color: #b84635; font-weight: 800;">9:00 - 11:00&nbsp;&nbsp;10月22日开始留意放票</small></span> <button class='tip-btn' data-tip-key='borghese-gallery'>TIPS</button>`, type: "spot" },
    { time: "11:00", text: `<span class='schedule-label'>${link("Villa Borghese (博尔盖塞公园)", "Villa Borghese, Rome, Italy")}</span>`, type: "spot" },
    { time: "11:15", text: `<span class='schedule-label'>${link("Temple of Aesculapius (埃斯库拉皮乌斯神庙)", "Temple of Aesculapius, Villa Borghese, Rome, Italy")}</span> <button class='tip-btn' data-tip-key='borghese-park-aesculapius'>TIPS</button>`, type: "spot" },
    { time: "公交 + 走路 25分钟", text: "回酒店拿行李", type: "transport" },
    { time: "步行", text: "酒店走路去火车站", type: "transport" },
    { time: "12:40", text: "12:40 - 13:53 火车 罗马 - 那不勒斯", type: "transport" },
    { time: "14:10", text: `那不勒斯火车站 - ${naplesHome}<br><small>公交 R2 20 min，入住民宿</small>`, type: "transport" },
    { time: "15:30", text: `<span class='schedule-label'>${link("Galleria Umberto I (翁贝托一世长廊)", "Galleria Umberto I, Via San Carlo, Napoli, Italy")}</span> <button class='tip-btn' data-tip-key='galleria-umberto'>TIPS</button>`, type: "spot" },
    { time: "走路 3 min", text: "前往新堡", type: "transport" },
    { time: "16:00", text: `<span class='schedule-label'>${link("Castel Nuovo (新堡)", "Castel Nuovo, Via Vittorio Emanuele III, Napoli, Italy")}</span> <button class='tip-btn' data-tip-key='castel-nuovo'>TIPS</button>`, type: "spot" },
    { time: "步行 + 缆车 25 min", text: "前往圣马蒂诺观景台 / 圣埃莫堡", type: "transport" },
    { time: "16:35", text: `<span class='schedule-label'>${link("Belvedere San Martino", "Belvedere San Martino, Napoli, Italy")}<br>${link("Castel Sant'Elmo (圣埃莫堡日落)", "Castel Sant'Elmo, Via Tito Angelini, Napoli, Italy")}<br><small>16:42 日落</small></span> <button class='tip-btn' data-tip-key='san-martino-santelmo'>TIPS</button>`, type: "spot" },
    { time: "晚上", text: `步行 + 缆车 F3 30 min 回 ${naplesHome}`, type: "transport" }
  ];

  function applyDec28Schedule() {
    const data = window.TRAVEL_PLAN_DATA;
    if (!data?.days) return false;
    const day = data.days.find((item) => item.date === "2026-12-28" || item.day === 5);
    if (!day) return false;
    day.title = "罗马博尔盖塞 - 转场那不勒斯";
    day.schedule = schedule;
    day.notes = day.notes || [];
    if (typeof renderTimeline === "function") renderTimeline();
    return true;
  }

  if (applyDec28Schedule()) return;
  document.addEventListener("travel-data-ready", () => setTimeout(applyDec28Schedule, 0), { once: true });
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (applyDec28Schedule() || attempts > 30) clearInterval(timer);
  }, 200);
})();
