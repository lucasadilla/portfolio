import Header from '../header';
import TechStack from '../../components/TechStack';
import ProjectImageStack from '../../components/ProjectImageStack';
import { projectPageBreadcrumbs } from '../../lib/breadcrumbs';
import { serializeProjectForPage } from '../../lib/serializeProjectPage';
import { PROJECT_REGISTRY } from '../../lib/projectsContent';

function ProjectFooter() {
    return (
        <footer>
            <div className="footer-content">
                <a href="https://www.linkedin.com/in/lucas-pentland-hyde-aa7130240/" className="footer-link" target="_blank">
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
    );
}

/** SSR (not SSG) so copy in lib/projectsContent.js always matches what you see after save / deploy. */
export async function getServerSideProps({ params, res }) {
    const slug = params?.slug;
    const project = slug ? PROJECT_REGISTRY[slug] : undefined;
    if (!project) {
        return { notFound: true };
    }
    res.setHeader('Cache-Control', 'private, no-store, must-revalidate');

    /* require() keeps fs/crypto out of the client bundle */
    const { withFinalGalleryImageUrls } = require('../../lib/finalizeProjectGallery');
    const serialized = serializeProjectForPage(project);
    const projectProps = withFinalGalleryImageUrls(serialized, project);

    return {
        props: {
            slug,
            project: projectProps,
        },
    };
}

export default function ProjectPage({ project }) {
    if (project.variant === 'portfolio') {
        return (
            <div>
                <Header breadcrumbs={projectPageBreadcrumbs(project.breadcrumbLabel)} />
                <section>
                    <h4>Tried to keep this site as simple as possible while adding some new css features, such as:</h4>
                    <h3>A circular cursor that inverses anything it is hovering over.</h3>
                    <h3>A typewriter effect.</h3>
                    <h3>Arrows that fold when hovered over.</h3>
                </section>
                <section>
                    <h2>Technologies Utilized</h2>
                    <TechStack techs={project.techs} />
                    <a href={project.github} className="home-button">GitHub Repository</a>
                </section>
                <ProjectFooter />
            </div>
        );
    }

    return (
        <div>
            <Header breadcrumbs={projectPageBreadcrumbs(project.breadcrumbLabel)} />
            {project.intro ? (
                <a href={project.intro.href} className="thing">
                    {project.intro.text}
                </a>
            ) : null}
            {project.images?.length ? <ProjectImageStack images={project.images} /> : null}
            <section>
                <h2>Technologies Utilized</h2>
                <TechStack techs={project.techs} />
                <a href={project.github} className="home-button">GitHub Repository</a>
            </section>
            <ProjectFooter />
        </div>
    );
}
