import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby-plugin-intl';
import TopBar from './TopBar';

export default function({ location, title, children }) {

  const rootPath = `${__PATH_PREFIX__}/`;

  return (
    <>
      <CssBaseline />
      <TopBar {...{ title }} />
      <Container maxWidth="lg">
        <header>
          <Typography variant={location.pathname === rootPath ? 'h4' : 'h5'} component={location.pathname === rootPath ? 'h1' : 'h3'} gutterBottom>
            <Link to="/" color="secondary">
              {title}
            </Link>
          </Typography>
        </header>
        <main>{children}</main>
        <footer>
        </footer>
      </Container>
    </>
  );
}
