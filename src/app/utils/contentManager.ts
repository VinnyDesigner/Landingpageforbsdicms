// Default content structure
export interface HeroContent {
  title: string;
  subtitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  imageUrl?: string; // Can be external URL (recommended) or base64 data
  titleColor?: string;
  subtitleColor?: string;
}

export interface AboutContent {
  title: string;
  content: string;
  titleColor?: string;
  contentColor?: string;
}

export interface ServiceCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  imageUrl: string;
  nameColor?: string;
  descriptionColor?: string;
  tagsColor?: string;
}

export interface TargetUserCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  titleColor?: string;
  descriptionColor?: string;
}

export interface TargetUsersContent {
  title: string;
  subtitle: string;
  users: TargetUserCard[];
}

export interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface FooterContent {
  quickLinks: FooterLink[];
  externalLinks: FooterLink[];
  socialMedia: {
    instagram: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
}

export interface WebsiteContent {
  hero: HeroContent;
  about: AboutContent;
  services: ServiceCard[];
  servicesTitle: string;
  targetUsers: TargetUsersContent;
  footer: FooterContent;
}

// Default content
export const defaultContent: WebsiteContent = {
  hero: {
    title: "National Spatial Data Infrastructure",
    subtitle: "Unified geospatial platform for secure data sharing, advanced analytics, and intelligent decision-making",
    ctaButtonText: "Learn More",
    ctaButtonLink: "#about",
    imageUrl: "figma:asset/abaadf30c853725a08348b6d391e9ff1a5b88f42.png",
    titleColor: "#FFFFFF",
    subtitleColor: "#F5F5F5"
  },
  about: {
    title: "About BSDI",
    content: "BSDI (Bahrain Spatial Data Infrastructure) is a unified geospatial platform designed to enable secure data sharing, advanced analytics, and intelligent decision-making across government and enterprise sectors.\n\nIt brings together GIS, GeoAI, BIM, and governance standards into a single digital ecosystem — ensuring data accuracy, security, and national-level interoperability.",
    titleColor: "#111111",
    contentColor: "#404040"
  },
  servicesTitle: "What BSDI Provides",
  services: [
    {
      id: "gis",
      name: "BSDI Admin Console",
      description: "To ensure secure, transparent, and efficient management of geospatial services across all government entities.",
      icon: "MapPin",
      tags: ["2D & 3D Maps", "Secure Access"],
      imageUrl: "https://images.unsplash.com/photo-1621421770492-272ae6d7882a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      nameColor: "#111111",
      descriptionColor: "#9E9E9E",
      tagsColor: "#444444"
    },
    {
      id: "geoai",
      name: "National GeoCatalog Bahrain",
      description: "To provide standardized metadata management aligned with SDI best practices and international standards.",
      icon: "Bot",
      tags: ["AI-Powered", "Spatial Analysis"],
      imageUrl: "https://images.unsplash.com/photo-1620662892011-f5c2d523fae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwc3BhdGlhbCUyMGFuYWx5c2lzfGVufDF8fHx8MTc3MjQ0NTExMnww&ixlib=rb-4.1.0&q=80&w=1080",
      nameColor: "#111111",
      descriptionColor: "#9E9E9E",
      tagsColor: "#444444"
    },
    {
      id: "bim",
      name: "BSDI Smart Map",
      description: "To provide a user-friendly interface for viewing and analyzing government geospatial datasets",
      icon: "Building2",
      tags: ["3D Visualization", "Infrastructure"],
      imageUrl: "https://images.unsplash.com/photo-1760801802787-86f7958c439e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMGJ1aWxkaW5nJTIwbW9kZWwlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyNDQ1MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      nameColor: "#111111",
      descriptionColor: "#9E9E9E",
      tagsColor: "#444444"
    },
    {
      id: "secure",
      name: "GeoIntelligence Bahrain",
      description: "To transform geospatial data into actionable intelligence through spatial modelling.",
      icon: "Shield",
      tags: ["Role-Based Access", "Audit Logging"],
      imageUrl: "https://images.unsplash.com/photo-1768839720936-87ce3adf2d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGF0YSUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzcyMzcwOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      nameColor: "#111111",
      descriptionColor: "#9E9E9E",
      tagsColor: "#444444"
    },
    {
      id: "analytics",
      name: "Data Analytics",
      description: "Advanced Insights",
      icon: "BarChart",
      tags: ["Visual Dashboards", "Data-Driven"],
      imageUrl: "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzI0MDMwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      nameColor: "#111111",
      descriptionColor: "#9E9E9E",
      tagsColor: "#444444"
    },
    {
      id: "cloud",
      name: "Cloud Infrastructure",
      description: "Scalable Platform",
      icon: "Cloud",
      tags: ["High Availability", "Disaster Recovery"],
      imageUrl: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMGluZnJhc3RydWN0dXJlJTIwc2VydmVyc3xlbnwxfHx8fDE3NzI0NDUxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      nameColor: "#111111",
      descriptionColor: "#9E9E9E",
      tagsColor: "#444444"
    }
  ],
  targetUsers: {
    title: "Who Can Use BSDI?",
    subtitle: "BSDI is designed for organizations that rely on accurate spatial data, secure collaboration, and intelligent insights to make strategic decisions.",
    users: [
      {
        id: "government",
        title: "Government Authorities",
        description: "Empowering national and local government bodies with comprehensive GIS infrastructure for policy making, urban development, and citizen services.",
        imageUrl: "https://images.unsplash.com/photo-1612165469953-69b4bc7eedbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhdXRob3JpdHl8ZW58MXx8fHwxNzcyNDM3NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        titleColor: "#FFFFFF",
        descriptionColor: "#D1D5DB"
      },
      {
        id: "urban",
        title: "Urban Planning Departments",
        description: "Strategic tools for city planners to visualize growth, manage land use, and create sustainable urban environments with data-driven insights.",
        imageUrl: "https://images.unsplash.com/photo-1760553120324-d3d2bf53852b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBsYW5uaW5nJTIwY2l0eSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc3MjQyNDQ3NHww&ixlib=rb-4.1.0&q=80&w=1080",
        titleColor: "#FFFFFF",
        descriptionColor: "#D1D5DB"
      },
      {
        id: "infrastructure",
        title: "Infrastructure & Utilities",
        description: "Manage critical infrastructure networks including water, electricity, telecommunications, and transportation with real-time spatial monitoring.",
        imageUrl: "https://images.unsplash.com/photo-1765028994202-abd7b1649971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMHV0aWxpdGllcyUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzcyNDM3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        titleColor: "#FFFFFF",
        descriptionColor: "#D1D5DB"
      },
      {
        id: "environmental",
        title: "Environmental Agencies",
        description: "Monitor environmental changes, track natural resources, and implement conservation strategies using advanced geospatial analysis tools.",
        imageUrl: "https://images.unsplash.com/photo-1641392945935-194a6251804a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwYWdlbmN5JTIwbmF0dXJlfGVufDF8fHx8MTc3MjQzNzU2OHww&ixlib=rb-4.1.0&q=80&w=1080",
        titleColor: "#FFFFFF",
        descriptionColor: "#D1D5DB"
      }
    ]
  },
  footer: {
    quickLinks: [
      { label: "Dataset Request", url: "#dataset-request" },
      { label: "Open Data Policy", url: "#open-data-policy" }
    ],
    externalLinks: [
      { label: "GCC Statistical Center", url: "https://gccstat.org", external: true },
      { label: "SHAREKNA", url: "https://sharekna.bh", external: true }
    ],
    socialMedia: {
      instagram: "https://instagram.com/bsdi",
      twitter: "https://twitter.com/bsdi",
      facebook: "https://facebook.com/bsdi",
      linkedin: "https://linkedin.com/company/bsdi",
      youtube: "https://youtube.com/@bsdi"
    }
  }
};

// Get content from localStorage or return default
export const getWebsiteContent = (): WebsiteContent => {
  const stored = localStorage.getItem("bsdi_website_content");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      
      // Migrate old content to new structure
      if (!parsed.targetUsers) {
        parsed.targetUsers = defaultContent.targetUsers;
      }
      if (!parsed.footer.quickLinks) {
        parsed.footer = defaultContent.footer;
      }
      if (!parsed.servicesTitle) {
        parsed.servicesTitle = defaultContent.servicesTitle;
      }
      
      // Return the content as-is, including base64 images
      // Cleaning will only happen on save if quota is exceeded
      return parsed;
    } catch (e) {
      console.error("Failed to parse stored content:", e);
      return defaultContent;
    }
  }
  return defaultContent;
};

