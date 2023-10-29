/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    images: {
        domains: [process.env.S3_BUCKET_URL, process.env.S3_BUCKET_URL_B],
    },

    env: {
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
    },
};

module.exports = nextConfig;
