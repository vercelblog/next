/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:'https://wepzite.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://wepzite.in/sitemap.xml`,
    ],
  },
};
