import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.typography.body1,
    '& h1': { ...theme.typography.h1 },
  },
}));

export default function NotFoundPage() {
  const intl = useIntl();
  const { formatMessage } = intl;
  const classes = useStyles();

  return (
    <Layout {...{ intl }}>
      <SEO title="404: Not Found" />
      <article className={classes.root}>
        <h1>{intl.messages['404-not-found']}</h1>
        <p>{formatMessage({ id: 'not-found' }, { path: window.location.pathname })}</p>
      </article>
    </Layout>
  );
}
