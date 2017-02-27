module.exports = exports = function (ctx) {
  let cars = require('../data/cars')
  let owners = require('../data/personas')

  cars.forEach(car => {
    car.owner = owners.find(owner => {
      return owner.id === car.owner
    })
  })

  ctx.body = cars
}
