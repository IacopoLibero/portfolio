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
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
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
    display: true, // set to false to hide this section
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
    display: true, // set to false to hide this section
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
  //TO DO
  technical: {
    display: false, // set to false to hide this section
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
        // optional: leave the array empty if you don't want to display images
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
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
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

export { person, social, newsletter, home, about, blog, work, gallery };
