import React from 'react';
import { graphql } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';
import Breadcrumbs from '../components/Breadcrumbs';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import FrontItem from '../components/FrontItem';
import { getAllResolvedVersionsForLanguage, getAllVariants } from '../utils/node';

const SLUG = '/blog/';

export default function Blog({ data, location }) {

  const intl = useIntl();
  const title = intl.messages['blog-index-title'];
  const posts = getAllResolvedVersionsForLanguage(data, intl);

  return (
    <Layout {...{ intl }}>
      <SEO
        title={title}
        alt={getAllVariants(SLUG, location, intl.locale)}
      />
      <h2>{title}</h2>
      <Breadcrumbs {...{ slug: SLUG, intl }} />
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
    allMdx(filter: {fields: {slug: {regex: "/^\\/blog\\//"}}}, sort: {fields: frontmatter___date, order: DESC}) {
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
