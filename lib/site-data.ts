import { getSectionHref, getSectionPath, sectionPages } from "@/lib/subpage-data";

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export type HeroSlide = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  blurb: string;
  position?: string;
};

export type MediaCard = {
  title: string;
  image: string;
  alt: string;
  description: string;
  href: string;
};

export type FeatureCard = {
  code: string;
  title: string;
  description: string;
};

export type EventCard = {
  title: string;
  image: string;
  alt: string;
  description: string;
  href: string;
  position?: string;
};

export type GalleryImage = {
  title: string;
  caption: string;
  image: string;
  alt: string;
  position?: string;
};

function buildNavigationChildren(section: string): NavChild[] {
  return sectionPages
    .filter((page) => page.section === section)
    .map((page) => ({
      label: page.label,
      href: getSectionPath(page.section, page.slug)
    }));
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: getSectionHref("about-us"),
    children: buildNavigationChildren("about-us")
  },
  { label: "Mandatory Disclosure", href: "/#resources" },
  {
    label: "Academics",
    href: getSectionHref("academics"),
    children: buildNavigationChildren("academics")
  },
  {
    label: "Student Corner",
    href: getSectionHref("student-corner"),
    children: buildNavigationChildren("student-corner")
  },
  {
    label: "Features",
    href: getSectionHref("features"),
    children: buildNavigationChildren("features")
  },
  {
    label: "Activities",
    href: getSectionHref("activities"),
    children: buildNavigationChildren("activities")
  },
  { label: "Sports", href: "/#sports-wellness" },
  { label: "Resources", href: "/#resources" },
  { label: "Contact Us", href: "/#contact" }
];

export const heroSlides: HeroSlide[] = [
  {
    image: "/assets/hero/campus-front.jpg",
    alt: "Front view of Chandan School campus",
    title: "Admissions Open",
    subtitle: "Academic Year 2026–27",
    blurb:
      "A welcoming campus under Chandan Education Society, designed to help every learner grow with confidence and discipline.",
    position: "center 62%"
  },
  {
    image: "/assets/hero/transport.jpg",
    alt: "School transport and students on campus",
    title: "Safe & Reliable Transport",
    subtitle: "From Nursery to Grade 10",
    blurb:
      "Organized transport support and caring supervision help families feel secure every school day.",
    position: "center 40%"
  },
  {
    image: "/assets/hero/assembly.jpg",
    alt: "Students participating in school assembly",
    title: "Discipline • Knowledge • Values",
    subtitle: "Morning assembly, prayer, thought for the day, and student participation",
    blurb:
      "Each day begins with togetherness, leadership, and purposeful routines that shape character.",
    position: "center top"
  },
  {
    image: "/assets/hero/classroom.jpg",
    alt: "Teacher guiding students in the classroom",
    title: "Modern Learning Environment",
    subtitle: "Concept-based teaching with spoken English and student engagement",
    blurb:
      "Interactive classroom practice supports strong academics alongside communication and confidence.",
    position: "right 18%"
  },
  {
    image: "/assets/hero/culture.jpg",
    alt: "Students performing in a cultural program",
    title: "Encouraging Creativity",
    subtitle: "Music, annual day performances, public speaking, and cultural celebrations",
    blurb:
      "The school nurtures talent through stage exposure, arts, and opportunities for self-expression.",
    position: "center 20%"
  },
  {
    image: "/assets/hero/sports.jpg",
    alt: "Students participating in sports and yoga activities",
    title: "Sports & Physical Development",
    subtitle: "Fitness, teamwork, yoga, and outdoor games for holistic growth",
    blurb:
      "Physical education is built into campus life to develop strength, discipline, and team spirit.",
    position: "center 70%"
  }
];

export const videoPreviews: MediaCard[] = [
  {
    title: "School Campus Tour",
    image: "/assets/hero/campus-front.jpg",
    alt: "Campus tour preview",
    description:
      "A guided walk through the main school block, classrooms, learning spaces, and student facilities.",
    href: "#contact"
  },
  {
    title: "School Activities & Events",
    image: "/assets/sections/annual-day.jpg",
    alt: "School activities preview",
    description:
      "A documentary-style preview area for showcasing assemblies, cultural events, celebrations, and student life.",
    href: "#events"
  }
];

