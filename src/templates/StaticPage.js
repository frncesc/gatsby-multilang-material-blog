import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from "gatsby-plugin-intl"
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { getResolvedVersionForLanguage, getAllVersions } from '../utils/node';
import { makeStyles } from '@material-ui/core/styles';
import { getImgUrl } from '../utils/misc';
import { siteMetadata } from '../../gatsby-config';
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
  const alt = getAllVersions(data, location, lang);
  const { frontmatter, fields: { slug }, excerpt, body } = getResolvedVersionForLanguage(data, intl);
  const { title, description = excerpt, thumbnail } = frontmatter;
  const { shareOn, shareMeta } = siteMetadata;
  const img = getImgUrl(slug, lang, thumbnail);

  return (
    <Layout {...{ intl, slug }}>
      <SEO {...{ lang, title, slug, description, thumbnail, alt }} />
      <article className={classes.article} >
        <header>
          <h1>{title}</h1>
          <ShareButtons {...{ intl, link: location?.href, title, description, img, shareOn, ...shareMeta }} />
        </header>
        <MDXRenderer {...{ frontmatter, intl }}>{body}</MDXRenderer>
      </article>
    </Layout>
  );
}

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
            description
            title
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  src
                }
              }
            }
          }
          excerpt(pruneLength: 160)
        }
      }
    }
  }
`;
