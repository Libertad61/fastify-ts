// CommonJs
/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require("fastify-plugin")
require("dotenv").config()
const url1 = process.env.MONGODB_URL1
const url2 = process.env.MONGODB_URL2

/**
 * Connects to a MongoDB database
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function dbConnector1(fastify, options) {
  fastify.register(require("@fastify/mongodb"), {
    url: url1,
    name: "mongo1"
  })
  fastify.register(require("@fastify/mongodb"), {
    url: url2,
    name: "mongo2"
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector1)
