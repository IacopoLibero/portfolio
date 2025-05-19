import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Iacopo Libero",
  lastName: "Bernabei",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Developer and Cybersecurity expert",
  avatar: "/images/avatar.jpg",
  email: "iacopoliberolavoro@gmail.com",
  location: "Europe/Rome", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Italian", "English"], // optional: Leave the array empty if you don't want to display languages
  phone: "+393459488277",
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/IacopoLibero",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/iacopolibero/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
  {
    name: "Phone",
    icon: "phone",
    link: `tel:${person.phone}`,
  }
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building tomorrow's security through today's code.</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Ec(h)o d'arte</strong></>,
    href: "/work/echo_arte",
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role.toLowerCase()} <br /> focused on building secure
      web applications and protecting digital assets.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  cv: {
    display: true,
    link: "/CV - Iacopo Libero Bernabei.pdf",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        As a passionate web developer and cybersecurity specialist, I thrive at the intersection of creative development and robust security implementation.
        <br /><br />
        My technical foundation encompasses full-stack development with JavaScript, HTML5, PHP, CSS, Java, and SQL, complemented by specialized knowledge in network security and data protection.
        <br /><br />
        Currently advancing my expertise through an IFTS specialization in "Network Security and Data Protection Management," I'm continuously expanding my proficiency in ethical hacking, digital forensics, cryptography, and incident response protocols.
        <br /><br />
        With a methodical approach to complex challenges and an insatiable curiosity for emerging technologies, I transform requirements into elegant, secure, and scalable solutions while constantly evolving my technical repertoire.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Freelance Web developer",
        timeframe: "2024 - Present",
        role: "Full-stack Developer",
        achievements: [
          <>
            Continuously expanding my skill set in web development, with a focus on modern frameworks, responsive design, and secure application architecture.
          </>,
          <>
            Enhancing my expertise in cybersecurity through practical applications, including penetration testing, vulnerability assessments, and implementing robust security protocols.
          </>,
          <>
            Steadily building a diverse portfolio of projects that demonstrate my evolving capabilities in both front-end and back-end development.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          /*
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
          */
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "University of Florence",
        timeframe: "2024 - ongoing",
        description: <>Followed a IFTS specialization as a "Network Security and Data Protection Manager"</>,
      },
      {
        name: "ITIS A. Meucci Florence",
        timeframe: "2021 - 2024",
        description: <>Graduated with a diploma in Computer Science</>,
      },
    ],
  },
  technical: {
    display: false,
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `My school and personal projects`,
  description: `Explore my projects and see what I've been working on`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

const certifications = {
  path: "/certifications",
  label: "Certifications",
  title: `My Certifications`,
  description: `Professional certifications and achievements`,
  certifications: [
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco",
      date: "2025-05-06",
      displayDate: "May 2025",
      showDate: true,
      description: "This course provides a comprehensive introduction to the field of cybersecurity, covering essential concepts and practices.",
      image: "/images/certifications/introduction-to-cybersecurity.png",
      credlyBadgeId: "980c5a24-dd6c-400c-88d6-bbd0e3237e64"
    },
    {
      title: "Hack the Code Challenge",
      issuer: "Reply",
      date: "2025-03-12",
      displayDate: "March 2025",
      showDate: true,
      description: "This competition challenged participants to solve complex coding problems and to resolve some CTF.",
      image: "/images/certifications/reply_challenge.png"
    },
    {
      title: "Python Essentials 1",
      issuer: "Cisco",
      date: "2025-05-19",
      displayDate: "May 2025",
      showDate: true,
      description: "This course covers the fundamentals of Python programming, including data types, control structures, and functions.",
      image: "/images/certifications/python-essentials-1.1.png",
      credlyBadgeId: "b1008665-0d62-4842-b2c8-6bfe6adcfd5f"
    }
  ]
};

const contactMe = {
  path: "/contact-me",
  label: "Contact Me",
  title: `Let's work together`,
  description: `Fill out the form below and I'll get back to you as soon as possible.`,
};

export { person, social, newsletter, home, about, blog, work, gallery, certifications, contactMe };
