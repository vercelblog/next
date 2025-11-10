/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:'https://javabro.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://javabro.com/sitemap.xml`,
    ],
  },
};
