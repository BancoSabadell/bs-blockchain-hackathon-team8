require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-better-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

let router = Router().loadMethods()
app.use(bodyParser())

router.get('/', require('./functions/main.js'))
router.post('/reservation', require('./functions/reserve.js'))

app.use(router.middleware())
app.listen(3000)
