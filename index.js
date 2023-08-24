import pup from "puppeteer";

const url = "https://portal.gupy.io/";
const searchFor = "desenvolvedor";

//Criando a lista que vai receber os anúncios de emprego
const jobsList = [];

(async () => {
    const browser = await pup.launch({ headless: false });
    const page = await browser.newPage();

    console.log("init");

    await page.goto(url);
    console.log("url running");

    // Clicar no botão para abrir a barra de pesquisa
    await page.click('button[data-testid="search-button"]');

    //pesquisar a vaga necessária
    await page.type('input[aria-label="Pesquisar vaga"]', searchFor);
    await page.keyboard.press("Enter");

    await page.waitForTimeout(5000);

    await browser.close();
    console.log("everything ok here");
})();
