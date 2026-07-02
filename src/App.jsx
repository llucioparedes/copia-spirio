import { useState, useEffect } from "react";

const BRAND = "#59382A";
const BRAND_LIGHT = "#FFFAF4";
const BRAND_DARK = "#3d2519";
const BRAND_MID = "#7a4f3a";
const ACCENT = "#c8956c";
const TEXT_DARK = "#2d1a0e";
const TEXT_MID = "#59382A";
const TEXT_LIGHT = "#9c7b6a";

const CTA_URL =
  "https://signup.spiriohub.com/en/mbt7g?lang=EN&user_id=8ab40414-1d98-4c34-80e9-d6d907895fa6";

const features = [
  {
    icon: "✨",
    title: "Crecimiento Personal",
    desc: "Cursos diseñados para transformar tu vida desde adentro hacia afuera.",
  },
  {
    icon: "🌿",
    title: "Bienestar Espiritual",
    desc: "Prácticas y enseñanzas para conectar con tu esencia más profunda.",
  },
  {
    icon: "🧘",
    title: "Meditación Guiada",
    desc: "Sesiones en vivo y grabadas para calmar la mente y expandir la conciencia.",
  },
  {
    icon: "📚",
    title: "Contenido Exclusivo",
    desc: "Acceso a una biblioteca de recursos que evoluciona contigo cada semana.",
  },
  {
    icon: "🤝",
    title: "Comunidad Activa",
    desc: "Conecta con miles de personas en su mismo camino de despertar.",
  },
  {
    icon: "🏆",
    title: "Certificaciones",
    desc: "Obtén certificados reconocidos al completar cada programa de aprendizaje.",
  },
];

const testimonials = [
  {
    name: "Valentina R.",
    role: "Coach de Vida",
    text: "Aura Path cambió completamente mi perspectiva. Los cursos son profundos, accesibles y realmente transformadores.",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    name: "Marcos T.",
    role: "Terapeuta Holístico",
    text: "La comunidad es increíble. Encontré personas que comparten mi visión y juntos crecemos muchísimo más rápido.",
    avatar: "https://i.pravatar.cc/80?img=33",
  },
  {
    name: "Sofía M.",
    role: "Emprendedora",
    text: "Llevo 6 meses en la plataforma y cada módulo me da herramientas concretas para mi vida diaria y mi negocio.",
    avatar: "https://i.pravatar.cc/80?img=56",
  },
];

const courses = [
  {
    title: "Despertar Interior",
    level: "Principiante",
    lessons: 12,
    duration: "4 semanas",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    tag: "Popular",
  },
  {
    title: "Mindfulness Profundo",
    level: "Intermedio",
    lessons: 20,
    duration: "8 semanas",
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80",
    tag: "Nuevo",
  },
  {
    title: "Abundancia y Propósito",
    level: "Avanzado",
    lessons: 16,
    duration: "6 semanas",
    img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400&q=80",
    tag: "Destacado",
  },
];

const faqs = [
  {
    q: "¿Necesito experiencia previa?",
    a: "No, nuestros programas están diseñados para todos los niveles. Desde principiantes hasta practicantes avanzados encontrarán valor transformador.",
  },
  {
    q: "¿Puedo acceder desde cualquier dispositivo?",
    a: "Sí, Aura Path funciona perfectamente en móviles, tablets y computadoras. Tu progreso se sincroniza automáticamente.",
  },
  {
    q: "¿Hay garantía de satisfacción?",
    a: "Ofrecemos 30 días de garantía completa. Si no estás satisfecho, te devolvemos tu inversión sin preguntas.",
  },
  {
    q: "¿Con qué frecuencia se añade contenido nuevo?",
    a: "Añadimos nuevos cursos, meditaciones y sesiones en vivo cada semana para que tu crecimiento nunca se detenga.",
  },
];

function useInView(threshold = 0.15) {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return [setRef, inView];
}

