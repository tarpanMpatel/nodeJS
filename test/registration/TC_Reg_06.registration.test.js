import wd from 'wd'
import chai from 'chai'
import {bsCred, configuration} from '../helpers/config'
import {currentTime, networkSet, registrationDS} from '../helpers/data'
import {registrationVM} from '../helpers/common/validationmessage'
import {registerAccessibilityId, registerXPath} from '../helpers/common/androidiOSElements/registration'
import {sendKey} from '../helpers/common/sendKeys'

const {assert} = chai
let request = require('request')

const FAILED_TESTS = {}
let test_status
let ssid

let driver
if (configuration.driverType == 'local') {
    driver = wd.promiseChainRemote({host: '0.0.0.0', port: '4723'})  // for running in local
} else {
    driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub') // for browserstack
}

let testName = 'TC_Auto_Reg_06 : To verify Back Icon and Skip functionality for News-Update, Notifications and Identity screens.'

async function registerdmodule6(DeviceName, PlatformVersion, buildName) {

    describe(testName, function () {
        let mobileNumber = Math.floor(Math.random() * 9000000000) + 1000000000

        after(async function () {
            if (test_status === 'failed') {
                console.log('---Current Test--' + this.currentTest.state)
                console.log('--FAILED-->' + ssid)

                let api = 'https://' + bsCred.bsUser + ':' + bsCred.bsKey + '@api-cloud.browserstack.com/app-automate/sessions/' + ssid + '.json'
                request({uri: api, method: 'PUT', form: {'status': 'error'}})
                FAILED_TESTS[this.currentTest.file] = false
            }
            if (this.currentTest.state === 'passed') {
                console.log('---Current Test--' + this.currentTest.state)
                console.log('--PASSED-->' + ssid)

                let api = 'https://' + bsCred.bsUser + ':' + bsCred.bsKey + '@api-cloud.browserstack.com/app-automate/sessions/' + ssid + '.json'
                request({uri: api, method: 'PUT', form: {'status': 'completed'}})

            }
            /*  it('...DONE...', function(done) {
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
            if (this.currentTest.state === 'failed' || this.currentTest.state === 'undefined') {
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
                device: DeviceName,
                deviceName: DeviceName,
                platformVersion: PlatformVersion,
                networkProfile: networkSet.highInternet
            }))

            console.log('---  ---- Device: ' + DeviceName)
            console.log('---  ---- PlatformVersion: ' + PlatformVersion)

            await driver.setImplicitWaitTimeout(10000)
            ssid = await driver.getSessionId()
            console.log('--started-->' + ssid)
            const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)
            const btnLogin = await driver.elementByAccessibilityId(registerAccessibilityId.login)
            assert.equal(await registerBtn.isDisplayed() && await btnLogin.isDisplayed(), true, 'Application launch successfully.')
        })

        it('TC_Reg_02 : To Verify "Register" button functionality', async function () {
            await driver.setImplicitWaitTimeout(3000)
            const register = await driver.elementByAccessibilityId(registerAccessibilityId.register)
            await register.click()
            console.log('Clicked on \'Register\' button.')

            const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
            const pswd = await driver.elementByAccessibilityId(registerAccessibilityId.password)
            const checkBox = await driver.elementByAccessibilityId(registerAccessibilityId.aggrementCheckbox)
            //const login = await driver.elementByXPath(registerXPath.login)
            const login = await driver.elementByAccessibilityId(registerAccessibilityId.loginlink)
            assert.equal(await mobileNo.isDisplayed() && await pswd.isDisplayed() && await checkBox.isDisplayed() && await login.isDisplayed(), true, 'Successfully Redirected to Register page.')
        })

        it('TC_Reg_23 : To Verify "Register" button functionality with valid details.', async function () {
            await driver.setImplicitWaitTimeout(3000)

            const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
            await sendKey(driver, mobileNo, mobileNumber)
            console.log('Entered Mobile number : ' + mobileNumber)
            await driver.setImplicitWaitTimeout(1000)

            const password = await driver.elementByAccessibilityId(registerAccessibilityId.password)
            await sendKey(driver, password, registrationDS.password)
            console.log('Entered Password. :' + registrationDS.password)
            await driver.setImplicitWaitTimeout(1000)

            const checkBox = await driver.elementByAccessibilityId(registerAccessibilityId.aggrementCheckbox)
            await checkBox.click()
            console.log('Checked licence-agreement checkbox.')
            await driver.setImplicitWaitTimeout(1000)

            const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)
            await registerBtn.click()
            console.log('Clicked on register Button.')
            await driver.setImplicitWaitTimeout(5000)

            const otp = await driver.elementByAccessibilityId(registerAccessibilityId.otp)
            assert.equal(await otp.isDisplayed(), true, 'Verification Code page displayed Successfully.')
        })

        it('TC_Reg_28, TC_Reg_29, TC_Reg_32 : To Verify by adding 6 digit code.', async function () {

            await driver.setImplicitWaitTimeout(3000)
            const otpField = await driver.elementByAccessibilityId(registerAccessibilityId.otp)
            await sendKey(driver, otpField, registrationDS.validOTP)
            console.log('Entered OTP number.' + registrationDS.validOTP)

            await driver.setImplicitWaitTimeout(1000)
            const tickMark = await driver.elementByAccessibilityId(registerAccessibilityId.tickMark)
            assert.equal(await tickMark.isDisplayed(), true, 'Tick Mark displayed Successfully.')

            await driver.setImplicitWaitTimeout(2000)
            const nextBtn = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            assert.equal(await nextBtn.isDisplayed(), true, 'Next Button displayed Successfully.')
            await nextBtn.click()
            console.log('Clicked on next button.')

            await driver.setImplicitWaitTimeout(5000)
            const personalDetails = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
            assert.equal(await personalDetails.isDisplayed(), true, 'Successfully Personal Detail screen displayed.')
        })

        it('TC_Reg_33, TC_Reg_54 : To Verify details on personal details screen.', async function () {

            await driver.setImplicitWaitTimeout(1000)
            const firstNameField = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
            await sendKey(driver, firstNameField, registrationDS.firstname)
            console.log('Entered firstName : ' + registrationDS.firstname)

            await driver.setImplicitWaitTimeout(1000)
            const lastNameField = await driver.elementByAccessibilityId(registerAccessibilityId.lastname)
            await sendKey(driver, lastNameField, registrationDS.lastname)
            console.log('Entered lastName :' + registrationDS.lastname)

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
                try {
                    console.log('Inside Try.')
                    dobmonth = await driver.elementByXPath(registerXPath.dobmonth)
                } catch {
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
            await sendKey(driver, emailField, registrationDS.email)
            console.log('Entered EmailID : ' + registrationDS.email)

            await driver.setImplicitWaitTimeout(1000)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            assert.equal(await backButton.isDisplayed(), true, 'Successfully back button displayed.')

            const nextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            await nextButton.click()
            console.log('Clicked on Next button.')
            await driver.setImplicitWaitTimeout(4000)

            const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)
            const addressDetailsText = await driver.elementByAccessibilityId(registerAccessibilityId.addressDetailsText)
            const postalCodeNextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            assert.equal(await postalCode.isDisplayed() && await addressDetailsText.isDisplayed() && await postalCodeNextButton.isDisplayed(), true, 'Postal Code and Address details text is displayed successfully.')
        })

        it('TC_Reg_61, TC_Reg_62 : To Verify search icon functionality for valid postal code.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)

            await sendKey(driver, postalCode, registrationDS.postalCode)
            console.log('Entered Postal Code : ' + registrationDS.postalCode)

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

            await driver.setImplicitWaitTimeout(2000)
            const nextButtonAddressDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            await nextButtonAddressDetailsScreen.click()
            console.log('Clicked on Next button of Address Details screen.')

        })

        it('TC_Reg_67 : To verify back button functionality from "NEWS AND UPDATES" screen.', async function () {

            await driver.setImplicitWaitTimeout(4000)
            await driver.waitForElementByAccessibilityId(registerAccessibilityId.backButton, 15000)
            const backButtonOfNewsandUpdatesScreen = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButtonOfNewsandUpdatesScreen.click()
            console.log('Clicked on Back button.')

            console.log('Verify address Details Screen..... ')

            await driver.waitForElementByAccessibilityId(registerAccessibilityId.headerTitle, 20000)

            const headerOfAddressDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            registrationVM.actualHeaderTextOfAddressDetailsScreen = await headerOfAddressDetailsScreen.text()
            console.log('Actual Header of Address Details Screen :' + registrationVM.actualHeaderTextOfAddressDetailsScreen)
            assert.equal(registrationVM.actualHeaderTextOfAddressDetailsScreen, registrationVM.expectedHeaderTextOfAddressDetailsScreen, 'Header Text is same as expected : ADDRESS DETAILS')

            const postalCode = await driver.elementByAccessibilityId(registerAccessibilityId.postalcode)
            registrationVM.actualpostalCodeValue = await postalCode.text()
            console.log('Actual Postal Code Value : ' + registrationVM.actualpostalCodeValue)
            assert.equal(registrationVM.actualpostalCodeValue, registrationDS.postalCode, ' Postal code is verified.')

            await driver.setImplicitWaitTimeout(2000)
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

            const nextButtOnAddressDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            assert.equal(await nextButtOnAddressDetailsScreen.isDisplayed(), true, 'Next button is displayed Successfully')
        })

        it('TC_Reg_68 : To verify "skip" button functionality from News and Updates screen.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const nextButtOnAddressDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            await nextButtOnAddressDetailsScreen.click()
            console.log('Clicked on Next button of Address Details Screen.')

            await driver.setImplicitWaitTimeout(2000)
            const skipButtonOnNewsandUpdatesScreen = await driver.elementByAccessibilityId(registerAccessibilityId.skip)
            await skipButtonOnNewsandUpdatesScreen.click()
            console.log('Clicked on Skip button News and Updates Screen.')

            await driver.setImplicitWaitTimeout(1000)
            await driver.waitForElementByAccessibilityId(registerAccessibilityId.allow, 10000)
            const allowButtonOnYourNotificationScreen = await driver.elementByAccessibilityId(registerAccessibilityId.allow)
            await driver.waitForElementByAccessibilityId(registerAccessibilityId.skip, 10000)
            const skipButtonOnYourNotificationScreen = await driver.elementByAccessibilityId(registerAccessibilityId.skip)

            assert.equal(await allowButtonOnYourNotificationScreen.isDisplayed && await skipButtonOnYourNotificationScreen.isDisplayed(), true, 'User is redirected to Your Notification Page Successfully.')
        })

        it('TC_Reg_70 : To verify back button functionality from "YOUR NOTIFICATIONS" screen.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const backButtonOnYourNotificationScreen = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButtonOnYourNotificationScreen.click()
            console.log('Clicked on Back button.')

            await driver.setImplicitWaitTimeout(3000)
            const headerOfNewsandUpdateScreen = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            registrationVM.actualHeaderTextOfNewsandUpdateScreen = await headerOfNewsandUpdateScreen.text()
            console.log('Actual Header text of News and Updates Screen :' + registrationVM.actualHeaderTextOfNewsandUpdateScreen)
            assert.equal(registrationVM.actualHeaderTextOfNewsandUpdateScreen, registrationVM.expectedHeaderTextOfNewsandUpdateScreen, 'Header Text is same as expected : News and Updates')

            const signMeUp = await driver.elementByAccessibilityId(registerAccessibilityId.signmeup)
            const skipButton = await driver.elementByAccessibilityId(registerAccessibilityId.skip)

            assert.equal(await signMeUp.isDisplayed && await skipButton.isDisplayed(), true, 'User is redirected to Your Notification Page Successfully.')

        })

        it('TC_Reg_71 : To verify "skip" link functionality from Your notifications screen.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const skipButtonOnNewsandUpdates = await driver.elementByAccessibilityId(registerAccessibilityId.skip)
            await skipButtonOnNewsandUpdates.click()
            console.log('Clicked on skip button of News and Updates Screen.')

            await driver.setImplicitWaitTimeout(3000)
            const skipButtonOnNotificationScreen = await driver.elementByAccessibilityId(registerAccessibilityId.skip)
            await skipButtonOnNotificationScreen.click()
            console.log('Clicked on skip button of Your Notification Screen.')

            await driver.setImplicitWaitTimeout(3000)
            const headerText = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            registrationVM.actualHeaderTextOfVerifyYourIdentityScreen = await headerText.text()
            console.log('Actual header text of verify your identity screen : ' + registrationVM.actualHeaderTextOfVerifyYourIdentityScreen)
            assert.equal(registrationVM.actualHeaderTextOfVerifyYourIdentityScreen, registrationVM.expectedHeaderTextOfVerifyYourIdentityScreen, 'Header Text is same as expected : VERIFY YOUR IDENTITY\'')

            const step3and4Text = await driver.elementByAccessibilityId(registerAccessibilityId.step3and4Text)
            registrationVM.actualStep3and4Text = await step3and4Text.text()
            console.log('Step 3 and 4 Text : ' + registrationVM.actualStep3and4Text)
            assert.equal(registrationVM.actualStep3and4Text, registrationVM.expectedStep3and4Text, 'Text is verified successfully.')

            const takeaSelfie = await driver.elementByAccessibilityId(registerAccessibilityId.takeaselfie)
            assert.equal(await takeaSelfie.isDisplayed(), true, 'User is redirected to verify your identity screen')

        })

        it('TC_Reg_73 : To verify back button functionality from "VERIFY YOUR IDENTITY" screen.', async function () {
            await driver.setImplicitWaitTimeout(2000)
            const backButtonOnVerifyYourIdentityScreen = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButtonOnVerifyYourIdentityScreen.click()
            console.log('Clicked on Back Button of Verify Your Identity Screen.')

            await driver.setImplicitWaitTimeout(2000)
            const headerOnYourNotificationScreen = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            registrationVM.actualHeaderTextOnYourNotificationScreen = await headerOnYourNotificationScreen.text()
            console.log('Actual Header Text on Your Notification Screen' + registrationVM.actualHeaderTextOnYourNotificationScreen)
            assert.equal(registrationVM.actualHeaderTextOnYourNotificationScreen, registrationVM.expectedHeaderTextOnYourNotificationScreen, 'Header Text is same as Expected : YOUR NOTIFICATIONS')

            await driver.setImplicitWaitTimeout(1000)
            const skipButtonOnNotificationScreen = await driver.elementByAccessibilityId(registerAccessibilityId.skip)
            const allowButtonOnNotificationScreen = await driver.elementByAccessibilityId(registerAccessibilityId.allow)
            assert.equal(await skipButtonOnNotificationScreen.isDisplayed() && await allowButtonOnNotificationScreen.isDisplayed(), true, 'User redirected to "YOUR NOTIFICATIONS" screen Successfully.')
        })

        it('TC_Reg_74, TC_Reg_77 : To Verify TAKE A SELFIE button functionality from verify your identity screen.', async function () {

            await driver.setImplicitWaitTimeout(1000)
            const skipButtonOnNotificationScreen = await driver.elementByAccessibilityId(registerAccessibilityId.skip)
            await skipButtonOnNotificationScreen.click()
            console.log('Clicked on Skip Button of Your Notifications Screen.')

            await driver.setImplicitWaitTimeout(2000)
            const takeaSelfie = await driver.elementByAccessibilityId(registerAccessibilityId.takeaselfie)
            await takeaSelfie.click()
            console.log('Taped on take selfie button.')
            await driver.setImplicitWaitTimeout(1000)

            const capture = await driver.elementByAccessibilityId(registerAccessibilityId.capture)
            await capture.click()
            console.log('Taped on Capture button.')

            await driver.setImplicitWaitTimeout(1000)
            await driver.waitForElementByAccessibilityId(registerAccessibilityId.done, 25000)
            await driver.setImplicitWaitTimeout(1000)

            const done = await driver.elementByAccessibilityId(registerAccessibilityId.done)
            assert.equal(await done.isDisplayed(), true, 'Done Button displayed successfully.')

        })

        it('TC_Reg_78 : To Verify DONE button functionality from finished screen.', async function () {

            await driver.setImplicitWaitTimeout(5000)
            const done = await driver.elementByAccessibilityId(registerAccessibilityId.done)
            await done.click()
            console.log('Taped on Done button.')
            await driver.setImplicitWaitTimeout(2000)
        })

        it('TC_Reg_78 : To Verify apply screen.', async function () {

            await driver.setImplicitWaitTimeout(3000)
            const apply = await driver.elementByAccessibilityId(registerAccessibilityId.apply)
            const dashboard = await driver.elementByAccessibilityId(registerAccessibilityId.dashboard)
            const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
            const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
            const more = await driver.elementByAccessibilityId(registerAccessibilityId.more)
            //const sport = await driver.elementByXPath(registerXPath.sport)

            //assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await sport.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            await driver.setImplicitWaitTimeout(2000)
        })

        it('TC_Reg_79 : To Verify user profile screen after successfully registration.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
            await profile.click()
            console.log('Taped on profile button.')
            await driver.setImplicitWaitTimeout(2000)

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

            await driver.setImplicitWaitTimeout(2000)
        })
    })
}

module.exports = registerdmodule6

