/**
 * Cache-busting for /images/* gallery assets.
 * - NEXT_PUBLIC_IMAGE_REVISION / VERCEL_DEPLOYMENT_ID (next.config.js)
 * - Per-project `imageCacheBust` in PROJECT_REGISTRY — bump when you replace
 *   PNGs but keep the same filenames (otherwise browsers keep old pixels).
 */
const ENV_REV = process.env.NEXT_PUBLIC_IMAGE_REVISION || '';

export function galleryImageSrc(path, projectBust) {
    const bust = [ENV_REV, projectBust].filter(Boolean).join('-');
    if (!path || !bust) return path;
    const sep = path.includes('?') ? '&' : '?';
    return `${path}${sep}v=${encodeURIComponent(bust)}`;
}
