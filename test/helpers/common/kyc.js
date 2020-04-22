import chai from 'chai'
import {kycDS} from '../data'
import {kycVM} from '../common/validationmessage'
import {kycAccessibilityId, kycXPath} from './androidiOSElements/kyc'
import {registerAccessibilityId} from './androidiOSElements/registration'
import {sendKey} from './sendKeys'

const {assert} = chai

let kyc = function (driver) {

    it('TC_KYC_02_03_04 : To verify Monthly income field functionality  with valid input.', async function () {

        await driver.setImplicitWaitTimeout(3000)
        const monthlyIncome = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyIncome)
        await sendKey(driver, monthlyIncome, kycDS.validMonthlyIncome)
        console.log('Entered monthly Income : ' + kycDS.validMonthlyIncome)

        await driver.setImplicitWaitTimeout(2000)
        const monthlyIncomeMsg = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyIncomeMsg)
        kycVM.actualMonthlyIncomeMsg = await monthlyIncomeMsg.text()
        console.log('Actual Monthly Rent Message :' + kycVM.actualMonthlyIncomeMsg)
        assert.equal(kycVM.actualMonthlyIncomeMsg, kycVM.expectedMonthlyIncomeMsg, 'Message verified successfully.')

        const tickMark = await driver.elementByAccessibilityId(kycAccessibilityId.tickMark)
        const nextButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
        assert.equal(await tickMark.isDisplayed() && await nextButtonOnIncomeDetailsScreen.isDisplayed(), true, 'Tick Mark and Next Button enable successfully.')
    })

    it('TC_KYC_07 :To verify NEXT button functionality of  Income Details screen.', async function () {

        await driver.setImplicitWaitTimeout(3000)
        const nextButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
        await nextButtonOnIncomeDetailsScreen.click()
        console.log('Clicked on Next Button.')
        await driver.setImplicitWaitTimeout(7000)

        const headerMessage = await driver.elementByXPath(kycXPath.headerMessage)
        kycVM.HeaderMessage = await headerMessage.text()
        console.log('Actual Header Message : ' + kycVM.HeaderMessage)

        const monthlyRent = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
        const numberOfDependants = await driver.elementByAccessibilityId(kycAccessibilityId.numberOfDependants)
        const nextButtonOnHousingDetails = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
        const mortgageRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.mortgageRadiobutton)
        const rentRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.rentRadiobutton)

        const headerTextOfHousingDetails = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfHousingDetails = await headerTextOfHousingDetails.text()
        console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfHousingDetails)
        assert.equal(kycVM.actualHeaderTextOfHousingDetails, kycVM.expectedHeaderTextOfHousingDetails, 'Housing Details Screen header verified Successfully.')

        assert.equal(await rentRadiobutton.isDisplayed() && await mortgageRadiobutton.isDisplayed() && await headerMessage.isDisplayed() && await monthlyRent.isDisplayed() && await numberOfDependants.isDisplayed() && await nextButtonOnHousingDetails.isDisplayed(), true, 'All element displayed Successfully.')
        console.log(' Header Message, Monthly Rent text field, Number Of Dependants text field, Next Button displayed successfully On Housing Details Screen ')

    })

    it('TC_KYC_08_09_11_12_14 :To verify NEXT button functionality on Housing Details screen after entering valid details.', async function () {

        await driver.setImplicitWaitTimeout(4000)
        if (kycDS.housingDetail == 'rent') {
            const rentRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.rentRadiobutton)
            await rentRadiobutton.click()
            console.log('Clicked on Rent radio button')
            await driver.setImplicitWaitTimeout(2000)

            const monthlyRent = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
            kycVM.actualMonthlyRentPlaceHolder = await monthlyRent.text()
            console.log('Actual Rent Place Holder ' + kycVM.actualMonthlyRentPlaceHolder)
            assert.equal(kycVM.actualMonthlyRentPlaceHolder, kycVM.expectedMonthlyRentPlaceHolder, 'Rent Place Holder verified successfully.')
        } else {
            const mortgageRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.mortgageRadiobutton)
            await mortgageRadiobutton.click()
            console.log('Clicked on Mortgage radio button')
            await driver.setImplicitWaitTimeout(3000)

            const monthlyMortgage = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
            kycVM.actualMonthlyMortgagePlaceHolder = await monthlyMortgage.text()
            console.log('Actual Mortgage Place Holder ' + kycVM.actualMonthlyMortgagePlaceHolder)
            assert.equal(kycVM.actualMonthlyMortgagePlaceHolder, kycVM.expectedMonthlyMortgagePlaceHolder, 'Mortgage Place Holder verified successfully. ')
        }

        const monthlyRentMortgage = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
        const numberOfDependants = await driver.elementByAccessibilityId(kycAccessibilityId.numberOfDependants)
        assert.equal(await monthlyRentMortgage.isDisplayed() && await numberOfDependants.isDisplayed(), true, 'Monthly Rent/Mortgage field displayed successfully.')

        await driver.setImplicitWaitTimeout(1000)

        await sendKey(driver, monthlyRentMortgage, kycDS.validMonthlyRentMortgage)
        console.log('Entered Monthly Rent ' + kycDS.validMonthlyRentMortgage)

        const monthlyRentMsg = await driver.elementByXPath(kycXPath.monthlyRentMsg)
        kycVM.actualMonthlyRentMortgageMsg = await monthlyRentMsg.text()
        console.log('Actual Monthly Rent Message :' + kycVM.actualMonthlyRentMortgageMsg)
        assert.equal(kycVM.actualMonthlyRentMortgageMsg, kycVM.expectedMonthlyRentMortgageMsg, 'Message verified successfully.')

        const tickMarkformonthlyRent = await driver.elementByAccessibilityId(kycAccessibilityId.tickMarkformonthlyRent)
        assert.equal(await tickMarkformonthlyRent.isDisplayed(), true, 'Tick Mark displayed successfully.')

        await driver.setImplicitWaitTimeout(2000)
        //const numberOfDependants = await driver.elementByAccessibilityId("dependants-testId");
        await sendKey(driver, numberOfDependants, kycDS.validNumberOfDependants)
        console.log('Entered Number of Dependants ' + kycDS.validNumberOfDependants)

        const tickMarkfornumberOfDependants = await driver.elementByAccessibilityId(kycAccessibilityId.tickMarkfornumberOfDependants)
        assert.equal(await tickMarkfornumberOfDependants.isDisplayed(), true, 'Tick Mark displayed successfully.')

        await driver.setImplicitWaitTimeout(2000)
        const nextButtonOnHousingDetails = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
        await nextButtonOnHousingDetails.click()
        console.log('Clicked on Next Button.')
        await driver.setImplicitWaitTimeout(7000)

        const selectEmployer = await driver.elementByAccessibilityId(kycAccessibilityId.selectEmployer)
        assert.equal(await selectEmployer.isDisplayed(), true, 'Select Employer Button displayed successfully.')

        const headerTextOfEmployerDetails = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfEmployerDetails = await headerTextOfEmployerDetails.text()
        console.log('Actual Header : ' + kycVM.actualHeaderTextOfEmployerDetails)
        assert.equal(kycVM.actualHeaderTextOfEmployerDetails, kycVM.expectedHeaderTextOfEmployerDetails, ' Header verified Successfully.')

        await driver.setImplicitWaitTimeout(1000)
        const headerMessageOfEmployerDetails = await driver.elementByAccessibilityId(kycAccessibilityId.headerMessageOfEmployerDetails)
        kycVM.actualHeaderMessage = await headerMessageOfEmployerDetails.text()
        console.log('Actual Header Message : ' + kycVM.actualHeaderMessage)
        assert.equal(kycVM.actualHeaderMessage, kycVM.expectedHeaderMessage, ' Header Message verified Successfully.')

    })

    it('TC_KYC_21 :To verify SELECT EMPLOYER button functionality on Employer Details screen.', async function () {

        await driver.setImplicitWaitTimeout(4000)
        const selectEmployer = await driver.elementByAccessibilityId(kycAccessibilityId.selectEmployer)
        await selectEmployer.click()
        console.log('Clicked on Select Employer.')
        await driver.setImplicitWaitTimeout(1000)

        await driver.waitForElementByAccessibilityId(registerAccessibilityId.headerTitle,15000)
        const headerTextOfSelectWorkAddress = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfSelectWorkAddress = await headerTextOfSelectWorkAddress.text()
        console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfSelectWorkAddress)
        assert.equal(kycVM.actualHeaderTextOfSelectWorkAddress, kycVM.expectedHeaderTextOfSelectWorkAddress, ' Header verified Successfully.')

        const employer = await driver.elementByXPath(kycXPath.employer)

        assert.equal(await employer.isDisplayed(), true, 'User redirected on Select Work Address Screen Successfully.')

    })

    it('TC_KYC_23 :To verify that user is able to select Employer from Employer list of  SELECT WORK ADDRESS Screen.', async function () {

        await driver.setImplicitWaitTimeout(2000)
        const employer = await driver.elementByXPath(kycXPath.employer)
        kycVM.fullEmployerName = await employer.text()
        console.log('Actual Employer Name : ' + kycVM.fullEmployerName)

        var empName = kycVM.fullEmployerName.split('-')
        kycVM.EmployerName = empName[0].trim()
        console.log('Employer Name : ' + kycVM.EmployerName)
        kycVM.EmployeeName1 = empName[1].trim()
        console.log('Employer Name : ' + kycVM.EmployeeName1)

        await employer.click()
        console.log('Employer Selected')
        await driver.setImplicitWaitTimeout(5000)

        const employerName = await driver.elementByXPath(kycXPath.employerName)
        kycVM.empName = await employerName.text()
        console.log('Actual Employer Name : ' + kycVM.empName)
        assert.equal(kycVM.empName, kycVM.EmployerName, 'Employer Name verified successfully.')

    })

    it('TC_KYC_24 :To verify that user is able to select address of selected Employer.', async function () {

        await driver.setImplicitWaitTimeout(2000)
        const address = await driver.elementByXPath(kycXPath.address)
        kycVM.fullAddress = await address.text()
        console.log('Actual Address selected: ' + kycVM.fullAddress)
        var addressText = kycVM.fullAddress.split(',')
        kycVM.buildingName = addressText[0].trim()
        kycVM.laneName = addressText[1].trim()
        kycVM.city = addressText[2].trim()
        kycVM.country = addressText[3].trim()

        await address.click()
        console.log('Address Selected')
        await driver.setImplicitWaitTimeout(2000)

        const headerTextOfEmployerDetails = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfEmployerDetails = await headerTextOfEmployerDetails.text()
        console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfEmployerDetails)
        assert.equal(kycVM.actualHeaderTextOfEmployerDetails, kycVM.expectedHeaderTextOfEmployerDetails, ' Header verified Successfully.')

        const headerMessage = await driver.elementByAccessibilityId(kycAccessibilityId.headerMessageOfEmployerDetails)
        kycVM.actualHeaderMessage = await headerMessage.text()
        console.log('Actual Header Message : ' + kycVM.actualHeaderMessage)
        assert.equal(kycVM.actualHeaderMessage, kycVM.expectedHeaderMessage, ' Header Message verified Successfully.')

        const employerName = await driver.elementByXPath(kycXPath.employerName1)
        kycVM.actualEmployerName = await employerName.text()
        console.log('Actual Employer Name : ' + kycVM.actualEmployerName)
        assert.equal(kycVM.actualEmployerName, kycVM.EmployerName, 'Employer Name verified Successfully.')

        const buildingName = await driver.elementByXPath(kycXPath.buildingName)
        kycVM.actualBuildingName = await buildingName.text()
        console.log('Actual Building Name : ' + kycVM.actualBuildingName)
        assert.equal(kycVM.actualBuildingName, kycVM.buildingName, 'Building Name verified Successfully.')

        const cityName = await driver.elementByAccessibilityId(kycAccessibilityId.cityName)
        kycVM.actualCityName = await cityName.text()
        console.log('Actual City Name : ' + kycVM.actualCityName)
        assert.equal(kycVM.actualCityName, kycVM.city, 'City Name verified Successfully.')

        const countryName = await driver.elementByAccessibilityId(kycAccessibilityId.countryName)
        kycVM.actualCountryName = await countryName.text()
        console.log('Actual City Name : ' + kycVM.actualCountryName)
        assert.equal(kycVM.actualCountryName, kycVM.country, 'Country Name verified Successfully.')

        const changeEmployee = await driver.elementByAccessibilityId(kycAccessibilityId.changeEmployee)
        const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
        const nextButtonOnHousingDetails = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)

        assert.equal(await changeEmployee.isDisplayed() && await backButton.isDisplayed() && await nextButtonOnHousingDetails.isDisplayed(), true, 'User redirected successfully on Employer Details page')

    })

    it('TC_KYC_28 :To Verify Next  button functionality of Employer Details Screen.', async function () {

        const nextButtonOnEmployerDetails = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
        await nextButtonOnEmployerDetails.click()
        console.log('Clicked on Next Button.')

        await driver.setImplicitWaitTimeout(5000)

        const IDCardImage = await driver.elementByXPath(kycXPath.IDCardImage)
        const IDCardText2 = await driver.elementByXPath(kycXPath.IDCardText2)
        const IDCardText3 = await driver.elementByXPath(kycXPath.IDCardText3)
        const letsStartButton = await driver.elementByAccessibilityId(kycAccessibilityId.letsStartButton)
        assert.equal(await IDCardImage.isDisplayed() && await IDCardText2.isDisplayed() && await IDCardText3.isDisplayed() && await letsStartButton.isDisplayed(), true, 'All element displayed Successfully.')

        const IDCardText = await driver.elementByXPath(kycXPath.IDCardText)
        kycVM.actualIDCardText = await IDCardText.text()
        console.log('Actual ID Card Text  : ' + kycVM.actualIDCardText)
        assert.equal(kycVM.actualIDCardText, kycVM.expectedIDCardText, ' ID MADE SIMPLE text displayed Successfully.')

        const stepText = await driver.elementByXPath(kycXPath.stepText)
        kycVM.actualStepText = await stepText.text()
        console.log('Actual Header Text : ' + kycVM.actualStepText)
        assert.equal(kycVM.actualStepText, kycVM.expectedStepText, ' Step 3 of 4: Quick ID check verified Successfully.')

        const headerTextOfVerifyYourIdentity = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfVerifyYourIdentity = await headerTextOfVerifyYourIdentity.text()
        console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfVerifyYourIdentity)
        assert.equal(kycVM.actualHeaderTextOfVerifyYourIdentity, kycVM.expectedHeaderTextOfVerifyYourIdentity, ' header verified Successfully.')

    })

    it('TC_KYC_29 :To Verify LETS START button functionality of VERIFY YOUR IDENTITY Screen 1.', async function () {

        await driver.setImplicitWaitTimeout(1000)
        const letsStartButton = await driver.elementByAccessibilityId(kycAccessibilityId.letsStartButton)
        await letsStartButton.click()
        console.log('Clicked on lets Start Button.')
        await driver.setImplicitWaitTimeout(3000)

        const headerTextOfVerifyYourIdentity = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfVerifyYourIdentity = await headerTextOfVerifyYourIdentity.text()
        console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfVerifyYourIdentity)
        assert.equal(kycVM.actualHeaderTextOfVerifyYourIdentity, kycVM.expectedHeaderTextOfVerifyYourIdentity, ' header verified Successfully.')

        const IDCardImageOfVerifyYourIdentity = await driver.elementByXPath(kycXPath.IDCardImageOfVerifyYourIdentity)

        const IDCardText1OfVerifyYourIdentity = await driver.elementByXPath(kycXPath.IDCardText1OfVerifyYourIdentity)
        kycVM.IDCardText1 = await IDCardText1OfVerifyYourIdentity.text()
        console.log('ID Card Text 1: ' + kycVM.IDCardText1)

        const IDCardText2OfVerifyYourIdentity = await driver.elementByXPath(kycXPath.IDCardText2OfVerifyYourIdentity)
        kycVM.IDCardText2 = await IDCardText2OfVerifyYourIdentity.text()
        console.log('ID Card Text 2: ' + kycVM.IDCardText2)

        const takeaPicture = await driver.elementByAccessibilityId(registerAccessibilityId.takeaselfie)

        assert.equal(await IDCardImageOfVerifyYourIdentity.isDisplayed() && await takeaPicture.isDisplayed(), true, 'User is successfully redirected to VERIFY YOUR IDENTITY Screen 1. ')

    })

    it('TC_KYC_31 :To Verify "TAKE A PICTURE" button functionality of VERIFY YOUR IDENTITY Screen 2.', async function () {

        await driver.setImplicitWaitTimeout(3000)
        const takeaPicture = await driver.elementByAccessibilityId(registerAccessibilityId.takeaselfie)
        await takeaPicture.click()
        console.log('Clicked on Take a Picture button.')
        await driver.setImplicitWaitTimeout(3000)

        const headerTextOfVerifyYourIdentity = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfVerifyYourIdentity = await headerTextOfVerifyYourIdentity.text()
        console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfVerifyYourIdentity)
        assert.equal(kycVM.actualHeaderTextOfVerifyYourIdentity, kycVM.expectedHeaderTextOfVerifyYourIdentity, ' header verified Successfully.')

        const takeaPictureText = await driver.elementByXPath(kycXPath.takeaPictureText)
        kycVM.takeaPictureText = await takeaPictureText.text()
        console.log('Take a Picture Text :' + kycVM.takeaPictureText)

        const captureButton = await driver.elementByAccessibilityId(registerAccessibilityId.capture)
        const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
        assert.equal(await takeaPictureText.isDisplayed() && await backButton.isDisplayed() && await captureButton.isDisplayed(), true, 'User is redirected to Verify your Identity Screen.')
    })

    it('TC_KYC_33 : To Verify "Capture"  button functionality of VERIFY YOUR IDENTITY Screen 3.', async function () {

        await driver.setImplicitWaitTimeout(1000)
        const captureButton = await driver.elementByAccessibilityId(registerAccessibilityId.capture)
        await captureButton.click()
        await driver.setImplicitWaitTimeout(20000)
        console.log('Clicked on Capture Button')

        const headerTextOfVerifyYourIdentity = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfVerifyYourIdentity = await headerTextOfVerifyYourIdentity.text()
        console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfVerifyYourIdentity)
        assert.equal(kycVM.actualHeaderTextOfVerifyYourIdentity, kycVM.expectedHeaderTextOfVerifyYourIdentity, ' header verified Successfully.')

        const sayKarmaText = await driver.elementByXPath(kycXPath.sayKarmaText)
        const sayKarmaText1 = await driver.elementByXPath(kycXPath.sayKarmaText1)
        const recordVideo = await driver.elementByAccessibilityId(kycAccessibilityId.recordVideo)

        assert.equal(await sayKarmaText.isDisplayed() && await sayKarmaText1.isDisplayed() && await recordVideo.isDisplayed(), true, 'User is redirected to verify your identity screen successfully.')

        await driver.setImplicitWaitTimeout(3000)
    })

    it('TC_KYC_34 :To Verify "RECORD VIDEO" button functionality of VERIFY YOUR IDENTITY Screen 4.', async function () {

        await driver.setImplicitWaitTimeout(3000)
        const recordVideo = await driver.elementByAccessibilityId(kycAccessibilityId.recordVideo)
        await recordVideo.click()
        console.log('Clicked on Record Video Button.')
        await driver.setImplicitWaitTimeout(5000)

        const headerTextOfVerifyYourIdentity = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfVerifyYourIdentity = await headerTextOfVerifyYourIdentity.text()
        console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfVerifyYourIdentity)
        assert.equal(kycVM.actualHeaderTextOfVerifyYourIdentity, kycVM.expectedHeaderTextOfVerifyYourIdentity, ' header verified Successfully.')

        const captureVideoText = await driver.elementByXPath(kycXPath.captureVideoText)
        const captureVideo = await driver.elementByAccessibilityId(kycAccessibilityId.captureVideo)

        assert.equal(await captureVideoText.isDisplayed() && await captureVideo.isDisplayed(), true, 'User is redirected to verify your identity screen successfully')
    })

    it('TC_KYC_35 :To Verify "Audio/Video Capture" button functionality of VERIFY YOUR IDENTITY screen.', async function () {

        const captureVideo = await driver.elementByAccessibilityId(kycAccessibilityId.captureVideo)
        await captureVideo.click()
        console.log('Clicked on Audio/Video capture button.')
        await driver.setImplicitWaitTimeout(15000)

        const retakeButton = await driver.elementByXPath(kycXPath.retakeButton)
        const nextButton = await driver.elementByXPath(kycXPath.nextButton)
        const replayVideoButton = await driver.elementByAccessibilityId(kycAccessibilityId.replayVideoButton)

        assert.equal(await retakeButton.isDisplayed() && await nextButton.isDisplayed() && await replayVideoButton.isDisplayed(), true, 'All elements displayed successfully.')
    })

    it('TC_KYC_37 :To Verify  user is able to tap on "Play" button after capturing video.', async function () {

        await driver.setImplicitWaitTimeout(3000)
        const replayVideoButton = await driver.elementByAccessibilityId(kycAccessibilityId.replayVideoButton)
        await replayVideoButton.click()
        console.log('Clicked on Play Video button.')
        await driver.setImplicitWaitTimeout(5000)
    })

    it('TC_KYC_38 :To Verify  user is able to tap on "Pause" button after capturing video.', async function () {

        await driver.setImplicitWaitTimeout(1000)
        const replayVideoButton = await driver.elementByAccessibilityId(kycAccessibilityId.replayVideoButton)
        await replayVideoButton.click()
        console.log('Clicked on Pause Video button.')
        await driver.setImplicitWaitTimeout(4000)
    })

    it('TC_KYC_40 :To Verify "NEXT" button functionality of VERIFY YOUR IDENTITY screen.', async function () {

        const nextButton = await driver.elementByXPath(kycXPath.nextButton)
        await nextButton.click()
        console.log('Clicked on NEXT Button.')
        await driver.waitForElementByAccessibilityId(registerAccessibilityId.done, 30000)
        await driver.setImplicitWaitTimeout(3000)

        const congratulationText = await driver.elementByXPath(kycXPath.congratulationText)
        kycVM.actualCongratulationText = await congratulationText.text()
        console.log('Actual Congratulation Text :' + kycVM.actualCongratulationText)
        assert.equal(kycVM.actualCongratulationText, kycVM.expectedCongratulationText, 'Congratulation text displayed successfully.')

        const approvedText = await driver.elementByXPath(kycXPath.approvedText)
        kycVM.actualApprovedText = await approvedText.text()
        console.log('Actual Congratulation Text :' + kycVM.actualApprovedText)
        assert.equal(kycVM.actualApprovedText, kycVM.expectedApprovedText, 'Your credit limit is approved text displayed successfully.')

        const headerTextOfEnjoy = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
        kycVM.actualHeaderTextOfEnjoy = await headerTextOfEnjoy.text()
        console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfEnjoy)
        assert.equal(kycVM.actualHeaderTextOfEnjoy, kycVM.expectedHeaderTextOfEnjoy, ' Header verified Successfully.')

        const doneButton = await driver.elementByAccessibilityId(registerAccessibilityId.done)
        assert.equal(await doneButton.isDisplayed(), true, 'Done Button displayed Successfully.')

    })

}

export {
    kyc
}