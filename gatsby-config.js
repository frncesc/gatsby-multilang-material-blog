
const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
console.log(`Using environment config: "${activeEnv}"`)
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

// Read package.json settings
const { version } = require('./package.json');

// Read environment variables
const PATH_PREFIX = process.env.PATH_PREFIX || '';
const BASE_URL = process.env.BASE_URL || 'https://localhost:9000/';
const ANALYTICS_UA = process.env.ANALYTICS_UA || '';
const OFFLINE_PWA = 'true' === process.env.OFFLINE_PWA;
const FACEBOOK_ID = process.env.FACEBOOK_ID || '';

// Main metadata settings
const siteUrl = BASE_URL;
const siteRoot = BASE_URL.substr(0, BASE_URL.length - PATH_PREFIX.length - 1);
const themeColor = '#663399';
const themeBackground = '#ffffff';

const shareOn = { twitter: true, facebook: true, telegram: true, whatsapp: true, pinterest: true, email: true, classroom: true, moodle: true };
const shareMeta = { 'hash': 'chemical,blog', via: 'mr-gatsby' };

const supportedLanguages = ['en', 'ca', 'es'];
const defaultLanguage = 'en';

const localizedTitles = {
  ca: 'Plantilla de lloc amb blog',
  es: 'Plantilla de sitio con blog',
  en: 'Template of site with blog',
};
const title = localizedTitles[defaultLanguage];

const localizedAuthors = {
  ca: 'En Gatsby',
  es: 'Sr. Gatsby',
  en: 'Mr. Gatsby',
};
const author = localizedAuthors[defaultLanguage];

const localizedShortTitles = {
  ca: 'Gatsby Blog',
  es: 'Gatsby Blog',
  en: 'Gatsby Blog',
};
const shortTitle = localizedShortTitles[defaultLanguage];

const localizedDescriptions = {
  ca: 'Plantilla de lloc web Gatsby multi-idioma fet amb Material Design',
  es: 'Plantilla de sitio web multi-idioma construido con Material Design',
  en: 'Gatsby multi-language blog template made with Material Design',
};
const description = localizedDescriptions[defaultLanguage];

const langNames = {
  ca: 'Català',
  es: 'Español',
  en: 'English',
}

// Gatsby config options
const config = {
  pathPrefix: PATH_PREFIX,
  siteMetadata: {
    title,
    author,
    description,
    siteUrl,
    siteRoot,
    version,
    social: {
      twitter: 'test',
    },
    defaultLanguage,
    supportedLanguages,
    langNames,
    localizedTitles,
    localizedShortTitles,
    localizedDescriptions,
    localizedAuthors,
    specialPages: ['/search/', '/blog/'],
    shareOn,
    shareMeta,
    facebookId: FACEBOOK_ID,
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
          'gatsby-remark-autolink-headers',
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 650,
              // maxHeight: 600,
              // fit: 'contain',
              // background: 'white',
              linkImagesToOriginal: true,
              showCaptions: ['title'],
              markdownCaptions: false,
              sizeByPixelDensity: false,
              backgroundColor: 'white',
              quality: 50,
              withWebp: {
                quality: 80,
              },
              tracedSVG: false,
              loading: 'lazy',
              disableBgImageOnAlpha: false,
              disableBgImage: false,
              /**
               *  wrapperStyle: ({aspectRatio, sizes, originalImg, originalName, density, presentationWidth, presentationHeight}) => {
               *    // Function should return a string with CSS attributes
               *    return `max-height:300px;`
               *  },
               */
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
        name: title,
        short_name: shortTitle,
        description: `${description} (${version})`,
        start_url: `/`,
        background_color: themeBackground,
        theme_color: themeColor,
        display: 'standalone',
        icon: 'content/assets/icons/logo.svg',
        localize: supportedLanguages.map(lang => ({
          lang,
          start_url: `/${lang}/`,
          name: localizedTitles[lang],
          short_name: localizedShortTitles[lang],
          description: localizedDescriptions[lang],
        })),
      },
    },
    // Generate social cards
    {
      resolve: '@francesc/gatsby-plugin-multilang-twitter-cards',
      options: {
        localizedTitles, // website titles
        localizedAuthors, // website author names
        defaultLanguage, // default language
        // separator: '|', // defaults to '|'
        // Free image from: https://pxhere.com/en/photo/1367344
        background: require.resolve('./content/assets/base.jpg'), // path to 1200x630px file or hex code, defaults to black (#000000)
        fontColor: '#900AA0', // defaults to white (#ffffff)
        titleFontSize: 136, // defaults to 96
        subtitleFontSize: 48, // defaults to 60
        // fontStyle: 'monospace', // defaults to "monospace"
        fontFile: require.resolve('./content/assets/oswald-v29-latin-500.ttf'), // will override fontStyle - path to custom TTF font
        // cardFileName: 'twitter-card.jpg', // defaults to "twitter-card.jpg"
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
              // { family: 'Open Sans', variants: ['300', '400', '500'] },
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
        redirect: true,
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

