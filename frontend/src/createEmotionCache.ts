import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

export default function createEmotionCache() {
  return createCache({
    key: 'mui-rtl',
    stylisPlugins: [rtlPlugin],
  });
}
