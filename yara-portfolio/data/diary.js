// "What went wrong": Yara's diary of constraints, failed prototypes and pivots.
// Entries with `added: true` were written by our team around the CV (the brief allows
// our own touch); they never change a CV fact, and every number in them is from the CV.
// Entries with `added: false` are told entirely from the CV.
const t = (en, ar) => ({ en, ar });

export const diaryUi = {
  title: t("What went wrong", "ما الذي لم ينجح"),
  lifeCover: t("My diary of what went wrong", "دفتري لما لم ينجح"),
  projectCover: t("What went wrong on this project", "ما الذي لم ينجح في هذا المشروع"),
  open: t("Open the diary", "افتح الدفتر"),
  close: t("Close the diary", "أغلق الدفتر"),
  next: t("Next page", "الصفحة التالية"),
  prev: t("Previous page", "الصفحة السابقة"),
  page: t("Page {n} of {total}", "الصفحة {n} من {total}"),
  then: t("What I did next", "ما فعلته بعدها"),
  added: t("Added by our team", "أضافه فريقنا"),
};

// One page per project.
export const projectDiary = {
  mizan: {
    date: "2023-11",
    added: true,
    title: t("One big launch was the wrong plan", "إطلاق واحد كبير كان خطة خاطئة"),
    body: t(
      "My audit found 4 button styles and 11 shades of green across 9 teams. I planned one big switch-over for everyone, and every team lead pushed back: nobody could stop shipping for a month.",
      "وجدتُ في التدقيق ٤ أنماط للأزرار و١١ درجة من الأخضر لدى ٩ فرق. خطّطتُ لانتقال واحد كبير للجميع، فاعترض كل قادة الفرق: لا أحد يستطيع التوقف عن الإطلاق شهراً كاملاً."
    ),
    then: t(
      "We moved one team at a time, component by component, until all 9 teams had adopted Mizan.",
      "انتقلنا فريقاً فريقاً، مكوّناً بعد مكوّن، حتى تبنّت الفرق التسعة «ميزان»."
    ),
  },
  telemedicine: {
    date: "2021-07",
    added: true,
    title: t("We fixed the wrong thing first", "أصلحنا الشيء الخطأ أولاً"),
    body: t(
      "1 in 5 video calls dropped. Our first fix touched only the video layer, and the number barely moved. Patients were leaving the waiting screen and losing their place in the queue.",
      "كانت مكالمة من كل ٥ تنقطع. أصلحنا طبقة الفيديو وحدها أولاً، فلم يتغيّر الرقم تقريباً. كان المرضى يغادرون شاشة الانتظار فيفقدون دورهم."
    ),
    then: t(
      "We redesigned the queue, the doctor console and the video layer together. Dropped calls fell from 20% to 3%.",
      "أعدنا تصميم طابور الانتظار ولوحة الطبيب وطبقة الفيديو معاً، فانخفضت المكالمات المنقطعة من ٢٠٪ إلى ٣٪."
    ),
  },
  "savings-goals": {
    date: "2024-03",
    added: true,
    title: t("Two prototypes nobody wanted", "نموذجان لم يرغب فيهما أحد"),
    body: t(
      "We tested 3 prototypes in 5 cities. The first two asked people to choose an amount before anything else, and most of them closed the screen.",
      "اختبرنا ٣ نماذج أولية في ٥ مدن. أول نموذجين طلبا من الناس اختيار مبلغ قبل أي شيء، فأغلق معظمهم الشاشة."
    ),
    then: t(
      "The third started with what people were saving for. 610,000 goals were opened in 6 months.",
      "بدأ النموذج الثالث بما يدّخر الناس من أجله، فافتُتح ٦١٠٬٠٠٠ هدف خلال ٦ أشهر."
    ),
  },
  "qalam-editor": {
    date: "2019-06",
    added: true,
    title: t("Translation wasn’t enough", "الترجمة لم تكن كافية"),
    body: t(
      "Learners quit when English error messages stopped their code. My first fix translated the messages word for word. They were still confusing, just in Arabic.",
      "كان المتعلّمون يتركون الدرس حين توقف رسائل الخطأ الإنجليزية الكود. ترجمتُ الرسائل حرفياً في البداية، فبقيت مربكة، لكن بالعربية."
    ),
    then: t(
      "The editor now explains each error in plain Arabic and suggests the next step. Course completion rose from 18% to 46%.",
      "صار المحرّر يشرح كل خطأ بعربية واضحة ويقترح الخطوة التالية، فارتفع إكمال الدورات من ١٨٪ إلى ٤٦٪."
    ),
  },
  khatt: {
    date: "2020-05",
    added: true,
    title: t("Bigger text alone made it worse", "تكبير الخط وحده زاد الأمر سوءاً"),
    body: t(
      "My first engine changed only the font size. Pages got longer, and readers lost their place every time the layout jumped.",
      "غيّر أول إصدار من المحرّك حجم الخط فقط، فطالت الصفحات وضاع القرّاء كلما قفز التخطيط."
    ),
    then: t(
      "Now size, spacing and line length change together. In the study with 312 participants, reading speed rose by 19%.",
      "صار الحجم والتباعد وطول السطر تتغيّر معاً، وفي الدراسة مع ٣١٢ مشاركاً ارتفعت سرعة القراءة بنسبة ١٩٪."
    ),
  },
  "hirfa-ui": {
    date: "2020-06",
    added: true,
    title: t("I mirrored too much", "عكستُ أكثر مما يجب"),
    body: t(
      "The first release flipped everything for right-to-left, including icons that should never flip, like play buttons and clocks. The bug reports arrived within a day.",
      "قلب الإصدار الأول كل شيء للواجهات من اليمين إلى اليسار، حتى الأيقونات التي لا يجب قلبها، مثل زر التشغيل والساعة. ووصلت البلاغات خلال يوم واحد."
    ),
    then: t(
      "Every component now knows which parts mirror and which don’t. Hirfa UI has 9,800 GitHub stars today.",
      "صار كل مكوّن يعرف ما يُعكس منه وما لا يُعكس، وللمكتبة اليوم ٩٬٨٠٠ نجمة على GitHub."
    ),
  },
  dalil: {
    date: "2022-02",
    added: true,
    title: t("So many warnings that nobody listened", "تحذيرات كثيرة فلم يستمع أحد"),
    body: t(
      "My first version flagged everything it could find on a page. Developers switched it off within a week.",
      "نبّه الإصدار الأول إلى كل ما وجده في الصفحة، فأوقفه المطوّرون خلال أسبوع."
    ),
    then: t(
      "I kept the 42 issues that matter most on Arabic pages, each with a fix. 3,400 developers in 22 countries use it now.",
      "أبقيتُ على ٤٢ مشكلة هي الأهم في الصفحات العربية، ولكل منها طريقة إصلاح. ويستخدمها اليوم ٣٬٤٠٠ مطوّر في ٢٢ دولة."
    ),
  },
  rafeeq: {
    date: "2016-12",
    added: false,
    title: t("We closed Rafeeq", "أغلقنا «رفيق»"),
    body: t(
      "After 26,000 sign-ups and 140,000 rides, the market changed and we closed the company in December 2016.",
      "بعد ٢٦٬٠٠٠ تسجيل و١٤٠٬٠٠٠ رحلة، تغيّر السوق فأغلقنا الشركة في ديسمبر ٢٠١٦."
    ),
    then: t(
      "I wrote a public post-mortem, read by 80,000 people, and gave a talk called “Why our startup failed”.",
      "كتبتُ مراجعة علنية لما حدث قرأها ٨٠٬٠٠٠ شخص، وقدّمتُ محاضرة بعنوان «لماذا فشلت شركتنا الناشئة»."
    ),
  },
};

