# AI-Friendly Lightweight Travel Template

This is a local-first travel-page template that reuses the Golden UI, behavior, bookkeeping, and map design language. Its default path is deliberately lightweight:

`User materials -> two confirmations -> trip-data.json -> build-map -> validate-lite -> local preview`

首次生成优先缩短“用户提交计划 → 第一版网页可打开”的时间。默认只检查数据可读取、页面正常加载、已开启模块正常显示、地图正常生成和无明显运行错误。完整交互、逐项事实与边界场景验收按需执行。

地图默认使用十张固定的 Golden 风格背景。Builder 先根据地点的相对方位、距离、密度和路线连接形成候选模板池，再以旅行签名的稳定哈希自动选择其中一张并叠加固定路线；普通 Agent 不绘制国家轮廓、不生成地图背景，也不改变路线、节点、字体或图例样式。Overview 与 Daily 共用同一坐标和比例。

地图只显示目的地内部路线：出发国和纯转机机场默认忽略，目的地境内抵达机场保留；多国旅行按目的地拆成独立地图，不绘制跨国连线。To Do 只提取资料中明确写出的事项，没有明确事项时保留空列表供用户自行添加。门票 PDF 使用 `ticketPlanning.items[].document` 指向本地 trip asset，并在现有门票弹窗中直接预览。

The bundled `trip-data.json` is a clean, uninitialized starter. It contains no sample destination, dates, flights, hotels, tickets, itinerary, or generated route map. Ordinary generation writes the user's trip directly into this file.

Heavy source-facts, canonical/renderer packages, Entity/Stable ID systems, migration frameworks, full validators, and architecture audits are retained only as advanced/reference material. Ordinary generation does not read or run them.

## Standard features

- 航班卡片与倒计时；
- 旅行总览与 Golden 风格路线地图；
- 逐日 Timeline、每日地图和地点导航；
- Ticket 状态、站内票据入口和外部购买入口；
- Todo；
- 自驾、租车与还车提醒；
- 多人记账、分摊、统计与最少转账建议；
- 默认浏览器本地保存；
- 可选的用户自有 Cloudflare D1 多设备共享。

六个用户模块都由 `trip-data.json > config.modules` 控制：航班、地图、每日行程、租车、To Do、记账。关闭某个模块后，它不会显示、不会出现在导航中，也不会初始化或请求后端；不需要删除 HTML 或改 JavaScript。门票属于每日行程内容，不是独立模块。

## For users: give the plan to an Agent

Give the Agent a reasonably complete trip plan. The Agent extracts dates, flights, hotels, itinerary items, tickets, rental information, and places, then performs the two short confirmations below.

After confirmation, ordinary generation edits only `trip-data.json` and trip-specific assets. Travel content keeps its existing shape; module and persistence settings live under `config`, while map input lives under `map`. It then runs:

```bash
npm run build:map
npm run validate
npm run preview
```

The result is a local runnable/local preview version. The preview command prints its actual URL, starting at port 4173 and automatically trying later ports when needed. The Agent verifies that exact URL, keeps its preview process running, and includes the address as a clickable link in the final response even when the in-app browser is already open. Page generation does not mean the site has been deployed to the public internet.

## The two confirmation rounds

### Round 1: modules

Agent 一次性确认：

- 航班 `flights`
- 地图 `overview`
- 每日行程 `itinerary`
- 租车 `driving`
- To Do `todo`
- 记账 `ledger`

选择会写入 `trip-data.json > config.modules`，不会通过删代码实现。

门票卡片位于每日行程中，并随 `itinerary` 一起显示或隐藏。`config.modules` 中没有 `tickets` 开关，Agent 不得把门票列为第七个模块或要求用户单独确认。

### Round 2: missing materials

Agent 只检查已启用模块，把所有缺失、冲突和歧义放在同一张清单中。用户选择：

- 现在补充材料；或
- 直接预览，未知部分明确标为待补充。

继续预览不等于授权 Agent 猜测。已经明确的地点、日期和路线端点必须保留。

完整普通生成规则见 [SKILL.md](SKILL.md)。

## What one trip is allowed to change

Ordinary generation may modify only:

- `trip-data.json`
- trip-specific assets

`trip-data.json > routeMap` and `metadata.assets.routeMaps` are deterministic Builder output fields and should not be handwritten. Do not edit Golden CSS, core HTML/JS, bookkeeping algorithms, map style, navigation, responsive behavior, or module mechanics unless the user explicitly enters DIY mode.

## Directory overview

