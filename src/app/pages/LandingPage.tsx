import { Button } from "../components/ui/button";
import { MapPin, Bot, Building2, Shield, BarChart, Cloud, X, Settings, Menu, LogOut, Instagram, Twitter, Facebook, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logo from "figma:asset/3bd42a968c481c071a2737e08083b7a8f63eb4dc.png";
import bahrainLogo from "figma:asset/ea04be62e0d64df18e1c7581e7da3617370afb31.png";
import bahrain2030Logo from "figma:asset/2b4c1c03d6ef3fcf46439328e6dae3dc1488a0fa.png";
import loginImage from "figma:asset/96bfa1c8fe2c99c3d54500aa4feba1e8b0e4e463.png";
import heroImage from "figma:asset/fe0d8c445391ae0905016b35835b795e71e22df4.png";
import heroImageBSDI from "figma:asset/abaadf30c853725a08348b6d391e9ff1a5b88f42.png";
import imgInformationEGovernmentAuthority from "figma:asset/f605a5e591189376365a30f4b95cd45df42b30e8.png";
import imgSurveyAndLandRegistrationBureau from "figma:asset/727daca89e21026342142442add6c9766c555cbb.png";
import imgSocialInsuranceOrganization from "figma:asset/f1c6e9c2249bcaeb1e3018078696afc3cfcf52d0.png";
import imgTenderBoard from "figma:asset/01f965fdea88f9f7d0cced4e43fd8e495d4ffef2.png";
import imgMinistryOfForeignAffairs from "figma:asset/f19352d4f262cdb0f5fc7260253177e0bfaae583.png";
import imgMinistryOfIndustryAndCommerce from "figma:asset/d0a3949086d392f40ff1edc155daf8aa8b1bcd3b.png";
import imgMinistryOfTransportationAndTelecommunications from "figma:asset/d6aa7287fb342a673e97a0e070843e01698abdc2.png";
import imgMinistryOfInterior from "figma:asset/8f93324345cc3e00b8122973bbc8251a16de98d9.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { getWebsiteContent, WebsiteContent } from "../utils/contentManager";
import svgPaths from "../../imports/svg-87a0ab3dc1";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MapPin,
  Bot,
  Building2,
  Shield,
  BarChart,
  Cloud
};

// Animated Counter Component
function StatCounter({ end, suffix = "", label, decimals = 0 }: { end: number; suffix?: string; label: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000; // 2 seconds
          const steps = 60;
          const increment = end / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={counterRef} className="text-center">
      <div className="text-4xl font-bold text-red-600">
        {count.toFixed(decimals)}{suffix}
      </div>
      <div className="text-sm text-slate-600 mt-2">{label}</div>
    </div>
  );
}

