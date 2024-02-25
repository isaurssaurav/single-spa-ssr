import { createApp, h } from "vue";
import App from '../components/App.vue';
import singleSpaVue from 'single-spa-vue';

const vueLifecycles = singleSpaVue({
  createApp,
  replaceMode: true, // Client side rendering only for hydration
  appOptions: {
    render() {
      return h(App);
    },
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;