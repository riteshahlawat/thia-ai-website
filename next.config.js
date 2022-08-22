/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer({
    reactStrictMode: false,
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    devIndicators: { autoPrerender: true },
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
});
