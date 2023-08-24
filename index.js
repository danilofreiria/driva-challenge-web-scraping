import pup from "puppeteer";
import fs from "fs";

const url = "https://portal.gupy.io/";
const searchFor = "desenvolvedor";

//Criando a lista que vai receber os anúncios de emprego
const jobsList = [];

(async () => {
    const browser = await pup.launch();
    const page = await browser.newPage();

    console.log("init");

    await page.goto(url);
    console.log("url running");

    // Clicar no botão para abrir a barra de pesquisa
    await page.click('button[data-testid="search-button"]');

    //pesquisar a vaga necessária
    await page.type('input[aria-label="Pesquisar vaga"]', searchFor);

    await Promise.all([
        page.waitForNavigation(),
        await page.keyboard.press("Enter")
    ]);

    
    await page.waitForSelector('.sc-a3bd7ea-0.HCzvP > a');
    const jobLinks = await page.$$eval('.sc-a3bd7ea-0.HCzvP > a', element => element.map(link => link.href));
    
    //Adicionando os links à lista
    jobsList.push(...jobLinks);

    //Adicionando ao CSV
    const csvData = jobsList.join('\n');
    fs.writeFileSync('jobs.csv', csvData, 'utf8');

    await page.waitForTimeout(5000);
    await browser.close();
    console.log("everything ok here");
})();

console.log(jobsList);
