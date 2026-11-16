// Interface text (buttons, headings, labels) in both languages.
// CV content lives in data/cv.js; this file is only the words around it.

const t = (en, ar) => ({ en, ar });

export const ui = {
  siteTitle: t("Yara Al-Mansouri | Portfolio", "يارا المنصوري | معرض الأعمال"),
  backToDesk: t("Back to my room", "العودة إلى غرفتي"),
  windowClose: t("Close window", "إغلاق النافذة"),
  windowMinimize: t("Minimise window", "تصغير النافذة"),
  windowZoom: t("Fill the screen", "ملء الشاشة"),
  windowRestore: t("Restore window size", "استعادة حجم النافذة"),
  otherLanguage: t("العربية", "English"),
  switchLanguage: t("Read this page in Arabic", "اقرأ هذه الصفحة بالإنجليزية"),
  mainNav: t("Main", "القائمة الرئيسية"),
  themeToLight: t("Switch to light mode", "التبديل إلى الوضع الفاتح"),
  themeToDark: t("Switch to dark mode", "التبديل إلى الوضع الداكن"),
  downloadCv: t("Download CV", "تحميل السيرة الذاتية"),
  emailYara: t("Email Yara", "راسل يارا"),
  present: t("Present", "حتى الآن"),

  heroLede: t(
    "I lead product teams from the first research to launch, and I still design and write code every week.",
    "أقود فرق المنتجات من البحث الأول حتى الإطلاق، وما زلت أصمّم وأكتب الكود كل أسبوع."
  ),

  nav: {
    work: t("Work", "الأعمال"),
    experience: t("Experience", "الخبرات"),
    research: t("Research", "البحث"),
    recognition: t("Recognition", "التكريم"),
    credentials: t("Certifications", "الشهادات المهنية"),
  },

  sections: {
    work: t("Selected work", "أعمال مختارة"),
    workSub: t("Eight projects, each with the number it moved.", "ثمانية مشاريع، ولكل مشروع الرقم الذي حرّكه."),
    experience: t("Experience", "الخبرات"),
    experienceSub: t("Work, study and teaching side by side. The 2017 career break is part of the story.", "العمل والدراسة والتدريس جنباً إلى جنب. الاستراحة المهنية في ٢٠١٧ جزء من القصة."),
    skills: t("Skills", "المهارات"),
    research: t("Research", "البحث"),
    patents: t("Patents", "براءات الاختراع"),
    publications: t("Publications", "المنشورات"),
    recognition: t("Recognition", "التكريم"),
    awards: t("Awards", "الجوائز"),
    talks: t("Talks and keynotes", "المحاضرات والكلمات الرئيسية"),
    media: t("Media", "الإعلام"),
    certifications: t("Certifications", "الشهادات المهنية"),
    about: t("About", "عنّي"),
    languages: t("Languages", "اللغات"),
    interests: t("Off the clock", "خارج العمل"),
  },
  timeline: {
    caption: t("Select any bar to read about it below.", "اختر أي شريط لتقرأ عنه في الأسفل."),
    scroll: t("Scroll sideways to see it all.", "مرّر أفقياً لترى كل شيء."),
    region: t("Career timeline", "الخط الزمني للمسيرة"),
    builtWith: t("Built with", "بأدوات:"),
    caseStudy: t("Read the case study", "اقرأ دراسة الحالة"),
    steps: t("Step through the timeline", "تنقّل في الخط الزمني"),
    later: t("Later", "بعدها"),
    earlier: t("Earlier", "قبلها"),
  },
  cefr: t("Level on the CEFR scale, from A1 to C2", "المستوى على مقياس CEFR من A1 إلى C2"),

  levels: {
    expert: t("Expert", "خبيرة"),
    advanced: t("Advanced", "متقدمة"),
    intermediate: t("Intermediate", "متوسطة"),
  },
  yearsOf: t("years", "سنة"),

  talkKinds: {
    keynote: t("Keynote", "كلمة رئيسية"),
    talk: t("Talk", "محاضرة"),
    panel: t("Panel", "جلسة نقاش"),
  },

  certFilter: t("Show certifications", "عرض الشهادات"),
  certStatus: {
    all: t("All", "الكل"),
    active: t("Active", "سارية"),
    lifetime: t("Lifetime", "مدى الحياة"),
    expired: t("Expired", "منتهية"),
    inProgress: t("In progress", "قيد الإنجاز"),
  },
  expiredIn: t("Expired {year}", "انتهت في {year}"),
  credentialId: t("Credential ID", "رقم الاعتماد"),

  caseStudy: {
    eyebrow: t("Case study", "دراسة حالة"),
    company: t("Where", "الجهة"),
    dates: t("When", "المدة"),
    role: t("Role", "الدور"),
    team: t("Team", "الفريق"),
    teamOf: t("{n} people", "{n} أشخاص"),
    solo: t("Solo", "عمل منفرد"),
    contributors: t("{n} contributors", "{n} مساهماً"),
    stack: t("Technologies", "التقنيات"),
    problem: t("Problem", "المشكلة"),
    action: t("Action", "ما فعلته"),
    result: t("Result", "النتيجة"),
    slider: t("Drag from before to after", "اسحب من «قبل» إلى «بعد»"),
    sliderLabel: t("Before and after", "قبل وبعد"),
    before: t("Before", "قبل"),
    after: t("After", "بعد"),
    connected: t("Connected to this project", "مرتبط بهذا المشروع"),
    next: t("Next project", "المشروع التالي"),
    allWork: t("All work", "كل الأعمال"),
    award: t("Award", "جائزة"),
    patent: t("Patent", "براءة اختراع"),
    paper: t("Paper", "ورقة علمية"),
    talk: t("Talk", "محاضرة"),
    mediaItem: t("Media", "إعلام"),
    openRepo: t("Open the repository", "افتح المستودع"),
  },

  desk: {
    heading: t("Yara Al-Mansouri, portfolio", "يارا المنصوري، معرض الأعمال"),
    loading: t("Setting up the desk", "يجري تجهيز المكتب"),
    hint: t("Click the screen: left half for English, right half for Arabic. Drag to look around.", "اضغط على الشاشة: النصف الأيسر للإنجليزية والأيمن للعربية. اسحب للتجوّل."),
    enterEn: t("Enter in English", "ادخل بالإنجليزية"),
    enterAr: t("ادخل بالعربية", "ادخل بالعربية"),
    skip: t("Skip the desk", "تخطَّ المكتب"),
    shortcuts: t("Desk shortcuts", "اختصارات المكتب"),
    tooltips: {
      screen: "English  ·  العربية",
      drive: "Download CV  ·  تحميل السيرة",
      lamp: "Light or dark  ·  فاتح أو داكن",
      plant: "Giving back  ·  العطاء",
      books: "Research  ·  البحث",
    },
  },

  footerNote: t(
    "Made for Portfolio Summit 2026. The CV and every name in it are fictional.",
    "صُمّم لقمة معارض الأعمال ٢٠٢٦. السيرة الذاتية وكل الأسماء الواردة فيها افتراضية."
  ),
  skillsHint: t("Drag the stickers around, or tap one to read about that skill.", "حرّك الملصقات كما تشاء، أو اضغط على أحدها لتقرأ عن تلك المهارة."),
  skillsTidy: t("Tidy up", "إعادة الترتيب"),
  skillsClose: t("Close", "إغلاق"),
  madeBy: t("Designed and built by our team:", "صمّمه وبناه فريقنا:"),
  forProject: t("See the project", "اعرض المشروع"),

  notFound: {
    title: t("Page not found", "الصفحة غير موجودة"),
    body: t("That address isn't part of this portfolio.", "هذا العنوان ليس جزءاً من معرض الأعمال."),
    home: t("Go to the desk", "اذهب إلى المكتب"),
  },
};
