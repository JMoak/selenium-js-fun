const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('chromedriver');
var expect  = require('chai').expect;

describe('googleTest', () => {
    const driver = new Builder().forBrowser('chrome').build();

    it('should go to github and check the title', async () => {
        await driver.get('https://www.google.com');
        await driver.sleep(5000);
        await driver.findElement(By.name('q')).sendKeys('github', Key.ENTER);
        await driver.wait(until.elementLocated(By.id('search')));
        await driver.findElement(By.linkText('github.com')).click();
        await driver.sleep(2000);
        const title = await driver.getTitle();

        console.log(title)
        expect(title).to.contain('The');
    });

    after(async () => driver.quit());
});
