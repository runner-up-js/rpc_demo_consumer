const ClientProxy = require('./clientProxy')
const Messager = require('./server')
const messager = new Messager()
async function test() {
  const Hello = require('./interface/HelloServe')
  const hello = new ClientProxy(Hello, messager)
  const result = await hello.hello('你真的很好', '哈哈哈')
  console.info('远程调用结果', result)
}
test()
