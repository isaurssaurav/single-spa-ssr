import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import App from "../components/App.vue";

/**
 * Send Custom headers
 *
 */
export const getResponseHeaders = (props) => {
  return {
    "x-vue-app": 1,
  };
};

/**
 * Send App content
 */
export function serverRender(props) {
  const htmlStream = renderToString(createSSRApp(App));
  const assets = `<style id="jss-server-side-css">body { background:grey; }</style>`;
  
  return { content: htmlStream, assets };
}
