export interface Committee {
  id: string;
  name: string;
  abbreviation: string;
  category: string;
  categoryShort: string;
  overview: string;
  issueAtHand?: string;
  abstract?: string;
  task?: string;
  tips?: string[];
  round1Info: string;
  round2Info: string;
}

export const committees: Committee[] = [
  {
    id: 'ges',
    name: 'Global Economic Strategy Forum',
    abbreviation: 'GES',
    category: 'Senior Category 1',
    categoryShort: 'Senior',
    overview: 'The Global Economic Strategy Forum (GES) focuses on long-term macroeconomic planning, global coordination, and strategic economic decision-making at the highest level. Delegates in this forum will engage with broad economic challenges that affect global growth, stability, and cooperation.',
    round1Info: 'Placeholder information to be released closer to the conference. Delegates will be introduced to overarching global economic challenges.',
    round2Info: 'Advanced strategic debate topics will be added later. This will be a debate on a certain policy implemented in the domain of that committee, and it will be a 5 (proposition) vs 5 (opposition) debate.',
  },
  {
    id: 'sdf',
    name: 'Sustainable Development Forum',
    abbreviation: 'SDF',
    category: 'Senior Category 2',
    categoryShort: 'Senior',
    overview: 'The Sustainable Development Forum addresses the critical intersection of economic growth and environmental sustainability, exploring how nations can balance development with ecological preservation.',
    issueAtHand: 'Each country in the world relies heavily on industries that harm the environment, yet provide crucial jobs and revenue for the economy.',
    abstract: 'Many economies rely on industries such as energy, manufacturing, mining, and agriculture to provide employment, income, and government revenue. These industries support livelihoods and help fund essential public services, making them central to economic stability.\n\nAt the same time, these industries contribute significantly to environmental damage through pollution, carbon emissions, and resource depletion. As production increases, environmental harm often increases as well. Over time, this damage can harm public health, reduce productivity, and increase climate-related economic risks.\n\nThis creates a difficult trade-off: protecting polluting industries supports short-term economic stability, but long-term environmental damage threatens future growth and resilience.',
    task: 'Create proposals for sustainable economic solutions that reduce environmental damage while balancing jobs, revenue, and economic growth.',
    tips: [
      'Research which industries contribute most to your country\'s GDP and employment',
      'Identify which sectors cause the most environmental damage and how',
      'Study existing environmental regulations, climate targets, or green policies',
      'Evaluate the economic costs and benefits of these policies (jobs, prices, investment)',
      'Pitch a new policy or improve an existing policy and create an economic evaluation of your proposed policy',
    ],
    round1Info: 'Delegates will address the challenge of balancing economic development with environmental sustainability.',
    round2Info: 'Policy debate on sustainable development measures - 5 vs 5 structured debate format.',
  },
  {
    id: 'cer',
    name: 'Corporate Ethics and Responsibility Panel',
    abbreviation: 'CER',
    category: 'Junior Category 1',
    categoryShort: 'Junior',
    overview: 'The Corporate Ethics and Responsibility Panel examines the role of businesses in society, focusing on fair wages, ethical practices, and corporate responsibility in a globalized economy.',
    issueAtHand: 'Many industries rely on low wages to remain competitive, but this limits workers\' living standards.',
    abstract: 'Low wages are often used by firms to reduce production costs, remain competitive in global markets, and attract investment. In labour-intensive industries, low labour costs can help keep unemployment low and encourage businesses to operate within a country. For governments, this can support exports and economic activity in the short term.\n\nHowever, low wages also have wider economic consequences. Workers with low incomes have limited purchasing power, which reduces consumer spending and weakens overall demand in the economy. Over time, low wages can increase poverty, reduce motivation and productivity, and limit investment in education and skills.\n\nGovernments and firms may fear that raising wages will cause companies to relocate to countries with cheaper labour, which would reduce employment opportunities, lower tax revenue, and weaken local economies.\n\nThis creates an economic trade-off between competitiveness and social welfare, where short-term cost advantages may undermine long-term economic development and stability.',
    task: 'Propose practical policies or corporate frameworks that improve worker welfare while maintaining economic competitiveness.',
    tips: [
      'Research average wages and cost of living in your country',
      'Identify industries most dependent on low-wage labour',
      'Study minimum wage laws or labour protections already in place',
      'Analyse how wage changes affect employment, consumer spending, and investment',
      'Prepare arguments showing both the risks and benefits of improving wages',
    ],
    round1Info: 'Delegates will examine wage policies and corporate responsibility from their assigned stakeholder perspective.',
    round2Info: 'Policy debate on corporate ethics measures - 5 vs 5 structured debate format.',
  },
  {
    id: 'ide',
    name: 'Innovation and Digital Economy Board',
    abbreviation: 'IDE',
    category: 'Junior Category 2',
    categoryShort: 'Junior',
    overview: 'The Innovation and Digital Economy Board explores the transformative impact of technology on labor markets, examining how automation and AI reshape employment opportunities.',
    issueAtHand: 'Automation and artificial intelligence are reducing demand for low-skill jobs.',
    abstract: 'Automation and artificial intelligence increase efficiency by allowing machines and software to perform tasks that were previously done by humans. This raises productivity, reduces costs for firms, and can support long-term economic growth. Many businesses adopt automation to stay competitive in global markets and respond to changing consumer demands.\n\nHowever, automation often replaces low-skill and routine jobs, particularly in sectors such as manufacturing, logistics, administration, and basic services. Workers who lose these jobs may struggle to transition into new roles due to skill mismatches, limited access to training, or financial constraints.\n\nIf large numbers of workers are displaced, unemployment and inequality can rise, reducing consumer spending and weakening economic stability.\n\nThis creates a structural challenge for modern economies: technological progress drives growth, but without effective adaptation policies, it can widen inequality and leave sections of the workforce behind.',
    task: 'Create proposals that protect workers while allowing innovation and productivity growth.',
    tips: [
      'Research how automation is affecting jobs in your country and which sectors are most exposed',
      'Identify groups most at risk (low-skill workers, youth, informal workers)',
      'Study existing education, training, or digital policies',
      'Evaluate how technology can create new jobs as well as replace old ones',
      'Prepare examples showing both risks and opportunities of automation',
    ],
    round1Info: 'Delegates will address the labor market challenges posed by technological advancement.',
    round2Info: 'Policy debate on digital economy measures - 5 vs 5 structured debate format.',
  },
  {
    id: 'fsmp',
    name: 'Financial Stability and Monetary Policy Group',
    abbreviation: 'FSMP',
    category: 'Senior Category 3',
    categoryShort: 'Senior',
    overview: 'The Financial Stability and Monetary Policy Group focuses on macroeconomic stability, examining how central banks and governments can manage inflation while supporting growth.',
    issueAtHand: 'Rising inflation is reducing purchasing power and creating economic instability.',
    abstract: 'Inflation occurs when prices rise faster than incomes, reducing the purchasing power of households. High inflation increases the cost of living, particularly affecting low-income families, and creates uncertainty for businesses making investment decisions.\n\nGovernments and central banks often respond by raising interest rates or reducing spending to control inflation. While these measures can slow price increases, they may also reduce borrowing, spending, and investment, increasing unemployment and slowing economic growth.\n\nThis creates a difficult policy trade-off: controlling inflation is necessary for stability, but overly aggressive action can harm growth and employment.',
    task: 'Design a balanced policy response to inflation that protects households and economic growth.',
    tips: [
      'Research inflation trends and main causes in your country',
      'Analyse how inflation affects different income groups',
      'Study how central banks and governments respond to inflation',
      'Evaluate the risks of both high inflation and aggressive inflation control',
    ],
    round1Info: 'Delegates will propose monetary and fiscal policy solutions to address inflation challenges.',
    round2Info: 'Policy debate on monetary policy measures - 5 vs 5 structured debate format.',
  },
  {
    id: 'ie',
    name: 'Inclusive Growth and Income Equality Board',
    abbreviation: 'IE',
    category: 'Senior Category 4',
    categoryShort: 'Senior',
    overview: 'The Inclusive Growth and Income Equality Board examines how to ensure economic growth benefits all segments of society, addressing inequality and promoting social mobility.',
    issueAtHand: 'Economic growth is not improving living standards for large parts of the population.',
    abstract: 'While economic growth increases national income, the benefits are often unevenly distributed. In many countries, growth disproportionately benefits certain sectors, regions, or income groups, leaving others behind. This can limit social mobility and reduce access to education, healthcare, and stable employment.\n\nHigh inequality can weaken long-term economic growth by reducing consumer demand and underutilising human potential. It can also increase social tension and reduce trust in economic institutions.\n\nThe challenge is to design growth strategies that are both economically efficient and socially inclusive.',
    task: 'Create inclusive growth strategies that expand opportunity while maintaining economic performance.',
    tips: [
      'Research income inequality and poverty levels in your country',
      'Develop a conceptual understanding of why economic growth can worsen inequality',
      'Identify which groups are excluded from growth',
      'Study social spending, education, and tax policies',
      'Analyse how inclusion can strengthen long-term growth',
    ],
    round1Info: 'Delegates will develop policies to ensure economic growth is broadly shared.',
    round2Info: 'Policy debate on inclusive growth measures - 5 vs 5 structured debate format.',
  },
  {
    id: 'es',
    name: 'Economic Sanctions Committee',
    abbreviation: 'ES',
    category: 'Senior Category 5',
    categoryShort: 'Senior',
    overview: 'The Economic Sanctions Committee examines the economic implications of international sanctions, exploring how countries can adapt to and mitigate the effects of trade restrictions.',
    issueAtHand: 'Economic sanctions are disrupting trade and harming domestic economies.',
    abstract: 'Economic sanctions restrict trade, financial flows, and investment in order to pressure governments. While intended to influence political behaviour, sanctions often affect ordinary citizens and businesses by raising prices, reducing employment, and limiting access to essential goods.\n\nSanctions can weaken currencies, reduce export earnings, and discourage investment, slowing economic growth. Countries affected by sanctions may struggle to secure critical imports such as fuel, food, or industrial inputs. Even countries imposing sanctions can face economic costs through disrupted trade relationships.\n\nThis creates a complex economic challenge: sanctions are political tools with wide-ranging and often unintended economic consequences.',
    task: 'Design strategies to protect domestic economic stability, employment, and essential supplies under sanctions pressure.',
    tips: [
      'Research how sanctions affect trade, prices, and employment',
      'Identify vulnerable sectors and key imports and exports',
      'Study historical cases of sanctions and economic adaptation',
      'Evaluate short-term versus long-term responses',
    ],
    round1Info: 'Delegates will develop economic resilience strategies in response to sanctions.',
    round2Info: 'Policy debate on sanctions response measures - 5 vs 5 structured debate format.',
  },
];
