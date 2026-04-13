/**
 * Server-only (call from getServerSideProps via require()).
 * Rewrites each gallery `src` to include ?v=… from projectsContent.js + file mtimes.
 * The client then uses `item.src` as-is — no second-pass URL logic, no empty bust edge case.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function projectsContentFingerprint() {
    try {
        const p = path.join(process.cwd(), 'lib', 'projectsContent.js');
        return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0, 12);
    } catch {
        return 'nocontent';
    }
}

function fileFingerprint(publicSrcPath) {
    if (typeof publicSrcPath !== 'string' || !publicSrcPath.startsWith('/') || publicSrcPath.includes('..')) {
        return 'badpath';
    }
    const rel = publicSrcPath.replace(/^\//, '');
    const full = path.join(process.cwd(), 'public', rel);
    try {
        const st = fs.statSync(full);
        return `${st.mtimeMs}.${st.size}`;
    } catch {
        return 'missing';
    }
}

function withFinalGalleryImageUrls(serializedProject, registryEntry) {
    if (!serializedProject?.images?.length) return serializedProject;
    const contentFp = projectsContentFingerprint();
    const manual = registryEntry?.imageCacheBust ? String(registryEntry.imageCacheBust) : '';
    return {
        ...serializedProject,
        images: serializedProject.images.map((img) => {
            const base = (img.src || '').split('?')[0];
            const fileFp = fileFingerprint(base);
            const v = [contentFp, fileFp, manual].filter(Boolean).join('-');
            return {
                ...img,
                src: `${base}?v=${encodeURIComponent(v)}`,
            };
        }),
    };
}

module.exports = { withFinalGalleryImageUrls };
