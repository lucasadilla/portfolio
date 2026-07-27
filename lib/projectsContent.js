/**
 * Single source of truth for every `/projects/[slug]` page (copy, image paths, tech list).
 * Put files under `public/` and use paths like `/images/foo.png`.
 * On each request, getServerSideProps rewrites gallery `src` to include ?v= from this file’s hash + each file’s mtime (see lib/finalizeProjectGallery.js).
 *
 * `year` + `order` (earlier within the same year = lower) drive /projects sorting.
 */
export const PROJECT_REGISTRY = {
    bitpass: {
        breadcrumbLabel: 'BITPASS',
        year: 2023,
        order: 1,
        intro: null,
        images: [
            { src: '/images/BITPASS.png', text: 'A password generation and analysis tool made in 24 hours for ConUHacks 2022.' },
            { src: '/images/bitpass3.png', text: 'Evaluate the strength and security of passwords against brute force attacks.' },
            { src: '/images/bitpass2.png', text: 'Generate complex passwords with varying lengths and character sets.' },
            { src: '/images/bitpass4.png', text: 'Explore factors that contribute to password strength and security.' },
        ],
        techs: ['electron', 'react', 'javascript', 'tailwindcss', 'html5'],
        github: 'https://github.com/lucasadilla/BITPASS',
    },
    portify: {
        breadcrumbLabel: 'PORTIFY',
        year: 2026,
        order: 1,
        intro: { href: 'https://portify.ca', text: 'portify.ca' },
        images: [
            { src: '/images/port1.png', text: 'Portify front page.' },
            { src: '/images/port2.png', text: 'Example of a portfolio page.' },
            { src: '/images/port3.png', text: 'Ability to interact with the user\'s projects without leaving the page.' },
            { src: '/images/port4.png', text: 'Tech stack, graphs, and charts automatically generated based on the user\'s project.' },
            { src: '/images/port5.png', text: 'Some of the customizability options available to the user.' },
            { src: '/images/port6.png', text: 'An AI nlp model that can generate charts and graphs based on the user\'s input.' },
            { src: '/images/port7.png', text: 'A timeline of projects and experiences.' },
        ],
        techs: [
            'typescript',
            'nextjs',
            'tailwindcss',
            'prisma',
            'postgresql',
            'redis',
            'nodejs',
            'vercel',
            'aws',
        ],
        github: 'https://github.com/lucasadilla/Portify',
    },
    clipper: {
        breadcrumbLabel: 'CLIPPER',
        year: 2026,
        order: 2,
        intro: {
            href: 'https://streamclipper.stream/',
            text: 'streamclipper.stream — AI livestream editor that turns live streams and VODs into searchable timelines, captioned cuts, and native or vertical Shorts.',
        },
        images: [
            {
                src: '/images/clipper1.png',
                text: 'Landing page hero: paste a YouTube, Twitch, or Kick live/VOD link and start clipping while the stream is still moving.',
            },
            {
                src: '/images/clipper2.png',
                text: 'Command surface for timeline editing, transcript search, and momentum signals in one workspace.',
            },
            {
                src: '/images/clipper3.png',
                text: 'Capture → Locate → Cut → Ship workflow: open a live source, find moments via transcript and audio spikes, lock in/out points, then render.',
            },
            {
                src: '/images/clipper4.png',
                text: 'Export native 16:9 highlights or vertical 9:16 Shorts with captions via FFmpeg.',
            },
            {
                src: '/images/clipper5.png',
                text: 'SaaS pricing for Creator, Pro, Studio, and Business plans gated through Stripe.',
            },
        ],
        techs: [
            'typescript',
            'nextjs',
            'tailwindcss',
            'react',
            'nodejs',
            'prisma',
            'postgresql',
            'nextauth',
            'stripe',
        ],
        github: 'https://github.com/lucasadilla/Stream_clipper',
    },
    portfolio: {
        breadcrumbLabel: 'Portfolio',
        year: 2024,
        order: 3,
        variant: 'portfolio',
        techs: ['javascript', 'css3', 'html5', 'nextjs', 'nodejs', 'vercel'],
        github: 'https://github.com/lucasadilla/portfolio',
    },
    bicker: {
        breadcrumbLabel: 'BICKER',
        year: 2025,
        order: 1,
        intro: { href: 'https://bicker.ca/', text: 'Bicker website' },
        images: [
            { src: '/images/bick2.png', text: 'The landing page.' },
            { src: '/images/bick3.png', text: 'Respond to an opinion you disagree with in under 200 characters.' },
            { src: '/images/bick4.png', text: 'Vote on others\' disagreements and decide the winner.' },
            { src: '/images/bick5.png', text: 'View other debates and their vote counts.' },
        ],
        techs: [
            'javascript',
            'css3',
            'react',
            'nextjs',
            'express',
            'mongodb',
            'mongoose',
            'vercel',
            'oauth',
        ],
        github: 'https://github.com/lucasadilla/BICKER',
    },
    raz: {
        breadcrumbLabel: 'RAZ',
        year: 2024,
        order: 1,
        intro: {
            href: 'https://www.amirraz.com/',
            text: 'A personal site commissioned by Dr. Amir Raz, showcasing works, services, and providing a way to contact him.',
        },
        images: [
            { src: '/images/index.png', text: 'The front page.' },
            { src: '/images/index2.png', text: 'What the user sees after scrolling down.' },
            { src: '/images/pub.png', text: '100+ academic publications by Amir Raz.' },
            { src: '/images/media.png', text: 'Embedded video, audio, and article interviews' },
            { src: '/images/book.png', text: 'Book descriptions, images, and links to all of his published books' },
            { src: '/images/contact.png', text: 'A contact form that sends the user\'s provided information directly via email.' },
            { src: '/images/invite.png', text: 'Invite applications to Amir Raz\'s services' },
            { src: '/images/search.png', text: 'A working search engine which contains every piece of content from the site and organises it based on type.' },
        ],
        techs: ['javascript', 'css3', 'html5', 'nextjs', 'nodejs', 'vercel'],
        github: 'https://github.com/lucasadilla/raz',
    },
    udem: {
        breadcrumbLabel: 'UDEM',
        year: 2024,
        order: 2,
        /** Optional extra cache-bust suffix (rarely needed; asset revision already uses file mtimes). */
        imageCacheBust: '3',
        intro: {
            href: 'https://www.femmesetdroitudem.com/',
            text: 'A site commissioned by the UDEM Women in Law organization, showcasing their blogs, initiatives, and potential sponsor literature. Click the link to see the site.',
        },
        images: [
            { src: '/images/fd1.png', text: 'The front page.' },
            { src: '/images/fd2.png', text: 'The blog page features all the articles written specifically for this website.' },
            { src: '/images/fd3.png', text: 'A contact form that sends the user\'s provided information directly via email.' },
            { src: '/images/fd4.png', text: 'The events page, which shows all the events organized by the UDEM Women in Law organization.' },
            { src: '/images/fd5.png', text: 'The blog creation page, which allows the admin to create a new blog post.' },
        ],
        techs: [
            'nextjs',
            'nodejs',
            'typescript',
            'tailwindcss',
            'postgresql',
            'prisma',
            'nextauth',
            'tiptap',
            'fullcalendar',
            'cloudinary',
        ],
        github: 'https://github.com/lucasadilla/UDEMDROIT',
    },
};

