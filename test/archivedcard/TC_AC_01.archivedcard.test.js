import wd from 'wd'
import chai from 'chai'
import {bsCred, configuration} from '../helpers/config'
import {login} from '../helpers/common/login'
import {registerAccessibilityId} from '../helpers/common/androidiOSElements/registration'
import {applyCardXPath} from '../helpers/common/androidiOSElements/homePage'
import {archivedCardXPath, archivedCardAccessibilityId} from '../helpers/common/androidiOSElements/shopApps'
import {archivedCardDS, currentTime, networkSet} from '../helpers/data'
import {archivedcardVM} from '../helpers/common/validationmessage'

const {assert} = chai
let request = require('request')

let test_status
const FAILED_TESTS = {}
let ssid

let driver
if (configuration.driverType === 'local') {
    driver = wd.promiseChainRemote({host: '0.0.0.0', port: '4723'})  // for running in local
} else {
    driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub') // for browserstack
}

let testName = 'TC_Auto_ARC_01 : To verify Archived Card functionality for logged in user.'

async function archivedcardmodule1(DeviceName, PlatformVersion, buildName) {

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
            await driver.setImplicitWaitTimeout(15000)
            ssid = await driver.getSessionId()
            console.log('--started-->' + ssid)
            const registerBtn = await driver.elementByAccessibilityId(registerAccessibilityId.register)
            const btnLogin = await driver.elementByAccessibilityId(registerAccessibilityId.login)
            assert.equal(await registerBtn.isDisplayed() && await btnLogin.isDisplayed(), true, 'Application launch successfully.')
        })

        let mobilenumber = archivedCardDS.mobileNumberforArchived
        login(driver, mobilenumber)

        it('TC_Cards_01: To Verify the cards screen.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
            await cards.click()
            console.log('Clicked on cards button.')
            await driver.setImplicitWaitTimeout(40000)
            //  await driver.waitForElementByXPath(applyCardXPath.myGifts, 40000)

            const myGifts = await driver.elementByXPath(applyCardXPath.myGifts)
            const myCards = await driver.elementByXPath(applyCardXPath.myCards)
            assert.equal(await myGifts.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')

            const apply = await driver.elementByAccessibilityId(registerAccessibilityId.apply)
            const dashboard = await driver.elementByAccessibilityId(registerAccessibilityId.dashboard)
            const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
            const more = await driver.elementByAccessibilityId(registerAccessibilityId.more)

            assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await more.isDisplayed() && await profile.isDisplayed(), true, 'All elements displayed successfully.')
        })

        it('TC_ARC_01 : To Verify Card details screen.', async function () {

            await driver.setImplicitWaitTimeout(1000)
            const card = await driver.elementByXPath(archivedCardXPath.card)
            /* const archiveCardID = await card[0].getAttribute("content-desc");
             console.log("....ACID...." + archiveCardID)*/
            await card.click()
            console.log('Clicked on Card')
            await driver.setImplicitWaitTimeout(3000)

            const headerText = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            archivedcardVM.actualHeaderTextOfPAYVIA = await headerText.text()
            console.log('Actual Header Text : ' + archivedcardVM.actualHeaderTextOfPAYVIA)
            assert.equal(archivedcardVM.actualHeaderTextOfPAYVIA, archivedcardVM.expectedHeaderTextOfPAYVIA, 'Header verified Successfully.')

            const logo = await driver.elementByXPath(archivedCardXPath.logo)

            let termsbutton
            let archivebutton
            let editbutton

            if (configuration.runOs === 'android') {
                archivebutton = await driver.elementByXPath(archivedCardXPath.archivebutton)
                termsbutton = await driver.elementByXPath(archivedCardXPath.termsbutton)
                editbutton = await driver.elementByXPath(archivedCardXPath.editbutton)
            } else {
                archivebutton = await driver.elementByAccessibilityId(archivedCardAccessibilityId.archivebutton)
                termsbutton = await driver.elementByAccessibilityId(archivedCardAccessibilityId.termsbutton)
                editbutton = await driver.elementByAccessibilityId(archivedCardAccessibilityId.editbutton)
            }

            assert.equal(await logo.isDisplayed() && await archivebutton.isDisplayed() && await termsbutton.isDisplayed() && await editbutton.isDisplayed(), true, 'All elements displayed successfully')

            const instructionsText = await driver.elementByXPath(archivedCardXPath.instructionsText)
            archivedcardVM.actualInstructionsText = await instructionsText.text()
            console.log('Actual Header Text : ' + archivedcardVM.actualInstructionsText)
            assert.equal(archivedcardVM.actualInstructionsText, archivedcardVM.expectedInstructionsText, 'INSTRUCTIONS text verified Successfully.')

        })

        it('TC_ARC_02 : To Verify Back Button functionality', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')
            await driver.setImplicitWaitTimeout(3000)

            const myGifts = await driver.elementByXPath(applyCardXPath.myGifts)
            //const sports = await driver.elementByXPath(applyCardXPath.sports)
            const myCards = await driver.elementByXPath(applyCardXPath.myCards)
            //assert.equal(await myGifts.isDisplayed() && await sports.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')
            assert.equal(await myGifts.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')

            const apply = await driver.elementByAccessibilityId(registerAccessibilityId.apply)
            const dashboard = await driver.elementByAccessibilityId(registerAccessibilityId.dashboard)
            const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
            const more = await driver.elementByAccessibilityId(registerAccessibilityId.more)

            assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await more.isDisplayed() && await profile.isDisplayed(), true, 'All elements displayed successfully.')

        })

        it('TC_ARC_01_03: To Verify Card details screen and Archiving of a card.', async function () {

            await driver.setImplicitWaitTimeout(5000)

            for (let i = 0; i <= 8; i++) {

                if (i = 3) {
                    i = 0
                }

                let cardRefresh = await driver.elementsByXPath(archivedCardXPath.card)
                await cardRefresh[i].click()
                console.log('Clicked on Card ' + i + ':' + cardRefresh[i])
                await driver.setImplicitWaitTimeout(10000)

                const headerText = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
                archivedcardVM.actualHeaderTextOfPAYVIA = await headerText.text()
                console.log('Actual Header Text : ' + archivedcardVM.actualHeaderTextOfPAYVIA)
                assert.equal(archivedcardVM.actualHeaderTextOfPAYVIA, archivedcardVM.expectedHeaderTextOfPAYVIA, ' Header verified Successfully.')

                const logo = await driver.elementByXPath(archivedCardXPath.logo)
                let termsbutton
                let archivebutton
                let editbutton

                if (configuration.runOs === 'android') {
                    archivebutton = await driver.elementByXPath(archivedCardXPath.archivebutton)
                    termsbutton = await driver.elementByXPath(archivedCardXPath.termsbutton)
                    editbutton = await driver.elementByXPath(archivedCardXPath.editbutton)
                } else {
                    archivebutton = await driver.elementByAccessibilityId(archivedCardAccessibilityId.archivebutton)
                    termsbutton = await driver.elementByAccessibilityId(archivedCardAccessibilityId.termsbutton)
                    editbutton = await driver.elementByAccessibilityId(archivedCardAccessibilityId.editbutton)
                }

                assert.equal(await logo.isDisplayed() && await archivebutton.isDisplayed() && await termsbutton.isDisplayed() && await editbutton.isDisplayed(), true, 'All elements displayed successfully')

                const instructionsText = await driver.elementByXPath(archivedCardXPath.instructionsText)
                archivedcardVM.actualInstructionsText = await instructionsText.text()
                console.log('Actual Header Text : ' + archivedcardVM.actualInstructionsText)
                assert.equal(archivedcardVM.actualInstructionsText, archivedcardVM.expectedInstructionsText, 'INSTRUCTIONS text verified Successfully.')

                await archivebutton.click()
                console.log('Clicked on Archive Button')
                await driver.setImplicitWaitTimeout(9000)

                let reInitCards = await driver.elementsByXPath(archivedCardXPath.card)
                console.log('....@@@@@.....-> ' + reInitCards.length)

                if (reInitCards.length == 0) {
                    break
                }
            }

        })

        it('TC_ARC_04 : To Verify Archived option in action menu.', async function () {

            const menu = await driver.elementByAccessibilityId(archivedCardAccessibilityId.menu)
            await menu.click()
            console.log('Clicked on menu button')
            await driver.setImplicitWaitTimeout(7000)

            const archivedOption = await driver.elementByXPath(archivedCardXPath.archivedOption)
            const rejectedOption = await driver.elementByXPath(archivedCardXPath.rejectedOption)
            assert.equal(await archivedOption.isDisplayed() && await rejectedOption.isDisplayed(), true, 'Archived and Rejected option displayed successfully.')

            await archivedOption.click()
            console.log('Clicked on Archived Option')

            await driver.setImplicitWaitTimeout(30000)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            const restoreButton = await driver.elementByXPath(archivedCardXPath.restoreButton)
            const logo = await driver.elementByXPath(archivedCardXPath.logo1)

            assert.equal(await backButton.isDisplayed() && await restoreButton.isDisplayed() && await logo.isDisplayed(), true, 'All element displayed successfully')

        })

        it('TC_ARC_05 : To Verify Back Button functionality', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')
            await driver.setImplicitWaitTimeout(30000)

            const myGifts = await driver.elementByXPath(applyCardXPath.myGifts)
            const myCards = await driver.elementByXPath(applyCardXPath.myCards)
            assert.equal(await myGifts.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')

            const apply = await driver.elementByAccessibilityId(registerAccessibilityId.apply)
            const dashboard = await driver.elementByAccessibilityId(registerAccessibilityId.dashboard)
            const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
            const more = await driver.elementByAccessibilityId(registerAccessibilityId.more)

            assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await more.isDisplayed() && await profile.isDisplayed(), true, 'All elements displayed successfully.')

        })

        it('TC_ARC_06 : To Verify Restoring of a card', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const menu = await driver.elementByAccessibilityId(archivedCardAccessibilityId.menu)
            await menu.click()
            console.log('Clicked on menu button')
            await driver.setImplicitWaitTimeout(3000)

            const archivedOption = await driver.elementByXPath(archivedCardXPath.archivedOption)
            const rejectedOption = await driver.elementByXPath(archivedCardXPath.rejectedOption)
            assert.equal(await archivedOption.isDisplayed() && await rejectedOption.isDisplayed(), true, 'Archived and Rejected option displayed successfully.')

            await archivedOption.click()
            console.log('Clicked on Archived Option')
            await driver.waitForElementByXPath(archivedCardXPath.restoreButton, 15000)

            let beforeRestoreButtonCount = await driver.elementsByXPath(archivedCardXPath.restoreButton)
            console.log('Before Restore Button Count :' + beforeRestoreButtonCount.length)

            for (let i = 0; i < beforeRestoreButtonCount.length; i++) {

                const restoreBtn = await driver.elementByXPath(archivedCardXPath.restoreButton)
                await restoreBtn.click()
                console.log('Clicked on Restore Button.')
                await driver.sleep(5000)
                await driver.sleep(1000)
            }

            await driver.setImplicitWaitTimeout(4000)
            let afterRestoreButtonCount = await driver.elementsByXPath(archivedCardXPath.restoreButton)
            console.log('After Restore Button Count :' + afterRestoreButtonCount.length)

            if (afterRestoreButtonCount.length < beforeRestoreButtonCount.length) {
                console.log('Cards Restored Successfully.')
            } else {
                console.log('Cards not Restored.')
            }
        })

        it('TC_ARC_07 : To Verify Restored card should be display under card screen.', async function () {

            await driver.setImplicitWaitTimeout(5000)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')
            await driver.setImplicitWaitTimeout(50000)

            const card = await driver.elementByXPath(archivedCardXPath.card)

            assert.equal(await card.isDisplayed(), true, 'Card restored Successfully.')

        })

    })
}

module.exports = archivedcardmodule1