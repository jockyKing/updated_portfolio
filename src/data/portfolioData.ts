export type ProjectCategory = 'excel' | 'sql' | 'dashboards';

export interface ProjectItem {
  id: string;
  number: string;
  metaCategory: string;
  domain: string;
  title: string;
  description: string;
  tools: string;
  categories: ProjectCategory[];
  cvSubtitle: string;
  cvDescription: string;
  caseStudy: {
    meta: string;
    summary: string;
    question: string;
    approach: string;
    findings: string[];
  };
}

export interface SkillItem {
  name: string;
  detail: string;
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export interface CertificationItem {
  id: string;
  issuer: string;
  year: string;
  title: string;
  description: string;
  credentialId: string;
  /** Drop certificate image in public/certs/ and set filename relative to certs/, e.g. "google-data-analytics.png" */
  imageFile: string;
  cvTitle: string;
}

export const PROFILE = {
  brand: 'Ace',
  eyebrow: 'Data Analytics Portfolio · Bulacan State University',
  headline: 'Turning messy data into clear, actionable decisions.',
  lead: 'I am Ace, a data analytics student focused on cleaning raw datasets, querying patterns in SQL, and translating findings into plain-language dashboards.',
  aboutLead:
    "I'm a data analytics student at Bulacan State University who enjoys finding meaningful patterns in raw data and explaining them in plain language.",
  aboutBody:
    "Whether working with spreadsheets, relational queries, or executive dashboards, my goal is to bridge technical analysis and practical decision-making. After graduation, I'm looking for an entry-level data analyst role where I can help teams answer clearer questions and act with confidence.",
  institution: 'Bulacan State University',
  discipline: 'Data Analytics',
  location: 'Bulacan, Philippines',
  email: 'cabatañajockyking.1022@gmail.com',
  githubUrl: 'https://github.com/jockyKing',
  githubDisplay: 'github.com/jockyKing',
  // EDIT: replace with your actual LinkedIn profile URL
  linkedinUrl: 'https://linkedin.com/in/your-profile',
  linkedinDisplay: 'linkedin.com/in/your-profile',
  year: '2026',
  ledgerRows: [
    { label: 'Focus', value: 'BI Dashboards & SQL' },
    { label: 'Core Stack', value: 'Excel, SQL, Power BI, Tableau' },
    { label: 'Currently Learning', value: 'Python for Data Analysis' },
    { label: 'Availability', value: 'Entry-Level Analyst Roles' },
  ],
  cvRole: 'Data Analytics Student · Aspiring Entry-Level Data Analyst',
  cvProfile:
    'Data analytics student at Bulacan State University focused on cleaning raw datasets, querying patterns in SQL, and translating analytical findings into plain-language dashboards for practical business decisions. Seeking an entry-level data analyst role after graduation.',
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Querying & Spreadsheets',
    items: [
      { name: 'SQL', detail: 'Joins, aggregations, cohort queries' },
      { name: 'Excel', detail: 'Pivot tables, lookups, KPI modeling' },
      { name: 'Google Sheets', detail: 'Collaborative tracking & formulas' },
    ],
  },
  {
    title: 'BI & Visualization',
    items: [
      { name: 'Power BI', detail: 'Interactive executive dashboards' },
      { name: 'Tableau', detail: 'Exploratory visual narratives' },
      { name: 'Data Visualization', detail: 'Chart selection & layout clarity' },
    ],
  },
  {
    title: 'Workflow & Growth',
    items: [
      { name: 'Data Cleaning', detail: 'Deduplication, formatting, validation' },
      { name: 'Python', detail: 'Currently learning for automation' },
      {
        name: 'Plain-Language Reporting',
        detail: 'Summarizing insights for stakeholders',
      },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sales',
    number: '01',
    metaCategory: 'Excel',
    domain: 'Business Analysis',
    title: 'Sales Performance Analysis',
    description:
      'Analyzed a retail sales dataset to find which products and regions drive the most profit, and summarized the findings in an interactive dashboard.',
    tools: 'Excel / Dashboards',
    categories: ['excel', 'dashboards'],
    cvSubtitle: 'Excel · Business Analysis',
    cvDescription:
      'Cleaned raw retail sales data and built dynamic Pivot Table KPI dashboards to identify profit-driving products, regional performance, and margin impact from promotional discounting.',
    caseStudy: {
      meta: '01 · Excel · Business Analysis',
      summary:
        'Analyzed a multi-region retail sales dataset to uncover which product categories and territories generate the strongest profit margins.',
      question:
        'Which product lines and regional markets drive the highest net profit, and where are discounts eroding margin?',
      approach:
        'Cleaned raw transaction rows in Excel, standardized product categories, and built Pivot Tables with dynamic KPI slicers for regional comparisons.',
      findings: [
        'Top 20% of SKUs accounted for the majority of net profit across primary regions.',
        'High-discount promotional periods lifted unit volume but reduced overall contribution margin.',
        'Summarized quarterly trends in a single-screen dashboard for non-technical stakeholders.',
      ],
    },
  },
  {
    id: 'churn',
    number: '02',
    metaCategory: 'SQL',
    domain: 'Retention Analytics',
    title: 'Customer Churn Insights',
    description:
      'Explored customer behavior data to identify the main factors linked to customers leaving, and proposed targeted retention strategies.',
    tools: 'SQL / Data Cleaning',
    categories: ['sql'],
    cvSubtitle: 'SQL · Retention Analytics',
    cvDescription:
      'Wrote SQL queries using joins, CTEs, and conditional aggregations to segment customer behavior and tenure, uncovering early-stage churn indicators and retention opportunities.',
    caseStudy: {
      meta: '02 · SQL · Retention Analytics',
      summary:
        'Explored customer tenure, billing history, and engagement behavior to identify early churn signals and practical retention actions.',
      question:
        'What behavioral and account attributes differentiate retained customers from accounts that churn within their first year?',
      approach:
        'Wrote SQL queries using joins, CTEs, and conditional aggregations to segment customers by tenure, plan tier, and support interactions.',
      findings: [
        'Month-to-month subscribers showed substantially higher early-stage churn than annual plan holders.',
        'Low engagement within the first 60 days was the strongest behavioral warning sign.',
        'Recommended onboarding check-ins and annual upgrade incentives focused on at-risk cohorts.',
      ],
    },
  },
  {
    id: 'regional',
    number: '03',
    metaCategory: 'Power BI',
    domain: 'Operations KPI',
    title: 'Regional Revenue & Margin Tracker',
    description:
      'Built a multi-page BI report comparing monthly sales velocity against regional targets to spotlight underperforming product lines.',
    tools: 'Power BI / Tableau',
    categories: ['dashboards'],
    cvSubtitle: 'Power BI & Tableau · Operations KPI',
    cvDescription:
      'Built a multi-page BI report comparing monthly sales velocity against regional targets to spotlight underperforming product lines and variance drivers.',
    caseStudy: {
      meta: '03 · Power BI & Tableau · Operations KPI',
      summary:
        'Designed an executive-ready BI report comparing monthly revenue velocity against regional targets to spot underperforming categories early.',
      question:
        'How are regional sales teams pacing against monthly revenue targets, and which categories require inventory rebalancing?',
      approach:
        'Structured cleaned sales and target tables in Power BI, modeled date hierarchies, and paired variance KPIs with drill-down regional charts.',
      findings: [
        'Highlighted seasonal dips across secondary regions two weeks earlier than static monthly spreadsheets.',
        'Grouped variance drivers by category so managers could inspect root causes in two clicks.',
        'Standardized metric definitions across revenue, gross margin, and target attainment.',
      ],
    },
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'google-analytics',
    issuer: 'Coursera · Placeholder',
    year: '2026',
    title: 'Google Data Analytics Professional Certificate',
    description:
      'Covers data cleaning, spreadsheet analysis, SQL querying, and building visual dashboards for stakeholder reporting.',
    credentialId: 'Credential ID: Pending',
    imageFile: 'placeholder-google-analytics.svg',
    cvTitle: 'Google Data Analytics Professional Certificate (Placeholder)',
  },
  {
    id: 'sql-analysis',
    issuer: 'Platform Name · Placeholder',
    year: '2026',
    title: 'SQL for Data Analysis',
    description:
      'Relational database querying with joins, CTEs, aggregations, and cohort segmentation on business datasets.',
    credentialId: 'Credential ID: Pending',
    imageFile: 'placeholder-sql-analysis.svg',
    cvTitle: 'SQL for Data Analysis (Placeholder)',
  },
  {
    id: 'bi-dashboarding',
    issuer: 'Platform Name · Placeholder',
    year: '2026',
    title: 'Business Intelligence & Dashboarding',
    description:
      'Data modeling, KPI design, and interactive report building in Power BI and Tableau.',
    credentialId: 'Credential ID: Pending',
    imageFile: 'placeholder-bi-dashboarding.svg',
    cvTitle: 'Business Intelligence & Dashboarding (Placeholder)',
  },
];

export function getCertImageUrl(imageFile: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}certs/${imageFile.replace(/^\/+/, '')}`;
}
