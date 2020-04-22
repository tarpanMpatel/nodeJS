import wd from 'wd'
import chai from 'chai'
import {bsCred, configuration} from '../helpers/config'
import {applycardDS, currentTime, giftcardDS, networkSet} from '../helpers/data'
import {applycardVM, giftcardVM} from '../helpers/common/validationmessage'
import {newRegister} from '../helpers/common/newRegister'
import {login} from '../helpers/common/login'
import {registerAccessibilityId} from '../helpers/common/androidiOSElements/registration'
import {loginAccessibilityId, loginXPath} from '../helpers/common/androidiOSElements/login'
import {giftCardAccessibilityId, giftCardXPath} from '../helpers/common/androidiOSElements/giftcard'
import {applyCardAccessibilityId, applyCardXPath} from '../helpers/common/androidiOSElements/homePage'
import {sendKey} from '../helpers/common/sendKeys'

const {assert} = chai
let request = require('request')
let ssid

const FAILED_TESTS = {}
let test_status

let driver
if (configuration.driverType == 'local') {
    driver = wd.promiseChainRemote({host: '0.0.0.0', port: '4723'})  // for running in local
} else {
    driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub') // for browserstack
}

let testName = 'TC_Auto_GC_04 : To verify Gift Card functionality for Non Register User.'
let randommobileNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

