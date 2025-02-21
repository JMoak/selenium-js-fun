
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('chromedriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().setTimeouts( { implicit: 10000 } );

        // Navigate to Url
        await driver.get('https://www.google.com');

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);

        let firstResult = await driver.wait(until.elementLocated(By.css('h3>div')), 10000);

        console.log(await firstResult.getAttribute('textContent'));
    }
    finally{
        driver.quit();
    }
})();
