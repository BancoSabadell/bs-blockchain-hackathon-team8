module.exports = exports = function (ctx) {
  let cars = require('../data/cars')
  let owners = require('../data/personas')

  let reservations = [{
    id: 'r001',
    car: cars[0],
    lender: owners[0],
    from: '2017-02-27T14:00:00.000Z',
    to: '2017-02-28T15:00:00.000Z'
  }, {
    id: 'r002',
    car: cars[0],
    lender: owners[1],
    from: '2017-03-01T09:00:00.000Z',
    to: '2017-03-05T15:00:00.000Z'
  }]

  ctx.body = reservations
}
