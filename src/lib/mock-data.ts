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
{
  id: 4,
  title: "लायब्ररी ओपन झाल्यामुळे जेवणाचा कार्यक्रम ठेवलेला आहे तरी सर्व भावी इंजिनियर्सनी उपस्थित राहून जेवणाचा आस्वाद घ्यावा..!!",
  category: "Urgent",
  date: "Apr 17, 2026",
  urgent: true,
}
];

export const opportunities = [
  { id: 1, title: "PRANJAL PVT. LMT", company: "PRANJAL PVT. LMT", location: "India", type: "Job", deadline: "Open" },
  { id: 2, title: "Gen AI Engineering Opportunity", company: "GOOGLE", location: "Online / Global", type: "Internship / Job", deadline: "Open" },
  { id: 3, title: "Security Opportunity", company: "Dr. D. Y. Patil Institute of Technology", location: "Pune", type: "Internship", deadline: "Open" },
];
