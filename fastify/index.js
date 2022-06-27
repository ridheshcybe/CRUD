const fastify = require('fastify')()
let data = [];

fastify.get('/', (req, reply) => {
  reply.send(data)
})

fastify.post('/', (req, reply) => {
  data.push(req.body)
  reply.send({ status: 'ok' })
})

fastify.put('/', (req, reply) => {
  data[req.query.id || 0] = req.body;
  reply.send(data);
})

fastify.delete('/', (req, reply) => {
  const id = req.query.id;
  id ? data[id] = req.body : data = [];
  reply.send(data);
})

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})