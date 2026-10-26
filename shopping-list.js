(() => {
  "use strict";
  const root = document.getElementById("shopping");
  if (!root) return;
  const key = "travel-plan:shopping:v1:202612-south-italy";
  const initial = [{ id: "rome-magnet", text: "罗马屁股冰箱贴", completed: false, url: "https://www.xiaohongshu.com/explore/6995ae80000000001b01763d?xsec_token=ABvnxSP9GSD3ISfkvttgsNFeL9SWot553cjVgqBbh5Hv0=&xsec_source=pc_search&source=web_profile_page" }];
  const form = root.querySelector("form");
  const name = form.elements.namedItem("item");
  const url = form.elements.namedItem("url");
  const list = root.querySelector(".shopping-list");
  const status = root.querySelector(".shopping-status");
  const cancel = form.querySelector("[data-cancel]");
  const submit = form.querySelector("[type=submit]");
  let editing = null;
  let items = initial;
  function safeUrl(value) {
    if (!value.trim()) return "";
    try {
      const parsed = new URL(value.trim());
      if (parsed.protocol === "https:" && (parsed.hostname === "xiaohongshu.com" || parsed.hostname.endsWith(".xiaohongshu.com") || parsed.hostname === "xhslink.com" || parsed.hostname.endsWith(".xhslink.com"))) return parsed.href;
    } catch {}
    return null;
  }
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) items = parsed.filter(item => item && typeof item.id === "string" && typeof item.text === "string").map(item => ({ id: item.id, text: item.text, completed: !!item.completed, url: safeUrl(typeof item.url === "string" ? item.url : "") || "" }));
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
    url.setCustomValidity("");
  }
  function edit(item) {
    editing = item.id;
    name.value = item.text;
    url.value = item.url;
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
      if (item.url) {
        const book = document.createElement("a");
        book.href = item.url;
        book.className = "shopping-book";
        book.textContent = "\u{1f4d5}";
        book.title = `小红书：${item.text}`;
        book.setAttribute("aria-label", book.title);
        book.rel = "noopener noreferrer";
        row.append(book);
      } else {
        const book = button("\u{1f4d5}", `添加小红书链接：${item.text}`, () => { edit(item); url.focus(); });
        book.className = "shopping-book";
        row.append(book);
      }
      row.append(button("\u270e", `编辑：${item.text}`, () => edit(item)));
      row.append(button("\u00d7", `删除：${item.text}`, () => { items = items.filter(entry => entry.id !== item.id); if (editing === item.id) reset(); save(); render(); }));
      list.append(row);
    });
  }
  url.addEventListener("input", () => url.setCustomValidity(""));
  cancel.addEventListener("click", reset);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = name.value.trim();
    if (!text) { name.focus(); return; }
    const link = safeUrl(url.value);
    if (link === null) { url.setCustomValidity("请填写 https:// 开头的小红书或 xhslink.com 链接。"); url.reportValidity(); return; }
    if (editing) {
      const item = items.find(entry => entry.id === editing);
      if (item) { item.text = text; item.url = link; }
    } else items.push({ id: `shopping-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text, url: link, completed: false });
    save(); reset(); render(); name.focus();
  });
  render();
})();
