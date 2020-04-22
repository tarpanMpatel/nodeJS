import chai from 'chai'
import {applycardDS} from '../data'
import {registerAccessibilityId} from './androidiOSElements/registration'
import {loginAccessibilityId, loginXPath} from './androidiOSElements/login'
import {sendKey} from './sendKeys'
import {configuration} from "../config";

const {assert} = chai

let login = function (driver, mobileNumber) {

    it('TC_LG_01 : To verify Login button functionality..', async function () {

        await driver.setImplicitWaitTimeout(1000)
        const btnLogin = await driver.elementByAccessibilityId(registerAccessibilityId.login)
        await btnLogin.click()
        console.log('Clicked on Login button.')

        await driver.setImplicitWaitTimeout(3000)

        await driver.waitForElementByAccessibilityId(registerAccessibilityId.phone, 10000)

        const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
        const password = await driver.elementByAccessibilityId(registerAccessibilityId.password)

        let passwordtext
        let resetitlink
        let registerlink

        if (configuration.runOs === 'android') {
            passwordtext = await driver.elementByXPath(loginXPath.passwordtext)
            resetitlink = await driver.elementByXPath(loginXPath.resetitlink)
            registerlink = await driver.elementByXPath(loginXPath.registerlink)
        }else{
            passwordtext = await driver.elementByXPath(loginXPath.passwordtext)
            resetitlink = await driver.elementByAccessibilityId(loginAccessibilityId.resetitlink)
            registerlink = await driver.elementByAccessibilityId(loginAccessibilityId.registerlink)
        }


        assert.equal(await btnLogin.isDisplayed() && await mobileNo.isDisplayed() && await password.isDisplayed() && await passwordtext.isDisplayed() && await resetitlink.isDisplayed() && await registerlink.isDisplayed(), true, 'Login screen open successfully.')
    })

    it('TC_LG_16 : To verify login with valid credentials.', async function () {

        await driver.setImplicitWaitTimeout(5000)
        const mobileNo = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
        await sendKey(driver, mobileNo, mobileNumber)
        console.log('Entered Registered Mobile no : ' + mobileNumber)

        await driver.setImplicitWaitTimeout(10000)
        const password = await driver.elementByAccessibilityId(registerAccessibilityId.password)
        await sendKey(driver, password, applycardDS.password)
        console.log('Entered Password : ' + applycardDS.password)

        await driver.setImplicitWaitTimeout(5000)
        const Loginbutton = await driver.elementByAccessibilityId(registerAccessibilityId.login)
        await Loginbutton.click()
        console.log('Clicked on Login button.')
        await driver.setImplicitWaitTimeout(20000)

        await driver.waitForElementByAccessibilityId(registerAccessibilityId.apply, 20000)

        await driver.setImplicitWaitTimeout(2000)

        const apply = await driver.elementByAccessibilityId(registerAccessibilityId.apply)
        const dashboard = await driver.elementByAccessibilityId(registerAccessibilityId.dashboard)
        const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
        const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
        const more = await driver.elementByAccessibilityId(registerAccessibilityId.more)
        // const sports = await driver.elementByXPath(loginXPath.sports)
        // const clothing = await driver.elementByXPath(loginXPath.clothing)
        const allCard = await driver.elementByXPath(loginXPath.allCards)
        const applyCard0 = await driver.elementByAccessibilityId(loginAccessibilityId.applyCard0)
        const giftCard0 = await driver.elementByAccessibilityId(loginAccessibilityId.giftCard0)
        //&& await sports.isDisplayed() && await clothing.isDisplayed()
        assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
        console.log('Verified User is successfully redirected to \'Apply Screen\' after successful Login.')
        await driver.setImplicitWaitTimeout(2000)
    })

}

export {
    login
}