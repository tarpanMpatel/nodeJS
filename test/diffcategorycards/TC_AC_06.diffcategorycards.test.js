import wd, {TouchAction} from 'wd'
import chai from 'chai'

import {bsCred, configuration} from '../helpers/config'
import {applycardDS, networkSet} from '../helpers/data'
import {login} from '../helpers/common/login'
import {registerAccessibilityId} from '../helpers/common/androidiOSElements/registration'
import {applyCardAccessibilityId, applyCardXPath} from "../helpers/common/androidiOSElements/homePage"
import {applycardVM} from "../helpers/common/validationmessage";


const {assert} = chai
let request = require('request')

let test_status
const FAILED_TESTS = {}
let ssid

let driver
if (configuration.driverType == 'local') {
    driver = wd.promiseChainRemote({host: '0.0.0.0', port: '4723'})  // for running in local
} else {
    driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub') // for browserstack
}

let testName = 'TC_Auto_AC_06 (Different category cards) : To verify Navigation between different categories on Cards screen.'

async function diffcategorycardsmodule(DeviceName, PlatformVersion, buildName) {

    describe(testName, function () {

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
            /*let test = this.test.parent.tests.reduce(function(prev, curr) {
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
                networkProfile: networkSet.highInternet,
                platformVersion: PlatformVersion
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

        let mobilenumber = applycardDS.mobileNo
        login(driver, mobilenumber)

        it('TC_AC_06.1: To verify Navigation between different categories on Cards screen.', async function () {
            const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
            await cards.click()
            console.log('Tapped on Cards.')
            driver.waitForElementsByXPath(applyCardXPath.myGifts,30000)
            driver.waitForElementsByXPath(applyCardXPath.myCards,30000)

            let windowSize = await driver.getWindowSize()
            let windowWidth = windowSize.width
            let windowHeight = windowSize.height
            let pressHeight = windowHeight / 5.4
            let pressWidth = windowWidth / 1.2
            let toWidth = windowWidth / 20

            let action = new TouchAction(driver);
            action.press({x: pressWidth, y: pressHeight});
            action.wait(4000);
            action.moveTo({x: toWidth, y: pressHeight});
            action.release();
            await action.perform();
            console.log('Navigating between screens')
            await driver.setImplicitWaitTimeout(4000)
            await action.perform();
            await driver.setImplicitWaitTimeout(4000)
            await action.perform();
            await driver.setImplicitWaitTimeout(4000)
            await action.perform();
            await driver.setImplicitWaitTimeout(4000)
            await action.perform();
            await driver.setImplicitWaitTimeout(4000)
            await action.perform();
            await driver.setImplicitWaitTimeout(4000)
            await action.perform();
            await driver.setImplicitWaitTimeout(4000)
            let cardStatus
            try {
                console.log('Inside Try.')
                await driver.waitForElementsByAccessibilityId(applyCardAccessibilityId.cardStatus, 10000)
                cardStatus = await driver.elementsByAccessibilityId(applyCardAccessibilityId.cardStatus)
            } catch {
                console.log('Inside Catch.')
                let windowSize = await driver.getWindowSize()
                let windowWidth = windowSize.width
                let windowHeight = windowSize.height
                let pressHeight = windowHeight / 1.5
                let pressWidth = windowWidth / 2.5
                let toHeight = windowHeight / 7

                do {
                    let action = new wd.TouchAction(driver);
                    action.press({x: pressWidth, y: pressHeight});
                    action.wait(4000);
                    action.moveTo({x: pressWidth, y: toHeight});
                    action.release();
                    await action.perform();
                    await driver.setImplicitWaitTimeout(4000)
                    cardStatus = await driver.elementsByAccessibilityId(applyCardAccessibilityId.cardStatus)
                    console.log("No. of cards:" + cardStatus.length)
                } while (cardStatus.length === 0)

            }
            const logo = await driver.elementByXPath(applyCardXPath.logo2)
            assert.equal(await logo.isDisplayed(), true, 'Card Displayed Successfully')
            applycardVM.actualCardStatusText = await cardStatus[0].text()
            console.log('Actual Card Status : ' + applycardVM.actualCardStatusText)
            assert.equal(applycardVM.actualCardStatusText, applycardVM.expectedCardStatusText, 'APPLICATION IS SUBMITTED status is displayed successfully.')
            console.log('Navigation between different screens in Cards module verified successfully.')

        })
    })
}

module.exports = diffcategorycardsmodule