export default function LandingPage() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState<WebsiteContent>(getWebsiteContent());
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("bsdi_logged_in") === "true";
    setIsLoggedIn(loggedIn);
    
    // Load content
    setContent(getWebsiteContent());

    // Listen for storage changes (when admin publishes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "bsdi_website_content" || e.key === "bsdi_last_updated") {
        console.log("Content updated, reloading...");
        setContent(getWebsiteContent());
      }
    };

    // Listen for custom event from same window (for same-tab updates)
    const handleContentUpdate = () => {
      console.log("Content updated in same window, reloading...");
      setContent(getWebsiteContent());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("bsdi_content_updated", handleContentUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("bsdi_content_updated", handleContentUpdate);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in real app, validate credentials
    localStorage.setItem("bsdi_logged_in", "true");
    setShowLoginPopup(false);
    setIsLoggedIn(true);
    navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("bsdi_logged_in");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Get icon component by name
  const getIcon = (iconName: string, className: string = "w-8 h-8") => {
    const icons: Record<string, React.ReactNode> = {
      MapPin: <MapPin className={className} />,
      Bot: <Bot className={className} />,
      Building2: <Building2 className={className} />,
      Shield: <Shield className={className} />,
      BarChart: <BarChart className={className} />,
      Cloud: <Cloud className={className} />
    };
    return icons[iconName] || <MapPin className={className} />;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="Information & eGovernment Authority" className="h-10" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-700 hover:text-red-500 transition-colors font-medium">About</a>
              <a href="#services" className="text-slate-700 hover:text-red-500 transition-colors font-medium">Services</a>
              <a href="#users" className="text-slate-700 hover:text-red-500 transition-colors font-medium">Who Can Use</a>
              <a href="#contact" className="text-slate-700 hover:text-red-500 transition-colors font-medium">Contact</a>
              {isLoggedIn ? (
                <Button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              ) : (
                <Button 
                  onClick={() => setShowLoginPopup(true)}
                  className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Admin CRM
                </Button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute top-20 left-0 right-0 bg-white shadow-2xl">
            <nav className="flex flex-col p-6 space-y-4">
              <a 
                href="#about" 
                className="text-slate-700 hover:text-red-500 transition-colors font-medium py-3 border-b border-slate-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#services" 
                className="text-slate-700 hover:text-red-500 transition-colors font-medium py-3 border-b border-slate-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#users" 
                className="text-slate-700 hover:text-red-500 transition-colors font-medium py-3 border-b border-slate-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Who Can Use
              </a>
              <a 
                href="#contact" 
                className="text-slate-700 hover:text-red-500 transition-colors font-medium py-3 border-b border-slate-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              {isLoggedIn ? (
                <Button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 py-3 mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowLoginPopup(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 py-3 mt-2"
                >
                  <Settings className="w-4 h-4" />
                  Login
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full mx-4 max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>

            <div className="grid md:grid-cols-2 min-h-[600px]">
              {/* Left Side - Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={loginImage} 
                  alt="BSDI Spatial Intelligence" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">BSDI Admin Portal</h3>
                  <p className="text-white/90">Secure access to spatial intelligence management</p>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="p-12 flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                    <p className="text-slate-600">Sign in to access the admin dashboard</p>
                  </div>

                  <form className="space-y-6" onSubmit={handleLogin}>
                    {/* Email/Username Input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                        Email or Username
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Enter your email or username"
                        defaultValue="admin@bsdi.gov.bh"
                        required
                      />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Enter your password"
                        defaultValue="admin123"
                        required
                      />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-red-500 border-slate-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-slate-600">Remember me</span>
                      </label>
                      <a href="#" className="text-sm text-red-500 hover:text-red-600 font-medium">
                        Forgot password?
                      </a>
                    </div>

                    {/* Login Button */}
                    <Button 
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
                    >
                      Sign In
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
  
                      </div>

                    </div>

                    {/* Alternative Login Methods */}
                    <div className="grid grid-cols-2 gap-4">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-20">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={
              content.hero.imageUrl?.startsWith('figma:asset') 
                ? heroImageBSDI 
                : content.hero.imageUrl || heroImageBSDI
            } 
            alt="BSDI Spatial Intelligence Platform" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to default hero image if URL fails
              e.currentTarget.src = heroImage;
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
              style={{ color: content.hero.titleColor || "#FFFFFF" }}
            >
              {content.hero.title}
            </h1>
            <p 
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
              style={{ color: content.hero.subtitleColor || "#F3F4F6" }}
            >
              {content.hero.subtitle}
            </p>
            <div className="pt-4">
              <button className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105">
                {content.hero.ctaButtonText}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-7 h-11 border-2 border-red-500 rounded-full flex items-start justify-center p-2 bg-white/10 backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-red-500 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <h2 className="text-5xl font-bold text-center mb-6 text-slate-900">
              BSDI Vision
            </h2>
            
            {/* Subtitle */}
            <p className="text-2xl text-center text-red-500 font-semibold mb-12">
              Empowering Bahrain through a unified geospatial ecosystem.
            </p>

            {/* Vision Description */}
            <div className="max-w-4xl mx-auto mb-16">
              <p className="text-lg text-slate-700 leading-relaxed text-center">
                The vision of BSDI is to create a secure, scalable, and collaborative national geospatial infrastructure that enables government entities to efficiently manage, share, and analyze spatial data. Through the integration of modern GIS technologies, GeoAI, 3D visualization, and BIM integration, BSDI supports smarter decision-making and strengthens Bahrain's digital transformation strategy.
              </p>
            </div>

            {/* Vision Cards with Images */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Digital Transformation */}
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb24lMjB0ZWNobm9sb2d5JTIwbmV0d29ya3xlbnwxfHx8fDE3NzI3NTYyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Digital Transformation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Digital Transformation</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 leading-relaxed">
                    Leveraging cutting-edge technologies to modernize Bahrain's infrastructure and drive innovation across all government sectors.
                  </p>
                </div>
              </div>

              {/* Geospatial Intelligence */}
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1744968777188-3e1b2ef23339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9zcGF0aWFsJTIwbWFwcGluZyUyMHNhdGVsbGl0ZSUyMGRhdGF8ZW58MXx8fHwxNzcyNzgyNDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Geospatial Intelligence"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Geospatial Intelligence</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 leading-relaxed">
                    Advanced GIS and GeoAI capabilities enable data-driven insights for strategic planning and resource management.
                  </p>
                </div>
              </div>

              {/* Smart Cities */}
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1760553120312-2821bf54e767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjB1cmJhbiUyMHBsYW5uaW5nfGVufDF8fHx8MTc3Mjc4MjQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Smart Cities"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Smart Cities</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 leading-relaxed">
                    Building sustainable, connected urban environments through intelligent spatial planning and 3D visualization.
                  </p>
                </div>
              </div>
            </div>

            {/* Scope of Work Section */}
            
          </div>
        </div>
      </section>

      {/* About BSDI Section */}
      <section id="about" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 mx-[155px] my-[-99px]">
          <div className="max-w-4xl mx-auto">
            <h2 
              className="text-5xl font-bold text-center mb-8"
              style={{ color: content.about.titleColor || "#111827" }}
            >
              {content.about.title}
            </h2>
            
            <div 
              className="space-y-6 text-lg leading-relaxed whitespace-pre-line text-center"
              style={{ color: content.about.contentColor || "#374151" }}
            >
              {content.about.content}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <StatCounter end={100} suffix="+" label="Government Agencies" />
              <StatCounter end={24} suffix="/7" label="Real-Time Access" />
              <StatCounter end={99.9} suffix="%" label="Uptime" decimals={1} />
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600">Secure</div>
                <div className="text-sm text-slate-600 mt-2">National Standards</div>
              </div>
            </div>

            {/* Why SDI Matters Section */}
            <div className="mt-32">
              
            </div>
          </div>
        </div>
      </section>

      {/* What BSDI Provides Section */}
      <section id="services" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-6 text-slate-900">
            {content.servicesTitle}
          </h2>
          <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
            Comprehensive spatial intelligence solutions for modern government operations
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {content.services.map((service) => {
              const IconComponent = iconMap[service.icon] || MapPin;
              return (
                <div key={service.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Card content */}
                  <div className="relative">
                    {/* Image with overlay */}
                    <div className="relative h-[280px] overflow-hidden">
                      <ImageWithFallback
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      {/* Icon badge on image */}
                      <div className="absolute top-4 right-4 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-red-500 transition-all duration-300">
                        <IconComponent className="w-7 h-7 text-red-500 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                      </div>

                      {/* Tags overlay on image */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 flex-wrap">
                        {service.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium rounded-full shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="p-6 space-y-4">
                      <h3 
                        className="text-2xl font-bold leading-tight"
                        style={{ color: service.nameColor || "#111827" }}
                      >
                        {service.name}
                      </h3>
                      
                      <p 
                        className="text-sm leading-relaxed min-h-[60px]"
                        style={{ color: service.descriptionColor || "#64748b" }}
                      >
                        {service.description}
                      </p>

                      {/* Action button */}
                      <div className="pt-2">
                        <button className="w-full h-12 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                          <span>Learn More</span>
                          <svg 
                            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-red-500/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Can Use BSDI Section */}
      <section id="users" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-8 text-slate-900">
              Who Can Use BSDI?
            </h2>
            
            <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
              BSDI is designed for organizations that rely on accurate spatial data, secure collaboration, and intelligent insights to make strategic decisions.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Government Authorities */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1612165469953-69b4bc7eedbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhdXRob3JpdHl8ZW58MXx8fHwxNzcyNDM3NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Government Authorities"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 space-y-3 bg-gray-800">
                  <h3 className="text-xl font-bold text-white">Government Authorities</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Empowering national and local government bodies with comprehensive GIS infrastructure for policy making, urban development, and citizen services.
                  </p>
                </div>
              </div>

              {/* Urban Planning */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1760553120324-d3d2bf53852b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBsYW5uaW5nJTIwY2l0eSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc3MjQyNDQ3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Urban Planning"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 space-y-3 bg-gray-800">
                  <h3 className="text-xl font-bold text-white">Urban Planning Departments</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Strategic tools for city planners to visualize growth, manage land use, and create sustainable urban environments with data-driven insights.
                  </p>
                </div>
              </div>

              {/* Infrastructure & Utilities */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1765028994202-abd7b1649971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMHV0aWxpdGllcyUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzcyNDM3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Infrastructure"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 space-y-3 bg-gray-800">
                  <h3 className="text-xl font-bold text-white">Infrastructure & Utilities</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Manage critical infrastructure networks including water, electricity, telecommunications, and transportation with real-time spatial monitoring.
                  </p>
                </div>
              </div>

              {/* Environmental Agencies */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1641392945935-194a6251804a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwYWdlbmN5JTIwbmF0dXJlfGVufDF8fHx8MTc3MjQzNzU2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Environmental Agencies"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 space-y-3 bg-gray-800">
                  <h3 className="text-xl font-bold text-white">Environmental Agencies</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Monitor environmental changes, track natural resources, and implement conservation strategies using advanced geospatial analysis tools.
                  </p>
                </div>
              </div>

              {/* Transportation & Smart Cities */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1699602050604-698045645108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc3BvcnRhdGlvbiUyMHNtYXJ0JTIwY2l0eXxlbnwxfHx8fDE3NzI0Mzc1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Transportation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 space-y-3 bg-gray-800">
                  <h3 className="text-xl font-bold text-white">Transportation & Smart Cities</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Optimize traffic flow, plan public transit routes, and build intelligent city systems with integrated transportation data and analytics.
                  </p>
                </div>
              </div>

              {/* National Security */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1763888709576-71022f7b2658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBzZXJ2aWNlcyUyMHNlY3VyaXR5fGVufDF8fHx8MTc3MjQzNzU2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Emergency Services"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 space-y-3 bg-gray-800">
                  <h3 className="text-xl font-bold text-white">National Security & Emergency Services</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Enhance response times and coordination during emergencies with real-time location intelligence and secure communication channels.
                  </p>
                </div>
              </div>

              {/* Developers & Private Enterprises */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1514591792873-8862494066d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyNDM3NTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Developers"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 space-y-3 bg-gray-800">
                  <h3 className="text-xl font-bold text-white">Developers & Private Enterprises</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Build innovative location-based applications and services using our comprehensive APIs and developer-friendly spatial data infrastructure.
                  </p>
                </div>
              </div>

              {/* Research & Academia */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1623632306901-e509641e7191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGFjYWRlbWlhJTIwdW5pdmVyc2l0eXxlbnwxfHx8fDE3NzI0Mzc1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Research and Academia"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 space-y-3 bg-gray-800">
                  <h3 className="text-xl font-bold text-white">Research & Academia</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Access high-quality spatial datasets for academic research, geographic studies, and educational programs in GIS and spatial sciences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* eServices Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-900 mb-4">Data Services Provided by</h2>
              <p className="text-xl text-slate-600">Find Data Services by their providing entities</p>
            </div>

            {/* Ministry Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {/* Information & eGovernment Authority */}
              <a 
                href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity"
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <img 
                      src={imgInformationEGovernmentAuthority} 
                      alt="Information & eGovernment Authority" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900 leading-tight">
                    Information & eGovernment Authority
                  </h3>
                </div>
              </a>

              {/* Survey and Land Registration Bureau */}
              <a 
                href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity"
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <img 
                      src={imgSurveyAndLandRegistrationBureau} 
                      alt="Survey and Land Registration Bureau" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900 leading-tight">
                    Survey and Land Registration Bureau
                  </h3>
                </div>
              </a>

              {/* Social Insurance Organization */}
              <a 
                href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity"
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <img 
                      src={imgSocialInsuranceOrganization} 
                      alt="Social Insurance Organization" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900 leading-tight">
                    Social Insurance Organization
                  </h3>
                </div>
              </a>

              {/* Tender Board */}
              <a 
                href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity"
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <img 
                      src={imgTenderBoard} 
                      alt="Tender Board" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900 leading-tight">
                    Tender Board
                  </h3>
                </div>
              </a>

              {/* Ministry of Foreign Affairs */}
              <a 
                href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity"
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <img 
                      src={imgMinistryOfForeignAffairs} 
                      alt="Ministry of Foreign Affairs" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900 leading-tight">
                    Ministry of Foreign Affairs
                  </h3>
                </div>
              </a>

              {/* Ministry of Industry and Commerce */}
              <a 
                href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity"
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <img 
                      src={imgMinistryOfIndustryAndCommerce} 
                      alt="Ministry of Industry and Commerce" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900 leading-tight">
                    Ministry of Industry and Commerce
                  </h3>
                </div>
              </a>

              {/* Ministry of Transportation and Telecommunications */}
              <a 
                href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity"
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <img 
                      src={imgMinistryOfTransportationAndTelecommunications} 
                      alt="Ministry of Transportation and Telecommunications" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900 leading-tight">
                    Ministry of Transportation and Telecommunications
                  </h3>
                </div>
              </a>

              {/* Ministry of Interior */}
              <a 
                href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity"
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <img 
                      src={imgMinistryOfInterior} 
                      alt="Ministry of Interior" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-slate-900 leading-tight">
                    Ministry of Interior
                  </h3>
                </div>
              </a>
            </div>

            {/* View All Button */}
            <div className="flex justify-center">
              <a 
                href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService"
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                View all eService categories
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Left - Logos */}
            <div className="flex items-center gap-8">
              <img src={bahrainLogo} alt="Kingdom of Bahrain Information & eGovernment Authority" className="h-[188px]" />
              <img src={bahrain2030Logo} alt="Bahrain 2030" className="h-20" />
            </div>

            {/* Middle - Links */}
            <div className="flex gap-16">
              {/* Quick links */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Quick links</h4>
                <ul className="space-y-2">
                  {content.footer.quickLinks.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={link.url} 
                        className="text-gray-600 hover:text-red-500 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* External links */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">External links</h4>
                <ul className="space-y-2">
                  {content.footer.externalLinks.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={link.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-red-500 transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        {link.external && <ExternalLink className="w-3 h-3" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right - Social Media */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Follow us</h4>
              <div className="flex items-center gap-3">
                <a 
                  href={content.footer.socialMedia.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={content.footer.socialMedia.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href={content.footer.socialMedia.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href={content.footer.socialMedia.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={content.footer.socialMedia.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}