export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export const leadershipTeam: TeamMember[] = [
  { name: 'Yuvraj Bharadia', role: 'President' },
  { name: 'Jash Jain', role: 'President' },
  { name: 'Tara Vishwakarthik', role: 'Vice President' },
];

export const executiveTeam: TeamMember[] = [
  { name: 'TBA', role: 'Head of Events' },
  { name: 'TBA', role: 'Deputy Head of Events' },
  { name: 'TBA', role: 'Head of Media' },
  { name: 'TBA', role: 'Deputy Head of Media' },
];
