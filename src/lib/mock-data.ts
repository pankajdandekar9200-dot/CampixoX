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
  { id: 1, title: "", category: "Exam", date: "END SEMISTER EXAM START FROM 9 MAY(PRELIMS), 2026", urgent: true },
  { id: 2, title: "NEW CENTRAL DIT Library hours extended until 11 PM", category: "General", date: "MAY, 2026", urgent: false },
  { id: 3, title: "Holiday on MAY 9 BECUASE SUNDAY HAHA ", category: "Holiday", date: "Apr 18, 2026", urgent: false },
  { id: 4, title: "Hostel maintenance — block C unavailable Apr 25", category: "Urgent", date: "Apr 17, 2026", urgent: true },
];

export const opportunities = [
  { id: 1, title: "Summer Intern — Frontend Engineer", company: "CampixoX", location: "Remote", type: "Internship", deadline: "May 1, 2026" },
  { id: 2, title: "National Coding Championship", company: "GOOGLE", location: "Online", type: "Competition", deadline: "May 15, 2026" },
  { id: 3, title: "Product Design Fellowship", company: "PRANJAL PVT.LMT", location: "Bangalore", type: "Fellowship", deadline: "Jun 10, 2026" },
  { id: 4, title: "Research Assistant — NLP Lab", company: "IIT Delhi", location: "On-campus", type: "Research", deadline: "May 5, 2026" },
];
