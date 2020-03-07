const {Builder } = require('selenium-webdriver');
const chrome = require('chromedriver');
const driver = new Builder().forBrowser('chrome').build();

driver.get("http://google.com");
