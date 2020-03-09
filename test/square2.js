
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('chromedriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    var Elements = await (function(){
      return {
          url : 'https://squareup.com/login?lang_code=en-US&return_to=%2Fsignup%2Fus%3Flang_code%3Den-US%26v%3Ddevelopers',
          emailField : By.id('email'),
          emailValue : 'jordan.moak@angieslist.com',
          passwordField : By.id('password'),
          passwordValue : 'Turing12jm!',
          signInButton : By.id('sign-in-button'),
          portalTitle: By.js(function(){
            console.log('trying');
            return document.querySelector("#ember35 > span");
          }),
          newAccountButton : By.css('#sq-app-container > div.testing-accounts > div > h1 > button'),
          newAccountNameField : By.name('name'),
          newAccountNameValue : 'testingtesting'
      }
    }());

    try {
        await driver.manage().setTimeouts( { implicit: 10000 } );

        // Navigate to Url
        await driver.get(Elements.url);

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(Elements.emailField).sendKeys(Elements.emailValue);
        await driver.findElement(Elements.passwordField).sendKeys(Elements.passwordValue);
        await driver.sleep(10000);
        await driver.findElement(Elements.passwordField).sendKeys(Key.ENTER);
        await driver.sleep(10000);

        await driver.wait(until.urlIs('https://developer.squareup.com/apps'))
        .then(console.log("it found it."));
        let firstResult = await driver.wait(until.elementLocated(Elements.portalTitle), 10000)
        .then(console.log("and this?"));

      //  console.log(await firstResult.getAttribute('textContent'));
    }
    finally{
        driver.quit();
    }
})();
