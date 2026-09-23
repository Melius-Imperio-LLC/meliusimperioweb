# Mimperio (mimperio.tech)

The public, client-facing website for Mimperio, a technology company building
data platforms, applied AI workflows, and custom software for development and enterprise.

This is a **production static site**: every page is self-contained (CSS, JavaScript,
and logo are inlined), so each file renders correctly on its own and the whole site
deploys as-is to GitHub Pages. No build step, no framework, no backend, nothing to install.
The only external calls are Google Fonts (typography) and Google Translate (the language
switcher); both are optional and the site degrades gracefully without them.

## Pages

| File               | Purpose                                                        |
|--------------------|----------------------------------------------------------------|
| `index.html`       | Home: animated hero + live terminal, counters, divisions, tabs, pipeline, FAQ |
| `products.html`    | Full product catalog, categorised by division and maturity     |
| `ai-workflows.html`| Applied AI workflows (Division 02)                             |
| `solutions.html`   | Solutions by audience (government, research, enterprise, SMEs)  |
| `pricing.html`     | Engagement models (pilot, subscription, dedicated pod)         |
| `insights.html`    | Meliora Nexus research and field notes                         |
| `about.html`       | Mission, principles, Meliora Nexus research arm, roadmap        |
| `contact.html`     | Contact form (static, endpoint-swappable)                       |
| `404.html`         | Not-found page                                                  |
| `assets/brand/`    | Logo vector + PNG variants (icon, horizontal, square)          |

## Languages

The header has a language switcher powered by Google Translate. Supported languages:

- English (en)
- French / Français (fr)
- Kinyarwanda (rw)
- Kiswahili (sw)
- Amharic / አማርኛ (am)

To change or add languages, edit `includedLanguages: 'en,fr,rw,sw,am'` in the inline
script near the bottom of each page, and the matching buttons in the header markup.
Translation runs in the visitor's browser and requires an internet connection to Google.

## Fonts

Space Grotesk (headings), Manrope (body), Montserrat (logo wordmark), JetBrains Mono
(code/labels), loaded from Google Fonts. If Google Fonts is blocked, the site falls back
to clean system fonts automatically.

## Animations

Scroll-reveal on sections, animated stat counters, a live telemetry terminal, a scrolling
tech marquee, an animated delivery pipeline, an FAQ accordion, and a pulsing logo. All
animations respect the visitor's `prefers-reduced-motion` setting.

## Product taxonomy

Products are grouped into five divisions and tagged by maturity so nothing overclaims:

- **Division 01 Platforms:** GeoInsight, Foresight AI, PolicyFlow, DataGuard, PolicyLab, ModelForge
- **Division 02 Applied AI Workflows:** PolicyBrief AI, Research Copilot, Data-Cleanse Agent, Anomaly Sentinel, Nudge Personalizer, Knowledge Broker
- **Division 03 Agile Tools:** LocalPulse, TrendSense, NudgeKit, PolicySim Lite, Contextualizer, PolicyConnect
- **Division 04 Data Infrastructure and APIs:** DataVerify, DataCleanse API, OpenEcon Hub
- **Division 05 Vertical SaaS:** School Management System, Tax and Advisory Suite

Maturity tags: **Available**, **Beta**, **Pilot**, **Roadmap**. Edit these in the
HTML by changing the `tag` class (`available`, `beta`, `pilot`, `roadmap`).

## Preview locally

```bash
cd mimperio-site
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on GitHub Pages

**Option A, from a branch (simplest):**

1. Create a new GitHub repository and push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial Melius Imperio site"
   git branch -M main
   git remote add origin https://github.com/<your-account>/<your-repo>.git
   git push -u origin main
   ```
2. In the repo, go to **Settings -> Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, branch
   `main`, folder `/ (root)`, and save.
4. Your site goes live at `https://<your-account>.github.io/<your-repo>/`.

**Option B, with the included Actions workflow:**

1. Push the files (including `.github/workflows/deploy.yml`).
2. In **Settings -> Pages**, set **Source** to **GitHub Actions**.
3. Every push to `main` builds and deploys automatically.

The `.nojekyll` file is included so GitHub Pages serves the site untouched.

## Custom domain (mimperio.tech)

1. Create a file named `CNAME` in the repo root containing one line:
   ```
   mimperio.tech
   ```
2. In **Settings -> Pages -> Custom domain**, enter `mimperio.tech` and save.
3. At your DNS provider, point the domain at GitHub Pages:
   - Four `A` records for the apex domain to `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`, or
   - A `CNAME` record for `www` to `<your-account>.github.io`.
4. Enable **Enforce HTTPS** once the certificate is issued.

## Contact form

The form on `contact.html` works with **no backend**. By default it opens the
visitor's email client (mailto). To collect submissions instead:

1. Create a free endpoint (for example at [Formspree](https://formspree.io)).
2. In `contact.html`, set the `data-endpoint` attribute on the `<form>` to your URL:
   ```html
   <form id="contact-form" data-endpoint="https://formspree.io/f/xxxxxxx">
   ```

That is the only place a third party is involved. The site itself ships with no
trackers and no analytics.

## What this site deliberately does not contain

To keep it honest and client-facing:

- No fabricated client names, logos, or testimonials
- No invented team members or staff photos
- No claimed past results or metrics presented as delivered work
- No internal dashboards, credentials, pricing internals, or private data

Maturity tags and capability language describe what the products **are** and what they
**can do**, not client outcomes that have not happened.
