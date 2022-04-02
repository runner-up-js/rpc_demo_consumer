const ClientProxy = function (interServe, rpcServe) {
  return new Proxy(new interServe(), {
    get(target, phrase) {
      console.info('发起远程调用', target, phrase)
      if (target[phrase] instanceof Function) {
        return async function (...arg) {
          return await rpcServe.invoke({
            target: target,
            phrase: phrase,
            arg: { ...arg },
          })
        }
      }
      return target[phrase]
    }
  })
}
module.exports = ClientProxy
