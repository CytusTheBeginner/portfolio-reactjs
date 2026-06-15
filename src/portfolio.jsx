import { useState, useEffect, useRef } from "react";

// ============================================================
// 🎨 KONFIGURASI — UBAH DI SINI
// ============================================================
const CONFIG = {
  name: "Hendri",
  title: "Beginner Full Stack Developer",
  tagline: "Fresh Graduate yang Senang Belajar Hal Baru",
  about: `Fresh Graduate Sistem Informasi dengan kemampuan dasar pengembangan web menggunakan PHP. Memiliki minat pada software development, problem solving, dan pembuatan aplikasi yang efisien serta mudah digunakan. Cepat belajar, adaptif terhadap teknologi baru, dan memiliki motivasi tinggi untuk terus mengembangkan keterampilan di bidang IT dan pengembangan aplikasi.`,
  email: "hendrixie45@email.com",
  github: "https://github.com/CytusTheBeginner",
  linkedin: "https://www.linkedin.com/in/hendri-xie-464004285/",
  cv: "#", // ganti dengan link CV / Google Drive
  skills: [
    { cat: "Frontend", items: ["HTML", "CSS", "Javascript"] },
    { cat: "Backend", items: ["PHP", "Laravel", "MySql"] },
    { cat: "Design", items: ["Figma", "Canva"] },
    { cat: "Tools", items: ["Git", "Github", "VSCode", "Figma", "Postman", "Laragon"] },
  ],
  projects: [
    {
  title: "Aplikasi Kas Organisasi SMA Maitreyawira Tanjungpinang",
  desc: "Aplikasi pengelolaan kas organisasi sekolah yang membantu pencatatan pemasukan, pengeluaran, saldo kas, serta pembuatan laporan keuangan secara terstruktur dan mudah diakses.",
  stack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
  repo: "https://github.com/Cytus2nd/AppKasOrganisasi_SMAMW",
  year: "2024",
},
{
  title: "Sistem Pendukung Keputusan Stok Barang Minimarket Gajah Mart",
  desc: "Sistem pendukung keputusan yang membantu menentukan jumlah stok barang yang perlu disediakan berdasarkan data penjualan dan kriteria tertentu untuk mengurangi risiko kehabisan atau penumpukan stok.",
  stack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
  repo: "https://github.com/CytusTheBeginner/SPK_GajahMart",
  year: "2025",
},
{
  title: "Aplikasi Manajemen Proyek Sederhana",
  desc: "Aplikasi berbasis web untuk membantu pengelolaan proyek, pembagian tugas, pemantauan progres pekerjaan, serta pencatatan status penyelesaian setiap tugas.",
  stack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
  repo: "https://github.com/Cytus2nd/project_app",
  year: "2024",
},
{
  title: "Clone Website Perusahaan Wiraraja Batam Menggunakan Python Django",
  desc: "Clone Website Wiraraja Batam menggunakan Python Django dan Bootstrap, Clone ini berfokus pada frontend website",
  stack: ["Django", "Sqlite", "Bootstrap", "Python"],
  repo: "#",
  year: "2023",
},
{
  title: "Pengembangan Bot Discord dengan Vibe Coding Menggunakan Python",
  desc: "Pembuatan Bot Discord menggunakan Python dengan bantuan AI ChatGPT ",
  stack: ["Python", "MySql"],
  repo: "https://github.com/CytusTheBeginner/bot-mancing-discord",
  year: "2026",
},
{
  title: "Clone Website Tokopedia Sederhana (Fokus pada Cetak Invoice)",
  desc: "Melakukan Clone website Tokopedia secara sederhana yang berfokus pada percetakan invoice",
  stack: ["PHP", "MySQL", "Bootstrap", "HTML", "JavaScript"],
  repo: "https://github.com/Cytus2nd/tungpedi",
  year: "2024",
},
{
  title: "Prototype Aplikasi Mobile E-Commerce Toko Cahaya Lestari (Figma)",
  desc: "Prototype antarmuka aplikasi e-commerce untuk penjualan produk lampu dan elektronik yang dirancang menggunakan Figma, mencakup halaman katalog produk, detail produk, keranjang belanja, dsb dengan fokus pada pengalaman pengguna.",
  stack: ["Figma", "UI Design", "UX Design", "Prototyping"],
  repo: "https://www.figma.com/proto/1qb7d9ximzL1vqZ5K4xNMN/Cahaya-Lestari-APP-Mobile?node-id=0-1&t=TcPtMslimK7sawII-1",
  year: "2023",
},
{
  title: "Prototype Aplikasi E-Commerce Rotanku (Figma)",
  desc: "Prototype antarmuka aplikasi e-commerce untuk penjualan produk rotan yang dirancang menggunakan Figma, mencakup halaman katalog produk, detail produk, keranjang belanja, dan proses checkout dengan fokus pada pengalaman pengguna.",
  stack: ["Figma", "UI Design", "UX Design", "Prototyping"],
  repo: "https://www.figma.com/proto/s4JQQNKy9ZCqIQGmZ07C5K/IMK-UAS--MARKETPLACE-HANDMADE-?node-id=150-3908&starting-point-node-id=150%3A3908",
  year: "2024",
}
  ],
  experience: [
    {
      role: "Manager Operasional",
      company: "Minimarket Gajah Mart Tanjungpinang",
      period: "2024 — Sekarang",
    },
    {
      role: "Data Entry Operator",
      company: "Minimarket Gajah Mart Tanjungpinang",
      period: "2023 — 2024",
    },
    {
      role: "Sarjana Komputer",
      company: "Sekolah Tinggi Teknologi Indonesia Tanjungpinang",
      period: "2022 — 2026",
    },
    {
      role: "Sekolah Menengah Atas",
      company: "SMA Swasta Santa Maria Tanjungpinang",
      period: "2019 — 2022",
    },
    {
      role: "Sekolah Menengah Pertama",
      company: "SMP Swasta Katolik Tanjungpinang",
      period: "2016 — 2019",
    },
    {
      role: "Sekolah Dasar",
      company: "SD Swasta Kristen Sion Tanjungpinang",
      period: "2010 — 2016",
    },
    {
      role: "Taman Kanak-kanak",
      company: "TK Santa Bernadeth Tanjungpinang",
      period: "2009 — 2010",
    },
  ],
};
// ============================================================
 
