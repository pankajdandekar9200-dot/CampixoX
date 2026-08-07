export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  organizer: string;
  tag: string;
  description: string;
};

export type Club = {
  id: string;
  name: string;
  logo?: string;
};

export type Notice = {
  id: string;
  title: string;
  date: string;
  category: string;
  urgent?: boolean;
};

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  deadline: string;
  logo?: string;
};

export const events: EventItem[] = [];

export const clubs: Club[] = [
  { id: "zion-dit", name: "Zion DIT", logo: "/images/zion-logo.png" },
  { id: "acunetix-13", name: "ACUNETIX 13.0" },
  { id: "durgayans-racing", name: "Team Durgayans Racing" },
];

export const notices: Notice[] = [];

export const opportunities: Opportunity[] = [
  {
    id: "pranjal",
    title: "PRANJAL PVT. LMT",
    company: "PRANJAL PVT. LMT",
    location: "India",
    type: "Job",
    deadline: "Open",
  },
  {
    id: "google-genai",
    title: "Gen AI Engineering Opportunity",
    company: "GOOGLE",
    location: "Online / Global",
    type: "Internship / Job",
    deadline: "Open",
  },
  {
    id: "dypit-security",
    title: "Security Opportunity",
    company: "Dr. D. Y. Patil Institute of Technology",
    location: "Pune",
    type: "Internship",
    deadline: "Open",
  },
];