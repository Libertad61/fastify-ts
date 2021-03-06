/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

async function routes(fastify, options) {
  const collection = fastify.mongo.mongo1.db.collection("planets")

  fastify.get("/", async (request, reply) => {
    return { name: "james", age: 34, city: "Toulon" }
  })

  fastify.get("/planets", async function (request, reply) {
    try {
      const planets = await collection.find({}).toArray()
      return await planets
    } catch (error) {
      throw new Error("Something went wrong..." + error)
    }
  })

  fastify.get("/planets/:name", async function (request, reply) {
    try {
      const planet = await collection.findOne({ name: request.params.name })
      if (!planet) {
        return { msg: "unknown planet..." }
      }
      return await planet
    } catch (error) {
      throw new Error("Something went wrong..." + error)
    }
  })

  const planetSchema = {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
      orderFromSun: { type: "number" },
      hasRings: { type: "boolean" }
    }
  }
  const schema = {
    body: planetSchema
  }

  fastify.post("/planets", { schema }, async (request, reply) => {
    try {
      const test = await collection.insertOne({
        name: request.body.name,
        orderFromSun: request.body.orderFromSun,
        hasRings: request.body.hasRings,
        mainAtmosphere: request.body.mainAtmosphere,
        surfaceTemperatureC: request.body.surfaceTemperatureC
      })
      return test
    } catch (error) {
      throw new Error("Something went wrong..." + error)
    }
  })
}

module.exports = routes
