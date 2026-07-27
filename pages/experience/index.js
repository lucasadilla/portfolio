import Header from '../header';
import { experienceHubBreadcrumbs } from '../../lib/breadcrumbs';
import { EXPERIENCE_ENTRIES } from '../../lib/experienceContent';

export default function Experience() {
    return (
        <div className="projects-page">
            <Header breadcrumbs={experienceHubBreadcrumbs()} />
            <main className="projects-page-main experience-page-main">
                <ul className="experience-list">
                    {EXPERIENCE_ENTRIES.map((entry) => (
                        <li key={entry.id} className="experience-item">
                            <div className="experience-item-header">
                                <h2 className="experience-role">{entry.role}</h2>
                                <p className="experience-dates">{entry.dates}</p>
                            </div>
                            <p className="experience-org">
                                {entry.href ? (
                                    <a
                                        href={entry.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="experience-org-link"
                                    >
                                        {entry.org}
                                    </a>
                                ) : (
                                    entry.org
                                )}
                                {entry.location ? (
                                    <span className="experience-location"> · {entry.location}</span>
                                ) : null}
                            </p>
                            {(entry.description || entry.bullets?.length) ? (
                                <ul className="experience-bullets">
                                    {entry.description ? (
                                        <li key="description">{entry.description}</li>
                                    ) : null}
                                    {entry.bullets?.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </li>
                    ))}
                </ul>
            </main>
            <footer>
                <div className="footer-content">
                    <a href="https://www.linkedin.com/in/lucas-pentland-hyde/" className="footer-link" target="_blank">
                        <img src="/images/linkedin-black-logo-icon.png" alt="LinkedIn" className="footer-icon" />
                    </a>
                    <a href="https://github.com/lucasadilla" className="footer-link" target="_blank">
                        <img src="/images/github.png" alt="GitHub" className="footer-icon" />
                    </a>
                    <a href="mailto:lucas.pentlandhyde@gmail.com" className="footer-link">
                        <img src="/images/envelope.png" alt="Email" className="footer-icon" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
