import "dotenv/config";
import express from "express";
import dynamicImport from "./utils/loader.js";
import {
  constructServerLayout,
  sendLayoutHTTPResponse,
} from "single-spa-layout/server";
import path from "path";
import { getConfig } from "../mfConfig/index.js";

const app = express();
const port = 4000;

app.use(express.static(path.resolve(process.cwd(), "server/dist")));
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "./server/views"));

const serverLayout = constructServerLayout({
  filePath: "server/views/index.html",
});

const fragments = {
  "fragment-test": () => "<div>Fragment test</div>",
};

app.get("/", async (req, res, next) => {
  const renderFragment = (name) => {
    return fragments[name]()
  };

  sendLayoutHTTPResponse({
    serverLayout,
    urlPath: req.originalUrl,
    res,
    renderFragment,
    async renderApplication({ appName, propsPromise }) {
      const appInfo = getConfig()[appName];

      const [app, props] = await Promise.all([
        dynamicImport(`${appInfo.baseUrl}/node.js`),
        propsPromise,
      ]);

      return app.serverRender(props);
    },
    /**
     * 
     * headers are collected from mfs and passed down to assembleFinalHeaders function below
     */
    async retrieveApplicationHeaders({ appName, propsPromise }) {
      const appInfo = getConfig()[appName];

      const [app, props] = await Promise.all([
        dynamicImport(`${appInfo.baseUrl}/node.js`),
        propsPromise,
      ]);

      return app.getResponseHeaders(props);
    },
    /**
     * 
     * Props sent from index.html is retrieved here (for e.g props="myProp,authToken")
     */
    async retrieveProp(propName) {
      console.log(propName,'*****propName')
      return "prop value";
    },
    /**
     * Should return object which is header passed to browser
     */
    assembleFinalHeaders(allHeaders) {
      let headers = {};
      allHeaders.forEach(({appProps, appHeaders}) => {
        headers = {...headers, ...appHeaders}
      })
      return headers;
    },
  })
    .then(next)
    .catch((err) => {
      console.error(err);
      res.status(500).send("A server error occurred");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
