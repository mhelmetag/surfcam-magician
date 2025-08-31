const { createProxyMiddleware } = require("http-proxy-middleware");

const UA_HEADER_NAME = "user-agent";

function logRes(proxyRes, req, res) {
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

function logReq(proxyReq, req, res) {
  console.log(`\n--- Proxying Request ---`);
  console.log(`From: ${req.headers.host}`);
  console.log(`To: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
}

module.exports = function (app) {
  // Logs *every* incoming request before proxying/static handling
  // app.use((req, res, next) => {
  //   console.log(`\n=== Incoming Request ===`);
  //   console.log(`Method: ${req.method}`);
  //   console.log(`URL: ${req.url}`);
  //   console.log(`Origin: ${req.headers.origin}`);
  //   console.log(`Host: ${req.headers.host}`);
  //   console.log(`Headers:`, req.headers);
  //   next();
  // });

  app.use(
    "/kbyg",
    createProxyMiddleware({
      target: "https://services.surfline.com",
      changeOrigin: true,
      // onProxyReq: logReq,
      // onProxyRes: logRes,
    })
  );

  app.use(
    "/search",
    createProxyMiddleware({
      target: "https://services.surfline.com",
      changeOrigin: true,
      // onProxyReq: logReq,
      // onProxyRes: logRes,
    })
  );

  app.use(
    "/cdn*",
    createProxyMiddleware({
      target: "https://cams.cdn-surfline.com",
      changeOrigin: true,
      // onProxyReq: logReq,
      // onProxyRes: logRes,
    })
  );

  app.use(
    "/oregon*",
    createProxyMiddleware({
      target: "https://hls.cdn-surfline.com",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        logReq(proxyReq, req, res);

        const ua = req.headers[UA_HEADER_NAME];
        // console.log("Headers", req.headers);
        // const proxyUa = proxyReq.headers["User-Agent"];

        // console.log(UA_HEADER_NAME, ua);
        // console.log("proxy User-Agent", proxyUa);
        proxyReq.setHeader(
          UA_HEADER_NAME,
          "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36"
        );
      },
      onProxyRes: logRes,
    })
  );
};