async function giftcardmodule4(DeviceName, PlatformVersion, buildName) {

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
            /* it('...DONE...', function(done) {
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

        let mobilenumber = giftcardDS.mobileNo
        login(driver, mobilenumber)

        it('TC_GC_01 : To verify GIFT CARD button functionality for any category.', async function () {

            await driver.setImplicitWaitTimeout(3000)
            const giftCard0 = await driver.elementByAccessibilityId(loginAccessibilityId.giftCard0)
            await giftCard0.click()
            console.log('Clicked on GIFT CARD button.')

            await driver.setImplicitWaitTimeout(2000)
            const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            giftcardVM.actualHeaderTitleofAddaGift = await headerTitle.text()
            console.log('Actual Header : ' + giftcardVM.actualHeaderTitleofAddaGift)
            assert.equal(giftcardVM.actualHeaderTitleofAddaGift, giftcardVM.expectedHeaderTitleofAddaGift, 'Header is verfired successfully')

            const logo = await driver.elementByXPath(giftCardXPath.logo)
            const sendVIA = await driver.elementByAccessibilityId(giftCardAccessibilityId.sendVIA)
            const amountSliderBar = await driver.elementByAccessibilityId(giftCardAccessibilityId.amountSliderBar)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)

            assert.equal(await logo.isDisplayed() && await sendVIA.isDisplayed() && await amountSliderBar.isDisplayed() && await backButton.isDisplayed(), true, 'User is successfully redirected to ADD A CARD Screen.')

            console.log(' logo, send VIA button, Amount Slider Bar, Back Button is displayed successfully.')

            await driver.setImplicitWaitTimeout(2000)
            const addaGIFTMsg = await driver.elementByAccessibilityId(giftCardAccessibilityId.addaGIFTMsg)
            let addaGIFTMessage = await addaGIFTMsg.text()
            console.log('Add A GIFT Message : ' + addaGIFTMessage)
            assert.equal(await addaGIFTMsg.isDisplayed(), true, 'Add a GIFT Message displayed successfully.')

            const amountText = await driver.elementByAccessibilityId(applyCardAccessibilityId.amountText)
            applycardVM.actualAmountText = await amountText.text()
            console.log(' Actual Text two : ' + applycardVM.actualAmountText)
            assert.equal(applycardVM.actualAmountText, applycardVM.expectedAmountText, 'Amount Text displayed successfully.')
            console.log('Verified Amount.')

            const amountValue = await driver.elementByAccessibilityId(applyCardAccessibilityId.amountValue)
            applycardVM.actualAmountValue = await amountValue.text()
            console.log(' Actual Amount Value : ' + applycardVM.actualAmountValue)
            assert.equal(applycardVM.actualAmountValue, applycardVM.expectedAmountValue, '£20 amount displayed successfully.')
            console.log('Verified £20 Amount value.')

            const footerText = await driver.elementByAccessibilityId(giftCardAccessibilityId.footerText)
            applycardVM.footerTextMsg = await footerText.text()
            console.log(' Footer Text Message : ' + applycardVM.footerTextMsg)
            assert.equal(await footerText.isDisplayed(), true, 'Footer Text displayed successfully.')
            console.log('Verified Footer Text.')

            await driver.setImplicitWaitTimeout(1000)

        })

        it('TC_GC_02 : To verify SEND VIA button functionality.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const sendVIA = await driver.elementByAccessibilityId(giftCardAccessibilityId.sendVIA)
            await sendVIA.click()
            console.log('Clicked on SEND VIA button.')

            await driver.setImplicitWaitTimeout(3000)
            const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            giftcardVM.actualHeaderTitleofAddaGift = await headerTitle.text()
            console.log('Actual Header:' + giftcardVM.actualHeaderTitleofAddaGift)
            assert.equal(giftcardVM.actualHeaderTitleofAddaGift, giftcardVM.expectedHeaderTitleofAddaGift, 'Header is verfired successfully')

            await driver.setImplicitWaitTimeout(3000)
            const logo = await driver.elementByXPath(giftCardXPath.logo1)
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
            const twentyPound = await driver.elementByAccessibilityId(applyCardAccessibilityId.twentyPound)
            applycardVM.actualtwentyPound = await twentyPound.text()
            console.log('Actual Twenty Pound amount:' + applycardVM.actualtwentyPound)
            assert.equal(applycardVM.actualtwentyPound, applycardVM.expectedtwentyPound, '£20 amount is verified successfully')

            await driver.setImplicitWaitTimeout(1000)
            const shareKARMA = await driver.elementByAccessibilityId(giftCardAccessibilityId.shareKARMA)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            assert.equal(await shareKARMA.isDisplayed() && await backButton.isDisplayed(), true, 'SHARE KARMA button and Back button displayed successfully')

        })

        it('TC_GC_03 : To verify SHARE KARMA button functionality.', async function () {

            await driver.setImplicitWaitTimeout(4000)
            const shareKARMA = await driver.elementByAccessibilityId(giftCardAccessibilityId.shareKARMA)
            await shareKARMA.click()
            console.log('Clicked on SHARE KARMA button.')
            await driver.setImplicitWaitTimeout(3000)

            const whatsappInvite = await driver.elementByAccessibilityId(giftCardAccessibilityId.whatsappInvite)
            const smsInvite = await driver.elementByAccessibilityId(giftCardAccessibilityId.smsInvite)
            const InviteSpender = await driver.elementByXPath(giftCardXPath.InviteSpender)
            const closeButton = await driver.elementByAccessibilityId(giftCardAccessibilityId.closeButton)

            const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            giftcardVM.actualHeaderTitleofAddaGift = await headerTitle.text()
            console.log('Actual Header:' + giftcardVM.actualHeaderTitleofAddaGift)
            assert.equal(giftcardVM.actualHeaderTitleofAddaGift, giftcardVM.expectedHeaderTitleofAddaGift, 'Header is verfired successfully')

            assert.equal(await whatsappInvite.isDisplayed() && await smsInvite.isDisplayed() && await InviteSpender.isDisplayed() && await closeButton.isDisplayed(), true, 'All elements displayed successfully.')
            await driver.setImplicitWaitTimeout(2000)

        })

        it('TC_GC_04_06_10 : To verify  INVITE SPENDER functionality.', async function () {

            await driver.setImplicitWaitTimeout(4000)

            if (giftcardDS.InviteType == 'whatsapp') {
                const whatsappInvite = await driver.elementByAccessibilityId(giftCardAccessibilityId.whatsappInvite)
                await whatsappInvite.click()
                console.log('Click on Whatsapp button.')
                await driver.setImplicitWaitTimeout(2000)

            } else {
                const smsInvite = await driver.elementByAccessibilityId(giftCardAccessibilityId.smsInvite)
                await smsInvite.click()
                console.log('Click on SMS button.')
                await driver.setImplicitWaitTimeout(2000)
            }

            await driver.setImplicitWaitTimeout(3000)

            const firstName = await driver.elementByAccessibilityId(registerAccessibilityId.firstname)
            const mobileNumber = await driver.elementByAccessibilityId(registerAccessibilityId.phone)
            const shareKarma = await driver.elementByAccessibilityId(giftCardAccessibilityId.shareKarma)
            const selectContact = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)

            const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            giftcardVM.actualHeaderTitleofInviteSpender = await headerTitle.text()
            console.log('Actual Header:' + giftcardVM.actualHeaderTitleofInviteSpender)
            assert.equal(giftcardVM.actualHeaderTitleofInviteSpender, giftcardVM.expectedHeaderTitleofInviteSpender, 'Header is verified successfully')

            assert.equal(await firstName.isDisplayed() && await mobileNumber.isDisplayed() && await shareKarma.isDisplayed() && await selectContact.isDisplayed(), true, 'All elements displayed successfully.')
            await driver.setImplicitWaitTimeout(2000)

            await sendKey(driver, firstName, giftcardDS.firstName)
            console.log('Entered First Name.' + giftcardDS.firstName)
            await driver.setImplicitWaitTimeout(2000)

            await sendKey(driver, mobileNumber, randommobileNumber)
            console.log('Entered Mobile No.' + randommobileNumber)
            await driver.setImplicitWaitTimeout(2000)

            if (configuration.runOs === 'android') {
                const tickMark = await driver.elementByXPath(giftCardXPath.tickMark)
                assert.equal(await tickMark.isDisplayed(), true, 'Tick Mark displayed Successfully.')
                await driver.setImplicitWaitTimeout(2000)
            } else {
            }


            await shareKarma.click()
            console.log('Clicked on Share Karma.')
            await driver.setImplicitWaitTimeout(4000)

            if (configuration.runOs === 'android') {
                await driver.back()
                console.log('Clicked on android Back button.')
                await driver.setImplicitWaitTimeout(1000)

            } else {
                await driver.backgroundApp(5)
                console.log('Application running in background.')
                await driver.setImplicitWaitTimeout(10000)
                await driver.elementByAccessibilityId('GetKarma-qa').click()
                await driver.setImplicitWaitTimeout(5000)
                console.log('Opening App again.')
            }

        })

        it('TC_GC_22 : To verify BACK button functionality for INVITE SPENDER.', async function () {

            await driver.waitForElementByAccessibilityId(registerAccessibilityId.backButton, 10000)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')

            await driver.setImplicitWaitTimeout(6000)

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

            //assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await sports.isDisplayed() && await clothing.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            await driver.setImplicitWaitTimeout(2000)
        })

        it('TC_AC_11 : To Verify the status of the card.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
            await cards.click()
            console.log('Clicked on cards button.')
            await driver.setImplicitWaitTimeout(15000)

            const myGifts = await driver.elementByXPath(applyCardXPath.myGifts)
            // const sports = await driver.elementByXPath(applyCardXPath.sports)
            const myCards = await driver.elementByXPath(applyCardXPath.myCards)
            //assert.equal(await myGifts.isDisplayed() && await sports.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')
            assert.equal(await myGifts.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')

            const logo = await driver.elementByXPath(applyCardXPath.logo2)
            assert.equal(await logo.isDisplayed(), true, 'Card Displayed Successfully')

            const cardStatus = await driver.elementByAccessibilityId(applyCardAccessibilityId.cardStatus)
            applycardVM.actualCardStatusText = await cardStatus.text()
            console.log('Actual Card Status : ' + applycardVM.actualCardStatusText)
            assert.equal(applycardVM.actualCardStatusText, applycardVM.expectedCardStatusText, 'APPLICATION IS SUBMITTED status is displayed successfully.')

        })

        it('TC_GC_23 : To Verify the more option.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const more = await driver.elementByAccessibilityId(registerAccessibilityId.more)
            await more.click()
            console.log('Clicked on More button')
            await driver.setImplicitWaitTimeout(6000)

            const FAQ = await driver.elementByAccessibilityId(giftCardAccessibilityId.FAQ)
            const privacyPolicy = await driver.elementByAccessibilityId(giftCardAccessibilityId.privacyPolicy)
            const eula = await driver.elementByAccessibilityId(giftCardAccessibilityId.eula)
            const termsOfServices = await driver.elementByAccessibilityId(giftCardAccessibilityId.termsOfServices)
            const GDRP = await driver.elementByAccessibilityId(giftCardAccessibilityId.GDRP)
            const kgcp = await driver.elementByAccessibilityId(giftCardAccessibilityId.kgcp)
            const logout = await driver.elementByAccessibilityId(giftCardAccessibilityId.logout)

            assert.equal(await FAQ.isDisplayed() && await privacyPolicy.isDisplayed() && await eula.isDisplayed() && await termsOfServices.isDisplayed() && await GDRP.isDisplayed && await kgcp.isDisplayed() && await logout.isDisplayed(), true, 'All option displayed successfully.')
            await driver.setImplicitWaitTimeout(2000)
        })

        it('TC_GC_24 : To Verify the logout functionality.', async function () {

            const logout = await driver.elementByAccessibilityId(giftCardAccessibilityId.logout)
            await logout.click()
            console.log('Clicked on Logout ')
            await driver.setImplicitWaitTimeout(3000)
        })

        it('TC_GC_25 : To Verify the register link functionality.', async function () {

            const registerlink = await driver.elementByAccessibilityId(giftCardAccessibilityId.registerlink)
            await registerlink.click()
            console.log('Clicked on Register Link. ')
            await driver.setImplicitWaitTimeout(3000)

        })

        newRegister(driver, randommobileNumber)

        it('TC_AC_11 : To Verify the status of the card.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
            await cards.click()
            console.log('Clicked on cards button.')
            await driver.setImplicitWaitTimeout(15000)

            const myGifts = await driver.elementByXPath(applyCardXPath.myGifts)
            const myCards = await driver.elementByXPath(applyCardXPath.myCards)
            assert.equal(await myGifts.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')

            await myGifts.click()
            console.log('Clicked on My Gifts button.')
            await driver.setImplicitWaitTimeout(3000)

            const logo = await driver.elementByXPath(giftCardXPath.logo3)
            assert.equal(await logo.isDisplayed(), true, 'Card Displayed Successfully')

            const cardStatus = await driver.elementByAccessibilityId(applyCardAccessibilityId.cardStatus)
            applycardVM.actualCardStatusText = await cardStatus.text()
            console.log('Actual Card Status : ' + applycardVM.actualCardStatusText)
            assert.equal(applycardVM.actualCardStatusText, applycardVM.expectedCardStatusText, 'APPLICATION IS SUBMITTED status is displayed successfully.')

        })
    })
}

module.exports = giftcardmodule4