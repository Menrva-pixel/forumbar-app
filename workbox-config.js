module.exports = {
    globDirectory: 'build/',
    globPatterns: ['**/*.{html,js,css,json,ico,png,jpg,jpeg,svg}'],
    swDest: 'build/service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: new RegExp('https://forum-api.dicoding.dev/v1/threads'),
        handler: 'StaleWhileRevalidate',
      },
    ],
  };
  