const ACHIEVEMENTS = [
  {
    title: "Algoverse's AI Safety Research Fellowship 2026",
    note: 'One of 30+ selected globally',
  },
  {
    title: 'Google Summer of Code 2024',
    note: 'One of 1,220 selected globally from 43k+ applicants',
  },
  {
    title: 'AWS AI & ML Scholar Advance 2024',
    note: 'One of 500 selected globally',
  },
  {
    title: 'AWS AI & ML Scholar 2023',
    note: 'One of 2k selected globally from 70k+ applicants',
  },
  {
    title: 'UN Millennium Fellowship 2022',
    note: 'One of 3k selected globally from 31k+ applicants',
  },
  {
    title: '1st Rank · IIT Bombay E-Cell BnB 2022',
    note: 'Ranked 1st among 190+ teams nationally',
  },
  {
    title: 'Selected for SSIP 2020',
    note: 'One of 200+ applicants statewide',
  },
];

export function AchievementsList() {
  return (
    <div className="ach-grid">
      {ACHIEVEMENTS.map((item, i) => (
        <div key={i} className="ach-item">
          <div className="ach-body">
            <span className="ach-title">{item.title}</span>
            <span className="ach-note">{item.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
