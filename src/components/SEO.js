/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { getImgUrl } from '../utils/misc';
import { getAllVariants } from '../utils/node';

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        siteRoot
        cardFileName
        supportedLanguages
      }
    }
  }
`;

function SEO({ location, description, lang, meta, title, slug, thumbnail, ...props }) {

  const { site: { siteMetadata } } = useStaticQuery(query);
  const metaDescription = description || siteMetadata.description;
  const alt = (slug && location && lang && getAllVariants(siteMetadata.supportedLanguages, slug, location, lang)) || [];

  const metaTags = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: slug ? 'summary_large_image' : 'summary',
    },
    {
      name: 'twitter:creator',
      content: siteMetadata.author,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ].concat(meta);

  const cardUrl = getImgUrl({ siteMetadata, slug, lang, thumbnail });
  if (cardUrl) {
    metaTags.push(
      {
        name: 'twitter:image',
        content: cardUrl,
      },
      {
        property: 'og:image',
        content: cardUrl,
      },
    );
  }

  return (
    <Helmet
      {...props}
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={metaTags}
      link={alt.map(({ lang, href }) => ({
        rel: 'alternate',
        hreflang: lang,
        href,
      }))}
    />
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
  slug: null,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  slug: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
