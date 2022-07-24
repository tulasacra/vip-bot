/*
  This library contains methods for working with the BCHN and BCHA blockchains.
*/

// Public npm libraries
const BCHJS = require('@psf/bch-js')
const BchMerit = require('bch-merit-lib')
const BchWallet = require('minimal-slp-wallet/index')

class Bch {
  constructor () {
    // Encapsulate dependencies
    this.bchjs = new BCHJS()
    this.wallet = new BchWallet(undefined, {
      noUpdate: true,
      interface: 'consumer-api',
      restURL: 'https://free-bch.fullstack.cash'
    })
    this.bchMerit = new BchMerit({ wallet: this.wallet, env: process.env })
  }

  // Verify that the signed message 'verify' was signed by a specific BCH address.
  verifyMsg (verifyObj) {
    try {
      // Expand the input object.
      const { bchAddr, signedMsg } = verifyObj

      // Convert to BCH address.
      const scrubbedAddr = this.bchjs.SLP.Address.toCashAddress(bchAddr)

      const isValid = this.bchjs.BitcoinCash.verifyMessage(
        scrubbedAddr,
        signedMsg,
        'verify'
      )

      return isValid
    } catch (err) {
      console.error('Error in bch.js/verifyMsg()')
      throw err
    }
  }

  // Calculate and return the merit associated with an SLP address.
  async getMerit (slpAddr) {
    try {
      // Get the aggregated merit of the address.
      if (process.env.VERBOSE_LOG >= 1) console.log(`getMerit slpAddr: ${slpAddr} tokenId: ${process.env.TOKEN_ID}`)
      const merit = await this.bchMerit.merit.agMerit(slpAddr, process.env.TOKEN_ID)
      console.log(`merit: ${merit}`)

      return merit
    } catch (err) {
      console.error('Error in bch.js/getMerit()')
      throw err
    }
  }
}

module.exports = Bch
