import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TopBar from './TopBar';

export default function({ intl, children }) {

  // const rootPath = `${__PATH_PREFIX__}/`;

  return (
    <>
      <CssBaseline />
      <TopBar {...{ intl }} />
      <Container maxWidth="lg">
        <header>
        </header>
        <main>{children}</main>
        <footer>
        </footer>
      </Container>
    </>
  );
}
