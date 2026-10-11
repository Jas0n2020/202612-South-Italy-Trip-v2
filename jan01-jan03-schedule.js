(() => {
  const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const link = (label, query) => `<a href="${maps(query)}" target="_blank" rel="noopener">${label}</a>`;

  const jan01 = [
    { time: "08:30", text: "08:30 - 09:30 早餐" },
    { time: "09:30", text: `自驾：索伦托 - ${link("Positano", "Positano, Amalfi Coast, Italy")}<br><small>沿途海岸公路观景，天气好可以短暂停靠拍照。</small>`, type: "transport" },
    { time: "10:30", text: `<span class='schedule-label'>${link("Positano (波西塔诺)", "Positano, Amalfi Coast, Italy")}<br><small>清晨打卡 + 咖啡 + 观景，不要停太久。重点：${link("Spiaggia Grande", "Spiaggia Grande, Positano, Italy")}、彩色山城远景。</small></span>`, type: "spot" },
    { time: "12:00", text: `<span class='schedule-label'>${link("Amalfi (阿马尔菲)", "Amalfi, Amalfi Coast, Italy")}<br><small>${link("Duomo di Amalfi (阿马尔菲主教座堂)", "Duomo di Amalfi, Amalfi, Italy")}；中午可在 Amalfi 简单午餐。冬季相对更有生活气。</small></span>`, type: "spot" },
    { time: "13:45", text: `<span class='schedule-label'>${link("Ravello (拉韦洛)", "Ravello, Amalfi Coast, Italy")}<br><small>${link("Villa Rufolo", "Villa Rufolo, Ravello, Italy")}；${link("Villa Cimbrone / Terrazza dell'Infinito 无限露台", "Villa Cimbrone, Ravello, Italy")}。这天最值得留时间的是 Ravello。</small></span>`, type: "spot" },
    { time: "15:45", text: "开始返程：尽量在天黑前离开 Ravello / Amalfi 一带。天气不好或开车压力大，就减少 Positano 停留，把重点放在 Amalfi + Ravello。", type: "transport" },
    { time: "16:30", text: `<span class='schedule-label'>回到索伦托海边看日落：${link("Villa Comunale", "Villa Comunale, Sorrento, Italy")} / ${link("Marina Piccola", "Marina Piccola, Sorrento, Italy")}</span><br><small>把日落安排在索伦托更稳，避免天黑后还在阿马尔菲海岸山路上赶车。</small>`, type: "spot" }
  ];

  const jan02 = [
    { time: "08:30", text: "08:30 - 09:30 早餐" },
    { time: "09:30", text: `${link("索伦托码头 Marina Piccola", "Marina Piccola, Sorrento, Italy")} - 渡轮去 Capri<br><small>冬季船班少，建议前一晚确认当天 Sorrento-Capri 往返船班和海况。</small>`, type: "transport" },
    { time: "10:00", text: `抵达 ${link("Capri Marina Grande", "Marina Grande, Capri, Italy")}，坐小巴/出租车上 ${link("Anacapri", "Anacapri, Capri, Italy")}`, type: "transport" },
    { time: "10:15", text: `<span class='schedule-label'>10:15 - 11:45 ${link("Villa San Michele (圣米歇尔别墅)", "Villa San Michele, Anacapri, Italy")}<br><small>门票约 €12。1月开放时间通常是 09:00-15:30，且 1月周二关闭；这天是周六，理论上没问题。这个要放前面，因为关门早。</small></span> <button class='tip-btn' data-tip-key='capri-winter'>TIPS</button>`, type: "spot" },
    { time: "11:45", text: `${link("Anacapri", "Anacapri, Capri, Italy")} 简单午餐 / 咖啡` },
    { time: "13:00", text: `小巴去 ${link("Capri Town / Piazzetta", "Piazzetta di Capri, Capri, Italy")}`, type: "transport" },
    { time: "14:00", text: `<span class='schedule-label'>14:00 - 15:15 ${link("Gardens of Augustus (奥古斯都花园)", "Gardens of Augustus, Capri, Italy")}<br><small>1月开放通常到 16:30，这里可以看 Faraglioni 海蚀柱和 Via Krupp，是 Capri 最经典机位之一。</small></span>`, type: "spot" },
    { time: "15:15", text: `${link("Capri town", "Capri, Italy")} 简单散步，回 ${link("Marina Grande 码头", "Marina Grande, Capri, Italy")}`, type: "transport" },
    { time: "16:00", text: `16:00 - 17:00 左右，渡轮回 ${link("Sorrento", "Sorrento, Italy")}<br><small>实际时间以当天船班为准，冬天千万不要卡最后一班。</small>`, type: "transport" }
  ];

  const jan03 = [
    { time: "09:00", text: "09:00 - 09:30 早餐" },
    { time: "09:30", text: `09:30 - 11:00 索伦托 - ${link("那不勒斯 NAP Europcar 还车点", "Europcar, V7HJ+2H Naples, Metropolitan City of Naples, Italy")}`, type: "transport" },
    { time: "11:00", text: "还车，12:00 值机", type: "transport" },
    { time: "13:25", text: `${link("那不勒斯 NAP", "Naples International Airport, Naples, Italy")} - ${link("阿姆 AMS", "Amsterdam Airport Schiphol, Netherlands")}<br><small>13:25 - 16:05</small>`, type: "transport" },
    { time: "17:00", text: `${link("阿姆 AMS", "Amsterdam Airport Schiphol, Netherlands")} - ${link("Breda", "Breda, Netherlands")}<br><small>17:00 - 18:00</small>`, type: "transport" }
  ];

  function setDay(date, dayNumber, title, schedule) {
    const data = window.TRAVEL_PLAN_DATA;
    if (!data?.days) return false;
    const day = data.days.find((item) => item.date === date || item.day === dayNumber);
    if (!day) return false;
    day.title = title;
    day.schedule = schedule;
    day.notes = day.notes || [];
    return true;
  }

  function applyJanSchedules() {
    const ok1 = setDay("2027-01-01", 9, "阿马尔菲海岸冬日自驾", jan01);
    const ok2 = setDay("2027-01-02", 10, "Capri 岛一日游", jan02);
    const ok3 = setDay("2027-01-03", 11, "返程归家", jan03);
    if (!(ok1 && ok2 && ok3)) return false;
    if (typeof renderTimeline === "function") renderTimeline();
    return true;
  }

  if (applyJanSchedules()) return;
  document.addEventListener("travel-data-ready", () => setTimeout(applyJanSchedules, 0), { once: true });
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (applyJanSchedules() || attempts > 30) clearInterval(timer);
  }, 200);
})();
