const EXPERIENCE = [
  {
    role: 'Research Collaborator',
    org: 'HCI Engineering Group, MIT',
    date: 'Aug 2025 – Mar 2026',
    current: false,
  },
  {
    role: 'Founder',
    org: 'Housify (TechSurf Solutions)',
    date: 'Jan 2025 – Jan 2026',
    current: false,
  },
  {
    role: 'Research Intern',
    org: 'MuRAL Lab, Plaksha University',
    date: 'Jun – Aug 2025',
    current: false,
  },
  {
    role: 'Research Intern',
    org: 'HTI Lab, Plaksha University',
    date: 'Jan 2024 – Feb 2025',
    current: false,
  },
  {
    role: 'Contributor',
    org: 'Google Summer of Code 2024 · QuTiP @ NumFOCUS',
    date: 'May – Sep 2024',
    current: false,
  },
  {
    role: 'Data Science Intern',
    org: 'BlinkX by JM Financial, Mumbai',
    date: 'Jun – Aug 2024',
    current: false,
  },
  {
    role: 'Research Intern',
    org: 'Physical Research Laboratory (PRL), Ahmedabad',
    date: 'Jun – Aug 2023',
    current: false,
  },
  {
    role: 'Game Design Intern',
    org: 'MADIEE Games',
    date: 'Jan – Apr 2022',
    current: false,
  },
];

export function ExperienceTimeline() {
  return (
    <ol className="exp-timeline">
      {EXPERIENCE.map((item, i) => (
        <li key={i} className={`exp-timeline__item${item.current ? ' exp-timeline__item--current' : ''}`}>
          <div className="exp-timeline__dot" />
          <div className="exp-timeline__body">
            <span className="exp-timeline__role">{item.role}</span>
            <span className="exp-timeline__org">{item.org}</span>
            <span className="exp-timeline__date">{item.date}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