// Helper function to clean base64 images and replace with defaults
const cleanBase64Images = (content: WebsiteContent): WebsiteContent => {
  const cleaned = JSON.parse(JSON.stringify(content)); // Deep clone
  
  // Clean hero image if it's base64
  if (cleaned.hero.imageUrl?.startsWith('data:')) {
    console.log("Removing base64 hero image, replacing with default");
    cleaned.hero.imageUrl = defaultContent.hero.imageUrl;
  }
  
  // Clean service images
  cleaned.services = cleaned.services.map((service: ServiceCard, index: number) => {
    if (service.imageUrl?.startsWith('data:')) {
      console.log(`Removing base64 image from service: ${service.name}`);
      return {
        ...service,
        imageUrl: defaultContent.services[index]?.imageUrl || defaultContent.services[0].imageUrl
      };
    }
    return service;
  });
  
  // Clean target user images
  if (cleaned.targetUsers?.users) {
    cleaned.targetUsers.users = cleaned.targetUsers.users.map((user: TargetUserCard, index: number) => {
      if (user.imageUrl?.startsWith('data:')) {
        console.log(`Removing base64 image from user: ${user.title}`);
        return {
          ...user,
          imageUrl: defaultContent.targetUsers.users[index]?.imageUrl || defaultContent.targetUsers.users[0].imageUrl
        };
      }
      return user;
    });
  }
  
  return cleaned;
};

