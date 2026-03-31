const person = {
  firstName: "Iacopo Libero",
  lastName: "Bernabei",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full-Stack Web Developer & Cybersecurity Expert",
  avatar: "/images/avatar.webp",
  email: "iacopoliberolavoro@gmail.com",
  location: "Florence, Italy",
  timezone: "Europe/Rome", // IANA time zone identifier
  languages: ["Italian", "English"], // optional: Leave the array empty if you don't want to display languages
  phone: "+393459488277",
};

const baseKeywords = [
  // Name variants
  "Iacopo Libero Bernabei",
  "Iacopo Libero",
  "Bernabei",
  "jacopo libero bernabei",
  "jacopo libero",
  // Role — English
  "web developer",
  "full-stack developer",
  "full stack web developer",
  "frontend developer",
  "backend developer",
  "Next.js developer",
  "React developer",
  "Node.js developer",
  "cybersecurity expert",
  "cybersecurity specialist",
  "cybersecurity consultant",
  "security engineer",
  "penetration tester",
  "ethical hacker",
  "freelance web developer",
  "freelance developer",
  // Role — Italian
  "sviluppatore web",
  "sviluppatore full-stack",
  "esperto cybersecurity",
  "esperto sicurezza informatica",
  "consulente cybersecurity",
  "programmatore web",
  // Location
  "Florence",
  "Firenze",
  "Italy",
  "Italia",
  "web developer Florence",
  "web developer Firenze",
  "web developer Italy",
  "sviluppatore web Firenze",
  // General
  "portfolio",
  "programming",
];

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
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
  image: "/images/og/home.png",
  label: "Home",
  title: `Iacopo Libero Bernabei | Full-Stack Web Developer & Cybersecurity Expert`,
  keywords: [...baseKeywords],
  description: `Iacopo Libero Bernabei is a full-stack web developer and cybersecurity expert based in Florence, Italy. Available for freelance projects worldwide — web apps, security audits, and IT consulting.`,
  headline: <>Building tomorrow&apos;s security through today&apos;s code.</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Easy Restaurant</strong></>,
    href: "/work/easy-restaurant",
  }, subline: (
    <>
      I&apos;m {person.firstName}, a {person.role.toLowerCase()} <br /> focused on building secure
      web applications and protecting digital assets.
    </>
  ),
};

