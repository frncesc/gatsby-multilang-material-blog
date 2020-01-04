import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  const intl = useIntl();
  return (
    <Layout {...{ intl }}>
      <SEO title="404: Not Found" />
      <h1>{intl.messages['404-not-found']}</h1>
      <p>{intl.messages['not-found']}</p>
    </Layout>
  );
}
