import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  next,
  figma,
  docker,
  postgresql,
  rubyrails,
  graphql,
  komikult,
  leaderboard,
  math,
  movie,
  nyeusi,
  coverhunt,
  dcc,
  kelhel,
  microverse,
  map,
  whats,
  py,
  drf
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Full Stack Developer',
    icon: frontend,
  },
  {
    title: 'Application Developer',
    icon: backend,
  },
  {
    title: 'Database Management',
    icon: ux,
  },
  {
    title: 'Project Management',
    icon: prototyping,
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Next JS',
    icon: next,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'React Native',
    icon: rubyrails,
  },
  {
    name: 'Mysql',
    icon: postgresql,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
  {
    name: 'Python',
    icon: py,
  },
  {
    name: 'Django',
    icon: drf,
  },

];

const experiences = [
  {
    title: 'Front-End Developer',
    company_name: 'Softpro India Pvt Lmt ',
    icon: coverhunt,
    iconBg: '#333333',
    date: 'July 2021 - Sep 2021',
  },
  {
    title: 'Back-End Developer',
    company_name: 'Techpile Technology Pvt Lmt',
    icon: microverse,
    iconBg: '#333333',
    date: 'Mar 2022 - May 2022',
  },
  {
    title: 'MERN Stack Developer',
    company_name: 'Mecatredz Technology Pvt. Ltd',
    icon: kelhel,
    iconBg: '#333333',
    date: 'July 2023 - Oct 2023',
  },
  {
    title: 'FUll Stack Developer',
    company_name: 'Iconiq Oakmont (Tamilnadu)',
    icon: dcc,
    iconBg: '#333333',
    date: 'Nov 2023 – Apr 2024',
  },
  {
    title: 'App & FUll Stack Developer',
    company_name: 'Swapnil Software Pvt Ltd',
    icon: graphql,
    iconBg: '#333333',
    date: 'Apr 2024 – June 2025',
  },
  {
    title: 'MERN Stack Developer',
    company_name: 'Cogent Web Services (Noida)',
    icon: dcc,
    iconBg: '#333333',
    date: 'June 2025 – Dec 2025',
  },
];


const projects = [
  {
    id: 'project-1',
    name: 'Purodha LLP',
    description: 'A multi-user management system using MERN with roles: Admin, Branch, HR, and Account Associate. Features role-based access, data management, and security.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'Mysql',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: komikult,
    repo: 'https://github.com/durgeshkatyayan/communication',
    demo: 'https://onlinepurodha.in',
  },
  {
    id: 'project-2',
    name: 'UMCA Education',
    description:
      'A multi-user management system using MERN with roles: Admin, Franchise, User,Centered and Account Associate and This project offered online course with certificate and Online degree.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'Tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: leaderboard,
    repo: 'https://github.com/durgeshkatyayan/UMCA',
    demo: 'https://umcaeducation.org/',
  },
  {
    id: 'project-3',
    name: 'Prabhat India',
    description: 'This poject is related to weight bridge.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: math,
    repo: 'https://github.com/durgeshkatyayan/communication',
    demo: 'https://prabhatindia.in/',
  },
  {
    id: 'project-4',
    name: 'UMCA Studio',
    description: `This project is based on audition for acting ,dancing,modeling,singing.`,
    tags: [
      {
        name: 'React.js',
        color: 'blue-text-gradient',
      },
      {
        name: 'MongoDB',
        color: 'green-text-gradient',
      },
      {
        name: 'Tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: movie,
    repo: 'https://github.com/durgeshkatyayan/umca_studio',
    demo: 'https://umcastudio.com/',
  },

];

const project = [
  {
    id: 'project-1',
    name: 'Manavata Ak Pahchan',
    description:
      'This is an NGO project where describe our best experince with new feature.',
    tags: [
      {
        name: 'Next',
        color: 'black-text-green',
      },
      {
        name: 'supabase',
        color: 'green-blue-gradient',
      },
      {
        name: 'Tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image:map,
    repo: 'https://github.com/durgeshkatyayan',
    demo: 'https://manvataekpahchan.org/',
  },
  {
    id: 'project-2',
    name: 'Kanpuria Kalakar',
    description:
      'This is also NGO project of MLA.',
    tags: [
      {
        name: 'React',
        color: 'blue-text-gradient',
      },
      {
        name: 'Mysql',
        color: 'green-text-gradient',
      },
      {
        name: 'Node Express',
        color: 'pink-text-gradient',
      },
    ],
    image: nyeusi,
    repo: 'https://github.com/durgeshkatyayan',
    demo: 'https://kanpuriyakalakar.com/',
  },
  {
    id: 'project-3',
    name: 'Redbricks-Exam',
    description:
      'This project is besically based on handling exam .',
    tags: [
      {
        name: 'Next',
        color: 'blue-text-gradient',
      },
      {
        name: 'Mysql',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: whats,
    repo: 'https://github.com/durgeshkatyayan',
    demo: 'https://redbricks.net.in/',
  },
]
export { services, technologies, experiences, projects ,project};
