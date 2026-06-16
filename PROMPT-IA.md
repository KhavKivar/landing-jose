# Moveshot Landing Page - Contexto Completo para IA

## 1. Stack Tecnico
- **Framework**: React 19.2.6 + TypeScript + Vite 8.0.16
- **Estilos**: CSS puro (sin frameworks CSS, sin Tailwind, sin MUI)
- **Build Tool**: Vite
- **Deploy Target**: Cloudflare Pages (static hosting)
- **Package Manager**: pnpm
- **CI/CD**: GitHub Actions (auto-deploy on push to main)
- **Repo**: https://github.com/KhavKivar/landing-jose
- **Live URL**: https://landing-jose.pages.dev

## 2. Estructura de Archivos

```
landing-jose/
├── public/
│   ├── Logo MoveShot- AZUL - AALTA.png  # Logo de la empresa (navbar + favicon)
│   ├── favicon.svg
│   ├── icons.svg
│   └── _redirects                          # SPA routing: /* /index.html 200
├── src/
│   ├── App.tsx                             # Landing page completa (5 secciones)
│   ├── App.css                             # Estilos principales (536 lineas)
│   ├── index.css                           # Reset styles + CSS variables
│   ├── main.tsx                            # Entry point React
│   └── assets/
│       ├── hero.png
│       ├── react.svg
│       └── vite.svg
├── .github/workflows/deploy.yml            # Auto-deploy workflow
├── wrangler.toml                           # Config Cloudflare Pages
├── index.html                              # Meta tags + fuente Inter
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .gitignore
```

## 3. Dependencias (package.json)

```json
{
  "dependencies": {
    "react": "^19.2.6",
    "react-dom": "^19.2.6"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.3.0",
    "typescript": "~6.0.2",
    "vite": "^8.0.12",
    "wrangler": "^4.100.0"
  }
}
```

## 4. Configuracion Vite (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**NOTA**: No se usa `@cloudflare/vite-plugin`. Fue eliminado porque generaba un `wrangler.jsonc` conflictivo que rompia el deploy de Cloudflare Pages. El proyecto es puramente estatico.

## 5. Configuracion Cloudflare (wrangler.toml)

```toml
name = "landing-jose"
pages_build_output_dir = "dist"
compatibility_date = "2026-06-16"
```

## 6. GitHub Actions Workflow (.github/workflows/deploy.yml)

