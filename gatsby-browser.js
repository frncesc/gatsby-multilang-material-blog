
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import MenuRounded from '@material-ui/icons/MenuRounded';
// custom styles
import './src/styles/global.css';
// PrismJS styles
import 'prismjs/themes/prism-tomorrow.css';

// Layout based on: https://siriwatknp.github.io/mui-layout/
import {
 Root,
 Header,
 Nav,
 Content,
 Footer,
 presets,
} from 'mui-layout';

const baseTheme = createMuiTheme(); // or use your own theme;

/**
 * Preset layouts are:
 * - createStandardLayout
 * - createFixedLayout
 * - createContentBasedLayout
 * - createCozyLayout
 * - createMuiTreasuryLayout
 */
  
const config = {
  ...presets.createStandardLayout(),
  // navWidth: 256,                 // number | object
  // navAnchor: 'left',
  // navVariant: 'temporary',       // string | object
  // collapsible: false,            // boolean | object
  // collapsedWidth: 64,            // number | object
  // collapsedBreakpoint: 'md',     // one of ['sm', 'md', 'lg']
  // autoCollapsedDisabled: false,
  // clipped: false,                // boolean | object
  // heightAdjustmentDisabled: false,
  // initialAdjustmentHeight: 64,   // number | object
  // heightAdjustmentSpeed: 144,    // number(ms)
  // headerPosition: 'sticky',    // one of ['static', 'relative', 'sticky', 'fixed', 'absolute', 'fixed'] | object
  // squeezed: false,               // boolean | object
  // footerShrink: true,            // boolean | object
}
 
const App = ({children}) => (
  <ThemeProvider theme={baseTheme}>
   <Root config={config}>
     <Header
       renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)}
     >
       header
     </Header>
     <Nav
       renderIcon={collapsed =>
         collapsed ? <ChevronRight /> : <ChevronLeft />
       }
     >
       nav
     </Nav>
     <Content>
       {children}
     </Content>
     <Footer>
       footer
     </Footer>
   </Root>
  </ThemeProvider>
);

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathname", location.pathname)
  console.log("old pathname", prevLocation ? prevLocation.pathname : null)
}
// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}