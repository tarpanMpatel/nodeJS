import wd, {TouchAction} from 'wd'
import chai from 'chai'
import {bsCred, configuration} from '../helpers/config'
import {applycardDS, networkSet} from '../helpers/data'
import {login} from '../helpers/common/login'
import {applycard} from '../helpers/common/applycard'
import {registerAccessibilityId} from '../helpers/common/androidiOSElements/registration'
import {applyCardAccessibilityId} from "../helpers/common/androidiOSElements/homePage"


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

let testName = 'TC_Auto_AC_05 (Different Category Apply Card) : To verify Navigation between different categories on Apply card screen.'

async function diffcategoryacmodule(DeviceName, PlatformVersion, buildName) {

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

            it('TC_AC_05.1 : To verify Navigation between different categories on Apply card screen.', async function () {
                let windowSize = await driver.getWindowSize()
                let windowWidth = windowSize.width
                let windowHeight = windowSize.height
                let pressHeight = windowHeight / 1.5
                let pressWidth = windowWidth / 1.2
                let toWidth = windowWidth / 20

                let action = new TouchAction(driver);
                action.press({x: pressWidth, y: pressHeight});
                action.wait(4000);
                action.moveTo({x: toWidth, y: pressHeight});
                action.release();
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

                const applycard = await driver.elementByAccessibilityId(applyCardAccessibilityId.applycardBtn)
                await applycard.click()
                await driver.setImplicitWaitTimeout(5000)
            })
            applycard(driver)
        }
    )
}

module.exports = diffcategoryacmodule