```yaml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install
      - run: pnpm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: landing-jose
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

## 7. CSS Variables (index.css + App.css)

```css
:root {
  --bg: #0a0a0a;
  --bg-light: #111111;
  --bg-card: #1a1a1a;
  --text: #e5e5e5;
  --text-muted: #888888;
  --accent: #e6005c;
  --accent-light: #ff1a75;
  --accent-dark: #b30047;
  --white: #ffffff;
  --border: rgba(255,255,255,0.1);
  --font-main: 'Inter', system-ui, -apple-system, sans-serif;
}
```

## 8. Componente App.tsx - Estructura Completa

```typescript
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="app">
      {/* NAVBAR - fija, cambia estilo al scroll */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo: imagen PNG en public/ */}
          <img src="/Logo MoveShot- AZUL - AALTA.png" alt="Moveshot" className="logo-img" onClick={() => scrollTo('hero')} />
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollTo('servicios')}>Servicios</button>
            <button onClick={() => scrollTo('portfolio')}>Portfolio</button>
            <button onClick={() => scrollTo('contacto')}>Contacto</button>
          </div>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="hero">
        {/* Video background de Vimeo (autoplay, muted, loop) */}
        <div className="hero-video-container">
          <iframe 
            src="https://player.vimeo.com/video/1026235321?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            className="hero-video"
            title="Showreel Moveshot"
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-badge">Disponible para Filmar</h1>
          <h2 className="hero-title">Conticemos tu proyecto</h2>
          <p className="hero-subtitle">Jose Miranda Mino | Director & DOP</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollTo('portfolio')}>Ver Portfolio</button>
            <button className="btn-secondary" onClick={() => scrollTo('contacto')}>Contactar</button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
        </div>
      </section>

      {/* SERVICIOS SECTION - 4 cards en grid */}
      <section id="servicios" className="servicios">
        <div className="section-container">
          <h2 className="section-title">Servicios</h2>
          <div className="servicios-grid">
            <div className="servicio-card">
              <div className="servicio-icon">🎬</div>
              <h3>Publicidad</h3>
              <p>Spots comerciales, campañas de marca, product videos y contenido publicitario de alto impacto visual.</p>
            </div>
            <div className="servicio-card">
              <div className="servicio-icon">🎵</div>
              <h3>Music Video</h3>
              <p>Videoclips con estilo cinematográfico. Dirección, fotografía y edición para artistas y sellos discográficos.</p>
            </div>
            <div className="servicio-card">
              <div className="servicio-icon">🎭</div>
              <h3>Ficción</h3>
              <p>Cortometrajes, documentales, series web y piezas narrativas con calidad de producción profesional.</p>
            </div>
            <div className="servicio-card">
              <div className="servicio-icon">📱</div>
              <h3>Content</h3>
              <p>Contenido para redes sociales, reels, tiktoks, backstage y material orgánico para tu marca personal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="portfolio">
        <div className="section-container">
          <h2 className="section-title">Portfolio</h2>
          <div className="portfolio-featured">
            <div className="video-container">
              <iframe 
                src="https://player.vimeo.com/video/1026235321?title=0&byline=0&portrait=0" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                className="portfolio-video"
                title="Video Destacado"
              />
            </div>
            <div className="portfolio-info">
              <h3>Videoclip Destacado</h3>
              <p>Dirección y fotografía por Jose Miranda Mino</p>
            </div>
          </div>
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <div className="portfolio-placeholder">Video 1</div>
              <p>Publicidad - Marca</p>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-placeholder">Video 2</div>
              <p>Music Video - Artist</p>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-placeholder">Video 3</div>
              <p>Ficción - Corto</p>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-placeholder">Video 4</div>
              <p>Content - Social</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO SECTION */}
      <section id="contacto" className="contacto">
        <div className="section-container">
          <h2 className="section-title">Contacto</h2>
          <div className="contacto-content">
            <div className="contacto-info">
              <h3>¿Tienes un proyecto?</h3>
              <p className="contacto-call">Call us</p>
              <div className="contacto-links">
                <a href="https://www.instagram.com/moveshot" target="_blank" rel="noopener noreferrer" className="contacto-link">@moveshot</a>
                <a href="https://www.instagram.com/m_rentalhouse" target="_blank" rel="noopener noreferrer" className="contacto-link">@m_rentalhouse</a>
                <a href="https://www.instagram.com/manuelasph" target="_blank" rel="noopener noreferrer" className="contacto-link">@manuelasph</a>
                <a href="https://www.instagram.com/nicolerubio_" target="_blank" rel="noopener noreferrer" className="contacto-link">@nicolerubio_</a>
              </div>
              <a href="mailto:contacto@moveshot.com" className="btn-primary btn-large">Enviar Email</a>
            </div>
            <div className="contacto-credits">
              <p>© 2026 Moveshot</p>
              <p>Jose Miranda Mino | Director & DOP</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
```

## 9. Datos y Assets

### Video de Vimeo
- **ID**: 1026235321
- **Hero URL**: `https://player.vimeo.com/video/1026235321?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0`
- **Portfolio URL**: `https://player.vimeo.com/video/1026235321?title=0&byline=0&portrait=0`

### Links de Instagram
- @moveshot: https://www.instagram.com/moveshot
- @m_rentalhouse: https://www.instagram.com/m_rentalhouse
- @manuelasph: https://www.instagram.com/manuelasph
- @nicolerubio_: https://www.instagram.com/nicolerubio_

