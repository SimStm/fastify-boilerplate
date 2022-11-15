export const swaggerOptions = {
  routePrefix: '/api-docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Pricey API',
      description: 'API to Pricey app',
      version: '1.0.0'
    },
    // externalDocs: {
    //   url: 'https://dev.vhchospitality.com/docs',
    //   description: 'Find more info here'
    // },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
}

export const setupSwaggerOptions = (
  host: string,
  port: number | undefined = undefined
) => {
  const options = swaggerOptions
  options.swagger.host = `${host}${port ? `:${port}` : ''}`
  return options
}
