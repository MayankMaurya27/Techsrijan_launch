export interface Dignitary {
  id: string;
  name: string;
  role: string;
  organization: string;
  photoUrl: string;
  badge?: string;
  bio?: string;
}

export const DIGNITARIES: Dignitary[] = [
  {
    id: '1',
    name: 'Dr. Rabesh Kumar Singh',
    role: 'Faculty Advisor',
    organization: 'SAE Collegiate Club, MMMUT Chapter',
    photoUrl: '/faculty/rabesh-kumar-singh.png',
    bio: 'Faculty Advisor guiding SAE Collegiate Club, MMMUT Chapter in automotive design, mechanical innovation, and student vehicle projects.',
  },
  {
    id: '2',
    name: 'Dr. Dheerendra Singh',
    role: 'Faculty Advisor',
    organization: 'SAE Collegiate Club, MMMUT Chapter',
    photoUrl: '/faculty/dheerendra-singh.png',
    bio: 'Faculty Advisor driving engineering excellence, motorsport competitions, and fabrication initiatives at SAE Collegiate Club.',
  },
  {
    id: '3',
    name: 'Dr. Shikha Singh',
    role: 'Faculty Counsellor',
    organization: 'IEEE - STB MMMUT',
    photoUrl: '/faculty/shikha-singh.png',
    bio: 'Faculty Counsellor steering the IEEE Student Branch at MMMUT, mentoring technical research, and student chapter initiatives.',
  },
  {
    id: '4',
    name: 'Prof. Prabhakar Tiwari',
    role: 'Faculty Advisor',
    organization: 'IEEE - STB MMMUT',
    photoUrl: '/faculty/prabhakar-tiwari.png',
    bio: 'Faculty Advisor supporting IEEE - STB MMMUT, promoting cutting-edge technology symposia, research papers, and technical projects.',
  },
  {
    id: '5',
    badge: 'CHIEF GUEST',
    name: 'Shri Chandra Prakash Priyadarshi',
    role: 'Registrar',
    organization: 'MMMUT, Gorakhpur',
    photoUrl: '/faculty/chandra-prakash-priyadarshi.png',
    bio: 'Registrar of Madan Mohan Malaviya University of Technology, Gorakhpur. Pillar of university administration and patron of student activities.',
  },
  {
    id: '6',
    badge: 'CHIEF PATRON',
    name: 'Prof. Anupama Kaushik Sharma',
    role: 'Vice Chancellor',
    organization: 'MMMUT, Gorakhpur',
    photoUrl: '/faculty/anupama-kaushik-sharma.png',
    bio: 'Vice Chancellor of Madan Mohan Malaviya University of Technology, Gorakhpur. Chief Patron guiding the university towards global technological and academic stature.',
  },
  {
    id: '7',
    name: 'Dr. Rajan Mishra',
    role: 'Chairman',
    organization: 'Council of Student Activities',
    photoUrl: '/faculty/rajan-mishra.png',
    bio: 'Chairman of Council of Student Activities (CSA), overseeing university student governance, cultural forums, and technical fests.',
  },
  {
    id: '8',
    name: 'Dr. Pallav Gupta',
    role: 'Faculty Advisor',
    organization: 'Technical Sub Council',
    photoUrl: '/faculty/pallav-gupta.png',
    bio: 'Faculty Advisor of Technical Sub Council (TSC), driving university-wide technical events, workshops, hackathons, and competitions.',
  },
  {
    id: '9',
    name: 'Dr. Ajeet Kumar',
    role: 'Faculty Incharge',
    organization: 'TechSrijan',
    photoUrl: '/faculty/ajeet-kumar.png',
    bio: 'Faculty Incharge of TechSrijan, organizing and mentoring student conveners for the annual flagship technical festival.',
  },
  {
    id: '10',
    name: 'Dr. Anil Kumar Pal',
    role: 'Faculty Incharge',
    organization: 'TechSrijan',
    photoUrl: '/faculty/anil-kumar-pal.png',
    bio: 'Faculty Incharge of TechSrijan, leading event execution, coding competitions, robotics challenges, and guest lectures.',
  },
  {
    id: '11',
    name: 'Dr. Alok Kumar Shukla',
    role: 'Faculty Incharge',
    organization: 'TechSrijan',
    photoUrl: '/faculty/alok-kumar-shukla.png',
    bio: 'Faculty Incharge of TechSrijan, coordinating operations, student partnerships, and technical showcases.',
  },
];
