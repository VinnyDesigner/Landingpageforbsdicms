import { 
  Upload,
  Eye,
  RotateCcw,
  Image as ImageIcon,
  Type,
  Link as LinkIcon,
  Palette,
  LogOut,
  Users,
  Trash2
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import logo from "figma:asset/3bd42a968c481c071a2737e08083b7a8f63eb4dc.png";
import { getWebsiteContent, saveWebsiteContent, WebsiteContent, defaultContent, forceCleanStorage } from "../utils/contentManager";
import { toast } from "sonner";
import "../../styles/admin.css";

interface Section {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function WebsiteEditor() {
  const [selectedSection, setSelectedSection] = useState<string>("hero");
  const [selectedServiceCard, setSelectedServiceCard] = useState<string | null>(null);
  const [selectedTargetUserCard, setSelectedTargetUserCard] = useState<string | null>(null);
  const [content, setContent] = useState<WebsiteContent>(getWebsiteContent());
  const [originalContent, setOriginalContent] = useState<WebsiteContent>(getWebsiteContent());
  const [hasBase64Images, setHasBase64Images] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for base64 images
  useEffect(() => {
    const checkBase64 = () => {
      const hasHeroBase64 = content.hero.imageUrl?.startsWith('data:');
      const hasServiceBase64 = content.services.some(s => s.imageUrl?.startsWith('data:'));
      const hasUserBase64 = content.targetUsers?.users?.some(u => u.imageUrl?.startsWith('data:'));
      setHasBase64Images(!!(hasHeroBase64 || hasServiceBase64 || hasUserBase64));
    };
    checkBase64();
  }, [content]);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("bsdi_logged_in") === "true";
    if (!loggedIn) {
      navigate("/");
    }

    // Get section from URL
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    if (section) {
      setSelectedSection(section);
    }
  }, [navigate]);

  const handlePublish = () => {
    saveWebsiteContent(content);
    toast.success("Changes published successfully!");
    
    // Dispatch custom event to notify other windows/tabs
    window.dispatchEvent(new Event("bsdi_content_updated"));
  };

  const handleResetAll = () => {
    // Confirm before resetting
    if (window.confirm("Are you sure you want to reset all sections to default? This will discard all your changes.")) {
      setContent(defaultContent);
      setOriginalContent(defaultContent);
      saveWebsiteContent(defaultContent);
      toast.success("All sections reset to default design!");
    }
  };

  const handleCleanStorage = () => {
    if (window.confirm("This will remove all uploaded images (base64 data) and replace them with default URLs. Your text content will be preserved. Continue?")) {
      forceCleanStorage();
      const cleaned = getWebsiteContent();
      setContent(cleaned);
      setOriginalContent(cleaned);
      toast.success("Storage cleaned! All base64 images replaced with default URLs.");
    }
  };

  const updateHeroContent = (field: string, value: string) => {
    setContent({
      ...content,
      hero: { ...content.hero, [field]: value }
    });
  };

  const updateAboutContent = (field: string, value: string) => {
    setContent({
      ...content,
      about: { ...content.about, [field]: value }
    });
  };

  const updateServiceContent = (serviceId: string, field: string, value: string | string[]) => {
    setContent({
      ...content,
      services: content.services.map(service =>
        service.id === serviceId ? { ...service, [field]: value } : service
      )
    });
  };

  const updateTargetUsersContent = (field: string, value: string) => {
    setContent({
      ...content,
      targetUsers: { ...content.targetUsers, [field]: value }
    });
  };

  const updateTargetUserCard = (userId: string, field: string, value: string) => {
    setContent({
      ...content,
      targetUsers: {
        ...content.targetUsers,
        users: content.targetUsers.users.map(user =>
          user.id === userId ? { ...user, [field]: value } : user
        )
      }
    });
  };

  const updateFooterLink = (section: 'quickLinks' | 'externalLinks', index: number, field: 'label' | 'url', value: string) => {
    setContent({
      ...content,
      footer: {
        ...content.footer,
        [section]: content.footer[section].map((link, idx) =>
          idx === index ? { ...link, [field]: value } : link
        )
      }
    });
  };

  const updateFooterSocial = (platform: string, value: string) => {
    setContent({
      ...content,
      footer: {
        ...content.footer,
        socialMedia: {
          ...content.footer.socialMedia,
          [platform]: value
        }
      }
    });
  };

  // Reset functions
  const resetCurrentSection = () => {
    if (selectedServiceCard) {
      // Reset specific service card
      setContent({
        ...content,
        services: content.services.map(service =>
          service.id === selectedServiceCard 
            ? originalContent.services.find(s => s.id === selectedServiceCard) || service
            : service
        )
      });
      toast.success("Service card reset to original values");
    } else if (selectedTargetUserCard) {
      // Reset specific target user card
      setContent({
        ...content,
        targetUsers: {
          ...content.targetUsers,
          users: content.targetUsers.users.map(user =>
            user.id === selectedTargetUserCard
              ? originalContent.targetUsers.users.find(u => u.id === selectedTargetUserCard) || user
              : user
          )
        }
      });
      toast.success("User card reset to original values");
    } else if (selectedSection === "hero") {
      setContent({ ...content, hero: originalContent.hero });
      toast.success("Hero section reset to original values");
    } else if (selectedSection === "about") {
      setContent({ ...content, about: originalContent.about });
      toast.success("About section reset to original values");
    } else if (selectedSection === "services") {
      setContent({ ...content, services: originalContent.services, servicesTitle: originalContent.servicesTitle });
      toast.success("Services section reset to original values");
    } else if (selectedSection === "targetUsers") {
      setContent({ ...content, targetUsers: originalContent.targetUsers });
      toast.success("Target Users section reset to original values");
    } else if (selectedSection === "footer") {
      setContent({ ...content, footer: originalContent.footer });
      toast.success("Footer section reset to original values");
    }
  };

  const sections: Section[] = [
    { id: "hero", name: "Hero Section", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "about", name: "About BSDI", icon: <Type className="w-5 h-5" /> },
    { id: "services", name: "What BSDI Provides", icon: <Palette className="w-5 h-5" /> },
    { id: "targetUsers", name: "Who Can Use BSDI?", icon: <Users className="w-5 h-5" /> },
    { id: "footer", name: "Footer", icon: <LinkIcon className="w-5 h-5" /> },
  ];

  // Determine current editing label
  const getEditingLabel = () => {
    if (selectedServiceCard) {
      const service = content.services.find(s => s.id === selectedServiceCard);
      return service ? service.name : "";
    }
    if (selectedTargetUserCard) {
      const user = content.targetUsers.users.find(u => u.id === selectedTargetUserCard);
      return user ? user.title : "";
    }
    return sections.find(s => s.id === selectedSection)?.name || "";
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      {/* Top Bar */}
      <header className="bg-gradient-to-r from-white to-red-50 border-b border-red-200 h-16 flex items-center justify-between px-6 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.05)] relative">
        {/* Left - Logo */}
        <div className="flex items-center">
          <img src={logo} alt="BSDI Logo" className="h-10 object-contain" />
        </div>

        {/* Center - Admin Portal Text */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Admin Portal</span>
        </div>

        {/* Right - Action Buttons */}
        <div className="flex items-center gap-3">
          

          <button 
            onClick={handleResetAll}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-700 flex items-center gap-2 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Reset All</span>
          </button>
          
          <button 
            onClick={() => window.open("/", "_blank")}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-700 flex items-center gap-2 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Preview</span>
          </button>

          <button onClick={handlePublish} className="px-4 py-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center gap-2 shadow-[4px_4px_10px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.1)] hover:shadow-[2px_2px_5px_rgba(0,0,0,0.2)] transition-all font-medium">
            <Upload className="w-4 h-4" />
            <span className="text-sm">Publish</span>
          </button>

          <button 
            onClick={() => {
              localStorage.removeItem("bsdi_logged_in");
              navigate("/");
            }}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-700 flex items-center gap-2 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </header>

      {/* Warning Banner for Base64 Images */}
      {hasBase64Images && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-amber-800">
              <strong>Warning:</strong> Uploaded images detected. These consume storage and may cause errors. 
              <span className="ml-1 text-amber-700">Switch to external Image URLs (Unsplash, Imgur, ImgBB) for unlimited storage.</span>
            </p>
          </div>
          <button
            onClick={handleCleanStorage}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg transition-colors"
          >
            Clean Now
          </button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Sections List */}
        <aside className="w-72 bg-gradient-to-b from-white to-red-50/30 border-r border-red-200/50 overflow-y-auto shadow-[2px_0_10px_rgba(0,0,0,0.05)]">
          <div className="p-6">
            <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-red-400 to-rose-500 rounded-full"></span>
              Page Sections
            </h3>
            <div className="space-y-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setSelectedSection(section.id);
                    setSelectedServiceCard(null);
                    setSelectedTargetUserCard(null);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm transition-all duration-300 ${
                    selectedSection === section.id
                      ? "bg-gradient-to-br from-red-100 to-rose-100 text-red-700 font-semibold shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] scale-[0.98]"
                      : "text-slate-700 hover:bg-red-50/50 shadow-[3px_3px_8px_rgba(0,0,0,0.08),-3px_-3px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)]"
                  }`}
                >
                  <div className={`p-2 rounded-xl ${
                    selectedSection === section.id
                      ? "bg-gradient-to-br from-red-400 to-rose-500 text-white shadow-[2px_2px_5px_rgba(0,0,0,0.2)]"
                      : "bg-gradient-to-br from-red-200 to-rose-300 text-red-700 shadow-[2px_2px_4px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.8)]"
                  }`}>
                    {section.icon}
                  </div>
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Panel - Live Preview */}
        <main className="flex-1 bg-gradient-to-br from-red-50/30 via-rose-50/30 to-pink-50/30 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm min-h-[800px] shadow-[8px_8px_20px_rgba(0,0,0,0.1),-8px_-8px_20px_rgba(255,255,255,0.9)] rounded-3xl border border-red-100/50">
              <div className="relative">
                {/* Preview Content */}
                <div className="p-8 space-y-12">
                  {/* Hero Section Preview */}
                  {selectedSection === "hero" && (
                    <div className="space-y-4">
                      <div className="h-96 bg-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {content.hero.imageUrl ? (
                          <>
                            <img 
                              src={content.hero.imageUrl} 
                              alt="Hero background"
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => {
                                // Hide broken image and show fallback
                                e.currentTarget.style.display = 'none';
                                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="absolute inset-0 bg-slate-300 hidden items-center justify-center"
                              style={{ display: 'none' }}
                            >
                              <div className="text-center text-slate-600 p-4">
                                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm font-medium">Failed to load image</p>
                                <p className="text-xs mt-1">Check if the URL is valid and accessible</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center text-slate-500">
                            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No image set</p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20"></div>
                        <div className="relative text-center px-8">
                          <h1 
                            className="text-4xl font-bold mb-4"
                            style={{ color: content.hero.titleColor || "#1F2937" }}
                          >
                            {content.hero.title}
                          </h1>
                          <p 
                            className="text-lg mb-6"
                            style={{ color: content.hero.subtitleColor || "#4B5563" }}
                          >
                            {content.hero.subtitle}
                          </p>
                          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold">
                            {content.hero.ctaButtonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* About Section Preview */}
                  {selectedSection === "about" && (
                    <div className="space-y-4">
                      <h2 
                        className="text-3xl font-bold"
                        style={{ color: content.about.titleColor || "#111827" }}
                      >
                        {content.about.title}
                      </h2>
                      <div className="prose max-w-none">
                        <p 
                          className="whitespace-pre-line"
                          style={{ color: content.about.contentColor || "#4B5563" }}
                        >
                          {content.about.content}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Services Section Preview */}
                  {selectedSection === "services" && (
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold text-slate-900">{content.servicesTitle}</h2>
                      <p className="text-sm text-slate-600 mb-4">
                        Click on a card to edit its content
                      </p>
                      <div className="grid md:grid-cols-3 gap-6">
                        {content.services.map((service) => (
                          <Card 
                            key={service.id} 
                            onClick={() => setSelectedServiceCard(service.id)}
                            className={`p-6 cursor-pointer transition-all ${
                              selectedServiceCard === service.id
                                ? 'ring-2 ring-red-500 shadow-lg' 
                                : 'hover:shadow-lg hover:ring-1 hover:ring-slate-300'
                            }`}
                          >
                            <div className="h-32 bg-slate-200 rounded-lg mb-4 overflow-hidden">
                              {service.imageUrl && (
                                <img 
                                  src={service.imageUrl} 
                                  alt={service.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <h3 
                              className="font-semibold mb-2"
                              style={{ color: service.nameColor || "#111827" }}
                            >
                              {service.name}
                            </h3>
                            <p 
                              className="text-sm mb-3"
                              style={{ color: service.descriptionColor || "#6B7280" }}
                            >
                              {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.tags.map((tag, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs bg-slate-100 px-2 py-1 rounded"
                                  style={{ color: service.tagsColor || "#4B5563" }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Target Users Section Preview */}
                  {selectedSection === "targetUsers" && (
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold text-slate-900">{content.targetUsers.title}</h2>
                      <p className="text-xl text-slate-600 max-w-3xl">
                        {content.targetUsers.subtitle}
                      </p>
                      <p className="text-sm text-slate-600 mb-4">
                        Click on a card to edit its content
                      </p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.targetUsers.users.map((user) => (
                          <Card
                            key={user.id}
                            onClick={() => setSelectedTargetUserCard(user.id)}
                            className={`overflow-hidden cursor-pointer transition-all ${
                              selectedTargetUserCard === user.id
                                ? 'ring-2 ring-red-500 shadow-lg' 
                                : 'hover:shadow-lg hover:ring-1 hover:ring-slate-300'
                            }`}
                          >
                            <div className="relative h-48 overflow-hidden">
                              {user.imageUrl && (
                                <img 
                                  src={user.imageUrl} 
                                  alt={user.title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            </div>
                            <div className="p-6 space-y-3 bg-slate-800">
                              <h3 
                                className="text-xl font-bold"
                                style={{ color: user.titleColor || "#FFFFFF" }}
                              >
                                {user.title}
                              </h3>
                              <p 
                                className="text-sm leading-relaxed"
                                style={{ color: user.descriptionColor || "#D1D5DB" }}
                              >
                                {user.description}
                              </p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer Preview */}
                  {selectedSection === "footer" && (
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold text-slate-900">Footer</h2>
                      <div className="bg-white border border-slate-200 p-8 rounded-lg">
                        <div className="flex items-start justify-between gap-8">
                          {/* Quick Links */}
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-4">Quick links</h4>
                            <ul className="space-y-2">
                              {content.footer.quickLinks.map((link, idx) => (
                                <li key={idx}>
                                  <span className="text-slate-600">{link.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* External Links */}
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-4">External links</h4>
                            <ul className="space-y-2">
                              {content.footer.externalLinks.map((link, idx) => (
                                <li key={idx}>
                                  <span className="text-slate-600">{link.label} ↗</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Social Media */}
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-4">Follow us</h4>
                            <div className="flex gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-900"></div>
                              <div className="w-8 h-8 rounded-full bg-slate-900"></div>
                              <div className="w-8 h-8 rounded-full bg-slate-900"></div>
                              <div className="w-8 h-8 rounded-full bg-slate-900"></div>
                              <div className="w-8 h-8 rounded-full bg-slate-900"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </main>

        {/* Right Panel - Properties */}
        <aside className="w-80 bg-gradient-to-b from-white to-red-50/30 border-l border-red-200/50 overflow-y-auto shadow-[-2px_0_10px_rgba(0,0,0,0.05)]">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-red-700 mb-1 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-red-400 to-rose-500 rounded-full"></span>
                  Properties
                </h3>
                <p className="text-sm text-slate-600">
                  Editing: {getEditingLabel()}
                </p>
              </div>
              <button
                onClick={resetCurrentSection}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 text-red-600 hover:text-red-700 shadow-[2px_2px_5px_rgba(0,0,0,0.08),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all text-sm font-medium"
                title="Reset to original values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Hero Properties */}
            {selectedSection === "hero" && !selectedServiceCard && !selectedTargetUserCard && (
              <div className="space-y-4">
                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <div className="text-blue-600 mt-0.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-xs text-blue-800">
                      <p className="font-semibold mb-1">💡 Pro Tip: Use External Image URLs</p>
                      <p className="text-blue-700">External URLs bypass storage limits, load faster, and never cause quota errors. Simply paste an image URL from Unsplash, Imgur, or ImgBB!</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={content.hero.title}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateHeroContent("title", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title Color
                  </label>
                  <input
                    type="color"
                    value={content.hero.titleColor || "#FFFFFF"}
                    className="w-full h-10 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateHeroContent("titleColor", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subtitle
                  </label>
                  <textarea
                    value={content.hero.subtitle}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateHeroContent("subtitle", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subtitle Color
                  </label>
                  <input
                    type="color"
                    value={content.hero.subtitleColor || "#F5F5F5"}
                    className="w-full h-10 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateHeroContent("subtitleColor", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.ctaButtonText}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateHeroContent("ctaButtonText", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    CTA Button Link
                  </label>
                  <input
                    type="text"
                    value={content.hero.ctaButtonLink}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateHeroContent("ctaButtonLink", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hero Background Image
                  </label>
                  <div className="space-y-3">
                    {/* Image URL Input - Primary Method */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        🌐 Image URL (Recommended - No Storage Limits!)
                      </label>
                      <input
                        type="text"
                        value={content.hero.imageUrl || ""}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateHeroContent("imageUrl", e.target.value)}
                      />
                      <p className="text-xs text-emerald-600 mt-1 font-medium">
                        ✓ Unlimited size · Instant preview · No storage quota
                      </p>
                    </div>

                    {/* OR Divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-slate-200"></div>
                      <span className="text-xs text-slate-400 font-medium">OR</span>
                      <div className="flex-1 h-px bg-slate-200"></div>
                    </div>

                    {/* File Upload - Secondary Method */}
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        📁 Upload File (Max 500KB - Not Recommended)
                      </label>
                      <label className="neuro-upload-button cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Check file size (500KB limit)
                              const maxSize = 500 * 1024; // 500KB in bytes
                              if (file.size > maxSize) {
                                toast.error(`Image too large! Maximum size is 500KB. Your image is ${Math.round(file.size / 1024)}KB. Please use the Image URL field instead.`);
                                e.target.value = ""; // Clear the input
                                return;
                              }
                              
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateHeroContent("imageUrl", reader.result as string);
                                toast.success("Image uploaded! Click 'Publish' to save changes.");
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-amber-600 mt-1">
                        ⚠️ May cause storage errors. Use Image URL for best results.
                      </p>
                    </div>

                    {/* Image Preview */}
                    {content.hero.imageUrl && (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                        <img 
                          src={content.hero.imageUrl} 
                          alt="Hero preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-red-500">Failed to load image</div>';
                            }
                          }}
                        />
                      </div>
                    )}

                    {/* Quick Access to Popular Image Sources */}
                    <details className="text-xs">
                      <summary className="cursor-pointer text-slate-600 hover:text-red-600 font-medium">
                        📌 Where to get image URLs?
                      </summary>
                      <div className="mt-2 space-y-1 text-slate-500 pl-4">
                        <div>• <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Unsplash</a> - Free high-quality images</div>
                        <div>• <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Imgur</a> - Free image hosting</div>
                        <div>• <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">ImgBB</a> - Free image hosting</div>
                        <div className="mt-2 text-slate-400 text-xs">Right-click image → "Copy image address"</div>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            )}

            {/* About Properties */}
            {selectedSection === "about" && !selectedServiceCard && !selectedTargetUserCard && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={content.about.title}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateAboutContent("title", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title Color
                  </label>
                  <input
                    type="color"
                    value={content.about.titleColor || "#111111"}
                    className="w-full h-10 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateAboutContent("titleColor", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={content.about.content}
                    rows={8}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateAboutContent("content", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content Color
                  </label>
                  <input
                    type="color"
                    value={content.about.contentColor || "#404040"}
                    className="w-full h-10 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateAboutContent("contentColor", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Services Section Properties */}
            {selectedSection === "services" && !selectedServiceCard && !selectedTargetUserCard && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="text-blue-600 mt-0.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-xs text-blue-800">
                      <p className="font-semibold mb-1">💡 Edit Section Title</p>
                      <p className="text-blue-700">Edit the section heading, then click on any card below in the preview to edit its content.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={content.servicesTitle}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => setContent({ ...content, servicesTitle: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Service Card Properties */}
            {selectedSection === "services" && selectedServiceCard && (() => {
              const service = content.services.find(s => s.id === selectedServiceCard);
              return service ? (
                <div className="space-y-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedServiceCard(null)}
                    className="text-slate-600 hover:text-slate-900 mb-2"
                  >
                    ← Back to Section
                  </Button>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Service Name
                    </label>
                    <input
                      type="text"
                      value={service.name}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateServiceContent(selectedServiceCard, "name", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Name Color
                    </label>
                    <input
                      type="color"
                      value={service.nameColor || "#111111"}
                      className="w-full h-10 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateServiceContent(selectedServiceCard, "nameColor", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={service.description}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateServiceContent(selectedServiceCard, "description", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description Color
                    </label>
                    <input
                      type="color"
                      value={service.descriptionColor || "#9E9E9E"}
                      className="w-full h-10 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateServiceContent(selectedServiceCard, "descriptionColor", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Image
                    </label>
                    <div className="space-y-3">
                      {/* Image URL Input - Primary Method */}
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Image URL (Recommended)
                        </label>
                        <input
                          type="text"
                          value={service.imageUrl}
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                          onChange={(e) => updateServiceContent(selectedServiceCard, "imageUrl", e.target.value)}
                        />
                      </div>

                      {/* OR Divider */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-200"></div>
                        <span className="text-xs text-slate-400 font-medium">OR</span>
                        <div className="flex-1 h-px bg-slate-200"></div>
                      </div>

                      {/* File Upload - Secondary Method */}
                      <label className="neuro-upload-button cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image (Max 500KB)
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const maxSize = 500 * 1024;
                              if (file.size > maxSize) {
                                toast.error(`Image too large! Maximum 500KB. Your image: ${Math.round(file.size / 1024)}KB`);
                                e.target.value = "";
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateServiceContent(selectedServiceCard, "imageUrl", reader.result as string);
                                toast.success("Image uploaded!");
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      {/* Image Preview */}
                      {service.imageUrl && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                          <img 
                            src={service.imageUrl} 
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={service.tags.join(", ")}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateServiceContent(selectedServiceCard, "tags", e.target.value.split(",").map(t => t.trim()))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tags Color
                    </label>
                    <input
                      type="color"
                      value={service.tagsColor || "#444444"}
                      className="w-full h-10 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateServiceContent(selectedServiceCard, "tagsColor", e.target.value)}
                    />
                  </div>
                </div>
              ) : null;
            })()}

            {/* Target Users Section Properties */}
            {selectedSection === "targetUsers" && !selectedTargetUserCard && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={content.targetUsers.title}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateTargetUsersContent("title", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subtitle
                  </label>
                  <textarea
                    value={content.targetUsers.subtitle}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onChange={(e) => updateTargetUsersContent("subtitle", e.target.value)}
                  />
                </div>

                <p className="text-sm text-slate-500 italic">
                  Click on a user card in the preview to edit individual user details.
                </p>
              </div>
            )}

            {/* Target User Card Properties */}
            {selectedSection === "targetUsers" && selectedTargetUserCard && (() => {
              const user = content.targetUsers.users.find(u => u.id === selectedTargetUserCard);
              return user ? (
                <div className="space-y-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedTargetUserCard(null)}
                    className="text-slate-600 hover:text-slate-900 mb-2"
                  >
                    ← Back to Section
                  </Button>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      User Title
                    </label>
                    <input
                      type="text"
                      value={user.title}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateTargetUserCard(selectedTargetUserCard, "title", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Title Color
                    </label>
                    <input
                      type="color"
                      value={user.titleColor || "#FFFFFF"}
                      className="w-full h-10 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateTargetUserCard(selectedTargetUserCard, "titleColor", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={user.description}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateTargetUserCard(selectedTargetUserCard, "description", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description Color
                    </label>
                    <input
                      type="color"
                      value={user.descriptionColor || "#D1D5DB"}
                      className="w-full h-10 px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onChange={(e) => updateTargetUserCard(selectedTargetUserCard, "descriptionColor", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Image
                    </label>
                    <div className="space-y-3">
                      {/* Image URL Input - Primary Method */}
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Image URL (Recommended)
                        </label>
                        <input
                          type="text"
                          value={user.imageUrl}
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                          onChange={(e) => updateTargetUserCard(selectedTargetUserCard, "imageUrl", e.target.value)}
                        />
                      </div>

                      {/* OR Divider */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-200"></div>
                        <span className="text-xs text-slate-400 font-medium">OR</span>
                        <div className="flex-1 h-px bg-slate-200"></div>
                      </div>

                      {/* File Upload - Secondary Method */}
                      <label className="neuro-upload-button cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image (Max 500KB)
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const maxSize = 500 * 1024;
                              if (file.size > maxSize) {
                                toast.error(`Image too large! Maximum 500KB. Your image: ${Math.round(file.size / 1024)}KB`);
                                e.target.value = "";
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateTargetUserCard(selectedTargetUserCard, "imageUrl", reader.result as string);
                                toast.success("Image uploaded!");
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      {/* Image Preview */}
                      {user.imageUrl && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                          <img 
                            src={user.imageUrl} 
                            alt={user.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            {/* Footer Properties */}
            {selectedSection === "footer" && !selectedServiceCard && !selectedTargetUserCard && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Quick Links</h4>
                  {content.footer.quickLinks.map((link, idx) => (
                    <div key={idx} className="space-y-2 mb-4">
                      <input
                        type="text"
                        placeholder="Label"
                        value={link.label}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateFooterLink('quickLinks', idx, 'label', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateFooterLink('quickLinks', idx, 'url', e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">External Links</h4>
                  {content.footer.externalLinks.map((link, idx) => (
                    <div key={idx} className="space-y-2 mb-4">
                      <input
                        type="text"
                        placeholder="Label"
                        value={link.label}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateFooterLink('externalLinks', idx, 'label', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateFooterLink('externalLinks', idx, 'url', e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Social Media URLs</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Instagram</label>
                      <input
                        type="text"
                        value={content.footer.socialMedia.instagram}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateFooterSocial('instagram', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Twitter</label>
                      <input
                        type="text"
                        value={content.footer.socialMedia.twitter}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateFooterSocial('twitter', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Facebook</label>
                      <input
                        type="text"
                        value={content.footer.socialMedia.facebook}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateFooterSocial('facebook', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={content.footer.socialMedia.linkedin}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateFooterSocial('linkedin', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">YouTube</label>
                      <input
                        type="text"
                        value={content.footer.socialMedia.youtube}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        onChange={(e) => updateFooterSocial('youtube', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
