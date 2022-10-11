/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://thia.tech',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
};
