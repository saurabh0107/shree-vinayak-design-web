"use client";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Expos", href: "#expos" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
  { label: "Blogs", href: "#blogs" },
];

const STATS = [
  { value: "27+", label: "Years of Experience" },
  { value: "2700+", label: "Stalls Executed" },
  { value: "500+", label: "Satisfied Clients" },
  { value: "94%", label: "Consistent Clientele" },
  { value: "20+", label: "Awards Won" },
];

const CLIENTS = [
  { name: "Welspun Living", logo: "/clients/welspun-living.svg", bg: "#003082", initials: "WL" },
  { name: "Ador Welding", logo: "/clients/ador-welding.svg", bg: "#c00000", initials: "AW" },
  { name: "Johnson Lifts", logo: "/clients/johnson-lifts.svg", bg: "#1a3c6e", initials: "JL" },
  { name: "AGC Glass", logo: "/clients/agc-glass.svg", bg: "#0057a8", initials: "AG" },
  { name: "Cosmoprof", logo: "/clients/cosmoprof.svg", bg: "#111", initials: "CP" },
  { name: "Plastindia", logo: "/clients/plastindia.svg", bg: "#e84118", initials: "PI" },
  { name: "Shahi Group", logo: "/clients/shahi-group.svg", bg: "#7b2d8b", initials: "SG" },
  { name: "MAS Holdings", logo: "/clients/mas-holdings.svg", bg: "#1e7e34", initials: "MH" },
  { name: "Lafit", logo: "/clients/lafit.svg", bg: "#b8860b", initials: "LF" },
  { name: "Lion-O-Matic", logo: "/clients/lion-o-matic.svg", bg: "#333", initials: "LM" },
];

const SERVICES = [
  { title: "Exhibition Stall Designing and Construction", icon: "🏛️", desc: "Complete design-to-build solutions for world-class exhibition stalls." },
  { title: "B2B Events", icon: "🤝", desc: "End-to-end event management for impactful business-to-business experiences." },
  { title: "Office Branding", icon: "🏢", desc: "Transform your workspace into a powerful brand statement." },
  { title: "Advertising", icon: "📢", desc: "Creative advertising campaigns that amplify your brand voice." },
  { title: "Digital Communication", icon: "💻", desc: "Cutting-edge digital strategies that connect and convert." },
  { title: "Retail Design", icon: "🛍️", desc: "Immersive retail environments that drive engagement and sales." },
];

