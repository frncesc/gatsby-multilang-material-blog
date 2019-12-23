const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { siteMetadata: { defaultLanguage } } = require('./gatsby-config')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const path = createFilePath({ node, getNode });
    let slug = path;
    let lang = defaultLanguage;
    const matches = path.match(/\/([a-z-_]*)\/$/);
    if (matches && matches.length === 2) {
      lang = matches[1];
      slug = slug.substr(0, slug.length - lang.length - 1);
    }
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
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark(filter: {fields: {lang: {eq: "${defaultLanguage}"}}}, sort: {fields: frontmatter___date, order: DESC}) {
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
  const pageTemplate = path.resolve('./src/templates/static-page.js');
  const pages = result.data.allMarkdownRemark.edges.filter(post => post.node.parent.sourceInstanceName === 'static');
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
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js');
  const posts = result.data.allMarkdownRemark.edges.filter(post => post.node.parent.sourceInstanceName === 'blog');
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
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
      net: 'empty',
    }
  })
}
