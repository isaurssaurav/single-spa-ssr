import 'dotenv/config';
import express from 'express';
import dynamicImport from './utils/loader.js';
import {
  constructServerLayout,
  sendLayoutHTTPResponse,
} from "single-spa-layout/server";
import path from "path";
import { getConfig } from '../mfConfig/index.js';

const app = express()
const port = 4000;

app.use(express.static(path.resolve(process.cwd(), "server/dist")));
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "./server/views"));


const serverLayout = constructServerLayout({
  filePath: "server/views/index.html",
});

app.get('/', async (req, res, next) => {
  res.send('Hello World!')
})

app.get('/hello', async (req, res, next) => {
  const renderFragment = (name) => fragments[name]();

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
    async retrieveApplicationHeaders({ appName, propsPromise }) {
      const appInfo = getConfig()[appName];

      const [app, props] = await Promise.all([
        dynamicImport(`${appInfo.baseUrl}/node.js`),
        propsPromise,
      ]);

      return app.getResponseHeaders(props);
    },
    async retrieveProp(propName) {
      return 'prop value';
    },
    assembleFinalHeaders(allHeaders) {
      return Object.assign({}, Object.values(allHeaders));
    },
  })
    .then(next)
    .catch((err) => {
      console.error(err);
      res.status(500).send("A server error occurred");
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})