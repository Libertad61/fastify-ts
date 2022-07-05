/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require("fastify")({
  logger: true
})

fastify.register(require("./utils/mongo"))
fastify.register(require("./routes/root"), { prefix: "/api" })
fastify.register(require("./routes/restaurants"), { prefix: "/resto" })

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
