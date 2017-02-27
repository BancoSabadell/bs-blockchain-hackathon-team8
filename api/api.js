require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-better-router')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(cors())
let router = Router().loadMethods()
app.use(bodyParser())

router.get('/', require('./functions/main.js'))
router.get('/cars', require('./functions/cars.js'))
router.get('/pending', require('./functions/pending.js'))
router.post('/estimate', require('./functions/estimation.js'))
router.post('/reservation', require('./functions/reserve.js'))

app.use(router.middleware())
app.listen(3000)
