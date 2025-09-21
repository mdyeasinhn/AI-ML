// scraper.js
const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function scrapeShops(searchQuery) {
  const options = new chrome.Options();
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
  options.addArguments("--headless"); // optional: run without opening browser

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  let results = [];

  try {
    await driver.get('https://www.google.com');
    await driver.sleep(2000);

    const input = await driver.findElement(By.name('q'));
    await input.sendKeys(searchQuery, Key.RETURN);
    await driver.sleep(2000);

    const maps = await driver.findElement(By.className('eZt8xd'));
    await maps.sendKeys(Key.RETURN);
    await driver.sleep(3000);

    let sidebar;
    try {
      sidebar = await driver.findElement(By.xpath('//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[1]/div[1]'));
    } catch {
      console.log('Sidebar not found');
    }

    for (let i = 0; i < 60; i++) {
      await sidebar.sendKeys(Key.PAGE_DOWN);
      await driver.sleep(500);
    }

    const names = await driver.findElements(By.className('qBF1Pd'));
    const links = await driver.findElements(By.className('hfpxzc'));

    for (let i = 0; i < names.length; i++) {
      const shopName = await names[i].getText();
      const shopLink = await links[i].getAttribute('href');
      results.push({ shopName, shopLink });
    }
  } finally {
    await driver.quit();
  }

  return results;
}

module.exports = scrapeShops;
