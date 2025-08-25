export default ({ env }) => ({
  host: env('HOST', '::'), // Изменено с '0.0.0.0' на '::'
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('URL'),
  proxy: true
});
