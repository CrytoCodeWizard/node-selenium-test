const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

const options = new chrome.Options();
options.addArguments("--headless");

// fetch page function
// param {string} url

const fetchPage = async url => {
    const driver = await new Builder()
                                    .forBrowser("chrome")
                                    .setChromeOptions(options)
                                    .build();
    try {
        await driver.get(url);

        const html = await driver.getPageSource();
        const filename = `${ path.basename(url).html }`;
        fs.writeFileSync(filename, html);

        console.log(`Fetched ${url} and saved as ${filename}`);
    } catch (error) {
        console.log(`Error fetching ${url}: ${error.message}`);
    } finally {
        driver.quit();
    }
}

// fetch page function with meta data
// param {string} url

const fetchPageWithMetadata = async url => {
    const driver = await new Builder()
                            .forBrowser("chrome")
                            .setChromeOptions(options)
                            .build();
    try {
        await driver.get(url);

        const html = await driver.getPageSource();
        const filename = `${path.basename(url).html}`;

        fs.writeFileSync(filename, html);

        const numLinks = (await driver.findElements({ tagName: 'a' })).length;
        const numImages = (await driver.findElements({ tagName: 'img' })).length;
        const timestamp = new Date().toUTCString();

        console.log(`site : ${url}`);
        console.log(`num links: ${numLinks}`);
        console.log(`images: ${numImages}`);
        console.log(`last_fetch: ${timestamp}`);

        console.log(`Fetched ${url} and saved as ${filename}`);
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
    } finally {
        driver.quit();
    }
}

module.exports = {
    fetchPage,
    fetchPageWithMetadata
}