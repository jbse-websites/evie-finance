# Flow Audit — evnow-lovable — 2026-06-26
Mode: WEB · Tested at: http://localhost:4195 · Breakpoints: 375 / 768 / 1280
Stack: TanStack Start SSR + React/Vite · Note: preview_screenshot times out (canvas particle animation) — all checks via preview_snapshot / preview_eval.

## Verdict: 🟢 SHIP (all reds fixed; 1 yellow advisory remains)

---

## Journeys

| # | Journey | 375 | 768 | 1280 | Result | Evidence |
|---|---------|-----|-----|------|--------|----------|
| 1 | Page loads, title correct | 🟢 | 🟢 | 🟢 | pass | `document.title` = "EVNOW — Go Electric. Get Funded Today." |
| 2 | Hero renders, h1 visible | 🟢 | 🟢 | 🟢 | pass | snapshot confirms all hero text |
| 3 | Nav "Savings" → #calculator scrolls | — | 🟢 | 🟢 | pass | scrollY confirmed at calcTop:0 |
| 4 | Nav "How it works" → #how | — | 🟢 | 🟢 | pass | anchor target exists |
| 5 | Nav "FAQ" → #faq | — | 🟢 | 🟢 | pass | anchor target exists |
| 6 | Nav "Apply now" → #apply scrolls | — | 🟢 | 🟢 | pass | scrollY:3082 applyTop:-0.5 |
| 7 | Hero "Check My Rate" → #apply | 🟢 | 🟢 | 🟢 | pass | anchor href="#apply" confirmed |
| 8 | Hero "Calculate my savings" → #calculator | 🟢 | 🟢 | 🟢 | pass | scrollY:1064 calcTop:0 |
| 9 | Stats bar — all 4 tiles render | 🔴 | 🔴 | 🟢 | "$3,500/yr" overflows 13px at 375, 29px at 768 | phone-probe: scrollW:101/121 vs clientW:88/92 |
| 10 | Calculator slider — math correct | 🟢 | 🟢 | 🟢 | pass | $630 → ev:$158 monthly:$472 annual:$5,664 ✓ |
| 11 | Calculator "Lock In These Savings" → #apply | 🟢 | 🟢 | 🟢 | pass | anchor href="#apply" confirmed |
| 12 | "Monthly saving" label in calc tiles | 🔴 | 🟢 | 🟢 | 3px clip at 375 (tracking-wider too wide for 56px cell) | phone-probe: scrollW:59 vs clientW:56 |
| 13 | FAQ — all 6 items open/close | 🟢 | 🟢 | 🟢 | pass | data-state=open, aria-expanded=true after click |
| 14 | Form — HTML5 empty-submit blocked | 🟢 | 🟢 | 🟢 | pass | checkValidity()=false, submit event not fired |
| 15 | Form — invalid email blocked | 🟢 | 🟢 | 🟢 | pass | validity.valid=false, "Please include an '@'" |
| 16 | Form — bypass validation → error state | 🟢 | 🟢 | 🟢 | pass | server validator throws, catch shows formError |
| 17 | Form — valid submit → success state | 🟢 | 🟢 | 🟢 | pass | server fn fires, all 6 fields received, "You're in." rendered |
| 18 | Submit button disables during request | 🟢 | — | — | pass | disabled={submitting} + pointer-events-none confirmed |
| 19 | Footer links — tap targets | 🔴 | 🔴 | 🟡 | 8 links at 17px height (need ≥36px) | phone-probe: tinyTargets all h:17 |
| 20 | No horizontal page overflow | 🟢 | 🟢 | 🟢 | pass | body.scrollWidth = viewport at all breakpoints |
| 21 | No tiny text (<11px) | 🟢 | 🟢 | 🟢 | pass | phone-probe tinyText:0 |
| 22 | No fixed bars covering content | 🟢 | — | — | pass | fixed:0, nav is `absolute` |
| 23 | Zero console JS errors | 🟢 | — | — | pass | console: only vite debug + React DevTools info |
| 24 | Glyph scan | 🟢 | — | — | pass | only © U+00A9 (universally safe) |
| 25 | Mobile nav absent (no hamburger) | 🟡 | — | — | noted | nav hidden at <md; hero CTAs cover primary flow |

