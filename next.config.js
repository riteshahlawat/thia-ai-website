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
    devIndicators: { buildActivity: true, buildActivityPosition: 'bottom-right' },
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
});
