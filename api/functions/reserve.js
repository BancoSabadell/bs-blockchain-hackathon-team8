const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.ETH_HOST}:${process.env.ETH_PORT}`))
const ContractCompiler = require('../eth/contractCompiler')
const personas = require('../data/personas')
const cars = require('../data/cars')

let setRenter = function (user, contract, contractCompiler) {
  return new Promise((resolve, reject) => {
    contract.setRenter(user.blockchain.address, true, contractCompiler.getTxOptions(user.blockchain.address), function (err, transaction) {
      if (err) {
        return reject(err)
      } else {
        return resolve(transaction)
      }
    })
  })
}

let unlock = function (user, car) {
  web3.personal.unlockAccount(user.blockchain.address, user.blockchain.password, 1000, (err, result) => {
    if (err) {
      Promise.reject(new Error('Account could not be unlocked'))
      return
    }

    let contractCompiler = getContractCompiler(web3, getCompilerOptions())
    contractCompiler.compileContract()
    let contract = contractCompiler.getFactory().at(car.blockchain.contract)

    return setRenter(user, contract, contractCompiler)
  })
}

module.exports = exports = async function (ctx) {
  let car = cars.find(car => {
    return car.id === ctx.request.body.car
  })

  let renter = personas.find(persona => {
    return persona.id === ctx.request.body.user
  })

  await unlock(renter, car)

  ctx.body = 'ok'
}

function getContractCompiler () {
  return new ContractCompiler(web3, getCompilerOptions())
}

function getCompilerOptions () {
  return {
    contractName: 'InsuranceConditionsContract',
    contractFilePath: '../contracts/InsuranceConditionsContract.sol'
  }
}
