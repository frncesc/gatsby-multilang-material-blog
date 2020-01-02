import React from 'react';
import { graphql } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';
import Info from '../components/Info';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import FrontItem from '../components/FrontItem';
import { getAllResolvedVersionsForLanguage } from '../utils/node';

export default function Index({ data, location }) {

  const intl = useIntl();
  const { messages } = intl;
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
    <Layout {...{ intl }}>
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
