export interface Job {
  role: string;
  company: string;
  location: string;
  description: string;
  period?: string; // Inferred or generic if not explicit
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  year: string;
}

export interface Skill {
  name: string;
  category: 'Tech' | 'Creative' | 'Marketing';
}

export const RESUME_DATA = {
  name: "Tharun Balaji",
  contact: {
    phone: "+33 745935585",
    whatsapp: "+91 9025755903",
    email: "tharunbalaji146@gmail.com",
    portfolio: "https://tharun-ai-portfolio-2-dyoe.vercel.app"
  },
  summary: "Results-oriented marketing professional with expertise in brand development and digital marketing strategies. Proven track record in enhancing customer engagement through innovative campaigns. Strong communication and collaboration skills foster effective teamwork in dynamic environments. Specializing in AI Automation using n8n.",
  experience: [
    {
      role: "Creative Director / Marketing Intern",
      company: "Madras Branding Company",
      location: "Chennai, India",
      description: "Led creative branding campaigns, conducted market research, managed client relations, and implemented digital strategies to boost engagement—delivering consistent, high-quality results on time."
    },
    {
      role: "Customer Support Officer",
      company: "Allsec Technologies",
      location: "India",
      description: "Built strong client relationships with top-tier service, improved office efficiency, collaborated with seniors for effective execution, and consistently met tight deadlines."
    }
  ],
  education: [
    {
      degree: "Masters Degree in International Marketing",
      school: "ESCE Business School",
      location: "France, Paris",
      year: "2025-2027"
    },
    {
      degree: "Bachelor’s Degree in Visual Communication",
      school: "DG Vaishnav College",
      location: "India, Chennai",
      year: "2021-2024"
    }
  ],
  skills: [
    "AI Automation (n8n)",
    "Branding & Identity Design",
    "Web Design",
    "Digital Marketing",
    "Research and Analysis",
    "AI Image and Video Generation",
    "AI Marketing",
    "SEO and Geo"
  ]
};