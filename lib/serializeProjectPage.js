/** JSON-safe fields for `/projects/[slug]` (from getStaticProps → props). */
export function serializeProjectForPage(project) {
    return {
        breadcrumbLabel: project.breadcrumbLabel,
        variant: project.variant ?? null,
        intro: project.intro ?? null,
        images: project.images ?? null,
        techs: project.techs,
        github: project.github,
        imageCacheBust: project.imageCacheBust ?? null,
    };
}
