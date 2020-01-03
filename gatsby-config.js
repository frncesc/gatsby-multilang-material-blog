
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
console.log(`Using environment config: "${activeEnv}"`)
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

// Read environment variables
const PATH_PREFIX = process.env.PATH_PREFIX || '';
const BASE_URL = process.env.BASE_URL || 'https://localhost:9000/';
const ANALYTICS_UA = process.env.ANALYTICS_UA || '';
const OFFLINE_PWA = 'true' === process.env.OFFLINE_PWA;

// Main metadata settings
const supportedLanguages = ['en', 'ca', 'es'];
const defaultLanguage = 'en';
const localizedTitles = {
  ca: 'Plantilla de lloc amb blog',
  es: 'Plantilla de sitio con blog',
  en: 'Template of site with blog',
};
const title = localizedTitles[defaultLanguage];
const langNames = {
  ca: 'Català',
  es: 'Español',
  en: 'English',
}
const siteUrl = BASE_URL;

// Gatsby config options
const config = {
  pathPrefix: PATH_PREFIX,
  siteMetadata: {
    title,
    author: 'Mr. Gatsby',
    description: 'Gatsby multi-lingual blog template, made with Material Design',
    siteUrl,
    social: {
      twitter: 'test',
    },
    defaultLanguage,
    supportedLanguages,
    langNames,
    specialPages: ['/search/', '/blog/'],
  },
  plugins: [
    // Static pages
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/static`,
        name: 'static',
      },
    },
    // Blog entries
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    // Misc. assets
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    // Transform MarkDown files
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-attr',
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    // Transform images
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    // Generate manifest file
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby Multi-Lingual Blog',
        short_name: 'BlogTemplate',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/icons/logo.svg',
      },
    },
    // Generate feeds
    {
      resolve: 'gatsby-plugin-feed-mdx',
      options: {
        // this base query will be merged with any queries in each feed
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }`,
        feeds: supportedLanguages.map(lang => {
          return {
            query: `{
              allMdx(filter: {fields: {lang: {eq: "${lang}"}}}, sort: {fields: frontmatter___date, order: DESC}) {
                edges {
                  node {
                    fields {
                      slug
                    }
                    body
                    excerpt
                    frontmatter {
                      date
                      title
                      description
                    }
                  }
                }
              }
            }`,
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(({ node: { fields: { slug }, frontmatter, excerpt, body } }) => {
                const url = `${site.siteMetadata.siteUrl}/${lang}${slug}`;
                return Object.assign(
                  {},
                  frontmatter,
                  {
                    description: frontmatter.description || excerpt || 'no description provided',
                    url,
                    guid: url,
                    // Provide full content:
                    // custom_elements: [{ 'content:encoded': body }]
                  });
              });
            },
            output: lang === defaultLanguage ? 'rss.xml' : `rss-${lang}.xml`,
            title: `${localizedTitles[lang]} (${langNames[lang]})`,
            language: lang,
          };
        }),
      },
    },
    //
    // Fill-in 'head' fields
    'gatsby-plugin-react-helmet',
    // Material-UI settings
    {
      resolve: 'gatsby-theme-material-ui',
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              { family: 'Roboto', variants: ['300', '400', '500'] },
            ],
          },
        },
      },
    },
    // i18n
    {
      resolve: 'gatsby-plugin-intl',
      options: {
        path: `${__dirname}/src/intl`,
        languages: supportedLanguages,
        defaultLanguage,
        // redirect disabled because of erroneus redirections with `static` folder
        redirect: false,
      },
    },
  ],
};

// Google analytics
if (ANALYTICS_UA) {
  config.plugins.push(
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: ANALYTICS_UA,
      },
    }
  );
}

// Set-up the service worker
if (OFFLINE_PWA)
  config.plugins.push('gatsby-plugin-offline');

// Export the resulting object
module.exports = config;

