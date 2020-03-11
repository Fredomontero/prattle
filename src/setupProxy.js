const { createProxyMiddleware } = require('http-proxy-middleware');

// For development
module.exports = function(app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://localhost:4001',
      changeOrigin: true
    })
  );
  app.use(
    '/auth_url/',
    createProxyMiddleware({
      target: 'http://localhost:4000/graphql',
      changeOrigin: true,
    })
  );
  app.use(
    '/chat_url/',
    createProxyMiddleware({
      target: 'http://localhost:4001/graphql',
      changeOrigin: true,
    })
  );
  app.use(
    '/messages_url/',
    createProxyMiddleware({
      target: 'http://localhost:4002/graphql',
      changeOrigin: true,
    })
  );
};