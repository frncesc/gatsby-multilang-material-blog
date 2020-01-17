import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link, useIntl } from "gatsby-plugin-intl"
import Breadcrumbs from '../components/Breadcrumbs';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { dateFormat } from '../utils/defaults';
import { getResolvedVersionForLanguage, getAllVersions } from '../utils/node';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  article: {
    ...theme.typography.body1,
    '& h1': { ...theme.typography.h1 },
    '& h2': { ...theme.typography.h2 },
    '& h3': { ...theme.typography.h3 },
    '& h4': { ...theme.typography.h4 },
    '& h5': { ...theme.typography.h5 },
    '& h6': { ...theme.typography.h6 },
    '& code[class*="language-"], pre[class*="language-"]': {
      fontSize: '0.9em',
    }
  },
  breadcrumbs: {
    marginBottom: theme.spacing(4),
  }
}));

export default function BlogPostTemplate({ data, pageContext, location }) {

  const classes = useStyles();
  const intl = useIntl();
  const { formatDate } = intl;
  const { frontmatter, excerpt, body, fields: { slug } } = getResolvedVersionForLanguage(data, intl);
  const { title, description, date } = frontmatter;
  const { previous, next } = pageContext;

  return (
    <Layout {...{ intl }}>
      <SEO
        title={title}
        description={description || excerpt}
        alt={getAllVersions(data, location, intl.locale)}
      />
      <article className={classes.article}>
        <header>
          <Breadcrumbs className={classes.breadcrumbs} {...{ slug, intl }} />
          <h1>{title}</h1>
          <p>{formatDate(date, dateFormat)}</p>
        </header>
        <MDXRenderer {...{ frontmatter, intl }}>{body}</MDXRenderer>
      </article>

      <hr />

      <nav>
        <ul>
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}
          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
                </Link>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PostsBySlug($slug: String!) {
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
