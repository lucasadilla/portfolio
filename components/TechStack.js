const TECH_META = {
    javascript: {
        file: 'javascript-original.svg',
        name: 'JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    css3: {
        file: 'css3-original.svg',
        name: 'CSS',
        url: 'https://www.w3.org/Style/CSS/',
    },
    html5: {
        file: 'html5-original.svg',
        name: 'HTML',
        url: 'https://html.spec.whatwg.org/multipage/',
    },
    nextjs: {
        file: 'nextjs-original.svg',
        name: 'Next.js',
        url: 'https://nextjs.org',
    },
    nodejs: {
        file: 'nodejs-original.svg',
        name: 'Node.js',
        url: 'https://nodejs.org',
    },
    vercel: {
        file: 'vercel-original.svg',
        name: 'Vercel',
        url: 'https://vercel.com',
    },
    electron: {
        file: 'electron-original.svg',
        name: 'Electron',
        url: 'https://www.electronjs.org',
    },
    react: {
        file: 'react-original.svg',
        name: 'React',
        url: 'https://react.dev',
    },
    tailwindcss: {
        file: 'tailwindcss-original.svg',
        name: 'Tailwind CSS',
        url: 'https://tailwindcss.com',
    },
    typescript: {
        file: 'typescript-original.svg',
        name: 'TypeScript',
        url: 'https://www.typescriptlang.org',
    },
    prisma: {
        file: 'prisma-original.svg',
        name: 'Prisma',
        url: 'https://www.prisma.io',
    },
    postgresql: {
        file: 'postgresql-original.svg',
        name: 'PostgreSQL',
        url: 'https://www.postgresql.org',
    },
    redis: {
        file: 'redis-original.svg',
        name: 'Redis',
        url: 'https://redis.io',
    },
    aws: {
        file: 'amazonwebservices-original.svg',
        name: 'AWS',
        url: 'https://aws.amazon.com',
    },
    render: {
        file: 'render-original.svg',
        name: 'Render',
        url: 'https://render.com',
        onDarkBg: true,
    },
    nextauth: {
        file: 'nextauth-original.png',
        name: 'NextAuth.js',
        url: 'https://authjs.dev',
    },
    tiptap: {
        file: 'tiptap-original.png',
        name: 'TipTap',
        url: 'https://tiptap.dev',
    },
    fullcalendar: {
        file: 'fullcalendar-original.png',
        name: 'FullCalendar',
        url: 'https://fullcalendar.io',
    },
    cloudinary: {
        file: 'cloudinary-original.svg',
        name: 'Cloudinary',
        url: 'https://cloudinary.com',
    },
    express: {
        file: 'express-original.svg',
        name: 'Express',
        url: 'https://expressjs.com',
        onDarkBg: true,
    },
    mongodb: {
        file: 'mongodb-original.svg',
        name: 'MongoDB',
        url: 'https://www.mongodb.com',
    },
    mongoose: {
        file: 'mongoose-original.svg',
        name: 'Mongoose',
        url: 'https://mongoosejs.com',
    },
    oauth: {
        file: 'oauth-original.svg',
        name: 'OAuth',
        url: 'https://oauth.net/2/',
        onDarkBg: true,
    },
};

export default function TechStack({ techs }) {
    return (
        <ul className="tech-stack">
            {techs.map((key) => {
                const meta = TECH_META[key];
                if (!meta) return null;
                return (
                    <li key={key} className="tech-stack-item">
                        <a
                            href={meta.url}
                            className="tech-stack-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${meta.name} — official site`}
                        >
                            {meta.file ? (
                                <img
                                    src={`/tech/${meta.file}`}
                                    alt=""
                                    className={`tech-stack-icon${meta.onDarkBg ? ' tech-stack-icon--on-dark' : ''}`}
                                    width={48}
                                    height={48}
                                />
                            ) : (
                                <span className="tech-stack-label">{meta.name}</span>
                            )}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
