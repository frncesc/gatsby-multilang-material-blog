import React from 'react';
import { graphql } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';
import Info from '../components/info';
import Layout from '../components/layout';
import SEO from '../components/seo';
import FrontItem from '../components/front-item';
import { getAllResolvedVersionsForLanguage } from '../utils/node';

const BlogIndex = ({ data, location }) => {

  const intl = useIntl();
  const { messages } = intl;
  const siteTitle = messages['site-title'];
  const items = getAllResolvedVersionsForLanguage(data, intl);
  const pages = items.filter(node => node.parent.sourceInstanceName === 'static');
  const posts = items.filter(node => node.parent.sourceInstanceName === 'blog');
  const alt = data.site.siteMetadata.supportedLanguages
    .filter(lang => lang !== intl.locale)
    .map(lang => ({
      lang,
      href: `${location.origin}/${lang}/`
    }));

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All posts"
        description=""
        alt={alt}
      />
      <Info />
      <h2>{messages['pages']}</h2>
      {pages.map((node) => (
        <FrontItem node={node} key={node.fields.slug} />
      ))}
      <hr />
      <h2>{messages['posts']}</h2>
      {posts.map((node) => (
        <FrontItem node={node} key={node.fields.slug} />
      ))}
    </Layout>
  );
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        supportedLanguages
      }
    }
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          excerpt
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
            date
            title
            description
          }
        }
      }
    }
  }`;
