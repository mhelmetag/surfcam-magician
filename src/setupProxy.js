const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/kbyg",
    createProxyMiddleware({
      target: "https://services.surfline.com",
      changeOrigin: true,
    })
  );

  app.use(
    "/search",
    createProxyMiddleware({
      target: "https://services.surfline.com",
      changeOrigin: true,
    })
  );

  app.use(
    "/cdn*",
    createProxyMiddleware({
      target: "https://cams.cdn-surfline.com",
      changeOrigin: true,
    })
  );
};
