import wd from 'wd'
import chai from 'chai'
import {bsCred, configuration} from '../helpers/config'
import {currentTime, kycDS, networkSet} from '../helpers/data'
import {applycardVM, kycVM} from '../helpers/common/validationmessage'
import {newRegister} from '../helpers/common/newRegister'
import {registerAccessibilityId} from '../helpers/common/androidiOSElements/registration'
import {loginAccessibilityId, loginXPath} from '../helpers/common/androidiOSElements/login'
import {applyCardAccessibilityId, applyCardXPath} from '../helpers/common/androidiOSElements/homePage'
import {kycAccessibilityId, kycXPath} from '../helpers/common/androidiOSElements/kyc'
import {sendKey} from '../helpers/common/sendKeys'

const {assert} = chai
let request = require('request')
let ssid

let test_status
const FAILED_TESTS = {}

let driver
if (configuration.driverType == 'local') {
    driver = wd.promiseChainRemote({host: '0.0.0.0', port: '4723'})  // for running in local
} else {
    driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub') // for browserstack
}

let testName = 'TC_Auto_AC_03 : To verify Back icon functionality and Validation check for Apply Card functionality for KYC Not_Completed user.'

async function applycardmodule3(DeviceName, PlatformVersion, buildName) {

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
            /*it('...DONE...', function(done) {
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
            console.log('...Device Name----->' + DeviceName);
            console.log('...Platform..--->' + PlatformVersion);

            await driver.init(Object.assign(configuration.runOn, {
                name: testName,
                build: buildName,
                device: DeviceName,
                deviceName: DeviceName,
                networkProfile: networkSet.highInternet,
                platformVersion: PlatformVersion
            }))
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

            const headerText = await driver.elementByXPath(applyCardXPath.headerText)
            applycardVM.actualHeaderTextOnIncomeDetailsScreen = await headerText.text()
            console.log('Actual Header Message: ' + applycardVM.actualHeaderTextOnIncomeDetailsScreen)

            const monthlyIncome = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyIncome)
            const nextButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            const backButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            assert.equal(await headerText.isDisplayed() && await monthlyIncome.isDisplayed() && await nextButtonOnIncomeDetailsScreen.isDisplayed() && await backButtonOnIncomeDetailsScreen.isDisplayed(), true, 'All elements displayed successfully.')

            console.log('Monthly Income text field, Next Button, Back Button is displayed successfully.')
        })

        it('TC_KYC_06 : To verify Back button functionality from Monthly income screen.', async function () {

            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')
            await driver.setImplicitWaitTimeout(3000)

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

            // assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await sports.isDisplayed() && await clothing.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            await driver.setImplicitWaitTimeout(2000)

            await applyCard0.click()
            console.log('Clicked on APPLY CARD \'+\' button.')

        })

        it('TC_KYC_05 : To verify Monthly income field functionality  with Invalid input.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const monthlyIncome = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyIncome)

            await sendKey(driver, monthlyIncome, kycDS.invalidMonthlyIncome)
            console.log('Entered Monthly Income : ' + kycDS.invalidMonthlyIncome)

            await driver.setImplicitWaitTimeout(2000)
            const monthlyIncomeErrorMsg = await driver.elementByAccessibilityId(applyCardAccessibilityId.monthlyIncomeErrorMsg)
            applycardVM.actualMonthlyIncomeErrorMsg = await monthlyIncomeErrorMsg.text()
            console.log('Actual Monthly Income Error Message :' + applycardVM.actualMonthlyIncomeErrorMsg)
            assert.equal(applycardVM.actualMonthlyIncomeErrorMsg, applycardVM.expectedMonthlyIncomeErrorMsg, 'Error Message verified successfully.')

        })

        it('TC_KYC_02_03_04 : To verify Monthly income field functionality  with valid input.', async function () {

            await driver.setImplicitWaitTimeout(3000)
            const monthlyIncome = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyIncome)
            await monthlyIncome.clear()
            await sendKey(driver, monthlyIncome, kycDS.validMonthlyIncome)
            console.log('Entered monthly Income : ' + kycDS.validMonthlyIncome)

            await driver.setImplicitWaitTimeout(2000)
            const monthlyIncomeMsg = await driver.elementByAccessibilityId(applyCardAccessibilityId.monthlyIncomeMsg)
            applycardVM.actualMonthlyIncomeMsg = await monthlyIncomeMsg.text()
            console.log('Actual Monthly Rent Message :' + applycardVM.actualMonthlyIncomeMsg)
            assert.equal(applycardVM.actualMonthlyIncomeMsg, kycVM.expectedMonthlyIncomeMsg, 'Message verified successfully.')

            const tickMark = await driver.elementByAccessibilityId(applyCardAccessibilityId.tickMark)
            const nextButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            assert.equal(await tickMark.isDisplayed() && await nextButtonOnIncomeDetailsScreen.isDisplayed(), true, 'Tick Mark and Next Button enable successfully.')

        })

        it('TC_KYC_07 :To verify NEXT button functionality of  Income Details screen.', async function () {

            const nextButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            await nextButtonOnIncomeDetailsScreen.click()
            console.log('Clicked on Next Button.')
            await driver.setImplicitWaitTimeout(5000)

            const headerTextOfHousingDetails = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            kycVM.actualHeaderTextOfHousingDetails = await headerTextOfHousingDetails.text()
            console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfHousingDetails)
            assert.equal(kycVM.actualHeaderTextOfHousingDetails, kycVM.expectedHeaderTextOfHousingDetails, 'Housing Details Screen header verified Successfully.')

            const headerMessage = await driver.elementByXPath(applyCardXPath.headerMessage)
            applycardVM.HeaderMessage = await headerMessage.text()
            console.log('Actual Header Message : ' + applycardVM.HeaderMessage)

            const monthlyRent = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
            const numberOfDependants = await driver.elementByAccessibilityId(kycAccessibilityId.numberOfDependants)
            const nextButtonOnHousingDetails = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            const mortgageRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.mortgageRadiobutton)
            const rentRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.rentRadiobutton)

            assert.equal(await rentRadiobutton.isDisplayed() && await mortgageRadiobutton.isDisplayed() && await headerMessage.isDisplayed() && await monthlyRent.isDisplayed() && await numberOfDependants.isDisplayed() && await nextButtonOnHousingDetails.isDisplayed(), true, 'All element displayed Successfully.')
            console.log(' Header Message, Monthly Rent text field, Number Of Dependants text field, Next Button displayed successfully On Housing Details Screen ')

        })

        it('TC_KYC_13 : To verify BACK button functionality on Housing Details screen after entering valid details.', async function () {

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
                await driver.setImplicitWaitTimeout(2000)

                const monthlyMortgage = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
                kycVM.actualMonthlyMortgagePlaceHolder = await monthlyMortgage.text()
                console.log('Actual Mortgage Place Holder ' + kycVM.actualMonthlyMortgagePlaceHolder)
                assert.equal(kycVM.actualMonthlyMortgagePlaceHolder, kycVM.expectedMonthlyMortgagePlaceHolder, 'Mortgage Place Holder verified successfully. ')
            }

            const monthlyRentMortgage = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
            const numberOfDependants = await driver.elementByAccessibilityId(kycAccessibilityId.numberOfDependants)
            assert.equal(await monthlyRentMortgage.isDisplayed() && await numberOfDependants.isDisplayed(), true, 'Monthly Rent/Mortgage field displayed successfully.')

            await driver.setImplicitWaitTimeout(1000)

            //await monthlyRentMortgage.sendKeys(kycDS.validMonthlyRentMortgage)
            await sendKey(driver, monthlyRentMortgage, kycDS.validMonthlyRentMortgage)
            console.log('Entered Monthly Rent ' + kycDS.validMonthlyRentMortgage)

            await driver.setImplicitWaitTimeout(2000)
            //await numberOfDependants.sendKeys(kycDS.validNumberOfDependants)
            await sendKey(driver, numberOfDependants, kycDS.validNumberOfDependants)
            console.log('Entered Number of Dependants ' + kycDS.validNumberOfDependants)

            await driver.setImplicitWaitTimeout(2000)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')
            await driver.setImplicitWaitTimeout(3000)

            const headerTitle = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            applycardVM.actualIncomeDetailScreenHeaderTitle = await headerTitle.text()
            console.log('Actual Header Title: ' + applycardVM.actualIncomeDetailScreenHeaderTitle)
            assert.equal(await headerTitle.isDisplayed(), true, 'Header is display successfully')

            const headerText = await driver.elementByXPath(applyCardXPath.headerText)
            applycardVM.actualHeaderTextOnIncomeDetailsScreen = await headerText.text()
            console.log('Actual Header Message: ' + applycardVM.actualHeaderTextOnIncomeDetailsScreen)

            const monthlyIncome = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyIncome)
            applycardVM.actualmonthlyIncome = await monthlyIncome.text()
            console.log('Actual Monthly Rent :' + applycardVM.actualmonthlyIncome)
            assert.equal(applycardVM.actualmonthlyIncome, kycDS.validMonthlyIncome, 'Monthly Income verified successfully.')

            const nextButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            const backButtonOnIncomeDetailsScreen = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            assert.equal(await headerText.isDisplayed() && await monthlyIncome.isDisplayed() && await nextButtonOnIncomeDetailsScreen.isDisplayed() && await backButtonOnIncomeDetailsScreen.isDisplayed(), true, 'All elements displayed successfully.')

            console.log('Monthly Income text field, Next Button, Back Button is displayed successfully.')

            await nextButtonOnIncomeDetailsScreen.click()
            console.log('Clicked on Next Button.')
            await driver.setImplicitWaitTimeout(5000)

        })

        it('TC_KYC_10 : To verify Monthly Rent field functionality with Invalid data on Housing Details screen.', async function () {

            await driver.setImplicitWaitTimeout(2000)
            const monthlyRent = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
            await sendKey(driver, monthlyRent, kycDS.invalidMonthlyRent)
            console.log('Entered monthly Income : ' + kycDS.invalidMonthlyRent)

            await driver.setImplicitWaitTimeout(3000)
            const monthlyRentErrorMsg = await driver.elementByAccessibilityId(applyCardAccessibilityId.monthlyRentErrorMsg)
            applycardVM.actualMonthlyRentError = await monthlyRentErrorMsg.text()
            console.log('Actual Monthly Rent Message :' + applycardVM.actualMonthlyRentError)
            assert.equal(applycardVM.actualMonthlyRentError, applycardVM.expectedMonthlyRentError, 'Error Message verified successfully.')
            await driver.setImplicitWaitTimeout(2000)

        })

        it('TC_KYC_08_09_11_12_14 : To verify NEXT button functionality on Housing Details screen after entering valid details for rent radio button.', async function () {

            await driver.setImplicitWaitTimeout(4000)
            if (kycDS.housingDetail == 'rent') {
                const rentRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.rentRadiobutton)
                await rentRadiobutton.click()
                console.log('Clicked on Rent radio button')
                await driver.setImplicitWaitTimeout(2000)

            } else {
                const mortgageRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.mortgageRadiobutton)
                await mortgageRadiobutton.click()
                console.log('Clicked on Mortgage radio button')
                await driver.setImplicitWaitTimeout(2000)

            }
            const monthlyRentMortgage = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
            const numberOfDependants = await driver.elementByAccessibilityId(kycAccessibilityId.numberOfDependants)
            assert.equal(await monthlyRentMortgage.isDisplayed() && await numberOfDependants.isDisplayed(), true, 'Monthly Rent/Mortgage field displayed successfully.')

            await driver.setImplicitWaitTimeout(1000)
            await sendKey(driver, monthlyRentMortgage, kycDS.validMonthlyRentMortgage)
            console.log('Entered Monthly Rent ' + kycDS.validMonthlyRentMortgage)

            const monthlyRentMsg = await driver.elementByAccessibilityId(applyCardAccessibilityId.monthlyRentMsg)
            kycVM.actualMonthlyRentMortgageMsg = await monthlyRentMsg.text()
            console.log('Actual Monthly Rent Message :' + kycVM.actualMonthlyRentMortgageMsg)
            assert.equal(kycVM.actualMonthlyRentMortgageMsg, kycVM.expectedMonthlyRentMortgageMsg, 'Message verified successfully.')

            const tickMarkformonthlyRent = await driver.elementByAccessibilityId(applyCardAccessibilityId.tickMarkformonthlyRent)
            assert.equal(await tickMarkformonthlyRent.isDisplayed(), true, 'Tick Mark displayed successfully.')

            await driver.setImplicitWaitTimeout(2000)
            await sendKey(driver, numberOfDependants, kycDS.validNumberOfDependants)
            console.log('Entered Number of Dependants ' + kycDS.validNumberOfDependants)

            const tickMarkfornumberOfDependants = await driver.elementByAccessibilityId(applyCardAccessibilityId.tickMarkfornumberOfDependants)
            assert.equal(await tickMarkfornumberOfDependants.isDisplayed(), true, 'Tick Mark displayed successfully.')

            await driver.setImplicitWaitTimeout(2000)
            const nextButtonOnHousingDetails = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            await nextButtonOnHousingDetails.click()
            console.log('Clicked on Next Button.')
            await driver.setImplicitWaitTimeout(2000)

            const selectEmployer = await driver.elementByAccessibilityId(kycAccessibilityId.selectEmployer)
            assert.equal(await selectEmployer.isDisplayed(), true, 'Select Employer Button displayed successfully.')

            const headerTextOfEmployerDetails = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            kycVM.actualHeaderTextOfEmployerDetails = await headerTextOfEmployerDetails.text()
            console.log('Actual Header : ' + kycVM.actualHeaderTextOfEmployerDetails)
            assert.equal(kycVM.actualHeaderTextOfEmployerDetails, kycVM.expectedHeaderTextOfEmployerDetails, ' Header verified Successfully.')

            const headerMessage = await driver.elementByAccessibilityId(applyCardAccessibilityId.headerMessage1)
            kycVM.actualHeaderMessage = await headerMessage.text()
            console.log('Actual Header Message : ' + kycVM.actualHeaderMessage)
            assert.equal(kycVM.actualHeaderMessage, kycVM.expectedHeaderMessage, ' Header Message verified Successfully.')

        })

        it('TC_KYC_20 : To verify BACK button functionality on Employer Details screen.', async function () {

            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')
            await driver.setImplicitWaitTimeout(3000)

            const headerTextOfHousingDetails = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            kycVM.actualHeaderTextOfHousingDetails = await headerTextOfHousingDetails.text()
            console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfHousingDetails)
            assert.equal(kycVM.actualHeaderTextOfHousingDetails, kycVM.expectedHeaderTextOfHousingDetails, 'Housing Details Screen header verified Successfully.')

            const headerMessage = await driver.elementByXPath(kycXPath.headerMessage)
            kycVM.HeaderMessage = await headerMessage.text()
            console.log('Actual Header Message : ' + kycVM.HeaderMessage)

            const monthlyRent = await driver.elementByAccessibilityId(kycAccessibilityId.monthlyRent)
            applycardVM.actualMontlyRent = await monthlyRent.text()
            console.log('Actual Monthly Rent :' + applycardVM.actualMontlyRent)
            assert.equal(applycardVM.actualMontlyRent, kycDS.validMonthlyRentMortgage, 'Monthly Rent verified successfully.')

            const numberOfDependants = await driver.elementByAccessibilityId(kycAccessibilityId.numberOfDependants)
            applycardVM.actualnumberOfDependants = await numberOfDependants.text()
            console.log('Actual Number of Dependants :' + applycardVM.actualnumberOfDependants)
            assert.equal(applycardVM.actualnumberOfDependants, kycDS.validNumberOfDependants, 'Number of Dependants verified successfully.')

            const nextButtonOnHousingDetails = await driver.elementByAccessibilityId(registerAccessibilityId.nextButton)
            const mortgageRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.mortgageRadiobutton)
            const rentRadiobutton = await driver.elementByAccessibilityId(kycAccessibilityId.rentRadiobutton)

            assert.equal(await rentRadiobutton.isDisplayed() && await mortgageRadiobutton.isDisplayed() && await headerMessage.isDisplayed() && await monthlyRent.isDisplayed() && await numberOfDependants.isDisplayed() && await nextButtonOnHousingDetails.isDisplayed(), true, 'All element displayed Successfully.')
            console.log(' Header Message, Monthly Rent text field, Number Of Dependants text field, Next Button displayed successfully On Housing Details Screen ')

            await nextButtonOnHousingDetails.click()
            console.log('Clicked on Next Button')
            await driver.setImplicitWaitTimeout(3000)

            const selectEmployer = await driver.elementByAccessibilityId(kycAccessibilityId.selectEmployer)
            await selectEmployer.click()
            await driver.setImplicitWaitTimeout(3000)
            console.log('Clicked on Select Employer Button')

        })

        it('TC_KYC_23 : To verify that user is able to select Employer from Employer list of  SELECT WORK ADDRESS Screen.', async function () {

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
            await driver.setImplicitWaitTimeout(3000)

            const employerName = await driver.elementByXPath(kycXPath.employerName)
            kycVM.empName = await employerName.text()
            console.log('Actual Employer Name : ' + kycVM.empName)
            assert.equal(kycVM.empName, kycVM.EmployerName, 'Employer Name verified successfully.')

        })

        it('TC_KYC_24 : To verify that user is able to select address of selected Employer.', async function () {

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

        it('TC_KYC_27 : To verify CHANGE EMPLOYER button functionality on Employer Details screen.', async function () {

            const changeEmployer = await driver.elementByAccessibilityId(applyCardAccessibilityId.changeEmployer)
            await changeEmployer.click()
            console.log('Clicked on Change Employer button')
            await driver.setImplicitWaitTimeout(3000)
        })

        it('TC_KYC_23 : To verify that user is able to select Employer from Employer list of  SELECT WORK ADDRESS Screen.', async function () {

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
            await driver.setImplicitWaitTimeout(3000)

            const employerName = await driver.elementByXPath(kycXPath.employerName)
            kycVM.empName = await employerName.text()
            console.log('Actual Employer Name : ' + kycVM.empName)
            assert.equal(kycVM.empName, kycVM.EmployerName, 'Employer Name verified successfully.')

        })

        it('TC_KYC_24 : To verify that user is able to select address of selected Employer.', async function () {

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

        it('TC_KYC_28 : To Verify Next  button functionality of Employer Details Screen.', async function () {

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

        it('TC_KYC_29 : To Verify LETS START button functionality of VERIFY YOUR IDENTITY Screen 1.', async function () {

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

        it('TC_KYC_30 : To verify BACK button functionality on VERIFY YOUR IDENTITY screen.2', async function () {

            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')
            await driver.setImplicitWaitTimeout(3000)

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

            await letsStartButton.click()
            console.log('Clicked on lets Start Button.')
            await driver.setImplicitWaitTimeout(3000)

        })

        it('TC_KYC_31 : To Verify "TAKE A PICTURE" button functionality of VERIFY YOUR IDENTITY Screen 2.', async function () {

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

        it('TC_KYC_32 : To verify BACK button functionality on VERIFY YOUR IDENTITY screen3.', async function () {

            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')
            await driver.setImplicitWaitTimeout(3000)

            const headerTextOfVerifyYourIdentity = await driver.elementByAccessibilityId(registerAccessibilityId.headerTitle)
            kycVM.actualHeaderTextOfVerifyYourIdentity = await headerTextOfVerifyYourIdentity.text()
            console.log('Actual Header Text : ' + kycVM.actualHeaderTextOfVerifyYourIdentity)
            assert.equal(kycVM.actualHeaderTextOfVerifyYourIdentity, kycVM.expectedHeaderTextOfVerifyYourIdentity, ' header verified Successfully.')

            const takeaPicture1 = await driver.elementByAccessibilityId(registerAccessibilityId.takeaselfie)
            await takeaPicture1.click()
            console.log('Clicked on take a picture button')
            await driver.setImplicitWaitTimeout(3000)
        })

        it('TC_KYC_33 : To Verify "Capture"  button functionality of VERIFY YOUR IDENTITY Screen 3.', async function () {

            await driver.setImplicitWaitTimeout(1000)
            const captureButton = await driver.elementByAccessibilityId(registerAccessibilityId.capture)
            await captureButton.click()
            await driver.setImplicitWaitTimeout(15000)
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

        it('TC_KYC_36 : To verify BACK button functionality on VERIFY YOUR IDENTITY screen4.', async function () {

            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            await backButton.click()
            console.log('Clicked on Back button')
            await driver.setImplicitWaitTimeout(5000)

            const captureButton = await driver.elementByAccessibilityId(registerAccessibilityId.capture)
            await captureButton.click()
            await driver.setImplicitWaitTimeout(10000)
            console.log('Clicked on Capture Button')
        })

        it('TC_KYC_34 :To Verify "RECORD VIDEO" button functionality of VERIFY YOUR IDENTITY Screen 4.', async function () {

            await driver.setImplicitWaitTimeout(15000)
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

        it('TC_KYC_37 :To Verify  user is able to tap on "Capture " button  while 10 seconds of counter is running..', async function () {

            const captureVideo = await driver.elementByAccessibilityId(kycAccessibilityId.captureVideo)
            await captureVideo.click()
            console.log('Clicked on Record Video Button.')
            await driver.setImplicitWaitTimeout(7000)

            await captureVideo.click()
            console.log('Clicked on Record Video Button.')
            await driver.setImplicitWaitTimeout(7000)

        })

        it('TC_KYC_39 :To Verify "RETAKE" button functionality of VERIFY YOUR IDENTITY screen.', async function () {

            await driver.setImplicitWaitTimeout(1000)
            const retakeButton = await driver.elementByXPath(kycXPath.retakeButton)
            await retakeButton.click()
            console.log('Clicked on RETAKE button.')

            await driver.setImplicitWaitTimeout(10000)
            const captureVideo = await driver.elementByAccessibilityId(kycAccessibilityId.captureVideo)
            await captureVideo.click()
            console.log('Clicked on Audio/Video capture button. ')
            await driver.sleep(6000)
            await captureVideo.click()
            console.log('Clicked on Audio/Video capture button after 5 seconds.')
            await driver.setImplicitWaitTimeout(3000)

            const nextButton = await driver.elementByXPath(kycXPath.nextButton)
            const replayVideoButton = await driver.elementByAccessibilityId(kycAccessibilityId.replayVideoButton)
            const retakeButton1 = await driver.elementByXPath(kycXPath.retakeButton)

            assert.equal(await retakeButton1.isDisplayed() && await nextButton.isDisplayed() && await replayVideoButton.isDisplayed(), true, 'All elements displayed successfully.')

        })

        it('TC_KYC_40 :To Verify "NEXT" button functionality of VERIFY YOUR IDENTITY screen.', async function () {

            const nextButton = await driver.elementByXPath(kycXPath.nextButton)
            await nextButton.click()
            console.log('Clicked on NEXT Button.')
            await driver.setImplicitWaitTimeout(28000)

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

            //const logo = await driver.elementByAccessibilityId(applyCardAccessibilityId.logo)
            const addToCard = await driver.elementByAccessibilityId(applyCardAccessibilityId.addToCard)
            const amountSliderBar = await driver.elementByAccessibilityId(applyCardAccessibilityId.amountSliderBar)
            const backButton = await driver.elementByAccessibilityId(registerAccessibilityId.backButton)
            //await logo.isDisplayed() &&
            assert.equal(await addToCard.isDisplayed() && await amountSliderBar.isDisplayed() && await backButton.isDisplayed(), true, 'User is successfully redirected to ADD A CARD Screen.')

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

            await driver.setImplicitWaitTimeout(3000)
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

            //assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await sports.isDisplayed() && await clothing.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, 'all elements displayed successfully on apply screen.')
            await driver.setImplicitWaitTimeout(2000)
        })

        it('TC_AC_011 : To Verify the status of the card.', async function () {

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

    })
}

module.exports = applycardmodule3