const about = {
  path: "/about",
  image: "/images/og/about.png",
  label: "About",
  title: `Iacopo Libero Bernabei | Web Developer & Cybersecurity Expert | About`,
  keywords: [...baseKeywords, "about", "bio", "curriculum vitae", "hire", "available for work"],
  description: `Iacopo Libero Bernabei — full-stack web developer and cybersecurity expert based in Florence, Italy. Available for freelance and remote work worldwide. Skills: Next.js, React, Node.js, penetration testing, security audits.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  cv: {
    display: true,
    link: "/cv/cv_iacopo.html",
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
        Currently advancing my expertise through an IFTS specialization in &ldquo;Network Security and Data Protection Management,&rdquo; I&apos;m continuously expanding my proficiency in ethical hacking, digital forensics, cryptography, and incident response protocols.
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
        company: "NEBOOLA S.R.L.",
        timeframe: "05/2025 - 07/2025",
        role: "Internship",
        achievements: [
          <>
            I&apos;ve done an internship at Neboola S.R.L., where I am applying my skills in cloud infrastructure and cybersecurity to real-world projects.
          </>,
          <>
            Gained hands-on experience with infrastructure as code using Terraform, automated configuration management with Ansible, and container orchestration fundamentals with Kubernetes.
          </>,
          <>
            Collaborated with a team of experienced professionals, enhancing my understanding of cloud security best practices and incident response strategies.
          </>
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
      }

    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "University of Florence",
        timeframe: "2024 - 2025",
        description: <>Completed an IFTS specialization as <strong>&ldquo;Network Security and Data Protection Manager&rdquo;</strong> — mastering ethical hacking, digital forensics, cryptography, and incident response in a hands-on, industry-focused program.</>,
      },
      {
        name: "ITIS A. Meucci Florence",
        timeframe: "2021 - 2024",
        description: <>Graduated with honors in <strong>Computer Science</strong> — building a solid foundation in programming, algorithms, databases, and software engineering principles.</>,
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
  image: "/images/og/home.png",
  keywords: [...baseKeywords, "blog", "articles", "tech writing"],
  label: "Blog",
  title: `Blog | Tech & Cybersecurity by Iacopo Libero Bernabei`,
  description: `Read articles by Iacopo Libero Bernabei about web development, cybersecurity trends, and lessons learned from building secure full-stack applications.`,
  heading: `My Blog`,
  subheading: `Read my articles about web development, cybersecurity and trends`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  image: "/images/og/work.png",
  label: "Work",
  keywords: [...baseKeywords, "projects", "Next.js", "React", "web applications", "security"],
  title: `Projects | Iacopo Libero Bernabei | Web & Security`,
  description: `Browse projects by Iacopo Libero Bernabei, from modern web applications built with Next.js and React to cybersecurity tools and network security solutions.`,
  heading: `My Projects`,
  subheading: `Explore my projects and see what I've been working on`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  image: "/images/og/home.png",
  label: "Gallery",
  keywords: [...baseKeywords, "gallery", "photos"],
  title: `Photo Gallery | Iacopo Libero Bernabei Portfolio`,
  description: `A curated photo collection by Iacopo Libero Bernabei showcasing moments from events, travels, and the creative side of a developer's life in Italy.`,
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
  image: "/images/og/certifications.png",
  label: "Certifications",
  keywords: [...baseKeywords, "certifications", "Cisco", "credentials", "badges"],
  title: `Certifications | Iacopo Libero Bernabei`,
  description: `View professional certifications earned by Iacopo Libero Bernabei, including Cisco cybersecurity, Python programming, and digital security credentials.`,
  heading: `My Certifications`,
  subheading: `Professional certifications and achievements`,
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
    },
    {
      title: "Computer Hardware Basics",
      issuer: "Cisco",
      date: "2025-05-20",
      displayDate: "May 2025",
      showDate: true,
      description: "This course provides an overview of computer hardware components, their functions, and how they interact with software.",
      image: "/images/certifications/computer-hardware-basics.png",
      credlyBadgeId: "562250c7-cf17-4396-8155-75565577a717"
    },
    {
      title: "Digital Safety and Security Awareness",
      issuer: "Cisco",
      date: "2025-05-20",
      displayDate: "May 2025",
      showDate: true,
      description: "This course covers the importance of digital safety and security, including best practices for protecting personal information online.",
      image: "/images/certifications/digital-safety-and-security-awareness.png",
      credlyBadgeId: "dd020248-513e-4e87-9c39-9a88c7bcb6b5"
    },
    {
      title: "English for IT 1",
      issuer: "Cisco",
      date: "2025-05-20",
      displayDate: "May 2025",
      showDate: true,
      description: "This course focuses on English language skills for IT professionals, including technical vocabulary and communication strategies.",
      image: "/images/certifications/english-for-it-1.png",
      credlyBadgeId: "181b40da-b8f1-409b-9585-10402dfbe04f"
    },
    {
      title: "English for IT 2",
      issuer: "Cisco",
      date: "2025-05-20",
      displayDate: "May 2025",
      showDate: true,
      description: "This course builds on English for IT 1, further developing language skills for IT professionals.",
      image: "/images/certifications/english-for-it-2.png",
      credlyBadgeId: "4ca9fa82-90da-4a79-b0ee-422672822d65"
    }
  ]
};

const contactMe = {
  image: "/images/og/contact.png",
  keywords: [...baseKeywords, "contact", "hire", "freelance", "quote"],
  path: "/contact-me",
  label: "Contact Me",
  title: `Let's Work Together | Contact Iacopo Libero Bernabei`,
  description: `Get in touch with Iacopo Libero Bernabei for web development projects, cybersecurity consulting, or IT support. Fill out the form and I'll respond promptly.`,
  heading: `Let's work together`,
  subheading: `Fill out the form below and I'll get back to you as soon as possible.`,
};

const services = {
  image: "/images/og/services.png",
  keywords: [...baseKeywords, "services", "web development", "cybersecurity consulting", "IT support", "Next.js", "React"],
  title: `Services | Web Development & Cybersecurity – Iacopo`,
  heading: <>What I like to work on <br /> (and I&apos;m good at)</>,
  label: "Services",
  path: "/services",
  description: "Explore web development, cybersecurity consulting, and IT support services by Iacopo Libero Bernabei — full-stack developer based in Florence, Italy.",
  items: [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies like Next.js, React, and Node.js. From simple landing pages to complex platforms.",
      images: [
        {
          src: "/images/services/web_development.png",
          alt: "Web Development",
          width: 16,
          height: 9,
        }
      ]
    },
    {
      title: "Cybersecurity Consulting",
      description: "Vulnerability assessments, penetration testing, and security audits to protect your digital assets and ensure compliance with best practices.",
      images: [
        {
          src: "/images/services/cybersecurity.png",
          alt: "Cybersecurity",
          width: 16,
          height: 9,
        }
      ]
    },
    {
      title: "IT Support & Networking",
      description: "Network configuration, troubleshooting, and optimization. Secure your infrastructure and ensure reliable connectivity.",
      images: [
        {
          src: "/images/services/it_support.png",
          alt: "Networking",
          width: 16,
          height: 9,
        }
      ]
    }
  ]
};

export { person, social, newsletter, home, about, blog, work, gallery, certifications, contactMe, services };
