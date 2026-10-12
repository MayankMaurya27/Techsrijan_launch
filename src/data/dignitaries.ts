export interface Dignitary {
  id: string;
  name: string;
  role: string;
  organization: string;
  silhouetteType: 'male' | 'female' | 'glasses';
  photoUrl?: string;
  bio?: string;
  badge?: string;
}

export const DIGNITARIES: Dignitary[] = [
  {
    id: '1',
    name: 'Dr. Rakesh Kumar Singh',
    role: 'Faculty Advisor',
    organization: 'SAE Collegiate Club, MMMUT',
    silhouetteType: 'male',
    bio: 'Dedicated faculty advisor driving innovation, automotive engineering, and national collegiate competitions at SAE MMMUT.',
    badge: 'SAE'
  },
  {
    id: '2',
    name: 'Dr. Dheerendra Singh',
    role: 'Faculty Advisor',
    organization: 'SAE Collegiate Club, MMMUT',
    silhouetteType: 'male',
    bio: 'Mentoring student engineers to excel in mechanical design, motorsport fabrication, and aerospace research initiatives.',
    badge: 'SAE'
  },
  {
    id: '3',
    name: 'Dr. Shikha Singh',
    role: 'Faculty Counselor',
    organization: 'IEEE - STB, MMMUT',
    silhouetteType: 'female',
    bio: 'Guiding global IEEE student chapter initiatives, international conferences, and technical student empowerment at MMMUT.',
    badge: 'IEEE'
  },
  {
    id: '4',
    name: 'Prof. Prakshat Tiwari',
    role: 'Faculty Advisor',
    organization: 'IEEE - STB, MMMUT',
    silhouetteType: 'female',
    bio: 'Promoting excellence in cutting-edge computing, electrical innovations, and technical symposia.',
    badge: 'IEEE'
  },
  {
    id: '5',
    name: 'Shri Chandra Shekhar',
    role: 'Registrar',
    organization: 'MMMUT, Gorakhpur',
    silhouetteType: 'male',
    bio: 'Pillar of university administration, facilitating youth leadership and university-wide cultural and tech festivals.',
    badge: 'MMMUT'
  },
  {
    id: '6',
    name: 'Prof. Anupama Kaushal',
    role: 'Vice Chancellor',
    organization: 'MMMUT, Gorakhpur',
    silhouetteType: 'female',
    bio: 'Visionary leadership steering Madan Mohan Malaviya University of Technology towards global academic and technological excellence.',
    badge: 'Patron'
  },
  {
    id: '7',
    name: 'Dr. Brahma Mohan',
    role: 'Chief Guest',
    organization: 'Council of Student Activities',
    silhouetteType: 'male',
    bio: 'Eminent leader inspiring students to push frontiers of engineering and technological innovation.',
    badge: 'CSA'
  },
  {
    id: '8',
    name: 'Dr. Biplav Mishra',
    role: 'Faculty Advisor',
    organization: 'Council of Student Activities',
    silhouetteType: 'female',
    bio: 'Guiding campus-wide student bodies, cultural development, and flagship annual university tech fests.',
    badge: 'CSA'
  },
  {
    id: '9',
    name: 'Dr. Apilay Gupta',
    role: 'Faculty Advisor',
    organization: 'Technical Sub Council',
    silhouetteType: 'female',
    bio: 'Spearheading Technical Sub Council activities, hackathons, and high-tech workshops across all branches.',
    badge: 'TSC'
  },
  {
    id: '10',
    name: 'Dr. Anil Kumar Pal',
    role: 'Faculty Incharge',
    organization: 'TechSrijan',
    silhouetteType: 'glasses',
    bio: 'Leading the flagship annual technical festival TechSRIJAN, championing innovation, robotics, and coding.',
    badge: 'TechSRIJAN'
  },
  {
    id: '11',
    name: 'Dr. Alok Kumar Shukla',
    role: 'Faculty Incharge',
    organization: 'TechSrijan',
    silhouetteType: 'male',
    bio: 'Guiding student conveners, organizing committee, sponsorships, and grand national events for TechSRIJAN.',
    badge: 'TechSRIJAN'
  },
];
