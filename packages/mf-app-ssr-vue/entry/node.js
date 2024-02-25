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
  console.log("Rendering React app");

  const htmlStream = renderToString(createSSRApp(App));
  const assets = `style id="jss-server-side-css">body { background:red; }</style>`;
  return { content: htmlStream, assets };
}
