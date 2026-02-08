export const siteUrl = "https://modelwef.org";
export const siteHost = "modelwef.org";

export const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /login
Disallow: /forgot-password
Disallow: /reset-password

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteHost}
`;
