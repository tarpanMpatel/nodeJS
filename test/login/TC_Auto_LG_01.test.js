import { configuration, setTestName } from '../helpers/config'
import { loginDS1 } from '../helpers/data'
import wd from 'wd';
const assert = require('chai').assert;

let testName1 = 'TC_Auto_LG_01: To verify login functionality ';

// var driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');
var driver = wd.promiseChainRemote({
    host: '127.0.0.1',
    port: 4723
});

describe(testName1, () => {
    var allPassed = true;
    var countryText;

    before(async function () {
        setTestName("Login", testName1);
        return driver.init(configuration.runOn);
    });

    afterEach(function () {
        // keep track of whether all the tests have passed, since mocha does not do this
        allPassed = allPassed && (this.currentTest.state === 'passed');
    });

    after(function () {
        return driver.quit();
    });

    it('TC_LG_01: To verify login button functionality.', async function () {
        await driver.setImplicitWaitTimeout(10000);

        // To check whether Main Acitivity Loaded
        assert.equal(await driver.hasElementByAccessibilityId("loginBtn-testId") && await driver.hasElementByAccessibilityId("registerBtn-testId"), true, "Application launch failed.");

        const loginBtn = await driver.elementByAccessibilityId("loginBtn-testId");

        // move to next screen
        await loginBtn.click();

        // To check whether Login Acitivity Loaded
        assert.equal(await driver.hasElementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup'), true, "Login Acitivity launch failed.");
    });


    it('TC_LG_02: To verify country flag/country code from phone number text field.', async function () {
        const countryBtn = await driver.elementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup');

        // go to the country code search page
        await countryBtn.click();

        driver.setImplicitWaitTimeout(3000);
        // check whether all the things are displayed.
        assert.equal(await driver.hasElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.EditText")
            && await driver.hasElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView[1]"),
            true, "Country Search Activity launch failed.");

    });

    it('TC_LG_03: To verify search country functionality.', async function () {
        const searchBoxField = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.EditText");
        await searchBoxField.sendKeys(loginDS1.countrySearchText);
        const firstCountry = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView[1]/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.TextView");
        countryText = await firstCountry.text();
        assert.equal(countryText.includes(loginDS1.selectedCountryText), true, "Search for correct country failed.");
        await firstCountry.click();
    });

    it('TC_LG_04: To verify user can select the Country from countries list.', async function () {
        const countryCodeField = await driver.waitForElementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup/android.widget.TextView');
        var countryCodeText = await countryCodeField.text();
        assert.equal(countryText.includes(countryCodeText.trim()), true, "Select country failed");
    });

    it('TC_LG_05: To verify "X" button functionality on country list.', async function () {
        const countryBtn = await driver.elementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup');
        // go to the country code search page
        await countryBtn.click();
        const closeBtn = await driver.waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.ImageView');
        assert.equal(await closeBtn.isDisplayed(), true, 'Search Country Acitivity launch failed');
        await closeBtn.click();
        assert.equal(await driver.hasElementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.view.ViewGroup'), true, 'Login Acitivity launch failed');
    });

    // Left due to third party party component
    // it('TC_LG_06: To verify validation message for invalid number.', async function () {

    // });

    it('TC_LG_07: To verify validation message for invalid number.', async function () {
        const phoneNumberField = await driver.elementByAccessibilityId("phone-testId");
        await phoneNumberField.sendKeys(loginDS1.invalidMobileNumber);
        driver.setImplicitWaitTimeout(3000);
        const mobileNoErrorTextView = await driver.elementByXPath("//android.widget.TextView[@text='Not a valid phone number.']");
        assert.equal(await mobileNoErrorTextView.text(), loginDS1.expectedMobileErrormsg, "Validation message displayed failed");
    });

    it('TC_LG_08: To verify by entering valid 10 digit phone number.', async function () {
        const phoneNumberField = await driver.elementByAccessibilityId("phone-testId");
        await phoneNumberField.sendKeys(loginDS1.mobileNumber);
        const tickMark = await driver.elementByXPath('//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.widget.TextView');
        assert.equal(await tickMark.isDisplayed(), true, "Tick Mark failed to be displayed");
    });

    it('TC_LG_09: To verify validation message for less than 6 characters in password field.', async function () {
        const passwordField = await driver.elementByAccessibilityId("password-testId");
        await passwordField.sendKeys('1234');
        const passwordErrorTextView = await driver.elementByXPath("//android.widget.TextView[@text='Should be 6 characters or more']");
        assert.equal(await passwordErrorTextView.text(), loginDS1.expectedPasswordErrormsg, "Validation password message displayed failed");
    });

    it('TC_LG_10: To verify user gets validation by entering 6 characters or more in password field.', async function () {
        const passwordField = await driver.elementByAccessibilityId("password-testId");
        await passwordField.sendKeys('123456');
        assert.equal(await driver.hasElementByXPath("//android.widget.TextView[@text='Should be 6 characters or more']"),
            false, "Validation password message displayed failed");
    });

    // cant get attribute of password == true or false
    it('TC_LG_11: To verify hide password functionality.', async function () {
        const passwordField = await driver.elementByAccessibilityId("password-testId");
        assert.equal(await passwordField.text(), "", "Password field is not hidden");
    });

    it('TC_LG_12: To verify unhide password functionality.', async function () {
        const eyeIcon = await driver.elementByAccessibilityId("eyeIcon-testId");
        await eyeIcon.click();
        // driver.setImplicitWaitTimeout(3000);
        const passwordField = await driver.elementByAccessibilityId("password-testId");
        assert.equal(await passwordField.text(), "123456", "Password field is hidden");
    });

    // checking place holders instead of button (button's attribute are not enough to check whether the button is disabled or enabled)
    it('TC_LG_13: To verify login button when fields are empty.', async function () {
        const phoneNumberField = await driver.elementByAccessibilityId("phone-testId");
        const passwordField = await driver.elementByAccessibilityId("password-testId");
        await phoneNumberField.clear();
        await passwordField.clear();
        assert.equal(await phoneNumberField.text(), loginDS1.mobileNumberPlaceholder, "Phone Number Field is not cleared");
        assert.equal(await passwordField.text(), loginDS1.passwordPlaceholder, "Password Field is not cleared");
    });

    // Left as the current functionality does not require this.
    // it('TC_LG_14: To verify login with phone number with different country which is not associated with it.', async function() {});

    it('TC_LG_15: To verify by login with invalid credentials.', async function () {
        const phoneNumberField = await driver.elementByAccessibilityId("phone-testId");
        const passwordField = await driver.elementByAccessibilityId("password-testId");
        const loginBtn = await driver.elementByAccessibilityId("loginBtn-testId");
        await phoneNumberField.sendKeys("1234567890");
        await passwordField.sendKeys("password");
        await loginBtn.click();
        driver.setImplicitWaitTimeout(3000);
        assert.equal(await driver.hasElementById("android:id/title_template"), true, "Loginng in did not fail");
        assert.equal(await driver.hasElementById("android:id/button1"), true, "Loginng in did not fail");
    });

    it('TC_LG_16: To verify login with valid credentials.', async function () {
        const okButton = await driver.elementById("android:id/button1");
        await okButton.click();
        const phoneNumberField = await driver.waitForElementByAccessibilityId("phone-testId");
        const passwordField = await driver.elementByAccessibilityId("password-testId");
        const loginBtn = await driver.elementByAccessibilityId("loginBtn-testId");
        await phoneNumberField.clear();
        await passwordField.clear();
        await phoneNumberField.sendKeys(loginDS1.mobileNumber);
        await passwordField.sendKeys(loginDS1.password);
        await loginBtn.click();
        await driver.waitForElementByXPath("//android.widget.TextView[@text='All Cards']");
        assert.equal(await driver.hasElementByXPath("//android.widget.TextView[@text='All Cards']"), true, "Loginng in failed");
        assert.equal(await driver.hasElementByXPath("//android.widget.TextView[@text='Sports']"), true, "Loginng in failed");
        assert.equal(await driver.hasElementByXPath("//android.widget.TextView[@text='Clothing']"), true, "Loginng in failed");
    });
});