function AnimatedSection({ children, style, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inicio");
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "El nombre es requerido";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Email inválido";
    if (formData.password.length < 6)
      errs.password = "Mínimo 6 caracteres";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      window.open(CTA_URL, "_blank");
    }, 1200);
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const styles = {
    root: {
      fontFamily: "'Poppins', 'Barlow', sans-serif",
      background: BRAND_LIGHT,
      color: TEXT_DARK,
      minHeight: "100vh",
      overflowX: "hidden",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: "rgba(255,250,244,0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid rgba(89,56,42,0.12)`,
      padding: "0 5%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 68,
      boxShadow: "0 2px 20px rgba(89,56,42,0.08)",
    },
    logo: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "1.5rem",
      color: BRAND,
      letterSpacing: "-0.02em",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    logoIcon: {
      width: 36,
      height: 36,
      background: `linear-gradient(135deg, ${BRAND} 0%, ${ACCENT} 100%)`,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.1rem",
    },
    navLinks: {
      display: "flex",
      gap: 32,
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: (active) => ({
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.9rem",
      fontWeight: active ? 600 : 400,
      color: active ? BRAND : TEXT_MID,
      cursor: "pointer",
      textDecoration: "none",
      transition: "color 0.2s",
      borderBottom: active ? `2px solid ${BRAND}` : "2px solid transparent",
      paddingBottom: 2,
    }),
    navCta: {
      background: BRAND,
      color: "#fff",
      border: "none",
      borderRadius: 0,
      padding: "10px 22px",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "0.9rem",
      cursor: "pointer",
      transition: "background 0.2s, transform 0.15s",
    },
    hamburger: {
      display: "none",
      flexDirection: "column",
      gap: 5,
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: 4,
    },
    hamburgerLine: {
      width: 24,
      height: 2,
      background: BRAND,
      borderRadius: 2,
    },
    mobileMenu: {
      position: "fixed",
      top: 68,
      left: 0,
      right: 0,
      background: BRAND_LIGHT,
      borderBottom: `1px solid rgba(89,56,42,0.12)`,
      padding: "20px 5%",
      zIndex: 999,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      boxShadow: "0 8px 24px rgba(89,56,42,0.1)",
    },
    mobileNavLink: (active) => ({
      fontFamily: "'Poppins', sans-serif",
      fontSize: "1rem",
      fontWeight: active ? 600 : 400,
      color: active ? BRAND : TEXT_DARK,
      cursor: "pointer",
      padding: "8px 0",
      borderBottom: `1px solid rgba(89,56,42,0.08)`,
    }),
    hero: {
      minHeight: "100vh",
      background: `linear-gradient(160deg, #fff8f2 0%, #f5ebe0 40%, #e8d5c4 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      padding: "120px 5% 80px",
      position: "relative",
      overflow: "hidden",
    },
    heroBg1: {
      position: "absolute",
      top: -120,
      right: -120,
      width: 500,
      height: 500,
      background: `radial-gradient(circle, rgba(200,149,108,0.15) 0%, transparent 70%)`,
      borderRadius: "50%",
      pointerEvents: "none",
    },
    heroBg2: {
      position: "absolute",
      bottom: -80,
      left: -80,
      width: 400,
      height: 400,
      background: `radial-gradient(circle, rgba(89,56,42,0.1) 0%, transparent 70%)`,
      borderRadius: "50%",
      pointerEvents: "none",
    },
    heroBadge: {
      display: "inline-block",
      background: `rgba(89,56,42,0.1)`,
      color: BRAND,
      borderRadius: 20,
      padding: "6px 18px",
      fontSize: "0.8rem",
      fontWeight: 700,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      marginBottom: 24,
    },
    heroTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "clamp(2.4rem, 6vw, 5rem)",
      lineHeight: 1.15,
      letterSpacing: "-0.04em",
      color: TEXT_DARK,
      maxWidth: 820,
      margin: "0 auto 24px",
    },
    heroTitleAccent: {
      background: `linear-gradient(135deg, ${BRAND} 0%, ${ACCENT} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    heroSub: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
      color: TEXT_MID,
      maxWidth: 600,
      margin: "0 auto 40px",
      lineHeight: 1.7,
      opacity: 0.85,
    },
    heroBtns: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: 56,
    },
    btnPrimary: (hovered) => ({
      background: hovered ? BRAND_DARK : BRAND,
      color: "#fff",
      border: "none",
      borderRadius: 0,
      padding: "16px 36px",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.2s",
      transform: hovered ? "translateY(-2px)" : "translateY(0)",
      boxShadow: hovered ? `0 8px 24px rgba(89,56,42,0.35)` : `0 4px 12px rgba(89,56,42,0.2)`,
      textDecoration: "none",
      display: "inline-block",
    }),
    btnSecondary: (hovered) => ({
      background: "transparent",
      color: BRAND,
      border: `2px solid ${BRAND}`,
      borderRadius: 0,
      padding: "14px 36px",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.2s",
      transform: hovered ? "translateY(-2px)" : "translateY(0)",
      background: hovered ? `rgba(89,56,42,0.05)` : "transparent",
    }),
    heroStats: {
      display: "flex",
      gap: 48,
      justifyContent: "center",
      flexWrap: "wrap",
    },
    heroStat: {
      textAlign: "center",
    },
    heroStatNum: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "2.2rem",
      color: BRAND,
      lineHeight: 1,
    },
    heroStatLabel: {
      fontSize: "0.85rem",
      color: TEXT_LIGHT,
      marginTop: 4,
    },
    section: (bg) => ({
      padding: "100px 5%",
      background: bg || BRAND_LIGHT,
    }),
    sectionInner: {
      maxWidth: 1200,
      margin: "0 auto",
    },
    sectionBadge: {
      display: "inline-block",
      background: `rgba(89,56,42,0.1)`,
      color: BRAND,
      borderRadius: 20,
      padding: "5px 16px",
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      marginBottom: 16,
    },
    sectionTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "clamp(1.8rem, 4vw, 3rem)",
      color: TEXT_DARK,
      letterSpacing: "-0.04em",
      lineHeight: 1.2,
      marginBottom: 16,
    },
    sectionSub: {
      fontSize: "1.05rem",
      color: TEXT_MID,
      lineHeight: 1.7,
      maxWidth: 600,
      opacity: 0.8,
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 24,
      marginTop: 56,
    },
    featureCard: (hovered) => ({
      background: hovered ? "#fff" : "rgba(255,255,255,0.7)",
      border: `1px solid ${hovered ? ACCENT : "rgba(89,56,42,0.1)"}`,
      borderRadius: 0,
      padding: "32px 28px",
      cursor: "default",
      transition: "all 0.25s",
      transform: hovered ? "translateY(-6px)" : "translateY(0)",
      boxShadow: hovered ? `0 12px 32px rgba(89,56,42,0.12)` : "none",
    }),
    featureIcon: {
      fontSize: "2.5rem",
      marginBottom: 16,
    },
    featureTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "1.1rem",
      color: TEXT_DARK,
      marginBottom: 10,
    },
    featureDesc: {
      fontSize: "0.9rem",
      color: TEXT_MID,
      lineHeight: 1.7,
      opacity: 0.85,
    },
    coursesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 28,
      marginTop: 56,
    },
    courseCard: (hovered) => ({
      background: "#fff",
      borderRadius: 0,
      overflow: "hidden",
      border: `1px solid ${hovered ? ACCENT : "rgba(89,56,42,0.1)"}`,
      transition: "all 0.25s",
      transform: hovered ? "translateY(-6px)" : "translateY(0)",
      boxShadow: hovered ? `0 16px 40px rgba(89,56,42,0.15)` : "0 2px 8px rgba(89,56,42,0.06)",
      cursor: "pointer",
    }),
    courseImg: {
      width: "100%",
      height: 200,
      objectFit: "cover",
      display: "block",
    },
    courseBody: {
      padding: "24px 20px",
    },
    courseBadge: (tag) => ({
      display: "inline-block",
      background: tag === "Nuevo" ? "#4ccc6b22" : tag === "Popular" ? `rgba(89,56,42,0.1)` : `rgba(200,149,108,0.15)`,
      color: tag === "Nuevo" ? "#2a9a47" : tag === "Popular" ? BRAND : ACCENT,
      borderRadius: 4,
      padding: "3px 10px",
      fontSize: "0.72rem",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: 12,
    }),
    courseTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "1.1rem",
      color: TEXT_DARK,
      marginBottom: 12,
    },
    courseMeta: {
      display: "flex",
      gap: 16,
      fontSize: "0.82rem",
      color: TEXT_LIGHT,
    },
    divider: {
      width: "100%",
      height: 1,
      background: `linear-gradient(90deg, transparent, rgba(89,56,42,0.15), transparent)`,
      margin: "0 auto",
    },
    testimonialsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 24,
      marginTop: 56,
    },
    testimonialCard: {
      background: "#fff",
      border: `1px solid rgba(89,56,42,0.08)`,
      borderRadius: 0,
      padding: "32px 28px",
      position: "relative",
    },
    testimonialQuote: {
      fontSize: "3rem",
      color: ACCENT,
      lineHeight: 0.5,
      marginBottom: 16,
      fontFamily: "Georgia, serif",
    },
    testimonialText: {
      fontSize: "0.92rem",
      color: TEXT_MID,
      lineHeight: 1.75,
      marginBottom: 24,
      fontStyle: "italic",
    },
    testimonialAuthor: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    testimonialAvatar: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      objectFit: "cover",
      border: `2px solid ${ACCENT}`,
    },
    testimonialName: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "0.9rem",
      color: TEXT_DARK,
    },
    testimonialRole: {
      fontSize: "0.78rem",
      color: TEXT_LIGHT,
    },
    ctaSection: {
      background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_MID} 50%, ${ACCENT} 100%)`,
      padding: "100px 5%",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    ctaTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "clamp(2rem, 5vw, 3.5rem)",
      color: "#fff",
      letterSpacing: "-0.04em",
      lineHeight: 1.2,
      marginBottom: 20,
      maxWidth: 700,
      margin: "0 auto 20px",
    },
    ctaSub: {
      fontSize: "1.05rem",
      color: "rgba(255,255,255,0.85)",
      marginBottom: 40,
      lineHeight: 1.7,
    },
    ctaBtn: (hovered) => ({
      background: hovered ? BRAND_LIGHT : "#fff",
      color: BRAND,
      border: "none",
      borderRadius: 0,
      padding: "18px 48px",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "1.1rem",
      cursor: "pointer",
      transition: "all 0.2s",
      transform: hovered ? "translateY(-3px)" : "translateY(0)",
      boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.2)" : "0 4px 16px rgba(0,0,0,0.15)",
      textDecoration: "none",
      display: "inline-block",
    }),
    registerSection: {
      background: "#fff",
      padding: "100px 5%",
    },
    registerInner: {
      maxWidth: 520,
      margin: "0 auto",
    },
    formGroup: {
      marginBottom: 20,
    },
    label: {
      display: "block",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 500,
      fontSize: "0.88rem",
      color: TEXT_DARK,
      marginBottom: 8,
    },
    input: (err) => ({
      width: "100%",
      padding: "14px 18px",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.95rem",
      border: `1px solid ${err ? "#D83232" : "rgba(89,56,42,0.2)"}`,
      borderRadius: 0,
      background: BRAND_LIGHT,
      color: TEXT_DARK,
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    }),
    errorMsg: {
      fontSize: "0.78rem",
      color: "#D83232",
      marginTop: 5,
    },
    submitBtn: (hovered) => ({
      width: "100%",
      background: hovered ? BRAND_DARK : BRAND,
      color: "#fff",
      border: "none",
      borderRadius: 0,
      padding: "16px",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.2s",
      transform: hovered ? "translateY(-1px)" : "translateY(0)",
      boxShadow: hovered ? `0 6px 20px rgba(89,56,42,0.3)` : "none",
      marginTop: 8,
    }),
    successBox: {
      background: `rgba(76,204,107,0.1)`,
      border: `1px solid #4ccc6b`,
      borderRadius: 0,
      padding: "20px 24px",
      textAlign: "center",
      marginTop: 24,
    },
    successText: {
      color: "#2a9a47",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "0.95rem",
    },
    faqItem: (open) => ({
      borderBottom: `1px solid rgba(89,56,42,0.1)`,
      padding: "20px 0",
      cursor: "pointer",
    }),
    faqQ: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "1rem",
      color: TEXT_DARK,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    faqA: (open) => ({
      fontSize: "0.9rem",
      color: TEXT_MID,
      lineHeight: 1.7,
      marginTop: open ? 12 : 0,
      maxHeight: open ? 200 : 0,
      overflow: "hidden",
      transition: "max-height 0.3s ease, margin-top 0.3s ease",
      opacity: open ? 0.85 : 0,
    }),
    faqIcon: (open) => ({
      fontSize: "1.4rem",
      color: BRAND,
      transition: "transform 0.3s",
      transform: open ? "rotate(45deg)" : "rotate(0deg)",
      flexShrink: 0,
      marginLeft: 12,
    }),
    footer: {
      background: BRAND,
      color: "#fff",
      padding: "60px 5% 32px",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 40,
      maxWidth: 1200,
      margin: "0 auto",
      paddingBottom: 40,
      borderBottom: "1px solid rgba(255,255,255,0.15)",
    },
    footerLogo: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: "1.4rem",
      color: "#fff",
      marginBottom: 12,
    },
    footerTagline: {
      fontSize: "0.85rem",
      color: "rgba(255,255,255,0.7)",
      lineHeight: 1.6,
    },
    footerColTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "0.9rem",
      color: "#fff",
      marginBottom: 16,
      letterSpacing: "0.05em",
    },
    footerLink: {
      display: "block",
      fontSize: "0.85rem",
      color: "rgba(255,255,255,0.65)",
      marginBottom: 10,
      cursor: "pointer",
      transition: "color 0.2s",
      textDecoration: "none",
    },
    footerBottom: {
      maxWidth: 1200,
      margin: "24px auto 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
      fontSize: "0.8rem",
      color: "rgba(255,255,255,0.5)",
    },
  };

  const navItems = [
    { id: "inicio", label: "Inicio" },
    { id: "cursos", label: "Cursos" },
    { id: "beneficios", label: "Beneficios" },
    { id: "testimonios", label: "Testimonios" },
    { id: "registro", label: "Registro" },
  ];

  return (
    <div style={styles.root}>
      {/* Fuentes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Barlow:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .hero-stats { gap: 24px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-el { display: none !important; }
        }
        input:focus {
          border-color: ${BRAND} !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(89,56,42,0.1);
        }
        a { text-decoration: none; }
        ::selection { background: rgba(89,56,42,0.15); }
      `}</style>

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => scrollTo("inicio")}>
          <div style={styles.logoIcon}>🌟</div>
          <span>Aura Path</span>
        </div>
        <ul style={styles.navLinks} className="nav-desktop">
          {navItems.map((item) => (
            <li key={item.id}>
              <span
                style={styles.navLink(activeTab === item.id)}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
        <button
          style={styles.navCta}
          className="nav-desktop"
          onMouseEnter={() => setHoveredBtn("navCta")}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={() => window.open(CTA_URL, "_blank")}
        >
          Comenzar Gratis
        </button>
        <button
          className="hamburger-btn"
          style={{ ...styles.hamburger, display: "none" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? (
            <span style={{ fontSize: "1.5rem", color: BRAND, lineHeight: 1 }}>✕</span>
          ) : (
            <>
              <div style={styles.hamburgerLine} />
              <div style={styles.hamburgerLine} />
              <div style={styles.hamburgerLine} />
            </>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu} className="mobile-menu-el">
          {navItems.map((item) => (
            <div
              key={item.id}
              style={styles.mobileNavLink(activeTab === item.id)}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </div>
          ))}
          <button
            style={{ ...styles.navCta, width: "100%", marginTop: 8 }}
            onClick={() => { setMenuOpen(false); window.open(CTA_URL, "_blank"); }}
          >
            Comenzar Gratis
          </button>
        </div>
      )}

      {/* HERO */}
      <section id="inicio" style={styles.hero}>
        <div style={styles.heroBg1} />
        <div style={styles.heroBg2} />
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <AnimatedSection>
            <div style={styles.heroBadge}>✨ Plataforma Nº1 de Crecimiento Espiritual</div>
            <h1 style={styles.heroTitle}>
              Despierta tu{" "}
              <span style={styles.heroTitleAccent}>potencial infinito</span>
              {" "}con Aura Path
            </h1>
            <p style={styles.heroSub}>
              Una plataforma educativa transformadora para el crecimiento personal y espiritual.
              Más de 50,000 personas ya cambiaron su vida.
            </p>
            <div style={styles.heroBtns}>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.btnPrimary(hoveredBtn === "hero1")}
                onMouseEnter={() => setHoveredBtn("hero1")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                Comenzar Mi Camino →
              </a>
              <button
                style={styles.btnSecondary(hoveredBtn === "hero2")}
                onMouseEnter={() => setHoveredBtn("hero2")}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={() => scrollTo("cursos")}
              >
                Ver Cursos
              </button>
            </div>
            <div style={styles.heroStats} className="hero-stats">
              {[
                { num: "50K+", label: "Estudiantes activos" },
                { num: "120+", label: "Cursos disponibles" },
                { num: "4.9★", label: "Valoración media" },
                { num: "95%", label: "Tasa de satisfacción" },
              ].map((s) => (
                <div key={s.label} style={styles.heroStat}>
                  <div style={styles.heroStatNum}>{s.num}</div>
                  <div style={styles.heroStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" style={styles.section("#fff")}>
        <div style={styles.sectionInner}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={styles.sectionBadge}>¿Por qué Aura Path?</div>
              <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>
                Todo lo que necesitas para transformarte
              </h2>
              <p style={{ ...styles.sectionSub, margin: "0 auto", textAlign: "center" }}>
                Diseñamos cada experiencia para que sientas un cambio real en tu vida,
                semana a semana.
              </p>
            </div>
          </AnimatedSection>
          <div style={styles.featuresGrid}>
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.08}>
                <div
                  style={styles.featureCard(hoveredFeature === i)}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div style={styles.featureIcon}>{f.icon}</div>
                  <div style={styles.featureTitle}>{f.title}</div>
                  <div style={styles.featureDesc}>{f.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div style={styles.divider} />

      {/* CURSOS */}
      <section id="cursos" style={styles.section(BRAND_LIGHT)}>
        <div style={styles.sectionInner}>
          <AnimatedSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={styles.sectionBadge}>Aprendizaje</div>
                <h2 style={styles.sectionTitle}>Cursos Destacados</h2>
                <p style={styles.sectionSub}>
                  Programas creados por expertos para guiarte en cada etapa de tu camino espiritual.
                </p>
              </div>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.btnPrimary(hoveredBtn === "verTodos")}
                onMouseEnter={() => setHoveredBtn("verTodos")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                Ver todos
              </a>
            </div>
          </AnimatedSection>
          <div style={styles.coursesGrid}>
            {courses.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.1}>
                <div
                  style={styles.courseCard(hoveredCourse === i)}
                  onMouseEnter={() => setHoveredCourse(i)}
                  onMouseLeave={() => setHoveredCourse(null)}
                  onClick={() => window.open(CTA_URL, "_blank")}
                >
                  <img src={c.img} alt={c.title} style={styles.courseImg} loading="lazy" />
                  <div style={styles.courseBody}>
                    <div style={styles.courseBadge(c.tag)}>{c.tag}</div>
                    <div style={styles.courseTitle}>{c.title}</div>
                    <div style={styles.courseMeta}>
                      <span>📖 {c.lessons} lecciones</span>
                      <span>⏱ {c.duration}</span>
                      <span>🎓 {c.level}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonios" style={styles.section("#fff")}>
        <div style={styles.sectionInner}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={styles.sectionBadge}>Testimonios</div>
              <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>
                Lo que dicen nuestros estudiantes
              </h2>
              <p style={{ ...styles.sectionSub, textAlign: "center", margin: "0 auto" }}>
                Miles de personas ya transformaron su vida. Esta podría ser tu historia.
              </p>
            </div>
          </AnimatedSection>
          <div style={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div style={styles.testimonialCard}>
                  <div style={styles.testimonialQuote}>"</div>
                  <p style={styles.testimonialText}>{t.text}</p>
                  <div style={styles.testimonialAuthor}>
                    <img src={t.avatar} alt={t.name} style={styles.testimonialAvatar} />
                    <div>
                      <div style={styles.testimonialName}>{t.name}</div>
                      <div style={styles.testimonialRole}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={styles.ctaSection}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: "rgba(255,255,255,0.05)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <AnimatedSection>
            <div style={{ ...styles.heroBadge, background: "rgba(255,255,255,0.15)", color: "#fff" }}>
              🌟 Comienza Hoy
            </div>
            <h2 style={styles.ctaTitle}>
              Tu transformación comienza con un solo paso
            </h2>
            <p style={styles.ctaSub}>
              Únete a 50,000+ personas que ya eligieron un camino de crecimiento real.
              Acceso inmediato a todos los cursos y la comunidad.
            </p>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.ctaBtn(hoveredBtn === "ctaMain")}
              onMouseEnter={() => setHoveredBtn("ctaMain")}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              Comenzar Gratis Ahora
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.section(BRAND_LIGHT)}>
        <div style={{ ...styles.sectionInner, maxWidth: 720 }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={styles.sectionBadge}>FAQ</div>
              <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>
                Preguntas Frecuentes
              </h2>
            </div>
          </AnimatedSection>
          {faqs.map((faq, i) => (
            <AnimatedSection key={faq.q} delay={i * 0.05}>
              <div
                style={styles.faqItem(openFaq === i)}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={styles.faqQ}>
                  <span>{faq.q}</span>
                  <span style={styles.faqIcon(openFaq === i)}>+</span>
                </div>
                <div style={styles.faqA(openFaq === i)}>{faq.a}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* REGISTRO */}
      <section id="registro" style={styles.registerSection}>
        <div style={styles.registerInner}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={styles.sectionBadge}>Únete Ahora</div>
              <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>
                Crea tu cuenta gratuita
              </h2>
              <p style={{ ...styles.sectionSub, textAlign: "center" }}>
                En menos de 60 segundos tendrás acceso a todo el contenido de Aura Path.
              </p>
            </div>

            {submitted ? (
              <div style={styles.successBox}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✅</div>
                <div style={styles.successText}>
                  ¡Perfecto, {formData.name}! Redirigiendo a la plataforma...
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre completo</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={styles.input(formErrors.name)}
                  />
                  {formErrors.name && <div style={styles.errorMsg}>{formErrors.name}</div>}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Correo electrónico</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={styles.input(formErrors.email)}
                  />
                  {formErrors.email && <div style={styles.errorMsg}>{formErrors.email}</div>}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Contraseña</label>
                  <input
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={styles.input(formErrors.password)}
                  />
                  {formErrors.password && <div style={styles.errorMsg}>{formErrors.password}</div>}
                </div>
                <button
                  type="submit"
                  style={styles.submitBtn(hoveredBtn === "submit")}
                  onMouseEnter={() => setHoveredBtn("submit")}
                  onMouseLeave={() => setHoveredBtn(null)}
                >
                  Crear Cuenta Gratuita →
                </button>
                <p style={{ textAlign: "center", fontSize: "0.78rem", color: TEXT_LIGHT, marginTop: 16 }}>
                  Al registrarte aceptas nuestros{" "}
                  <span style={{ color: BRAND, cursor: "pointer" }}>Términos de Uso</span>
                  {" "}y{" "}
                  <span style={{ color: BRAND, cursor: "pointer" }}>Política de Privacidad</span>
                </p>
              </form>
            )}

            <div style={{ textAlign: "center", marginTop: 32 }}>
              <p style={{ fontSize: "0.85rem", color: TEXT_LIGHT }}>¿Ya tienes cuenta?{" "}
                <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ color: BRAND, fontWeight: 600 }}>
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <div style={styles.footerLogo}>🌟 Aura Path</div>
            <p style={styles.footerTagline}>
              Una plataforma educativa transformadora para el crecimiento personal y espiritual.
            </p>
          </div>
          <div>
            <div style={styles.footerColTitle}>Plataforma</div>
            {["Cursos", "Meditaciones", "Comunidad", "Certificados"].map((l) => (
              <a key={l} href={CTA_URL} target="_blank" rel="noopener noreferrer" style={styles.footerLink}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.65)")}
              >{l}</a>
            ))}
          </div>
          <div>
            <div style={styles.footerColTitle}>Empresa</div>
            {["Sobre Nosotros", "Blog", "Prensa", "Trabaja con Nosotros"].map((l) => (
              <a key={l} href={CTA_URL} target="_blank" rel="noopener noreferrer" style={styles.footerLink}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.65)")}
              >{l}</a>
            ))}
          </div>
          <div>
            <div style={styles.footerColTitle}>Soporte</div>
            {["Centro de Ayuda", "Contacto", "Política de Privacidad", "Términos de Uso"].map((l) => (
              <a key={l} href={CTA_URL} target="_blank" rel="noopener noreferrer" style={styles.footerLink}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.65)")}
              >{l}</a>
            ))}
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Aura Path. Todos los derechos reservados.</span>
          <span>Hecho con ❤️ para tu crecimiento</span>
        </div>
      </footer>
    </div>
  );
}