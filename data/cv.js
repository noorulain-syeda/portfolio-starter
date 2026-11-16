// Yara Al-Mansouri's CV: the single source of truth for the whole site.
// Every piece of text a visitor reads is { en, ar }. Numbers, dates, tech names,
// credential IDs and links are shared between both languages.
// Run `npm run check:cv` to confirm nothing from the PDF is missing.

const t = (en, ar) => ({ en, ar });

export const cv = {
  name: t("Yara Saud Al-Mansouri, PhD", "د. يارا سعود المنصوري"),
  shortName: t("Yara Al-Mansouri", "يارا المنصوري"),
  title: t(
    "Principal Product Engineer | Design Technology Lead | HCI Researcher",
    "مهندسة منتجات رئيسية | قائدة تقنيات التصميم | باحثة في التفاعل بين الإنسان والحاسوب"
  ),
  location: t("Riyadh, Saudi Arabia", "الرياض، المملكة العربية السعودية"),
  cvFile: "/cv/Yara_Al-Mansouri_CV.pdf",

  contact: {
    phone: "+966 55 000 0000",
    email: "yara.almansouri@mail.example",
    links: [
      { label: "Portfolio", url: "https://yara.example" },
      { label: "LinkedIn", url: "https://linkedin.example/in/yaramansouri" },
      { label: "GitHub", url: "https://github.example/yara-mansouri" },
      { label: "Dribbble", url: "https://dribbble.example/yaram" },
      { label: "Behance", url: "https://behance.example/yaram" },
      { label: "Medium", url: "https://medium.example/@yaram" },
      { label: "Google Scholar", url: "https://scholar.example/yaram" },
      { label: "YouTube", url: "https://youtube.example/@YaraBuilds" },
    ],
  },

  summary: t(
    "Product engineer and designer with 16 years of professional experience building digital products in Saudi Arabia and the United Kingdom, across health tech, fintech, education and mobility. Leads teams from first research to launch while still designing and writing code every week. Has led a team of up to 64 people, shipped more than 40 products used by over 9 million people, co-founded two startups (one acquired) and earned a PhD in Human-Computer Interaction focused on Arabic interfaces.",
    "مهندسة ومصممة منتجات بخبرة مهنية تمتد ١٦ عاماً في بناء المنتجات الرقمية في المملكة العربية السعودية والمملكة المتحدة، في التقنية الصحية والتقنية المالية والتعليم والتنقل. تقود الفرق من البحث الأول حتى الإطلاق، وما زالت تصمّم وتكتب الكود كل أسبوع. قادت فريقاً يصل إلى ٦٤ شخصاً، وأطلقت أكثر من ٤٠ منتجاً يستخدمها أكثر من ٩ ملايين شخص، وشاركت في تأسيس شركتين ناشئتين (استُحوذ على إحداهما)، وحصلت على الدكتوراه في التفاعل بين الإنسان والحاسوب بتركيز على الواجهات العربية."
  ),

  highlights: [
    { value: t("16", "١٦"), text: t("years of professional experience (since Jul 2010)", "عاماً من الخبرة المهنية (منذ يوليو ٢٠١٠)") },
    { value: t("40+", "٤٠+"), text: t("products shipped, reaching 9 million+ people", "منتجاً أُطلقت ووصلت إلى أكثر من ٩ ملايين شخص") },
    { value: t("64", "٦٤"), text: t("people led across 7 squads", "شخصاً قادتهم في ٧ فرق") },
    { value: t("2", "٢"), text: t("startups co-founded: 1 acquired, 1 closed", "شركتان ناشئتان شاركت في تأسيسهما: استُحوذ على واحدة وأُغلقت الأخرى") },
    { value: t("2", "٢"), text: t("patents: 1 granted, 1 pending", "براءتا اختراع: واحدة ممنوحة وأخرى قيد الدراسة") },
    { value: t("9", "٩"), text: t("publications and 31 talks and keynotes", "منشورات و٣١ محاضرة وكلمة رئيسية") },
    { value: t("1,400+", "١٬٤٠٠+"), text: t("university students taught", "طالب جامعي درّستهم") },
    { value: t("19", "١٩"), text: t("certifications earned, 1 in progress", "شهادة مهنية، وواحدة قيد الإنجاز") },
  ],

  skills: [
    {
      group: t("Product Design", "تصميم المنتجات"), level: "expert", years: 18,
      items: ["Figma", t("design systems", "أنظمة التصميم"), t("prototyping", "النماذج الأولية"), t("motion design", "تصميم الحركة"), t("information architecture", "هندسة المعلومات")],
    },
    {
      group: t("Front-End Engineering", "هندسة الواجهات الأمامية"), level: "expert", years: 16,
      items: ["TypeScript", "JavaScript", "React", "Next.js", "Vue", "Tailwind CSS", "Web Components"],
    },
    {
      group: t("User Research", "بحث المستخدمين"), level: "expert", years: 14,
      items: [t("interviews", "المقابلات"), t("usability testing", "اختبارات قابلية الاستخدام"), t("diary studies", "دراسات اليوميات"), t("A/B testing", "اختبارات A/B"), t("eye-tracking", "تتبّع حركة العين")],
    },
    {
      group: t("Accessibility", "إمكانية الوصول"), level: "expert", years: 11,
      items: ["WCAG 2.2 AA", "ARIA", t("screen-reader testing", "الاختبار بقارئات الشاشة"), t("Arabic right-to-left accessibility", "إمكانية الوصول في الواجهات العربية من اليمين إلى اليسار")],
    },
    {
      group: t("Back-End and APIs", "الواجهات الخلفية وواجهات البرمجة"), level: "advanced", years: 10,
      items: ["Node.js", "NestJS", "GraphQL", "REST", "PostgreSQL", "Redis"],
    },
    {
      group: t("Leadership", "القيادة"), level: "expert", years: 9,
      items: [t("hiring", "التوظيف"), t("organization design", "تصميم الهيكل التنظيمي"), "OKRs", t("budgeting", "إعداد الميزانيات"), t("stakeholder management", "إدارة أصحاب المصلحة"), t("mentoring", "الإرشاد")],
    },
    {
      group: t("Mobile", "تطبيقات الجوال"), level: "advanced", years: 8,
      items: ["React Native", "Flutter", t("Swift (basic)", "Swift (أساسي)")],
    },
    {
      group: t("Cloud and DevOps", "الحوسبة السحابية وDevOps"), level: "advanced", years: 7,
      items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    },
    {
      group: t("Security and Compliance", "الأمن والامتثال"), level: "intermediate", years: 6,
      items: [t("secure development lifecycle", "دورة التطوير الآمن"), "PCI DSS", t("health-data privacy", "خصوصية البيانات الصحية"), t("threat modelling", "نمذجة التهديدات")],
    },
    {
      group: t("Data and AI", "البيانات والذكاء الاصطناعي"), level: "intermediate", years: 5,
      items: ["Python", "SQL", t("data visualization", "تصوير البيانات"), t("recommendation systems", "أنظمة التوصية"), t("AI product features", "ميزات المنتجات المعتمدة على الذكاء الاصطناعي")],
    },
  ],

  // Newest first, exactly as in the CV (the 2017 career break included).
  experience: [
    {
      id: "faseela-principal",
      role: t("Principal Product Engineer & Design Technology Lead", "مهندسة منتجات رئيسية وقائدة تقنيات التصميم"),
      org: t("Faseela Ventures", "فسيلة فنتشرز"), place: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2023-09", end: null,
      points: [
        t("Set the front-end and design-system direction for 9 product teams across payments, savings and rewards in a fintech super-app with 4.2 million users.", "حدّدت توجّه الواجهات الأمامية ونظام التصميم لتسعة فرق منتجات في المدفوعات والادخار والمكافآت، ضمن تطبيق مالي شامل يستخدمه ٤٫٢ مليون مستخدم."),
        t("Built Mizan, the company’s bilingual design system: 180 components adopted by all 9 teams, cutting UI build time by 38%.", "بنت «ميزان»، نظام التصميم ثنائي اللغة للشركة: ١٨٠ مكوّناً تبنّتها الفرق التسعة كلها، وخفّضت وقت بناء الواجهات بنسبة ٣٨٪."),
        t("Led the rebuild of the web app in Next.js and TypeScript, reducing Largest Contentful Paint from 4.8 s to 1.6 s.", "قادت إعادة بناء تطبيق الويب باستخدام Next.js وTypeScript، فانخفض زمن Largest Contentful Paint من ٤٫٨ ثانية إلى ١٫٦ ثانية."),
        t("Introduced accessibility reviews for every release, raising screens that meet WCAG 2.2 AA from 41% to 96%.", "أدخلت مراجعات إمكانية الوصول في كل إصدار، فارتفعت نسبة الشاشات المتوافقة مع WCAG 2.2 AA من ٤١٪ إلى ٩٦٪."),
        t("Designed the Savings Goals feature from research in 5 cities; 610,000 users opened a goal in its first 6 months.", "صمّمت ميزة «أهداف الادخار» انطلاقاً من بحث في ٥ مدن، وفتح ٦١٠٬٠٠٠ مستخدم هدفاً خلال أشهرها الستة الأولى."),
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React Native", "GraphQL", "AWS"],
    },
    {
      id: "zayna-director",
      role: t("Director of Product Engineering", "مديرة هندسة المنتجات"),
      org: t("Zayna Health Tech", "زينة للتقنية الصحية"), place: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2021-03", end: "2023-08",
      points: [
        t("Led 64 people across 7 squads (engineering, design, quality and data) with an annual budget of SAR 21 million.", "قادت ٦٤ شخصاً في ٧ فرق (الهندسة والتصميم والجودة والبيانات) بميزانية سنوية قدرها ٢١ مليون ريال."),
        t("Launched the telemedicine platform at national scale, delivering 3.1 million consultations in 2022.", "أطلقت منصة الطب الاتصالي على المستوى الوطني، وقدّمت ٣٫١ مليون استشارة في عام ٢٠٢٢."),
        t("Cut the app crash rate from 2.4% to 0.3% and raised the app-store rating from 3.6 to 4.7.", "خفّضت معدل أعطال التطبيق من ٢٫٤٪ إلى ٠٫٣٪، ورفعت تقييمه في متاجر التطبيقات من ٣٫٦ إلى ٤٫٧."),
        t("Took the platform through two health-data security audits with zero major findings.", "اجتازت بالمنصة تدقيقين لأمن البيانات الصحية دون أي ملاحظة جوهرية."),
      ],
      tech: ["React", "React Native", "Node.js", "PostgreSQL", "Google Cloud", "Kubernetes"],
    },
    {
      id: "zayna-manager",
      role: t("Engineering Manager, Patient Apps", "مديرة الهندسة، تطبيقات المرضى"),
      org: t("Zayna Health Tech", "زينة للتقنية الصحية"), place: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2019-01", end: "2021-02",
      points: [
        t("Grew the patient apps team from 6 to 22 people; hired and mentored 4 team leads.", "وسّعت فريق تطبيقات المرضى من ٦ إلى ٢٢ شخصاً، ووظّفت ٤ قادة فرق وأرشدتهم."),
        t("Shipped appointment booking used by 1.8 million patients across 140 clinics.", "أطلقت خدمة حجز المواعيد التي استخدمها ١٫٨ مليون مريض في ١٤٠ عيادة."),
        t("Shortened the release cycle from 6 weeks to 1 week with CI/CD and feature flags.", "قلّصت دورة الإصدار من ٦ أسابيع إلى أسبوع واحد باستخدام CI/CD ومفاتيح تفعيل الميزات."),
      ],
      tech: [],
    },
    {
      id: "zayna-senior-fe",
      role: t("Senior Front-End Engineer", "مهندسة واجهات أمامية أولى"),
      org: t("Zayna Health Tech", "زينة للتقنية الصحية"), place: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2017-07", end: "2018-12",
      points: [
        t("Rebuilt the clinic dashboard in React, cutting doctors’ average task time by 27%.", "أعادت بناء لوحة تحكم العيادات باستخدام React، فانخفض متوسط وقت إنجاز المهام لدى الأطباء بنسبة ٢٧٪."),
        t("Created the first shared component library, which later grew into the Zayna design system.", "أنشأت أول مكتبة مكوّنات مشتركة، وتطوّرت لاحقاً إلى نظام التصميم في زينة."),
      ],
      tech: [],
    },
    {
      id: "qalam-cofounder",
      role: t("Co-founder (part-time)", "شريكة مؤسِّسة (دوام جزئي)"),
      org: t("Qalam Learn", "قلم للتعلّم"), place: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2019-02", end: "2022-11",
      points: [
        t("Co-founded an Arabic-first coding education platform that reached 230,000 learners in 14 countries.", "شاركت في تأسيس منصة لتعليم البرمجة بالعربية أولاً، وصلت إلى ٢٣٠٬٠٠٠ متعلّم في ١٤ دولة."),
        t("Designed and built its interactive code editor, which explains errors in plain Arabic.", "صمّمت وبنت محرّر الأكواد التفاعلي في المنصة، الذي يشرح الأخطاء بلغة عربية بسيطة."),
        t("Grew the team to 9 people and led product until the company was acquired by Mirqab Group in Nov 2022.", "وسّعت الفريق إلى ٩ أشخاص وقادت المنتج حتى استحوذت مجموعة مرقاب على الشركة في نوفمبر ٢٠٢٢."),
      ],
      tech: ["Vue", "TypeScript", "Monaco Editor", "Firebase"],
    },
    {
      id: "career-break",
      role: t("Career Break", "استراحة مهنية"),
      org: null, place: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2017-01", end: "2017-06",
      points: [
        t("Family relocation and volunteering.", "انتقال عائلي وعمل تطوعي."),
        t("Taught a 12-week web development course to 45 adult learners with the Code for Community initiative.", "درّست دورة في تطوير الويب مدتها ١٢ أسبوعاً لـ٤٥ متعلّماً بالغاً مع مبادرة Code for Community."),
      ],
      tech: [],
    },
    {
      id: "rafeeq-cto",
      role: t("Co-founder & Chief Technology Officer", "شريكة مؤسِّسة ورئيسة تقنية"),
      org: t("Rafeeq Rides", "رفيق"), place: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2015-04", end: "2016-12",
      points: [
        t("Built a ride-sharing app for university students: 26,000 sign-ups and 140,000 rides in 20 months.", "بنت تطبيقاً لمشاركة الرحلات لطلاب الجامعات: ٢٦٬٠٠٠ تسجيل و١٤٠٬٠٠٠ رحلة خلال ٢٠ شهراً."),
        t("Raised SAR 3.5 million in seed funding and led a team of 11.", "جمعت ٣٫٥ مليون ريال في جولة التمويل التأسيسية وقادت فريقاً من ١١ شخصاً."),
        t("Closed the company in Dec 2016 after a market change and wrote a public post-mortem read by 80,000 people.", "أغلقت الشركة في ديسمبر ٢٠١٦ بعد تغيّر في السوق، وكتبت مراجعة علنية لأسباب الإغلاق قرأها ٨٠٬٠٠٠ شخص."),
      ],
      tech: ["React Native", "Node.js", "MongoDB", "Google Maps APIs"],
    },
    {
      id: "brightwell-senior",
      role: t("Senior UX Engineer", "مهندسة تجربة مستخدم أولى"),
      org: t("Brightwell Studio", "استوديو برايتويل"), place: t("London, United Kingdom", "لندن، المملكة المتحدة"),
      start: "2014-06", end: "2015-03",
      points: [
        t("Led the studio’s first Arabic, right-to-left project, for a Gulf travel client.", "قادت أول مشروع عربي من اليمين إلى اليسار في الاستوديو، لعميل خليجي في قطاع السفر."),
        t("Mentored 3 junior designers and ran the studio’s monthly front-end guild.", "أرشدت ٣ مصممين مبتدئين وأدارت لقاء الواجهات الأمامية الشهري في الاستوديو."),
      ],
      tech: [],
    },
    {
      id: "brightwell-ux",
      role: t("UX Engineer", "مهندسة تجربة مستخدم"),
      org: t("Brightwell Studio", "استوديو برايتويل"), place: t("London, United Kingdom", "لندن، المملكة المتحدة"),
      start: "2012-10", end: "2014-05",
      points: [
        t("Designed and built responsive websites for 14 clients in retail, banking and the public sector.", "صمّمت وبنت مواقع متجاوبة لـ١٤ عميلاً في قطاعات التجزئة والبنوك والقطاع العام."),
        t("Delivered 2 projects that won industry awards (see Awards).", "سلّمت مشروعين فازا بجوائز في القطاع (انظر الجوائز)."),
      ],
      tech: [],
    },
    {
      id: "northbridge-ra",
      role: t("Research Assistant (part-time)", "مساعدة باحث (دوام جزئي)"),
      org: t("University of Northbridge, Interaction Lab", "جامعة نورثبريدج، مختبر التفاعل"), place: t("Northbridge, United Kingdom", "نورثبريدج، المملكة المتحدة"),
      start: "2012-01", end: "2012-09",
      points: [
        t("Ran 30 usability sessions for a study on bilingual navigation menus and co-authored a technical report.", "أدارت ٣٠ جلسة لاختبار قابلية الاستخدام ضمن دراسة عن قوائم التنقل ثنائية اللغة، وشاركت في تأليف تقرير تقني."),
      ],
      tech: [],
    },
    {
      id: "mirqab-junior",
      role: t("Junior Web Developer", "مطوّرة ويب مبتدئة"),
      org: t("Mirqab Digital Agency", "وكالة مرقاب الرقمية"), place: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2010-07", end: "2011-08",
      points: [
        t("Built more than 20 websites in HTML, CSS, jQuery and PHP for local businesses and event organizers.", "بنت أكثر من ٢٠ موقعاً باستخدام HTML وCSS وjQuery وPHP لشركات محلية ومنظّمي فعاليات."),
      ],
      tech: [],
    },
    {
      id: "freelance",
      role: t("Freelance Graphic and Web Designer (part-time)", "مصممة جرافيك وويب مستقلة (دوام جزئي)"),
      org: t("Self-employed", "عمل حر"), place: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2008-09", end: "2010-06",
      points: [
        t("Designed logos, printed material and websites for 35 clients while at university.", "صمّمت شعارات ومطبوعات ومواقع لـ٣٥ عميلاً أثناء دراستها الجامعية."),
      ],
      tech: [],
    },
  ],

  // The 8 selected projects. `metrics` drive the ledger and the before/after slider.
  // units: "percent" (0–100), "minutes", "count", "deltaPercent" (signed change).
  projects: [
    {
      slug: "mizan",
      name: t("Mizan Design System", "نظام التصميم «ميزان»"),
      org: t("Faseela Ventures", "فسيلة فنتشرز"), start: "2023-10", end: "2025-06",
      role: t("Lead designer and engineer", "المصممة والمهندسة الرئيسية"), team: 6,
      problem: t("9 product teams built the same interface parts in different ways, with 4 button styles and 11 shades of green.", "تسعة فرق منتجات تبني أجزاء الواجهة نفسها بطرق مختلفة، بأربعة أنماط للأزرار و١١ درجة من اللون الأخضر."),
      action: t("Audited 1,300 screens, defined design tokens, and built and documented the components in Figma and code.", "راجعت ١٬٣٠٠ شاشة، وعرّفت رموز التصميم (design tokens)، وبنت المكوّنات ووثّقتها في Figma وفي الكود."),
      result: t("180 components, 38% faster UI build time, and 96% of screens meeting WCAG 2.2 AA.", "١٨٠ مكوّناً، وبناء أسرع للواجهات بنسبة ٣٨٪، و٩٦٪ من الشاشات متوافقة مع WCAG 2.2 AA."),
      tech: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Figma tokens"],
      metrics: [{ label: t("Screens meeting WCAG 2.2 AA", "الشاشات المتوافقة مع WCAG 2.2 AA"), from: 41, to: 96, unit: "percent" }],
      related: { awards: ["gulf-design-2025"], talks: ["najd-2025"], patents: ["bilingual-theming"] },
    },
    {
      slug: "telemedicine",
      name: t("National Telemedicine Platform", "منصة الطب الاتصالي الوطنية"),
      org: t("Zayna Health Tech", "زينة للتقنية الصحية"), start: "2021-05", end: "2022-12",
      role: t("Product engineering lead", "قائدة هندسة المنتج"), team: 31,
      problem: t("Patients waited an average of 22 minutes for a video consultation, and 1 in 5 calls dropped.", "كان المرضى ينتظرون ٢٢ دقيقة في المتوسط لبدء الاستشارة المرئية، وكانت مكالمة من كل خمس تنقطع."),
      action: t("Led the redesign of the patient queue, the doctor console and the video layer.", "قادت إعادة تصميم طابور المرضى ولوحة الطبيب وطبقة الفيديو."),
      result: t("3.1 million consultations in 2022; average wait fell from 22 to 6 minutes and dropped calls from 20% to 3%.", "٣٫١ مليون استشارة في ٢٠٢٢، وانخفض متوسط الانتظار من ٢٢ إلى ٦ دقائق، والمكالمات المنقطعة من ٢٠٪ إلى ٣٪."),
      tech: ["React", "React Native", "WebRTC", "Node.js", "Google Cloud"],
      metrics: [
        { label: t("Average wait for a consultation (minutes)", "متوسط انتظار الاستشارة (بالدقائق)"), from: 22, to: 6, unit: "minutes" },
        { label: t("Calls that dropped", "المكالمات المنقطعة"), from: 20, to: 3, unit: "percent" },
      ],
      related: { awards: ["health-2021"], talks: ["telemedicine-2021"] },
    },
    {
      slug: "savings-goals",
      name: t("Savings Goals", "ميزة «أهداف الادخار»"),
      org: t("Faseela Ventures", "فسيلة فنتشرز"), start: "2024-01", end: "2024-08",
      role: t("Research and design lead", "قائدة البحث والتصميم"), team: 8,
      problem: t("70% of users had never saved money inside the app.", "٧٠٪ من المستخدمين لم يدّخروا أي مبلغ داخل التطبيق من قبل."),
      action: t("Ran 48 interviews in 5 cities, tested 3 prototypes and designed the final goal-setting flow.", "أجرت ٤٨ مقابلة في ٥ مدن، واختبرت ٣ نماذج أولية، وصمّمت مسار تحديد الأهداف النهائي."),
      result: t("610,000 goals opened in 6 months, with an average of SAR 2,300 saved per goal; won Best Fintech Experience 2024.", "٦١٠٬٠٠٠ هدف فُتح خلال ٦ أشهر، بمتوسط ادخار ٢٬٣٠٠ ريال لكل هدف، وفازت بجائزة أفضل تجربة في التقنية المالية ٢٠٢٤."),
      tech: ["React Native", "GraphQL", "Figma"],
      metrics: [{ label: t("Goals opened in the first 6 months", "أهداف فُتحت في الأشهر الستة الأولى"), to: 610000, unit: "count" }],
      related: { awards: ["fintech-2024"], talks: ["fintech-panel-2024"], media: ["medium-2023"] },
    },
    {
      slug: "qalam-editor",
      name: t("Qalam Learn Code Editor", "محرّر الأكواد في «قلم»"),
      org: t("Qalam Learn", "قلم للتعلّم"), start: "2019-02", end: "2021-04",
      role: t("Co-founder, design and front-end", "شريكة مؤسِّسة، التصميم والواجهات الأمامية"), team: 4,
      problem: t("Learners quit when English error messages stopped their code.", "كان المتعلّمون ينسحبون حين تُوقف رسائلُ الخطأ الإنجليزية الكودَ الذي يكتبونه."),
      action: t("Built a browser code editor that explains errors in plain Arabic and suggests the next step.", "بنت محرّر أكواد يعمل في المتصفح، يشرح الأخطاء بلغة عربية بسيطة ويقترح الخطوة التالية."),
      result: t("Course completion rose from 18% to 46%.", "ارتفعت نسبة إكمال الدورات من ١٨٪ إلى ٤٦٪."),
      tech: ["Vue", "TypeScript", "Monaco Editor", "Firebase"],
      metrics: [{ label: t("Course completion", "نسبة إكمال الدورات"), from: 18, to: 46, unit: "percent" }],
      related: { publications: ["teaching-arabic-2019"] },
    },
    {
      slug: "khatt",
      name: t("Khatt Adaptive Typography Engine", "محرّك «خط» للطباعة التكيّفية"),
      org: t("PhD research, Eastmoor Institute of Technology", "بحث الدكتوراه، معهد إيستمور للتقنية"), start: "2019-09", end: "2022-07",
      role: t("Researcher and sole developer", "باحثة ومطوّرة منفردة"), team: 1,
      problem: t("Arabic text on screens is often too small, too dense and hard to scan.", "النص العربي على الشاشات غالباً صغير جداً وكثيف جداً ويصعب تصفّحه."),
      action: t("Built an engine that adjusts Arabic font size, spacing and line length to the reader and the screen, then tested it with 312 participants.", "بنت محرّكاً يضبط حجم الخط العربي والمسافات وطول السطر بحسب القارئ والشاشة، ثم اختبرته مع ٣١٢ مشاركاً."),
      result: t("Reading speed rose by 19% and errors fell by 31%; the method was granted a patent in Jun 2024.", "ارتفعت سرعة القراءة بنسبة ١٩٪ وانخفضت الأخطاء بنسبة ٣١٪، ومُنحت الطريقة براءة اختراع في يونيو ٢٠٢٤."),
      tech: ["TypeScript", "Canvas API", "Python"],
      metrics: [
        { label: t("Reading errors, 312 readers", "أخطاء القراءة لدى ٣١٢ قارئاً"), to: -31, unit: "deltaPercent" },
        { label: t("Reading speed", "سرعة القراءة"), to: 19, unit: "deltaPercent" },
      ],
      related: { awards: ["thesis-2022"], patents: ["adaptive-arabic"], publications: ["adaptive-2022", "comfort-2020"], talks: ["majlis-2022"] },
    },
    {
      slug: "hirfa-ui",
      name: t("Hirfa UI (open source)", "مكتبة «حرفة» (مفتوحة المصدر)"),
      org: t("Founder and lead maintainer", "المؤسِّسة والمشرفة الرئيسية"), start: "2020-03", end: null,
      role: t("Founder and lead maintainer", "المؤسِّسة والمشرفة الرئيسية"), team: null, contributors: 210,
      url: "https://github.example/yara-mansouri",
      problem: t("Popular component libraries handled right-to-left layouts poorly.", "كانت مكتبات المكوّنات الشائعة تتعامل بشكل ضعيف مع التخطيطات من اليمين إلى اليسار."),
      action: t("Designed and built 95 components with mirrored layouts, Arabic typography presets and full keyboard support.", "صمّمت وبنت ٩٥ مكوّناً بتخطيطات معكوسة وإعدادات جاهزة للطباعة العربية ودعم كامل للوحة المفاتيح."),
      result: t("9,800 GitHub stars and 1.2 million npm downloads a year; won the Open Source Impact Award 2022.", "٩٬٨٠٠ نجمة على GitHub و١٫٢ مليون تنزيل سنوياً عبر npm، وفازت بجائزة أثر المصادر المفتوحة ٢٠٢٢."),
      tech: ["React", "TypeScript", "CSS logical properties", "Storybook"],
      metrics: [{ label: t("GitHub stars", "نجمة على GitHub"), to: 9800, unit: "count" }],
      related: { awards: ["open-source-2022"], publications: ["rtl-scale-2020"], media: ["youtube"] },
    },
    {
      slug: "dalil",
      name: t("Dalil Accessibility Toolkit", "أداة «دليل» لإمكانية الوصول"),
      org: t("Side project", "مشروع جانبي"), start: "2022-01", end: "2022-09",
      role: t("Designer and developer", "مصممة ومطوّرة"), team: 1,
      problem: t("Accessibility checkers missed issues specific to Arabic and right-to-left pages.", "كانت أدوات فحص إمكانية الوصول تُغفل مشكلات خاصة بالصفحات العربية والصفحات من اليمين إلى اليسار."),
      action: t("Built a browser extension that flags 42 Arabic-specific accessibility issues and explains how to fix each one.", "بنت إضافة للمتصفح ترصد ٤٢ مشكلة في إمكانية الوصول خاصة بالعربية، وتشرح طريقة إصلاح كل منها."),
      result: t("Used by 3,400 developers in 22 countries.", "يستخدمها ٣٬٤٠٠ مطوّر في ٢٢ دولة."),
      tech: ["JavaScript", "Chrome Extensions API", "axe-core"],
      metrics: [{ label: t("Developers using it, in 22 countries", "مطوّر يستخدمونها في ٢٢ دولة"), to: 3400, unit: "count" }],
      related: { talks: ["gdw-2025"] },
    },
    {
      slug: "rafeeq",
      name: t("Rafeeq Rides Matching App", "تطبيق «رفيق» لمشاركة الرحلات"),
      org: t("Rafeeq Rides", "رفيق"), start: "2015-04", end: "2016-12",
      role: t("Co-founder and CTO", "شريكة مؤسِّسة ورئيسة تقنية"), team: 11,
      problem: t("University students had few safe and affordable ways to commute.", "كان أمام طلاب الجامعات خيارات قليلة للتنقل الآمن بتكلفة مناسبة."),
      action: t("Designed the matching system that paired riders by campus, timetable and route.", "صمّمت نظام المطابقة الذي يجمع الركاب حسب الحرم الجامعي والجدول الدراسي والمسار."),
      result: t("26,000 sign-ups and 140,000 rides before the company closed in Dec 2016.", "٢٦٬٠٠٠ تسجيل و١٤٠٬٠٠٠ رحلة قبل إغلاق الشركة في ديسمبر ٢٠١٦."),
      tech: ["React Native", "Node.js", "MongoDB", "Google Maps APIs"],
      metrics: [{ label: t("Rides before the company closed", "رحلة قبل إغلاق الشركة"), to: 140000, unit: "count" }],
      related: { talks: ["founders-2016"], media: ["podcast-2024"] },
    },
  ],

  education: [
    {
      degree: t("PhD in Human-Computer Interaction", "دكتوراه في التفاعل بين الإنسان والحاسوب"),
      school: t("Eastmoor Institute of Technology", "معهد إيستمور للتقنية"), mode: t("Part-time, remote", "دوام جزئي، عن بُعد"),
      start: "2018-09", end: "2022-07",
      details: [
        t("Thesis: “Adaptive Typography for Arabic Interfaces: Readability, Density and Trust”", "الأطروحة: «الطباعة التكيّفية للواجهات العربية: سهولة القراءة والكثافة والثقة»"),
        t("Best Doctoral Thesis in HCI, 2022", "جائزة أفضل أطروحة دكتوراه في التفاعل بين الإنسان والحاسوب، ٢٠٢٢"),
      ],
    },
    {
      degree: t("Executive Certificate in Technology Leadership", "الشهادة التنفيذية في القيادة التقنية"),
      school: t("Eastmoor Business School", "كلية إيستمور للأعمال"), mode: t("Online", "عن بُعد"),
      start: "2021-01", end: "2021-06",
      details: [t("6-month program completed while working full-time", "برنامج مدته ٦ أشهر أُنجز بالتوازي مع العمل بدوام كامل")],
    },
    {
      degree: t("MSc in Interaction Design, with Distinction", "ماجستير في تصميم التفاعل، بامتياز"),
      school: t("University of Northbridge", "جامعة نورثبريدج"), mode: t("Northbridge, United Kingdom", "نورثبريدج، المملكة المتحدة"),
      start: "2011-09", end: "2012-09",
      details: [
        t("Dissertation: “Bilingual Navigation Menus on Small Screens”", "الرسالة: «قوائم التنقل ثنائية اللغة على الشاشات الصغيرة»"),
        t("Full scholarship", "منحة دراسية كاملة"),
      ],
    },
    {
      degree: t("BSc in Computer Science, First Class Honours", "بكالوريوس علوم الحاسب، مرتبة الشرف الأولى"),
      school: t("Najd Valley University", "جامعة وادي نجد"), mode: t("Riyadh, Saudi Arabia", "الرياض، السعودية"),
      start: "2006-09", end: "2010-06",
      details: [
        t("GPA: 4.81 / 5.00", "المعدل: ٤٫٨١ من ٥٫٠٠"),
        t("Exchange semester: Lindenhall University, Germany, Feb 2009 – Jul 2009", "فصل تبادل: جامعة ليندنهول، ألمانيا، فبراير–يوليو ٢٠٠٩"),
        t("Best Graduation Project, 2010", "جائزة أفضل مشروع تخرج، ٢٠١٠"),
      ],
    },
  ],

  // 19 earned + 1 in progress. Names, issuers and IDs stay in English in both languages.
  certificationsNote: t("All issuers and credential IDs are fictional.", "جميع الجهات المانحة وأرقام الاعتماد افتراضية."),
  certifications: [
    { name: "Certified Security Architecture Professional (CSAP)", issuer: "Global Cyber Assurance Council", status: "inProgress", note: t("Exam booked for Dec 2026", "الاختبار محجوز في ديسمبر ٢٠٢٦") },
    { name: "Certified Cloud Solutions Architect – Professional", issuer: "Cloud Architecture Guild", year: 2025, status: "active", id: "CAG-CSA-25-0912" },
    { name: "Certified Design Leader", issuer: "Arabian Design Council", year: 2025, status: "active", id: "ADC-CDL-25-0044" },
    { name: "Multi-Cloud Platform Architect", issuer: "Halcyon Cloud Institute", year: 2024, status: "active", id: "HLC-MPA-24-3307" },
    { name: "Certified Container Application Developer", issuer: "Open Container Academy", year: 2024, status: "active", id: "OCA-CAD-24-1185" },
    { name: "Open Banking Product Specialist", issuer: "Gulf FinTech Academy", year: 2024, status: "active", id: "GFA-OBP-24-0219" },
    { name: "Certified Project Leadership Professional", issuer: "International Project Leadership Society", year: 2023, status: "active", id: "IPLS-CPL-23-5560" },
    { name: "Certified Accessibility Specialist", issuer: "Inclusive Interfaces Council", year: 2023, status: "active", id: "IIC-CAS-23-0471" },
    { name: "Applied Data Visualization Certificate", issuer: "Riyadh Data Institute", year: 2023, status: "lifetime", id: "RDI-ADV-23-0118" },
    { name: "UX Research and Interaction Design Certificate", issuer: "Meridian UX Institute", year: 2022, status: "lifetime", id: "MUI-UXR-22-8842" },
    { name: "Enterprise Architecture Practitioner", issuer: "Global Enterprise Architecture Forum", year: 2022, status: "active", id: "GEAF-EAP-22-0193" },
    { name: "Certified Agile Product Owner", issuer: "Agile Practice Council", year: 2022, status: "expired", expired: 2024, id: "APC-APO-22-6620" },
    { name: "Professional Scrum Facilitator, Level 1", issuer: "Agile Delivery Institute", year: 2021, status: "lifetime", id: "ADI-PSF-21-4410" },
    { name: "Cloud Application Developer – Associate", issuer: "Skyline Developer Program", year: 2021, status: "expired", expired: 2023, id: "SDP-CAD-21-2075" },
    { name: "IT Service Management Foundation", issuer: "Service Excellence Board", year: 2020, status: "lifetime", id: "SEB-ITSM-20-9931" },
    { name: "Health Data Privacy Practitioner", issuer: "Middle East Health Informatics Board", year: 2020, status: "active", id: "MEHIB-HDP-20-0306" },
    { name: "Lean Six Sigma Green Belt", issuer: "Institute for Process Excellence", year: 2019, status: "lifetime", id: "IPE-LSS-19-1402" },
    { name: "Security Fundamentals Professional", issuer: "Cyber Readiness Academy", year: 2019, status: "expired", expired: 2022, id: "CRA-SFP-19-7718" },
    { name: "Usability Analysis Professional", issuer: "Usability Practice Institute", year: 2016, status: "lifetime", id: "UPI-UAP-16-0268" },
    { name: "Advanced Motion Design for Interfaces", issuer: "London School of Interface Craft", year: 2014, status: "lifetime", id: "LSIC-MD-14-0052" },
  ],

  awards: [
    { id: "gulf-design-2025", name: t("Design Technology Leader of the Year", "قائدة تقنيات التصميم لهذا العام"), by: t("Gulf Design Week Awards", "جوائز أسبوع الخليج للتصميم"), year: 2025, for: t("For the Mizan Design System", "عن نظام التصميم «ميزان»"), project: "mizan" },
    { id: "fintech-2024", name: t("Best Fintech Experience", "أفضل تجربة في التقنية المالية"), by: t("Arab Fintech Excellence Awards", "جوائز التميّز العربي في التقنية المالية"), year: 2024, for: t("For Savings Goals", "عن ميزة «أهداف الادخار»"), project: "savings-goals" },
    { id: "top40-2023", name: t("Top 40 Under 40 in Saudi Tech", "أبرز ٤٠ شخصية دون الأربعين في التقنية السعودية"), by: t("Riyadh Tech Review", "مجلة رياض تك ريفيو"), year: 2023, for: t("For career achievement", "عن مسيرتها المهنية") },
    { id: "thesis-2022", name: t("Best Doctoral Thesis in HCI", "أفضل أطروحة دكتوراه في التفاعل بين الإنسان والحاسوب"), by: t("Eastmoor Institute of Technology", "معهد إيستمور للتقنية"), year: 2022, for: t("For the PhD thesis", "عن أطروحة الدكتوراه"), project: "khatt" },
    { id: "open-source-2022", name: t("Open Source Impact Award", "جائزة أثر المصادر المفتوحة"), by: t("Arab Open Source Foundation", "المؤسسة العربية للمصادر المفتوحة"), year: 2022, for: t("For Hirfa UI", "عن مكتبة «حرفة»"), project: "hirfa-ui" },
    { id: "health-2021", name: t("Digital Health Innovation Award", "جائزة الابتكار في الصحة الرقمية"), by: t("Middle East Health Informatics Board", "مجلس المعلوماتية الصحية في الشرق الأوسط"), year: 2021, for: t("For the telemedicine platform", "عن منصة الطب الاتصالي"), project: "telemedicine" },
    { id: "women-tech-2020", name: t("Women in Tech Leadership Award", "جائزة قيادة المرأة في التقنية"), by: t("Saudi Women in Design Network", "شبكة السعوديات في التصميم"), year: 2020, for: t("For leadership at Zayna Health Tech", "عن قيادتها في زينة للتقنية الصحية") },
    { id: "web-craft-2014", name: t("Silver, Responsive Design category", "الفضية، فئة التصميم المتجاوب"), by: t("London Web Craft Awards", "جوائز لندن لحرفة الويب"), year: 2014, for: t("For a retail client website at Brightwell Studio", "عن موقع عميل في قطاع التجزئة في استوديو برايتويل") },
    { id: "rising-star-2013", name: t("Rising Star in UX", "النجمة الصاعدة في تجربة المستخدم"), by: t("UK Interaction Design Guild", "نقابة تصميم التفاعل في المملكة المتحدة"), year: 2013, for: t("For a public-sector client website at Brightwell Studio", "عن موقع عميل من القطاع العام في استوديو برايتويل") },
    { id: "grad-2010", name: t("Best Graduation Project", "أفضل مشروع تخرج"), by: t("Najd Valley University", "جامعة وادي نجد"), year: 2010, for: t("For an Arabic speech-to-text note-taking app", "عن تطبيق لتدوين الملاحظات بتحويل الكلام العربي إلى نص") },
  ],

  patents: [
    { id: "adaptive-arabic", title: t("Method for adaptive Arabic text rendering based on reading context", "طريقة لعرض النص العربي تكيّفياً بحسب سياق القراءة"), number: t("Patent No. SA 11223 (fictional)", "براءة رقم SA 11223 (افتراضية)"), status: t("Granted Jun 2024", "مُنحت في يونيو ٢٠٢٤") },
    { id: "bilingual-theming", title: t("System for bilingual component theming in design systems", "نظام لتنسيق سمات المكوّنات ثنائية اللغة في أنظمة التصميم"), number: t("Application No. SA 2025-0417 (fictional)", "طلب رقم SA 2025-0417 (افتراضي)"), status: t("Filed Mar 2025, pending", "قُدّم في مارس ٢٠٢٥، قيد الدراسة") },
  ],

  // Citations stay in their original language.
  publicationsTotal: 9,
  publications: [
    { id: "adaptive-2022", citation: "Al-Mansouri, Y., & Marsh, H. (2022). Adaptive typography for Arabic interfaces: A study with 312 readers. Journal of Human-Centred Computing, 14(3), 211–238." },
    { id: "trust-2021", citation: "Al-Mansouri, Y. (2021). Trust signals in Arabic health apps. Proceedings of the International Conference on Arabic Interfaces (ICAI 2021), 45–56." },
    { id: "rtl-scale-2020", citation: "Al-Mansouri, Y., Rahman, S., & Okafor, T. (2020). Right-to-left design systems at scale. Proceedings of DesignOps Summit Asia 2020, 12–19." },
    { id: "comfort-2020", citation: "Al-Mansouri, Y., & Marsh, H. (2020). Measuring reading comfort on small screens. ICAI 2020 Workshop on Arabic Typography, 8–13." },
    { id: "teaching-arabic-2019", citation: "Al-Mansouri, Y. (2019). Teaching front-end development in Arabic: Lessons from 50,000 learners. Gulf Journal of Computing Education, 7(1), 33–49." },
    { id: "bilingual-menus-2012", citation: "Hart, L., & Al-Mansouri, Y. (2012). Bilingual navigation menus on small screens. Northbridge Interaction Lab Technical Report NIL-TR-2012-07." },
  ],

  talksTotal: 31,
  talks: [
    { id: "najd-2025", kind: "keynote", title: t("Design systems that speak two languages", "أنظمة تصميم تتحدث لغتين"), event: "Najd Developer Days 2025", city: t("Riyadh", "الرياض"), year: 2025 },
    { id: "gdw-2025", kind: "talk", title: t("Accessibility is a product decision", "إمكانية الوصول قرار يخص المنتج"), event: "Gulf Design Week 2025", city: t("Dubai", "دبي"), year: 2025 },
    { id: "fintech-panel-2024", kind: "panel", title: t("Building trust in fintech UX", "بناء الثقة في تجربة مستخدم التقنية المالية"), event: "Gulf Fintech Builders Forum 2024", city: t("Riyadh", "الرياض"), year: 2024 },
    { id: "scaling-2023", kind: "talk", title: t("Scaling a team from 6 to 64", "توسيع فريق من ٦ إلى ٦٤"), event: "Engineering Leadership Week 2023", city: t("Cairo", "القاهرة"), year: 2023 },
    { id: "majlis-2022", kind: "talk", title: t("What my PhD taught me about Arabic type", "ما علّمتني إياه الدكتوراه عن الحرف العربي"), event: "Typography Majlis 2022", city: t("Jeddah", "جدة"), year: 2022 },
    { id: "telemedicine-2021", kind: "keynote", title: t("Telemedicine at national scale", "الطب الاتصالي على المستوى الوطني"), event: "Digital Health Middle East Summit 2021", city: t("Online", "عن بُعد"), year: 2021 },
    { id: "founders-2016", kind: "talk", title: t("Why our startup failed", "لماذا فشلت شركتنا الناشئة"), event: "Founders Night Riyadh 2016", city: t("Riyadh", "الرياض"), year: 2016 },
    { id: "frontend-2014", kind: "talk", title: t("Responsive design for right-to-left", "التصميم المتجاوب للواجهات من اليمين إلى اليسار"), event: "Frontend Horizons London 2014", city: t("London", "لندن"), year: 2014 },
  ],

  media: [
    { id: "cover-2023", kind: t("Cover story", "قصة غلاف"), title: t("The engineer who designs in two directions", "المهندسة التي تصمّم في اتجاهين"), outlet: "Riyadh Tech Review", date: "2023-03" },
    { id: "podcast-2024", kind: t("Podcast guest", "ضيفة بودكاست"), title: t("From startup failure to Principal Engineer", "من فشل شركة ناشئة إلى مهندسة رئيسية"), outlet: "Build in Arabic, Episode 42", date: "2024-06" },
    { id: "youtube", kind: t("YouTube channel", "قناة يوتيوب"), title: t("Yara Builds", "Yara Builds"), outlet: "YouTube", date: "2020", ongoing: true, detail: t("86 tutorials on design systems and right-to-left front-end, 48,000 subscribers", "٨٦ درساً عن أنظمة التصميم والواجهات الأمامية من اليمين إلى اليسار، و٤٨٬٠٠٠ مشترك"), url: "https://youtube.example/@YaraBuilds" },
    { id: "medium-2023", kind: t("Article", "مقال"), title: t("Accessibility debt in fintech", "ديون إمكانية الوصول في التقنية المالية"), outlet: "Medium", date: "2023-11", detail: t("Read 120,000 times", "قُرئ ١٢٠٬٠٠٠ مرة") },
  ],

  givingBackNote: t("Held alongside the full-time roles above.", "بالتوازي مع الأدوار بدوام كامل."),
  givingBack: [
    { role: t("Adjunct Lecturer (part-time)", "محاضرة متعاونة (دوام جزئي)"), org: t("College of Computing, Najd Valley University", "كلية الحوسبة، جامعة وادي نجد"), start: "2019-09", end: "2024-06", detail: t("Taught Human-Computer Interaction, Front-End Development and Design Systems to 1,400+ students over 10 semesters", "درّست التفاعل بين الإنسان والحاسوب وتطوير الواجهات الأمامية وأنظمة التصميم لأكثر من ١٬٤٠٠ طالب خلال ١٠ فصول دراسية") },
    { role: t("Advisory Board Member", "عضوة المجلس الاستشاري"), org: t("Saudi Women in Design Network", "شبكة السعوديات في التصميم"), start: "2022-03", end: null, detail: t("Runs the annual mentorship program for 60 early-career designers", "تدير برنامج الإرشاد السنوي لـ٦٠ مصممة ومصمماً في بداية مسيرتهم") },
    { role: t("Technical Advisor", "مستشارة تقنية"), org: t("2 early-stage health-tech startups", "شركتان ناشئتان في التقنية الصحية"), start: "2024-02", end: null, detail: t("Advises on product strategy, hiring and architecture", "تقدّم المشورة في استراتيجية المنتج والتوظيف والبنية التقنية") },
    { role: t("Mentor", "مرشدة"), org: t("Najd Valley Startup Accelerator", "مسرّعة وادي نجد للشركات الناشئة"), start: "2020-01", end: null, detail: t("Mentored 25 startups across 6 cohorts", "أرشدت ٢٥ شركة ناشئة عبر ٦ دفعات") },
    { role: t("Hackathon Judge", "محكّمة هاكاثونات"), org: t("Various organizers", "جهات منظِّمة متعددة"), start: "2018-01", end: null, detail: t("Judged 12 hackathons in Riyadh, Jeddah and Dubai", "حكّمت ١٢ هاكاثوناً في الرياض وجدة ودبي") },
    { role: t("Volunteer Instructor", "مدرّبة متطوعة"), org: t("Code for Community, Riyadh", "Code for Community، الرياض"), start: "2017-01", end: "2017-06", detail: t("Taught a 12-week web development course to 45 adult learners", "درّست دورة في تطوير الويب مدتها ١٢ أسبوعاً لـ٤٥ متعلّماً بالغاً") },
  ],

  languages: [
    { name: t("Arabic", "العربية"), level: t("Native", "اللغة الأم") },
    { name: t("English", "الإنجليزية"), level: t("Fluent (C2), IELTS 8.5", "طلاقة (C2)، IELTS 8.5") },
    { name: t("French", "الفرنسية"), level: t("Upper intermediate (B2), DELF B2", "فوق المتوسط (B2)، DELF B2") },
    { name: t("German", "الألمانية"), level: t("Elementary (A2), from the exchange semester", "أساسي (A2)، من فصل التبادل") },
    { name: t("Turkish", "التركية"), level: t("Beginner (A1), currently learning", "مبتدئ (A1)، تتعلّمها حالياً") },
  ],

  interests: [
    t("Arabic calligraphy, with work shown in 2 group exhibitions", "الخط العربي، وعُرضت أعمالها في معرضين جماعيين"),
    t("Long-distance running: 3 half marathons", "الجري لمسافات طويلة: ٣ أنصاف ماراثون"),
    t("Restoring old film cameras", "ترميم كاميرات الأفلام القديمة"),
    t("Chess, with an online rating of 1,850", "الشطرنج، بتصنيف ١٬٨٥٠ على الإنترنت"),
  ],
};

// Lookup helpers used by the case-study pages.
export const byId = (list, id) => list.find((x) => x.id === id);
export const projectBySlug = (slug) => cv.projects.find((p) => p.slug === slug);
