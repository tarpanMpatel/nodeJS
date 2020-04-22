import wd from 'wd'
import chai from 'chai'
import { bsCred, configuration } from '../helpers/config'
import { currentTime, networkSet, registrationDS } from '../helpers/data'
import { registrationVM } from '../helpers/common/validationmessage'
import { registerAccessibilityId ,registerXPath } from '../helpers/common/androidiOSElements/registration'
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

let testName = 'TC_Auto_Reg_05 : To verify "Address Details" screen validations.'

async function registerdmodule5 (DeviceName, PlatformVersion,buildName) {

  describe(testName, function () {

    after(async function () {
          if(test_status === 'failed') {
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
      console.log('Entered Password :' + registrationDS.password)

      await driver.setImplicitWaitTimeout(1000)
      const checkBox = await driver.elementByAccessibilityId(registerAccessibilityId.aggrementCheckbox)
      await checkBox.click()
      console.log('Checked licence-agreement checkbox.')

      await driver.setImplicitWaitTimeout(1000)

      const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)
      await registerBtn.click()
      console.log('Clicked on register Button.')

      await driver.setImplicitWaitTimeout(4000)
    })

    it('TC_Reg_28, TC_Reg_29, TC_Reg_32 : To Verify by adding 6 digit code.', async function () {

      await driver.setImplicitWaitTimeout(2000)
      const otpField = await driver.elementByAccessibilityId(registerAccessibilityId.otp)

      await sendKey(driver,otpField,registrationDS.validOTP)
      console.log('Entered OTP number.' + registrationDS.validOTP)

      await driver.setImplicitWaitTimeout(2000)
      const nextBtn = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
      await nextBtn.click()
      console.log('Clicked on next button.')

      await driver.setImplicitWaitTimeout(5000)

      const personalDetails = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
      assert.equal(await personalDetails.isDisplayed(), true, 'Successfully Personal Detail screen displayed.')
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
      await driver.setImplicitWaitTimeout(1000)

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
     // await emailField.sendKeys(registrationDS.email)
      await sendKey(driver,emailField,registrationDS.email)
      console.log('Entered EmailID : ' + registrationDS.email)

      await driver.setImplicitWaitTimeout(2000)
      const nextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)

      assert.equal(await nextButton.isDisplayed(), true, 'Next Enabled Displayed Successfully.')

      await nextButton.click()
      console.log('Clicked on \'Next\' button after filled valid Personal Details.')

      await driver.setImplicitWaitTimeout(5000)
      const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)
      const addressDetailsText = await driver.elementByAccessibilityId(registerAccessibilityId.addressDetailsText)
      const postalCodeNextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)

      assert.equal(await postalCode.isDisplayed() && await addressDetailsText.isDisplayed() && await postalCodeNextButton.isDisplayed(), true, 'Postal Code and Address details text is displayed successfully.')
      console.log('Verified Postal Code-Address screen successfully.')

    })

    it('TC_Reg_55 : To verify Back button functionality from address details screen.', async function () {

      await driver.setImplicitWaitTimeout(2000)
      const backButton = await driver.elementByAccessibilityId('leftIconBtn-testId')
      await backButton.click()
      console.log('Clicked on Back Button.')

      await driver.setImplicitWaitTimeout(2000)
      const nextButtonOnPersonalDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)

      await driver.setImplicitWaitTimeout(2000)
      const firstNameField = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
      registrationVM.actualFirstNameValue = await firstNameField.text()
      console.log('Actual First Name : ' + registrationVM.actualFirstNameValue)
      assert.equal(registrationVM.actualFirstNameValue, registrationDS.firstname, 'FistName value is same as expected value ')

      await driver.setImplicitWaitTimeout(2000)
      const lastNameField = await driver.elementByAccessibilityId(registerAccessibilityId.lastname)
      registrationVM.actualLastNameValue = await lastNameField.text()
      console.log('Actual Last Name : ' + registrationVM.actualLastNameValue)
      assert.equal(registrationVM.actualLastNameValue, registrationDS.lastname, 'LastName value is same as expected value ')

      await driver.setImplicitWaitTimeout(2000)
      const emailField = await driver.elementByAccessibilityId(registerAccessibilityId.email)
      registrationVM.actualeEmailValue = await emailField.text()
      console.log('Actual Email Id : ' + registrationVM.actualeEmailValue)
      assert.equal(registrationVM.actualeEmailValue, registrationDS.email, 'Email value is same as expected value ')

      assert.equal(await nextButtonOnPersonalDetailsScreen.isDisplayed(), true, 'User is redirected to personal details screen Successfully.')
    })

    it('TC_Reg_56 : To verify validation message by entering upto 4 character in Postal Code.', async function () {

      await driver.setImplicitWaitTimeout(2000)
      const nextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
      await nextButton.click()
      console.log('Clicked on Next Button.')

      //await driver.setImplicitWaitTimeout(4000)
      await driver.waitForElementByAccessibilityId(registerAccessibilityId.postalcode,10000)

      const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)

      await sendKey(driver,postalCode,registrationDS.inValidPostalCode)
      console.log('Entered Postal Code : ' + registrationDS.inValidPostalCode)

      await driver.setImplicitWaitTimeout(2000)
      const postalError = await driver.elementByAccessibilityId(registerAccessibilityId.fiveCharactersError)
      registrationVM.actualpostalErrorMsg = await postalError.text()
      console.log('Actual Postal Code Error Msg : ' + registrationVM.actualpostalErrorMsg)
      assert.equal(registrationVM.actualpostalErrorMsg, registrationVM.expectedpostalErrorMsg, 'Postal Code Error Msg Displayed Successfully by entering upto 4 character in Postal Code.')

      await postalCode.clear()
    })

    it('TC_Reg_57 : To verify by entering 5 or more  character in postal code.', async function () {

      await driver.setImplicitWaitTimeout(2000)
      const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)

      await sendKey(driver,postalCode,registrationDS.postalCode)
      console.log('Entered Postal Code : ' + registrationDS.postalCode)

      const postalCodeMsg = await driver.elementByAccessibilityId(registerAccessibilityId.postalCodeMsg)
      registrationVM.actualPostalCodeMsg = await postalCodeMsg.text()
      console.log('Actual Postal Code Message : ' + registrationVM.actualPostalCodeMsg)
      assert.equal(registrationVM.actualPostalCodeMsg, registrationVM.expectedPostalCodeMsg, 'Postal Code Msg Displayed Successfully by entering 5 or more character in Postal Code.')

      const searchIcon = await driver.elementByAccessibilityId(registerAccessibilityId.search)
      assert.equal(await searchIcon.isDisplayed(), true, 'Search icon Displayed Successfully.')

      await postalCode.clear()
    })

    it('TC_Reg_58 : To verify "Search" icon functionality with invalid postal code.', async function () {

      await driver.setImplicitWaitTimeout(2000)
      const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)

      await sendKey(driver,postalCode,registrationDS.inValidPostalCode1)
      console.log('Entered Postal Code : ' + registrationDS.inValidPostalCode1)

      await driver.setImplicitWaitTimeout(2000)
      const searchIcon = await driver.elementByAccessibilityId(registerAccessibilityId.search)
      await searchIcon.click()
      console.log('Clicked on Search Icon.')
      await driver.setImplicitWaitTimeout(8000)

      const actualAddressList = await driver.elementByAccessibilityId(registerAccessibilityId.actualAddressList)
      assert.equal(await actualAddressList.isDisplayed(), true, 'Address list message Displayed Successfully for invalid postal code.')
    })

    it('TC_Reg_59 : To verify back button functionality from "ADDRESS LIST" screen.', async function () {

      await driver.setImplicitWaitTimeout(2000)
      const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
      await backButton.click()
      console.log('Clicked on Back Button.')

      await driver.setImplicitWaitTimeout(2000)
      const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)
      assert.equal(await postalCode.isDisplayed(), true, 'User is redirected to AddressDetails Screen.')
    })

    it('TC_Reg_63 : To verify by editing the selected address.', async function () {

      await driver.setImplicitWaitTimeout(2000)
      const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)

      await sendKey(driver,postalCode,registrationDS.postalCode)
      console.log('Entered Postal Code : ' + registrationVM.postalCode)

      await driver.setImplicitWaitTimeout(2000)
      const searchIcon = await driver.elementByAccessibilityId(registerAccessibilityId.search)
      await searchIcon.click()
      console.log('Clicked on Search icon.')

      await driver.setImplicitWaitTimeout(10000)

      const selectAddress = await driver.elementByAccessibilityId(registerAccessibilityId.selectAddress)
      registrationVM.selectedAddressText = await selectAddress.text()
      console.log('Selected Address.' + registrationVM.selectedAddressText)

      var str1 = registrationVM.selectedAddressText.split(',')
      registrationVM.expectedBuildingName = str1[0].trim()
      registrationVM.expectedCityName = str1[1].trim()
      registrationVM.expectedCountryName = str1[2].trim()

      console.log('Expected Building Name, City Name, Country Name......')
      console.log('Expected Building Name : ' + registrationVM.expectedBuildingName)
      console.log('Expected City Name : ' + registrationVM.expectedCityName)
      console.log('Expected Country Name : ' + registrationVM.expectedCountryName)

      await selectAddress.click()
      console.log('Address Selected Successfully.')

      await driver.setImplicitWaitTimeout(3000)
      console.log('Actual Building Name, City Name, Country Name......')

      const buildingField = await driver.elementByAccessibilityId(registerAccessibilityId.building)
      registrationVM.actualBuildingName = await buildingField.text()
      console.log('Actual Building Name : ' + registrationVM.actualBuildingName)
      assert.equal(registrationVM.actualBuildingName, registrationVM.expectedBuildingName, ' Building Name is verified.')

      await driver.setImplicitWaitTimeout(2000)
      const cityField = await driver.elementByAccessibilityId(registerAccessibilityId.city)
      registrationVM.actualCityName = await cityField.text()
      console.log('Actual City Name : ' + registrationVM.actualCityName)
      assert.equal(registrationVM.actualCityName, registrationVM.expectedCityName, ' City Name is verified.')

      await driver.setImplicitWaitTimeout(2000)
      const countryField = await driver.elementByAccessibilityId(registerAccessibilityId.country)
      registrationVM.actualCountryName = await countryField.text()
      console.log('Actual Country Name : ' + registrationVM.actualCountryName)
      assert.equal(registrationVM.actualCountryName, registrationVM.expectedCountryName, ' Country Name is verified.')

      console.log('Updating Address Details Like Building Name, City Name and Country Name ')
      await driver.setImplicitWaitTimeout(2000)


      await sendKey(driver,buildingField,registrationDS.buildingName)
      console.log('Entered Building Name : ' + registrationDS.buildingName)
      await driver.setImplicitWaitTimeout(2000)


      await sendKey(driver,cityField,registrationDS.cityName)
      console.log('Entered City  Name : ' + registrationDS.cityName)
      await driver.setImplicitWaitTimeout(2000)


      await sendKey(driver,countryField,registrationDS.countryName)
      console.log('Entered Country Name : ' + registrationDS.countryName)
      await driver.setImplicitWaitTimeout(2000)
    })

    it('TC_Reg_66 : To verify "NEXT" button functionality after editing the address with valid details..', async function () {

      console.log('Entering Valid Address Details Like Building Name, City Name and Country Name ')
      await driver.setImplicitWaitTimeout(2000)

      const buildingField = await driver.elementByAccessibilityId(registerAccessibilityId.building)

      await sendKey(driver,buildingField,registrationVM.expectedBuildingName)
      console.log('Entered Building Name : ' + registrationVM.expectedBuildingName)
      await driver.setImplicitWaitTimeout(2000)

      const cityField = await driver.elementByAccessibilityId(registerAccessibilityId.city)

      await sendKey(driver,cityField,registrationVM.expectedCityName)
      console.log('Entered City  Name : ' + registrationVM.expectedCityName)
      await driver.setImplicitWaitTimeout(2000)

      const countryField = await driver.elementByAccessibilityId(registerAccessibilityId.country)

      await sendKey(driver,countryField,registrationVM.expectedCountryName)
      console.log('Entered Country Name : ' + registrationVM.expectedCountryName)
      await driver.setImplicitWaitTimeout(2000)

      const nextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
      await nextButton.click()
      console.log('Clicked on Next button.')
      await driver.setImplicitWaitTimeout(4000)

      const signMeUp = await driver.elementByAccessibilityId(registerAccessibilityId.signmeup)
      const skipButton = await driver.elementByAccessibilityId(registerAccessibilityId.skip)

      const headerOfNewsandUpdateScreen = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
      registrationVM.actualHeaderTextOfNewsandUpdateScreen = await headerOfNewsandUpdateScreen.text()
      console.log('Actual Header text of News and Updates Screen :' + registrationVM.actualHeaderTextOfNewsandUpdateScreen)
      assert.equal(registrationVM.actualHeaderTextOfNewsandUpdateScreen, registrationVM.expectedHeaderTextOfNewsandUpdateScreen, 'Header Text is same as expected : News and Updates')

      assert.equal(await signMeUp.isDisplayed() && await skipButton.isDisplayed(), true, 'User is redirected to News and Updates page successfully.')

    })

  })
}

module.exports = registerdmodule5