/** Default display order (oldest → newest) */
export const PROJECT_SLUGS = ['bitpass', 'raz', 'udem', 'portfolio', 'bicker', 'portify', 'clipper'];

export const PROJECT_INDEX_LINKS = PROJECT_SLUGS.map((slug) => ({
    slug,
    href: `/projects/${slug}`,
    label: PROJECT_REGISTRY[slug].breadcrumbLabel,
    year: PROJECT_REGISTRY[slug].year,
    order: PROJECT_REGISTRY[slug].order,
}));

/** @param {'newest' | 'oldest'} direction */
export function getProjectsSorted(direction = 'newest') {
    const newestFirst = direction === 'newest';
    return [...PROJECT_INDEX_LINKS].sort((a, b) => {
        if (a.year !== b.year) {
            return newestFirst ? b.year - a.year : a.year - b.year;
        }
        return newestFirst ? b.order - a.order : a.order - b.order;
    });
}

/** @param {'newest' | 'oldest'} direction */
export function getProjectsGroupedByYear(direction = 'newest') {
    const sorted = getProjectsSorted(direction);
    const groups = [];
    for (const project of sorted) {
        const last = groups[groups.length - 1];
        if (last && last.year === project.year) {
            last.projects.push(project);
        } else {
            groups.push({ year: project.year, projects: [project] });
        }
    }
    return groups;
}
