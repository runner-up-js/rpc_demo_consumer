const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io-client')

//
class Messager {
  constructor() {
    this.messageMap = new Map()
    this.socket = new io('ws://localhost:3000')
    console.info('socket', this.socket)
    this.socket.on('reply', (data) => {
      console.info('reply', data)
      const { messageId, replyMsg } = data
      const callback = this.messageMap.get(messageId)
      callback(replyMsg.data)
    })
    http.listen(4012, () => {})
    console.log('socket服务创建成功')
  }
  invoke(message) {
    return new Promise((resolve, reject) => {
      while (!this.socket) {}
      console.info('invoke', message)
      const messageId = this.messageMap.size + 1
      const messageObj = {
        message,
        messageId,
      }
      this.socket.emit('invoke', messageObj)
      this.messageMap.set(messageId, resolve)
    })
  }
}
module.exports = Messager
