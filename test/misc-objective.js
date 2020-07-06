
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('chromedriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    let code = '';
    let urlOfInterest = '';
    var Elements = await (function(){
      return {
          url : '<removed>',
          forceRedirectUrl: '<removed too>',
          emailField : By.id('email'),
          emailValue : 'anyemail@emailplace.com',
          passwordField : By.id('password'),
          passwordValue : 'some password',
          signInButton : By.id('sign-in-button'),
          newAccountButton : By.css('#sq-app-container > div.testing-accounts > div > h1 > button'),
          newAccountNameField : By.name('name'),
          newAccountNameValue : 'testingtesting',
          newAccountCountryDropdown : By.xpath('//*[contains(@class, "country-dropdown-trigger")]'),
          usaUSAUSAUSA : By.xpath('//*[@class="ember-basic-dropdown-content-wormhole-origin"]'),
          authorizeCheckbox : By.xpath('//*[@class="form-checkbox__label__text"]'),
          createNewAccountButton : By.xpath('//*[contains(@class, "button--developer create")]'),
          launchButtons : By.xpath('//*[contains(@class, "button button--developer-secondary")]')
        }
    }());

    try {
        await driver.manage().setTimeouts( { implicit: 10000 } );

        // Navigate to Url and login
        await driver.get(Elements.url);
        await driver.findElement(Elements.emailField).sendKeys(Elements.emailValue);
        await driver.findElement(Elements.passwordField).sendKeys(Elements.passwordValue);
        await driver.sleep(4000);
        await driver.findElement(Elements.passwordField).sendKeys(Key.ENTER);

        // wait for the portal to load and then create a new account
        await driver.sleep(10000);
        await driver.wait(until.urlIs('<removed again>'))
        await driver.wait(until.elementLocated(Elements.newAccountButton), 10000).click();
        await driver.sleep(2000);
        await driver.wait(until.elementLocated(Elements.newAccountNameField), 10000).sendKeys(Elements.newAccountNameValue);
        await driver.sleep(4000);
        await driver.wait(until.elementLocated(Elements.newAccountCountryDropdown), 10000).click();
        await driver.wait(until.elementLocated(Elements.newAccountCountryDropdown), 10000).sendKeys(Key.ENTER);
        await driver.wait(until.elementLocated(Elements.authorizeCheckbox), 10000).click();
        await driver.wait(until.elementLocated(Elements.createNewAccountButton), 10000).click();

        // wait for the account to populate on the page and click launch
        await driver.sleep(2000);
        launchButtonElements = await driver.findElements(Elements.launchButtons);
        await launchButtonElements[launchButtonElements.length - 1].click();
        await driver.sleep(5000);

        // force the redirect and grab the code
        await driver.get(Elements.forceRedirectUrl).then(() => {
            driver.getCurrentUrl().then(url => {urlOfInterest = url;});
        });
    }
    finally{
        driver.quit();
        if (urlOfInterest != '') {
          code = await urlOfInterest.match(/code=([^&]*)/).split('=')[1];
        }
        await console.log("Access Code: " + code);
        return code;
    }
})();
