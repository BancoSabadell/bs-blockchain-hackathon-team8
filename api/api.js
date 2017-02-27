require('dotenv').config()

const Web3 = require('web3')
const Koa = require('koa')
const Router = require('koa-better-router')
const cors = require('kcors')

const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.ETH_HOST}:${process.env.ETH_PORT}`))
const app = new Koa()

app.use(cors())
let router = Router().loadMethods()

router.get('/', require('./functions/main.js'))
router.get('/cars', require('./functions/cars.js'))

app.use(router.middleware())
app.listen(3000)
