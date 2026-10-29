(() => {
  const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const link = (label, query) => `<a href="${maps(query)}" target="_blank" rel="noopener">${label}</a>`;
  const naplesHome = link("那不勒斯民宿", "40.8349483, 14.2466886");

  const schedule = [
    {"time":"08:00","text":"早餐、退房，行李寄存 <a href=\"https://www.google.com/maps/search/?api=1&query=Hotel%20Villa%20delle%20Rose%2C%20Via%20Vicenza%2C%205%2C%20Rome%2C%20Italy\" target=\"_blank\" rel=\"noopener\">Hotel Villa delle Rose</a>","type":"transport"},
    {"time":"08:15","text":"出发前往万神殿，预留交通与入场排队时间","type":"transport"},
    {"time":"09:00","text":"<span class='schedule-label'><a href=\"https://www.google.com/maps/search/?api=1&query=Pantheon%2C%20Piazza%20della%20Rotonda%2C%2000186%20Roma%20RM%2C%20Italy\" target=\"_blank\" rel=\"noopener\">Pantheon (万神殿)</a><br><small style=\"color: #b84635; font-weight: 800;\">11月1号 预约/买票&nbsp;&nbsp;€7</small></span> <button class='tip-btn' data-tip-key='pantheon'>TIPS</button><br><small>09:00 - 09:45</small>","type":"spot"},
    {"time":"09:45","text":"步行前往圣依纳爵堂","type":"transport"},
    {"time":"10:00","text":"<span class='schedule-label'><a href=\"https://www.google.com/maps/search/?api=1&query=Chiesa%20di%20Sant%27Ignazio%20di%20Loyola%2C%20Via%20del%20Caravita%2C%208a%2C%2000186%20Roma%20RM%2C%20Italy\" target=\"_blank\" rel=\"noopener\">Chiesa di Sant'Ignazio di Loyola (圣依纳爵堂)</a></span> <button class='tip-btn' data-tip-key='sant-ignazio'>TIPS</button><br><small>10:00 - 10:30；如排队较长，优先参观天顶画，不等镜子拍照</small>","type":"spot"},
    {"time":"10:30","text":"返回 <a href=\"https://www.google.com/maps/search/?api=1&query=Hotel%20Villa%20delle%20Rose%2C%20Via%20Vicenza%2C%205%2C%20Rome%2C%20Italy\" target=\"_blank\" rel=\"noopener\">Hotel Villa delle Rose</a> 取行李，预留约 1 小时交通缓冲","type":"transport"},
    {"time":"11:30","text":"在 <a href=\"https://www.google.com/maps/search/?api=1&query=Hotel%20Villa%20delle%20Rose%2C%20Via%20Vicenza%2C%205%2C%20Rome%2C%20Italy\" target=\"_blank\" rel=\"noopener\">Hotel Villa delle Rose</a> 取行李，随后步行前往 <a href=\"https://www.google.com/maps/search/?api=1&query=Roma%20Termini%2C%20Rome%2C%20Italy\" target=\"_blank\" rel=\"noopener\">Roma Termini 火车站</a>","type":"transport"},
    {"time":"12:00","text":"抵达 Roma Termini，确认站台并候车","type":"transport"},
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
    day.title = "罗马万神殿 - 转场那不勒斯";
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
