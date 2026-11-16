// Yara's room: the intro words and everything she says about the things in it.
// Every fact here comes from the CV. `npm run check:cv` checks that each number
// in these captions also appears in data/cv.js.
const t = (en, ar) => ({ en, ar });

export const intro = {
  hello: t("Hello! I’m", "أهلاً! أنا"),
  name: t("Yara Al-Mansouri", "يارا المنصوري"),
  family: "Al-Mansouri",
  lede: t(
    "This is my room: my desk, the certificates on my wall and the medals on my shelves. Come in and look around.",
    "هذه غرفتي: مكتبي، والشهادات على الجدار، والميداليات على الرفوف. ادخل وتجوّل فيها."
  ),
  explore: t("Explore my room", "تجوّل في غرفتي"),
  badgeTap: t("Tap to come in", "اضغط لتدخل"),
  badgeHint: t("That’s my badge. Swing it, or tap it to come into my room.", "هذه بطاقتي. أرجحها، أو اضغط عليها لتدخل غرفتي."),
  skip: t("Skip the tour and go straight to my portfolio", "تخطَّ الجولة وانتقل مباشرة إلى معرض أعمالي"),
  langSwitch: t("العربية", "English"),
  langSwitchLabel: t("اقرأ بالعربية", "Read in English"),
};

export const badge = {
  org: t("Faseela Ventures", "فسيلة فنتشرز"),
  role: t("Principal Product Engineer", "مهندسة منتجات رئيسية"),
  city: t("Riyadh", "الرياض"),
  degree: t("PhD, Human-Computer Interaction", "دكتوراه، التفاعل بين الإنسان والحاسوب"),
  strap: "Yara Al-Mansouri",
};

export const roomUi = {
  title: t("Yara’s room", "غرفة يارا"),
  loading: t("Opening the door", "يجري فتح الباب"),
  hint: t(
    "Make yourself at home. Drag to look around, and tap anything that catches your eye. The map in the corner knows where everything is.",
    "خذ راحتك. اسحب لتتجوّل بنظرك، واضغط على أي شيء يلفت انتباهك. والخريطة في الزاوية تعرف مكان كل شيء."
  ),
  recordStopped: t("The record is off. Tap the record player to put it back on.", "توقّفت الأسطوانة. اضغط على المشغّل لتعيد تشغيلها."),
  back: t("Step back", "عودة إلى الغرفة"),
  map: t("Map of my room", "خريطة غرفتي"),
  mapOpen: t("Open the map of my room", "افتح خريطة غرفتي"),
  mapClose: t("Close the map", "أغلق الخريطة"),
  youAreHere: t("You are here", "أنت هنا"),
  play: t("Play the record", "شغّل الأسطوانة"),
  stop: t("Stop the record", "أوقف الأسطوانة"),
  nowPlaying: t("Now playing", "يُعزف الآن"),
  track: t("a tech beat in maqam Hijaz", "إيقاع تقني على مقام الحجاز"),
  portfolio: t("My portfolio", "معرض أعمالي"),
  me: t("Yara", "يارا"),
  noWebgl: t(
    "Your browser can’t draw my room in 3D, so here is what’s in it.",
    "لا يستطيع متصفحك عرض غرفتي ثلاثية الأبعاد، فإليك ما فيها."
  ),
};

