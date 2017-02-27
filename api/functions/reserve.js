const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.ETH_HOST}:${process.env.ETH_PORT}`))
const ContractCompiler = require('../eth/contractCompiler')

module.exports = exports = function (ctx) {
  return new Promise(function (resolve, reject) {
    let car = ctx.request.body.car
    let user = ctx.request.body.user

    web3.personal.unlockAccount(user.blockchain.address, user.blockchain.password, 1000, (err, result) => {
      if(err){
        reject(new Error('Account could not be unlocked'))
        return
      }

      let contractCompiler = getContractCompiler(web3, getCompilerOptions())
      contractCompiler.compileContract()
      let contract = contractCompiler.getFactory().at(car.blockchain.contract)
      contract.setRenter(user.blockchain.address, true, contractCompiler.getTxOptions(user.blockchain.address), function(err, transaction) {
        if(err) {
          reject(err)
        }else{
          resolve(transaction)
        }
      })
    })

  })
}

function getContractCompiler () {
  return new ContractCompiler(web3, getCompilerOptions())
}

function getContractConstructorArgs (renterAddress, rentedAddress, insurerAddress) {
  return [
    renterAddress,
    rentedAddress,
    insurerAddress,
    true, // _coverageLiabilitieActive
    false, // _coverageAssistanceActive
    false, // _coverageRobberyActive
    false // _coverageAllRiskActive
  ]
}

function getCompilerOptions () {
  return {
    contractName: 'InsuranceConditionsContract',
    contractFilePath: '../contracts/InsuranceConditionsContract.sol'
  }
}

function getInsurerBlockchainAddress () {
  // TODO Who is the insurer?, will be hardcoded by now
  return '0xa2db78b8a4830ca83fae767a4a9a0dfa8bab027d'
}
