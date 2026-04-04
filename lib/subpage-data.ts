export type SectionKey =
  | "about-us"
  | "academics"
  | "student-corner"
  | "features"
  | "activities";

export type SectionTheme = {
  accent: string;
  accentSoft: string;
  heroStart: string;
  heroEnd: string;
  heroGlow: string;
};

export type SectionGroup = {
  slug: SectionKey;
  label: string;
  description: string;
  theme: SectionTheme;
};

export type TableData = {
  columns: string[];
  rows: string[][];
};

export type SectionPage = {
  section: SectionKey;
  slug: string;
  label: string;
  title: string;
  intro: string;
  paragraphs: string[];
  highlights: string[];
  tableData?: TableData;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  imageAspectRatio?: string;
  callout?: {
    title: string;
    body: string;
  };
};


export const sectionGroups: SectionGroup[] = [
  {
    slug: "about-us",
    label: "About Us",
    description:
      "Learn about the school's story, leadership, timings, and the values that shape everyday life on campus.",
    theme: {
      accent: "#8f342e",
      accentSoft: "#f7e8e1",
      heroStart: "#1f4d62",
      heroEnd: "#3b7693",
      heroGlow: "rgba(235, 183, 108, 0.26)"
    }
  },
  {
    slug: "academics",
    label: "Academics",
    description:
      "A clear look at faculty, curriculum, classroom practice, and academic support for every learner.",
    theme: {
      accent: "#2d4f9c",
      accentSoft: "#e7eeff",
      heroStart: "#223962",
      heroEnd: "#3b5d96",
      heroGlow: "rgba(126, 151, 222, 0.28)"
    }
  },
  {
    slug: "student-corner",
    label: "Student Corner",
    description:
      "A practical student-focused area covering achievements, schedules, handbooks, and school events.",
    theme: {
      accent: "#8a4456",
      accentSoft: "#f6e6ec",
      heroStart: "#4d3557",
      heroEnd: "#785072",
      heroGlow: "rgba(213, 153, 182, 0.25)"
    }
  },
  {
    slug: "features",
    label: "Features",
    description:
      "Explore the facilities and learning environments that support academic, creative, and physical growth.",
    theme: {
      accent: "#286c64",
      accentSoft: "#e2f3ef",
      heroStart: "#24575e",
      heroEnd: "#357c76",
      heroGlow: "rgba(115, 201, 178, 0.24)"
    }
  },
  {
    slug: "activities",
    label: "Activities",
    description:
      "Discover the experiences beyond the classroom that make school life active, memorable, and inspiring.",
    theme: {
      accent: "#b3652c",
      accentSoft: "#f7eadb",
      heroStart: "#714828",
      heroEnd: "#b57838",
      heroGlow: "rgba(236, 189, 122, 0.28)"
    }
  }
];

