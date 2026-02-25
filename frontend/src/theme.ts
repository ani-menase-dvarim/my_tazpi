import { createTheme } from '@mui/material/styles';

export const APP_COLORS = {
  background: '#EFEEE8', // רקע בהיר כמו בתמונה
  cardShadow: '0 18px 45px rgba(0,0,0,0.10)',
  border: '#E8DFC6',
  primary: '#F4C842', // זהב
  primaryHover: '#E3B52D'
};

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: { main: APP_COLORS.primary, dark: APP_COLORS.primaryHover },
    secondary: { main: '#1F2937', light: '#374151', dark: '#111827' },
    background: {
      default: APP_COLORS.background,
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280'
    }
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: '"Heebo", sans-serif'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: APP_COLORS.background
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: APP_COLORS.cardShadow
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#fff',
          '& fieldset': {
            borderColor: APP_COLORS.border
          },
          '&:hover fieldset': {
            borderColor: APP_COLORS.primary
          },
          '&.Mui-focused fieldset': {
            borderColor: APP_COLORS.primary,
            borderWidth: 2
          }
        },
        input: {
          paddingTop: 14,
          paddingBottom: 14
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 800,
          textTransform: 'none'
        },
        contained: {
          backgroundColor: APP_COLORS.primary,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: APP_COLORS.primaryHover,
            boxShadow: 'none'
          }
        }
      }
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none'
        }
      }
    }
  }
});

export default theme;