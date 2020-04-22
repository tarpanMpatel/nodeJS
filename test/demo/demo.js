import wd from 'wd'
import chai from 'chai'

import {applycardVM} from '../helpers/common/validationmessage'
import {shopAppXpath} from '../helpers/common/androidiOSElements/shopApps'
import {homePageXpath, businessMenuXpath} from '../helpers/common/androidiOSElements/homePage'
import {loginPageXPath} from '../helpers/common/androidiOSElements/login'

const {assert} = chai
let request = require('request')

let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let test_status
const FAILED_TESTS = {}
let ssid

let driver
let URL = 'https://commerceos.staging.devpayever.com/'

/*
if (configuration.driverType == 'local') {
    driver = wd.promiseChainRemote({host: '0.0.0.0', port: '4723'})  // for running in local
} else {
    driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub') // for browserstack
}*/

let testName = 'Open PayEver Web Application.'

/*
async function applycardmodule1(DeviceName, PlatformVersion, buildName) {
*/

    describe(testName, function () {

/*
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
            /!*  it('...DONE...', function(done) {
                    setTimeout(done, 5000)
               });*!/
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
            /!*let test = this.test.parent.tests.reduce(function(prev, curr) {
             return (!curr.state) ? prev : curr;
             });
             console.log("...........########...........->>>"+test.title, test.state);*!/
        })
*/

        it('TC_01 : To Verify PayEver Application open successfully.', async function () {
            driver = new webdriver.Builder().forBrowser('chrome').build();

            await driver.get(URL);
            await driver.manage().window().maximize();

            await driver.wait(until.elementLocated(By.xpath(loginPageXPath.loginBtn)), 15000);

            console.log("Waiting to load the elements.");
            //   driver.manage().setTimeouts( { implicit: 15000 } )
            const title =  await driver.getTitle();
            console.log("Actual Web Page Title : " + title);

            assert.equal(title,'payever',"Title Matched Successfully");
            console.log("Title verified successfully");

             const username =  await driver.findElement(By.xpath(loginPageXPath.username));
             const pswd =  await driver.findElement(By.xpath(loginPageXPath.password));
             const loginBtn =  await driver.findElement(By.xpath(loginPageXPath.loginBtn));
             assert.equal(await username.isDisplayed() && await pswd.isDisplayed()
                            && await loginBtn.isDisplayed(),true,"Login Elements Displayed..");

        })

        it('TC_02 : To verify Login functionality with valid Username Password.', async function () {

            const username =  await driver.findElement(By.xpath(loginPageXPath.username));
            const pswd =  await driver.findElement(By.xpath(loginPageXPath.password));

            let usrnm = 'aqa@payever.org';
            let ps = 'Aqacool123!';

            await username.sendKeys(usrnm);
            console.log("Enter Username:"+usrnm);
            await pswd.sendKeys(ps);
            console.log("Enter Password:"+ps);

            await driver.sleep(2000);
            await driver.findElement(By.xpath(loginPageXPath.loginBtn)).click();
            console.log("Clicked on 'LOGIN' button.");
            await driver.sleep(2000);

            await driver.wait(until.elementLocated(By.xpath(homePageXpath.tutorials)), 25000);
            let businessMenuText =  await driver.findElement(By.xpath(homePageXpath.businessMenu)).getText();

            console.log("Actual Menu Name : " + businessMenuText);

            assert.equal(businessMenuText,'Business',"Title Matched Successfully");

            const tutorial = await driver.findElement(By.xpath(homePageXpath.tutorials));
            const appMenu = await driver.findElement(By.xpath(homePageXpath.appsMenu));

            assert.equal(await tutorial.isDisplayed() && await appMenu.isDisplayed(),
                            true,"Home Page Elements Displayed..");

            console.log("User Logged in Successfully");
        })

        it('TC_03 : To verify Open Shop App.', async function () {

           await driver.findElement(By.xpath(homePageXpath.businessMenu)).click();
           console.log("Clicked on 'Business' menu.")
            await driver.sleep(2000);

            await driver.wait(until.elementLocated(By.xpath(businessMenuXpath.shopAppIcon)), 25000);

            await driver.findElement(By.xpath(businessMenuXpath.shopAppIcon)).click();

            await driver.wait(until.elementLocated(By.xpath(shopAppXpath.themesMenu)), 25000);

            const themesmenu = await driver.findElement(By.xpath(shopAppXpath.themesMenu))
            const shop = await driver.findElement(By.xpath(shopAppXpath.shop))
            const aqamenu = await driver.findElement(By.xpath(shopAppXpath.aqaMenu))

            assert.equal(await themesmenu.isDisplayed() && await shop.isDisplayed() && await aqamenu.isDisplayed(),
                                    true,"Shop Page Elements Displayed..");

            console.log("UserRedirected to Shop page Successfully");

            await driver.wait(until.elementLocated(By.xpath('//button[@pe-qa-builder=\'text\']/span')), 25000);
            await driver.sleep(1000);

            await driver.findElement(By.xpath(shopAppXpath.aqaMenu)).click();

            await driver.sleep(5000);

          //  const shadowHost = await driver.findElement(By.xpath('//span[contains(text(),\'tablet-body area\')]'));

            async function getExtShadowRoot() {
                  let shadowHost;
                  await (shadowHost = driver.findElement(By.xpath('//pe-editor-canvas[@class=\'pe-editor-canvas\']')));
                  await driver.executeScript("arguments[0].style.border='40px solid red'",shadowHost)

                //   const root123 = await driver.executeScript("return arguments[0].shadowRoot",shadowHost)

                const e = shadowHost.shadowRoot;
                const childNodes = Array.from(e.childNodes);

                console.log('1.............'+childNodes);
                console.log('2.............'+childNodes.length);
                console.log('3.............'+childNodes.indexOf(1));

                await driver.executeScript("arguments[0].style.border='10px yellow'",e)

                  return await driver.executeScript("return arguments[0].shadowRoot",shadowHost);
            }

            const root1 = await getExtShadowRoot();

             await driver.executeScript("arguments[0].style.border='30px solid red'",root1)

            /*root1.then(function(title){
                console.log('.........((((--->  '+title);
            });*/

            let root2;

            console.log('1. -->: '+root1)
            console.log('2. -->: '+await getExtShadowRoot());
            console.log('3. -->: '+root1.click());

            /*await root1.then(async (result) => {
                await (root2 = result.findElement(By.xpath('//span[contains(.,\'tablet-body area\')]')));
              });

            root2.click();*/

            root2 = await root1.findElement(By.css('span.section-placeholder.ng-star-inserted"'));

            root2.click()


            await driver.executeScript("return arguments[0].shadowRoot",
                await driver.findElement(By.xpath('//span[contains(.,\'tablet-body area\')]')));

            shadowHost.click();

            await driver.findElement(By.xpath('//button[@pe-qa-builder=\'text\']/span')).click();

            await driver.sleep(10000);


          //  shadowHost = await driver.findElement(By.css('ShadowRoot'));
          //  return driver.executeScript("return arguments[0].shadowRoot",shadowHost);




        })

        after('Closing Driver', async function () {
      //  await driver.quit()
        console.log("Driver Quit successfully")
        })

    })

/*}*/

/*
module.exports = applycardmodule1*/