// Each spot: what Yara says, and what the buttons under her words do.
// `go` opens a section of the portfolio; `enter` flies into the monitor.
const baseSpots = [
  {
    id: "monitor",
    label: t("My portfolio", "معرض أعمالي"),
    says: t(
      "This old screen is where my portfolio lives. Tap the left half for English, the right half for Arabic.",
      "على هذه الشاشة القديمة يعيش معرض أعمالي. اضغط على النصف الأيسر للإنجليزية، والأيمن للعربية."
    ),
    actions: [{ enter: "en" }, { enter: "ar" }],
  },
  {
    id: "certificates",
    label: t("Certifications", "الشهادات المهنية"),
    says: t(
      "19 certifications, earned between 2014 and 2025. Three have expired and still hang here. The empty frame is for CSAP: the exam is booked for December 2026.",
      "١٩ شهادة مهنية بين ٢٠١٤ و٢٠٢٥. انتهت صلاحية ثلاث منها وما زالت معلّقة هنا. والإطار الفارغ لشهادة CSAP: الاختبار محجوز في ديسمبر ٢٠٢٦."
    ),
    actions: [{ go: "credentials", label: t("All my certifications", "كل شهاداتي المهنية") }],
  },
  {
    id: "degrees",
    label: t("Degrees", "الشهادات الجامعية"),
    says: t(
      "BSc in Computer Science with First Class Honours (2010), MSc in Interaction Design with Distinction (2012), an Executive Certificate in Technology Leadership (2021) and my PhD in Human-Computer Interaction (2022).",
      "بكالوريوس علوم الحاسب بمرتبة الشرف الأولى (٢٠١٠)، وماجستير تصميم التفاعل بامتياز (٢٠١٢)، والشهادة التنفيذية في القيادة التقنية (٢٠٢١)، والدكتوراه في التفاعل بين الإنسان والحاسوب (٢٠٢٢)."
    ),
    actions: [{ go: "x-edu-phd", label: t("My education", "تعليمي") }],
  },
  {
    id: "awards",
    label: t("Awards", "الجوائز"),
    says: t(
      "Ten awards. The oldest is Best Graduation Project from 2010; the newest is Design Technology Leader of the Year, 2025.",
      "عشر جوائز. أقدمها أفضل مشروع تخرج عام ٢٠١٠، وأحدثها قائدة تقنيات التصميم لهذا العام في ٢٠٢٥."
    ),
    actions: [{ go: "recognition", label: t("Awards and talks", "الجوائز والمحاضرات") }],
  },
  {
    id: "medals",
    label: t("Medals", "الميداليات"),
    says: t(
      "Three half marathons, three medals. Long-distance running is one of the things I love outside work.",
      "ثلاثة أنصاف ماراثون، وثلاث ميداليات. الجري لمسافات طويلة من الأشياء التي أحبها خارج العمل."
    ),
    actions: [{ go: "about", label: t("More about me", "المزيد عني") }],
  },
  {
    id: "patents",
    label: t("Patents", "براءات الاختراع"),
    says: t(
      "Two patents: adaptive Arabic text rendering, granted in June 2024, and bilingual component theming, filed in March 2025 and still pending.",
      "براءتا اختراع: عرض النص العربي تكيّفياً، مُنحت في يونيو ٢٠٢٤، وتنسيق سمات المكوّنات ثنائية اللغة، قُدّمت في مارس ٢٠٢٥ وما زالت قيد الدراسة."
    ),
    actions: [{ go: "research", label: t("My research", "أبحاثي") }],
  },
  {
    id: "cameras",
    label: t("Film cameras", "كاميرات الأفلام"),
    says: t("I restore old film cameras. These ones live on my shelf.", "أرمّم كاميرات الأفلام القديمة، وهذه تعيش على رفّي."),
    actions: [{ go: "about", label: t("More about me", "المزيد عني") }],
  },
  {
    id: "chess",
    label: t("Chess", "الشطرنج"),
    says: t("My online chess rating is 1,850.", "تصنيفي في الشطرنج على الإنترنت ١٬٨٥٠."),
    actions: [{ go: "about", label: t("More about me", "المزيد عني") }],
  },
  {
    id: "calligraphy",
    label: t("Calligraphy", "الخط العربي"),
    says: t(
      "My own Arabic calligraphy. My work has been shown in 2 group exhibitions.",
      "خطّي العربي بيدي. عُرضت أعمالي في معرضين جماعيين."
    ),
    actions: [{ go: "about", label: t("More about me", "المزيد عني") }],
  },
  {
    id: "books",
    label: t("Thesis and papers", "الأطروحة والأبحاث"),
    says: t(
      "My PhD thesis on adaptive typography for Arabic interfaces, next to my papers: 9 publications so far.",
      "أطروحة الدكتوراه عن الطباعة التكيّفية للواجهات العربية، وبجانبها أبحاثي: ٩ منشورات حتى الآن."
    ),
    actions: [{ go: "research", label: t("My research", "أبحاثي") }],
  },
  {
    id: "plant",
    label: t("Giving back", "العطاء"),
    says: t(
      "Alongside my full-time work I have taught 1,400+ students, mentored 25 startups and judged 12 hackathons.",
      "بالتوازي مع عملي بدوام كامل درّستُ أكثر من ١٬٤٠٠ طالب، وأرشدتُ ٢٥ شركة ناشئة، وحكّمتُ ١٢ هاكاثوناً."
    ),
    actions: [{ go: "x-give-lecturer", label: t("Giving back", "العطاء") }],
  },
  {
    id: "drive",
    label: t("My CV", "سيرتي الذاتية"),
    says: t("My CV, saved to a floppy disk for old times’ sake. It’s downloading now, as a PDF.", "سيرتي الذاتية محفوظة على قرص مرن، حنيناً إلى الأيام القديمة. يجري تنزيلها الآن بصيغة PDF."),
    actions: [{ download: true }],
  },
  {
    id: "diary",
    label: t("My diary", "دفتري"),
    says: t(
      "My diary of what went wrong, and what I did next. The misses taught me as much as the awards on that shelf.",
      "دفتري لما لم ينجح، ولما فعلته بعده. علّمتني الإخفاقات بقدر ما علّمتني الجوائز على ذلك الرف."
    ),
    actions: [{ diary: true, label: t("Open my diary", "افتح دفتري") }],
  },
  {
    id: "contact",
    label: t("Write to me", "راسلني"),
    says: t(
      "A letter on my desk, waiting for yours. Pick where you write email, and I’ll already be in the To line.",
      "رسالة على مكتبي تنتظر رسالتك. اختر أين تكتب بريدك، وستجدني في خانة المرسَل إليه."
    ),
    actions: [{ contact: true }],
  },
  {
    id: "board",
    label: t("My board", "لوحتي"),
    says: t(
      "What’s pinned up right now: the CSAP exam in December 2026, my Turkish lessons (A1, still learning) and the mentorship program I run for 60 early-career designers.",
      "ما هو معلّق الآن: اختبار CSAP في ديسمبر ٢٠٢٦، ودروس التركية (A1، ما زلت أتعلّم)، وبرنامج الإرشاد الذي أديره لـ٦٠ مصممة ومصمماً في بداية مسيرتهم."
    ),
    actions: [{ go: "about", label: t("More about me", "المزيد عني") }],
  },
  {
    id: "records",
    label: t("Record player", "مشغّل الأسطوانات"),
    says: t(
      "A tech beat built on maqam Hijaz, with an oud line over a darbuka rhythm. Tap the record player again to stop it.",
      "إيقاع تقني مبني على مقام الحجاز، مع لحن عود فوق إيقاع الدربكة. اضغط على المشغّل مرة أخرى لإيقافه."
    ),
    actions: [{ music: true }],
  },
  {
    id: "lamp",
    label: t("Desk lamp", "مصباح المكتب"),
    says: t("Day or night? The lamp decides.", "نهار أم ليل؟ المصباح يقرّر."),
    actions: [{ theme: true }],
  },
];

