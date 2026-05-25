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
Live (Vercel): https://smooth-savage.vercel.app/
Privacy Policy: https://smooth-savage.vercel.app/privacy
Domain: smoothsavage.app (Squarespace, expires May 2027)

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
    benefits.js      — 11 benefit categories
  pages/
    Home.jsx         — Fresh foods page (/)
    Savage.jsx       — Savage foods page (/savage)
    Smoothies.jsx    — Smoothies page (/smoothies)
    Favorites.jsx    — Favorites page (/favorites)
    Search.jsx       — Global search (/search)
    FruitDetail.jsx  — Fresh food detail page
    SuperfoodDetail.jsx — Savage food detail page
    SmoothieDetail.jsx  — Smoothie detail page
    Benefits.jsx     — Benefits overview page (/benefits)
    BenefitDetail.jsx   — Individual benefit page
    Info.jsx         — About / Privacy / Dev premium toggle
  components/
    Navbar.jsx       — Top nav with logo, Globe icon, Search, Dark/Light toggle
    BottomNav.jsx    — Mobile bottom navigation (Fresh, Savage, Smoothies, Favorites)
    LanguagePicker.jsx — Language bottom sheet (Portal-rendered)
    FruitCard.jsx    — Fresh food card (supports locked prop)
    SuperfoodCard.jsx — Savage food card (supports locked prop)
    SmoothieCard.jsx — Smoothie card (supports locked prop)
    PaywallOverlay.jsx — Freemium paywall modal ← NUEVO
    Layout.jsx       — App layout wrapper
  hooks/
    useTheme.jsx     — Dark/light mode hook
    useFavorites.jsx — Favorites hook
    usePremium.js    — Freemium hook ← NUEVO

public/
  images/
    fresh/     — Fresh food images (.webp)
    savage/    — Savage food images (.webp)
    smoothies/ — Smoothie images (.webp)
```

---

## Freemium System — EN PREPARACION Mayo 2026

El sistema freemium visual está implementado: muestra contenido gratuito, bloquea contenido premium y abre el paywall. La compra real queda pendiente de RevenueCat.

### Lógica
- `isPremium = false` → ítems bloqueados muestran imagen + nombre + candado, al tocar abre PaywallOverlay
- `isPremium = true` → todo visible y accesible
- Estado premium pendiente de conectar con RevenueCat
- Precio recomendado de lanzamiento: $4.99 pago único, sin suscripción, sin anuncios

### Límites gratuitos
- Fresh Foods: primeros 16 libres (`locked={i >= 16}` en Home.jsx)
- Smoothies: primeros 8 libres (`locked={i >= 8}` en Smoothies.jsx)
- Savage Foods: primeros 7 libres (`locked={i >= 7}` en Savage.jsx)
- Benefits: primeras 2 categorías libres (`FREE_BENEFITS_COUNT = 2` en Benefits.jsx)

### Hook usePremium.js
```js
const { isPremium, unlock, togglePremium } = usePremium();
// unlock() → reservado para activar premium tras validar compra real con RevenueCat
// togglePremium() → reservado para testing interno si se vuelve a necesitar
// Constantes: FREE_SMOOTHIES_COUNT=8, FREE_FRESH_COUNT=16, FREE_SAVAGE_COUNT=7, FREE_BENEFITS_COUNT=2
```

### Pendiente del freemium
- RevenueCat — conectar botón "$4.99" con pagos reales de App Store y Google Play
- Restore Purchase — botón obligatorio en Apple
- Verificar que Search, Favorites y URLs directas respetan el freemium

---

## Language System — COMPLETADO ✅

La app funciona completa en **7 idiomas**: EN 🇬🇧, ZH 🇨🇳, JA 🇯🇵, KO 🇰🇷, ES 🇪🇸, AR 🇸🇦 + (francés)
- Globe icon en Navbar → LanguagePicker bottom sheet (Portal-rendered)
- Selected language guardado en `localStorage` key `ss_language`
- Todo el contenido traducido y funcionando en todos los idiomas
- RTL para árabe: implementado

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

## Estado actual — Mayo 16, 2026

### ✅ COMPLETADO
- Todo el contenido principal (fresh foods, superfoods, 89 smoothies)
- App completa en 7 idiomas con todo el contenido traducido
- Freemium visual completo (candados, PaywallOverlay, usePremium hook)
- Dark/Light mode
- Explore Benefits (11 categorías)
- Favorites
- PWA offline-capable
- Privacy Policy (URL live)
- Vercel deployment activo
- App icons e imágenes
- App Store descriptions en 7 idiomas (en Drive)

### ⏳ PENDIENTE — Contenido
- 28 imágenes de smoothies nuevas (prompts guardados en Grok)
- 12 imágenes de fresh foods para reemplazar (Apricot, Cranberry, Kumquat, Lime, Mangosteen, Loquat, Mulberry, Nectarine, Ugli Fruit, Amla, Acerola, Bilberry)
- Renombrar smoothies a nombres más atractivos
- Restaurar mainBenefits en fruits.js y superfoods.js (batch 30 items)
- Añadir sección mainBenefits en SuperfoodDetail.jsx

### ⏳ PENDIENTE — Para las tiendas
1. Empaquetar PWA como app nativa (PWABuilder o Capacitor)
2. Google Play Console — retomar proceso (se paró al descubrir que faltaba el freemium, ahora está listo)
3. App Store Connect — dar de alta ($99/año) y subir IPA
4. RevenueCat — conectar pagos reales ($4.99 Non-Consumable en ambas tiendas)

---

## Image Naming Convention
- Fresh: `/public/images/fresh/fruit_name.webp` (snake_case)
- Savage: `/public/images/savage/ingredient_name.webp` (snake_case)
- Smoothies: `/public/images/smoothies/smoothie_id.webp` (matches smoothie id field)

---

## Git
- Branch: `main`
- Always commit before major changes
- Last commit: Freemium implementation (Mayo 2026)

---

## What NOT to Do
- Never reference FDA in content
- No tomato references
- Don't exceed 30 items per batch when writing to fruits.js (token limit)
- CLAUDE.md is never imported by any code — safe for App Store / Play Store builds
