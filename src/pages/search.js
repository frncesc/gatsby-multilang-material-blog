import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Fuse from 'fuse.js';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useIntl, navigate } from 'gatsby-plugin-intl';
import { getAllVariants } from '../utils/node';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwIcon } from '../utils/FontAwIcon';

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
  const [query, setQuery] = useState(queryString.parse(location.search)['query'] || '');
  const { formatMessage, locale } = intl;

  const fuseEngine = {};

  function getFuseEngine(locale) {
    if (!fuseEngine[locale])
      fuseEngine[locale] = new Fuse(
        data.allMdx.nodes
          .filter(({ fields: { lang } }) => lang === locale)
          .map(({ fields: { slug, tokens }, frontmatter: { title, description, icon } }) => ({
            title,
            description,
            slug,
            icon,
            tokens,
          })),
        { ...FUSE_OPTIONS, keys: ['tokens'] }
      );
    return fuseEngine[locale];
  }

  function performQuery() {
    setTitle(formatMessage({ id: 'search-results' }, { query }));
    setWaiting(true);
    // Delay the search operation, so allowing the first page to be fully rendered
    window.setTimeout(() => {
      const fuse = getFuseEngine(locale);
      setResults(fuse.search(query));
      setWaiting(false);
    }, 0);
  }

  useEffect(performQuery, [query]);
  useEffect(() => setQuery(queryString.parse(location.search)['query'] || ''), [location.search]);

  return (
    <Layout {...{ intl }}>
      <SEO
        title={title}
        alt={getAllVariants(SLUG, location, intl.locale)}
      />
      <article>
        <header>
          <Breadcrumbs {...{ slug: SLUG, intl }} />
          <Typography variant="h2" gutterBottom>{title}</Typography>
        </header>
        <hr />
        {
          (waiting && <CircularProgress />) ||
          (results.length === 0 && <h2>{messages['no-results']}</h2>) ||
          <List>
            {results.map(({ slug, title, description, icon }) => (
              <ListItem button key={slug} onClick={() => navigate(slug)}>
                <ListItemAvatar>
                  <Avatar>
                    <FontAwIcon icon={icon} size="lg" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={title} secondary={description} />
              </ListItem>
            ))}
          </List>
        }
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
          icon
        }
      }
    }
  }
`;
