export const events: Array<{
  id: number;
  title: string;
  date: string;
  time: string;
  organizer: string;
  description: string;
  tag: string;
}> = [];

export const clubs: Array<{
  id: number;
  name: string;
  logo?: string;
}> = [
  { id: 1, name: "Zion DIT", logo: "/images/zion-logo.png" },
  { id: 2, name: "ACUNETIX 13.0" },
  { id: 3, name: "Team Durgayans Racing" },
];

export const notices = [
  { id: 1, title: "Mid-semester exams begin May 2", category: "Exam", date: "Apr 22, 2026", urgent: true },
  { id: 2, title: "Library hours extended until 11 PM", category: "General", date: "Apr 20, 2026", urgent: false },
  { id: 3, title: "Holiday on April 30 — University Foundation Day", category: "Holiday", date: "Apr 18, 2026", urgent: false },
  { id: 4, title: "Hostel maintenance — block C unavailable Apr 25", category: "Urgent", date: "Apr 17, 2026", urgent: true },
];

export const opportunities = [
  { id: 1, title: "Summer Intern — Frontend Engineer", company: "Linear", location: "Remote", type: "Internship", deadline: "May 1, 2026" },
  { id: 2, title: "National Coding Championship", company: "CodeChef", location: "Online", type: "Competition", deadline: "May 15, 2026" },
  { id: 3, title: "Product Design Fellowship", company: "Figma", location: "Bangalore", type: "Fellowship", deadline: "Jun 10, 2026" },
  { id: 4, title: "Research Assistant — NLP Lab", company: "IIT Delhi", location: "On-campus", type: "Research", deadline: "May 5, 2026" },
];
