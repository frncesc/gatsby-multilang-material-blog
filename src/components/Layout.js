import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Fade from '@material-ui/core/Fade';
import TopBar from './TopBar';
import DrawerPanel from './DrawerPanel';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  wrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.mixins.toolbar.minHeight,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: theme.drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    }
  },
  topBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.drawerWidth})`,
      marginLeft: theme.drawerWidth,
    }
  },
  footer: {
    width: '100%',
  },
  drawerPaper: {
    width: theme.drawerWidth,
  }
}));

export default function Layout({ intl, children }) {

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => { setDrawerOpen(!drawerOpen); }
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar className={classes.topBar} {...{ intl, drawerOpen, handleDrawerToggle }} />
      <nav className={classes.drawer} aria-label="main sections">
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerPanel {...{ intl }} />
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open
          >
            <DrawerPanel {...{ intl }} />
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.wrapper}>
        <Container
          className={classes.content}
          maxWidth="md"
        >
          <header>
          </header>
          <main>{children}</main>
        </Container>
        <Footer className={classes.footer} {...{ intl }} />
      </div>
    </div>
  );
}
