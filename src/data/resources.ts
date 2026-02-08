export interface Resource {
  title: string;
  description: string;
  fileType: string;
  url?: string;
}

const resourceBaseUrl = 'https://modelwef.org/resources/pdfs';

export const delegateResources: Resource[] = [
  {
    title: 'Conference Rules',
    description: 'Complete rules and procedures for the MWEF conference, including debate formats and scoring criteria.',
    fileType: 'PDF',
    url: `${resourceBaseUrl}/conference-rules.pdf`,
  },
  {
    title: 'Debate Handbook',
    description: 'Comprehensive guide to effective debate techniques, argumentation strategies, and economic reasoning.',
    fileType: 'PDF',
    url: `${resourceBaseUrl}/debate-handbook.pdf`,
  },
  {
    title: 'Solution & Policy Handbook',
    description: 'Framework for developing and presenting economic policy proposals with real-world applicability.',
    fileType: 'PDF',
    url: `${resourceBaseUrl}/solution-policy-handbook.pdf`,
  },
  {
    title: 'Code of Conduct & Procedures',
    description: 'Behavioral expectations, dress code, and procedural guidelines for all delegates.',
    fileType: 'PDF',
    url: `${resourceBaseUrl}/code-of-conduct.pdf`,
  },
];
