const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables
describe('E2E tests', function () {
    this.timeout(6000)
    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it.only('loads static page', async () => {
        await page.goto('http://localhost:3000');

        //$$eval() ще хване всички span елементи на страницата, ще му подадем функция (spans), която ще мапне елементите към тяхното 
        //текстово съдържание. После ще проверим дали то съдържа конкретния текст.
        const titles = await page.$$eval('.accordion .head span', (spans) => spans.map(s => s.textContent));
        expect(titles).includes('Scalable Vector Graphics');
    });

    it('toggles content', async () => {
        await page.goto('http://localhost:3000');

        await page.click('text=More');
        await page.waitForSelector('.extra p');
        await page.click('text=Less');

        const visible = await page.isVisible('.extra p');
        expect(visible).to.be.false;
    })
});