export const informationCards: MediaCard[] = [
  {
    title: "About Chandan School",
    image: "/assets/hero/campus-front.jpg",
    alt: "School building exterior",
    description:
      "Established in 2003, School Chandan blends disciplined CBSE academics with Indian values, leadership, and experiential learning so children grow in both knowledge and character.",
    href: "#about-school"
  },
  {
    title: "School Assembly",
    image: "/assets/hero/assembly.jpg",
    alt: "Morning assembly gathering",
    description:
      "Daily assembly gives students a platform for prayer, thought for the day, music, news reading, and confident public participation.",
    href: "#student-corner"
  }
];

export const academicResources: FeatureCard[] = [
  {
    code: "FD",
    title: "Faculty & Mentors",
    description:
      "A committed teaching team guides students with personal attention, discipline, and steady academic support."
  },
  {
    code: "EC",
    title: "Examination Curriculum",
    description:
      "CBSE-focused planning, concept clarity, and structured evaluation help students build strong academic foundations."
  },
  {
    code: "SH",
    title: "Syllabus & Holidays",
    description:
      "Student-friendly access to academic planning, school routines, holiday lists, and handbook information."
  },
  {
    code: "TC",
    title: "Certificates & Disclosures",
    description:
      "Transfer certificate guidance, school disclosure references, and key administrative information in one place."
  }
];

export const featureCards: FeatureCard[] = [
  {
    code: "LB",
    title: "Library",
    description:
      "A furnished library and reading culture that support curiosity, research habits, and independent study."
  },
  {
    code: "AS",
    title: "Assembly",
    description:
      "Creative assemblies build confidence through prayer, music, student anchoring, thought sharing, and teamwork."
  },
  {
    code: "SL",
    title: "Science Lab",
    description:
      "Hands-on exposure to scientific inquiry with practical demonstrations, observation, and exhibition culture."
  },
  {
    code: "CL",
    title: "Computer Lab",
    description:
      "Digital literacy, internet-enabled learning, and projector-assisted teaching strengthen modern classroom readiness."
  },
  {
    code: "ML",
    title: "Mathematics Lab",
    description:
      "Activity-based learning helps students understand mathematical concepts through exploration and visual practice."
  },
  {
    code: "RL",
    title: "Robotics Lab",
    description:
      "Innovation-driven learning encourages models, experimentation, and student imagination beyond textbook lessons."
  },
  {
    code: "DC",
    title: "Digital Classrooms",
    description:
      "Projector-supported instruction, spoken English sessions, and interactive teaching make lessons more engaging."
  },
  {
    code: "SG",
    title: "Sports Ground",
    description:
      "Outdoor play, yoga, and fitness-oriented routines promote teamwork, stamina, and healthy habits."
  }
];

export const eventCards: EventCard[] = [
  {
    title: "Investiture Ceremony",
    image: "/assets/gallery/School-chandan-Prospectus-proof4.jpg",
    alt: "Investiture and student leadership activities",
    description:
      "Leadership opportunities through student parliament, responsibility sharing, and public speaking traditions.",
    href: "/gallery",
    position: "center 40%"
  },
  {
    title: "Annual Day",
    image: "/assets/sections/annual-day.jpg",
    alt: "Students performing on annual day",
    description:
      "A vibrant showcase of music, dance, theatre, and cultural expression that celebrates every student's talent.",
    href: "/gallery",
    position: "center 35%"
  },
  {
    title: "Science Exhibition",
    image: "/assets/sections/science-lab.jpg",
    alt: "Students exploring science lab activities",
    description:
      "Practical experiments, demonstrations, and activity-based science learning inspire curiosity and innovation.",
    href: "/gallery",
    position: "center 30%"
  },
  {
    title: "Sports Day",
    image: "/assets/hero/sports.jpg",
    alt: "Students participating in sports day activities",
    description:
      "Sports, yoga, and playground activities nurture teamwork, perseverance, and joyful physical development.",
    href: "/gallery",
    position: "center 72%"
  }
];