// What Yara says about her friends (our team) next to each thing. Light and personal;
// no new CV facts or numbers.
const friends = {
  monitor: t("Yosr clicked every button on it twice, just to be sure. Thanks, Yosr.", "ضغطت يُسر على كل زر فيه مرتين، لتتأكد فقط. شكراً يا يُسر."),
  certificates: t("Nusaybah says the empty frame is my best one, because it’s the only one that can’t expire.", "تقول نسيبة إن الإطار الفارغ أفضل شهاداتي، لأنه الوحيد الذي لا تنتهي صلاحيته."),
  degrees: t("Hiba calls me “Doctor” before I’ve even had my coffee. I allow it.", "تناديني هبة «دكتورة» قبل أن أشرب قهوتي. وأنا أسمح لها."),
  awards: t("Yosr dusts this shelf more than I do. I think she’s hoping some of it rubs off.", "تنفض يُسر الغبار عن هذا الرف أكثر مني. أظنها تأمل أن يصيبها شيء منه."),
  medals: t("Noor says she’ll run with me one day. She has been saying that for a very long time.", "تقول نور إنها ستركض معي يوماً ما. وهي تقول ذلك منذ زمن طويل."),
  patents: t("Nusaybah asked if she could patent my laugh. I told her it’s still pending.", "سألتني نسيبة إن كان بإمكانها تسجيل براءة لضحكتي. قلت لها إنها ما زالت قيد الدراسة."),
  cameras: t("Hiba always asks me to take her photo with these. Film doesn’t do retakes, Hiba.", "تطلب مني هبة دائماً أن ألتقط لها صورة بها. الفيلم لا يسمح بإعادة اللقطة يا هبة."),
  chess: t("Noor and I were playing and she won! Ugh.", "كنت ألعب مع نور وفازت عليّ! أُف."),
  calligraphy: t("Yosr says my handwriting is art. Nusaybah says that only goes for the Arabic one.", "تقول يُسر إن خطي فن. وتقول نسيبة إن هذا ينطبق على العربي فقط."),
  books: t("Noor says she read my whole thesis. Nobody believes her, and neither do I.", "قالت نور إنها قرأت أطروحتي كلها. لا أحد يصدقها، وأنا كذلك."),
  plant: t("Yosr waters the plant when I forget. The plant likes her more than me.", "تسقي يُسر النبتة حين أنسى. والنبتة تحبها أكثر مني."),
  drive: t("Noor still asks why my CV is on a floppy disk. Because it’s funnier, Noor.", "ما زالت نور تسأل لماذا سيرتي على قرص مرن. لأن ذلك أطرف يا نور."),
  diary: t("Hiba begged to read it. I said only the pages with happy endings.", "طلبت مني هبة أن تقرأه. قلت لها: الصفحات ذات النهايات السعيدة فقط."),
  contact: t("Nusaybah says write something nice. Hiba says write something funny. Do both.", "تقول نسيبة اكتب شيئاً لطيفاً. وتقول هبة اكتب شيئاً مضحكاً. افعل الاثنين."),
  board: t("Nusaybah keeps adding sticky notes to my board. They’re all reminders to eat lunch.", "تواصل نسيبة إضافة ملاحظات لاصقة إلى لوحتي. كلها تذكير بأن آكل الغداء."),
  records: t("Noor and Hiba dance to this when they think I’m not looking. I’m always looking.", "ترقص نور وهبة على هذا حين تظنان أنني لا أنظر. وأنا دائماً أنظر."),
  lamp: t("Yosr says the lamp is the only thing that gets me to bed on time.", "تقول يُسر إن المصباح هو الوحيد الذي يجعلني أنام في موعدي."),
};

export const spots = baseSpots.map((s) => ({ ...s, friend: friends[s.id] }));

// "Contact me": open a ready-to-send email to Yara in the visitor's own mail.
export const contact = {
  open: t("Contact me", "تواصل معي"),
  title: t("Write to me", "راسلني"),
  lede: t("Choose where you write email. My address will already be filled in.", "اختر أين تكتب بريدك، وسيكون عنواني مكتوباً مسبقاً."),
  subject: t("Hello Yara", "مرحباً يارا"),
  body: t("Hi Yara,\n\n", "مرحباً يارا،\n\n"),
  outlookWork: t("Outlook for work", "Outlook للعمل"),
  app: t("My mail app", "تطبيق البريد لديّ"),
  copy: t("Copy the address", "انسخ العنوان"),
  copied: t("Address copied", "نُسخ العنوان"),
  close: t("Close", "إغلاق"),
  opens: t("opens in a new tab", "يفتح في تبويب جديد"),
};

export const spotById = Object.fromEntries(spots.map((s) => [s.id, s]));
