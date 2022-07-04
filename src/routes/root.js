/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("planets")

  fastify.get("/", async (request, reply) => {
    return { name: "james", age: 34, city: "Toulon" }
  })

  fastify.get("/planets", async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error("No documents found")
    }
    return result
  })
}

module.exports = routes
