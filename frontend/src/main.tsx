import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he';

import App from './App';
import theme from './theme';
import createEmotionCache from './createEmotionCache';
import './index.css';

const cache = createEmotionCache();

document.documentElement.dir = 'rtl';

affectBodyBg();

function affectBodyBg() {
  // Keep a clean page background even before React mounts
  document.body.style.background = theme.palette.background.default;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
