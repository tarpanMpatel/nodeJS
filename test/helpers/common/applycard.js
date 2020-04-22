import wd from "wd"
import chai from 'chai'
import {registerAccessibilityId} from "./androidiOSElements/registration"
import {applycardVM} from "./validationmessage"
import {applyCardAccessibilityId, applyCardXPath} from "./androidiOSElements/homePage"

const {assert} = chai

let applycard = function (driver) {

    it('TC_AC_02 : To verify APPLY CARD + button functionality for any card category.', async function () {

        await driver.setImplicitWaitTimeout(5000)
        const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        applycardVM.actualHeaderTitle = await headerTitle.text()
        console.log('Actual Header : ' + applycardVM.actualHeaderTitle)
        assert.equal(applycardVM.actualHeaderTitle, applycardVM.expectedHeaderTitle, 'Header is verfired successfully')

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

        await driver.setImplicitWaitTimeout(1000)
        const amountValue = await driver.elementByAccessibilityId(applyCardAccessibilityId.amountValue)
        applycardVM.actualAmountValue = await amountValue.text()
        console.log(' Actual Amount Value : ' + applycardVM.actualAmountValue)
        assert.equal(applycardVM.actualAmountValue, applycardVM.expectedAmountValue, '£20 amount  verified.')

    })

    it('TC_AC_03 : To verify AMOUNT selection bar functionality.', async function () {
        await driver.setImplicitWaitTimeout(2000)
        const amountSliderBar = await driver.elementByAccessibilityId(applyCardAccessibilityId.amountSliderBar)
        assert.equal(await amountSliderBar.isDisplayed(), true, 'AMOUNT Selection bar displayed successfully.')
    })

    it('TC_AC_05 : To verify ADD TO CARD button functionality with £20 amount and 1 months duration option.', async function () {

        await driver.setImplicitWaitTimeout(3000)
        const OneMonthDuration = await driver.elementByAccessibilityId(applyCardAccessibilityId.OneMonthDuration)
        await OneMonthDuration.click()
        console.log('Clicked on 1 month Duration button.')
        await driver.setImplicitWaitTimeout(1000)

        const addToCard = await driver.elementByAccessibilityId(applyCardAccessibilityId.addToCard)
        await addToCard.click()
        console.log('Clicked on ADD TO CARD button.')

        await driver.setImplicitWaitTimeout(2000)
        const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        applycardVM.actualHeaderTitle = await headerTitle.text()
        console.log('Actual Header:' + applycardVM.actualHeaderTitle)
        assert.equal(applycardVM.actualHeaderTitle, applycardVM.expectedHeaderTitle, 'Header is verfired successfully')

        await driver.setImplicitWaitTimeout(3000)
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
        const twentyPound = await driver.elementByAccessibilityId(applyCardAccessibilityId.twentyPound)
        applycardVM.actualtwentyPound = await twentyPound.text()
        console.log('Actual Twenty Pound amount:' + applycardVM.actualtwentyPound)
        assert.equal(applycardVM.actualtwentyPound, applycardVM.expectedtwentyPound, 'Twenty Pound amount is verified successfully')

        await driver.setImplicitWaitTimeout(1000)
        const goToCards = await driver.elementByAccessibilityId(applyCardAccessibilityId.goToCards)
        const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
        assert.equal(await goToCards.isDisplayed() && await backButton.isDisplayed(), true, 'GO TO CARDS button and Back button displayed successfully')

    })

    it('TC_AC_06 : To verify GO TO CARDS button functionality .', async function () {
        await driver.setImplicitWaitTimeout(4000)
        const goToCards = await driver.elementByAccessibilityId(applyCardAccessibilityId.goToCards)
        await goToCards.click()
        console.log('Clicked on GO TO CARD button.')

        await driver.setImplicitWaitTimeout(3000)
        const apply = await driver.elementByAccessibilityId(registerAccessibilityId.apply)
        const dashboard = await driver.elementByAccessibilityId(registerAccessibilityId.dashboard)
        const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
        const profile = await driver.elementByAccessibilityId(registerAccessibilityId.profile)
        const more = await driver.elementByAccessibilityId(registerAccessibilityId.more)

        assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
        await driver.setImplicitWaitTimeout(2000)
    })

    it('TC_AC_011 : To Verify the status of the card.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const cards = await driver.elementByAccessibilityId(registerAccessibilityId.card)
            await cards.click()
            console.log('Clicked on cards button.')

            await driver.setImplicitWaitTimeout(30000)
            await driver.waitForElementByXPath(applyCardXPath.myGifts, 10000)
            await driver.waitForElementByXPath(applyCardXPath.myCards, 10000)
            const myGifts = await driver.elementByXPath(applyCardXPath.myGifts)
            const myCards = await driver.elementByXPath(applyCardXPath.myCards)

            assert.equal(await myGifts.isDisplayed() && await myCards.isDisplayed(), true, 'User redirected to Cards page successfully.')
            await driver.setImplicitWaitTimeout(1000)

            let cardStatus
            try {
                console.log('Inside Try.')
                await driver.waitForElementByAccessibilityId(applyCardAccessibilityId.cardStatus, 10000)
            } catch {
                console.log('Inside Catch.')
                let windowSize = await driver.getWindowSize()
                let windowWidth = windowSize.width
                let windowHeight = windowSize.height
                let pressHeight = windowHeight / 1.35
                let pressWidth = windowWidth / 1.125
                let toHeight = windowHeight / 5

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
            applycardVM.actualCardStatusText = await cardStatus[0].text()
            console.log('Actual Card Status : ' + applycardVM.actualCardStatusText)
            assert.equal(applycardVM.actualCardStatusText, applycardVM.expectedCardStatusText, 'APPLICATION IS SUBMITTED status is displayed successfully.')
        })
}

export {
    applycard
}