const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('chromedriver');
var expect  = require('chai').expect;

async function basicTest(){

  var Locators = (function(){
    return {
        googleSearchBar : By.name('q'),
        googleSearch : By.id('search'),
        gitHubLink : By.linkText('github.com')
    }
  }());

  try{
      var driver = new Builder()
          .forBrowser('chrome')
          //.withCapabilities(caps)
          .build();

      await driver.get('https://www.google.com');
      await driver.findElement(Locators.googleSearchBar).sendKeys('github', Key.ENTER);
      await driver.wait(until.elementLocated(Locators.googleSearch));
      await driver.findElement(Locators.gitHubLink).click();
      const title = await driver.getTitle();

      console.log(title)
      expect(title).to.contain('GitHub');

      driver.quit();
      console.log("TEST COMPLETE!!");
      //return exit value here for success;
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
