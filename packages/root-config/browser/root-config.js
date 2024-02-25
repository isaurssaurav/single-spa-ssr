import { registerApplication, start } from "single-spa";
import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine,
} from "single-spa-layout";
import { getConfig } from "../mfConfig";

const routes = constructRoutes(document.querySelector("#single-spa-layout"));

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    const appConfig = getConfig()[name];
    return import(`${appConfig.baseUrl}/web.js`);
  },
});

constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
start();
