import '@mdi/font/css/materialdesignicons.css';
import { createApp } from 'vue'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue'

import router from './router/router';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light"
  },
  icons: {
    defaultSet: 'mdi'
  }
});

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
