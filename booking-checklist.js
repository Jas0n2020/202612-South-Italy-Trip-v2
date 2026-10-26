(() => {
  "use strict";
  const root = document.getElementById("booking-checklist");
  if (!root) return;
  const key = "travel-plan:booking-checklist:v1:202612-south-italy";
  let items = [
    { id: "borghese", text: "罗马 - 博尔盖塞美术馆门票  12月26日开始留意放票", completed: false },
    { id: "sansevero", text: "那不勒斯 - 圣塞维诺小堂 10月30日 预约/买票  €12", completed: false },
    { id: "pantheon", text: "罗马 - 万神殿 11月1号 预约/买票  €7", completed: false },
    { id: "breda-bru", text: "Breda - 布鲁塞尔BRU 火车票  17:42 - 18:49 / 18:42 - 19:49", completed: false },
    { id: "colosseum", text: "罗马 - 斗兽场 11月26号 预约/买票  €18", completed: false }
  ];
  const form = root.querySelector("form");
  const input = form.elements.namedItem("item");
  const submit = form.querySelector("[type=submit]");
  const cancel = form.querySelector("[data-cancel]");
  const list = root.querySelector(".shopping-list");
  const status = root.querySelector(".shopping-status");
  let editing = null;
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved)) items = saved.filter(item => item && typeof item.id === "string" && typeof item.text === "string").map(item => ({ id: item.id, text: item.text, completed: !!item.completed }));
    }
  } catch { status.textContent = "暂时无法读取已保存的待办清单。"; }
  function save() {
    try { localStorage.setItem(key, JSON.stringify(items)); status.textContent = ""; }
    catch { status.textContent = "无法保存到此浏览器，关闭页面后本次修改可能丢失。"; }
  }
  function reset() {
    editing = null;
    form.reset();
    cancel.hidden = true;
    submit.textContent = "+";
    submit.title = "添加待办";
    submit.setAttribute("aria-label", "添加待办");
  }
  function button(symbol, label, action) {
    const element = document.createElement("button");
    element.type = "button";
    element.textContent = symbol;
    element.title = label;
    element.setAttribute("aria-label", label);
    element.addEventListener("click", action);
    return element;
  }
  function render() {
    list.replaceChildren();
    root.querySelector(".booking-progress").textContent = `${items.filter(item => item.completed).length} / ${items.length}`;
    items.forEach(item => {
      const row = document.createElement("div");
      row.className = "shopping-item" + (item.completed ? " is-complete" : "");
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", () => { item.completed = checkbox.checked; save(); render(); });
      const text = document.createElement("span");
      text.textContent = item.text;
      label.append(checkbox, text);
      row.append(label);
      row.append(button("\u270e", `编辑：${item.text}`, () => {
        editing = item.id;
        input.value = item.text;
        submit.textContent = "保存";
        submit.title = "保存待办";
        submit.setAttribute("aria-label", "保存待办");
        cancel.hidden = false;
        input.focus();
      }));
      row.append(button("\u00d7", `删除：${item.text}`, () => {
        items = items.filter(entry => entry.id !== item.id);
        if (editing === item.id) reset();
        save(); render();
      }));
      list.append(row);
    });
  }
  cancel.addEventListener("click", reset);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    if (editing) {
      const item = items.find(entry => entry.id === editing);
      if (item) item.text = text;
    } else items.push({ id: `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text, completed: false });
    save(); reset(); render(); input.focus();
  });
  render();
})();
