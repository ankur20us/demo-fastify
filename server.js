// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

const bodySchema = {}
const paramsSchema = {}
const headerSchema = {}

const querystringSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' }
  },
  required: ['name']
}

const responseSchema = {
  200: {
    type: 'object',
    properties: {
      hello: { type: 'string' }
    }
  }
}

const schema = {
  querystring: querystringSchema,
  response: responseSchema,
  headers: headerSchema,
  body: bodySchema,
  params: paramsSchema
}

// Declare a route
fastify.route({
  method: 'GET',
  url: '/',
  schema,
  // this function is executed for every request before the handler is executed
  beforeHandler: async (request, reply) => {
    // E.g. check authentication
    fastify.log.info('>>>> I am in beforehandler')
  },
  handler: async (request, _reply) => {
    return { hello: request.query.name }
  }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
