"use client";

/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities */
import { useState, useEffect, type ChangeEvent, type MouseEvent } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Outfit:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Outfit', sans-serif; color: #1a1a1a; background: #fff; }
  .fd { font-family: 'Playfair Display', serif; }
  .gold { color: #c8a84b; }
  .bg-gold { background: #c8a84b; }
  a { text-decoration: none; color: inherit; }
  img { display: block; max-width: 100%; }
  .page-banner {
    background: #111;
    padding: 120px 0 56px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .page-banner::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(200,168,75,0.15) 0%, transparent 60%);
  }
  .page-banner h1 { font-family:'Playfair Display',serif; font-size: clamp(32px,5vw,52px); color:#fff; position:relative; z-index:1; }
  .page-banner .breadcrumb { position:relative; z-index:1; margin-top:10px; font-size:13px; color:#aaa; }
  .page-banner .breadcrumb a { color:#c8a84b; }
  .section-label { font-size:11px; letter-spacing:0.25em; text-transform:uppercase; color:#c8a84b; font-weight:700; }
  .divider { width:48px; height:2px; background:#c8a84b; margin:14px auto; }
  .divider.left { margin:14px 0; }
  .btn-gold { display:inline-block; background:#c8a84b; color:#fff; font-weight:600; font-size:13px; padding:12px 30px; border-radius:4px; transition:background 0.2s; cursor:pointer; border:none; }
  .btn-gold:hover { background:#b8942e; }
  .btn-outline { display:inline-block; border:2px solid #c8a84b; color:#c8a84b; font-weight:600; font-size:13px; padding:10px 28px; border-radius:4px; transition:all 0.2s; }
  .btn-outline:hover { background:#c8a84b; color:#fff; }
  .card { background:#fff; border:1px solid #eee; border-radius:8px; overflow:hidden; transition:box-shadow 0.25s, transform 0.25s; }
  .card:hover { box-shadow:0 12px 32px rgba(0,0,0,0.10); transform:translateY(-4px); }
  .section { padding: 80px 0; }
  .section.gray { background:#f8f8f8; }
  .section.dark { background:#111; }
  .container { max-width:1200px; margin:0 auto; padding:0 24px; }
  .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
  .grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
  .grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
  @media(max-width:900px){
    .grid-2{grid-template-columns:1fr;}
    .grid-3{grid-template-columns:1fr 1fr;}
    .grid-4{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:560px){
    .grid-3{grid-template-columns:1fr;}
    .grid-4{grid-template-columns:1fr;}
    .section{padding:56px 0;}
  }
  /* Top info bar */
  .topbar { background:#111; border-bottom:1px solid rgba(255,255,255,0.08); padding:8px 0; }
  .topbar-inner { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px; }
  .topbar a,.topbar span { font-size:12px; color:#ccc; display:inline-flex; align-items:center; gap:6px; }
  .topbar a:hover { color:#c8a84b; }
  .topbar-right { display:flex; gap:20px; }
  /* Navbar */
  .navbar { position:fixed; top:0; left:0; right:0; z-index:100; }
  .navbar-topbar { background:#111; border-bottom:1px solid rgba(255,255,255,0.1); padding:7px 0; transition:all 0.3s; }
  .navbar-topbar.hidden { height:0; overflow:hidden; padding:0; opacity:0; }
  .navbar-main { background:#fff; box-shadow:0 2px 16px rgba(0,0,0,0.10); transition:background 0.3s; }
  .navbar-main.on-hero { background:rgba(15,15,15,0.55); backdrop-filter:blur(8px); box-shadow:none; }
  .navbar-main.on-hero .nav-link { color:rgba(255,255,255,0.9); }
  .navbar-main.on-hero .nav-logo-text { color:#fff; }
  .navbar-main.on-hero .hamburger span { background:#fff; }
  .nav-inner { display:flex; align-items:center; justify-content:space-between; height:64px; }
  .nav-links { display:flex; align-items:center; gap:28px; }
  .nav-link { font-size:13.5px; font-weight:500; transition:color 0.2s; color:#222; }
  .nav-link:hover,.nav-link.active { color:#c8a84b !important; }
  .nav-cta { background:#c8a84b; color:#fff !important; padding:8px 20px; border-radius:4px; font-weight:600; font-size:13px; }
  .nav-cta:hover { background:#b8942e !important; color:#fff !important; }
  .hamburger { display:none; background:none; border:none; cursor:pointer; flex-direction:column; gap:5px; }
  .hamburger span { display:block; width:24px; height:2px; background:#333; transition:background 0.3s; }
  .navbar-main.on-hero .hamburger span { background:#fff; }
  @media(max-width:860px){
    .nav-links{display:none;}
    .hamburger{display:flex;}
    .topbar-right{display:none;}
    .mobile-menu { position:fixed; top:0; left:0; right:0; bottom:0; background:#111; z-index:200; display:flex; flex-direction:column; padding:32px 24px; }
    .mobile-menu a { color:#fff; font-size:20px; font-family:'Playfair Display',serif; padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.08); display:block; }
    .mobile-menu a:hover { color:#c8a84b; }
  }
  /* Hero */
  .hero { position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; padding-top:104px; }
  .hero img.bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
  .hero-overlay { position:absolute; inset:0; background:linear-gradient(105deg,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.3) 55%,rgba(0,0,0,0.05) 100%); }
  .hero-content { position:relative; z-index:2; max-width:600px; }
  .hero h1 { font-family:'Playfair Display',serif; font-size:clamp(36px,6vw,68px); color:#fff; line-height:1.12; margin-bottom:18px; }
  .hero p { color:rgba(255,255,255,0.82); font-size:16px; line-height:1.7; margin-bottom:28px; }
  .hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
  /* Stats bar */
  .stats-bar { background:#111; padding:36px 0; }
  .stats-grid { display:grid; grid-template-columns:repeat(5,1fr); text-align:center; gap:16px; }
  @media(max-width:700px){ .stats-grid{grid-template-columns:repeat(2,1fr);} }
  /* Service card */
  .svc-card { padding:32px 28px; border:1px solid #ebebeb; border-radius:8px; transition:all 0.25s; background:#fff; }
  .svc-card:hover { border-color:#c8a84b; box-shadow:0 8px 28px rgba(200,168,75,0.12); transform:translateY(-4px); }
  .svc-icon { font-size:36px; margin-bottom:16px; }
  /* Portfolio card */
  .port-card { position:relative; overflow:hidden; border-radius:8px; cursor:pointer; }
  .port-card img { width:100%; height:240px; object-fit:cover; transition:transform 0.4s; }
  .port-card:hover img { transform:scale(1.06); }
  .port-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 55%); display:flex; flex-direction:column; justify-content:flex-end; padding:20px; }
  /* FAQ */
  .faq-item { border:1px solid #eee; border-radius:8px; margin-bottom:10px; overflow:hidden; }
  .faq-q { width:100%; text-align:left; background:none; border:none; padding:18px 20px; font-size:15px; font-weight:600; cursor:pointer; display:flex; justify-content:space-between; align-items:center; color:#1a1a1a; }
  .faq-q.open { color:#c8a84b; }
  .faq-a { padding:0 20px 18px; color:#555; font-size:14px; line-height:1.75; }
  /* Footer */
  .footer { background:#111; color:#aaa; padding:64px 0 0; }
  .footer-grid { display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; margin-bottom:48px; }
  @media(max-width:860px){ .footer-grid{grid-template-columns:1fr 1fr;} }
  @media(max-width:480px){ .footer-grid{grid-template-columns:1fr;} }
  .footer h4 { color:#fff; font-size:13px; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:20px; }
  .footer a:hover { color:#c8a84b; }
  .footer-bottom { border-top:1px solid rgba(255,255,255,0.08); padding:20px 0; font-size:12px; }
  /* Contact form */
  .form-group { margin-bottom:18px; }
  .form-group label { display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#444; }
  .form-group input, .form-group textarea, .form-group select {
    width:100%; padding:12px 14px; border:1px solid #ddd; border-radius:6px; font-size:14px;
    font-family:'Outfit',sans-serif; outline:none; transition:border 0.2s;
  }
  .form-group input:focus,.form-group textarea:focus { border-color:#c8a84b; }
  /* Info box */
  .info-box { display:flex; gap:16px; align-items:flex-start; padding:20px; border-radius:8px; background:#f8f8f8; }
  .info-icon { width:42px; height:42px; border-radius:50%; background:#c8a84b; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:18px; }
  /* Marquee */
  .marquee-wrap { overflow:hidden; }
  .marquee-track { display:flex; gap:48px; animation:marquee 28s linear infinite; width:max-content; }
  .marquee-track:hover { animation-play-state:paused; }
  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  /* Scroll to top */
  .scroll-top { position:fixed; bottom:24px; right:24px; z-index:99; width:44px; height:44px; border-radius:50%; background:#c8a84b; color:#fff; border:none; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(0,0,0,0.2); }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SERVICES = [
  { icon: "🏛️", title: "Exhibition Stall Design & Build", desc: "Complete design-to-build solutions for world-class exhibition stalls — from concept sketches to on-site installation." },
  { icon: "🤝", title: "B2B Event Management", desc: "End-to-end event management for impactful business-to-business experiences and corporate events." },
  { icon: "🏢", title: "Office Branding", desc: "Transform your workspace into a powerful brand statement with our interior and signage solutions." },
  { icon: "📢", title: "Advertising & Print", desc: "Creative advertising campaigns and high-quality print materials that amplify your brand voice." },
  { icon: "💻", title: "Digital Communication", desc: "Cutting-edge digital strategies including social media, motion graphics, and brand identity design." },
  { icon: "🛍️", title: "Retail Design", desc: "Immersive retail environments that drive customer engagement, footfall, and sales conversions." },
];

const PORTFOLIO = [
  { title: "Acetech 2024", tag: "Domestic", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
  { title: "Bharat Tex", tag: "Domestic", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80" },
  { title: "Schweissen — Germany", tag: "International", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80" },
  { title: "Cosmoprof India", tag: "Domestic", img: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&q=80" },
  { title: "TISE — Las Vegas", tag: "International", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { title: "Plastindia", tag: "Mezzanine", img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80" },
];

const CLIENTS_ROW1 = [
  { name: "Welspun Living", logo: "https://logo.clearbit.com/welspunliving.com" },
  { name: "Ador", logo: "https://logo.clearbit.com/adorwelding.com" },
  { name: "DuPont", logo: "https://logo.clearbit.com/dupont.com" },
  { name: "L&T", logo: "https://logo.clearbit.com/larsentoubro.com" },
  { name: "Godrej", logo: "https://logo.clearbit.com/godrej.com" },
  { name: "AIS Glass", logo: "https://logo.clearbit.com/aisglass.com" },
  { name: "Johnson Lifts", logo: "https://logo.clearbit.com/johnsonlifts.com" },
];

const FAQS = [
  { q: "Do you design customized exhibition stalls?", a: "Yes, every stall we design is 100% custom — tailored to your brand identity, booth size, industry, and budget. We don't do off-the-shelf." },
  { q: "What is the typical timeline from design to installation?", a: "For standard stalls, the process takes 3–5 weeks from design approval to installation. Larger or international projects are planned 6–10 weeks in advance." },
  { q: "Do you provide 3D designs before fabrication?", a: "Absolutely. We provide photorealistic 3D renders so you can visualize every detail before a single piece is fabricated. Revisions are included." },
  { q: "Do you handle post-event dismantling and logistics?", a: "Yes. We offer complete end-to-end services including on-site installation, live supervision, post-event dismantling, packing, and transport." },
  { q: "Can you execute international exhibition projects?", a: "Yes — we have successfully executed projects in Germany, USA, UAE, and multiple Asian markets. We handle all logistics, travel, and coordination." },
];

const REVIEWS = [
  { name: "Nishant Shah", date: "Apr 2025", text: "Outstanding service for our US exhibition stall. 15+ years of working together — they never disappoint.", rating: 5 },
  { name: "Amit Joshi", date: "Jul 2024", text: "Their team listened to our vision and crafted a stunning booth. We received constant compliments from attendees.", rating: 5 },
  { name: "Aryan A", date: "Jun 2024", text: "Truly exceptional. They brought our vision to life with a unique design that stood out from every other stall.", rating: 5 },
];

/* ─────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#f5a623">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
    </div>
  );
}

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  const [ok, setOk] = useState(true);
  const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2);

  const handleMouseEnter = (e: MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.filter = "none";
    e.currentTarget.style.opacity = "1";
  };

  const handleMouseLeave = (e: MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.filter = "grayscale(100%)";
    e.currentTarget.style.opacity = "0.7";
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "140px", height: "64px" }}>
      {ok ? (
        <img
          src={logo}
          alt={name}
          onError={() => setOk(false)}
          style={{ maxHeight: "44px", maxWidth: "130px", objectFit: "contain", filter: "grayscale(100%)", opacity: 0.7, transition: "all 0.3s" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <span style={{ fontWeight: 700, fontSize: "15px", color: "#888" }}>{initials}</span>
      )}
    </div>
  );
}

function PageBanner({ title, crumb }: { title: string; crumb: string }) {
  return (
    <div className="page-banner" style={{ paddingTop: "110px" }}>
      <h1>{title}</h1>
      <div className="breadcrumb">
        <Link to="/">Home</Link> &nbsp;/&nbsp; {crumb}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar(props: { enquiryOpen: boolean; setEnquiryOpen: (value: boolean) => void }) {
  const { setEnquiryOpen } = props;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = isHome && !scrolled;

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="navbar">
        {/* TOP INFO BAR — always dark */}
        <div className={`navbar-topbar${scrolled ? " hidden" : ""}`}>
          <div className="container">
            <div className="topbar-inner">
              <span style={{ fontSize: "12px", color: "#bbb" }}>
                🏆 Award-Winning Exhibition Stall Design & Fabrication Company
              </span>
              <div className="topbar-right">
                <a href="tel:+919999441619" style={{ fontSize: "12px", color: "#ccc", display: "flex", alignItems: "center", gap: "5px" }}>
                  📞 <span>+91-9999441619 / +91-9911619759</span>
                </a>
                <a href="mailto:shreevinayakdesigns@gmail.com" style={{ fontSize: "12px", color: "#ccc", display: "flex", alignItems: "center", gap: "5px" }}>
                  ✉️ <span>shreevinayakdesigns@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAV BAR */}
        <div className={`navbar-main${onHero ? " on-hero" : ""}`}>
          <div className="container">
            <div className="nav-inner">
              {/* Logo */}
              <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                <div style={{
                  width: "38px", height: "38px", background: "#c8a84b", borderRadius: "6px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 900, fontSize: "16px", fontFamily: "'Playfair Display',serif", flexShrink: 0
                }}>S</div>
                <span className="nav-logo-text fd" style={{ fontSize: "19px", fontWeight: 700, lineHeight: 1.2, color: onHero ? "#fff" : "#111" }}>
                  Shree Vinayak<br />
                  <span style={{ color: "#c8a84b", fontSize: "13px", fontWeight: 600, fontFamily: "'Outfit',sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>Designs</span>
                </span>
              </Link>

              {/* Desktop links */}
              <div className="nav-links">
                {links.map(l => (
                  <NavLink key={l.to} to={l.to} end
                    className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                    style={{ color: onHero ? "rgba(255,255,255,0.9)" : "#222" }}>
                    {l.label}
                  </NavLink>
                ))}
                <a href="tel:+919999441619"
                  style={{ fontSize: "13px", fontWeight: 600, color: onHero ? "rgba(255,255,255,0.85)" : "#555", display: "flex", alignItems: "center", gap: "5px" }}>
                  📞 +91-9999441619 / +91-9911619759
                </a>
                <button className="nav-cta" onClick={() => setEnquiryOpen(true)}>Get Enquiry</button>
              </div>

              {/* Hamburger */}
              <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)}
            style={{ alignSelf: "flex-end", background: "none", border: "none", color: "#fff", fontSize: "28px", cursor: "pointer", marginBottom: "16px" }}>✕</button>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display',serif" }}>
              Shree Vinayak <span style={{ color: "#c8a84b" }}>Designs</span>
            </div>
          </div>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end onClick={() => setMenuOpen(false)}>{l.label}</NavLink>
          ))}
          <div style={{ marginTop: "24px", padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <a href="tel:+919999441619" style={{ color: "#c8a84b", fontSize: "14px", display: "block", marginBottom: "8px" }}>📞 +91-9999441619 / +91-9911619759</a>
            <a href="mailto:shreevinayakdesigns@gmail.com" style={{ color: "#aaa", fontSize: "13px", display: "block", marginBottom: "20px" }}>✉️ shreevinayakdesigns@gmail.com</a>
          </div>
          <button className="btn-gold" onClick={() => { setMenuOpen(false); setEnquiryOpen(true); }}>Get Enquiry</button>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="fd" style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "14px" }}>
              Shree Vinayak <span className="gold">Designs</span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.8, marginBottom: "18px" }}>
              Award-winning 360° exhibition stall design company serving brands across India and globally since 1998.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["FB", "IG", "LI", "YT"].map(s => (
                <a key={s} href="#" style={{ width: "34px", height: "34px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#aaa", fontWeight: 600 }}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            {[["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Portfolio", "/portfolio"], ["Contact", "/contact"]].map(([l, h]) => (
              <div key={l} style={{ marginBottom: "8px" }}><Link to={h} style={{ fontSize: "13px", color: "#aaa" }}>→ {l}</Link></div>
            ))}
          </div>
          <div>
            <h4>Services</h4>
            {["Exhibition Stall Design", "Stall Fabrication", "B2B Events", "Office Branding", "Retail Design", "Digital Marketing"].map(s => (
              <div key={s} style={{ marginBottom: "8px" }}><a href="#" style={{ fontSize: "13px", color: "#aaa" }}>→ {s}</a></div>
            ))}
          </div>
          <div>
            <h4>Contact Us</h4>
            <div style={{ fontSize: "13px", lineHeight: 2 }}>
              <div>📞 <a href="tel:+919999441619" style={{ color: "#aaa" }}>+91-9999441619</a></div>
              <div>📞 <a href="tel:+919911619759" style={{ color: "#aaa" }}>+91-9911619759</a></div>
              <div>✉️ <a href="mailto:shreevinayakdesigns@gmail.com" style={{ color: "#aaa" }}>shreevinayakdesigns@gmail.com</a></div>
              <div style={{ marginTop: "8px", color: "#888", lineHeight: 1.7 }}>
                1/4886, Street No. 8,<br />
                Balbir Nagar Extension, Shahdara,<br />
                Delhi - 110032
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span>© 2026 Shree Vinayak Designs. All rights reserved.</span>
            <span>Designed with ♥ in Delhi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   ENQUIRY MODAL
───────────────────────────────────────── */
function EnquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  type EnquiryForm = { name: string; email: string; phone: string; message: string };
  const [form, setForm] = useState<EnquiryForm>({ name: "", email: "", phone: "", message: "" });

  const updateField = (field: keyof EnquiryForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "#fff", borderRadius: "12px", maxWidth: "480px", width: "100%", padding: "36px", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "20px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#999" }}>✕</button>
        <div className="fd" style={{ fontSize: "22px", fontWeight: 700, marginBottom: "6px" }}>Submit Enquiry</div>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "24px" }}>Fill in the details and we&apos;ll get back to you within 24 hours.</p>
        {([
          { key: "name", placeholder: "Your Name", type: "text" },
          { key: "email", placeholder: "Email Address", type: "email" },
          { key: "phone", placeholder: "Phone Number", type: "tel" },
        ] as Array<{ key: keyof EnquiryForm; placeholder: string; type: string }>).map(({ key, placeholder, type }) => (
          <div className="form-group" key={key}>
            <input type={type} placeholder={placeholder} value={form[key]} onChange={updateField(key)} />
          </div>
        ))}
        <div className="form-group">
          <textarea placeholder="Your Message" rows={4} value={form.message} onChange={updateField("message")} style={{ resize: "none" }} />
        </div>
        <button className="btn-gold" style={{ width: "100%" }} onClick={onClose}>Submit Enquiry</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE: HOME
═══════════════════════════════════════════ */
function HomePage({ setEnquiryOpen }: { setEnquiryOpen: (value: boolean) => void }) {
  const [filter, setFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered = filter === "All" ? PORTFOLIO : PORTFOLIO.filter(p => p.tag === filter);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <img className="bg" src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1800&q=90" alt="Exhibition" />
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <p className="section-label" style={{ color: "#c8a84b", marginBottom: "14px" }}>Exhibition Stall Designer in India</p>
            <h1>Exhibitions<br />Meet <span className="gold">Innovation</span></h1>
            <p>Award-winning 360° exhibition stall design & fabrication company with 27+ years of delivering world-class brand experiences across India and globally.</p>
            <div className="hero-btns">
              <button className="btn-gold" onClick={() => setEnquiryOpen(true)}>Get a Free Quote</button>
              <Link to="/portfolio" className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.6)" }}>View Portfolio</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {[["27+", "Years Experience"], ["2700+", "Stalls Executed"], ["500+", "Happy Clients"], ["94%", "Repeat Clients"], ["20+", "Awards Won"]].map(([v, l]) => (
              <div key={l}>
                <div className="fd gold" style={{ fontSize: "36px", fontWeight: 700 }}>{v}</div>
                <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT INTRO */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80" alt="About" style={{ borderRadius: "8px", width: "100%", height: "420px", objectFit: "cover" }} />
            </div>
            <div>
              <p className="section-label">About Shree Vinayak Designs</p>
              <div className="divider left" />
              <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700, lineHeight: 1.25, margin: "0 0 20px" }}>
                India's Premier Exhibition Stall Design Company
              </h2>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.8, marginBottom: "16px" }}>
                Based in Delhi, Shree Vinayak Designs is a unique resource-based exhibition company offering a comprehensive range of services — from planning and stall design to event management, office branding, and digital communication.
              </p>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.8, marginBottom: "28px" }}>
                With extensive experience, we have expanded our services to include domestic and international markets including Germany, USA, and UAE, serving 500+ brands with excellence and consistency.
              </p>
              <Link to="/about" className="btn-gold">Know More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="section-label">What We Do</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700 }}>Explore Our Services</h2>
          </div>
          <div className="grid-3">
            {SERVICES.map(s => (
              <div key={s.title} className="svc-card">
                <div className="svc-icon">{s.icon}</div>
                <h3 className="fd" style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ color: "#666", fontSize: "13px", lineHeight: 1.75, marginBottom: "16px" }}>{s.desc}</p>
                <Link to="/services" style={{ fontSize: "13px", color: "#c8a84b", fontWeight: 600 }}>Read More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO GLIMPSE */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <p className="section-label">Exhibition</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700, marginBottom: "24px" }}>Glimpses of Our Stalls</h2>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {["All", "Domestic", "International", "Mezzanine"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ padding: "7px 20px", borderRadius: "20px", border: `1px solid ${filter === f ? "#c8a84b" : "#ddd"}`, background: filter === f ? "#c8a84b" : "#fff", color: filter === f ? "#fff" : "#555", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid-3">
            {filtered.map((p, i) => (
              <div key={i} className="port-card">
                <img src={p.img} alt={p.title} />
                <div className="port-overlay">
                  <span style={{ fontSize: "10px", background: "#c8a84b", color: "#fff", padding: "3px 10px", borderRadius: "20px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "6px", display: "inline-block" }}>{p.tag}</span>
                  <h3 style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: "16px", fontWeight: 700 }}>{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link to="/portfolio" className="btn-gold">View More</Link>
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="section gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p className="section-label">Our Clients</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700 }}>Trusted by Industry Leaders</h2>
          </div>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...CLIENTS_ROW1, ...CLIENTS_ROW1].map((c, i) => <ClientLogo key={i} name={c.name} logo={c.logo} />)}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="section-label">Client Feedback</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700 }}>What Our Clients Say</h2>
          </div>
          <div className="grid-3">
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ padding: "28px", border: "1px solid #eee", borderRadius: "8px", background: "#fff" }}>
                <Stars count={r.rating} />
                <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.8, margin: "14px 0 18px" }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#c8a84b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px" }}>{r.name}</div>
                    <div style={{ fontSize: "12px", color: "#aaa" }}>{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section gray">
        <div className="container" style={{ maxWidth: "780px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p className="section-label">FAQ</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700 }}>Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item">
              <button className={`faq-q${openFaq === i ? " open" : ""}`} onClick={() => setOpenFaq((current) => (current === i ? null : i))}>
                {f.q} <span style={{ fontSize: "20px", lineHeight: 1 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "#c8a84b", padding: "60px 0", textAlign: "center" }}>
        <div className="container">
          <h2 className="fd" style={{ color: "#fff", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, marginBottom: "12px" }}>
            Ready to Make an Impact at Your Next Exhibition?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "28px", fontSize: "15px" }}>Let's build something extraordinary together.</p>
          <button className="btn-outline" style={{ borderColor: "#fff", color: "#fff" }} onClick={() => setEnquiryOpen(true)}>Get in Touch</button>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════
   PAGE: ABOUT
═══════════════════════════════════════════ */
function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" crumb="About Us" />

      {/* 1. WELCOME */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <p className="section-label">Welcome</p>
              <div className="divider left" />
              <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, lineHeight: 1.25, marginBottom: "20px" }}>
                Welcome to Shree Vinayak Designs
              </h2>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.9, marginBottom: "16px" }}>
                "If your actions inspire others to dream more, learn more, do more, and become more, you are a leader." With this simple thought in mind and driven by the motto <strong style={{ color: "#111" }}>"Creativity, Designing and Fabrication"</strong>, Shree Vinayak Designs has rapidly established itself as a growth leader in the exhibition industry in India.
              </p>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.9, marginBottom: "16px" }}>
                The pride of being the team in India too have under the umbrella of an experienced team — all this is aimed toward creating sustainable creative stalls and workplaces which are ecologically friendly.
              </p>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.9, marginBottom: "24px" }}>
                Shree Vinayak Designs is perhaps one of its kind — the only company that handles stall Designing in one hand and Fabrication & Dismantling in another. Our consistent quality services and results will nurture your trust in our company, resulting in growth for both companies.
              </p>
              <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
                {[["500+", "Happy Clients"], ["100%", "Custom Design"], ["360°", "Services"]].map(([v, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div className="fd gold" style={{ fontSize: "28px", fontWeight: 700 }}>{v}</div>
                    <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80" alt="Welcome" style={{ borderRadius: "8px", width: "100%", height: "430px", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: "-16px", left: "-16px", background: "#c8a84b", color: "#fff", padding: "18px 24px", borderRadius: "6px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                <div className="fd" style={{ fontSize: "13px", fontStyle: "italic", maxWidth: "200px", lineHeight: 1.6 }}>
                  "Creativity, Designing and Fabrication"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT COMPANY */}
      <section className="section gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="section-label">About the Company</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700 }}>Who We Are</h2>
          </div>
          <div className="grid-2">
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80",
                  "https://images.unsplash.com/photo-1561489401-fc2876ced162?w=400&q=80",
                  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400&q=80",
                  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
                ].map((src, i) => (
                  <img key={i} src={src} alt="Company" style={{ borderRadius: "6px", width: "100%", height: "185px", objectFit: "cover" }} />
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.9, marginBottom: "16px" }}>
                Shree Vinayak Designs is an organization that provides services related to <strong style={{ color: "#111" }}>Stall Designing, Stall Fabrication, Installation, and Dismantling Services</strong> for their Clients.
              </p>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.9, marginBottom: "16px" }}>
                The organization has grown on the premise that nothing beats our personalized service, experience, and attention to detail. In the Exhibition Industry, Shree Vinayak Designs is dedicated to adding significant value to exhibition & Stall Designing. Our prime concern is to enhance our client's business through our services.
              </p>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.9, marginBottom: "24px" }}>
                As a group of teams working side by side, we aspire for a luxurious and creative stall Designing — a place where creativity and fabrication are all equal and integrated organically. We work with the belief that <strong style={{ color: "#111" }}>process and collaboration should be as exciting and fun as the result.</strong>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Stall Designing", "Stall Fabrication", "Installation", "Dismantling", "Creative & Unique"].map(t => (
                  <span key={t} style={{ fontSize: "12px", fontWeight: 600, padding: "5px 14px", border: "1px solid #c8a84b", color: "#c8a84b", borderRadius: "20px" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW WE OPERATE */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="section-label">Our Approach</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, marginBottom: "16px" }}>How We Operate</h2>
            <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.85, maxWidth: "720px", margin: "0 auto" }}>
              The work approach is one of the prime factors that outstands us among other organizations in this league. Our professionals are thoroughly briefed about treating clients with care yet in a professional manner.
            </p>
          </div>
          <div className="grid-4">
            {[
              { step: "01", icon: "🎯", title: "Client Consultation", desc: "We listen carefully to every client's vision, brand goals, and exhibition requirements before anything else." },
              { step: "02", icon: "✏️", title: "Creative Design", desc: "Our design team crafts unique, creative stall concepts tailored specifically to attract and engage your buyers." },
              { step: "03", icon: "🔨", title: "Fabrication", desc: "We handle end-to-end stall fabrication within our specialized facility, maintaining the highest quality standards." },
              { step: "04", icon: "🏁", title: "Installation & Dismantling", desc: "Our expert team manages complete on-site installation and post-event dismantling — hassle-free for you." },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "36px 22px", border: "1px solid #eee", borderRadius: "8px", position: "relative", background: "#fff", transition: "box-shadow 0.2s" }}>
                <div style={{ position: "absolute", top: "12px", right: "14px", fontFamily: "'Playfair Display',serif", fontSize: "40px", fontWeight: 900, color: "rgba(200,168,75,0.1)", lineHeight: 1 }}>{s.step}</div>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{s.icon}</div>
                <h3 className="fd" style={{ fontSize: "17px", fontWeight: 700, marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ color: "#666", fontSize: "13px", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION & 5. MISSION */}
      <section className="section gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="section-label">Our Purpose</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700 }}>Vision & Mission</h2>
          </div>
          <div className="grid-2" style={{ marginBottom: "40px" }}>
            {/* VISION */}
            <div className="card">
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&q=80" alt="Vision" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "16px", left: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "38px", height: "38px", background: "#c8a84b", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🔭</div>
                  <span className="fd" style={{ color: "#fff", fontSize: "22px", fontWeight: 700 }}>Our Vision</span>
                </div>
              </div>
              <div style={{ padding: "28px" }}>
                <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.9 }}>
                  Our vision is to become a leading service-providing company in Stall Fabrication and to nurture the thought of stall designing through spreading <strong style={{ color: "#111" }}>Creative ideas, distinctive work services, and innovation.</strong>
                </p>
              </div>
            </div>

            {/* MISSION */}
            <div className="card">
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=700&q=80" alt="Mission" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "16px", left: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "38px", height: "38px", background: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🚀</div>
                  <span className="fd" style={{ color: "#fff", fontSize: "22px", fontWeight: 700 }}>Our Mission</span>
                </div>
              </div>
              <div style={{ padding: "28px" }}>
                <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.9 }}>
                  Our mission is to satisfy every client & member's need for a better experience through quality service. We are committed to <strong style={{ color: "#111" }}>adding value to our client's name and changing lives through our remarkable services.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* CORE VALUES */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <p className="section-label">What We Stand For</p>
            <div className="divider" />
            <h3 className="fd" style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 700 }}>Our Core Values</h3>
          </div>
          <div className="grid-4">
            {[
              { icon: "🌟", title: "Deliver WOW Through Service", desc: "We go above and beyond to create experiences that truly wow our clients at every touchpoint." },
              { icon: "💡", title: "Be Creative & Open-Minded", desc: "We embrace fresh thinking, bold ideas, and an open mind to every challenge we face." },
              { icon: "📈", title: "Pursue Growth & Learning", desc: "We are committed to continuous improvement — for ourselves, our team, and our clients." },
              { icon: "🤝", title: "Open & Honest Relationships", desc: "We build transparent, communicative relationships that stand the test of time." },
              { icon: "👨‍👩‍👧", title: "Positive Team & Family Spirit", desc: "We foster a supportive, collaborative environment where everyone thrives together." },
              { icon: "⚡", title: "Do More With Less", desc: "We deliver maximum value through smart, efficient processes and resourceful thinking." },
              { icon: "🔥", title: "Be Passionate & Determined", desc: "Every project gets our full passion and determination — no matter the size or scope." },
              { icon: "🙏", title: "Be Humble", desc: "We stay grounded, listen actively, and never stop learning from our clients and team." },
            ].map(v => (
              <div key={v.title} style={{ textAlign: "center", padding: "24px 18px", border: "1px solid #eee", borderRadius: "8px", background: "#fff" }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>{v.icon}</div>
                <h4 className="fd" style={{ fontWeight: 700, fontSize: "14px", marginBottom: "8px", color: "#111" }}>{v.title}</h4>
                <p style={{ color: "#777", fontSize: "12px", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════
   PAGE: SERVICES
═══════════════════════════════════════════ */
function ServicesPage({ setEnquiryOpen }: { setEnquiryOpen: (value: boolean) => void }) {
  return (
    <>
      <PageBanner title="Our Services" crumb="Services" />
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="section-label">What We Offer</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700 }}>Comprehensive Branding Solutions</h2>
            <p style={{ color: "#777", fontSize: "14px", marginTop: "10px", maxWidth: "520px", margin: "10px auto 0" }}>From concept to completion — every service you need to make your brand shine at any exhibition.</p>
          </div>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card" style={{ textAlign: "center" }}>
                <div className="svc-icon">{s.icon}</div>
                <h3 className="fd" style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>{s.title}</h3>
                <p style={{ color: "#666", fontSize: "13px", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section gray">
        <div className="container">
          <div className="grid-2">
            <div>
              <p className="section-label">Why Choose Us</p>
              <div className="divider left" />
              <h2 className="fd" style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, marginBottom: "24px" }}>Delivering Excellence at Every Step</h2>
              {[
                { icon: "🏆", title: "27+ Years of Experience", desc: "Decades of expertise across 50+ industry verticals, delivering flawless stalls consistently." },
                { icon: "🎨", title: "In-house Design Studio", desc: "Our creative team produces photorealistic 3D renders before any fabrication begins." },
                { icon: "🔧", title: "Own Fabrication Unit", desc: "We own our fabrication facility, giving us full quality control and faster turnaround." },
                { icon: "🌍", title: "International Reach", desc: "Successfully executed projects in Germany, USA, UAE, and across Asia." },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", gap: "14px", marginBottom: "20px", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "22px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ color: "#666", fontSize: "13px", lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
              <button className="btn-gold" style={{ marginTop: "8px" }} onClick={() => setEnquiryOpen(true)}>Get a Quote</button>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=700&q=80" alt="Services" style={{ borderRadius: "8px", width: "100%", height: "440px", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════
   PAGE: PORTFOLIO
═══════════════════════════════════════════ */
function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const allItems = [
    ...PORTFOLIO,
    { title: "Aahar Food Expo", tag: "Domestic", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
    { title: "Smart Lift India", tag: "Domestic", img: "https://images.unsplash.com/photo-1561489401-fc2876ced162?w=600&q=80" },
    { title: "Bharat Tex 2024", tag: "Domestic", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80" },
  ];
  const filtered = filter === "All" ? allItems : allItems.filter(p => p.tag === filter);
  return (
    <>
      <PageBanner title="Our Portfolio" crumb="Portfolio" />
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <p className="section-label">Our Work</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, marginBottom: "24px" }}>Exhibition Masterpieces</h2>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {["All", "Domestic", "International", "Mezzanine"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ padding: "7px 20px", borderRadius: "20px", border: `1px solid ${filter === f ? "#c8a84b" : "#ddd"}`, background: filter === f ? "#c8a84b" : "#fff", color: filter === f ? "#fff" : "#555", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid-3">
            {filtered.map((p, i) => (
              <div key={i} className="port-card">
                <img src={p.img} alt={p.title} />
                <div className="port-overlay">
                  <span style={{ fontSize: "10px", background: "#c8a84b", color: "#fff", padding: "3px 10px", borderRadius: "20px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "6px", display: "inline-block" }}>{p.tag}</span>
                  <h3 style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: "16px", fontWeight: 700 }}>{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients in portfolio page */}
      <section className="section gray">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <p className="section-label">Our Clients</p>
            <div className="divider" />
            <h2 className="fd" style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700 }}>Brands We've Represented</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "20px" }}>
            {CLIENTS_ROW1.map((c, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "8px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
                <ClientLogo name={c.name} logo={c.logo} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════
   PAGE: CONTACT
═══════════════════════════════════════════ */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageBanner title="Contact Us" crumb="Contact" />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: "56px" }}>
            {/* Form */}
            <div>
              <p className="section-label">Get In Touch</p>
              <div className="divider left" />
              <h2 className="fd" style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 700, marginBottom: "8px" }}>Send Us a Message</h2>
              <p style={{ color: "#777", fontSize: "14px", marginBottom: "28px" }}>Fill in the form and our team will get back to you within 24 hours.</p>
              {sent ? (
                <div style={{ background: "#f0faf4", border: "1px solid #86efac", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>✅</div>
                  <div style={{ fontWeight: 700, color: "#166534" }}>Message sent successfully!</div>
                  <div style={{ color: "#555", fontSize: "13px", marginTop: "4px" }}>We'll get back to you within 24 hours.</div>
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div className="form-group"><input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                    <div className="form-group"><input placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                    <div className="form-group"><input placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                    <div className="form-group"><input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></div>
                  </div>
                  <div className="form-group"><textarea placeholder="Your Message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "none" }} /></div>
                  <button className="btn-gold" style={{ width: "100%" }} onClick={() => setSent(true)}>Submit Message</button>
                </>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="section-label">Our Offices</p>
              <div className="divider left" />
              <h2 className="fd" style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 700, marginBottom: "24px" }}>Find Us Here</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                {[
                  { icon: "📍", title: "Corporate Office", info: "1/4886, Street No. 8, Balbir Nagar Extension, Shahdara, Delhi - 110032, India." },
                  { icon: "📍", title: "Delhi Office", info: "1/4886, Street No. 8, Balbir Nagar Extension, Shahdara, Delhi - 110032, India." },
                  { icon: "📞", title: "Phone", info: "+91-9999441619 / +91-9911619759" },
                  { icon: "✉️", title: "Email", info: "shreevinayakdesigns@gmail.com" },
                  { icon: "🕐", title: "Working Hours", info: "Mon – Sat: 9:00 AM – 7:00 PM" },
                ].map(item => (
                  <div key={item.title} className="info-box">
                    <div className="info-icon">{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "3px" }}>{item.title}</div>
                      <div style={{ color: "#666", fontSize: "13px", lineHeight: 1.65 }}>{item.info}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────
   ROOT APP
───────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Router>
      <style>{GLOBAL_CSS}</style>
      <ScrollToTop />
      <Navbar enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
      <main style={{ paddingTop: 0 }}>
        <Routes>
          <Route path="/" element={<HomePage setEnquiryOpen={setEnquiryOpen} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage setEnquiryOpen={setEnquiryOpen} />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage setEnquiryOpen={setEnquiryOpen} />} />
        </Routes>
      </main>
      <Footer />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      {showTop && (
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Back to top">↑</button>
      )}
    </Router>
  );
}