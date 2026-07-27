/** Breadcrumb trail for /projects: Home → Projects (current) */
export function projectsHubBreadcrumbs() {
    return [
        { href: '/', label: 'Home' },
        { label: 'Projects' },
    ];
}

/** Breadcrumb trail for /experience: Home → Experience (current) */
export function experienceHubBreadcrumbs() {
    return [
        { href: '/', label: 'Home' },
        { label: 'Experience' },
    ];
}

/** Breadcrumb trail for a project page: Home → Projects → [name] */
export function projectPageBreadcrumbs(projectLabel) {
    return [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { label: projectLabel },
    ];
}
