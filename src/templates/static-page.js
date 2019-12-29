import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { useIntl, Link } from "gatsby-plugin-intl"
import Info from '../components/info';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { dateFormat } from '../utils/defaults'
import { getResolvedVersionForLanguage, getAllVersions } from '../utils/node';

const PageTemplate = ({ data, location }) => {

  const intl = useIntl();
  const { messages, formatDate } = intl;
  const siteTitle = messages['site-title'];
  const { frontmatter, fields, excerpt, body } = getResolvedVersionForLanguage(data, intl);
  const { title, description, date } = frontmatter;

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
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">{siteTitle}</Link>
          {fields.slug.split('/').filter(s => s.length > 0).map((fragment, n, cmp) => (n < cmp.length - 1) ?
            <Link to={`/${cmp.slice(0, n + 1).join('/')}/`}>{fragment}</Link> :
            <Typography color="textPrimary">{fragment}</Typography>
          )}
        </Breadcrumbs>
        <MDXRenderer {...{ frontmatter, intl }}>{body}</MDXRenderer>
        <hr />
        <footer>
          <Info />
        </footer>
      </article>
    </Layout>
  );
}

export default PageTemplate;

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