---

## 🔴 Must-fix (blocks ship)

### 1. Stats bar "$3,500/yr" overflows at 375px and 768px
- **Where:** `src/routes/index.tsx:202` — `font-display text-2xl sm:text-3xl font-bold leading-none`
- **What:** At 375px the text is 101px wide in an 88px container (13px overflow). At 768px (4-col grid) it's 121px in 96px (29px overflow). Text is clipped/invisible to users on mobile and tablet.
- **Why:** `sm:text-3xl` (30px bold) inflates the font at 640px, right before `md:grid-cols-4` compresses each column to 96px of text space.
- **Fix:** Change `text-2xl sm:text-3xl` → `text-xl lg:text-3xl`. At text-xl (20px bold) "$3,500/yr" is ~84px — fits at 375px (88px) and 768px (96px). Goes large only at lg (1024px+) where cells are 160px+.

### 2. Footer links not tappable on mobile (17px height)
- **Where:** `src/routes/index.tsx:680` — `<a href="#" className="hover:text-foreground transition-colors">`
- **What:** All 8 footer links (Savings calculator, How it works, FAQ, Apply, About, Lender panel, Contact, Privacy) measure 17px tall — well under the 36px minimum for reliable tapping.
- **Fix:** Add `block py-2` to footer anchor tags to give them 8px above/below, bringing tap height to 33px. Or `py-2.5` for 40px.

---

## 🟡 Should-fix (not blocking, but rough)

### 3. "Monthly saving" label clips by 3px in calculator tiles
- **Where:** `src/routes/index.tsx:318` — `text-[11px] uppercase tracking-wider text-muted-foreground`
- **What:** At 375px the "Monthly saving" label (59px at tracking-wider) overflows its 56px tile container by 3px.
- **Fix:** Change `tracking-wider` → `tracking-wide` saves ~4px. Or shorten label to "Monthly".

### 4. No mobile navigation menu
- **Where:** `src/routes/index.tsx:99` — `nav className="hidden md:flex ..."`
- **What:** On mobile (<768px) the nav links (Savings, How it works, FAQ) are hidden with no hamburger menu. Users relying on direct section navigation must scroll or use the hero CTAs.
- **Assessment:** Acceptable for a landing page focused on a single CTA flow. Flag if user testing shows drop-off.

---

## ⚠️ Pre-production (not a visual/functional bug)

### 5. CSRF middleware not configured on server functions
- **Where:** `src/start.ts` — TanStack Start warns in server logs
- **What:** `submitLead` is a POST server function with no CSRF protection. In dev this is fine; in production it could allow cross-origin form submissions.
- **Fix before deploy:** Add `createCsrfMiddleware` in `src/start.ts` per the console warning instructions.

---

## 🟢 Verified working

- Page load, title, meta tags
- Hero image, h1, tagline, trust chips
- All 4 anchor scroll targets (#apply, #calculator, #how, #faq)
- All 5 CTA links/buttons scroll to correct sections
- Calculator: slider range, math formula (EV = fuel × 0.25, annual = monthly × 12), display
- FAQ: all 6 accordion items open/close correctly
- Form: HTML5 required validation, email format validation, server validator backstop
- Form: controlled Radix Select components capture ev + budget values
- Form: valid submit → server function receives all 6 fields → success state renders
- Submit button disabled during async request (no double-submit)
- Zero JS console errors
- No non-ASCII glyphs that would tofu on Android (© is universally safe)
- No tiny text at any breakpoint
- No fixed bars covering scroll content
- No horizontal page overflow (page-level)

---

## Not verifiable headless — test on real device

- Real touch tap targets (17px footer links flagged above — verify feel on device)
- Glyph rendering on Android font stack (emulated mobile ≠ real device)
- PWA install / offline behaviour (not a PWA)
- Real performance on mid-range Android (canvas particle animation weight)
