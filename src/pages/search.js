import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import Info from '../components/Info';
import { useIntl } from 'gatsby-plugin-intl';
import { getAllVariants } from '../utils/node';
import queryString from 'query-string';

export default function Search({ location }) {

  const intl = useIntl();
  const { formatMessage } = intl;
  const slug = '/search/';
  const query = queryString.parse(location.search)['query'] || '';
  const title = formatMessage({ id: 'search-results' }, { query });

  return (
    <Layout {...{ intl }}>
      <SEO
        title={title}
        alt={getAllVariants(slug, location, intl.locale)}
      />
      <article>
        <header>
          <h1>
            {title}
          </h1>
        </header>
        <Breadcrumbs {...{ slug, intl }} />
        <footer>
          <Info />
        </footer>
      </article>
    </Layout>
  );

}