// CommonJs
/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require("fastify-plugin")
require("dotenv").config()
const url = process.env.MONGODB_URL

/**
 * Connects to a MongoDB database
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function dbConnector(fastify, options) {
  fastify.register(require("@fastify/mongodb"), {
    url: url
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)