export const galleryPreview: GalleryImage[] = [
  {
    title: "Campus Welcome",
    caption: "Front view of the campus and students entering the school day.",
    image: "/assets/hero/campus-front.jpg",
    alt: "Campus welcome view",
    position: "center 60%"
  },
  {
    title: "Morning Assembly",
    caption: "Large-scale assembly routines that cultivate discipline and togetherness.",
    image: "/assets/hero/assembly.jpg",
    alt: "Morning assembly",
    position: "center top"
  },
  {
    title: "Classroom Learning",
    caption: "Interactive classroom sessions with focused student participation.",
    image: "/assets/hero/classroom.jpg",
    alt: "Classroom learning",
    position: "right 18%"
  },
  {
    title: "Cultural Celebrations",
    caption: "Dance, stage events, and creative expression during annual functions.",
    image: "/assets/hero/culture.jpg",
    alt: "Cultural celebrations",
    position: "center 20%"
  },
  {
    title: "Science & Innovation",
    caption: "Activity-based lab learning and student exploration.",
    image: "/assets/sections/science-lab.jpg",
    alt: "Science and innovation",
    position: "center 30%"
  },
  {
    title: "Sports & Wellness",
    caption: "Yoga, games, and healthy routines as part of daily development.",
    image: "/assets/hero/sports.jpg",
    alt: "Sports and wellness",
    position: "center 72%"
  }
];

export const galleryPageImages: GalleryImage[] = [
  {
    title: "Prospectus Welcome",
    caption: "School entrance, school identity, and campus welcome imagery.",
    image: "/assets/gallery/School-chandan-Prospectus-proof.jpg",
    alt: "School prospectus welcome collage",
    position: "center 45%"
  },
  {
    title: "Introduction to Chandan",
    caption: "Campus overview, spoken English, curriculum, and school life highlights.",
    image: "/assets/gallery/School-chandan-Prospectus-proof2.jpg",
    alt: "Introduction to Chandan collage",
    position: "center 40%"
  },
  {
    title: "Residential & Cultural Life",
    caption: "Residential facilities, care, chanting, and community life on campus.",
    image: "/assets/gallery/School-chandan-Prospectus-proof3.jpg",
    alt: "Residential and cultural life collage",
    position: "center 42%"
  },
  {
    title: "Leadership & Special Features",
    caption: "Chandana Spandana, student parliament, and exposure to eminent personalities.",
    image: "/assets/gallery/School-chandan-Prospectus-proof4.jpg",
    alt: "Leadership and special features collage",
    position: "center 46%"
  },
  {
    title: "Assembly, Labs & Sports",
    caption: "Assembly, laboratory, library, computers, and sports-driven student learning.",
    image: "/assets/gallery/School-chandan-Prospectus-proof5.jpg",
    alt: "Assembly labs and sports collage",
    position: "center 48%"
  },
  {
    title: "Culture & Achievements",
    caption: "Hobbies, annual day programs, creativity, self-governance, and school achievements.",
    image: "/assets/gallery/School-chandan-Prospectus-proof6.jpg",
    alt: "Culture and achievements collage",
    position: "center 48%"
  },
  {
    title: "How We Make a Difference",
    caption: "Teacher support, admissions information, and structured student life at Chandan.",
    image: "/assets/gallery/School-chandan-Prospectus-proof7.jpg",
    alt: "School difference and admissions collage",
    position: "center 44%"
  },
  {
    title: "Photo Gallery",
    caption: "A broad collage of performances, celebrations, learning, and school events.",
    image: "/assets/gallery/School-chandan-Prospectus-proof8.jpg",
    alt: "Photo gallery collage",
    position: "center 40%"
  },
  {
    title: "Student Exploration",
    caption: "Memorable field-based exposure and student visits around aviation awareness.",
    image: "/assets/gallery/School-chandan-Prospectus-proof9.jpg",
    alt: "Student exploration collage",
    position: "center 50%"
  },
  {
    title: "Transport & Annual Celebrations",
    caption: "Transport facilities, gatherings, stage programs, and school community moments.",
    image: "/assets/gallery/School-chandan-Prospectus-proof10.jpg",
    alt: "Transport and annual celebrations collage",
    position: "center 42%"
  },
  {
    title: "Exposure & Campus Visits",
    caption: "Student interaction, experiential visits, and memorable institutional moments.",
    image: "/assets/gallery/School-chandan-Prospectus-proof11.jpg",
    alt: "Exposure and campus visits collage",
    position: "center 52%"
  }
];

export const contactDetails = {
  address:
    "Chandan School, Laxmeshwar, Dist. Gadag, Karnataka - 582116",
  phonePrimary: "09902256572",
  phoneSecondary: "9620641521",
  email: "schoolchandan@gmail.com",
  affiliation: "Affiliated to CBSE / State Board",
  locationLabel: "School Chandan, Laxmeshwar, Karnataka"
};
