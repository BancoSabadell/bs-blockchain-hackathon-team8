const cars = require('../data/cars')
const personas = require('../data/personas')
const moment = require('moment')

module.exports = exports = function (ctx) {
  let from = moment(ctx.response.body.from)
  let to = moment(ctx.response.body.to)
  let hours = to.diff(from, 'hours')

  let car = cars.find(car => {
    return car === ctx.request.body.car
  })

  let renter = personas.find(persona => {
    return persona === ctx.request.body.user
  })

  let price = car.basePrice * renter.score * hours

  ctx.body = {
    from: from,
    to: to,
    car: car,
    renter: renter,
    price: price
  }
}
