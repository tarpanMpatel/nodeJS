import wd from 'wd'
import chai from 'chai'
import { bsCred, configuration } from '../helpers/config'
import { newRegister } from '../helpers/common/newRegister'
import { currentTime, networkSet, registrationDS } from '../helpers/data'
import { registrationVM } from '../helpers/common/validationmessage'
import { registerAccessibilityId, registerXPath } from '../helpers/common/androidiOSElements/registration'
import { sendKey } from '../helpers/common/sendKeys'

const { assert } = chai
let request = require('request')

const FAILED_TESTS = {}
let test_status
let ssid

let driver

if (configuration.driverType == 'local') {
  driver = wd.promiseChainRemote({ host: '0.0.0.0', port: '4723' })  // for running in local
} else {
  driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub') // for browserstack
}

let testName = 'TC_Auto_Reg_01 and TC_Auto_Reg_02 : Launch Karma APP & Make a successful Registration'

async function registerdmodule1_2 (DeviceName, PlatformVersion, buildName) {

  describe(testName, function () {

        after(async function () {
          if (test_status === 'failed') {
            console.log('---Current Test--'+this.currentTest.state)
            console.log('--FAILED-->' + ssid)

            let api = 'https://' + bsCred.bsUser + ':' + bsCred.bsKey + '@api-cloud.browserstack.com/app-automate/sessions/' + ssid + '.json'
            request({ uri: api, method: 'PUT', form: { 'status': 'error' } })
            FAILED_TESTS[this.currentTest.file] = false
          } if(this.currentTest.state === 'passed'){
            console.log('---Current Test--'+this.currentTest.state)
            console.log('--PASSED-->' + ssid)
            let api = 'https://' + bsCred.bsUser + ':' + bsCred.bsKey + '@api-cloud.browserstack.com/app-automate/sessions/' + ssid + '.json'
            request({ uri: api, method: 'PUT', form: { 'status': 'completed' } })

          }
          /*it('...DONE...', function(done) {
                setTimeout(done, 5000)
           });*/
          await driver.quit()
        })

        beforeEach(function () {
          if (FAILED_TESTS[this.currentTest.file]) {
            console.log('...###...-> BeforeEach___Skip')
            this.skip()
          }
        })

        afterEach(async function () {
        if (this.currentTest.state === 'failed'|| this.currentTest.state === 'undefined') {
        console.log('...***...-> AfterEach___Mark__Store__Failed')
        FAILED_TESTS[this.currentTest.file] = true
        test_status = 'failed'
      }
     /* let test = this.test.parent.tests.reduce(function(prev, curr) {
        return (!curr.state) ? prev : curr;
        });
        console.log("..........########...........->>>"+test.title, test.state);*/
    })

    it('TC_Reg_01 : To Verify launch karma application successfully.', async function () {
      await driver.init(Object.assign(configuration.runOn, {
        name: testName,
        build: buildName,
        networkProfile: networkSet.highInternet,
        device: DeviceName,
        deviceName: DeviceName,
        platformVersion: PlatformVersion
      }))

      console.log('---  ---- Device: '+DeviceName)
      console.log('---  ---- PlatformVersion: '+PlatformVersion)

      await driver.setImplicitWaitTimeout(10000)
      ssid = await driver.getSessionId()
      console.log('--started-->' + ssid)
      const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)
      const btnLogin = await driver.elementByAccessibilityId(registerAccessibilityId.login)
      assert.equal(await registerBtn.isDisplayed() && await btnLogin.isDisplayed(), true, 'Application launch successfully.')
    })

    let mobileNumber = Math.floor(Math.random() * 9000000000) + 1000000000
    newRegister(driver, mobileNumber)

    it('TC_Reg_79 : To Verify user profile screen after successfully registration.', async function () {

      const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
      await profile.click()
      console.log('Taped on profile button.')
      await driver.setImplicitWaitTimeout(3000)

      if (configuration.runOs == 'android') {
        const firstname = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
        registrationVM.actualfirstname = await firstname.getAttribute('text')
        console.log('Actual First Name : ' + registrationVM.actualfirstname)

        const lastname = await driver.elementByAccessibilityId(registerAccessibilityId.lastname)
        registrationVM.actuallastname = await lastname.getAttribute('text')
        console.log('Actual Last Name : ' + registrationVM.actuallastname)

        const email = await driver.elementByAccessibilityId(registerAccessibilityId.email)
        registrationVM.actualemailID = await email.getAttribute('text')
        console.log('Actual Email ID : ' + registrationVM.actualemailID)

        const mobile = await driver.elementByAccessibilityId(registerAccessibilityId.actualmobileNo)
        registrationVM.actualmobileNo = await mobile.getAttribute('text')
        console.log('Actual Mobile : ' + registrationVM.actualmobileNo)
      } else {

        const firstname = await driver.elementByXPath(registerXPath.firstName)
        registrationVM.actualfirstname = await firstname.getAttribute('text')
        console.log('Actual First Name : ' + registrationVM.actualfirstname)

        const lastname = await driver.elementByXPath(registerXPath.lastName)
        registrationVM.actuallastname = await lastname.getAttribute('text')
        console.log('Actual Last Name : ' + registrationVM.actuallastname)

        const email = await driver.elementByXPath(registerXPath.email)
        registrationVM.actualemailID = await email.getAttribute('text')
        console.log('Actual Email ID : ' + registrationVM.actualemailID)

        const mobile = await driver.elementByXPath(registerXPath.phone)
        registrationVM.actualmobileNo = await mobile.getAttribute('text')
        console.log('Actual Mobile : ' + registrationVM.actualmobileNo)
      }

      let mob = '+44' + mobileNumber

      assert.equal(registrationVM.actualfirstname, registrationDS.firstname, 'First Name Matched successfully')
      assert.equal(registrationVM.actuallastname, registrationDS.lastname, 'Last Name Matched successfully')
      assert.equal(registrationVM.actualemailID, registrationDS.email, 'Email Id Matched successfully')
      assert.equal(registrationVM.actualmobileNo, mob, 'Mobile Number Matched successfully')

      await driver.setImplicitWaitTimeout(1000)

    })

  })
}

module.exports = registerdmodule1_2