// Force clean all base64 images and save
export const forceCleanStorage = (): void => {
  const content = getWebsiteContent();
  const cleaned = cleanBase64Images(content);
  
  try {
    localStorage.setItem("bsdi_website_content", JSON.stringify(cleaned));
    console.log("Storage cleaned successfully");
  } catch (e) {
    console.error("Failed to clean storage:", e);
    // If still failing, clear everything and start fresh
    localStorage.removeItem("bsdi_website_content");
    localStorage.removeItem("bsdi_website_content_draft");
    localStorage.removeItem("bsdi_draft_updated");
    localStorage.setItem("bsdi_website_content", JSON.stringify(defaultContent));
  }
};

// Save content to localStorage
export const saveWebsiteContent = (content: WebsiteContent): void => {
  try {
    // Try to save with base64 images first
    localStorage.setItem("bsdi_website_content", JSON.stringify(content));
    localStorage.setItem("bsdi_last_updated", new Date().toISOString());
    console.log("Content saved successfully with images");
  } catch (error) {
    console.error("Failed to save content:", error);
    // If fails due to quota, clean base64 and try again
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn("Storage quota exceeded, cleaning base64 images...");
      
      // Try to clean up draft first
      localStorage.removeItem("bsdi_website_content_draft");
      localStorage.removeItem("bsdi_draft_updated");
      
      try {
        // Clean base64 images and try again
        const cleanedContent = cleanBase64Images(content);
        localStorage.setItem("bsdi_website_content", JSON.stringify(cleanedContent));
        localStorage.setItem("bsdi_last_updated", new Date().toISOString());
        console.log("Content saved after cleaning base64 images");
        alert("⚠️ Uploaded images were too large and have been replaced with default images. Please use Image URLs instead for better performance.");
      } catch (retryError) {
        console.error("Failed to save even after cleanup:", retryError);
        // Last resort - clear everything
        localStorage.clear();
        alert("Storage quota exceeded. All data cleared. Please use external image URLs (like Unsplash) instead of uploading files. The page will reload.");
        window.location.reload();
      }
    }
  }
};

// Save draft (same as save but with draft flag)
export const saveDraft = (content: WebsiteContent): void => {
  try {
    // Try to save with base64 images first
    localStorage.setItem("bsdi_website_content_draft", JSON.stringify(content));
    localStorage.setItem("bsdi_draft_updated", new Date().toISOString());
  } catch (error) {
    console.error("Failed to save draft:", error);
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert("Storage quota exceeded. Please use external image URLs instead of uploading large files.");
    }
  }
};

// Get draft content
export const getDraftContent = (): WebsiteContent | null => {
  const stored = localStorage.getItem("bsdi_website_content_draft");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse draft content:", e);
      return null;
    }
  }
  return null;
};

// Publish draft (move draft to published)
export const publishDraft = (): void => {
  const draft = getDraftContent();
  if (draft) {
    saveWebsiteContent(draft);
    localStorage.removeItem("bsdi_website_content_draft");
    localStorage.removeItem("bsdi_draft_updated");
  }
};