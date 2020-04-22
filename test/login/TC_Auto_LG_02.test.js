import { configuration, setTestName } from '../helpers/config';
import {loginDS1} from '../helpers/data';
import wd from 'wd';
const assert = require('chai').assert;

let testName2 = 'TC_Auto_LG_02: To verify reset functionality ';

// var driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');
var driver = wd.promiseChainRemote({
    host: '127.0.0.1',
    port: 4723
});

describe(testName2, () => {
    var allPassed = true;
    var countryText;

    before(async function () {
        setTestName("Login", testName2);
        return driver.init(configuration.runOn);
    });

    afterEach(function () {
        // keep track of whether all the tests have passed, since mocha does not do this
        allPassed = allPassed && (this.currentTest.state === 'passed');
    });

    after(function () {
        return driver.quit();
    });

    it('TC_LG_17: To verify reset link functionality.', async function () {

        await driver.setImplicitWaitTimeout(10000);
        // To check whether Main Acitivity Loaded
        assert.equal(await driver.hasElementByAccessibilityId("loginBtn-testId") && await driver.hasElementByAccessibilityId("registerBtn-testId"), true, "Application launch failed.");

        const loginBtn = await driver.elementByAccessibilityId("loginBtn-testId");
        await loginBtn.click();
        const resetButton = await driver.waitForElementByAccessibilityId("resetLink-testId");
        await resetButton.click();
        driver.setImplicitWaitTimeout(3000);
        assert.equal(await driver.hasElementByAccessibilityId('nextBtn-testId'), true, "Could not display reset page");
    });

    it('TC_LG_18: To verify details on PASSWORD RESET screen.', async function () {
        assert.equal(await driver.hasElementByAccessibilityId('phone-testId'), true, "Could not display reset page");
        assert.equal(await driver.hasElementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup'), true, "Could not display reset page");
        assert.equal(await driver.hasElementByAccessibilityId('nextBtn-testId'), true, "Could not display reset page");
        assert.equal(await driver.hasElementByAccessibilityId('backBtn-testId'), true, "Could not display reset page");
    });

    it('TC_LG_19: To verify country flag/country code from PASSWORD RESET screen.', async function () {
        const countryBtn = await driver.elementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup');

        // go to the country code search page
        await countryBtn.click();

        driver.setImplicitWaitTimeout(3000);
        // check whether all the things are displayed.
        assert.equal(await driver.hasElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.EditText")
            && await driver.hasElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView[1]"),
            true, "Country Search Activity launch failed.");
    });

    it('TC_LG_20: To verify search country functionality.', async function () {
        const searchBoxField = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.EditText");
        await searchBoxField.sendKeys(loginDS1.countrySearchText);
        const firstCountry = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView[1]/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.TextView");
        countryText = await firstCountry.text();
        assert.equal(countryText.includes(loginDS1.selectedCountryText), true, "Search for correct country failed.");
        await firstCountry.click();
    });

    it('TC_LG_21: To verify user can select the Country from countries list.', async function () {
        const countryCodeField = await driver.waitForElementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup/android.widget.TextView');
        var countryCodeText = await countryCodeField.text();
        assert.equal(countryText.includes(countryCodeText.trim()), true, "Select country failed");
    });

    it('TC_LG_22: To verify "X" button functionality on country list.', async function () {
        const countryBtn = await driver.elementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup');
        // go to the country code search page
        await countryBtn.click();
        const closeBtn = await driver.waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.ImageView');
        assert.equal(await closeBtn.isDisplayed(), true, 'Search Country Acitivity launch failed');
        await closeBtn.click();
        assert.equal(await driver.hasElementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup'), true, 'Login Acitivity launch failed');
    });

    // Left due to third party party component
    // it('TC_LG_23: To verify navigation functionality by letter tapping.', async function () {
    // });
    it('TC_LG_24: To verify validation message for invalid number.', async function () {
        const phoneNumberField = await driver.elementByAccessibilityId("phone-testId");
        await phoneNumberField.sendKeys(loginDS1.invalidMobileNumber);
        driver.setImplicitWaitTimeout(3000);
        const mobileNoErrorTextView = await driver.elementByXPath("//android.widget.TextView[@text='Please enter valid mobile number']");
        assert.equal(await mobileNoErrorTextView.text(), loginDS1.expectedResetMobileErrormsg, "Validation message displayed failed");
    });

    it('TC_LG_25: To verify by entering valid 10 digit phone number.', async function () {
        const phoneNumberField = await driver.elementByAccessibilityId("phone-testId");
        await phoneNumberField.clear();
        await phoneNumberField.sendKeys(loginDS1.validRandomMobileNumber);
        assert.equal(await driver.hasElementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.widget.TextView'), true, "Tick Mark failed to be displayed");
    });

    it('TC_LG_26: To verify send sms functionality for not registered number', async function () {
        assert.equal(await driver.hasElementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.widget.TextView'), true, "Tick Mark failed to be displayed");
        await driver.setImplicitWaitTimeout(3000);
        const sendSmsBtn = await driver.elementByAccessibilityId('nextBtn-testId');
        await sendSmsBtn.click();
        driver.setImplicitWaitTimeout(3000);
        const alertTitle = await driver.elementById("android:id/alertTitle");
        assert.equal(await alertTitle.text(), "Error", "Alert box is not shown");
        const okBtn = await driver.elementById("android:id/button1");
        await okBtn.click();
    });

    it('TC_LG_27: To verify "BACK" button functionality.', async function () {
        const backBtn = await driver.waitForElementByAccessibilityId('backBtn-testId');
        await backBtn.click();
        assert.equal(await driver.hasElementByAccessibilityId("password-testId") && await driver.hasElementByAccessibilityId("phone-testId"),
            true, "Failed back button functionality");
    });

    it('TC_LG_28: To verify send sms functionality for registered number.', async function () {
        const resetButton = await driver.elementByAccessibilityId("resetLink-testId");
        await resetButton.click();
        await driver.sleep(1000);
        driver.setImplicitWaitTimeout(3000);
        const phoneNumberField = await driver.elementByAccessibilityId('phone-testId');
        await phoneNumberField.sendKeys(loginDS1.mobileNumber);
        assert.equal(await driver.hasElementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.widget.TextView'), true, "Tick Mark failed to be displayed");
        const sendSmsBtn = await driver.elementByAccessibilityId('nextBtn-testId');
        await sendSmsBtn.click();
        assert.equal(await driver.hasElementByAccessibilityId('otp-testId'), true, "otp did not show up");
        // assert.equal(await driver.hasElementByAccessibilityId('resendCodeLink-testId'), true, "resendCodeLink did not show up");
        assert.equal(await driver.hasElementByAccessibilityId('newPassword-testId'), true, "newPassword did not show up");
        assert.equal(await driver.hasElementByAccessibilityId('confirmPassword-testId'), true, "confirmPassword did not show up");
        assert.equal(await driver.hasElementByAccessibilityId('resetPasswordBtn-testId'), true, "resetPasswordBtn did not show up");
        assert.equal(await driver.hasElementByAccessibilityId('backBtn-testId'), true, "backBtn did not show up");
    });


    it('TC_LG_29: To verify validation message for less then 6 digit code.', async function () {
        const otpField = await driver.elementByAccessibilityId('otp-testId');
        await otpField.sendKeys("123");
        assert.equal(await driver.hasElementByXPath('//android.view.ViewGroup[@content-desc="otpContainer-testId"]/android.widget.TextView'), false, "otp field validation failed");
    });

    it('TC_LG_30: To verify by adding 6 digit code.', async function () {
        const otpField = await driver.elementByAccessibilityId('otp-testId');
        await otpField.sendKeys("123456");
        assert.equal(await driver.hasElementByXPath('//android.view.ViewGroup[@content-desc="otpContainer-testId"]/android.widget.TextView'), true, "otp field validation failed");
    });

    it('TC_LG_32: To verify validation message for invalid 6 digit code.', async function () {
        const passwordField = await driver.elementByAccessibilityId('newPassword-testId');
        await passwordField.sendKeys(loginDS1.password);
        const confirmPasswordField = await driver.elementByAccessibilityId('confirmPassword-testId');
        await confirmPasswordField.sendKeys(loginDS1.password);
        const resetPasswordBtn = await driver.elementByAccessibilityId('resetPasswordBtn-testId');
        await resetPasswordBtn.click();
        const message = await driver.elementById("android:id/message");
        assert.equal(await message.text(), loginDS1.resetExpectedPasswordErrormsg, "Reset Password Error Message failed to display")
        const okBtn = await driver.elementById("android:id/button1");
        await okBtn.click();
    });

    // TODO: Kindly Add Accessibility Id in the assert statement after an update and then uncomment the statement
    it('TC_LG_33: To verify validation message for less than 6 characters in new password field.', async function () {
        const passwordField = await driver.elementByAccessibilityId('newPassword-testId');
        await passwordField.clear();
        await passwordField.sendKeys("12345");
        //     assert.equal(await driver.hasElementByAccessibilityId(""), true, "new password validation message is not show");
    });

    // TODO: Kindly Add Accessibility Id in the assert statement after an update and then uncomment the statement
    it('TC_LG_34: To verify user gets validation  by entering  6 characters in new password field.', async function () {
        const passwordField = await driver.elementByAccessibilityId('newPassword-testId');
        await passwordField.clear();
        await passwordField.sendKeys("123456");
        //     assert.equal(await driver.hasElementByAccessibilityId(""), false, "new password validation message is not show");
    });

    it('TC_LG_35: To verify hide new password functionality.', async function () {
        const passwordField = await driver.elementByAccessibilityId('newPassword-testId');
        assert.equal(await passwordField.text(), "", "Password field is not hidden");
    });

    it('TC_LG_36: To verify unhide new password functionality.', async function () {
        const eyeIcon = await driver.elementByAccessibilityId("eyeIcon-testId");
        await eyeIcon.click();
        const passwordField = await driver.elementByAccessibilityId("newPassword-testId");
        assert.equal(await passwordField.text(), "123456", "Password field is hidden");
    });

    // TODO: Kindly Add Accessibility Id in the assert statement after an update and then uncomment the statement
    it('TC_LG_37: To verify validation message for incorrect confirm new password.', async function () {
        const passwordField = await driver.elementByAccessibilityId('newPassword-testId');
        await passwordField.clear();
        await passwordField.sendKeys("456789");
        //     assert.equal(await driver.hasElementByAccessibilityId(""), false, "new password validation message is not show");
        await passwordField.clear();
        await passwordField.sendKeys("123456");
    });

    it('TC_LG_38: To verify hide confirm new password functionality.', async function () {
        const passwordField = await driver.elementByAccessibilityId('confirmPassword-testId');
        assert.equal(await passwordField.text(), "", "Password field is not hidden");
    });

    // TODO: Kindly Add Accessibility Id in the elementByAccessibilityId statement after an update and then uncomment the statements
    // it('TC_LG_39: To verify unhide confirm new password functionality.', async function () {
    //     const eyeIcon = await driver.elementByAccessibilityId("");
    //     await eyeIcon.click();
    //     const passwordField = await driver.elementByAccessibilityId("confirmPassword-testId");
    //     assert.equal(await passwordField.text(), "123456", "Password field is hidden");
    // });

    it('TC_LG_40: To verify reset password functionality.', async function () {
        const otpField = await driver.elementByAccessibilityId('otp-testId');
        await otpField.clear();
        await otpField.sendKeys(loginDS1.otpText);
        const passwordField = await driver.elementByAccessibilityId('newPassword-testId');
        await passwordField.clear();
        await passwordField.sendKeys(loginDS1.newPasswordText);
        const confirmPasswordField = await driver.elementByAccessibilityId('confirmPassword-testId');
        await confirmPasswordField.clear();
        await confirmPasswordField.sendKeys(loginDS1.newPasswordConfirmText);
        const restBtn = await driver.elementByAccessibilityId("resetPasswordBtn-testId");
        await restBtn.click();
        await driver.setImplicitWaitTimeout(3000);
        const alertTitle = await driver.elementById("android:id/alertTitle");
        assert.equal(await alertTitle.text(), "Success", "Succes alert box did not appear");
    });

    it('TC_LG_41: To verify login button on the alert box.', async function () {
        const loginBtn = await driver.elementById("android:id/button1");
        await loginBtn.click();
        await driver.setImplicitWaitTimeout(3000);
        assert.equal(await driver.hasElementByAccessibilityId("phone-testId") &&
            await driver.hasElementByAccessibilityId("password-testId") &&
            await driver.hasElementByAccessibilityId("loginBtn-testId"),
            true, "Login page did not load");
    })

    it('TC_LG_42: To verify login with new password.', async function () {
        const phoneNumberField = await driver.elementByAccessibilityId("phone-testId");
        await phoneNumberField.sendKeys(loginDS1.mobileNumber);
        const passwordField = await driver.elementByAccessibilityId("password-testId");
        await passwordField.sendKeys(loginDS1.newPasswordText);
        const loginBtn = await driver.elementByAccessibilityId("loginBtn-testId");
        await loginBtn.click();
        await driver.waitForElementByXPath("//android.widget.TextView[@text='All Cards']");
        assert.equal(await driver.hasElementByXPath("//android.widget.TextView[@text='All Cards']"), true, "Loginng in failed");
        assert.equal(await driver.hasElementByXPath("//android.widget.TextView[@text='Sports']"), true, "Loginng in failed");
        assert.equal(await driver.hasElementByXPath("//android.widget.TextView[@text='Clothing']"), true, "Loginng in failed");
    })

});
