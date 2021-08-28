const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./_config");


module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      "/api/", // replace with your endpoint
      { target: config.url } // replace with your target
    )
  );
};
