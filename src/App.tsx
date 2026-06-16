import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
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
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
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

      {/* Hero Section */}
      <section id="hero" className="hero">
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

      {/* Servicios Section */}
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

      {/* Portfolio Section */}
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

      {/* Contacto Section */}
      <section id="contacto" className="contacto">
        <div className="section-container">
          <h2 className="section-title">Contacto</h2>
          <div className="contacto-content">
            <div className="contacto-info">
              <h3>¿Tienes un proyecto?</h3>
              <p className="contacto-call">Call us</p>
              <div className="contacto-links">
                <a href="https://www.instagram.com/moveshot" target="_blank" rel="noopener noreferrer" className="contacto-link">
                  <span>@moveshot</span>
                </a>
                <a href="https://www.instagram.com/m_rentalhouse" target="_blank" rel="noopener noreferrer" className="contacto-link">
                  <span>@m_rentalhouse</span>
                </a>
                <a href="https://www.instagram.com/manuelasph" target="_blank" rel="noopener noreferrer" className="contacto-link">
                  <span>@manuelasph</span>
                </a>
                <a href="https://www.instagram.com/nicolerubio_" target="_blank" rel="noopener noreferrer" className="contacto-link">
                  <span>@nicolerubio_</span>
                </a>
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

export default App
