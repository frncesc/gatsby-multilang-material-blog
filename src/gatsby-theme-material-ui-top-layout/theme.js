
import { purple, deepPurple, red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: purple,
      secondary: deepPurple,
      error: red,
    },
    typography: {
      fontFamily: [
        // 'Open Sans',
        'Roboto',
        'sans-serif'
      ].join(','),
      h1: {
        fontSize: "5rem",
      }
    },
    drawerWidth: '14rem',
  }),
  {});

export default theme;
