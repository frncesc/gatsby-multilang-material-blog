import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from "gatsby-plugin-intl"
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { getResolvedVersionForLanguage } from '../utils/node';
import { makeStyles } from '@material-ui/core/styles';
import ShareButtons from '../components/ShareButtons';

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
}));

export default function StaticPageTemplate({ data, location }) {

  const classes = useStyles();
  const intl = useIntl();
  const { locale: lang } = intl;
  const { frontmatter, fields: { slug }, excerpt, body } = getResolvedVersionForLanguage(data, intl);
  const { title, description = excerpt, thumbnail, keywords, author, schema } = frontmatter;
  const { site: { siteMetadata } } = data;

  /**
   * See: https://schema.org/Article
   * Additional fields can be added with a 'schema' entry in frontmatter.
   * Valid JSON strings should be used, like in this example:
   * 
   * schema: '{"assesses":"chemistry"}'
   */
  const sd = {
    '@context': 'https://schema.org/',
    '@type': 'Article',
    name: title,
    abstract: description || '',
    author: author || siteMetadata.localizedAuthors.find(node => node.lang === lang)?.author || siteMetadata.author,
    keywords: keywords || '',
    ...JSON.parse(schema || '{}')
  }

  return (
    <Layout {...{ intl, slug }}>
      <SEO {...{ lang, title, slug, description, thumbnail, location, sd }} />
      <article className={classes.article} >
        <header>
          <h1>{title}</h1>
          <ShareButtons {...{ intl, link: location?.href, title, description, slug, thumbnail }} />
        </header>
        <MDXRenderer {...{ frontmatter, intl }}>{body}</MDXRenderer>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
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
            description
            title
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  src
                }
              }
            }
            keywords
            author
            schema
          }
          excerpt(pruneLength: 160)
        }
      }
    }
    site {
      siteMetadata {
        author
        localizedAuthors {
          lang
          author
        }
      }
    }
  }
`;
