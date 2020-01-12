import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import TopBar from './TopBar';
import Drawer from './Drawer';
import Info from './Info';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.mixins.toolbar.minHeight,
  },
}));

export default function Layout({ intl, children }) {

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar {...{ intl, drawerOpen, setDrawerOpen }} />
      <Drawer {...{ intl, drawerOpen, setDrawerOpen }} />
      <Fade in timeout={400}>
        <Container
          className={classes.content}
          maxWidth="md"
        >
          <header>
          </header>
          <main>{children}</main>
          <footer>
            <Info {...{ intl }} />
          </footer>
        </Container>
      </Fade>
    </div>
  );
}
