const options = {
  swaggerDefinition: {
    info: {
      description: 'Order API',
      title: 'ORDER API',
      version: '1.0.0'
    },
    host: `${process.env.HOST}:${process.env.PORT}`,
    basePath: '/',
    consumes: [
      'application/json',
      'application/form-data'
    ],
    produces: [
      'application/json',
      'application/xml',
      'application/form-data'
    ],
    schemes: ['http'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'access-token',
        description: 'Users are authorized with JWT'
      },
      lang: {
        type: 'apiKey',
        in: 'header',
        name: 'lang',
        description: 'Language'
      }
    }
  },
  basedir: __dirname,
  files: [
    '../../controllers/**/*.js',
  ]
}

export default options;