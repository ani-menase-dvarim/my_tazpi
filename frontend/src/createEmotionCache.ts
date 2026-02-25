import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

export default function createEmotionCache() {
  return createCache({
    key: 'mui-rtl',
    stylisPlugins: [rtlPlugin],
    secret_key: "sb_publishable_roA420kjqxP0vZDnO20aog_ozzzn07O"
  });
}
