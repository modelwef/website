export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export const leadershipTeam: TeamMember[] = [
  { name: 'Yuvraj Bharadia', role: 'President', image: '/placeholder.svg' },
  { name: 'Jash Jain', role: 'President', image: '/placeholder.svg' },
  { name: 'Tara Vishwakarthik', role: 'Vice President', image: '/placeholder.svg' },
];

export const executiveTeam: TeamMember[] = [
  { name: 'TBA', role: 'Head of Events', image: '/placeholder.svg' },
  { name: 'TBA', role: 'Deputy Head of Events', image: '/placeholder.svg' },
  { name: 'TBA', role: 'Head of Media', image: '/placeholder.svg' },
  { name: 'TBA', role: 'Deputy Head of Media', image: '/placeholder.svg' },
  { name: 'TBA', role: 'Head of Finance', image: '/placeholder.svg' },
  { name: 'TBA', role: 'Head of Logistics', image: '/placeholder.svg' },
];

// Combined list for carousel display
export const allSecretariat: TeamMember[] = [
  ...leadershipTeam,
  ...executiveTeam,
];