```text
.
├── index.html                       冻结页面结构
├── styles.css                       冻结 Travel UI
├── ledger.css                       冻结记账 UI
├── app.js                           航班、Timeline、门票、To Do、自驾
├── overview-map.js                  通用地图 Renderer
├── route-ui.js                      地图切换与交互
├── site-navigation.js               模块与 Travel/记账导航
├── ledger.js                        记账行为与算法
├── runtime-storage.js               本地优先 / D1 可选存储层
├── trip-data.json                   唯一旅行数据（含 config、map 与生成的 routeMap）
├── assets/maps/                     十张固定底图、模板清单与旧地图参考
├── schemas/                         单文件输入与 advanced 兼容 Schema
├── scripts/                         地图生成、数据编译与结果校验
├── optional/cloudflare-d1/          可选 D1 Function 与 migration模板
├── references/                      工作流、部署与 Golden 合同
├── local-preview-server.mjs         本地预览服务器
└── SKILL.md                         Agent 工作入口
```

## Local preview

```bash
npm run build:map
npm run validate
npm run preview
```

Open the exact local address printed by the successful preview process. The Agent must verify and include that address as a clickable final link. This is a local preview only, not a public deployment.

## Maps

Maps use `trip-data.json > map` and the fixed `scripts/build-map.mjs` renderer. Users never choose a map mode, and Agents never draw or restyle a map. `map.mapMode` remains `template-auto` and `map.templateId` remains `auto`.

The manifest registers ten fixed WebP templates. The Builder derives route metrics such as span, orientation, density, connectivity, and long jumps to form a suitable candidate pool. It then applies a stable hash of the trip's region, place IDs, and route order to choose one candidate deterministically. The manifest's `selectionRole` values document template intent; the Builder does not execute those strings as selection rules.

`template-auto` is the authored input mode. Each generated `routeMap.regions[]` entry records `mapMode: "frozen-template"`, the selected `templateId`, and its manifest-backed `baseImage`. This output value must not be copied back into `trip-data.json > map.mapMode`.

The old `country-golden` / `generic-diagram` Boundary workflow is retained only as advanced/legacy reference material. Ordinary generation does not read a Boundary, create a country outline, or select between those modes.

Map content is driven only by `trip-data.json > map.region`, `map.places`, `map.routes`, and `map.dailyRoutes`, plus trip place-area names used by the automatic classifier. Visual tokens and generic layout slots are renderer-owned and are not trip inputs.

Overview and every Daily view share the same fixed template, canvas, viewBox, scale, and place coordinates. Daily switching changes only the active route, relevant places, labels, and transport pins.

## Hero destination title

Hero title selection is independent from map selection. Domestic China trips display `trip.primaryDestinationName`, preserving the destination wording in the user's plan, such as `内蒙古`, `成都`, or `新疆`, and never display `中国`. Only when that field is absent does the renderer fall back to `primaryDestinationCity` or the first `citiesAndAreas` value. International trips display destination country names; multi-country titles use `国家 × 国家`. A user-requested `trip.heroTitle` overrides display only and does not change map mode or trip geography.

## Validate a generated trip

`npm run validate` runs `validate-lite` against the single `trip-data.json`. It checks only failure-critical items: JSON validity, basic trip/day data, nested config and enabled-module data or explicit pending state, map region/places/routes, the fixed-template manifest and referenced base images, obvious development secrets, and required core files.

It does not run provenance, migration, Entity, Stable ID, full schema, or architecture validation.

## Publish later

The default output is local. If the user later asks to publish or share it, GitHub can provide version management and Cloudflare Pages can provide public hosting. Cloudflare D1 is optional and only needed for shared, multi-device data such as bookkeeping, To Do, or ticket state. This generation workflow does not create repositories, log into services, configure D1, or claim deployment was completed.

## Privacy checklist

The local personal page keeps the travel content supplied by the user, including complete ticket PDFs, ticket numbers, QR codes, Booking PINs, booking references, phone numbers, hotel access instructions, flights, orders, dates, and routes. Unless the user explicitly asks for it, the Agent must not hide, redact, crop, delete, or recommend removing this content during extraction, either confirmation round, or first generation.

Only in the final handoff, after providing the working local link, warn once: “当前是本地页面。如果以后公开部署，页面内容可能被任何人访问；是否移除或隐藏敏感内容、增加访问保护，由你自行决定。” This is a neutral choice for the user, not a request to change the local page.

Development credentials must never be written into a static page or public repository: API tokens, Cloudflare or GitHub secrets, passwords, private keys, database credentials, or environment secrets are prohibited.

## Frozen contracts

- [Golden Contract](references/golden-contract.md)
- [Golden UI](references/golden-ui-spec.md)
- [Golden Behavior](references/golden-behavior-spec.md)
- [Golden Map](references/golden-map-spec.md)
- [Golden 记账](references/golden-ledger-spec.md)
- [Known Issues](references/known-issues.md)

单次生成可以更换事实与资产，但不能重新设计页面、重写记账算法或修改通用能力。通用能力的改变必须作为独立的框架维护任务完成、验证并更新 Core integrity manifest。
