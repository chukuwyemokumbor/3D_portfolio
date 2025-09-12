/**
 * Everything the portfolio says about you lives here.
 * Edit this file to change your name, bio, skills, projects and contact links.
 */
export const profile = {
  name: 'chukuwyemokumbor',
  role: 'Frontend Developer',

  // EDIT ME: write a few sentences in your own words.
  about: [
    'I build clean, responsive web apps with React and TypeScript, from data dashboards to interactive 3D scenes like this one.',
    'I care about accessibility, performance and the small details that make an interface feel good to use.',
  ],

  skills: [
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
    { group: 'Frameworks', items: ['React', 'Next.js', 'React Three Fiber', 'Three.js'] },
    { group: 'Tools', items: ['Git & GitHub', 'Vite', 'ESLint', 'REST APIs'] },
  ],

  projects: [
    {
      title: 'Inventory Management Dashboard',
      description:
        'Track stock levels, reorder alerts and inventory value. Add, edit, restock and delete products through a REST API.',
      tags: ['React', 'TypeScript', 'Vite', 'json-server'],
      repo: 'https://github.com/chukuwyemokumbor/inventory-management-dashboard',
    },
    {
      title: 'Expense Tracker',
      description:
        'Log income and expenses, see spending by category and month, and get alerts before going over budget.',
      tags: ['Next.js', 'TypeScript', 'API routes', 'SVG charts'],
      repo: 'https://github.com/chukuwyemokumbor/expenses-tracker',
    },
    {
      title: '3D Portfolio',
      description: 'This site: an interactive 3D room where each object opens a section of the portfolio.',
      tags: ['React Three Fiber', 'Three.js', 'TypeScript'],
      repo: 'https://github.com/chukuwyemokumbor/3D_portfolio',
    },
  ],

  // EDIT ME: add your email and LinkedIn. Empty links are hidden.
  contact: {
    email: '',
    github: 'https://github.com/chukuwyemokumbor',
    linkedin: '',
  },
}