const PORTFOLIO_ITEMS = [
  { title: "Tailored Projects", desc: "Each project is meticulously crafted to meet your specific needs.", tag: "Domestic", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
  { title: "Innovative Creative Solutions", desc: "Break through the mundane with imaginative and original designs.", tag: "International", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80" },
  { title: "Experienced Project Managers", desc: "Seasoned professionals dedicated to seamlessly managing your project.", tag: "Mezzanine", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80" },
  { title: "Complete Pre & Post Event Support", desc: "From planning to execution and beyond, comprehensive support.", tag: "Domestic", img: "https://images.unsplash.com/photo-1561489401-fc2876ced162?w=600&q=80" },
  { title: "Flexible Pricing", desc: "Customized pricing plans to fit your budget without compromising quality.", tag: "International", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80" },
];

const HIGHLIGHTS = [
  { expo: "Acetech", location: "India", size: "250 SQM", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", desc: "India's largest construction trade fair — bold 2-storey mezzanine stall with interactive product zones.", tag: "Domestic" },
  { expo: "Bharat Tex", location: "India", size: "180 SQM", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80", desc: "Premium textile exhibition showcasing fabric innovations with a luxurious open-plan display.", tag: "Domestic" },
  { expo: "Smart Lift & Mobility", location: "India", size: "120 SQM", img: "https://images.unsplash.com/photo-1561489401-fc2876ced162?w=600&q=80", desc: "Dynamic stall featuring live lift demonstrations and cutting-edge mobility solutions.", tag: "Domestic" },
  { expo: "Aahar", location: "India", size: "96 SQM", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", desc: "India's premier food & hospitality trade fair — immersive tasting zones and gourmet displays.", tag: "Domestic" },
  { expo: "Schweissen & Schneiden", location: "Germany", size: "210 SQM", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80", desc: "World's leading trade fair for joining, cutting & surfacing — sleek European industrial aesthetic.", tag: "International" },
  { expo: "Cosmoprof", location: "India", size: "108 SQM", img: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=600&q=80", desc: "Professional beauty trade show — glamorous, high-impact brand storytelling stall design.", tag: "Domestic" },
  { expo: "Plastindia", location: "India", size: "144 SQM", img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80", desc: "South Asia's largest plastics exhibition — modular design with live machine demonstrations.", tag: "Domestic" },
  { expo: "TISE", location: "USA", size: "90 SQM", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", desc: "The International Surface Event — sophisticated flooring & surface design stall in Las Vegas.", tag: "International" },
];

const REVIEWS = [
  { name: "Nishant Shah", date: "08 Apr 2025", text: "We have taken Shree Vinayak Design's service for stall designing and construction in the US. We've been participating in exhibitions in the US for more than 15 years and their service has been hands on. Would definitely recommend them.", rating: 5 },
  { name: "Amit Joshi", date: "25 Jul 2024", text: "Working with Shree Vinayak Design was fantastic. Their creative and professional team listened to our vision and crafted a stunning exhibition booth. We received many compliments from attendees.", rating: 5 },
  { name: "Hannan Shaikh", date: "18 Jul 2024", text: "We were very happy with Shree Vinayak Design for our commercial project. Their team was responsive, professional, and did excellent work. They met our specific needs and handled any problems well.", rating: 5 },
  { name: "Aryan A", date: "28 Jun 2024", text: "We've worked with several exhibition design companies, but Shree Vinayak Design is truly exceptional. They brought our vision to life with a unique functional booth that received great feedback.", rating: 5 },
  { name: "Ankita Shrivastava", date: "15 Jun 2023", text: "I can't thank the Shree Vinayak Design team enough for their work on our last exhibition. Their bespoke designs captured our brand essence perfectly and drew a crowd.", rating: 5 },
  { name: "Manish Pathak", date: "15 Jun 2023", text: "Exhibitions are about making an impact and Shree Vinayak Design understands this better than anyone. Their stalls are always the crowd-puller, with designs that are visually appealing and strategic.", rating: 5 },
];

const FAQS = [
  { q: "Do exhibition stall designers design customized stalls?", a: "Yes, we design fully customized exhibition stalls as per your vision and brand requirement. Every detail — from layout to lighting — is tailored specifically for you. Contact us at +91-9999441619 or shreevinayakdesigns@gmail.com for more details.", icon: "🎨" },
  { q: "Do exhibition stall designers in Mumbai provide design samples?", a: "Absolutely! Shree Vinayak Design provides detailed 3D rendered design samples before fabrication begins. Our comprehensive team support ensures your vision is translated perfectly into reality.", icon: "📐" },
  { q: "What is the cost of exhibition stalls in Mumbai?", a: "Stall costs vary depending on size, design complexity, material choices, and exhibition location. We offer flexible pricing plans to suit every budget. Contact us on +91-9999441619 for a custom quote.", icon: "💰" },
  { q: "Will the exhibition stall designers pack the stall after the exhibition?", a: "Yes! Shree Vinayak Design offers end-to-end services including post-event dismantling, packing, logistics, and storage. We take care of everything so you can focus on your business.", icon: "📦" },
  { q: "What technology do exhibition stall designers in India use?", a: "We use cutting-edge design software including 3DS Max, AutoCAD, and advanced rendering tools for photorealistic 3D walkthroughs. On the fabrication side, we use CNC routing, LED lighting systems, and premium materials.", icon: "⚙️" },
  { q: "Do exhibition stall designers provide 3D Design?", a: "Yes, we provide stunning photorealistic 3D designs so you can visualize your stall before a single nail is hammered. Our 3D walkthroughs let you explore every corner of your stall virtually.", icon: "🖥️" },
  { q: "How do exhibition stall designers design your booth?", a: "Our process: Discovery call → Brand concept & mood board → 3D design & revisions → Design approval → Fabrication & quality check → Installation at venue → Post-event dismantling & support.", icon: "🗺️" },
];

const BLOGS = [
  { title: "Factors That Affect Exhibition Booth Pricing in India", date: "January 16, 2026", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", tag: "Exhibition" },
  { title: "Custom vs Modular Exhibition Booths – Which is better?", date: "December 16, 2025", img: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&q=80", tag: "Booth Design" },
  { title: "Creative Expo Stand Designers That Help MNCs Dominate Global Trade Shows", date: "November 27, 2025", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80", tag: "Expo" },
  { title: "Why Experienced Stall Designers Are a Game-Changer for MNCs", date: "November 18, 2025", img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&q=80", tag: "Trade Show" },
  { title: "Trade Fair Booth Design Ideas That Inspire and Engage Global", date: "November 5, 2025", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80", tag: "Trade Fairs" },
  { title: "How Exhibition Booth Design Company Elevates Your Global Brand Identity", date: "October 30, 2025", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80", tag: "Exhibition Stand Design" },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
    </div>
  );
}

type Client = {
  name: string;
  logo: string;
  bg: string;
  initials: string;
};

function ClientLogo({ client }: { client: Client }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="flex-shrink-0 min-w-[160px] h-[88px] bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 px-6 hover:shadow-md transition-shadow group">
      {imgOk ? (
        <img
          src={client.logo}
          alt={client.name}
          onError={() => setImgOk(false)}
          className="max-h-14 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      ) : (
        <div className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: client.bg }}>
          {client.initials}
        </div>
      )}
      <span className="text-[10px] text-gray-400 font-medium tracking-wide text-center leading-tight">{client.name}</span>
    </div>
  );
}

export default function ShreeVinayakDesign() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [highlightFilter, setHighlightFilter] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredPortfolio = activeFilter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(p => p.tag === activeFilter);
  const filteredHighlights = highlightFilter === "All" ? HIGHLIGHTS : HIGHLIGHTS.filter(h => h.tag === highlightFilter);

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,700&family=Outfit:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;}
        body{font-family:'Outfit',sans-serif;margin:0;}
        .font-display{font-family:'Playfair Display',serif;}
        .gold{color:#c8a84b;}
        .bg-gold{background-color:#c8a84b;}
        .section-tag{font-size:0.72rem;letter-spacing:0.22em;text-transform:uppercase;color:#c8a84b;font-weight:600;}
        .hero-overlay{background:linear-gradient(105deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.5) 55%,rgba(0,0,0,0.08) 100%);}
        .card-hover{transition:transform 0.3s ease,box-shadow 0.3s ease;}
        .card-hover:hover{transform:translateY(-5px);box-shadow:0 18px 40px rgba(0,0,0,0.11);}
        .marquee-outer{overflow:hidden;}
        .marquee-track{display:flex;gap:1.25rem;animation:marquee 35s linear infinite;width:max-content;}
        .marquee-track:hover{animation-play-state:paused;}
        @keyframes marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        html{scroll-behavior:smooth;}
        /* Highlight card */
        .hl-card{position:relative;overflow:hidden;border-radius:14px;cursor:pointer;}
        .hl-card img{transition:transform 0.5s ease;width:100%;height:100%;object-fit:cover;}
        .hl-card:hover img{transform:scale(1.07);}
        .hl-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.25) 55%,transparent 100%);}
        .hl-desc{opacity:0;transition:opacity 0.3s ease;}
        .hl-card:hover .hl-desc{opacity:1;}
        /* FAQ */
        .faq-body{max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(0.4,0,0.2,1),opacity 0.3s ease;opacity:0;}
        .faq-body.open{max-height:250px;opacity:1;}
        .faq-plus{transition:transform 0.35s ease;}
        .faq-plus.open{transform:rotate(45deg);}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
      `}</style>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className={`font-display font-bold text-2xl tracking-tight ${scrolled ? "text-gray-900" : "text-white"}`}>
            Shree Vinayak <span className="gold">Design</span>
          </div>
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className={`text-sm font-medium hover:text-amber-500 transition-colors ${scrolled ? "text-gray-700" : "text-gray-200"}`}>{l.label}</a>
            ))}
            <a href="tel:+918879636752" className={`text-sm font-semibold ${scrolled ? "text-gray-800" : "text-white"}`}>+91 88796 36752</a>
            <button onClick={() => setEnquiryOpen(true)} className="bg-gold text-white px-5 py-2 text-sm font-semibold rounded hover:bg-amber-600 transition-colors">Enquire Now</button>
          </div>
          <button className={`lg:hidden text-2xl ${scrolled ? "text-gray-900" : "text-white"}`} onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-8">
          <button className="self-end text-white text-3xl mb-8" onClick={() => setMenuOpen(false)}>✕</button>
          <div className="text-amber-400 font-semibold text-sm mb-6">+91 88796 36752</div>
          {NAV_LINKS.map(l => <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-white text-2xl font-display font-semibold py-3 border-b border-white/10 hover:text-amber-400 transition-colors">{l.label}</a>)}
          <button onClick={() => { setMenuOpen(false); setEnquiryOpen(true); }} className="mt-8 bg-gold text-white px-6 py-3 font-semibold rounded">Enquire Now</button>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative h-screen min-h-[620px] flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=85" alt="Exhibition" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl" style={{ animation: "fadeUp 0.9s ease forwards" }}>
            <p className="section-tag mb-4">EXHIBIT WITH IMPACT</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">Exhibitions<br />Meet <span className="gold">Innovation</span></h1>
            <h2 className="text-xl md:text-2xl text-gray-200 font-light mb-8">Exhibition Stall Designer in India</h2>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => setEnquiryOpen(true)} className="bg-gold text-white px-8 py-3.5 font-semibold rounded hover:bg-amber-600 transition-colors text-sm">Get a Quote</button>
              <a href="#portfolio" className="border border-white text-white px-8 py-3.5 font-semibold rounded hover:bg-white hover:text-gray-900 transition-colors text-sm">View Portfolio</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-xs tracking-widest uppercase">
          <span>Scroll Down</span>
          <div className="w-px h-10 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="font-display text-4xl md:text-5xl font-bold gold">{s.value}</span>
                <span className="text-gray-400 text-sm mt-2 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-tag mb-3">Why Choose Us?</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Exhibition Stall Designer{" "}
              <span style={{ borderBottom: "2px solid #c8a84b", paddingBottom: "2px" }}>in India</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Choose us for your exhibition stand needs and experience unmatched expertise and innovative designs that captivate your audience. Shree Vinayak Design is an award-winning 360° exhibition stall design company where <strong>Value for Money</strong> and <strong>High ROI</strong> is fundamental to all our services.
            </p>
            {readMore && (
              <div className="text-gray-600 leading-relaxed mb-4 space-y-4">
                <p>We have a prolific track record of over 2 decades creating 2700+ stall designs and serving major Indian brands across diverse industries. Our flagship service offers one-point-contact operations for pan-India and worldwide trade fairs.</p>
                <p>At Shree Vinayak Design, we complement you like your Trade Fair Partner. We begin with the fundamentals — assisting you with stall design suggestions relevant to your brand and industry — then decode your audience to create an exhibition stall that stands apart.</p>
              </div>
            )}
            <button onClick={() => setReadMore(!readMore)} className="text-amber-600 font-semibold text-sm hover:underline">{readMore ? "Show Less ↑" : "Read More ↓"}</button>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80" alt="Exhibition Design" className="rounded-xl shadow-2xl w-full object-cover h-80 md:h-[460px]" />
            <div className="absolute -bottom-6 -left-6 bg-gold text-white p-6 rounded-xl shadow-xl">
              <div className="font-display text-3xl font-bold">27+</div>
              <div className="text-sm mt-0.5">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CLIENTS — with images + marquee
      ═══════════════════════════════════════ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <p className="section-tag mb-2">Esteemed Clients</p>
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-3">Trusted by Industry-Leading Clients</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">500+ brands across industries have trusted Shree Vinayak Design to represent them on the world biggest exhibition stages.</p>
        </div>

        {/* Marquee */}
        <div className="marquee-outer mb-6">
          <div className="marquee-track px-4">
            {[...CLIENTS, ...CLIENTS].map((c, i) => <ClientLogo key={i} client={c} />)}
          </div>
        </div>

        
      </section>

      {/* SERVICES */}
      <section id="expos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-tag mb-3">Our Services</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">Comprehensive Branding Boost</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(s => (
              <div key={s.title} className="card-hover bg-gray-50 rounded-xl p-8 border border-gray-100 cursor-pointer group">
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EXHIBITION HIGHLIGHTS — with images & details
      ═══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="section-tag mb-2">Exhibition Stall Design that Impress</p>
            <h2 className="font-display text-4xl font-bold text-white mb-3">Creative Exhibition Stall Highlights</h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">From Mumbai to Germany, our stalls have made lasting impressions at the worlds most prestigious trade fairs.</p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["All", "Domestic", "International"].map(f => (
              <button key={f} onClick={() => setHighlightFilter(f)}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold border transition-all ${highlightFilter === f ? "bg-gold text-white border-transparent" : "border-white/20 text-gray-400 hover:border-amber-400 hover:text-amber-400"}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {filteredHighlights.map((h, i) => (
              <div key={i} className="hl-card" style={{ height: "310px" }}>
                <img src={h.img} alt={h.expo} />
                <div className="hl-overlay" />
                <span className="absolute top-3 left-3 bg-gold text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{h.tag}</span>
                <span className="absolute top-3 right-3 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>{h.size}</span>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">{h.location}</span>
                    <span className="w-1 h-1 rounded-full bg-amber-400 inline-block" />
                    <span className="text-white/50 text-[10px]">{h.size}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-lg leading-tight mb-2">{h.expo}</h3>
                  <p className="hl-desc text-gray-300 text-xs leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Wide feature strip */}
          <div className="hl-card" style={{ height: "200px" }}>
            <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80" alt="Anuga" />
            <div className="hl-overlay" />
            <span className="absolute top-4 left-4 bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">International</span>
            <span className="absolute top-4 right-4 text-white text-[10px] font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>108 SQM + Mezzanine</span>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
              <div>
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Mumbai, India</span>
                <h3 className="font-display font-bold text-white text-2xl mt-1">Anuga — Premium Food & Beverage Exhibition</h3>
              </div>
              <p className="hl-desc text-gray-300 text-sm max-w-sm hidden md:block">A landmark 108 SQM + mezzanine stall showcasing culinary innovation at Indias most prestigious food trade fair.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERING EXCELLENCE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=700&q=80" alt="Excellence" className="rounded-xl shadow-xl w-full object-cover h-[420px]" />
          </div>
          <div>
            <p className="section-tag mb-3">From Layout to Light</p>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-10 leading-tight">Delivering Excellence<br />at Every Step</h2>
            <div className="space-y-8">
              {[
                { title: "Experienced and Professional", desc: "27 years of colossal experience backed by professionals who leave no stone unturned in meeting your requirements." },
                { title: "Innovative Marketing Ideas", desc: "With our finger on the market pulse, we offer innovative ideas that attract and engage customers at your stall." },
                { title: "Peace of Mind", desc: "From design approvals to travel arrangements, brochures, leaflets, and corporate gifts — we handle everything." },
              ].map(item => (
                <div key={item.title} className="flex gap-5">
                  <div className="w-10 h-10 bg-gold rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">✓</div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-tag mb-3">PORTFOLIO – Bold. Distinctive. Disruptive</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">Exhibition Masterpieces</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["All", "Domestic", "International", "Mezzanine"].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${activeFilter === f ? "bg-gold text-white border-gold" : "bg-white text-gray-700 border-gray-200 hover:border-amber-400"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((p, i) => (
              <div key={i} className="card-hover rounded-xl overflow-hidden shadow-md bg-white cursor-pointer group">
                <div className="relative overflow-hidden h-52">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">{p.tag}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">{p.title}</h3>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#" className="bg-gold text-white px-8 py-3 font-semibold rounded hover:bg-amber-600 transition-colors inline-block">View More</a>
          </div>
        </div>
      </section>

      {/* AWARD */}
      <section id="awards" className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-600 blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <p className="section-tag mb-4">RECEIVED</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">The Grand Stand Award<br />at the Acetech Exhibition<br />in Ahmedabad</h2>
          <a href="#" className="mt-6 inline-block border border-gold text-amber-400 px-8 py-3 font-semibold text-sm rounded hover:bg-gold hover:text-white transition-colors">To Know More</a>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-tag mb-3">Our Clients</p>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Our Brand Ambassadors</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-display font-bold text-gray-900">4.8</span>
              <div>
                <StarRating count={5} />
                <div className="text-xs text-gray-500 mt-1">Based on 53 reviews</div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100 card-hover">
                <StarRating count={r.rating} />
                <p className="text-gray-700 text-sm leading-relaxed mt-3 mb-5">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">{r.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ — Redesigned dark attractive layout
      ═══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "linear-gradient(135deg,#0f0f0f 0%,#1a1818 60%,#111 100%)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-tag mb-3">Got Questions?</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Frequently Asked <span className="gold">Questions</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">Everything you need to know about working with Shree Vinayak Design — from design to dismantling.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left sticky panel */}
            <div className="hidden lg:block lg:col-span-2 sticky top-28">
              <div className="rounded-2xl overflow-hidden mb-5" style={{ height: "240px" }}>
                <img src="https://images.unsplash.com/photo-1561489401-fc2876ced162?w=500&q=80" alt="FAQ" className="w-full h-full object-cover" />
              </div>
              {/* Stats mini */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[{ v: "27+", l: "Years" }, { v: "2700+", l: "Stalls" }, { v: "500+", l: "Clients" }, { v: "20+", l: "Awards" }].map(s => (
                  <div key={s.l} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="font-display text-2xl font-bold gold">{s.v}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="font-display text-lg text-white font-bold mb-2">Still have questions?</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">Our team is happy to guide you through every detail of the process.</p>
                <a href="tel:+918879636752" className="flex items-center justify-center gap-2 bg-gold text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-amber-600 transition-colors w-full mb-3">
                  📞 Call Us Now
                </a>
                <a href="mailto: shreevinayakdesigns@gmail.com" className="flex items-center justify-center gap-2 text-gray-300 px-5 py-2.5 rounded-xl font-semibold text-sm hover:text-amber-400 transition-colors w-full" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  ✉️ Email Us
                </a>
              </div>
            </div>

            {/* FAQ accordion */}
            <div className="lg:col-span-3 space-y-3">
              {FAQS.map((faq, i) => {
                const isOpen = expandedFaq === i;
                return (
                  <div key={i}
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    className="rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      border: isOpen ? "1px solid rgba(200,168,75,0.45)" : "1px solid rgba(255,255,255,0.08)",
                      borderLeft: isOpen ? "3px solid #c8a84b" : "3px solid transparent",
                      background: isOpen ? "rgba(200,168,75,0.07)" : "rgba(255,255,255,0.03)"
                    }}>
                    <div className="flex items-center gap-4 px-5 py-4">
                      {/* Icon bubble */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base transition-colors"
                        style={{ background: isOpen ? "rgba(200,168,75,0.18)" : "rgba(255,255,255,0.06)" }}>
                        {faq.icon}
                      </div>
                      <span className={`font-semibold text-sm flex-1 leading-snug transition-colors ${isOpen ? "text-amber-400" : "text-white"}`}>{faq.q}</span>
                      <div className={`faq-plus w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 transition-all ${isOpen ? "open" : ""}`}
                        style={{
                          background: isOpen ? "#c8a84b" : "rgba(255,255,255,0.08)",
                          color: isOpen ? "#fff" : "#999"
                        }}>
                        +
                      </div>
                    </div>
                    <div className={`faq-body ${isOpen ? "open" : ""}`}>
                      <div className="px-5 pb-5" style={{ paddingLeft: "72px" }}>
                        <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section id="blogs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-tag mb-3">Knowledge Hub</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">Latest Blogs</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOGS.map((b, i) => (
              <div key={i} className="card-hover rounded-xl overflow-hidden shadow-md bg-white group cursor-pointer">
                <div className="relative overflow-hidden h-48">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-gold text-white text-xs px-3 py-1 rounded-full font-medium">{b.tag}</span>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-xs mb-2">{b.date}</p>
                  <h3 className="font-display font-bold text-base text-gray-900 leading-snug group-hover:text-amber-600 transition-colors">{b.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSOCIATIONS */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-10">Associated With</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {["KDO", "BNI", "SOBA"].map(a => (
              <div key={a} className="flex items-center justify-center bg-white border border-gray-200 rounded-xl px-12 py-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-display text-xl font-bold text-gray-700">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-950 text-gray-300 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div>
            <div className="font-display font-bold text-2xl text-white mb-4">Shree Vinayak <span className="gold">Design</span></div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">Award-winning exhibition stall design company serving major Indian brands since 1998.</p>
            <div className="text-sm space-y-2">
              <div><span className="text-amber-400 font-semibold">Tel:</span><a href="tel:+91-9999441619" className="hover:text-white"> +91 22 24183337</a></div>
              <div><span className="text-amber-400 font-semibold">Mobile:</span><a href="tel:+91-9999441619" className="hover:text-white"> +91 88796 36752</a></div>
              <div><span className="text-amber-400 font-semibold">Email:</span><a href="mailto:shreevinayakdesigns@gmail.com" className="hover:text-white"> shreevinayakdesigns@gmail.com</a></div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Offices</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div><div className="text-amber-400 font-semibold mb-1">Corporate Office</div>Add 1/4886 Street No.8 Balbir Nagar Extension, Shahdara Delhi-110032.</div>
              <div><div className="text-amber-400 font-semibold mb-1">Uttar Pradesh Office</div>86, Village Salarpur Noida, Gautambudha Nagar, Uttar Pradesh – 201301.</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Exhibition Stall Design", "Exhibition Stall Fabrication", "Exhibition Stand Design", "Exhibition Booth Design", "Mezzanine Stall Designer", "Office Branding", "Retail Design"].map(s => (
                <li key={s}><a href="#" className="hover:text-amber-400 transition-colors">→ {s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400 mb-8">
              {NAV_LINKS.map(l => (<li key={l.label}><a href={l.href} className="hover:text-amber-400 transition-colors">→ {l.label}</a></li>))}
            </ul>
            <button onClick={() => setEnquiryOpen(true)} className="bg-gold text-white px-6 py-3 rounded font-semibold text-sm hover:bg-amber-600 transition-colors w-full">Download Portfolio</button>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">Shree Vinayak Design © 2026. Developed and Marketed by Shree Vinayak Design.</p>
          <div className="flex gap-4">
            {["Facebook", "Instagram", "LinkedIn", "YouTube"].map(s => (<a key={s} href="#" className="text-gray-500 hover:text-amber-400 text-xs transition-colors">{s}</a>))}
          </div>
        </div>
      </footer>

      {/* ENQUIRY MODAL */}
      {enquiryOpen && (
        <div className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button className="absolute top-4 right-5 text-gray-400 hover:text-gray-900 text-2xl" onClick={() => setEnquiryOpen(false)}>✕</button>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Submit Your Enquiry</h3>
            <p className="text-gray-500 text-sm mb-6">Fill in the details below and we will get back to you promptly.</p>
            <div className="space-y-4">
              {[["name", "Your Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number", "tel"]].map(([field, label, type]) => (
                <input key={field} type={type} placeholder={label} value={form[field as keyof typeof form]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
              ))}
              <textarea placeholder="Your Message" rows={4} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none" />
              <button onClick={() => setEnquiryOpen(false)} className="w-full bg-gold text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">Submit Enquiry</button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CALL */}
      <a href="tel:+918879636752" className="fixed bottom-6 right-6 z-50 bg-gold text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-amber-600 transition-colors text-2xl" title="Call Us">📞</a>
    </div>
  );
}