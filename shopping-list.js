(() => {
  "use strict";
  const root = document.getElementById("shopping");
  if (!root) return;
  const key = "travel-plan:shopping:v1:202612-south-italy";
  const initial = [{ id: "rome-magnet", text: "罗马屁股冰箱贴", completed: false }];
  const form = root.querySelector("form");
  const name = form.elements.namedItem("item");
  const list = root.querySelector(".shopping-list");
  const status = root.querySelector(".shopping-status");
  const cancel = form.querySelector("[data-cancel]");
  const submit = form.querySelector("[type=submit]");
  let editing = null;
  let items = initial;
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) items = parsed.filter(item => item && typeof item.id === "string" && typeof item.text === "string").map(item => ({ id: item.id, text: item.text, completed: !!item.completed }));
    }
  } catch { status.textContent = "暂时无法读取已保存的购物清单。"; }
  function save() {
    try { localStorage.setItem(key, JSON.stringify(items)); status.textContent = ""; }
    catch { status.textContent = "无法保存到此浏览器，关闭页面后本次修改可能丢失。"; }
  }
  function reset() {
    editing = null;
    form.reset();
    cancel.hidden = true;
    submit.textContent = "+";
    submit.setAttribute("aria-label", "添加购物项");
    submit.title = "添加购物项";
  }
  function edit(item) {
    editing = item.id;
    name.value = item.text;
    cancel.hidden = false;
    submit.textContent = "保存";
    submit.setAttribute("aria-label", "保存购物项");
    submit.title = "保存购物项";
    name.focus();
  }
  function button(symbol, label, action) {
    const control = document.createElement("button");
    control.type = "button";
    control.textContent = symbol;
    control.title = label;
    control.setAttribute("aria-label", label);
    control.addEventListener("click", action);
    return control;
  }
  function render() {
    list.replaceChildren();
    root.querySelector(".shopping-progress").textContent = `${items.filter(item => item.completed).length} / ${items.length}`;
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
      row.append(button("\u270e", `编辑：${item.text}`, () => edit(item)));
      row.append(button("\u00d7", `删除：${item.text}`, () => { items = items.filter(entry => entry.id !== item.id); if (editing === item.id) reset(); save(); render(); }));
      list.append(row);
    });
  }
  cancel.addEventListener("click", reset);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = name.value.trim();
    if (!text) { name.focus(); return; }
    if (editing) {
      const item = items.find(entry => entry.id === editing);
      if (item) item.text = text;
    } else items.push({ id: `shopping-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text, completed: false });
    save(); reset(); render(); name.focus();
  });
  render();
})();
