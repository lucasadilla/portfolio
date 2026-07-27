const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/** Baked into client bundle at build time; changes when lib/projectsContent.js changes */
function projectsFileFingerprint() {
    try {
        const p = path.join(__dirname, 'lib', 'projectsContent.js');
        const buf = fs.readFileSync(p);
        return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 10);
    } catch {
        return '';
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* Avoid wrong workspace root when a lockfile exists above this folder (e.g. home directory). */
    outputFileTracingRoot: path.join(__dirname),
    env: {
        NEXT_PUBLIC_IMAGE_REVISION:
            process.env.NEXT_PUBLIC_IMAGE_REVISION ||
            process.env.VERCEL_DEPLOYMENT_ID ||
            projectsFileFingerprint(),
    },
    async headers() {
        return [
            {
                source: '/images/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
            },
        ];
    },
    async redirects() {
        /* Top-level → /projects/... ; keep in sync with PROJECT_SLUGS in lib/projectsContent.js */
        const slugs = ['bitpass', 'portify', 'portfolio', 'bicker', 'raz', 'udem', 'clipper'];
        const toProject = slugs.map((slug) => ({
            source: `/${slug}`,
            destination: `/projects/${slug}`,
            permanent: true,
        }));
        return [
            ...toProject,
            { source: '/debate', destination: '/projects/bicker', permanent: true },
            { source: '/projects/debate', destination: '/projects/bicker', permanent: true },
            { source: '/personal', destination: '/projects/portfolio', permanent: true },
            { source: '/projects/personal', destination: '/projects/portfolio', permanent: true },
        ];
    },
};

module.exports = nextConfig;