// Her own diary, kept on the desk in her room.
export const lifeDiary = [
  {
    date: "2006-08",
    added: true,
    title: t("Not abroad, not yet", "لم أسافر، ليس بعد"),
    body: t(
      "I wanted to study computer science abroad. The scholarship letter said no. I unpacked my suitcase and enrolled at Najd Valley University in Riyadh.",
      "أردتُ دراسة علوم الحاسب في الخارج، لكن رسالة المنحة جاءت بالرفض. أفرغتُ حقيبتي والتحقتُ بجامعة وادي نجد في الرياض."
    ),
    then: t(
      "I graduated with First Class Honours. In 2009 I spent an exchange semester in Germany, and in 2011 I won a full scholarship for my MSc in the UK.",
      "تخرّجتُ بمرتبة الشرف الأولى. وفي ٢٠٠٩ قضيتُ فصل تبادل في ألمانيا، وفي ٢٠١١ نلتُ منحة كاملة للماجستير في المملكة المتحدة."
    ),
  },
  {
    date: "2016-12",
    added: false,
    title: t("My first startup closed", "أُغلقت شركتي الناشئة الأولى"),
    body: t(
      "We raised SAR 3.5 million and built a team of 11, and we still closed Rafeeq Rides in December 2016 when the market changed.",
      "جمعنا ٣٫٥ مليون ريال وبنينا فريقاً من ١١ شخصاً، ومع ذلك أغلقنا «رفيق» في ديسمبر ٢٠١٦ حين تغيّر السوق."
    ),
    then: t(
      "I wrote down what we got wrong in a public post-mortem. 80,000 people read it.",
      "كتبتُ ما أخطأنا فيه في مراجعة علنية قرأها ٨٠٬٠٠٠ شخص."
    ),
  },
  {
    date: "2017-01",
    added: false,
    title: t("Six months off", "ستة أشهر بعيداً عن العمل"),
    body: t("I took a career break from January to June 2017 for a family relocation.", "أخذتُ استراحة مهنية من يناير إلى يونيو ٢٠١٧ بسبب انتقال العائلة."),
    then: t(
      "I volunteered, teaching a 12-week web development course to 45 adult learners. In July I joined Zayna Health Tech.",
      "تطوّعتُ لتدريس دورة في تطوير الويب مدتها ١٢ أسبوعاً لـ٤٥ متعلّماً بالغاً. وفي يوليو انضممتُ إلى زينة للتقنية الصحية."
    ),
  },
  {
    date: "2024-06",
    added: true,
    title: t("Three certifications expired", "انتهت صلاحية ثلاث شهادات"),
    body: t(
      "Security Fundamentals in 2022, Cloud Application Developer in 2023, Agile Product Owner in 2024. I let them lapse while I was busy leading teams.",
      "أساسيات الأمن في ٢٠٢٢، ومطوّر التطبيقات السحابية في ٢٠٢٣، ومالك المنتج الرشيق في ٢٠٢٤. تركتُها تنتهي وأنا منشغلة بقيادة الفرق."
    ),
    then: t("They still hang on my wall. In 2025 I earned two new ones.", "ما زالت معلّقة على جداري. وفي ٢٠٢٥ حصلتُ على شهادتين جديدتين."),
  },
  {
    date: "2026-11",
    added: true,
    title: t("An exam still ahead", "اختبار ما زال أمامي"),
    body: t(
      "My CSAP exam, Certified Security Architecture Professional, is booked for December 2026. On paper, my security and compliance skills are still intermediate.",
      "اختبار CSAP، محترف معماريات الأمن المعتمد، محجوز في ديسمبر ٢٠٢٦. وعلى الورق، ما زالت مهاراتي في الأمن والامتثال في المستوى المتوسط."
    ),
    then: t("So that’s the one I’m working on now.", "ولهذا أعمل عليه الآن."),
  },
];
