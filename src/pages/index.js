import React from 'react';
import { graphql } from 'gatsby';
import { useIntl, Link } from 'gatsby-plugin-intl';
import Info from '../components/Info';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import FrontItem from '../components/FrontItem';
import { getAllResolvedVersionsForLanguage, getAllVariants } from '../utils/node';

const SLUG = '/';

export default function Index({ data, location }) {

  const intl = useIntl();
  const { messages } = intl;
  const pages = getAllResolvedVersionsForLanguage(data, intl);

  return (
    <Layout {...{ intl }}>
      <SEO
        title={messages['site-title']}
        description={messages['site-description']}
        alt={getAllVariants(SLUG, location, intl.locale)}
      />
      <Info />
      <h2>{messages['pages']}</h2>
      {pages.map(node => (
        <FrontItem node={node} key={node.fields.slug} />
      ))}
      <hr />
      <h2><Link to="/blog/">Blog</Link></h2>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        supportedLanguages
      }
    }
    allMdx(filter: {fields: {slug: {regex: "/^(?!\\/blog\\/)/"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          excerpt
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
  }
`;
