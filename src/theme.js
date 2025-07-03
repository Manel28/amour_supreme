import { createTheme } from '@mui/material/styles';

// Google Font à utiliser dans index.html : Crimson Text
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9b1d20', // bordeaux profond
    },
    secondary: {
      main: '#e0c185', // doré/beige raffiné
    },
    background: {
      default: '#1e1a1a', // fond sombre
      paper: '#2a2323',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0c185',
    },
  },
  typography: {
    fontFamily: '"Crimson Text", serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
      color: '#e0c185',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 20px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '3rem',
          paddingBottom: '3rem',
        },
      },
    },
  },
});

export default theme;
