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
  const { messages } = intl;
  const [results, setResults] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [title, setTitle] = useState('');
  const query = queryString.parse(location.search)['query'] || '';

  useEffect(() => {
    console.log('in effect!')
    const { formatMessage, locale } = intl;
    const fuse = new Fuse(
      data.allMdx.nodes
        .filter(({ fields: { lang } }) => lang === locale)
        .map(({ fields: { slug, tokens }, frontmatter: { title, description } }) => ({
          title,
          description,
          url: slug,
          tokens,
        })),
      { ...FUSE_OPTIONS, keys: ['tokens'] }
    );
    setResults(fuse.search(query));
    setTitle(formatMessage({ id: 'search-results' }, { query }));
    setWaiting(false);
  }, [intl, data.allMdx.nodes, query]);

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
        {
          (waiting && <CircularProgress />) ||
          (results.length === 0 && <h2>{messages['no-results']}</h2>) ||
          <ul>
            {results.map(({ url, title, description }) => (
              <li key={url}>
                <Link to={url}>{title}</Link><br />
                <span>{description || ''}</span>
              </li>
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
          tokens
        }
        frontmatter {
          title
          description
        }
      }
    }
  }
`;
