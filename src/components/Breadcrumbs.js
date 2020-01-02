import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link } from "gatsby-plugin-intl"

export default function ({ slug, intl }) {

  const { messages, locale, defaultLocale } = intl;
  const siteTitle = messages['site-title'];
  const allSlugs = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
              lang
            }
          }
        }
      }
    }
  `).allMdx.edges.map(edge => edge.node);

  const getFragments = slug => slug.split('/').filter(s => s.length > 0);

  const getSlugTitle = (slug, intl) => {
    const pages = allSlugs.filter(({ fields }) => fields.slug === slug);
    const match = pages.find(({ fields }) => fields.lang === locale) || pages.find(({ fields }) => fields.lang === defaultLocale);
    return match ? match.frontmatter.title : getFragments(slug).slice(-1);
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link to="/">{siteTitle}</Link>
      {getFragments(slug).map((fragment, n, cmp) => {
        const subSlug = `/${cmp.slice(0, n + 1).join('/')}/`;
        const title = getSlugTitle(subSlug);
        if (n < cmp.length - 1) {
          // Parent path
          return <Link to={subSlug} key={n}>{title}</Link>
        }
        else
          // Current page
          return <Typography color="textPrimary" key={n}>{title}</Typography>
      })}
    </Breadcrumbs>
  );

}