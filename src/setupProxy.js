const { createProxyMiddleware } = require("http-proxy-middleware");

function onProxyRes(proxyRes, req, res) {
  console.log(`\n<<< Raw Response from Target >>>`);
  console.log(`Status: ${proxyRes.statusCode}`);
  console.log(`Headers:`, proxyRes.headers);

  // After headers have been written to client, log final state
  res.on("finish", () => {
    console.log(`\n>>> Final Response to Client >>>`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.getHeaders());
  });
}

function onProxyReq(proxyReq, req, res) {
  console.log(`\n--- Proxying Request ---`);
  console.log(`From: ${req.headers.host}`);
  console.log(`To: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
}

module.exports = function (app) {
  // Logs *every* incoming request before proxying/static handling
  app.use((req, res, next) => {
    console.log(`\n=== Incoming Request ===`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Origin: ${req.headers.origin}`);
    console.log(`Host: ${req.headers.host}`);
    console.log(`Headers:`, req.headers);
    next();
  });

  app.use(
    "/kbyg",
    createProxyMiddleware({
      target: "https://services.surfline.com",
      changeOrigin: true,
      onProxyReq,
      onProxyRes,
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

  app.use(
    "/oregon*",
    createProxyMiddleware({
      target: "https://hls.cdn-surfline.com",
      changeOrigin: true,
    })
  );
};
