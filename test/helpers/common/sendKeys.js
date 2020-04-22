import { configuration } from '../config'
import chai from 'chai'

const { assert } = chai

let sendKey = async function (driver, element, value) {

  console.log('Value : ' + value)

  if (configuration.runOs === 'iOS') {

    await element.sendKeys(value)
    driver.hideKeyboard()
    await driver.setImplicitWaitTimeout(3000)

  } else {
    await element.sendKeys(value)
    await driver.setImplicitWaitTimeout(1000)
  }
}

export {
  sendKey
}