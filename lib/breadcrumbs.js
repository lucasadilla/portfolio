/** Breadcrumb trail for /projects: Home → Projects (current) */
export function projectsHubBreadcrumbs() {
    return [
        { href: '/', label: 'Home' },
        { label: 'Projects' },
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
