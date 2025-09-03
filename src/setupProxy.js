const { createProxyMiddleware } = require("http-proxy-middleware");

const UA_HEADER_NAME = "user-agent";
const UA_SPOOF =
  "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36";

const DEBUG = false;
const log = (...args) => {
  if (DEBUG) {
    console.log(...args);
  }
};

function logRes(proxyRes, req, res) {
  log(`\n<<< Raw Response from Target >>>`);
  log(`Status: ${proxyRes.statusCode}`);
  log(`Headers:`, proxyRes.headers);

  // After headers have been written to client, log final state
  res.on("finish", () => {
    log(`\n>>> Final Response to Client >>>`);
    log(`Status: ${res.statusCode}`);
    log(`Headers:`, res.getHeaders());
  });
}

function logReq(proxyReq, req, res) {
  log(`\n--- Proxying Request ---`);
  log(`From: ${req.headers.host}`);
  log(`To: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
}

module.exports = function (app) {
  // Logs all incoming requests before proxying/static handling
  app.use((req, res, next) => {
    log(`\n=== Incoming Request ===`);
    log(`Method: ${req.method}`);
    log(`URL: ${req.url}`);
    log(`Origin: ${req.headers.origin}`);
    log(`Host: ${req.headers.host}`);
    log(`Headers:`, req.headers);
    next();
  });

  app.use(
    "/kbyg",
    createProxyMiddleware({
      target: "https://services.surfline.com",
      changeOrigin: true,
      onProxyReq: logReq,
      onProxyRes: logRes,
    })
  );

  app.use(
    "/search",
    createProxyMiddleware({
      target: "https://services.surfline.com",
      changeOrigin: true,
      onProxyReq: logReq,
      onProxyRes: logRes,
    })
  );

  app.use(
    "/cdn*",
    createProxyMiddleware({
      target: "https://cams.cdn-surfline.com",
      changeOrigin: true,
      onProxyReq: logReq,
      onProxyRes: logRes,
    })
  );

  app.use(
    "/oregon*", // The streams all come from /oregon for some reason
    createProxyMiddleware({
      target: "https://hls.cdn-surfline.com",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        logReq(proxyReq, req, res);

        proxyReq.setHeader(UA_HEADER_NAME, UA_SPOOF);
      },
      onProxyRes: logRes,
    })
  );
};