const NAV_LINKS = ["Tentang", "Keahlian", "Proyek", "Pengalaman", "Kontak"];
const SECTION_IDS = ["about", "skills", "projects", "experience", "contact"];
 
function useScrollSpy() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}
 
function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}
 
function GlitchText({ text }) {
  return <span className="glitch" data-text={text}>{text}</span>;
}
 
function Tag({ label }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: "4px",
      fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace",
      background: "rgba(0,255,136,0.08)", color: "#00ff88",
      border: "1px solid rgba(0,255,136,0.2)", letterSpacing: "0.05em",
    }}>{label}</span>
  );
}
 
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", padding: "24px 26px",
        border: `1px solid ${hovered ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "12px",
        background: hovered ? "rgba(0,255,136,0.03)" : "rgba(255,255,255,0.02)",
        transition: "all 0.25s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,255,136,0.5)", fontSize: "0.75rem" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.25)", fontSize: "0.72rem" }}>
          {project.year}
        </span>
      </div>
      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>
        {project.title}
      </h3>
      <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 16 }}>
        {project.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {project.stack.map((s) => <Tag key={s} label={s} />)}
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <a href={project.repo} style={{ ...linkStyle, color: "rgba(255,255,255,0.4)" }}>Project Link / Github ↗</a>
      </div>
    </div>
  );
}
 
const linkStyle = {
  color: "#00ff88", textDecoration: "none", fontSize: "0.82rem",
  fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.03em",
};
 
const socialStyle = {
  color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.82rem",
  fontFamily: "'JetBrains Mono', monospace", transition: "color 0.2s",
};
 
export default function Portfolio() {
  const active = useScrollSpy();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
 
  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
 
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080c10; color: #e2e8f0; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c10; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,136,0.3); border-radius: 2px; }
 
        .glitch { position: relative; display: inline-block; }
        .glitch::before, .glitch::after {
          content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        }
        .glitch::before {
          color: #00ff88; animation: glitch1 3s infinite;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); opacity: 0;
        }
        .glitch::after {
          color: #0ff; animation: glitch2 3s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); opacity: 0;
        }
        @keyframes glitch1 {
          0%,90%,100%{opacity:0;transform:translateX(0)}
          92%{opacity:.8;transform:translateX(-4px)}
          94%{opacity:0;transform:translateX(4px)}
          96%{opacity:.6;transform:translateX(-2px)}
        }
        @keyframes glitch2 {
          0%,92%,100%{opacity:0;transform:translateX(0)}
          94%{opacity:.8;transform:translateX(4px)}
          96%{opacity:0;transform:translateX(-3px)}
          98%{opacity:.5;transform:translateX(2px)}
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .cursor-glow {
          width:300px;height:300px;
          background:radial-gradient(circle,rgba(0,255,136,0.06) 0%,transparent 70%);
          position:fixed;pointer-events:none;z-index:0;border-radius:50%;
          transform:translate(-50%,-50%);transition:opacity .3s;
        }
        a:focus-visible { outline: 2px solid #00ff88; outline-offset: 2px; border-radius: 2px; }
 
        /* Hamburger */
        .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer;
          background:none; border:none; padding:6px; }
        .hamburger span { display:block; width:22px; height:2px; background:#e2e8f0;
          border-radius:2px; transition: all 0.3s ease; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
 
        /* Responsive grid helpers */
        .grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .grid-about { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .timeline-row { display: grid; grid-template-columns: 160px 1fr; gap: 0 36px; }
 
        @media (max-width: 768px) {
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-about { grid-template-columns: 1fr !important; gap: 36px !important; }
          .timeline-row {
            grid-template-columns: 1fr !important;
            gap: 6px 0 !important;
          }
          .timeline-left { text-align: left !important; padding-top: 0 !important; }
          .timeline-dot, .timeline-line { display: none !important; }
          .timeline-period { margin-bottom: 4px; }
        }
 
        @media (max-width: 640px) {
          .hamburger { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
 
        @media (prefers-reduced-motion: reduce) {
          .glitch::before, .glitch::after { animation: none; }
        }
      `}</style>
 
      <CursorGlow />
 
      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 90,
          background: "rgba(8,12,16,0.97)",
          backdropFilter: "blur(16px)",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", gap: 36,
        }}>
          {NAV_LINKS.map((label, i) => (
            <button key={label} onClick={() => scrollTo(SECTION_IDS[i])} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "1.4rem", fontWeight: 700,
              color: active === SECTION_IDS[i] ? "#00ff88" : "rgba(255,255,255,0.7)",
              letterSpacing: "0.05em", transition: "color 0.2s",
            }}>{label}</button>
          ))}
          <a href={CONFIG.cv} style={{
            marginTop: 8, padding: "10px 28px",
            border: "1px solid rgba(0,255,136,0.4)", borderRadius: "8px",
            color: "#00ff88", textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem",
          }}>Download CV</a>
        </div>
      )}
 
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,12,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.3s ease",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ff88", fontWeight: 700, fontSize: "1rem" }}>
          &lt;{CONFIG.name.split(" ")[0]} /&gt;
        </span>
 
        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map((label, i) => (
            <button key={label} onClick={() => scrollTo(SECTION_IDS[i])} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem",
              color: active === SECTION_IDS[i] ? "#00ff88" : "rgba(255,255,255,0.45)",
              letterSpacing: "0.05em", transition: "color 0.2s",
            }}>{label}</button>
          ))}
          <a href={CONFIG.cv} style={{
            padding: "7px 18px", border: "1px solid rgba(0,255,136,0.4)",
            borderRadius: "6px", color: "#00ff88", textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem",
            letterSpacing: "0.05em", transition: "background 0.2s",
          }}
            onMouseOver={(e) => e.currentTarget.style.background = "rgba(0,255,136,0.08)"}
            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
          >Download CV</a>
        </div>
 
        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>
 
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "0 5%" }}>
 
        {/* HERO */}
        <section style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "center", paddingTop: 80,
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "center" : "left",
        }}>
          <div className="grid-bg" style={{ position: "fixed", inset: 0, zIndex: -1, opacity: 0.5 }} />
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", color: "#00ff88",
            fontSize: "0.82rem", marginBottom: 20, letterSpacing: "0.1em",
          }}>&gt; Halo, saya</p>
          <h1 style={{
            fontSize: "clamp(2.8rem, 10vw, 5.5rem)", fontWeight: 900,
            lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 12, color: "#fff",
          }}>
            <GlitchText text={CONFIG.name} />
          </h1>
          <h2 style={{
            fontSize: "clamp(1.1rem, 4vw, 2.2rem)", fontWeight: 700,
            color: "rgba(255,255,255,0.3)", letterSpacing: "-0.03em", marginBottom: 24,
          }}>
            {CONFIG.title}
          </h2>
          <p style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: 480, lineHeight: 1.75, marginBottom: 36,
            margin: isMobile ? "0 auto 36px" : "0 0 36px",
          }}>
            {CONFIG.tagline}
          </p>
          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
          }}>
            <button onClick={() => scrollTo("projects")} style={{
              padding: "12px 26px", background: "#00ff88", color: "#080c10",
              border: "none", borderRadius: "8px", fontWeight: 700,
              fontSize: "0.9rem", cursor: "pointer", fontFamily: "'Inter', sans-serif",
              transition: "opacity 0.2s, transform 0.2s",
            }}
              onMouseOver={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >Lihat Proyek →</button>
            <button onClick={() => scrollTo("contact")} style={{
              padding: "12px 26px", background: "transparent",
              color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem",
              cursor: "pointer", fontFamily: "'Inter', sans-serif",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >Hubungi Saya</button>
          </div>
 
          <div style={{
  display: "flex", gap: 12, marginTop: 44, flexWrap: "wrap",
  justifyContent: isMobile ? "center" : "flex-start",
}}>
  {[
    { label: "GitHub", href: CONFIG.github, icon: "⌥" },
    { label: "Instagram", href: "https://instagram.com/hendri.xie", icon: "📸" },
    { label: "Discord", href: "https://discord.com/users/cytusgaming", icon: "🎮" },
    { label: "Steam", href: "https://steamcommunity.com/id/cytusgaming", icon: "🕹️" },
  ].map((s) => (
    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "7px 14px",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
        color: "rgba(255,255,255,0.45)",
        textDecoration: "none",
        fontSize: "0.78rem",
        fontFamily: "'JetBrains Mono', monospace",
        transition: "border-color 0.2s, color 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)";
        e.currentTarget.style.color = "#00ff88";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
      }}
    >
      <span>{s.icon}</span> {s.label}
    </a>
  ))}
</div>
        </section>
 
        {/* ABOUT */}
        <section id="about" style={sectionStyle}>
          <SectionLabel label="Tentang" />
          <div className="grid-about">
            <div>
              <h2 style={headingStyle}>Siapa saya?</h2>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.85, fontSize: "0.95rem" }}>
                {CONFIG.about}
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { num: "3.9", label: "IPK" },
                { num: "10+", label: "Proyek Kampus" },
                { num: "5+", label: "Open Source" },
                { num: "∞", label: "Kopi per Minggu" },
              ].map((stat) => (
                <div key={stat.label} style={{
                  padding: "20px 16px", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px", textAlign: "center", background: "rgba(255,255,255,0.02)",
                }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#00ff88", letterSpacing: "-0.03em" }}>{stat.num}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: 5, letterSpacing: "0.04em" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* SKILLS */}
        <section id="skills" style={sectionStyle}>
          <SectionLabel label="Keahlian" />
          <h2 style={headingStyle}>Tech Stack</h2>
          <div className="grid-2col">
            {CONFIG.skills.map((group) => (
              <div key={group.cat} style={{
                padding: "22px 24px", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px", background: "rgba(255,255,255,0.02)",
              }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ff88", fontSize: "0.75rem", marginBottom: 12, letterSpacing: "0.08em" }}>
                  {group.cat.toUpperCase()}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.items.map((item) => (
                    <span key={item} style={{
                      padding: "5px 12px", borderRadius: "5px", fontSize: "0.82rem",
                      background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
 
        {/* PROJECTS */}
        <section id="projects" style={sectionStyle}>
          <SectionLabel label="Proyek" />
          <h2 style={headingStyle}>Yang pernah saya bangun</h2>
          <div className="grid-2col">
  {[...CONFIG.projects]
    .sort((a, b) => b.year - a.year) // terbaru ke terlama
    .map((project, i) => (
      <ProjectCard
        key={project.title}
        project={project}
        index={i}
      />
    ))}
</div>
        </section>
 
        {/* EXPERIENCE */}
        <section id="experience" style={sectionStyle}>
          <SectionLabel label="Pengalaman" />
          <h2 style={headingStyle}>Pengalaman dan Pendidikan</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {CONFIG.experience.map((exp, i) => (
              <div key={i} className="timeline-row" style={{
                paddingBottom: i < CONFIG.experience.length - 1 ? 40 : 0,
              }}>
                {/* Left: period */}
                <div className="timeline-left" style={{ textAlign: "right", paddingTop: 4, position: "relative" }}>
                  <p className="timeline-period" style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.3)", lineHeight: 1.6,
                  }}>{exp.period}</p>
                  {i < CONFIG.experience.length - 1 && (
                    <div className="timeline-line" style={{
                      position: "absolute", right: -19, top: 24, bottom: -40,
                      width: 1, background: "rgba(255,255,255,0.08)"
                    }} />
                  )}
                  <div className="timeline-dot" style={{
                    position: "absolute", right: -22.5, top: 8,
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#00ff88", boxShadow: "0 0 8px rgba(0,255,136,0.5)"
                  }} />
                </div>
                {/* Right: content */}
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{exp.role}</h3>
                  <p style={{ fontSize: "0.82rem", color: "#00ff88", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>{exp.company}</p>
                  <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
 
        {/* CONTACT */}
        <section id="contact" style={{ ...sectionStyle, textAlign: "center", paddingBottom: 120 }}>
          <SectionLabel label="Kontak" center />
          <h2 style={{ ...headingStyle, textAlign: "center" }}>Mari ngobrol 👋</h2>
          
          <a href={`mailto:${CONFIG.email}`} style={{
            display: "inline-block", padding: "13px 34px", background: "#00ff88",
            color: "#080c10", textDecoration: "none", borderRadius: "8px",
            fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.01em",
            transition: "opacity 0.2s, transform 0.2s",
          }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >Kirim Email →</a>
 
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 44 }}>
            <div style={{
  display: "flex", gap: 12, flexWrap: "wrap",
  justifyContent: isMobile ? "center" : "flex-start",
}}>
  {[
    { label: "GitHub", href: CONFIG.github, icon: "⌥" },
    { label: "Instagram", href: "https://instagram.com/hendri.xie", icon: "📸" },
    { label: "Discord", href: "https://discord.com/users/cytusgaming", icon: "🎮" },
    { label: "Steam", href: "https://steamcommunity.com/id/cytusgaming", icon: "🕹️" },
  ].map((s) => (
    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "7px 14px",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
        color: "rgba(255,255,255,0.45)",
        textDecoration: "none",
        fontSize: "0.78rem",
        fontFamily: "'JetBrains Mono', monospace",
        transition: "border-color 0.2s, color 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)";
        e.currentTarget.style.color = "#00ff88";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
      }}
    >
      <span>{s.icon}</span> {s.label}
    </a>
  ))}
</div>
          </div>
        </section>
 
      </main>
 
      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "24px 5%", textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.72rem", color: "rgba(255,255,255,0.2)",
      }}>
        Built with React · {CONFIG.name} © {new Date().getFullYear()}
      </footer>
    </>
  );
}
 
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}
 
function SectionLabel({ label, center }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace", color: "#00ff88",
      fontSize: "0.75rem", marginBottom: 16, letterSpacing: "0.12em",
      textAlign: center ? "center" : "left",
    }}>// {label.toUpperCase()}</p>
  );
}
 
const sectionStyle = { paddingTop: 100, paddingBottom: 20 };
 
const headingStyle = {
  fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800,
  letterSpacing: "-0.04em", color: "#fff", marginBottom: 32,
};