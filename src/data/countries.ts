export interface CountryRegion {
  name: string;
  countries: string[];
}

export interface Institution {
  name: string;
  abbreviation: string;
  description: string;
}

export const countryRegions: CountryRegion[] = [
  {
    name: 'North America',
    countries: ['United States', 'Canada', 'Mexico'],
  },
  {
    name: 'Europe',
    countries: [
      'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
      'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Poland', 'Belgium',
      'Austria', 'Ireland', 'Portugal', 'Greece', 'Finland', 'Czech Republic',
    ],
  },
  {
    name: 'Asia Pacific',
    countries: [
      'China', 'Japan', 'South Korea', 'India', 'Australia', 'Singapore',
      'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'New Zealand',
      'Taiwan', 'Hong Kong', 'Pakistan', 'Bangladesh',
    ],
  },
  {
    name: 'Middle East & Africa',
    countries: [
      'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain',
      'Israel', 'Turkey', 'Egypt', 'South Africa', 'Nigeria', 'Kenya',
      'Morocco', 'Tunisia', 'Jordan', 'Lebanon', 'Oman',
    ],
  },
  {
    name: 'Latin America',
    countries: [
      'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela',
      'Ecuador', 'Uruguay', 'Costa Rica', 'Panama',
    ],
  },
  {
    name: 'CIS & Central Asia',
    countries: [
      'Russia', 'Ukraine', 'Kazakhstan', 'Uzbekistan', 'Azerbaijan',
      'Georgia', 'Armenia',
    ],
  },
];

export const institutions: Institution[] = [
  {
    name: 'International Monetary Fund',
    abbreviation: 'IMF',
    description: 'The IMF works to foster global monetary cooperation, secure financial stability, facilitate international trade, promote high employment and sustainable economic growth, and reduce poverty around the world.',
  },
  {
    name: 'World Bank Group',
    abbreviation: 'WBG',
    description: 'The World Bank Group is a family of five international organizations that provides loans, grants, and technical assistance to developing countries to reduce poverty and promote shared prosperity.',
  },
  {
    name: 'World Trade Organization',
    abbreviation: 'WTO',
    description: 'The WTO is the international organization dealing with the global rules of trade between nations, ensuring trade flows as smoothly, predictably, and freely as possible.',
  },
  {
    name: 'Organisation for Economic Co-operation and Development',
    abbreviation: 'OECD',
    description: 'The OECD promotes policies that improve the economic and social well-being of people around the world, providing a forum for governments to work together and share experiences.',
  },
  {
    name: 'United Nations Development Programme',
    abbreviation: 'UNDP',
    description: 'UNDP works in about 170 countries and territories to eradicate poverty and reduce inequalities, helping countries develop policies, leadership skills, and institutional capabilities.',
  },
  {
    name: 'Bank for International Settlements',
    abbreviation: 'BIS',
    description: 'The BIS serves central banks in their pursuit of monetary and financial stability, fostering international cooperation and acting as a bank for central banks.',
  },
];

export const allCountries = countryRegions.flatMap((region) => region.countries);
