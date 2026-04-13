/**
 * Public URL for this portfolio (header “Site” link).
 * Set in .env as NEXT_PUBLIC_SITE_URL, or fill SITE_URL_OVERRIDE for a fixed domain.
 * On Vercel, https://VERCEL_URL is used when neither is set.
 */
export const SITE_URL_OVERRIDE = '';

export function getPortfolioSiteUrl() {
    const override = typeof SITE_URL_OVERRIDE === 'string' ? SITE_URL_OVERRIDE.trim() : '';
    if (override) return override;
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return '';
}

/** Hide header site link for local dev URLs */
export function isLocalOrLoopbackSite(url) {
    try {
        const h = new URL(url).hostname.toLowerCase();
        return h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h.endsWith('.local');
    } catch {
        return true;
    }
}
