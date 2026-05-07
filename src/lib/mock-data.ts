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
  title: "📚🍛 विशेष सूचना 🍛📚\n\nनवीन सेंट्रल लायब्ररी सुरू झाल्याच्या आनंदानिमित्त\nसर्व भावी इंजिनियर्ससाठी खास जेवणाचा आस्वाद कार्यक्रम आयोजित करण्यात आलेला आहे..! 🎉\n\n📍 स्थळ: DYP Auditorium\n📅 दिनांक: 9 MAY 2026\n🕒 वेळ: दुपारी 1:00 वाजता\n\nतरी सर्व विद्यार्थ्यांनी उपस्थित राहून\nजेवणाचा मनमुराद आस्वाद घ्यावा\nआणि कार्यक्रमाची शोभा वाढवावी..!! ✨",
  category: "Urgent",
  date: "May 9, 2026",
  urgent: true,
}
];

export const opportunities = [
  { id: 1, title: "PRANJAL PVT. LMT", company: "PRANJAL PVT. LMT", location: "India", type: "Job", deadline: "Open" },
  { id: 2, title: "Gen AI Engineering Opportunity", company: "GOOGLE", location: "Online / Global", type: "Internship / Job", deadline: "Open" },
  { id: 3, title: "Security Opportunity", company: "Dr. D. Y. Patil Institute of Technology", location: "Pune", type: "Internship", deadline: "Open" },
];
