import chai from 'chai';
const { assert } = chai;

let newRegister = function (driver, DataSet) {

        it('TC_Reg_02 : To Verify "REGISTER" button functionality', async function () {

            await driver.setImplicitWaitTimeout(8000);
            const register = await driver.elementByAccessibilityId("registerBtn-testId");
            await register.click();
            console.log("Clicked on 'Register' button.");

            const mobileNo = await driver.elementByAccessibilityId("phone-testId");
            const pswd = await driver.elementByAccessibilityId("password-testId");
            const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
            const login = await driver.elementByXPath("//android.widget.TextView[@text='Login']");
            assert.equal(await mobileNo.isDisplayed() && await pswd.isDisplayed() && await checkBox.isDisplayed() && await login.isDisplayed(), true, "Successfully Redirected to Register page.");
        });

        it('TC_Reg_03 : To Verify "LOGIN" button functionality on registration page.', async function () {
            await driver.setImplicitWaitTimeout(1000);
            const loginButtonOnRegistrationPage = await driver.elementByXPath("//android.widget.TextView[@text='Login']");
            assert.equal(await loginButtonOnRegistrationPage.isDisplayed(), true, "LOGIN button displayed Successfully.");
        });

        it('TC_Reg_23 : To Verify "Register" button functionality with valid details.', async function () {
            await driver.setImplicitWaitTimeout(1000);
            const mobileNo = await driver.elementByAccessibilityId('phone-testId');
            await mobileNo.sendKeys(DataSet.mobileNumber);
            console.log("Entered Mobile number : " + DataSet.mobileNumber);

            await driver.setImplicitWaitTimeout(1000);
            const password = await driver.elementByAccessibilityId('password-testId');
            await password.sendKeys(DataSet.password);
            console.log("Entered Password." + DataSet.password);

            await driver.setImplicitWaitTimeout(1000);
            const checkBox = await driver.elementByAccessibilityId("aggrementCheckbox-testId");
            await checkBox.click();
            console.log("Checked licence-agreement checkbox.");

            await driver.setImplicitWaitTimeout(1000);
            const registerBtn = await driver.elementByAccessibilityId("registerBtn-testId");
            await registerBtn.click();
            console.log("Clicked on register Button.");

            await driver.setImplicitWaitTimeout(5000);

            const otp = await driver.elementByAccessibilityId("otp-testId");
            assert.equal(await otp.isDisplayed(), true, 'Verification Code page displayed Successfully.');
        });

        it('TC_Reg_24 : To Verify details shown on "Verification code" screen.', async function () {
            await driver.setImplicitWaitTimeout(3000);
            const otp = await driver.elementByAccessibilityId("otp-testId");
            const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
            const countDownText = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[3]");
            assert.equal(await otp.isDisplayed() && await nextButton.isDisplayed() && await countDownText.isDisplayed(), true, 'Successfully OTP page displayed.');
        });

        it('TC_Reg_28, TC_Reg_29, TC_Reg_32 : To Verify by adding 6 digit code.', async function () {
            const otpField = await driver.elementByAccessibilityId("otp-testId");
            await otpField.sendKeys(DataSet.validOTP);
            console.log("Entered OTP number." + DataSet.validOTP);

            await driver.setImplicitWaitTimeout(1000);

            const tickMark = await driver.elementByXPath("//android.view.ViewGroup[@content-desc='otpContainer-testId']/android.widget.TextView");
            assert.equal(await tickMark.isDisplayed(), true, "Tick Mark displayed Successfully.");

            await driver.setImplicitWaitTimeout(2000);
            const nextBtn = await driver.elementByAccessibilityId("nextBtn-testId");

            assert.equal(await nextBtn.isDisplayed(), true, "Next Button displayed Successfully.");

            await driver.setImplicitWaitTimeout(1000);
            await nextBtn.click();
            console.log("Clicked on next button.");

            await driver.setImplicitWaitTimeout(5000);

            const personalDetails = await driver.elementByAccessibilityId("firstName-testId");
            assert.equal(await personalDetails.isDisplayed(), true, "Successfully Personal Detail screen displayed.");
        });

        it('TC_Reg_33, TC_Reg_54 : To Verify details on personal details screen.', async function () {
            const firstNameField = await driver.elementByAccessibilityId("firstName-testId");
            await firstNameField.sendKeys(DataSet.firstname);
            console.log("Entered firstName : " + DataSet.firstname);

            await driver.setImplicitWaitTimeout(1000);
            const lastNameField = await driver.elementByAccessibilityId("lastName-testId");
            await lastNameField.sendKeys(DataSet.lastname);
            console.log("Entered lastName :" + DataSet.lastname);

            await driver.setImplicitWaitTimeout(1000);
            const dobField = await driver.elementByAccessibilityId("birthDateContainer-testId");
            await dobField.click();
            console.log("Clicked on DOB text field.");

            await driver.setImplicitWaitTimeout(1000);
            const dobFieldOK = await driver.elementById("android:id/button1");
            await dobFieldOK.click();
            console.log("Clicked on DOB ok button.");

            await driver.setImplicitWaitTimeout(1000);
            const emailField = await driver.elementByAccessibilityId("emailId-testId");
            await emailField.sendKeys(DataSet.email);
            console.log("Entered EmailID : " + DataSet.email);

            await driver.setImplicitWaitTimeout(1000);
            const backButton = await driver.elementByAccessibilityId("leftIconBtn-testId");
            assert.equal(await backButton.isDisplayed(), true, "Successfully back button displayed.");

            const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
            await nextButton.click();
            console.log("Clicked on Next button.");
            await driver.setImplicitWaitTimeout(3000);

            const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
            const addressDetailsText = await driver.elementByXPath("//android.widget.TextView[@text='Step 2 of 4: The address details']");
            const postalCodeNextButton = await driver.elementByAccessibilityId("nextBtn-testId");

            assert.equal(await postalCode.isDisplayed() && await addressDetailsText.isDisplayed() && await postalCodeNextButton.isDisplayed(), true, "Postal Code and Address details text is displayed successfully.");
        });

        it('TC_Reg_61, TC_Reg_62 : To Verify search icon functionality for valid postal code.', async function () {
            await driver.setImplicitWaitTimeout(2000);
            const postalCode = await driver.elementByAccessibilityId("postalCode-testId");
            await postalCode.sendKeys(DataSet.expectedPostalCodeValue);
            console.log("Entered Postal Code : " + DataSet.expectedPostalCodeValue);

            await driver.setImplicitWaitTimeout(1000);

            const searchIcon = await driver.elementByAccessibilityId("searchIcon-testId");
            await searchIcon.click();
            console.log("Clicked on Search icon.");

            await driver.setImplicitWaitTimeout(10000);

            const selectAddress = await driver.elementByXPath("//android.widget.TextView[@text='Chelsea Academy, London, England']");
            await selectAddress.click();
            console.log("Address Selected.");

            await driver.setImplicitWaitTimeout(2000);
            const nextButton = await driver.elementByAccessibilityId("nextBtn-testId");
            await nextButton.click();
            console.log("Clicked on Next button.");
        });

        it('TC_Reg_69 : To Verify "SIGN ME UP" button functionality from news and updates screen.', async function () {
            await driver.setImplicitWaitTimeout(3000);
            const signMeUp = await driver.elementByAccessibilityId("signMeUpBtn-testId");
            await signMeUp.click();
            console.log("Clicked on Sign Me Up button.");

            await driver.setImplicitWaitTimeout(2000);
            const allowButton = await driver.elementByAccessibilityId("allowBtn-testId");
            const skipButton = await driver.elementByXPath("//android.widget.TextView[@text='skip']");
            assert.equal(await allowButton.isDisplayed() && await skipButton.isDisplayed(), true, "Successfully allow and skip button displayed.");
        });

        it('TC_Reg_72 : To Verify "ALLOW" functionality from Your notifications screen.', async function () {
            await driver.setImplicitWaitTimeout(1000);
            const allowButton = await driver.elementByAccessibilityId("allowBtn-testId");
            await allowButton.click();
            console.log("Taped on allow button.");

            await driver.setImplicitWaitTimeout(5000);
            const step3and4Text = await driver.elementByXPath("//android.widget.TextView[@text='Step 3 of 4: Quick ID check']");
            const takeaSelfie = await driver.elementByAccessibilityId("startPictureBtn-testId");

            await driver.setImplicitWaitTimeout(1000);
            assert.equal(await step3and4Text.isDisplayed() && await takeaSelfie.isDisplayed(), true, "Successfully step3and4 Text and takeaSelfie button displayed.");
        });

        it('TC_Reg_74, TC_Reg_77 : To Verify TAKE A SELFIE button functionality from verify your identity screen.', async function () {
            await driver.setImplicitWaitTimeout(2000);
            const takeaSelfie = await driver.elementByAccessibilityId("startPictureBtn-testId");
            await takeaSelfie.click();
            console.log("Taped on take selfie button.");
            await driver.setImplicitWaitTimeout(1000);

            const capture = await driver.elementByAccessibilityId("captureSelfie-testId");
            await capture.click();
            console.log("Taped on Capture button.");

            await driver.setImplicitWaitTimeout(10000);
            const done = await driver.elementByAccessibilityId("doneBtn-testId");
            assert.equal(await done.isDisplayed(), true, "Done Button displayed successfully.");
        });

        it('TC_Reg_78 : To Verify DONE button functionality from finished screen.', async function () {
            await driver.setImplicitWaitTimeout(5000);
            const done = await driver.elementByAccessibilityId("doneBtn-testId");
            await done.click();
            console.log("Taped on Done button.");
            await driver.setImplicitWaitTimeout(2000);
        });

        it('TC_Reg_78 : To Verify apply screen.', async function () {
            await driver.setImplicitWaitTimeout(3000);
            const apply = await driver.elementByAccessibilityId("Apply, tab, 1 of 5");
            const dashboard = await driver.elementByAccessibilityId("Dashboard, tab, 2 of 5");
            const cards = await driver.elementByAccessibilityId("Cards, tab, 3 of 5");
            const profile = await driver.elementByAccessibilityId("Profile, tab, 4 of 5");
            const more = await driver.elementByAccessibilityId("More, tab, 5 of 5");
            const sport = await driver.elementByXPath("//android.widget.TextView[@text='Sports']");
            assert.equal(await apply.isDisplayed() && await dashboard.isDisplayed() && await cards.isDisplayed() && await profile.isDisplayed() && await more.isDisplayed() && await sport.isDisplayed(), true, "all elements displayed successfully on apply screen.");
            await driver.setImplicitWaitTimeout(2000);
        });

};

export {
    newRegister
};