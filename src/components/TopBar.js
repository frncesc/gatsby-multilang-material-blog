import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby-plugin-intl';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SelectLanguage from './SelectLanguage';
import SearchBox from './SearchBox';

function HideOnScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};


export default function ({ intl, children }) {

  return (
    <div className={'top-bar-root'}>
      <HideOnScroll {...{ children }}>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" className={'top-bar-menu-button'} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={'top-bar-title'}>
              <Link to='/'>{intl.messages['site-title']}</Link>
            </Typography>
            <SearchBox />
            <SelectLanguage />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
}