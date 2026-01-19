export interface Resource {
  title: string;
  description: string;
  fileType: string;
}

export const delegateResources: Resource[] = [
  {
    title: 'Conference Rules',
    description: 'Complete rules and procedures for the MWEF conference, including debate formats and scoring criteria.',
    fileType: 'PDF',
  },
  {
    title: 'Debate Handbook',
    description: 'Comprehensive guide to effective debate techniques, argumentation strategies, and economic reasoning.',
    fileType: 'PDF',
  },
  {
    title: 'Solution & Policy Handbook',
    description: 'Framework for developing and presenting economic policy proposals with real-world applicability.',
    fileType: 'PDF',
  },
  {
    title: 'Code of Conduct & Procedures',
    description: 'Behavioral expectations, dress code, and procedural guidelines for all delegates.',
    fileType: 'PDF',
  },
];
