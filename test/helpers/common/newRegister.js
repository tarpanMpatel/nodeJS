import chai from 'chai'
import {registrationDS} from '../data'
import {registerAccessibilityId, registerXPath} from './androidiOSElements/registration'
import {sendKey} from '../common/sendKeys'
import {configuration} from '../config'

const {assert} = chai

let newRegister = function (driver, mobileNumber) {

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
        } else {
            login = await driver.elementByAccessibilityId(registerAccessibilityId.loginlink)
        }

        assert.equal(await login.isDisplayed() && await mobileNo.isDisplayed() && await pswd.isDisplayed() && await checkBox.isDisplayed(), true, 'Successfully Redirected to Register page.')
    })

    it('TC_Reg_03 : To Verify "LOGIN" button functionality on registration page.', async function () {
        await driver.setImplicitWaitTimeout(1000)
        let login
        if (configuration.runOs == 'android') {
            login = await driver.elementByXPath(registerXPath.login)
        } else {
            login = await driver.elementByAccessibilityId(registerAccessibilityId.loginlink)
        }
        assert.equal(await login.isDisplayed(), true, 'LOGIN button displayed Successfully.')
    })

    it('TC_Reg_23 : To Verify "Register" button functionality with valid details.', async function () {
        await driver.setImplicitWaitTimeout(1000)
        const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
        await sendKey(driver, mobileNo, mobileNumber)
        console.log('Entered Mobile number : ' + mobileNumber)

        await driver.setImplicitWaitTimeout(1000)
        const password = await driver.elementByAccessibilityId(registerAccessibilityId.password)
        await sendKey(driver, password, registrationDS.password)
        console.log('Entered Password.' + registrationDS.password)

        await driver.setImplicitWaitTimeout(1000)
        const checkBox = await driver.elementByAccessibilityId(registerAccessibilityId.aggrementCheckbox)
        await checkBox.click()
        console.log('Checked licence-agreement checkbox.')

        await driver.setImplicitWaitTimeout(1000)
        const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)
        await registerBtn.click()
        console.log('Clicked on register Button.')

        await driver.waitForElementByAccessibilityId(registerAccessibilityId.otp, 10000)
        await driver.setImplicitWaitTimeout(1000)

        const otp = await driver.elementByAccessibilityId(registerAccessibilityId.otp)
        assert.equal(await otp.isDisplayed(), true, 'Verification Code page displayed Successfully.')
    })

    it('TC_Reg_24 : To Verify details shown on "Verification code" screen.', async function () {
        await driver.setImplicitWaitTimeout(3000)
        const otp = await driver.elementByAccessibilityId(registerAccessibilityId.otp)
        const nextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
        const countDownText = await driver.elementByAccessibilityId(registerAccessibilityId.countdowntext)
        assert.equal(await countDownText.isDisplayed() && await otp.isDisplayed() && await nextButton.isDisplayed(), true, 'Successfully OTP page displayed.')
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

        await driver.setImplicitWaitTimeout(1000)
        await nextBtn.click()
        console.log('Clicked on next button.')

        await driver.setImplicitWaitTimeout(1000)
        await driver.waitForElementByAccessibilityId(registerAccessibilityId.firstname, 15000)
        await driver.setImplicitWaitTimeout(1000)

        const personalDetails = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
        assert.equal(await personalDetails.isDisplayed(), true, 'Successfully Personal Detail screen displayed.')
    })

    it('TC_Reg_33, TC_Reg_54 : To Verify details on personal details screen.', async function () {
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
        await driver.setImplicitWaitTimeout(3000)

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

        await driver.setImplicitWaitTimeout(3000)

        const searchIcon = await driver.elementByAccessibilityId(registerAccessibilityId.search)
        await searchIcon.click()
        console.log('Clicked on Search icon.')

        await driver.setImplicitWaitTimeout(10000)

        const selectAddress = await driver.elementByAccessibilityId(registerAccessibilityId.selectAddress)
        await selectAddress.click()
        console.log('Address Selected.')

        const country = await driver.elementByAccessibilityId('countryName-testId')
        let actualCountryName = await country.text()

        if (actualCountryName === 'Country') {
            await driver.setImplicitWaitTimeout(2000)
            const country = await driver.elementByAccessibilityId('countryName-testId')
            await sendKey(driver, country, "UK")
            console.log('Entered on country.')

        } else {
        }

        await driver.setImplicitWaitTimeout(2000)
        const nextButton = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
        await nextButton.click()
        await driver.setImplicitWaitTimeout(1000)
        console.log('Clicked on Next button.')
    })

    it('TC_Reg_69 : To Verify "SIGN ME UP" button functionality from news and updates screen.', async function () {
        await driver.setImplicitWaitTimeout(1000)
        await driver.waitForElementByAccessibilityId(registerAccessibilityId.signmeup, 15000)
        const signMeUp = await driver.elementByAccessibilityId(registerAccessibilityId.signmeup)
        await signMeUp.click()
        console.log('Clicked on Sign Me Up button.')

        await driver.setImplicitWaitTimeout(1000)
        await driver.waitForElementByAccessibilityId(registerAccessibilityId.allow, 15000)
        const allowButton = await driver.elementByAccessibilityId(registerAccessibilityId.allow)
        const skipButton = await driver.elementByAccessibilityId(registerAccessibilityId.skip)
        assert.equal(await allowButton.isDisplayed() && await skipButton.isDisplayed(), true, 'Successfully allow and skip button displayed.')
    })

    it('TC_Reg_72 : To Verify "ALLOW" functionality from Your notifications screen.', async function () {
        await driver.setImplicitWaitTimeout(1000)
        const allowButton = await driver.elementByAccessibilityId(registerAccessibilityId.allow)
        await allowButton.click()
        console.log('Taped on allow button.')

        await driver.setImplicitWaitTimeout(1000)
        await driver.waitForElementByAccessibilityId(registerAccessibilityId.step3and4Text, 10000)
        const step3and4Text = await driver.elementByAccessibilityId(registerAccessibilityId.step3and4Text)
        const takeaSelfie = await driver.elementByAccessibilityId(registerAccessibilityId.takeaselfie)

        await driver.setImplicitWaitTimeout(1000)
        assert.equal(await step3and4Text.isDisplayed() && await takeaSelfie.isDisplayed(), true, 'Successfully step3and4 Text and takeaSelfie button displayed.')
    })

    it('TC_Reg_74, TC_Reg_77 : To Verify TAKE A SELFIE button functionality from verify your identity screen.', async function () {
        await driver.setImplicitWaitTimeout(2000)
        const takeaSelfie = await driver.elementByAccessibilityId(registerAccessibilityId.takeaselfie)
        await takeaSelfie.click()
        console.log('Taped on take selfie button.')
        await driver.waitForElementByAccessibilityId(registerAccessibilityId.capture, 10000)
        await driver.setImplicitWaitTimeout(1000)

        const capture = await driver.elementByAccessibilityId(registerAccessibilityId.capture)
        await capture.click()
        console.log('Taped on Capture button.')

        await driver.waitForElementByAccessibilityId(registerAccessibilityId.done, 35000)
        await driver.setImplicitWaitTimeout(3000)

        const done = await driver.elementByAccessibilityId(registerAccessibilityId.done)
        assert.equal(await done.isDisplayed(), true, 'Done Button displayed successfully.')
    })

    it('TC_Reg_78 : To Verify DONE button functionality from finished screen.', async function () {
        await driver.setImplicitWaitTimeout(3000)
        let done
        if (configuration.runOs == 'android') {
            done = await driver.elementByAccessibilityId(registerAccessibilityId.done)
        } else {
            done = await driver.elementByXPath(registerXPath.done)
        }

        await done.click()
        console.log('Taped on Done button.')
        await driver.setImplicitWaitTimeout(2000)
    })

    it('TC_Reg_78 : To Verify apply screen.', async function () {
        await driver.waitForElementByAccessibilityId(registerAccessibilityId.apply, 12000)
        await driver.setImplicitWaitTimeout(2000)

        const apply = await driver.elementByAccessibilityId(registerAccessibilityId.apply)
        const dashboard = await driver.elementByAccessibilityId(registerAccessibilityId.dashboard)
        const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
        const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
        const more = await driver.elementByAccessibilityId(registerAccessibilityId.more)
        //const sport = await driver.elementByXPath(registerXPath.sport)
        //&& await sport.isDisplayed()
        assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
        await driver.setImplicitWaitTimeout(2000)
    })

}

export {
    newRegister
}