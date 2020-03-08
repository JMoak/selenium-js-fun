const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('chromedriver');
var expect  = require('chai').expect;

async function basicTest(){

  var Elements = (function(){
    return {
        url : 'https://squareup.com/login?lang_code=en-US&return_to=%2Fsignup%2Fus%3Flang_code%3Den-US%26v%3Ddevelopers',
        emailField : By.id('email'),
        emailValue : 'jordan.moak@angieslist.com',
        passwordField : By.id('password'),
        passwordValue : 'Turing12jm!',
        signInButton : By.id('sign-in-button'),
        portalTitle: By.id('ember41'),
        newAccountButton : By.css('#sq-app-container > div.testing-accounts > div > h1 > button'),
        newAccountNameField : By.name('name'),
        newAccountNameValue : 'testingtesting'
    }
  }());

  try{
      var driver = new Builder()
          .forBrowser('chrome')
          //.withCapabilities(caps)
          .build();

      await driver.get(Elements.url);
      await driver.findElement(Elements.emailField).sendKeys(Elements.emailValue);
      await driver.findElement(Elements.passwordField).sendKeys(Elements.passwordValue, Key.ENTER);
      await driver.sleep(10000);
    //  driver.wait(until.elementLocated(Elements.portalTitle));
      // await driver.findElement(Elements.portalTitle).click();
      //await driver.wait(until.elementLocated(Elements.portalTitle));
      // await driver.findElement(Elements.newAccountButton).click();
      await driver.getTitle().then(function(pageTitle) {
        console.log("The title is " + pageTitle);
      });
      await driver.close();
  }
  catch(err){
      console.log("test failed..");
      handleFailure(err, driver);
      //return exit value here for failure;
  }

}

basicTest();

function handleFailure(err, driver) {
   console.error('Something went wrong!\n', err.stack, '\n');
   driver.quit();
}
