import React from 'react';
import { graphql } from 'gatsby';
import { Link, useIntl } from "gatsby-plugin-intl"
import Info from '../components/info';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { dateFormat } from '../utils/defaults';
import { getResolvedVersionForLanguage, getAllVersions } from '../utils/node';

const BlogPostTemplate = ({ data, pageContext, location }) => {

  const intl = useIntl();
  const { messages, formatDate } = intl;
  const siteTitle = messages['site-title'];
  const { frontmatter: { title, description, date }, excerpt, html } = getResolvedVersionForLanguage(data, intl);
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
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
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
        <footer>
          <Info />
        </footer>
      </article>

      <nav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
                </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query PostsBySlug($slug: String!) {
    allMarkdownRemark(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          id
          html
          fields {
            lang
            slug
          }
          frontmatter {
            date
            description
            title
          }
          excerpt(format: PLAIN, pruneLength: 160, truncate: false)
        }
      }
    }
  }
`;
