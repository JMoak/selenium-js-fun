
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('chromedriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    var Elements = await (function(){
      return {
          url : 'https://squareup.com/login?lang_code=en-US&return_to=%2Fsignup%2Fus%3Flang_code%3Den-US%26v%3Ddevelopers',
          emailField : By.id('email'),
          emailValue : 'testing@angieslist.com',
          passwordField : By.id('password'),
          passwordValue : 'testtest123',
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

        // Navigate to Url
        await driver.get(Elements.url);

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(Elements.emailField).sendKeys(Elements.emailValue);
        await driver.findElement(Elements.passwordField).sendKeys(Elements.passwordValue);
        await driver.sleep(4000);
        await driver.findElement(Elements.passwordField).sendKeys(Key.ENTER);
        await driver.sleep(10000);

        await driver.wait(until.urlIs('https://developer.squareup.com/apps'))
        await driver.wait(until.elementLocated(Elements.newAccountButton), 10000).click();
        await driver.sleep(2000);
        await driver.wait(until.elementLocated(Elements.newAccountNameField), 10000).sendKeys(Elements.newAccountNameValue);
        await driver.sleep(4000);
        await driver.wait(until.elementLocated(Elements.newAccountCountryDropdown), 10000).click();
        await driver.wait(until.elementLocated(Elements.newAccountCountryDropdown), 10000).sendKeys(Key.ENTER);
        await driver.wait(until.elementLocated(Elements.authorizeCheckbox), 10000).click();
        await driver.wait(until.elementLocated(Elements.createNewAccountButton), 10000).click();
        await driver.sleep(2000);
        launchButtonElements = await driver.findElements(Elements.launchButtons);
        await launchButtonElements[launchButtonElements.length - 1].click();
        await driver.sleep(5000);

      //  console.log(await firstResult.getAttribute('textContent'));
    }
    finally{
        driver.quit();
    }
})();
