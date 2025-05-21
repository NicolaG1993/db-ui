/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },

    images: {
        domains: [
            process.env.S3_BUCKET_URL,
            process.env.S3_BUCKET_URL_B,
            isDev ? process.env.SUPABASE_PROJECT_URL_DEV || "" : "",
            process.env.SUPABASE_PROJECT_URL_PROD || "",
        ],
        unoptimized: true, // set to true when vercel limit exceeded // comment otherwise
    },

    env: {
        BASE_URL: process.env.BASE_URL,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PSW: process.env.DATABASE_PSW,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_HOST: process.env.DATABASE_HOST,
        REACT_AWS_KEY: process.env.REACT_AWS_KEY,
        REACT_AWS_SECRET: process.env.REACT_AWS_SECRET,
        S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
        S3_BUCKET_URL: process.env.S3_BUCKET_URL,
        S3_BUCKET_URL_B: process.env.S3_BUCKET_URL_B,
        // CATEGORY_TYPES: process.env.CATEGORY_TYPES,
        // TAGS_OBJ: process.env.TAGS_OBJ,
        // TAGS_REL: process.env.TAGS_REL,
        CUSTOM_SETTINGS: process.env.CUSTOM_SETTINGS,
        // COOKIE_SECRET: process.env.COOKIE_SECRET, // not used anymore
        JWT_SECRET: process.env.JWT_SECRET,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,

        SUPABASE_PROJECT_URL_DEV: process.env.SUPABASE_PROJECT_URL_DEV,
        SUPABASE_PROJECT_URL_PROD: process.env.SUPABASE_PROJECT_URL_PROD,
        SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
};

module.exports = nextConfig;
