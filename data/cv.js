// ─────────────────────────────────────────────────────────────
//  YOUR CV LIVES HERE.
//  Fill every field from the CV you were given.
//  The pages read from this file, so you never hard-code CV text
//  inside a component. Add or remove items freely.
//
//  Content: Yara Saud Al-Mansouri, PhD (Portfolio Summit 2026 CV).
//  Starter fields (name, title, location, summary, contact, cvFile,
//  education, experience, projects, skills, achievements) are kept.
//  NEW fields added for the rest of the CV: highlights,
//  certifications, patents, publications, talks, media, leadership,
//  languages, interests. Components must be updated to show them.
// ─────────────────────────────────────────────────────────────

export const cv = {
  name: "Yara Saud Al-Mansouri, PhD",
  title: "Principal Product Engineer | Design Technology Lead | HCI Researcher",
  location: "Riyadh, Saudi Arabia",
  summary:
    "Product engineer and designer with 16 years of professional experience building digital products in Saudi Arabia and the United Kingdom, across health tech, fintech, education and mobility. Leads teams from first research to launch while still designing and writing code every week. Has led a team of up to 64 people, shipped more than 40 products used by over 9 million people, co-founded two startups (one acquired) and earned a PhD in Human-Computer Interaction focused on Arabic interfaces.",

  contact: {
    email: "yara.almansouri@mail.example",
    phone: "+966 55 000 0000",
    github: "https://github.example/yara-mansouri",
    linkedin: "https://linkedin.example/in/yaramansouri",
    portfolio: "https://yara.example",
    dribbble: "https://dribbble.example/yaram",
    behance: "https://behance.example/yaram",
    medium: "https://medium.example/@yaram",
    scholar: "https://scholar.example/yaram",
    youtube: "https://youtube.example/@YaraBuilds",
  },

  // Put your CV PDF in the /public folder and write its file name here.
  // Leave it as "" to hide the "Download CV" button.
  cvFile: "",

  // NEW — Career highlights (CV page 1)
  highlights: [
    { value: "16", label: "years of professional experience (since Jul 2010)" },
    { value: "40+", label: "products shipped, reaching 9 million+ people" },
    { value: "64", label: "people led across 7 squads" },
    { value: "2", label: "startups co-founded: 1 acquired, 1 closed" },
    { value: "2", label: "patents: 1 granted, 1 pending" },
    { value: "9", label: "publications" },
    { value: "31", label: "talks and keynotes" },
    { value: "1,400+", label: "university students taught" },
    { value: "19", label: "certifications earned, 1 in progress" },
  ],

  education: [
    {
      degree: "PhD in Human-Computer Interaction",
      school: "Eastmoor Institute of Technology",
      location: "Part-time, remote",
      period: "Sep 2018 – Jul 2022",
      details:
        "Thesis: “Adaptive Typography for Arabic Interfaces: Readability, Density and Trust” · Best Doctoral Thesis in HCI, 2022",
    },
    {
      degree: "Executive Certificate in Technology Leadership",
      school: "Eastmoor Business School",
      location: "Online",
      period: "Jan 2021 – Jun 2021",
      details: "6-month program completed while working full-time",
    },
    {
      degree: "MSc in Interaction Design, with Distinction",
      school: "University of Northbridge",
      location: "Northbridge, United Kingdom",
      period: "Sep 2011 – Sep 2012",
      details:
        "Dissertation: “Bilingual Navigation Menus on Small Screens” · Full scholarship",
    },
    {
      degree: "BSc in Computer Science, First Class Honours",
      school: "Najd Valley University",
      location: "Riyadh, Saudi Arabia",
      period: "Sep 2006 – Jun 2010",
      details:
        "GPA: 4.81 / 5.00 · Exchange semester: Lindenhall University, Germany, Feb 2009 – Jul 2009 · Best Graduation Project, 2010",
    },
  ],

  experience: [
    {
      role: "Principal Product Engineer & Design Technology Lead",
      company: "Faseela Ventures",
      location: "Riyadh, Saudi Arabia",
      period: "Sep 2023 – Present",
      points: [
        "Set the front-end and design-system direction for 9 product teams across payments, savings and rewards in a fintech super-app with 4.2 million users.",
        "Built Mizan, the company’s bilingual design system: 180 components adopted by all 9 teams, cutting UI build time by 38%.",
        "Led the rebuild of the web app in Next.js and TypeScript, reducing Largest Contentful Paint from 4.8 s to 1.6 s.",
        "Introduced accessibility reviews for every release, raising screens that meet WCAG 2.2 AA from 41% to 96%.",
        "Designed the Savings Goals feature from research in 5 cities; 610,000 users opened a goal in its first 6 months.",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React Native", "GraphQL", "AWS"],
    },
    {
      role: "Director of Product Engineering",
      company: "Zayna Health Tech",
      location: "Riyadh, Saudi Arabia",
      period: "Mar 2021 – Aug 2023",
      points: [
        "Led 64 people across 7 squads (engineering, design, quality and data) with an annual budget of SAR 21 million.",
        "Launched the telemedicine platform at national scale, delivering 3.1 million consultations in 2022.",
        "Cut the app crash rate from 2.4% to 0.3% and raised the app-store rating from 3.6 to 4.7.",
        "Took the platform through two health-data security audits with zero major findings.",
      ],
      tech: ["React", "React Native", "Node.js", "PostgreSQL", "Google Cloud", "Kubernetes"],
    },
    {
      role: "Engineering Manager, Patient Apps",
      company: "Zayna Health Tech",
      location: "Riyadh, Saudi Arabia",
      period: "Jan 2019 – Feb 2021",
      points: [
        "Grew the patient apps team from 6 to 22 people; hired and mentored 4 team leads.",
        "Shipped appointment booking used by 1.8 million patients across 140 clinics.",
        "Shortened the release cycle from 6 weeks to 1 week with CI/CD and feature flags.",
      ],
      tech: [],
    },
    {
      role: "Senior Front-End Engineer",
      company: "Zayna Health Tech",
      location: "Riyadh, Saudi Arabia",
      period: "Jul 2017 – Dec 2018",
      points: [
        "Rebuilt the clinic dashboard in React, cutting doctors’ average task time by 27%.",
        "Created the first shared component library, which later grew into the Zayna design system.",
      ],
      tech: ["React"],
    },
    {
      role: "Co-founder (part-time)",
      company: "Qalam Learn",
      location: "Riyadh, Saudi Arabia",
      period: "Feb 2019 – Nov 2022",
      points: [
        "Co-founded an Arabic-first coding education platform that reached 230,000 learners in 14 countries.",
        "Designed and built its interactive code editor, which explains errors in plain Arabic.",
        "Grew the team to 9 people and led product until the company was acquired by Mirqab Group in Nov 2022.",
      ],
      tech: ["Vue", "TypeScript", "Monaco Editor", "Firebase"],
    },
    {
      role: "Career Break",
      company: "Family relocation and volunteering",
      location: "Riyadh, Saudi Arabia",
      period: "Jan 2017 – Jun 2017",
      points: [
        "Taught a 12-week web development course to 45 adult learners with the Code for Community initiative.",
      ],
      tech: [],
    },
    {
      role: "Co-founder & Chief Technology Officer",
      company: "Rafeeq Rides",
      location: "Riyadh, Saudi Arabia",
      period: "Apr 2015 – Dec 2016",
      points: [
        "Built a ride-sharing app for university students: 26,000 sign-ups and 140,000 rides in 20 months.",
        "Raised SAR 3.5 million in seed funding and led a team of 11.",
        "Closed the company in Dec 2016 after a market change and wrote a public post-mortem read by 80,000 people.",
      ],
      tech: ["React Native", "Node.js", "MongoDB", "Google Maps APIs"],
    },
    {
      role: "Senior UX Engineer",
      company: "Brightwell Studio",
      location: "London, United Kingdom",
      period: "Jun 2014 – Mar 2015",
      points: [
        "Led the studio’s first Arabic, right-to-left project, for a Gulf travel client.",
        "Mentored 3 junior designers and ran the studio’s monthly front-end guild.",
      ],
      tech: [],
    },
    {
      role: "UX Engineer",
      company: "Brightwell Studio",
      location: "London, United Kingdom",
      period: "Oct 2012 – May 2014",
      points: [
        "Designed and built responsive websites for 14 clients in retail, banking and the public sector.",
        "Delivered 2 projects that won industry awards (see Awards).",
      ],
      tech: [],
    },
    {
      role: "Research Assistant (part-time)",
      company: "University of Northbridge, Interaction Lab",
      location: "Northbridge, United Kingdom",
      period: "Jan 2012 – Sep 2012",
      points: [
        "Ran 30 usability sessions for a study on bilingual navigation menus and co-authored a technical report.",
      ],
      tech: [],
    },
    {
      role: "Junior Web Developer",
      company: "Mirqab Digital Agency",
      location: "Riyadh, Saudi Arabia",
      period: "Jul 2010 – Aug 2011",
      points: [
        "Built more than 20 websites in HTML, CSS, jQuery and PHP for local businesses and event organizers.",
      ],
      tech: ["HTML", "CSS", "jQuery", "PHP"],
    },
    {
      role: "Freelance Graphic and Web Designer (part-time)",
      company: "Self-employed",
      location: "Riyadh, Saudi Arabia",
      period: "Sep 2008 – Jun 2010",
      points: [
        "Designed logos, printed material and websites for 35 clients while at university.",
      ],
      tech: [],
    },
  ],

  // Each project gets its own page at /projects/<slug>.
  // slug = short, lowercase, words joined with "-" (used in the URL).
  // description = Problem + Action + Result joined; problem/action/result
  // are also kept separately so the project page can lay them out.
  projects: [
    {
      slug: "mizan-design-system",
      name: "Mizan Design System",
      summary:
        "Bilingual design system: 180 components adopted by all 9 product teams.",
      organization: "Faseela Ventures",
      period: "Oct 2023 – Jun 2025",
      role: "Lead designer and engineer",
      team: "Team of 6",
      problem:
        "9 product teams built the same interface parts in different ways, with 4 button styles and 11 shades of green.",
      action:
        "Audited 1,300 screens, defined design tokens, and built and documented the components in Figma and code.",
      result:
        "180 components, 38% faster UI build time, and 96% of screens meeting WCAG 2.2 AA.",
      description:
        "Problem: 9 product teams built the same interface parts in different ways, with 4 button styles and 11 shades of green. Action: Audited 1,300 screens, defined design tokens, and built and documented the components in Figma and code. Result: 180 components, 38% faster UI build time, and 96% of screens meeting WCAG 2.2 AA.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Figma tokens"],
      demo: "",
      repo: "",
    },
    {
      slug: "national-telemedicine-platform",
      name: "National Telemedicine Platform",
      summary:
        "3.1 million consultations in 2022; average wait cut from 22 to 6 minutes.",
      organization: "Zayna Health Tech",
      period: "May 2021 – Dec 2022",
      role: "Product engineering lead",
      team: "Team of 31",
      problem:
        "Patients waited an average of 22 minutes for a video consultation, and 1 in 5 calls dropped.",
      action:
        "Led the redesign of the patient queue, the doctor console and the video layer.",
      result:
        "3.1 million consultations in 2022; average wait fell from 22 to 6 minutes and dropped calls from 20% to 3%.",
      description:
        "Problem: Patients waited an average of 22 minutes for a video consultation, and 1 in 5 calls dropped. Action: Led the redesign of the patient queue, the doctor console and the video layer. Result: 3.1 million consultations in 2022; average wait fell from 22 to 6 minutes and dropped calls from 20% to 3%.",
      tech: ["React", "React Native", "WebRTC", "Node.js", "Google Cloud"],
      demo: "",
      repo: "",
    },
    {
      slug: "savings-goals",
      name: "Savings Goals",
      summary:
        "610,000 goals opened in 6 months; won Best Fintech Experience 2024.",
      organization: "Faseela Ventures",
      period: "Jan 2024 – Aug 2024",
      role: "Research and design lead",
      team: "Team of 8",
      problem: "70% of users had never saved money inside the app.",
      action:
        "Ran 48 interviews in 5 cities, tested 3 prototypes and designed the final goal-setting flow.",
      result:
        "610,000 goals opened in 6 months, with an average of SAR 2,300 saved per goal; won Best Fintech Experience 2024.",
      description:
        "Problem: 70% of users had never saved money inside the app. Action: Ran 48 interviews in 5 cities, tested 3 prototypes and designed the final goal-setting flow. Result: 610,000 goals opened in 6 months, with an average of SAR 2,300 saved per goal; won Best Fintech Experience 2024.",
      tech: ["React Native", "GraphQL", "Figma"],
      demo: "",
      repo: "",
    },
    {
      slug: "qalam-learn-code-editor",
      name: "Qalam Learn Code Editor",
      summary:
        "Browser code editor that explains errors in plain Arabic; completion rose from 18% to 46%.",
      organization: "Qalam Learn",
      period: "Feb 2019 – Apr 2021",
      role: "Co-founder, design and front-end",
      team: "Team of 4",
      problem: "Learners quit when English error messages stopped their code.",
      action:
        "Built a browser code editor that explains errors in plain Arabic and suggests the next step.",
      result: "Course completion rose from 18% to 46%.",
      description:
        "Problem: Learners quit when English error messages stopped their code. Action: Built a browser code editor that explains errors in plain Arabic and suggests the next step. Result: Course completion rose from 18% to 46%.",
      tech: ["Vue", "TypeScript", "Monaco Editor", "Firebase"],
      demo: "",
      repo: "",
    },
    {
      slug: "khatt-adaptive-typography-engine",
      name: "Khatt Adaptive Typography Engine",
      summary:
        "Engine that adapts Arabic text to the reader and screen; reading speed up 19%, patent granted.",
      organization: "PhD research, Eastmoor Institute of Technology",
      period: "Sep 2019 – Jul 2022",
      role: "Researcher and sole developer",
      team: "",
      problem:
        "Arabic text on screens is often too small, too dense and hard to scan.",
      action:
        "Built an engine that adjusts Arabic font size, spacing and line length to the reader and the screen, then tested it with 312 participants.",
      result:
        "Reading speed rose by 19% and errors fell by 31%; the method was granted a patent in Jun 2024.",
      description:
        "Problem: Arabic text on screens is often too small, too dense and hard to scan. Action: Built an engine that adjusts Arabic font size, spacing and line length to the reader and the screen, then tested it with 312 participants. Result: Reading speed rose by 19% and errors fell by 31%; the method was granted a patent in Jun 2024.",
      tech: ["TypeScript", "Canvas API", "Python"],
      demo: "",
      repo: "",
    },
    {
      slug: "hirfa-ui",
      name: "Hirfa UI (open source)",
      summary:
        "Right-to-left component library: 9,800 GitHub stars and 1.2 million npm downloads a year.",
      organization: "Open source",
      period: "Mar 2020 – Present",
      role: "Founder and lead maintainer",
      team: "210 contributors",
      problem:
        "Popular component libraries handled right-to-left layouts poorly.",
      action:
        "Designed and built 95 components with mirrored layouts, Arabic typography presets and full keyboard support.",
      result:
        "9,800 GitHub stars and 1.2 million npm downloads a year; won the Open Source Impact Award 2022.",
      description:
        "Problem: Popular component libraries handled right-to-left layouts poorly. Action: Designed and built 95 components with mirrored layouts, Arabic typography presets and full keyboard support. Result: 9,800 GitHub stars and 1.2 million npm downloads a year; won the Open Source Impact Award 2022.",
      tech: ["React", "TypeScript", "CSS logical properties", "Storybook"],
      demo: "",
      repo: "https://github.example/yara-mansouri",
    },
    {
      slug: "dalil-accessibility-toolkit",
      name: "Dalil Accessibility Toolkit",
      summary:
        "Browser extension flagging 42 Arabic-specific accessibility issues; used by 3,400 developers.",
      organization: "Side project",
      period: "Jan 2022 – Sep 2022",
      role: "Designer and developer",
      team: "Solo",
      problem:
        "Accessibility checkers missed issues specific to Arabic and right-to-left pages.",
      action:
        "Built a browser extension that flags 42 Arabic-specific accessibility issues and explains how to fix each one.",
      result: "Used by 3,400 developers in 22 countries.",
      description:
        "Problem: Accessibility checkers missed issues specific to Arabic and right-to-left pages. Action: Built a browser extension that flags 42 Arabic-specific accessibility issues and explains how to fix each one. Result: Used by 3,400 developers in 22 countries.",
      tech: ["JavaScript", "Chrome Extensions API", "axe-core"],
      demo: "",
      repo: "",
    },
    {
      slug: "rafeeq-rides-matching-app",
      name: "Rafeeq Rides Matching App",
      summary:
        "Ride-matching for university students: 26,000 sign-ups and 140,000 rides.",
      organization: "Rafeeq Rides",
      period: "Apr 2015 – Dec 2016",
      role: "Co-founder and CTO",
      team: "Team of 11",
      problem:
        "University students had few safe and affordable ways to commute.",
      action:
        "Designed the matching system that paired riders by campus, timetable and route.",
      result:
        "26,000 sign-ups and 140,000 rides before the company closed in Dec 2016.",
      description:
        "Problem: University students had few safe and affordable ways to commute. Action: Designed the matching system that paired riders by campus, timetable and route. Result: 26,000 sign-ups and 140,000 rides before the company closed in Dec 2016.",
      tech: ["React Native", "Node.js", "MongoDB", "Google Maps APIs"],
      demo: "",
      repo: "",
    },
  ],

  // `level` and `years` are NEW extra fields; group/items are the starter's.
  skills: [
    {
      group: "Product Design",
      level: "Expert",
      years: 18,
      items: ["Figma", "design systems", "prototyping", "motion design", "information architecture"],
    },
    {
      group: "Front-End Engineering",
      level: "Expert",
      years: 16,
      items: ["TypeScript", "JavaScript", "React", "Next.js", "Vue", "Tailwind CSS", "Web Components"],
    },
    {
      group: "User Research",
      level: "Expert",
      years: 14,
      items: ["interviews", "usability testing", "diary studies", "A/B testing", "eye-tracking"],
    },
    {
      group: "Accessibility",
      level: "Expert",
      years: 11,
      items: ["WCAG 2.2 AA", "ARIA", "screen-reader testing", "Arabic right-to-left accessibility"],
    },
    {
      group: "Back-End and APIs",
      level: "Advanced",
      years: 10,
      items: ["Node.js", "NestJS", "GraphQL", "REST", "PostgreSQL", "Redis"],
    },
    {
      group: "Leadership",
      level: "Expert",
      years: 9,
      items: ["hiring", "organization design", "OKRs", "budgeting", "stakeholder management", "mentoring"],
    },
    {
      group: "Mobile",
      level: "Advanced",
      years: 8,
      items: ["React Native", "Flutter", "Swift (basic)"],
    },
    {
      group: "Cloud and DevOps",
      level: "Advanced",
      years: 7,
      items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    },
    {
      group: "Security and Compliance",
      level: "Intermediate",
      years: 6,
      items: ["secure development lifecycle", "PCI DSS", "health-data privacy", "threat modelling"],
    },
    {
      group: "Data and AI",
      level: "Intermediate",
      years: 5,
      items: ["Python", "SQL", "data visualization", "recommendation systems", "AI product features"],
    },
  ],

  // Awards (CV "Awards" section). title/detail are the starter's fields;
  // issuer/year/for are NEW structured extras.
  achievements: [
    {
      title: "Design Technology Leader of the Year",
      issuer: "Gulf Design Week Awards",
      year: "2025",
      for: "For the Mizan Design System",
      detail: "Gulf Design Week Awards · 2025 · For the Mizan Design System",
    },
    {
      title: "Best Fintech Experience",
      issuer: "Arab Fintech Excellence Awards",
      year: "2024",
      for: "For Savings Goals",
      detail: "Arab Fintech Excellence Awards · 2024 · For Savings Goals",
    },
    {
      title: "Top 40 Under 40 in Saudi Tech",
      issuer: "Riyadh Tech Review",
      year: "2023",
      for: "For career achievement",
      detail: "Riyadh Tech Review · 2023 · For career achievement",
    },
    {
      title: "Best Doctoral Thesis in HCI",
      issuer: "Eastmoor Institute of Technology",
      year: "2022",
      for: "For the PhD thesis",
      detail: "Eastmoor Institute of Technology · 2022 · For the PhD thesis",
    },
    {
      title: "Open Source Impact Award",
      issuer: "Arab Open Source Foundation",
      year: "2022",
      for: "For Hirfa UI",
      detail: "Arab Open Source Foundation · 2022 · For Hirfa UI",
    },
    {
      title: "Digital Health Innovation Award",
      issuer: "Middle East Health Informatics Board",
      year: "2021",
      for: "For the telemedicine platform",
      detail: "Middle East Health Informatics Board · 2021 · For the telemedicine platform",
    },
    {
      title: "Women in Tech Leadership Award",
      issuer: "Saudi Women in Design Network",
      year: "2020",
      for: "For leadership at Zayna Health Tech",
      detail: "Saudi Women in Design Network · 2020 · For leadership at Zayna Health Tech",
    },
    {
      title: "Silver, Responsive Design category",
      issuer: "London Web Craft Awards",
      year: "2014",
      for: "For a retail client website at Brightwell Studio",
      detail: "London Web Craft Awards · 2014 · For a retail client website at Brightwell Studio",
    },
    {
      title: "Rising Star in UX",
      issuer: "UK Interaction Design Guild",
      year: "2013",
      for: "For a public-sector client website at Brightwell Studio",
      detail: "UK Interaction Design Guild · 2013 · For a public-sector client website at Brightwell Studio",
    },
    {
      title: "Best Graduation Project",
      issuer: "Najd Valley University",
      year: "2010",
      for: "For an Arabic speech-to-text note-taking app",
      detail: "Najd Valley University · 2010 · For an Arabic speech-to-text note-taking app",
    },
  ],

  // NEW — Certifications (CV page 5–6). status: Active | Lifetime | Expired | In progress
  certificationsNote:
    "19 earned, 1 in progress. All issuers and credential IDs are fictional.",
  certifications: [
    {
      name: "Certified Security Architecture Professional (CSAP)",
      issuer: "Global Cyber Assurance Council",
      year: "",
      status: "In progress",
      note: "Exam booked for Dec 2026",
      id: "",
    },
    {
      name: "Certified Cloud Solutions Architect – Professional",
      issuer: "Cloud Architecture Guild",
      year: "2025",
      status: "Active",
      note: "",
      id: "CAG-CSA-25-0912",
    },
    {
      name: "Certified Design Leader",
      issuer: "Arabian Design Council",
      year: "2025",
      status: "Active",
      note: "",
      id: "ADC-CDL-25-0044",
    },
    {
      name: "Multi-Cloud Platform Architect",
      issuer: "Halcyon Cloud Institute",
      year: "2024",
      status: "Active",
      note: "",
      id: "HLC-MPA-24-3307",
    },
    {
      name: "Certified Container Application Developer",
      issuer: "Open Container Academy",
      year: "2024",
      status: "Active",
      note: "",
      id: "OCA-CAD-24-1185",
    },
    {
      name: "Open Banking Product Specialist",
      issuer: "Gulf FinTech Academy",
      year: "2024",
      status: "Active",
      note: "",
      id: "GFA-OBP-24-0219",
    },
    {
      name: "Certified Project Leadership Professional",
      issuer: "International Project Leadership Society",
      year: "2023",
      status: "Active",
      note: "",
      id: "IPLS-CPL-23-5560",
    },
    {
      name: "Certified Accessibility Specialist",
      issuer: "Inclusive Interfaces Council",
      year: "2023",
      status: "Active",
      note: "",
      id: "IIC-CAS-23-0471",
    },
    {
      name: "Applied Data Visualization Certificate",
      issuer: "Riyadh Data Institute",
      year: "2023",
      status: "Lifetime",
      note: "",
      id: "RDI-ADV-23-0118",
    },
    {
      name: "UX Research and Interaction Design Certificate",
      issuer: "Meridian UX Institute",
      year: "2022",
      status: "Lifetime",
      note: "",
      id: "MUI-UXR-22-8842",
    },
    {
      name: "Enterprise Architecture Practitioner",
      issuer: "Global Enterprise Architecture Forum",
      year: "2022",
      status: "Active",
      note: "",
      id: "GEAF-EAP-22-0193",
    },
    {
      name: "Certified Agile Product Owner",
      issuer: "Agile Practice Council",
      year: "2022",
      status: "Expired",
      note: "Expired 2024",
      id: "APC-APO-22-6620",
    },
    {
      name: "Professional Scrum Facilitator, Level 1",
      issuer: "Agile Delivery Institute",
      year: "2021",
      status: "Lifetime",
      note: "",
      id: "ADI-PSF-21-4410",
    },
    {
      name: "Cloud Application Developer – Associate",
      issuer: "Skyline Developer Program",
      year: "2021",
      status: "Expired",
      note: "Expired 2023",
      id: "SDP-CAD-21-2075",
    },
    {
      name: "IT Service Management Foundation",
      issuer: "Service Excellence Board",
      year: "2020",
      status: "Lifetime",
      note: "",
      id: "SEB-ITSM-20-9931",
    },
    {
      name: "Health Data Privacy Practitioner",
      issuer: "Middle East Health Informatics Board",
      year: "2020",
      status: "Active",
      note: "",
      id: "MEHIB-HDP-20-0306",
    },
    {
      name: "Lean Six Sigma Green Belt",
      issuer: "Institute for Process Excellence",
      year: "2019",
      status: "Lifetime",
      note: "",
      id: "IPE-LSS-19-1402",
    },
    {
      name: "Security Fundamentals Professional",
      issuer: "Cyber Readiness Academy",
      year: "2019",
      status: "Expired",
      note: "Expired 2022",
      id: "CRA-SFP-19-7718",
    },
    {
      name: "Usability Analysis Professional",
      issuer: "Usability Practice Institute",
      year: "2016",
      status: "Lifetime",
      note: "",
      id: "UPI-UAP-16-0268",
    },
    {
      name: "Advanced Motion Design for Interfaces",
      issuer: "London School of Interface Craft",
      year: "2014",
      status: "Lifetime",
      note: "",
      id: "LSIC-MD-14-0052",
    },
  ],

  // NEW — Patents
  patents: [
    {
      title: "Method for adaptive Arabic text rendering based on reading context",
      number: "Patent No. SA 11223 (fictional)",
      status: "Granted Jun 2024",
    },
    {
      title: "System for bilingual component theming in design systems",
      number: "Application No. SA 2025-0417 (fictional)",
      status: "Filed Mar 2025, pending",
    },
  ],

  // NEW — Publications
  publicationsNote: "Selected 6 of 9. Full list: scholar.example/yaram",
  publications: [
    {
      authors: "Al-Mansouri, Y., & Marsh, H.",
      year: "2022",
      title: "Adaptive typography for Arabic interfaces: A study with 312 readers.",
      venue: "Journal of Human-Centred Computing, 14(3), 211–238.",
    },
    {
      authors: "Al-Mansouri, Y.",
      year: "2021",
      title: "Trust signals in Arabic health apps.",
      venue: "Proceedings of the International Conference on Arabic Interfaces (ICAI 2021), 45–56.",
    },
    {
      authors: "Al-Mansouri, Y., Rahman, S., & Okafor, T.",
      year: "2020",
      title: "Right-to-left design systems at scale.",
      venue: "Proceedings of DesignOps Summit Asia 2020, 12–19.",
    },
    {
      authors: "Al-Mansouri, Y., & Marsh, H.",
      year: "2020",
      title: "Measuring reading comfort on small screens.",
      venue: "ICAI 2020 Workshop on Arabic Typography, 8–13.",
    },
    {
      authors: "Al-Mansouri, Y.",
      year: "2019",
      title: "Teaching front-end development in Arabic: Lessons from 50,000 learners.",
      venue: "Gulf Journal of Computing Education, 7(1), 33–49.",
    },
    {
      authors: "Hart, L., & Al-Mansouri, Y.",
      year: "2012",
      title: "Bilingual navigation menus on small screens.",
      venue: "Northbridge Interaction Lab Technical Report NIL-TR-2012-07.",
    },
  ],

  // NEW — Speaking (CV: "Selected 8 of 31 talks")
  talksNote: "Selected 8 of 31 talks.",
  talks: [
    { type: "Keynote", title: "Design systems that speak two languages", event: "Najd Developer Days 2025", place: "Riyadh", year: "2025" },
    { type: "Talk", title: "Accessibility is a product decision", event: "Gulf Design Week 2025", place: "Dubai", year: "2025" },
    { type: "Panel", title: "Building trust in fintech UX", event: "Gulf Fintech Builders Forum 2024", place: "Riyadh", year: "2024" },
    { type: "Talk", title: "Scaling a team from 6 to 64", event: "Engineering Leadership Week 2023", place: "Cairo", year: "2023" },
    { type: "Talk", title: "What my PhD taught me about Arabic type", event: "Typography Majlis 2022", place: "Jeddah", year: "2022" },
    { type: "Keynote", title: "Telemedicine at national scale", event: "Digital Health Middle East Summit 2021", place: "Online", year: "2021" },
    { type: "Talk", title: "Why our startup failed", event: "Founders Night Riyadh 2016", place: "Riyadh", year: "2016" },
    { type: "Talk", title: "Responsive design for right-to-left", event: "Frontend Horizons London 2014", place: "London", year: "2014" },
  ],

  // NEW — Media
  media: [
    {
      type: "Cover story",
      title: "The engineer who designs in two directions",
      outlet: "Riyadh Tech Review",
      date: "Mar 2023",
      detail: "",
      url: "",
    },
    {
      type: "Podcast guest",
      title: "From startup failure to Principal Engineer",
      outlet: "Build in Arabic, Episode 42",
      date: "Jun 2024",
      detail: "",
      url: "",
    },
    {
      type: "YouTube channel",
      title: "Yara Builds",
      outlet: "YouTube",
      date: "2020 – Present",
      detail: "86 tutorials on design systems and right-to-left front-end · 48,000 subscribers",
      url: "https://youtube.example/@YaraBuilds",
    },
    {
      type: "Article",
      title: "Accessibility debt in fintech",
      outlet: "Medium",
      date: "Nov 2023",
      detail: "Read 120,000 times",
      url: "",
    },
  ],

  // NEW — Leadership, teaching and volunteering ("Held alongside the full-time roles above.")
  leadership: [
    {
      role: "Adjunct Lecturer (part-time)",
      organization: "College of Computing, Najd Valley University",
      period: "Sep 2019 – Jun 2024",
      detail: "Taught Human-Computer Interaction, Front-End Development and Design Systems to 1,400+ students over 10 semesters",
    },
    {
      role: "Advisory Board Member",
      organization: "Saudi Women in Design Network",
      period: "Mar 2022 – Present",
      detail: "Runs the annual mentorship program for 60 early-career designers",
    },
    {
      role: "Technical Advisor",
      organization: "2 early-stage health-tech startups",
      period: "Feb 2024 – Present",
      detail: "Advises on product strategy, hiring and architecture",
    },
    {
      role: "Mentor",
      organization: "Najd Valley Startup Accelerator",
      period: "Jan 2020 – Present",
      detail: "Mentored 25 startups across 6 cohorts",
    },
    {
      role: "Hackathon Judge",
      organization: "Various organizers",
      period: "Jan 2018 – Present",
      detail: "Judged 12 hackathons in Riyadh, Jeddah and Dubai",
    },
    {
      role: "Volunteer Instructor",
      organization: "Code for Community, Riyadh",
      period: "Jan 2017 – Jun 2017",
      detail: "Taught a 12-week web development course to 45 adult learners",
    },
  ],

  // NEW — Languages
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent (C2), IELTS 8.5" },
    { name: "French", level: "Upper intermediate (B2), DELF B2" },
    { name: "German", level: "Elementary (A2), from the exchange semester" },
    { name: "Turkish", level: "Beginner (A1), currently learning" },
  ],

  // NEW — Interests
  interests: [
    "Arabic calligraphy, with work shown in 2 group exhibitions",
    "Long-distance running: 3 half marathons",
    "Restoring old film cameras",
    "Chess, with an online rating of 1,850",
  ],
};
