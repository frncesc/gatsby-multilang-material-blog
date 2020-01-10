import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
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

export default function ({ intl, children }) {

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar {...{ intl, drawerOpen, setDrawerOpen }} />
      <Drawer {...{ intl, drawerOpen, setDrawerOpen }} />
      <Container
        className={classes.content}
        maxWidth="lg"
      >
        <header>
        </header>
        <main>{children}</main>
        <footer>
          <Info {...{ intl }} />
        </footer>
      </Container>
    </div>
  );
}
