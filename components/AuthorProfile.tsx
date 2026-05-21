import Image from 'next/image';

export function AuthorProfile() {
  return (
    <div className="author-profile">
      <div className="author-profile__avatar">
        <Image
          src="/images/rushi-styled-pic-pre.png"
          alt="Rushiraj Gadhvi"
          width={190}
          height={190}
          priority
        />
      </div>

      <div>
        <h3 className="author-profile__name">Rushiraj Gadhvi</h3>
        <p className="author-profile__bio">CSAI Student @Plaksha University</p>
      </div>

      <ul className="author-profile__links">
        <li>
          <a href="mailto:gadhvirushiraj@gmail.com">
            <i className="fas fa-fw fa-envelope" />
            Email
          </a>
        </li>
        <li>
          <a href="https://scholar.google.com/citations?user=RB8fOIQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
            <i className="ai ai-google-scholar" />
            Google Scholar
          </a>
        </li>
        <li>
          <a href="https://github.com/gadhvirushiraj" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-fw fa-github" />
            Github
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/gadhvirushiraj" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-fw fa-linkedin" />
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}
