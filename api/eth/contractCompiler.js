'use strict'

const fs = require('fs')
const solc = require('solc')

const Deployer = require('contract-deployer')

class ContractCompiler {

  constructor (web3, options) {
    this.web3 = web3
    this.contractName = options.contractName
    this.contractFilePath = options.contractFilePath
    this.contractFileEncoding = options.contractFileEncoding || 'utf8'
    this.compiledContract = null
  }

  compileContract () {
    const conctractSource = fs.readFileSync(this.contractFilePath, this.contractFileEncoding)
    const solcCompilation = solc.compile(conctractSource, 1) // 1 activates the optimiser
    this.compiledContract = solcCompilation.contracts[this.getContractNameKey()]
  }

  getContractNameKey () {
    return ':' + this.contractName
  }

  getAbi () {
    return this.compiledContract.interface
  }

  getBytecode () {
    let bytecode = this.compiledContract.bytecode
    if (bytecode.substring(0, 2) !== '0x') {
      bytecode = '0x' + bytecode
    }
    return bytecode
  }

  getGasEstimate () {
    return this.web3.eth.estimateGas({ data: this.getBytecode() })
  }

  getFactory () {
    return this.web3.eth.contract(JSON.parse(this.getAbi()))
  }

  deploy (constructorArgs, fromAddress) {
    return new Promise(function (resolve, reject) {
      const contractSources = {}
      contractSources[this.contractName] = fs.readFileSync(this.contractFilePath, this.contractFileEncoding)
      const deployer = new Deployer(this.web3, {sources: contractSources}, 0)
      deployer.deploy(this.contractName, constructorArgs, {from: fromAddress})
        .then(resolve)
        .catch(reject)
    }.bind(this))
  }

  getTxOptions (fromAddress) {
    return {from: fromAddress}
  }

}

module.exports = ContractCompiler
