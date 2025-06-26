const fastify = require('fastify')

const port = process.env.PORT || 4000

const app = fastify({ logger: true })

app.register(require('./etag'), { prefix: '/etag' })

// Function to sanitize user input to prevent XSS attacks
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  // Replace potentially dangerous characters with their HTML entities
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

app.route({
  method: 'GET',
  url: '/greet',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        greeting: { type: 'string' },
        name: { type: 'string' },
        excited: { type: 'boolean' }
      },
      required: ['name']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    // Sanitize user input to prevent XSS attacks
    const greeting = sanitizeInput(request.query.greeting ? request.query.greeting : 'Hello')
    const name = sanitizeInput(request.query.name)
    let message = greeting + ' ' + name + '!'
    if (request.query.excited) {
      message = message.toUpperCase() + '!!'
    }

    reply.send({ message })
  }
})

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' })
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
