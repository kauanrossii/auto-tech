import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createApp } from 'vue'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import App from './App.vue'

import router from './router/router';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light"
  },
  icons: {
    aliases,
    sets: { mdi },
    defaultSet: 'mdi'
  }
});

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app');