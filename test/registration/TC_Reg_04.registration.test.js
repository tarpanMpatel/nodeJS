import wd from 'wd'
import chai from 'chai'
import { bsCred, configuration } from '../helpers/config'
import { currentTime, networkSet, registrationDS } from '../helpers/data'
import { registrationVM } from '../helpers/common/validationmessage'
import { registerAccessibilityId ,registerXPath} from '../helpers/common/androidiOSElements/registration'
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
let testName = 'TC_Auto_Reg_04 : To verify "Personal Details" screen validation.'

async function registerdmodule4 (DeviceName, PlatformVersion,buildName) {

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
       /*   it('...DONE...', function(done) {
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
      /*let test = this.test.parent.tests.reduce(function(prev, curr) {
        return (!curr.state) ? prev : curr;
        });
        console.log("...........########...........->>>"+test.title, test.state);*/
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

    it('TC_Reg_02 : To Verify "REGISTER" button functionality', async function () {
      await driver.setImplicitWaitTimeout(1000)

      const register = await driver.elementByAccessibilityId(registerAccessibilityId.register)
      await register.click()
      console.log('Clicked on \'Register\' button.')
      await driver.setImplicitWaitTimeout(2000)

      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
      const pswd = await driver.elementByAccessibilityId(registerAccessibilityId.password)
      const checkBox = await driver.elementByAccessibilityId(registerAccessibilityId.aggrementCheckbox)

      assert.equal(await mobileNo.isDisplayed() && await pswd.isDisplayed() && await checkBox.isDisplayed(), true, 'Successfully Redirected to Register page.')
    })

    it('TC_Reg_23 : To Verify "Register" button functionality with valid details.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
      let mobileNumber = Math.floor(Math.random() * 9000000000) + 1000000000
      await sendKey(driver,mobileNo,mobileNumber)
      console.log('Entered Mobile number : ' + mobileNumber)

      await driver.setImplicitWaitTimeout(1000)
      const password = await driver.elementByAccessibilityId(registerAccessibilityId.password)
      await sendKey(driver,password,registrationDS.password)
      console.log('Entered Password : ' + registrationDS.password)

      await driver.setImplicitWaitTimeout(1000)
      const checkBox = await driver.elementByAccessibilityId(registerAccessibilityId.aggrementCheckbox)
      await checkBox.click()
      console.log('Checked licence-agreement checkbox.')

      await driver.setImplicitWaitTimeout(1000)

      const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)
      await registerBtn.click()
      console.log('Clicked on register Button.')

      await driver.setImplicitWaitTimeout(1000)
    })

    it('TC_Reg_28, TC_Reg_29, TC_Reg_32 : To Verify by adding 6 digit code.', async function () {

      await driver.waitForElementByAccessibilityId(registerAccessibilityId.otp,10000)
      await driver.setImplicitWaitTimeout(1000)
      const otpField = await driver.elementByAccessibilityId(registerAccessibilityId.otp)
      await sendKey(driver,otpField,registrationDS.validOTP)
      console.log('Entered OTP number : ' + registrationDS.validOTP)

      await driver.setImplicitWaitTimeout(2000)
      const nextBtn = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
      await nextBtn.click()
      console.log('Clicked on next button.')

      await driver.setImplicitWaitTimeout(5000)

      const personalDetails = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
      assert.equal(await personalDetails.isDisplayed(), true, 'Successfully Personal Detail screen displayed.')
    })

    it('TC_Reg_36 : To verify validation message by entering only one alphabet in first name field.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const firstNameField = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
      await sendKey(driver,firstNameField,registrationDS.oneCharacterFLName)
      console.log('Entered firstName : ' + registrationDS.oneCharacterFLName)
      await driver.setImplicitWaitTimeout(1000)

      const firstNameError = await driver.elementByAccessibilityId(registerAccessibilityId.firstNameError)
      registrationVM.actualFirstNameErrorMsg = await firstNameError.text()
      console.log('Actual First Name Error Msg : ' + registrationVM.actualFirstNameErrorMsg)
      assert.equal(registrationVM.actualFirstNameErrorMsg, registrationVM.expectedFirstNameErrorMsg, 'FirstName Error Msg Displayed Successfully.')
    })

    it('TC_Reg_35 : To verify validation message by entering number and special character in first name field.', async function () {

      await driver.setImplicitWaitTimeout(1000)

      const firstNameField = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
      await firstNameField.clear()
      await sendKey(driver,firstNameField,registrationDS.specialCharacterFLName)
      console.log('Entered firstName : ' + registrationDS.specialCharacterFLName)
      await driver.setImplicitWaitTimeout(1000)

      const firstNameError = await driver.elementByAccessibilityId(registerAccessibilityId.firstNameError)
      registrationVM.actualFirstNameErrorMsg = await firstNameError.text()
      console.log('Actual First Name Error Msg : ' + registrationVM.actualFirstNameErrorMsg)

      assert.equal(registrationVM.actualFirstNameErrorMsg, registrationVM.expectedFirstNameReqErrorMsg, 'Error Msg for special characters in first name field Displayed Successfully.')
    })

    it('TC_Reg_38 : To verify by removing the added text from First Name text field.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const firstNameField = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
      await firstNameField.clear()
      await driver.setImplicitWaitTimeout(1000)

      await driver.setImplicitWaitTimeout(5000)
      let actualFirstName = await firstNameField.text()
      console.log('Actual First Name : ' + actualFirstName)
      assert.equal(actualFirstName, registrationVM.expectedEmptyFirstName, 'Text removed from First Name field.')
      console.log('Text removed from the First Name field.')

    })

    it('TC_Reg_40 : To verify validation message by entering number and special character in Last name field.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const lastNameField = await driver.elementByAccessibilityId(registerAccessibilityId.lastname)
      await sendKey(driver,lastNameField,registrationDS.specialCharacterFLName)
      console.log('Entered lastName :' + registrationDS.specialCharacterFLName)
      await driver.setImplicitWaitTimeout(1000)

      const lastNameError = await driver.elementByAccessibilityId(registerAccessibilityId.lastNameError)
      registrationVM.actuallastNameErrorMsg = await lastNameError.text()
      console.log('Actual First Name Error Msg : ' + registrationVM.actuallastNameErrorMsg)
      assert.equal(registrationVM.actuallastNameErrorMsg, registrationVM.expectedFirstNameReqErrorMsg, 'Error Msg for special characters in last name field Displayed Successfully.')

    })

    it('TC_Reg_41 : To verify validation message by entering only one alphabet in Last Name field.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      const lastNameField = await driver.elementByAccessibilityId(registerAccessibilityId.lastname)
      await sendKey(driver,lastNameField,registrationDS.oneCharacterFLName)
      console.log('Entered lastName : ' + registrationDS.oneCharacterFLName)
      await driver.setImplicitWaitTimeout(1000)

      const lastNameError = await driver.elementByAccessibilityId(registerAccessibilityId.lastNameError)
      registrationVM.actuallastNameErrorMsg = await lastNameError.text()
      console.log('Actual Last Name Error Msg : ' + registrationVM.actuallastNameErrorMsg)
      assert.equal(registrationVM.actuallastNameErrorMsg, registrationVM.expectedFirstNameErrorMsg, 'LastName Error Msg Displayed Successfully.')
    })

    it('TC_Reg_43 : To verify by removing the added text from Last Name text field.', async function () {

      await driver.setImplicitWaitTimeout(2000)
      const lastNameField = await driver.elementByAccessibilityId(registerAccessibilityId.lastname)
      await lastNameField.clear()

      let actualLastName = await lastNameField.text()
      console.log('Actual Last Name : ' + actualLastName)
      assert.equal(actualLastName, registrationVM.expectedEmptyLastName, 'Text removed from Last Name field.')
      console.log('Text removed from the Last Name field and verified.')
    })

    it('TC_Reg_51 : To verify validation message for invalid format Email Ids.', async function () {
      await driver.setImplicitWaitTimeout(2000)
      const emailField = await driver.elementByAccessibilityId(registerAccessibilityId.email)
      await sendKey(driver,emailField,registrationDS.inValidEmailadd1)
      console.log('Entered In Valid Email ID  : ' + registrationDS.inValidEmailadd1)
      await driver.setImplicitWaitTimeout(3000)
      let emailerror
      if (configuration.runOs == 'android') {
       emailerror = await driver.elementByXPath(registerXPath.invalidemailError)
      } else {
        emailerror = await driver.elementByXPath(registerXPath.invalidemailError)
      }

      registrationVM.actualEmailErrorMsg = await emailerror.text()
      console.log('Actual invalid Email Error Msg : ' + registrationVM.actualEmailErrorMsg)
      assert.equal(registrationVM.actualEmailErrorMsg, registrationVM.expectedEmailErrorMsg, 'For invalid Email ID format error msg Displayed Successfully.')
      console.log('Verified Error message for entering Invalid Email address.')

      await emailField.clear()

      await driver.setImplicitWaitTimeout(1000)
      await sendKey(driver,emailField,registrationDS.inValidEmailadd2)
      console.log('Entered In Valid Email ID  : ' + registrationDS.inValidEmailadd2)
      await driver.setImplicitWaitTimeout(1000)

      let emailerror1
      if (configuration.runOs == 'android') {
        emailerror1 = await driver.elementByXPath(registerXPath.invalidemailError)
      } else {
        emailerror1 = await driver.elementByXPath(registerXPath.invalidemailError)
      }

      registrationVM.actualEmailErrorMsg = await emailerror1.text()
      console.log('Actual invalid Email Error Msg : ' + registrationVM.actualEmailErrorMsg)
      assert.equal(registrationVM.actualEmailErrorMsg, registrationVM.expectedEmailErrorMsg, 'For invalid Email ID format error msg Displayed Successfully.')
      console.log('Verified Error message for entering Invalid Email address.')

      await emailField.clear()

      await driver.setImplicitWaitTimeout(1000)
      await sendKey(driver,emailField,registrationDS.inValidEmailadd3)
      console.log('Entered In Valid Email ID  : ' + registrationDS.inValidEmailadd3)
      await driver.setImplicitWaitTimeout(1000)

        let emailerror2
      if (configuration.runOs == 'android') {
        emailerror2 = await driver.elementByXPath(registerXPath.invalidemailError)
      } else {
         emailerror2 = await driver.elementByXPath(registerXPath.invalidemailError)
      }
      registrationVM.actualEmailErrorMsg = await emailerror2.text()
      console.log('Actual invalid Email Error Msg : ' + registrationVM.actualEmailErrorMsg)
      assert.equal(registrationVM.actualEmailErrorMsg, registrationVM.expectedEmailErrorMsg, 'For invalid Email ID format error msg Displayed Successfully.')
      console.log('Verified Error message for entering Invalid Email address.')

      await emailField.clear()

    })

    it('TC_Reg_52 : To verify by entering valid format Email Id and other valid details.', async function () {

      await driver.setImplicitWaitTimeout(1000)
      console.log('Entering valid Personal details.....')

      const firstNameField = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
      await sendKey(driver,firstNameField,registrationDS.firstname)
      console.log('Entered firstName : ' + registrationDS.firstname)

      await driver.setImplicitWaitTimeout(1000)
      const lastNameField = await driver.elementByAccessibilityId(registerAccessibilityId.lastname)
      await sendKey(driver,lastNameField,registrationDS.lastname)
      console.log('Entered lastName : ' + registrationDS.lastname)

      if (configuration.runOs == 'android') {
      await driver.setImplicitWaitTimeout(1000)
      const dobField = await driver.elementByAccessibilityId(registerAccessibilityId.birthdate)
      await dobField.click()
      console.log('Clicked on DOB text field.')

      await driver.setImplicitWaitTimeout(1000)
      const dobFieldOK = await driver.elementById(registerAccessibilityId.okbutton)
      await dobFieldOK.click()
      console.log('Clicked on DOB ok button.')

    } else {

      await driver.setImplicitWaitTimeout(1000)
      const dobField = await driver.elementByAccessibilityId(registerAccessibilityId.birthdate)
      await dobField.click()
      console.log('Clicked on DOB text field.')

      await driver.setImplicitWaitTimeout(2000)
      let dobmonth
      try{
        console.log('Inside Try.')
        dobmonth = await driver.elementByXPath(registerXPath.dobmonth)
      }
      catch{
       console.log('Inside catch.')
       dobmonth = await driver.elementByXPath(registerXPath.dobmonth1)
      }
      await sendKey(driver, dobmonth, registrationDS.DOBMonth)
      await driver.setImplicitWaitTimeout(1000)
      console.log('Select September month.')

      const blankSpace = await driver.elementByXPath(registerXPath.blankSpace)
      await blankSpace.click()
      console.log('Clicked on Blank Space.')
    }

      await driver.setImplicitWaitTimeout(1000)
      const emailField = await driver.elementByAccessibilityId(registerAccessibilityId.email)
      await sendKey(driver,emailField,registrationDS.email)
      console.log('Entered EmailID : ' + registrationDS.email)

      await driver.setImplicitWaitTimeout(2000)
      const nextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)

      assert.equal(await nextButton.isDisplayed(), true, 'Next Enabled Displayed Successfully.')

      await nextButton.click()
      console.log('Clicked on \'Next\' button after filled valid Personal Details.')

      await driver.setImplicitWaitTimeout(1000)
      await driver.waitForElementByAccessibilityId(registerAccessibilityId.postalcode,10000)
      await driver.setImplicitWaitTimeout(1000)

      const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)
      const addressDetailsText = await driver.elementByAccessibilityId(registerAccessibilityId.addressDetailsText)
      const postalCodeNextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)

      assert.equal(await postalCode.isDisplayed() && await addressDetailsText.isDisplayed() && await postalCodeNextButton.isDisplayed(), true, 'Postal Code and Address details text is displayed successfully.')
      console.log('Verified Postal Code-Address screen successfully.')

    })

  })

}

module.exports = registerdmodule4
