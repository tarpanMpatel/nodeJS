import wd from 'wd'
import chai from 'chai'
import { bsCred, configuration } from '../helpers/config'
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

let testName = 'TC_Auto_Reg_03 : To verify "Register" page and "Verification Code" screen validations scenarios.'

async function registerdmodule3 (DeviceName, PlatformVersion, buildName) {

  describe(testName, function () {

   after(async function () {
      if (test_status === 'failed') {
        console.log('---Current Test--'+this.currentTest.state)
        console.log('--FAILED-->' + ssid)

        let api = 'https://' + bsCred.bsUser + ':' + bsCred.bsKey + '@api-cloud.browserstack.com/app-automate/sessions/' + ssid + '.json'
        request({ uri: api, method: 'PUT', form: { 'status': 'error' } })
        FAILED_TESTS[this.currentTest.file] = false
      } if(this.currentTest.state === 'passed') {
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

    afterEach(function () {
      if (this.currentTest.state === 'failed'|| this.currentTest.state === 'undefined') {
        console.log('...***...-> AfterEach___Mark__Store__Failed')
        FAILED_TESTS[this.currentTest.file] = true
        test_status = 'failed'
      }
       /* let test = this.test.parent.tests.reduce(function(prev, curr) {
        return (!curr.state) ? prev : curr;
        });
        console.log("...........########...........->>>"+test.title, test.state);*/
    })

    it('TC_Reg_01 : To Verify launch karma application successfully.', async function () {
      await driver.init(Object.assign(configuration.runOn, {
        name: testName,
        build: buildName,
        deviceName: DeviceName,
        networkProfile: networkSet.highInternet,
        device: DeviceName, platformVersion: PlatformVersion
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

    it('TC_Reg_02 : To Verify "REGISTER" button functionality', async function () {

      await driver.setImplicitWaitTimeout(3000)
      const register = await driver.elementByAccessibilityId(registerAccessibilityId.register)
      await register.click()
      console.log('Clicked on \'Register\' button.')
      await driver.setImplicitWaitTimeout(3000)

      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
      const pswd = await driver.elementByAccessibilityId(registerAccessibilityId.password)
      const checkBox = await driver.elementByAccessibilityId(registerAccessibilityId.aggrementCheckbox)
      let login
      if (configuration.runOs == 'android') {
        login = await driver.elementByXPath(registerXPath.login)
      } else { login = await driver.elementByAccessibilityId(registerAccessibilityId.loginlink)}

      assert.equal(await mobileNo.isDisplayed() && await pswd.isDisplayed() && await checkBox.isDisplayed() && await login.isDisplayed(), true, 'Successfully Redirected to Register page.')
    })

    it('TC_Reg_11 : To verify validation message for less then 10 digit phone number.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)

      await sendKey(driver, mobileNo, registrationDS.invalidMobile)
      console.log('Entered Mobile number :' + registrationDS.invalidMobile)

      const mobileNoError = await driver.elementByAccessibilityId(registerAccessibilityId.mobileNoError)

      registrationVM.actualMobileErrormsg = await mobileNoError.text()
      console.log('Actual InValid Mobile Number' + registrationVM.actualMobileErrormsg)

      assert.equal(registrationVM.actualMobileErrormsg, registrationVM.expectedMobileErrormsg, 'validation message displayed successfully')
    })

    it('TC_Reg_13 : To verify validation message for less than 6 characters in password field.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const pswd = await driver.elementByAccessibilityId(registerAccessibilityId.password)

      await sendKey(driver, pswd, registrationDS.invalipassword)
      console.log('Entered  Password : ' + registrationDS.invalipassword)

      const passwordError = await driver.elementByAccessibilityId(registerAccessibilityId.passwordEroor)
      registrationVM.actualPasswordErrormsg = await passwordError.text()
      console.log('Actual Password Error Message' + registrationVM.actualPasswordErrormsg)

      assert.equal(registrationVM.actualPasswordErrormsg, registrationVM.expectedSixCharacterErrormsg, 'validation message displayed successfully')
    })

    it('TC_Reg_17 : To verify "I agree to the karma..." checkbox functionality with invalid phone number and password.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
      await sendKey(driver, mobileNo, registrationDS.invalidMobile)
      console.log('Entered invalid Mobile number : ' + registrationDS.invalidMobile)

      await driver.setImplicitWaitTimeout(1000)
      const pswd = await driver.elementByAccessibilityId(registerAccessibilityId.password)
      await sendKey(driver, pswd, registrationDS.invalipassword)
      console.log('Entered  Password: ' + registrationDS.invalipassword)

      await driver.waitForElementByAccessibilityId(registerAccessibilityId.aggrementCheckbox,5000)
      await driver.setImplicitWaitTimeout(1000)
      const checkBox = await driver.elementByAccessibilityId(registerAccessibilityId.aggrementCheckbox)
      await checkBox.click()
      console.log('Clicked on check box.')

      await driver.waitForElementByAccessibilityId(registerAccessibilityId.register,5000)
      const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)

      assert.equal(await registerBtn.isEnabled(), true, 'Register button is disable')
    })

    it('TC_Reg_19 : To verify "Terms of service" link from "I agree to the Karma." checkbox.', async function () {

      const terms = await driver.elementByAccessibilityId(registerAccessibilityId.terms)
      await terms.click()
      console.log('Tap on \'Terms of service\' link.')
      await driver.setImplicitWaitTimeout(5000)

      const termsHeader = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
      let termsPageHeader = await termsHeader.text()
      assert.equal(termsPageHeader, registrationVM.expectedtTermsPageHeader, 'Pass. Verfied Terms of Service page')
    })

    it('TC_Reg_20 : To verify back button functionality from "Terms of service". ', async function () {

      const goBack = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
      await goBack.click()
      console.log('Tap on Go Back icon.')

      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
      const pswd = await driver.elementByAccessibilityId(registerAccessibilityId.password)
      await driver.setImplicitWaitTimeout(1000)

      assert.equal(await mobileNo.isDisplayed() && await pswd.isDisplayed(), true, 'Successfully Redirected to Register page.')
    })

    it('TC_Reg_21 : To verify "Privacy Policy" link from "I agree to the Karma..." checkbox.', async function () {

      const privacy = await driver.elementByAccessibilityId(registerAccessibilityId.privacyPolicy)
      await privacy.click()
      console.log('Tap on \'Privacy policy\' link.')
      await driver.setImplicitWaitTimeout(5000)

      await driver.waitForElementByAccessibilityId(registerAccessibilityId.headerTitle,5000)
      const privacyHeader = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
      let privacyPageHeader = await privacyHeader.text()

      assert.equal(privacyPageHeader, registrationVM.expectedPrivacyPageHeader, ' Verified Privacy Policy page')
    })

    it('TC_Reg_22 : To verify back button functionality from "Privacy Policy".', async function () {

      const goBack = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
      await goBack.click()
      console.log('Tap on Go Back icon.')

      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
      const pswd = await driver.elementByAccessibilityId(registerAccessibilityId.password)
      const checkBox = await driver.elementByAccessibilityId(registerAccessibilityId.aggrementCheckbox)
      await driver.setImplicitWaitTimeout(1000)

      assert.equal(await mobileNo.isDisplayed() && await pswd.isDisplayed() && await checkBox.isDisplayed(), true, 'Successfully Redirected to Register page.')
    })

    it('TC_Reg_27 : To verify validation message for less then 6 digit code.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
      let mobileNumber = Math.floor(Math.random() * 9000000000) + 1000000000
      await sendKey(driver, mobileNo, mobileNumber)
      console.log('Entered Mobile number : ' + mobileNumber)

      await driver.setImplicitWaitTimeout(1000)
      const password = await driver.elementByAccessibilityId(registerAccessibilityId.password)
      //await password.sendKeys(registrationDS.password)
      await sendKey(driver, password, registrationDS.password)
      console.log('Entered Password : ' + registrationDS.password)
      await driver.setImplicitWaitTimeout(1000)

      const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)
      await registerBtn.click()
      console.log('Clicked on register Button.')
      await driver.setImplicitWaitTimeout(4000)

      const otp = await driver.elementByAccessibilityId(registerAccessibilityId.otp)
     // await otp.sendKeys(registrationDS.invalidOTP)
      await sendKey(driver, otp, registrationDS.invalidOTP)
      console.log('Entered less than 6 digit OTP number : ' + registrationDS.invalidOTP)

      const otpErrorMsg = await driver.elementByAccessibilityId(registerAccessibilityId.otpError)
      registrationVM.actualotpErrorMsg = await otpErrorMsg.text()
      console.log('Actual error message : ' + registrationVM.actualotpErrorMsg)
      assert.equal(registrationVM.actualotpErrorMsg, registrationVM.expectedSixCharacterErrormsg, 'Error Message displayed Successfully')
    })

    it('TC_Reg_31 : To verify validation message for invalid 6 digit code.', async function () {

      await driver.setImplicitWaitTimeout(3000)
      const otp = await driver.elementByAccessibilityId(registerAccessibilityId.otp)
      await otp.clear()
      await sendKey(driver, otp, registrationDS.invalidOTP1)
      console.log('Entered invalid 6 digit OTP number : ' + registrationDS.invalidOTP1)

      await driver.setImplicitWaitTimeout(1000)
      const nextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
      await nextButton.click()
      await driver.setImplicitWaitTimeout(3000)

     if (configuration.runOs == 'android') {
      const otpErrorMsg = await driver.elementById(registerAccessibilityId.otpErrorMsg)
      registrationVM.actualotpErrorMsg = await otpErrorMsg.text()
      console.log('Actual OTP Error message : ' + registrationVM.actualotpErrorMsg)
      assert.equal(registrationVM.actualotpErrorMsg, registrationVM.expectedotpErrormsg, 'Error Message displayed Successfully')

      const otpErrorMsgOk = await driver.elementById(registerAccessibilityId.okbutton)
      await otpErrorMsgOk.click()
      }else {

       try{
        const otpErrorMsg = await driver.elementByXPath(registerXPath.otpErrorMsg)
        registrationVM.actualotpErrorMsg = await otpErrorMsg.text()
        console.log('Actual OTP Error message : ' + registrationVM.actualotpErrorMsg)

        const otpErrorMsgOk = await driver.elementByXPath(registerXPath.okbutton)
        await otpErrorMsgOk.click()
      }catch{ }

      }

    })

    it('TC_Reg_25 : To verify back arrow button functionality on "Verification Code" screen.', async function () {

      await driver.setImplicitWaitTimeout(2000)
      const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
      await backButton.click()

      await driver.setImplicitWaitTimeout(2000)

      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
      const password = await driver.elementByAccessibilityId(registerAccessibilityId.password)

      assert.equal(await mobileNo.isDisplayed() && await password.isDisplayed(), true, 'user is redirected to login page.')
    })

    it('TC_Reg_30 : To verify "Resend Sms" button functionality.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
      let mobileNumber = Math.floor(Math.random() * 9000000000) + 1000000000
      await sendKey(driver, mobileNo, mobileNumber)
      console.log('Entered Mobile number : ' + mobileNumber)

      const password = await driver.elementByAccessibilityId(registerAccessibilityId.password)
      await sendKey(driver, password, registrationDS.password)
      console.log('Entered Password : ' + registrationDS.password)

      await driver.setImplicitWaitTimeout(1000)

      const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)
      await registerBtn.click()
      console.log('Clicked on register Button.')

      await driver.setImplicitWaitTimeout(30000)
      const resendSMS = await driver.elementByAccessibilityId(registerAccessibilityId.resendlink)
      await resendSMS.click()

      await driver.setImplicitWaitTimeout(2000)

    })
  })

}

module.exports = registerdmodule3
