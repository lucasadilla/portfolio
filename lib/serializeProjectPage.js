/** JSON-safe fields for `/projects/[slug]` (from getServerSideProps → props). */
export function serializeProjectForPage(project) {
    return {
        breadcrumbLabel: project.breadcrumbLabel,
        variant: project.variant ?? null,
        intro: project.intro ? { ...project.intro } : null,
        images: project.images ? project.images.map((img) => ({ ...img })) : null,
        techs: [...project.techs],
        github: project.github,
    };
}