export const sectionPages: SectionPage[] = [
  {
    section: "about-us",
    slug: "about-school",
    label: "About the School",
    title: "About the School",
    intro:
      "Established in 2003, School Chandan — Excellence Beyond Education — is a CBSE school, An Institution of Chandan Education Society, Bengaluru–Laxmeshwar. Growing steadily for over 22 years, it brings rural education into the mainstream, empowering young minds with excellence, innovation, and human values.",
    paragraphs: [
      "The school stands tall today with the support and encouragement of many national and international intellectuals and eminent personalities, including Bharat Ratna Prof. C.N.R. Rao, Dr. A.S. Kiran Kumar (former Chairman, ISRO), Shri Siddaramaiah, IAS/KAS/IPS/IFS officers, and several renowned educationists and Vice-Chancellors. Their guidance continues to strengthen the school's mission to uplift children from rural India toward global opportunities.",
      "School Chandan is blessed with the visionary legacy of Late Shri H. C. Ratageri, the esteemed Director whose dedication laid the strong foundation of the institution. The school continues to flourish under the guidance of Shri T. Ishwar and Smt. Girija T. Ishwar, committed to nurturing quality education in rural communities."
    ],
    highlights: [
      "CBSE school established in 2003, An Institution of Chandan Education Society",
      "22+ years of uplifting rural education into the mainstream",
      "Supported by Bharat Ratna Prof. C.N.R. Rao & former ISRO Chairman",
      "Built on excellence, innovation, and Indian human values"
    ],
    image: "/assets/hero/campus-front.jpg",
    imageAlt: "Front view of the School Chandan campus",
    imagePosition: "center 55%"
  },
  {
    section: "about-us",
    slug: "vision-mission",
    label: "Vision & Mission",
    title: "Vision & Mission",
    intro:
      "The school vision is to nurture capable young minds who are grounded in values, ready for modern learning, and responsible toward society.",
    paragraphs: [
      "Our vision is not limited to marks alone. We aim to build confident learners who think clearly, speak respectfully, and carry the courage to participate, lead, and serve.",
      "The mission is carried out through concept-based teaching, regular guidance, a culture of discipline, and learning experiences that encourage curiosity, creativity, and consistency."
    ],
    highlights: [
      "Strong academic foundations with concept clarity",
      "Confidence in spoken communication and presentation",
      "Respect, discipline, and responsibility in daily life",
      "Holistic growth through classroom and co-curricular exposure",
      "School Chandan is not only syllabus, textbooks, exams, marks, percentage oriented school but also a man-making, character-creating school."
    ],
    image: "/assets/sections/vision-mission-sports.jpg",
    imageAlt: "Students participating in school sports and physical activities",
    imagePosition: "center 25%"
  },
  {
    section: "about-us",
    slug: "chairmans-message",
    label: "Secretary's Message",
    title: "Message from the Secretary",
    intro:
      "Sri T. Ishwar, Secretary of Chandan Education Society, is a triple graduate in Engineering and a dynamic personality who has played a vital role in shaping the vision and ideals of School Chandan.",
    paragraphs: [
      "He firmly believes that 'Education is the food for the soul.' With this belief, he has dedicated his efforts to bringing quality education to rural communities, ensuring that every child receives opportunities to grow, learn, and succeed irrespective of background.",
      "Under his guidance, School Chandan, established in 2003, has evolved into a progressive CBSE institution that blends academic excellence with strong Indian cultural values, nurturing students to become confident, responsible, and socially conscious individuals. Sri T. Ishwar envisions School Chandan as a centre of holistic learning where knowledge, discipline, character, and leadership come together to shape the leaders of tomorrow."
    ],
    highlights: [
      "Education is the food for the soul — Sri T. Ishwar",
      "Triple graduate in Engineering & dynamic leader",
      "Committed to quality rural education since 2003",
      "Vision: holistic learning with knowledge, discipline & leadership"
    ],
    image: "/assets/T_ishwar.jpeg",
    imageAlt: "Sri T. Ishwar — Secretary, Chandan Education Society",
    imageFit: "cover",
    imagePosition: "center 15%",
    imageAspectRatio: "3 / 4",
    callout: {
      title: "Sri T. Ishwar — Secretary, Chandan Education Society",
      body:
        "Education is the food for the soul. Every child deserves opportunities to grow, learn, and succeed — irrespective of background."
    }
  },
  {
    section: "about-us",
    slug: "principals-message",
    label: "Principal's Message",
    title: "Message from the Principal",
    intro:
      "Sri Ramagiri Bavanavar, Principal of School Chandan, believes that education is not only about academic success but also about shaping character, values, and responsibility.",
    paragraphs: [
      "At School Chandan, our goal is to create an environment where students develop curiosity, confidence, discipline, and a lifelong love for learning. We strive to provide a balanced education that blends strong academic foundations with cultural values, leadership skills, and holistic development.",
      "Through dedicated teaching, innovative learning practices, and a supportive atmosphere, we encourage every student to discover their unique potential and grow into responsible citizens. Our committed teachers and staff work together to guide students with care, inspiration, and discipline — preparing them to face the challenges of the modern world while remaining rooted in strong moral values."
    ],
    highlights: [
      "Education shapes character, values, and responsibility",
      "Balanced academics with cultural values and leadership",
      "Every student encouraged to discover their unique potential",
      "Teachers guide with care, inspiration, and discipline"
    ],
    image: "/assets/principal.jpeg",
    imageAlt: "Sri Ramagiri Bavanavar — Principal, School Chandan",
    imagePosition: "center 15%",
    imageAspectRatio: "3 / 4",
    callout: {
      title: "Sri Ramagiri Bavanavar — Principal, School Chandan",
      body:
        "I warmly invite parents and students to be part of the School Chandan family — where learning becomes meaningful and every child is encouraged to strive for excellence."
    }
  },
  {
    section: "about-us",
    slug: "school-management",
    label: "School Management",
    title: "School Management",
    intro:
      "School Chandan is guided by a committed leadership team — Secretary Sri T. Ishwar, the late Director Sri H. C. Ratageri, and Principal Sri Ramagiri Bavanavar — united by a shared vision of excellence, values, and rural empowerment.",
    paragraphs: [
      "The institution continues to flourish under the guidance of Shri T. Ishwar and Smt. Girija T. Ishwar, who are committed to nurturing quality education in rural communities.",
      "Smt. Girija T. Ishwar and Sri T. Ishwar together support the institution with dedication, ensuring School Chandan remains a centre of quality learning, discipline, and holistic development for children from rural and urban communities alike."
    ],
    highlights: [
      "Secretary: Sri T. Ishwar — Triple Graduate in Engineering",
      "Late Director: Sri H. C. Ratageri — eminent educationist",
      "Principal: Sri Ramagiri Bavanavar",
      "Co-founder: Smt. Girija T. Ishwar"
    ],
    image: "/assets/sections/management-assembly.jpg",
    imageAlt: "Students and management team during a school assembly",
    imageFit: "cover",
    imagePosition: "center 30%"
  },
  {
    section: "about-us",
    slug: "directors-legacy",
    label: "Director's Legacy",
    title: "Message from the Director",
    intro:
      "Late Sri H. C. Ratageri was an eminent educationist and respected Director of School Chandan, known for his vast experience and deep commitment to nurturing young minds.",
    paragraphs: [
      "He believed that the true purpose of education is to shape responsible citizens who contribute positively to society and the nation. Through his wisdom and leadership, many students have grown to achieve success in various fields, serving the country as IAS and KAS officers, teachers, engineers, doctors, and other distinguished professionals.",
      "Though he is no longer with us, his vision, dedication, and educational values continue to inspire School Chandan, guiding the institution in its mission to provide quality education and shape the leaders of tomorrow."
    ],
    highlights: [
      "Late Sri H. C. Ratageri — Eminent Educationist",
      "Mission: Shaping responsible citizens for the nation",
      "Legacy of IAS/KAS, doctors, and engineers",
      "A lasting source of inspiration for the community"
    ],
    image: "/assets/sections/chairman.jpg",
    imageAlt: "Portrait of Late Sri H. C. Ratageri",
    imageFit: "contain",
    callout: {
      title: "Late Sri H. C. Ratageri — Director, School Chandan",
      body:
        "His vision remains the foundation upon which School Chandan continues to grow and inspire thousands of young minds."
    }
  },
  {
    section: "about-us",
    slug: "visiting-hours",
    label: "Visiting Hours",
    title: "Visiting Hours",
    intro:
      "The school welcomes parents and visitors during structured hours so every interaction can be helpful, orderly, and respectful of the school day.",
    paragraphs: [
      "For general enquiries, admissions support, document requests, or routine coordination, families are encouraged to visit during office hours. This allows the administrative team to respond properly without disturbing class time.",
      "Meetings with the principal or teachers are best arranged in advance. Prior appointments help the school dedicate enough time to each parent conversation and keep academic schedules uninterrupted."
    ],
    highlights: [
      "Office support from Monday to Saturday",
      "Principal meetings by prior appointment",
      "Admissions and enquiry guidance during office hours",
      "Advance communication helps avoid class disruption"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof3.jpg",
    imageAlt: "Students in front of the school campus",
    imagePosition: "center 20%"
  },
  {
    section: "about-us",
    slug: "school-timing",
    label: "School Timing",
    title: "School Timing",
    intro:
      "A consistent timetable helps students settle into focused study, healthy routines, and a balanced school day.",
    paragraphs: [
      "School timing at Chandan is planned to support assembly, classroom learning, activity periods, and smooth dispersal. Structured timing also helps children develop punctuality, readiness, and disciplined habits that stay with them beyond school.",
      "Families are requested to follow reporting and pick-up timings carefully so that students begin the day calmly and make full use of the learning schedule."
    ],
    highlights: [
      "Primary and High School: 9:00 AM to 3:30 PM",
      "Pre-Primary: 9:00 AM to 1:00 PM",
      "Saturday: 9:00 AM to 1:00 PM",
      "Regular timing supports focus, routine, and punctuality"
    ],
    image: "/assets/hero/assembly.jpg",
    imageAlt: "Students assembled during school routine",
    imageFit: "contain"
  },
  {
    section: "about-us",
    slug: "daily-schedule",
    label: "Daily Routine",
    title: "My Day at School Chandan",
    intro:
      "Life at School Chandan Residential Campus follows a structured routine designed to nurture discipline, physical fitness, academic excellence, and strong values.",
    paragraphs: [
      "The daily schedule helps students develop self-discipline and responsibility while maintaining focus on studies and character development. Each day is a balance of yoga, meditation, morning classes, sports, and dedicated study hours.",
      "Through structured learning and a supportive atmosphere, the school prepares students to grow into confident, responsible, and successful individuals."
    ],
    highlights: [
      "5:00 am – Early Rising & Yoga/Meditation",
      "9:15 am – Chandan Session I (Begins with Assembly)",
      "5:00 pm – Sports & Outdoor Games",
      "7:00 pm – Arati, Bhajan & Spoorthi Session",
      "9:00 pm – Night Study Hour",
      "10:00 pm – Lights Off"
    ],
    tableData: {
      columns: ["Time", "Activity"],
      rows: [
        ["5:00 am – 5:30 am", "Early Rising"],
        ["5:30 am – 6:30 am", "Yoga & Meditation"],
        ["6:30 am – 7:15 am", "Self Cleaning & Bath"],
        ["7:30 am – 8:30 am", "Morning Classes"],
        ["8:30 am – 9:00 am", "Breakfast"],
        ["9:15 am – 1:20 pm", "Chandan Session – I (Begins with Assembly)"],
        ["1:20 pm – 1:50 pm", "Lunch Break"],
        ["1:55 pm – 4:00 pm", "Chandan Session – II"],
        ["4:00 pm – 4:20 pm", "Reporting / Snacks"],
        ["4:20 pm – 5:00 pm", "Self Cleaning & Washing"],
        ["5:00 pm – 5:50 pm", "Sports & Games"],
        ["6:00 pm – 7:00 pm", "Study Hour"],
        ["7:00 pm – 7:40 pm", "Arati, Bhajan & Spoorthi Session"],
        ["8:00 pm – 8:30 pm", "Dinner"],
        ["9:00 pm – 10:00 pm", "Study Hour"],
        ["10:00 pm", "Lights Off"]
      ]
    },
    image: "/assets/hero/sports.jpg",
    imageAlt: "Students in sports activity",
    imagePosition: "center 25%",
    callout: {
      title: "Daily Schedule Overview",
      body:
        "From early morning yoga to evening bhajans and study hours, every minute is planned for holistic growth."
    }
  },
  {
    section: "about-us",
    slug: "admissions",
    label: "Admissions",
    title: "Admissions Process",
    intro:
      "School Chandan welcomes students who are eager to learn, grow, and develop strong values along with academic excellence.",
    paragraphs: [
      "New admissions are primarily offered for LKG, Class I, Class V, and Class VIII during April and May. Parents must submit the completed application form to the school office on or before 20th May. A detailed interaction/interview with the student and parents will be conducted prior to admission.",
      "Required documents include: Transfer Certificate (T.C.) from the previous school, Birth Certificate, and recent passport-size photographs. Admission fee must be submitted via Demand Draft drawn in favour of 'Chandan Education Society', payable at Laxmeshwar."
    ],
    highlights: [
      "Admissions for LKG, Class I, V, and VIII",
      "Deadline: Applications by 20th May",
      "Interview required for students and parents",
      "Payment: DD in favour of Chandan Education Society",
      "T.C. mandatory for confirmation"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof7.jpg",
    imageAlt: "School difference and admissions collage",
    imageFit: "contain"
  },
  {
    section: "academics",
    slug: "faculty",
    label: "Faculty",
    title: "Faculty",
    intro:
      "A committed faculty team is one of the school's strongest assets, guiding students with subject knowledge, patience, and personal attention.",
    paragraphs: [
      "Teachers at School Chandan focus on clarity, consistency, and classroom discipline. Their role goes beyond delivering lessons - they help students ask questions, correct mistakes, and build confidence step by step.",
      "The faculty also works closely with parents and school leadership so that academic progress, attendance, and learning habits are supported in a coordinated way."
    ],
    highlights: [
      "Dedicated mentors across grade levels",
      "Personal attention for concept clarity and improvement",
      "Consistent classroom discipline and guidance",
      "Close coordination with parents and school leadership"
    ],
    image: "/assets/sections/classroom-activity.jpg",
    imageAlt: "Teacher-led classroom activity at school"
  },
  {
    section: "academics",
    slug: "examination-curriculum",
    label: "Examination Curriculum",
    title: "Examination Curriculum",
    intro:
      "The examination system is designed to support readiness, revision, and strong academic foundations rather than last-minute pressure.",
    paragraphs: [
      "Curriculum planning follows a structured academic path with unit-based progress, regular practice, and timely assessments. This helps students stay aligned with syllabus expectations throughout the year.",
      "Examinations, revisions, class tests, and follow-up guidance are used together so that students understand where they are improving and where additional effort is needed."
    ],
    highlights: [
      "Structured academic planning through the school year",
      "Regular tests and revision support",
      "Focus on concept mastery along with performance",
      "Clear preparation habits for board-facing classes"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof2.jpg",
    imageAlt: "Students in a structured learning environment",
    imagePosition: "center 20%"
  },
  {
    section: "academics",
    slug: "teaching-learning",
    label: "Teaching & Learning",
    title: "Teaching & Learning",
    intro:
      "Teaching at School Chandan combines explanation, practice, participation, and reinforcement so students learn with understanding.",
    paragraphs: [
      "The classroom approach emphasizes clear instruction, repeated practice, spoken participation, and age-appropriate methods that keep students engaged. Activity-based sessions and demonstrations are used where they add value.",
      "Learning is strengthened through revision, subject guidance, practical work, and opportunities for children to express ideas with confidence instead of only memorizing content."
    ],
    highlights: [
      "Concept-based teaching with regular practice",
      "Spoken English and student participation in class",
      "Activity-based sessions where useful",
      "Reinforcement through revision and teacher support"
    ],
    image: "/assets/hero/classroom.jpg",
    imageAlt: "Students participating in active learning",
    imagePosition: "center 20%"
  },
  {
    section: "academics",
    slug: "transfer-certificates",
    label: "Transfer Certificates",
    title: "Transfer Certificates",
    intro:
      "Administrative support for transfer certificates is handled with clarity so families can complete the process smoothly when needed.",
    paragraphs: [
      "The school maintains student records carefully and offers guidance on the steps required for transfer-related documentation. Families are encouraged to contact the office for current requirements and timelines.",
      "A simple, well-coordinated process helps ensure that certificates, records, and related formalities are completed with proper verification and communication."
    ],
    highlights: [
      "Office guidance for certificate-related queries",
      "Document process handled with clarity and care",
      "Student records maintained through school administration",
      "Families advised to connect in advance for timelines"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof6.jpg",
    imageAlt: "School building front view for administrative support",
    imagePosition: "center 20%"
  },
  {
    section: "student-corner",
    slug: "students-staff",
    label: "Students & Staff",
    title: "Students & Staff",
    intro:
      "The strength of the school community comes from the bond between students, teachers, support teams, and families.",
    paragraphs: [
      "Students benefit from a school culture where staff members are approachable, attentive, and invested in each child's well-being. Discipline is balanced with encouragement so children feel both guided and seen.",
      "Teachers, administrators, and support staff work together to maintain a campus environment that feels organized, respectful, and positive across academics, activities, and daily routines."
    ],
    highlights: [
      "Respectful student-teacher relationships",
      "Supportive campus environment across departments",
      "Guidance that balances discipline with care",
      "Shared responsibility for student well-being"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof3.jpg",
    imageAlt: "Student life collage from the school gallery",
    imageFit: "contain"
  },
  {
    section: "student-corner",
    slug: "achievements",
    label: "Achievements",
    title: "Achievements",
    intro:
      "School Chandan students have earned recognition nationally and internationally across academics, science, and leadership — a testimony to the school's philosophy of nurturing excellence beyond education.",
    paragraphs: [
      "School Chandan achieved 1st place in the World in the IAIS Examination conducted by the University of Australia, competing among participants from 28 countries and over 5 lakh students. The school has also launched an Artificial Rocket — Chandrayana-I & Chandrayana-III Project — appreciated by the ISRO Chairman and senior ISRO scientists.",
      "Students have been selected for the Science Outreach Programme by the C.N.R. Rao Education Foundation and Jawaharlal Nehru Centre for Advanced Scientific Research, with 400+ participants annually. The school has been selected for the N.M.O. (Nobel Mind Tech Olympiad, Hyderabad) to send projects to NASA, California. School Chandan also maintains a consistent 100% pass rate in CBSE Class 10 Board Examinations every year."
    ],
    highlights: [
      "1st in the World — IAIS Exam (28 countries, 5 lakh participants)",
      "Chandrayana-I & III rocket project appreciated by ISRO",
      "Selected for NASA project via NMO, Hyderabad",
      "National Inspire Award, Chintana Award & All India GK Award",
      "Students met Dr. A.P.J. Abdul Kalam & Bharat Ratna Prof. C.N.R. Rao",
      "Consistent 100% CBSE Class 10 results every year"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof6.jpg",
    imageAlt: "Achievements and cultural highlights collage",
    imageFit: "contain"
  },
  {
    section: "student-corner",
    slug: "syllabus",
    label: "Syllabus",
    title: "Syllabus",
    intro:
      "The syllabus framework gives students and parents a clear view of what will be taught, practiced, and assessed through the academic year.",
    paragraphs: [
      "A well-organized syllabus supports better planning at home and in school. It helps families track learning expectations, prepare materials in advance, and follow revision routines with greater confidence.",
      "Teachers use the syllabus as a working guide for pacing, classroom delivery, homework, and assessment preparation so that learning stays consistent and transparent."
    ],
    highlights: [
      "Clear subject planning across the academic year",
      "Useful guidance for home preparation and revision",
      "Better alignment between lessons and assessments",
      "Transparent academic expectations for families"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof2.jpg",
    imageAlt: "Students focused during classroom instruction",
    imagePosition: "center 20%"
  },
  {
    section: "student-corner",
    slug: "list-of-holidays",
    label: "List of Holidays",
    title: "List of Holidays",
    intro:
      "A well-communicated holiday calendar helps families plan responsibly while keeping students aligned with the school schedule.",
    paragraphs: [
      "The holiday list is prepared to reflect important national observances, festival breaks, and school-specific academic planning. It helps families organize travel, attendance, and revision without losing rhythm in the school year.",
      "Parents are encouraged to follow the officially shared calendar and updates from the school office so that student attendance remains regular around working days and reopening dates."
    ],
    highlights: [
      "Annual planning support for families",
      "Helpful visibility around school breaks and reopening",
      "Better attendance planning around holidays",
      "Official updates shared through school communication"
    ],
    image: "/assets/hero/culture.jpg",
    imageAlt: "School cultural program image representing festive occasions",
    imagePosition: "center 22%"
  },
  {
    section: "student-corner",
    slug: "school-handbook",
    label: "School Handbook",
    title: "School Handbook",
    intro:
      "The school handbook brings key routines, expectations, and campus guidelines into one place for students and families.",
    paragraphs: [
      "From attendance habits and uniform standards to communication practices and general discipline, the handbook helps families understand how the school day is organized and what supports a positive learning environment.",
      "It also serves as a practical reference for new admissions, helping parents and students settle into school life with clarity and confidence."
    ],
    highlights: [
      "Useful guide to school routines and expectations",
      "Covers attendance, conduct, and communication",
      "Helpful for new admissions and returning families",
      "Supports consistency between home and school"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof7.jpg",
    imageAlt: "School information and admissions collage",
    imageFit: "contain"
  },
  {
    section: "student-corner",
    slug: "events",
    label: "Events",
    title: "Events",
    intro:
      "School events bring energy to campus life and create memorable spaces for leadership, creativity, and community participation.",
    paragraphs: [
      "Assemblies, annual functions, exhibitions, celebrations, and leadership events give students a chance to perform, organize, and represent their classes in front of the school community.",
      "These occasions build confidence and teamwork while also giving families a fuller view of student talent, school culture, and the joy that comes from participation."
    ],
    highlights: [
      "Annual day, exhibitions, and celebration programs",
      "Student leadership and public participation opportunities",
      "Cultural expression alongside academic life",
      "Memorable school-wide community moments"
    ],
    image: "/assets/sections/15.JPG",
    imageAlt: "Students performing during a school event",
    imagePosition: "center 35%"
  },
  {
    section: "student-corner",
    slug: "unique-programmes",
    label: "Unique Programmes",
    title: "Unique Programmes at School Chandan",
    intro:
      "Our students are nurtured through a collection of transformative initiatives that go beyond the conventional classroom.",
    paragraphs: [
      "Programmes like 'Chandana Spandana' (Interaction & Inspiration Platform) and the 'Day Leader Concept' help students develop leadership from an early age. Our 'Self-Governance Day' and 'Examination Without Supervisor' build trust and integrity within the student body.",
      "Activities like the Chandan Students Parliament, Karma Yoga, and Sanskrit Chanting ensure that students grow into well-rounded individuals balanced by modern skills and timeless values."
    ],
    highlights: [
      "Chandana Spandana (Interaction Platform)",
      "Day Leader & Self-Governance Concepts",
      "Examination Without Supervisor (Trust System)",
      "Chandan Students Parliament",
      "Karma Yoga, Hobbies & Sanskrit Chanting",
      "Simple Living, High Thinking culture"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof.jpg",
    imageAlt: "Unique programs collage",
    imageFit: "contain"
  },
  {
    section: "features",
    slug: "library",
    label: "Library",
    title: "Library",
    intro:
      "The library encourages students to read beyond textbooks and grow habits of curiosity, reflection, and independent learning.",
    paragraphs: [
      "A good library adds quiet depth to school life. It introduces children to reference material, story books, and reading routines that improve vocabulary, concentration, and imagination over time.",
      "At School Chandan, the library supports both academic preparation and personal reading, helping students become more thoughtful and self-directed learners."
    ],
    highlights: [
      "Reading culture that supports independent learning",
      "Access to books beyond the classroom textbook",
      "Useful for vocabulary, focus, and curiosity",
      "A calm learning space within campus life"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof5.jpg",
    imageAlt: "Library and facility collage from the prospectus",
    imageFit: "contain"
  },
  {
    section: "features",
    slug: "assembly",
    label: "Assembly",
    title: "Assembly",
    intro:
      "The morning assembly is one of the school's most visible traditions, setting the tone for discipline, confidence, and togetherness.",
    paragraphs: [
      "Assembly includes prayer, thought for the day, news reading, music, and student-led participation. It gives children a platform to speak before others and gradually become more poised in public settings.",
      "Beyond routine, assembly builds belonging. It reminds students that school life includes values, listening, presentation, and collective responsibility."
    ],
    highlights: [
      "Prayer, news, thought for the day, and music",
      "Regular public speaking opportunities for students",
      "A disciplined and inspiring start to the school day",
      "Builds confidence, togetherness, and school spirit"
    ],
    image: "/assets/hero/assembly.jpg",
    imageAlt: "Morning assembly scenes from the school",
    imageFit: "contain"
  },
  {
    section: "features",
    slug: "science-lab",
    label: "Science Lab",
    title: "Science Lab",
    intro:
      "The science lab helps students connect theory with observation, experiment, and hands-on learning.",
    paragraphs: [
      "Practical science becomes more meaningful when students can see concepts in action. Lab exposure encourages attention to process, careful observation, and the confidence to ask why things work the way they do.",
      "By supporting demonstrations, project work, and activity-based learning, the science lab strengthens both understanding and curiosity."
    ],
    highlights: [
      "Hands-on support for classroom science concepts",
      "Demonstrations and practical observation opportunities",
      "Encourages curiosity and analytical thinking",
      "Useful preparation for higher-level science learning"
    ],
    image: "/assets/sections/science-lab.jpg",
    imageAlt: "Science lab learning at School Chandan",
    imagePosition: "center 30%"
  },
  {
    section: "features",
    slug: "computer-lab",
    label: "Computer Lab",
    title: "Computer Lab",
    intro:
      "The computer lab introduces students to digital literacy in a guided setting that supports both basics and confidence.",
    paragraphs: [
      "Modern schooling benefits from early familiarity with computers, keyboard use, educational software, and digital learning habits. A dedicated computer space helps students engage with technology in a focused and age-appropriate way.",
      "The lab also supports classroom teaching by extending learning beyond notebooks and helping students become comfortable with structured digital tools."
    ],
    highlights: [
      "Foundational digital literacy for students",
      "Guided exposure to computer-based learning",
      "Supports classroom instruction with technology",
      "Builds confidence in a modern learning environment"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof3.jpg",
    imageAlt: "School facility collage including digital learning spaces",
    imageFit: "contain"
  },
  {
    section: "features",
    slug: "mathematics-lab",
    label: "Mathematics Lab",
    title: "Mathematics Lab",
    intro:
      "The mathematics lab makes abstract ideas easier to understand by connecting them with models, activity, and visual thinking.",
    paragraphs: [
      "When students handle shapes, patterns, measurements, and demonstrations physically, mathematical ideas often become less intimidating and more memorable. This practical support is especially useful for concept-building in the middle years.",
      "A mathematics lab encourages exploration and helps students move from fear of the subject toward confidence and logical reasoning."
    ],
    highlights: [
      "Activity-based support for mathematical concepts",
      "Visual learning through models and demonstrations",
      "Improves confidence in problem solving",
      "Helps students connect theory with application"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof2.jpg",
    imageAlt: "Students engaged in activity-based learning",
    imagePosition: "center 20%"
  },
  {
    section: "features",
    slug: "atl-innovation-lab",
    label: "ATL Innovation Lab",
    title: "ATL Innovation Lab",
    intro:
      "The Atal Tinkering Lab (ATL) at School Chandan is a dedicated innovation space that has powered award-winning projects and inspired student creativity at the national level.",
    paragraphs: [
      "Under the ATL programme, School Chandan students designed and launched Chandrayana-I & Chandrayana-III — artificial rocket projects that were appreciated by the ISRO Chairman and senior ISRO scientists. The lab fosters a culture of scientific inquiry, model-making, and hands-on experimentation.",
      "Students from the ATL Innovation Lab have been selected for the Science Outreach Programme by the C.N.R. Rao Education Foundation as well as the Nobel Mind Tech Olympiad (NMO, Hyderabad) with recognition to send projects to NASA, California."
    ],
    highlights: [
      "Chandrayana-I & III rocket projects appreciated by ISRO",
      "Selected for C.N.R. Rao Foundation Science Outreach Programme",
      "NMO selection to send projects to NASA, California",
      "Culture of tinkering, experimentation, and innovation"
    ],
    image: "/assets/sections/science-lab.jpg",
    imageAlt: "ATL Innovation Lab and science learning environment",
    imagePosition: "center 32%"
  },
  {
    section: "features",
    slug: "digital-classrooms",
    label: "Digital Classrooms",
    title: "Digital Classrooms",
    intro:
      "Digital classrooms bring additional clarity and engagement to teaching through audio-visual support and interactive delivery.",
    paragraphs: [
      "When used thoughtfully, projector-based and visual teaching tools can make lessons easier to follow and more memorable. This is especially helpful for concept explanation, language support, and revision.",
      "Digital classrooms do not replace teachers - they strengthen classroom communication by making lessons more vivid, structured, and accessible."
    ],
    highlights: [
      "Audio-visual support for clearer explanations",
      "Useful for revision, demonstration, and engagement",
      "Supports spoken language and concept reinforcement",
      "Adds structure and energy to classroom delivery"
    ],
    image: "/assets/hero/classroom.jpg",
    imageAlt: "Modern classroom environment at the school",
    imagePosition: "right 18%"
  },
  {
    section: "features",
    slug: "sports-ground",
    label: "Sports Ground",
    title: "Sports Ground",
    intro:
      "The sports ground gives students an essential space for movement, teamwork, and physical confidence.",
    paragraphs: [
      "Physical activity is a meaningful part of school life. Outdoor games, drill, yoga, and group exercise help students develop coordination, stamina, and positive habits that support long-term well-being.",
      "The sports ground also teaches children how to cooperate, compete fairly, and enjoy the discipline that comes from practice and effort."
    ],
    highlights: [
      "Outdoor space for games, drill, and fitness",
      "Promotes teamwork and healthy competition",
      "Supports stamina, discipline, and coordination",
      "An important part of holistic student development"
    ],
    image: "/assets/hero/sports.jpg",
    imageAlt: "Students involved in sports and wellness activities",
    imagePosition: "center 25%"
  },
  {
    section: "activities",
    slug: "field-trips",
    label: "Field Trips",
    title: "Field Trips",
    intro:
      "Field trips help students connect classroom learning with real places, experiences, and observations outside campus.",
    paragraphs: [
      "Educational visits create lasting memories because students can see, ask, and discover in a new environment. These outings add freshness to learning and expand understanding beyond the textbook.",
      "Field trips also encourage curiosity, group responsibility, and practical awareness, making them an important part of a well-rounded school experience."
    ],
    highlights: [
      "Experiential learning outside the classroom",
      "Builds curiosity through observation and discovery",
      "Encourages group responsibility and participation",
      "Creates memorable exposure linked to learning"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof5.jpg",
    imageAlt: "Student field trip and exploration collage",
    imageFit: "contain"
  },
  {
    section: "activities",
    slug: "co-curricular-activities",
    label: "Co-Curricular Activities",
    title: "Co-Curricular Activities",
    intro:
      "Co-curricular activities help students discover interests, build confidence, and express themselves beyond regular academic work.",
    paragraphs: [
      "Music, cultural programs, stage participation, club-style activities, and school celebrations give children opportunities to grow socially and creatively. They learn to collaborate, prepare, and present with confidence.",
      "These experiences make school life richer and often reveal talents that might stay hidden in a purely classroom-focused routine."
    ],
    highlights: [
      "Music, culture, and performance opportunities",
      "Confidence-building through participation and presentation",
      "Encourages creativity, teamwork, and expression",
      "Balances academic effort with joyful engagement"
    ],
    image: "/assets/hero/culture.jpg",
    imageAlt: "Students participating in co-curricular stage activity",
    imagePosition: "center 20%"
  }
];

export function getSectionGroup(section: string) {
  return sectionGroups.find((group) => group.slug === section);
}

export function getSectionPages(section: string) {
  return sectionPages.filter((page) => page.section === section);
}

export function getSectionPage(section: string, slug: string) {
  return sectionPages.find((page) => page.section === section && page.slug === slug);
}

export function getSectionPath(section: string, slug: string) {
  return `/${section}/${slug}`;
}

export function getSectionHref(section: string) {
  const firstPage = getSectionPages(section)[0];

  return firstPage ? getSectionPath(firstPage.section, firstPage.slug) : "/";
}