### Perfil del Cliente
- **Nombre**: Jose Miranda Mino
- **Rol**: Director & DOP (Director of Photography)
- **Productora**: Moveshot
- **Instagram**: https://www.instagram.com/josemiraw.mino

### Email
- contacto@moveshot.com

## 10. Estilos Principales (Resumen de App.css)

### Layout
- **Navbar**: Fixed, height ~60px, cambia a fondo oscuro al scroll
- **Hero**: 100vh, video background, overlay gradient
- **Servicios**: Grid 4 cols (desktop), 2 cols (tablet), 1 col (mobile)
- **Portfolio**: Grid 4 cols para items
- **Contacto**: Centered, links en flex-wrap

### Breakpoints
- **Desktop**: > 1024px
- **Tablet**: <= 1024px
- **Mobile**: <= 768px (hamburger menu, grid 1 col, stacked buttons)

### Componentes UI
- `.btn-primary`: Fondo magenta, texto blanco, hover scale
- `.btn-secondary`: Bordado blanco, fondo transparente
- `.section-title`: 48px, bold, underline magenta
- `.servicio-card`: Bordado, hover translateY + shadow
- `.portfolio-placeholder`: Aspect ratio 16:9, border hover

## 11. Secrets de GitHub (para CI/CD)

- `CLOUDFLARE_API_TOKEN`: Token de API de Cloudflare
- `CLOUDFLARE_ACCOUNT_ID`: 9f7618bfc703bddcf325d018550a864c
- `GITHUB_TOKEN`: Proporcionado automáticamente por GitHub

## 12. Comandos Utiles

```bash
# Dev
pnpm dev

# Build
pnpm run build

# Deploy manual
pnpm run deploy

# O directamente:
npx wrangler pages deploy dist --project-name landing-jose
```

## 13. Instrucciones para Otra IA

### Si quieres modificar la landing:
1. **Edita `src/App.tsx`** para cambiar contenido, agregar secciones, modificar links
2. **Edita `src/App.css`** para cambiar colores, espaciado, layout
3. **Build local**: `pnpm run build` (verifica que compile sin errores)
4. **Commit y push**: `git add -A && git commit -m "..." && git push`
5. **Deploy automatico**: El GitHub Action se encarga del deploy a Cloudflare Pages

### Si quieres agregar videos reales al portfolio:
1. Obtener URLs de Vimeo (embed format)
2. Reemplazar los `.portfolio-placeholder` divs con `<iframe>` elementos
3. O mejor aún: crear un array de datos de portfolio y mapearlo

### Si quieres agregar un formulario de contacto:
1. Usar un servicio como Formspree, Netlify Forms, o Cloudflare Workers
2. Agregar un form HTML dentro de la seccion #contacto
3. IMPORTANTE: No agregar backend Node/Express - esto es static site

### NO HACER:
- No agregar `@cloudflare/vite-plugin` - rompe el deploy
- No modificar `wrangler.toml` sin saber
- No cambiar a framework CSS (Tailwind, etc.) sin preguntar primero
- No agregar backend runtime - Cloudflare Pages solo sirve static files

### HACER:
- Mantener todo en React + CSS puro
- Usar `iframes` para videos de Vimeo/YouTube
- Seguir la estructura de secciones existente
- Respetar el color scheme (dark + magenta accent)
- Probar `pnpm run build` antes de pushear

## 14. Estado Actual

- ✅ Landing page completa y funcional
- ✅ Deployado en https://landing-jose.pages.dev
- ✅ Auto-deploy configurado desde main
- ✅ Logo integrado (navbar + favicon)
- ✅ Video de Vimeo integrado
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Links de contacto configurados
- ⚠️ Portfolio placeholders (necesita videos reales)
- ⚠️ Email "contacto@moveshot.com" puede no ser real

---
**Fecha ultima modificacion**: 2026-06-16
**Commit actual**: 5c4c436
