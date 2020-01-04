import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Fuse from 'fuse.js';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import Info from '../components/Info';
import { useIntl, Link } from 'gatsby-plugin-intl';
import { getAllVariants } from '../utils/node';
import queryString from 'query-string';
import CircularProgress from '@material-ui/core/CircularProgress';

const SLUG = '/search/';

// Fuse.js options
// See: https://fusejs.io/
const FUSE_OPTIONS = {
  caseSensitive: false,
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  includeScore: false,
  includeMatches: false,
  threshold: 0.2,
  location: 0,
  distance: 4,
  maxPatternLength: 32,
  minMatchCharLength: 2,
};

export default function Search({ location, data }) {
  const intl = useIntl();
  const { formatMessage, locale } = intl;
  const [results, setResults] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [title, setTitle] = useState(formatMessage({ id: 'search-results' }, { query: '' }));

  useEffect(() => {
    const query = queryString.parse(location.search)['query'] || '';
    // Todo: pre-process and clean text
    const fuse = new Fuse(
      data.allMdx.nodes
        .filter(({ fields: { lang } }) => lang === locale)
        .map(({ fields: { slug }, frontmatter: { title, description, keywords }, excerpt }) => ({
          title,
          url: slug,
          text: `${title} ${description || ''} ${keywords || ''} ${excerpt}`,
        })),
      { ...FUSE_OPTIONS, keys: ['text'] }
    );
    setResults(fuse.search(query));
    setTitle(formatMessage({ id: 'search-results' }, { query }));
    setWaiting(false);
  }, [location.search, data.allMdx.nodes, formatMessage, locale]);

  return (
    <Layout {...{ intl }}>
      <SEO
        title={title}
        alt={getAllVariants(SLUG, location, intl.locale)}
      />
      <article>
        <header>
          <h1>
            {title}
          </h1>
        </header>
        <Breadcrumbs {...{ slug: SLUG, intl }} />
        <hr />
        {(waiting && <CircularProgress />) ||
          <ul>
            {results.map(({ url, title }) => (
              <li><Link key={url} to={url}>{title}</Link></li>
            ))}
          </ul>
        }
        <footer>
          <Info />
        </footer>
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query MyQuery {
    allMdx {
      nodes {
        fields {
          lang
          slug
        }
        frontmatter {
          title
          description
          keywords
        }
        excerpt(pruneLength: 100000)
      }
    }
  }
`;