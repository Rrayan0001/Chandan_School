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

export type SectionPage = {
  section: SectionKey;
  slug: string;
  label: string;
  title: string;
  intro: string;
  paragraphs: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
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
      "Chandan School is a disciplined and child-centered learning community built to help students grow in academics, confidence, and character.",
    paragraphs: [
      "Established under Chandan Education Society, the school serves families who want strong classroom foundations along with a value-based environment. The campus atmosphere is purposeful, caring, and structured so children feel guided from the moment they step inside.",
      "From Nursery to Grade 10, the focus stays on steady academic progress, spoken communication, respectful conduct, and opportunities for students to participate in school life with confidence."
    ],
    highlights: [
      "Welcoming campus for Nursery to Grade 10",
      "Value-based learning with disciplined routines",
      "Balanced focus on academics, communication, and character",
      "Supportive school culture under Chandan Education Society"
    ],
    image: "/assets/hero/campus-front.jpg",
    imageAlt: "Front view of the Chandan School campus",
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
      "Holistic growth through classroom and co-curricular exposure"
    ],
    image: "/assets/hero/classroom.jpg",
    imageAlt: "Students learning in a classroom setting",
    imagePosition: "right 18%"
  },
  {
    section: "about-us",
    slug: "chairmans-message",
    label: "Chairman's Message",
    title: "Chairman's Message",
    intro:
      "Every school journey becomes meaningful when education is shaped by purpose, discipline, and concern for the child's future.",
    paragraphs: [
      "The leadership vision behind Chandan School is to make quality education accessible in a setting where values are lived every day. Academic excellence matters, but it is strengthened when students also learn humility, persistence, and service.",
      "The institution continues to invest in a culture where teachers, parents, and management work together so that each child receives direction, encouragement, and the confidence to aim higher."
    ],
    highlights: [
      "Education with character at the center",
      "Long-term focus on student growth and responsibility",
      "Partnership between management, teachers, and parents",
      "Commitment to quality learning in a disciplined environment"
    ],
    image: "/assets/sections/chairman.jpg",
    imageAlt: "Leadership collage from the school prospectus",
    imageFit: "contain",
    callout: {
      title: "Leadership Note",
      body:
        "Chandan School continues to grow with the belief that a child's education should strengthen both intellect and values."
    }
  },
  {
    section: "about-us",
    slug: "principals-message",
    label: "Principal's Message",
    title: "Principal's Message",
    intro:
      "A good school day is built on discipline, warmth, clear routines, and a belief that every child can improve with guidance.",
    paragraphs: [
      "At Chandan School, daily learning is shaped through focused classroom instruction, regular assessment, and a school culture that encourages punctuality, presentation, and participation. Students are expected to work sincerely, and teachers support them with patient guidance.",
      "We believe children do their best when school and home move in the same direction. Open communication with parents and close attention to each student's progress help create that shared path."
    ],
    highlights: [
      "Consistent focus on discipline and care",
      "Teacher guidance that supports steady improvement",
      "Parent-school partnership for better outcomes",
      "A campus culture that builds confidence and responsibility"
    ],
    image: "/assets/sections/classroom-activity.jpg",
    imageAlt: "Students engaged in classroom activity",
    imagePosition: "center 35%",
    callout: {
      title: "From the Principal's Desk",
      body:
        "Children flourish when encouragement and expectations move together, and that balance remains central to school life."
    }
  },
  {
    section: "about-us",
    slug: "school-management",
    label: "School Management",
    title: "School Management",
    intro:
      "The management team provides the direction, continuity, and support that help the school maintain quality across academics, operations, and student welfare.",
    paragraphs: [
      "School management oversees long-term planning, staff support, infrastructure improvement, and the systems that keep daily school life smooth and organized. This steady oversight creates confidence for both families and faculty.",
      "By combining institutional vision with practical campus support, the management helps ensure that students learn in a safe environment with clear expectations and meaningful opportunities."
    ],
    highlights: [
      "Steady leadership and institutional planning",
      "Support for academics, staffing, and campus development",
      "Attention to student welfare and school culture",
      "Clear systems that help daily operations run smoothly"
    ],
    image: "/assets/gallery/School-chandan-Prospectus-proof4.jpg",
    imageAlt: "Leadership and guest interactions featured by the school",
    imageFit: "contain"
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
    image: "/assets/hero/campus-front.jpg",
    imageAlt: "Students in front of the school campus",
    imagePosition: "center 58%"
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
    section: "academics",
    slug: "faculty",
    label: "Faculty",
    title: "Faculty",
    intro:
      "A committed faculty team is one of the school's strongest assets, guiding students with subject knowledge, patience, and personal attention.",
    paragraphs: [
      "Teachers at Chandan School focus on clarity, consistency, and classroom discipline. Their role goes beyond delivering lessons - they help students ask questions, correct mistakes, and build confidence step by step.",
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
    image: "/assets/hero/classroom.jpg",
    imageAlt: "Students in a structured learning environment"
  },
  {
    section: "academics",
    slug: "teaching-learning",
    label: "Teaching & Learning",
    title: "Teaching & Learning",
    intro:
      "Teaching at Chandan School combines explanation, practice, participation, and reinforcement so students learn with understanding.",
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
    image: "/assets/sections/classroom-activity.jpg",
    imageAlt: "Students participating in active learning",
    imagePosition: "center 32%"
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
    image: "/assets/hero/campus-front.jpg",
    imageAlt: "School building front view for administrative support"
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
    image: "/assets/gallery/School-chandan-Prospectus-proof8.jpg",
    imageAlt: "Student life collage from the school gallery",
    imageFit: "contain"
  },
  {
    section: "student-corner",
    slug: "achievements",
    label: "Achievements",
    title: "Achievements",
    intro:
      "Student achievements at Chandan School reflect hard work, teacher support, and a culture that encourages every child to participate and improve.",
    paragraphs: [
      "The school celebrates academic performance, cultural participation, leadership roles, and recognition earned through competitions and public events. Achievement is seen not only in final results but also in effort, growth, and confidence.",
      "By giving students opportunities to perform, present, compete, and represent the school, Chandan helps young learners discover their strengths and carry them forward with pride."
    ],
    highlights: [
      "Recognition in academics and school events",
      "Platform for leadership, performance, and participation",
      "Encouragement for student confidence and self-expression",
      "A culture that values progress as well as outcomes"
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
    image: "/assets/hero/classroom.jpg",
    imageAlt: "Students focused during classroom instruction",
    imagePosition: "right 16%"
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
    image: "/assets/sections/annual-day.jpg",
    imageAlt: "Students performing during a school event",
    imagePosition: "center 35%"
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
      "At Chandan School, the library supports both academic preparation and personal reading, helping students become more thoughtful and self-directed learners."
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
    imageAlt: "Science lab learning at Chandan School",
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
    image: "/assets/gallery/School-chandan-Prospectus-proof5.jpg",
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
    image: "/assets/sections/classroom-activity.jpg",
    imageAlt: "Students engaged in activity-based learning",
    imagePosition: "center 33%"
  },
  {
    section: "features",
    slug: "robotics-lab",
    label: "Robotics Lab",
    title: "Robotics Lab",
    intro:
      "Innovation spaces like the robotics lab open a door to experimentation, creativity, and future-ready thinking.",
    paragraphs: [
      "Robotics-inspired learning encourages students to observe, build, test, and improve ideas. It develops patience, teamwork, and the willingness to learn by trying something new.",
      "Even at an early level, this type of exposure helps children see that science and technology can be active, creative, and exciting."
    ],
    highlights: [
      "Encourages experimentation and innovation",
      "Supports teamwork, logic, and problem solving",
      "Builds confidence through making and testing",
      "Future-facing exposure beyond textbook learning"
    ],
    image: "/assets/sections/science-lab.jpg",
    imageAlt: "Practical lab-based learning environment",
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
    imagePosition: "center 72%"
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
    image: "/assets/gallery/School-chandan-Prospectus-proof9.jpg",
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
    image: "/assets/sections/annual-day.jpg",
    imageAlt: "Students participating in co-curricular stage activity",
    imagePosition: "center 35%"
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
