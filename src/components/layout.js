import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SelectLanguage from './select-language';
//import { Link } from 'gatsby-theme-material-ui';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';

const Layout = ({ location, title, children }) => {

  const { messages, locale } = useIntl();
  const rootPath = `${__PATH_PREFIX__}/`;

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <header>
          <Typography variant={location.pathname === rootPath ? 'h4' : 'h5'} component={location.pathname === rootPath ? 'h1' : 'h3'} gutterBottom>
            <Link to="/" color="secondary">
              {title}
            </Link>
          </Typography>
        </header>
        <p>
          {messages[locale]}<br />
          <FormattedMessage id="change-language" />
        </p>
        <SelectLanguage />
        <main>{children}</main>
        <footer>
        </footer>
      </Box>
    </Container>
  );
}

export default Layout;
