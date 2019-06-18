const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: {
      protocol: "http",
      host: "localhost",
      port: "8080"
    },
    secure: false,
    auth: "LOGIN:PASS",
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
