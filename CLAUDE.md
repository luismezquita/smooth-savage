# SMOOTH SAVAGE — Project Guide for Claude

## Token & Resource Rules (MANDATORY — read first)
- **One task at a time.** Do it, stop, report. Never chain tasks without approval.
- **No summaries unless asked.** Skip preambles, postambles, recaps.
- **Bash over Read.** Use shell scripts to process files — never read large files line by line in context.
- **Diffs only.** When editing files, show only what changed — never reprint full files.
- **Cowork directs, Code executes.** Cowork chat = decisions + direction. Claude Code = file edits + code. Never mix roles.
- **Ask before batch work.** If a task touches >10 items, confirm scope first.
- **Stop and flag** when approaching context limit — don't try to finish at any cost.

---

## What This App Is
A premium wellness PWA (Progressive Web App) called **Smooth Savage**. It covers exotic fresh foods, superfoods ("Savage"), and smoothie recipes. Built with React + Vite + Tailwind CSS. Offline-capable. Target platforms: Web PWA, Google Play, App Store.

Owner: Luis Fernando (luismezquita@gmail.com)

---

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (dark mode via `class`)
- **Routing**: React Router v6
- **Icons**: lucide-react
- **Language**: JavaScript (JSX)
- **PWA**: Offline-capable, installable

---

## Project Structure
```
src/
  data/
    fruits.js        — Fresh food items (~103 items)
    superfoods.js    — Savage food items (superfoods, adaptogens, mushrooms)
    smoothies.js     — Smoothie recipes (89 smoothies)
  pages/
    Home.jsx         — Fresh foods page (/)
    Savage.jsx       — Savage foods page (/savage)
    Smoothies.jsx    — Smoothies page (/smoothies)
    Favorites.jsx    — Favorites page (/favorites) — has Fresh/Savage/Smoothies filter buttons
    Search.jsx       — Global search (/search)
    FruitDetail.jsx  — Fresh food detail page
    SuperfoodDetail.jsx — Savage food detail page
    SmoothieDetail.jsx  — Smoothie detail page
    Benefits.jsx     — Benefits overview page
    BenefitDetail.jsx   — Individual benefit page
  components/
    Navbar.jsx       — Top nav with logo, Globe icon, Search, Dark/Light toggle
    BottomNav.jsx    — Mobile bottom navigation (Fresh, Savage, Smoothies, Favorites)
    LanguagePicker.jsx — Language bottom sheet (6 languages, Portal-rendered)
    FruitCard.jsx    — Fresh food card
    SuperfoodCard.jsx — Savage food card
    SmoothieCard.jsx — Smoothie card
    Layout.jsx       — App layout wrapper
  hooks/
    useTheme.jsx     — Dark/light mode hook

public/
  images/
    fresh/     — Fresh food images (.webp)
    savage/    — Savage food images (.webp)
    smoothies/ — Smoothie images (.webp)
```

---

## Data File Conventions

### fruits.js
```js
{
  id: "apple",
  name: "Apple",
  color: "red",
  image: "/images/fresh/apple.webp",
  teaser: "...",
  benefit: "Immunity Boost",
  nutrients: ["Vitamin C", "Fiber"],
  tips: "...",
  mainBenefits: [...] // ⚠️ PENDING RESTORATION — was stripped in a refactor
}
```

### superfoods.js
```js
{ id, type: "superfood", name, color, image, benefit, teaser, nutrients, synergy, tips }
// mainBenefits section also pending restoration in SuperfoodDetail.jsx UI
```

### smoothies.js
```js
{
  id, name, title, teaser, color,
  description, benefits, healthTags,
  synergies, ingredients, steps,
  tier: "free", isHero: true/false,
  benefit, img, icon: "vaso"
}
```

---

## Key Design Decisions
- **Colors**: Green (#22C55E) primary, dark purple (#2E1065) dark bg
- **Images**: All `.webp` format
- **Scroll memory**: `history.scrollRestoration = 'manual'` + double `requestAnimationFrame` in Home.jsx
- **Favorites routing**: Identifies superfoods by checking against savageFoods array (not type field)
- **Search bar style**: Orange border (#F97316) + cream background (#FFF8F0)

---

## Language System
- Globe icon in Navbar → opens LanguagePicker bottom sheet (Portal-rendered)
- 6 languages: EN 🇬🇧, ZH 🇨🇳, JA 🇯🇵, KO 🇰🇷, ES 🇪🇸, AR 🇸🇦
- Selected language saved to `localStorage` key `ss_language`
- **Status**: Architecture only — NO translations yet. Content stays in English.
- RTL for Arabic: architecture ready, not activated until translations are added

---

## Pending Tasks (as of April 2026)
1. **Smoothie images** — 28 new smoothie images to generate in Grok (prompts saved)
2. **Fresh food images** — 12 replacement images (Apricot, Cranberry, Kumquat, Lime, Mangosteen, Loquat, Mulberry, Nectarine, Ugli Fruit, Amla, Acerola, Bilberry)
3. **Smoothie naming** — rename smoothies to more appealing names (last step before languages)
4. **mainBenefits restoration** — restore to all fruits.js and superfoods.js items (was stripped in refactor, use git history). Batch 30 items at a time to avoid token limits.
5. **SuperfoodDetail.jsx** — add mainBenefits UI section (copy pattern from FruitDetail.jsx)
6. **Translations** — add actual content for ZH, JA, KO, ES, AR languages
7. **CLAUDE.md** — this file ✅

---

## Image Naming Convention
- Fresh: `/public/images/fresh/fruit_name.webp` (snake_case)
- Savage: `/public/images/savage/ingredient_name.webp` (snake_case)
- Smoothies: `/public/images/smoothies/smoothie_id.webp` (matches smoothie id field)

---

## Git
- Branch: `main`
- Always commit before major changes
- Last commit: Major smoothies overhaul + language picker (April 2026)

---

## What NOT to Do
- Never reference FDA in content
- No tomato references
- Don't exceed 30 items per batch when writing to fruits.js (token limit)
- Don't apply `dir="rtl"` to document until full Arabic translations are ready
- CLAUDE.md is never imported by any code — safe for App Store / Play Store builds
