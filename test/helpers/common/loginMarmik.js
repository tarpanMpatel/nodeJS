import chai from 'chai';
const {assert} = chai;


let login = function (driver, Dataset) {

    it('TC_LG_01 : To verify Login button functionality..', async function () {
        
        await driver.setImplicitWaitTimeout(3000);
        const mobileNo = await driver.elementByAccessibilityId('phone-testId');
        const password = await driver.elementByAccessibilityId('password-testId');
        const passwordtext = await driver.elementByXPath("//android.widget.TextView[@text='I forgot my password, please let me ']");
        const resetitlink = await driver.elementByXPath("//android.widget.TextView[@text='reset it']");
        const registerlink = await driver.elementByXPath(" //android.widget.TextView[@text='register.']");
        assert.equal(await mobileNo.isDisplayed() && await password.isDisplayed() && await passwordtext.isDisplayed() && await resetitlink.isDisplayed() && await registerlink.isDisplayed(), true, "Login screen open successfully.");

    });

    it('TC_LG_16 : To verify login with valid credentials.', async function () {

        await driver.setImplicitWaitTimeout(1000);

        const mobileNo = await driver.elementByAccessibilityId('phone-testId');
        await mobileNo.sendKeys(Dataset.mobileNumber);
        const password = await driver.elementByAccessibilityId('password-testId');
        await password.sendKeys(Dataset.password);
        const Loginbutton = await driver.elementByAccessibilityId("loginBtn-testId");
        await Loginbutton.click();

        await driver.setImplicitWaitTimeout(6000);

        const apply = await driver.elementByAccessibilityId("Apply, tab, 1 of 5");
        const dashboard = await driver.elementByAccessibilityId("Dashboard, tab, 2 of 5");
        const cards = await driver.elementByAccessibilityId("Cards, tab, 3 of 5");
        const profile = await driver.elementByAccessibilityId("Profile, tab, 4 of 5");
        const more = await driver.elementByAccessibilityId("More, tab, 5 of 5");
        const sports = await driver.elementByXPath("//android.widget.TextView[@text='Sports']");
        const clothing = await driver.elementByXPath("//android.widget.TextView[@text='Clothing']");
        const allCard = await driver.elementByXPath("//android.widget.TextView[@text='All Cards']");
        const applyCard0 = await driver.elementByAccessibilityId("0-applyBtn-testId");
        const giftCard0 = await driver.elementByAccessibilityId("0-giftBtn-testId");

        assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await sports.isDisplayed() && await clothing.isDisplayed() && await allCard.isDisplayed() && await applyCard0.isDisplayed() && await giftCard0.isDisplayed(), true, "All elements failed to display on apply screen.");
    });

};

export {
  login
};