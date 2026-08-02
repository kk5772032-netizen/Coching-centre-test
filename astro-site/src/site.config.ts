/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Everything the client might ever want changed lives here — and *only* here.
 *
 *  This is the whole reason for the Astro rewrite. In the single-file version
 *  each of these values had to exist twice (once in the CONFIG object, once
 *  hardcoded in the HTML so the page still worked with JavaScript disabled).
 *  Here the value is written once and rendered into static HTML at build time,
 *  so there is no duplication and nothing to keep in sync.
 * ============================================================================
 */

export const site = {
  /* --- Identity ---------------------------------------------------------- */
  name: 'Shikhar Academy',
  shortName: 'Shikhar',
  tagline: "Delhi's trusted SSC coaching since 2016",
  foundedYear: 2016,
  url: 'https://www.shikharacademy.in',

  /* --- Contact ----------------------------------------------------------- */
  phone: '+919871234567', // full international form, used for tel: links
  phoneDisplay: '98712 34567', // what the visitor reads
  whatsapp: '919871234567', // country code + number, NO plus sign
  email: 'admissions@shikharacademy.in',

  /* --- Address ----------------------------------------------------------- */
  address: {
    line1: '2nd Floor, Batra Complex, 1573 Outram Lines',
    line2: 'Dr Mukherjee Nagar, Delhi – 110009',
    street: '2nd Floor, Batra Complex, 1573 Outram Lines, Dr Mukherjee Nagar',
    locality: 'Delhi',
    region: 'DL',
    postalCode: '110009',
    country: 'IN',
    lat: 28.7062,
    lng: 77.2103,
  },
  area: 'Mukherjee Nagar',
  metro: 'GTB Nagar Metro, Gate 3',
  metroWalkMinutes: 7,
  timings: 'Mon–Sat, 7:00 AM – 8:00 PM',
  sundayTimings: 'Sunday: 9:00 AM – 2:00 PM (tests only)',

  /* --- ADMISSION BANNER — update every admission cycle -------------------- */
  admission: {
    batchName: 'SSC CGL 2026 Foundation',
    startDate: '12 August 2026',
    seatsLeft: 14,
    seatsTotal: 40,
  },

  /* --- Headline numbers --------------------------------------------------- */
  stats: {
    yearsRunning: 9,
    studentsTaught: 4200,
    totalSelections: 310,
    googleRating: '4.7',
    googleReviews: 312,
    lastYearSelections: 47,
    lastYearAppeared: 168,
    bestRank: 61,
    selectionRate: 28,
    batchSizeCap: 40,
    resultYear: 2024,
  },

  /* --- Default WhatsApp message ------------------------------------------- */
  primaryExam: 'SSC CGL',

  /* --- Social ------------------------------------------------------------- */
  social: {
    youtube: 'https://www.youtube.com/@shikharacademy',
    instagram: 'https://www.instagram.com/shikharacademy',
    facebook: 'https://www.facebook.com/shikharacademy',
  },

  /* --- Navigation --------------------------------------------------------- */
  nav: [
    { label: 'Courses', href: '/#courses' },
    { label: 'Centre', href: '/#centre' },
    { label: 'Faculty', href: '/#faculty' },
    { label: 'Results', href: '/#results' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

/** Build a wa.me link with a pre-filled message. */
export function waLink(text?: string): string {
  const msg = text ?? `Hi, I want to know about the ${site.primaryExam} batch at ${site.name}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/** Format a rupee amount the Indian way: 45000 -> ₹45,000 */
export function rupees(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

/* ---------------------------------------------------------------------------
   Content that changes rarely enough to live in code rather than the CMS.
   Courses, faculty, toppers and blog posts are Markdown files instead — see
   src/content/ — because those are the things the institute edits often.
   --------------------------------------------------------------------------- */

export const whyUs = [
  {
    icon: 'users',
    title: 'Batch size capped at 40',
    body: "We stop admissions at 40 students per batch. The teacher knows every student's name and weak areas by the second month.",
  },
  {
    icon: 'cap',
    title: 'Faculty who cleared the exam',
    body: 'Three of our four core teachers have their own SSC selection. They teach the paper the way it is actually set, not from a generic textbook.',
  },
  {
    icon: 'chat',
    title: 'Doubt session every single day',
    body: 'One hour after every class, no appointment needed. If your doubt is not cleared that day, the teacher stays back.',
  },
  {
    icon: 'book',
    title: 'Printed material, not PDFs',
    body: 'Eleven printed modules updated every year, handed over in the first week. Included in the fee — you never pay extra for books.',
  },
  {
    icon: 'check',
    title: 'Weekly test, ranked the same evening',
    body: 'Every Sunday test is checked and ranked by Monday morning, with a printed analysis of which topics cost you marks.',
  },
  {
    icon: 'mentor',
    title: 'One mentor for the whole year',
    body: 'Each student is assigned a mentor who tracks their test scores monthly and calls the parents once a quarter.',
  },
];

export const testimonials = [
  {
    quote:
      'I came from Bihar in 2023 with almost zero Maths. Rajeev sir made me solve 30 questions daily in front of him for two months. My Tier 1 Maths went from 11 to 44. That is the whole story.',
    name: 'Deepak Kumar',
    meta: 'SSC CGL 2024 · AIR 61',
  },
  {
    quote:
      'The best part was that nobody pushed me to buy extra test series. Everything was in the fee. As a girl travelling from Rohini daily, the 7 AM batch timing and the metro being close mattered a lot to my parents.',
    name: 'Priya Nautiyal',
    meta: 'SSC CGL 2024 · AIR 143',
  },
  {
    quote:
      'I failed twice before joining. Here the mentor actually sat with my test papers and told me I was losing 8 marks on silly calculation, not on tough questions. Nobody had told me that in three years.',
    name: 'Mohd Arif',
    meta: 'SSC CGL 2024 · AIR 208',
  },
  {
    quote:
      'I was doing a job in Karol Bagh so only the weekend batch was possible for me. Recordings were uploaded the same day so I could study at night. Cleared SI in my second attempt.',
    name: 'Ritu Chauhan',
    meta: 'Delhi Police SI 2024',
  },
];

export const faqs = [
  {
    q: 'Can I pay the fee in instalments?',
    a: 'Yes. Any batch above ₹20,000 can be paid in 2 or 3 instalments — first at admission, the rest at fixed dates we agree in writing. There is no interest or extra charge. We accept UPI, cash, cheque and bank transfer, and give a printed receipt every time.',
  },
  {
    q: 'How many students are there in one batch?',
    a: 'We cap every classroom batch at 40 students and stop admissions once it is full, even if people are still asking. If your preferred batch is full we will tell you honestly and put you on the next one rather than squeezing you in.',
  },
  {
    q: 'Do you give a free demo class?',
    a: 'Two free demo classes, in the actual running batch — not a special demo lecture. Parents are welcome to sit in. Book through the form above or just walk in between 10 AM and 6 PM with an ID proof.',
  },
  {
    q: 'What is the refund policy?',
    a: 'Full refund minus ₹1,000 administrative charge if you withdraw within 7 days of joining and return the printed material unused. Between 8 and 21 days, 50% is refunded. After 21 days no refund is possible, but the fee can be transferred to another batch once, or to a sibling.',
  },
  {
    q: 'Is study material included in the fee?',
    a: 'Yes — all eleven printed modules, the full test series and the class handouts are included. You will never be asked to buy a separate book or a separate test series from us. The only thing you pay extra for is a lost material set (₹350 per module).',
  },
  {
    q: 'Can I attend online if I live outside Delhi?',
    a: 'Yes. The Online Live Batch runs 6:30–9:00 PM with the same faculty as the classroom batch. Printed material is couriered to your address anywhere in India, recordings stay available for 12 months, and doubts are cleared on a dedicated WhatsApp group.',
  },
  {
    q: 'Do you help with PG or hostel nearby?',
    a: 'We do not run a hostel, but our office keeps a verified list of PGs in Mukherjee Nagar, Indira Vihar and Vijay Nagar in the ₹6,000–₹12,000 per month range, separately for boys and girls. Ask at the front desk and we will share contacts — we take no commission from any PG.',
  },
  {
    q: 'I am from Hindi medium. Will I manage the English paper?',
    a: "Most of our students are from Hindi medium and clear it every year. Classes are taught bilingually, and the English module starts from basics with a daily 20-minute reading practice. Sunita ma'am also runs an extra 30-minute session twice a week for students who need it, at no additional cost.",
  },
];

export const gallery = [
  { scene: 'building', title: 'The building', body: '2nd floor, Batra Complex — above Punjab National Bank' },
  { scene: 'classroom', title: 'Classroom', body: 'Batch size capped at 40 — every seat sees the board' },
  { scene: 'reading', title: 'Reading room', body: 'Open till 9 PM, including Sundays' },
  { scene: 'test', title: 'Test hall', body: 'Weekly mocks under real exam conditions' },
  { scene: 'reception', title: 'Admission desk', body: 'Walk in 10 AM – 6 PM, no appointment needed' },
];
