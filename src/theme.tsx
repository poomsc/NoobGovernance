import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#52c4cc',
      contrastText: '#fff',
    },
    secondary: {
      main: '#bfd2bf',
    },
    error: {
      main: '#f46382',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
