import Link from 'next/link';
import Header from '../header';
import { projectsHubBreadcrumbs } from '../../lib/breadcrumbs';
import { PROJECT_INDEX_LINKS } from '../../lib/projectsContent';

export default function Projects() {
    return (
        <div className="projects-page">
            <Header breadcrumbs={projectsHubBreadcrumbs()} />
            <main className="projects-page-main">
                <ul className="projects-page-list">
                    {PROJECT_INDEX_LINKS.map(({ href, label, slug }) => (
                        <li key={slug}>
                            <Link href={href} legacyBehavior>
                                <a className="home-button small-button projects-page-link">{label}</a>
                            </Link>
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
