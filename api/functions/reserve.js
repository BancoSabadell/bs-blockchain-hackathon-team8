const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.ETH_HOST}:${process.env.ETH_PORT}`))

module.exports = exports = function (ctx) {
  let car = ctx.request.body.car
  let user = ctx.request.body.user
}
