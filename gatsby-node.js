const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { siteMetadata: { defaultLanguage } } = require('./gatsby-config')

function getTextTokens(text, lang) {
  // Remove URLS
  text = text.replace(/https?:[-/.\w?=#&%@]+/g, '');
  // Remove ISO dates
  text = text.replace(/\d{4}-\d{2}-\d{2}T[\w+:.-]+/g, '');
  // Convert symbols to separators
  text = text.replace(/[-_\s(){}[\]#*<>,.;:¿?/'@~=+\\|¡!"£$€^&`]+/g, ' ');
  // Convert text to array of unique lowercase words
  const tokens = Array.from(new Set(text.toLowerCase().split(' '))).sort();
  // Todo: remove stopwords for `lang`
  return tokens.join(' ').trim();
}

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {

  if (node.internal.type === 'Mdx') {
    const path = createFilePath({ node, getNode });
    let slug = path;
    let lang = defaultLanguage;
    const matches = path.match(/\/([a-z-_]*)\/$/);
    if (matches && matches.length === 2) {
      lang = matches[1];
      slug = slug.substr(0, slug.length - lang.length - 1);
    }
    if (/\/content\/blog\//.test(node.fileAbsolutePath))
      slug = `/blog${slug}`;

    const tokens = getTextTokens(node.rawBody);

    // Create node fields
    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });
    createNodeField({
      name: 'lang',
      node,
      value: lang,
    });
    createNodeField({
      name: 'tokens',
      node,
      value: tokens,
    });
  }
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {

  const result = await graphql(`
    query {
      allMdx(filter: {fields: {lang: {eq: "${defaultLanguage}"}}}, sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            parent {
              ... on File {
                sourceInstanceName
              }
            }
            fields {
              lang
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Create info pages.
  const pageTemplate = path.resolve('./src/templates/StaticPage.js');
  const pages = result.data.allMdx.edges.filter(post => post.node.parent.sourceInstanceName === 'static');
  pages.forEach(({ node: { fields: { slug } } }) => {
    createPage({
      path: slug,
      component: pageTemplate,
      context: {
        slug,
      },
    });
  });

  // Create blog posts.
  const blogPostTemplate = path.resolve('./src/templates/BlogPost.js');
  const posts = result.data.allMdx.edges.filter(post => post.node.parent.sourceInstanceName === 'blog');
  posts.forEach(({ node: { fields: { slug } } }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        slug,
        previous,
        next,
      },
    });
  });
};

// See: https://github.com/gatsbyjs/gatsby/issues/564#issuecomment-527891177
exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
  setWebpackConfig({
    node: {
      fs: 'empty',
      net: 'empty',
    }
  })
}
