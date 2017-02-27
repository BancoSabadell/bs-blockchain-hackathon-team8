require('dotenv').config()

const Web3 = require('web3')
const Koa = require('koa')
const Router = require('koa-better-router')
const bodyParser = require('koa-bodyparser')

const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.ETH_HOST}:${process.env.ETH_PORT}`))
const app = new Koa()

let router = Router().loadMethods()
app.use(bodyParser())

router.get('/', require('./functions/main.js'))
router.post('/reservation', require('./functions/reserve.js'))

app.use(router.middleware())
app.listen(3000)
