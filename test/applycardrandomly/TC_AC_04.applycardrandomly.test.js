import wd, {TouchAction} from 'wd'
import chai from 'chai'

import {bsCred, configuration} from '../helpers/config'
import {applycardDS, networkSet} from '../helpers/data'
import {login} from '../helpers/common/login'
import {applycard} from '../helpers/common/applycard'
import {registerAccessibilityId} from '../helpers/common/androidiOSElements/registration'


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

let testName = 'TC_Auto_AC_04 (Apply Card Randomly) : To verify Apply Card functionality for Randomly selected card.'

async function applycardrandomlymodule(DeviceName, PlatformVersion, buildName) {

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

            it('TC_AC_04.1 : To verify scroll functionality on dashboard.', async function () {

                let windowSize = await driver.getWindowSize()
                let windowWidth = windowSize.width
                let windowHeight = windowSize.height
                let pressHeight = windowHeight / 1.5
                let pressWidth = windowWidth / 2.5
                let toHeight = windowHeight / 7

                let action = new TouchAction(driver);
                action.press({x: pressWidth, y: pressHeight});
                action.wait(4000);
                action.moveTo({x: pressWidth, y: toHeight});
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
                console.log('Scrolling down.')

                let getNameOfapplycard

                if (configuration.runOs === 'android') {
                    const applycards = await driver.elementsByXPath('//*[@content-desc[contains(.,\'-applyBtn-testId\')]]')
                    let noOfapplycard = applycards.length
                    console.log('No of Applycard ' + noOfapplycard)
                    getNameOfapplycard = await applycards[1].getAttribute('contentDescription')
                } else {
                    const applycards = await driver.elementsByXPath('//*[@name[contains(.,\'-applyBtn-testId\')]]')
                    let noOfapplycard = applycards.length
                    console.log('No of Applycard ' + noOfapplycard)
                    getNameOfapplycard = await applycards[8].getAttribute('name')
                }

                console.log('Name of Applycard : ' + getNameOfapplycard)
                var applycardName = getNameOfapplycard.split('-')
                let numberOfapplycard = applycardName[0].trim()
                console.log(' Applycard No : ' + numberOfapplycard)

                let randomapplycard

                if (configuration.runOs === 'android') {
                    randomapplycard = await driver.elementByXPath('//*[@content-desc[contains(.,\'' + numberOfapplycard + '-applyBtn-testId\')]]')
                    await randomapplycard.click()
                    console.log(' Clicked on ' + numberOfapplycard + 'applycard')
                } else {
                    randomapplycard = await driver.elementByXPath('//*[@name[contains(.,\'' + numberOfapplycard + '-applyBtn-testId\')]]')
                    await randomapplycard.click()
                    console.log(' Clicked on ' + numberOfapplycard + 'applycard')

                }
                await driver.setImplicitWaitTimeout(5000)
            })
            applycard(driver)

        it('TC_AC_04.2 : To verify Tap on category menus and apply card.', async function () {
            let restaurant = await driver.elementByXPath('//*[@text=\'Restaurant\']')
            await restaurant.click()
            console.log('Tapped on Restaurant.')


        })
        }
    )
}

module.exports = applycardrandomlymodule