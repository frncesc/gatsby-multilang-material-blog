import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from "gatsby-plugin-intl"
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { dateFormat } from '../utils/defaults'
import { getResolvedVersionForLanguage, getAllVersions } from '../utils/node';

export default function StaticPageTemplate({ data, location }) {

  const intl = useIntl();
  const { formatDate } = intl;
  const { frontmatter, fields: { slug }, excerpt, body } = getResolvedVersionForLanguage(data, intl);
  const { title, description, date } = frontmatter;

  return (
    <Layout {...{ intl }}>
      <SEO
        title={title}
        description={description || excerpt}
        alt={getAllVersions(data, location, intl.locale)}
      />
      <article>
        <header>
          <h1>
            {title}
          </h1>
          <p>
            {formatDate(date, dateFormat)}
          </p>
        </header>
        <Breadcrumbs {...{ slug, intl }} />
        <MDXRenderer {...{ frontmatter, intl }}>{body}</MDXRenderer>
      </article>
    </Layout>
  );
}

// Todo: add a global query for parent page titles from slug and language
export const pageQuery = graphql`
  query StaticPagesBySlug($slug: String!) {
    allMdx(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          id
          body
          fields {
            lang
            slug
          }
          frontmatter {
            date
            description
            title
          }
          excerpt(pruneLength: 160)
        }
      }
    }
  }
`;
