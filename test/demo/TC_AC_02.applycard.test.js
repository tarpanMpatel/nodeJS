import wd from 'wd'
import chai from 'chai'
import {bsCred, configuration} from '../helpers/config'
import {applycardVM} from '../helpers/common/validationmessage'
import {newRegister} from '../helpers/common/newRegister'
import {kyc} from '../helpers/common/kyc'
import {registerAccessibilityId} from '../helpers/common/androidiOSElements/registration'
import {loginAccessibilityId, loginXPath} from '../helpers/common/androidiOSElements/login'
import {applyCardAccessibilityId, applyCardXPath} from '../helpers/common/androidiOSElements/homePage'
import {kycAccessibilityId} from '../helpers/common/androidiOSElements/kyc'
import {currentTime, networkSet} from '../helpers/data'

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

let testName = 'TC_Auto_AC_02 : To verify Apply Card functionality for KYC Not_Completed user.'

async function applycardmodule2(DeviceName, PlatformVersion, buildName) {

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

        let mobileNumber = Math.floor(Math.random() * 9000000000) + 1000000000
        newRegister(driver, mobileNumber)

        it('TC_KYC_01 : To verify APPLY CARD + button functionality for any category.', async function () {

            await driver.setImplicitWaitTimeout(3000)
            const applyCard0 = await driver.elementByAccessibilityId(loginAccessibilityId.applyCard0)
            await applyCard0.click()
            console.log('Clicked on APPLY CARD \'+\' button.')

            await driver.setImplicitWaitTimeout(2000)
            const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            applycardVM.actualIncomeDetailScreenHeaderTitle = await headerTitle.text()
            console.log('Actual Header Title: ' + applycardVM.actualIncomeDetailScreenHeaderTitle)
            assert.equal(await headerTitle.isDisplayed(), true, 'Header is display successfully')

            const headerText = await driver.elementByAccessibilityId(applyCardAccessibilityId.headerText)
            applycardVM.actualHeaderTextOnIncomeDetailsScreen = await headerText.text()
            console.log('Actual Header Message: ' + applycardVM.actualHeaderTextOnIncomeDetailsScreen)

            const monthlyIncome = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyIncome)
            const nextButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            const backButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            assert.equal(await monthlyIncome.isDisplayed() && await nextButtonOnIncomeDetailsScreen.isDisplayed() && await backButtonOnIncomeDetailsScreen.isDisplayed(), true, 'All elements displayed successfully.')

            console.log('Monthly Income text field, Next Button, Back Button is displayed successfully.')
        })

        kyc(driver)

        it('TC_KYC_41 :To Verify "Done" button functionality of ENJOY  screen.', async function () {

            const doneButton = await driver.elementByAccessibilityId(registerAccessibilityId.done)
            await doneButton.click()
            console.log('Clicked on Done ')
            await driver.setImplicitWaitTimeout(3000)

            await driver.setImplicitWaitTimeout(2000)
            const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            applycardVM.actualHeaderTitle = await headerTitle.text()
            console.log('Actual Header : ' + applycardVM.actualHeaderTitle)
            assert.equal(applycardVM.actualHeaderTitle, applycardVM.expectedHeaderTitle, 'Header is verified successfully')

            //const applycardlogo = await driver.elementByAccessibilityId(applyCardAccessibilityId.applycardlogo)
            const applycardlogo = await driver.elementByXPath(applyCardXPath.applycardlogo)
            const addToCard = await driver.elementByAccessibilityId(applyCardAccessibilityId.addToCard)
            const amountSliderBar = await driver.elementByAccessibilityId(applyCardAccessibilityId.amountSliderBar)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)

            assert.equal(await applycardlogo.isDisplayed() && await addToCard.isDisplayed() && await amountSliderBar.isDisplayed() && await backButton.isDisplayed(), true, 'User is successfully redirected to ADD A CARD Screen.')

            console.log(' logo, Add To Card button, Amount Slider Bar, Back Button is displayed successfully.')

            await driver.setImplicitWaitTimeout(1000)

            const addcardMsg = await driver.elementByAccessibilityId(applyCardAccessibilityId.addcardMsg)
            applycardVM.addCardMessage = await addcardMsg.text()
            console.log(' Add Card Message : ' + applycardVM.addCardMessage)
            assert.equal(await addcardMsg.isDisplayed(), true, 'Add Card Message is verified')

            await driver.setImplicitWaitTimeout(1000)
            const amountText = await driver.elementByAccessibilityId(applyCardAccessibilityId.amountText)
            applycardVM.actualAmountText = await amountText.text()
            console.log(' Actual amount Text : ' + applycardVM.actualAmountText)
            assert.equal(applycardVM.actualAmountText, applycardVM.expectedAmountText, 'Amount is verified')
            console.log('Verified Amount.')

            const durationText = await driver.elementByAccessibilityId(applyCardAccessibilityId.durationText)
            applycardVM.actualDurationText = await durationText.text()
            console.log(' Actual Duration text : ' + applycardVM.actualDurationText)
            assert.equal(applycardVM.actualDurationText, applycardVM.expectedDurationText, 'Duration is verified')
            console.log('Verified Duration.')

            const footerText = await driver.elementByAccessibilityId(applyCardAccessibilityId.footerText)
            applycardVM.footerTextMsg = await footerText.text()
            console.log(' Footer Text Message : ' + applycardVM.footerTextMsg)
            assert.equal(await footerText.isDisplayed(), true, 'Footer text is verified')

            await driver.setImplicitWaitTimeout(1000)
            const OneMonthDuration = await driver.elementByAccessibilityId(applyCardAccessibilityId.OneMonthDuration)
            applycardVM.actualOneMonthDuration = await OneMonthDuration.text()
            console.log(' Actual One Month Duration : ' + applycardVM.actualOneMonthDuration)
            assert.equal(applycardVM.actualOneMonthDuration, applycardVM.expectedOneMonthDuration, '1 month duration button is verified.')

            await driver.setImplicitWaitTimeout(1000)
            const twoMonthDuration = await driver.elementByAccessibilityId(applyCardAccessibilityId.twoMonthDuration)
            applycardVM.actualSecondMonthDuration = await twoMonthDuration.text()
            console.log(' Actual Two Months Duration : ' + applycardVM.actualSecondMonthDuration)
            assert.equal(applycardVM.actualSecondMonthDuration, applycardVM.expectedSecondMonthDuration, '2 months duration button is verified.')

            await driver.setImplicitWaitTimeout(1000)
            const threeMonthDuration = await driver.elementByAccessibilityId(applyCardAccessibilityId.threeMonthDuration)
            applycardVM.actualThirdMonthDuration = await threeMonthDuration.text()
            console.log(' Actual Three Months Duration : ' + applycardVM.actualThirdMonthDuration)
            assert.equal(applycardVM.actualThirdMonthDuration, applycardVM.expectedThirdMonthDuration, '3 months duration button is verified.')

        })

        it('TC_AC_05 : To verify ADD TO CARD button functionality. ', async function () {

            await driver.setImplicitWaitTimeout(1000)
            const addToCard = await driver.elementByAccessibilityId(applyCardAccessibilityId.addToCard)
            await addToCard.click()
            console.log('Clicked on ADD TO CARD button.')

            await driver.setImplicitWaitTimeout(2000)
            const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            applycardVM.actualHeaderTitle = await headerTitle.text()
            console.log('Actual Header:' + applycardVM.actualHeaderTitle)
            assert.equal(applycardVM.actualHeaderTitle, applycardVM.expectedHeaderTitle, 'Header is verfired successfully')

            const logo = await driver.elementByXPath(applyCardXPath.logo1)
            assert.equal(await logo.isDisplayed(), true, 'logo is verified successfully')

            const Successtext1 = await driver.elementByAccessibilityId(applyCardAccessibilityId.Successtext1)
            applycardVM.actualSuccesstext1 = await Successtext1.text()
            console.log('Actual Success text1 :' + applycardVM.actualSuccesstext1)
            assert.equal(applycardVM.actualSuccesstext1, applycardVM.expectedSuccesstext1, ' Success Text 1 is verified successfully')

            await driver.setImplicitWaitTimeout(1000)
            const Successtext2 = await driver.elementByAccessibilityId(applyCardAccessibilityId.Successtext2)
            applycardVM.actualSuccesstext2 = await Successtext2.text()
            console.log('Actual Success text2 :' + applycardVM.actualSuccesstext2)
            assert.equal(await Successtext2.isDisplayed(), true, 'Success Text 2 is verified successfully')

            await driver.setImplicitWaitTimeout(1000)
            const balancetext = await driver.elementByAccessibilityId(applyCardAccessibilityId.balancetext)
            applycardVM.actualBalancText = await balancetext.text()
            console.log('Actual Balance text:' + applycardVM.actualBalancText)
            assert.equal(applycardVM.actualBalancText, applycardVM.expectedBalancText, 'Balance Text is verified successfully')

            await driver.setImplicitWaitTimeout(1000)
            const goToCards = await driver.elementByAccessibilityId(applyCardAccessibilityId.goToCards)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            assert.equal(await goToCards.isDisplayed() && await backButton.isDisplayed(), true, 'GO TO CARDS button and Back button displayed successfully')

        })

        it('TC_AC_06 : To verify GO TO CARDS button functionality.', async function () {

            await driver.setImplicitWaitTimeout(4000)
            const goToCards = await driver.elementByAccessibilityId(applyCardAccessibilityId.goToCards)
            await goToCards.click()
            console.log('Clicked on GO TO CARD button.')

            await driver.setImplicitWaitTimeout(5000)
            const apply = await driver.elementByAccessibilityId(registerAccessibilityId.apply)
            const dashboard = await driver.elementByAccessibilityId(registerAccessibilityId.dashboard)
            const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
            const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
            const more = await driver.elementByAccessibilityId(registerAccessibilityId.more)
            //const sports = await driver.elementByXPath(loginXPath.sports)
            //const clothing = await driver.elementByXPath(loginXPath.clothing)
            const allCard = await driver.elementByXPath(loginXPath.allCards)
            const applyCard0 = await driver.elementByAccessibilityId(loginAccessibilityId.applyCard0)
            const giftCard0 = await driver.elementByAccessibilityId(loginAccessibilityId.giftCard0)

            // assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await sports.isDisplayed() && await clothing.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            await driver.setImplicitWaitTimeout(2000)
        })

        it('TC_AC_011 : To Verify the status of the card.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
            await cards.click()
            console.log('Clicked on cards button.')

            await driver.setImplicitWaitTimeout(30000)

            const myGifts = await driver.elementByXPath(applyCardXPath.myGifts)
            // const sports = await driver.elementByXPath(applyCardXPath.sports)
            const myCards = await driver.elementByXPath(applyCardXPath.myCards)
            // assert.equal(await myGifts.isDisplayed() && await sports.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')
            assert.equal(await myGifts.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')


            const logo = await driver.elementByXPath(applyCardXPath.logo2)
            assert.equal(await logo.isDisplayed(), true, 'Card Displayed Successfully')

            const cardStatus = await driver.elementByAccessibilityId(applyCardAccessibilityId.cardStatus)
            applycardVM.actualCardStatusText = await cardStatus.text()
            console.log('Actual Card Status : ' + applycardVM.actualCardStatusText)
            assert.equal(applycardVM.actualCardStatusText, applycardVM.expectedCardStatusText, 'APPLICATION IS SUBMITTED status is displayed successfully.')

        })

    })

}

module.exports = applycardmodule2
