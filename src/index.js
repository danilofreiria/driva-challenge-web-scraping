import pup from "puppeteer";
import fs from "fs";

const url = "https://portal.gupy.io/";
const searchFor = "desenvolvedor";
const jobsList = [];
let maxScroll = 0;

(async () => {
  const browser = await pup.launch();
  const page = await browser.newPage();

  console.log("init");

  await page.goto(url);

  console.log("url running");

  // Clicar no botão para abrir a barra de pesquisa e pesquisando a vaga, mantendo a navegação aberta
  await page.click('button[data-testid="search-button"]');
  await page.type('input[aria-label="Pesquisar vaga"]', searchFor);

  await Promise.all([page.waitForNavigation(), page.keyboard.press("Enter")]);

  //Simulando o scroll para gerar os 100 resultados utilizados no desafio
  async function scrollBottom() {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        const scrollInterval = setInterval(() => {
          window.scrollBy(0, window.innerHeight);
          if (
            window.innerHeight + window.scrollY >=
            document.body.scrollHeight
          ) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, 100);
      });
    });
  }

  // Carregar mais vagas até atingir 100 e aguardando carregamento por 3 seg
  while (maxScroll <= 10) {
    const initialJobsCount = jobsList.length;
    await scrollBottom();
    await page.waitForTimeout(2000);
    maxScroll++
  };

    // extraindo os links
    const newJobLinks = await page.$$eval('.sc-97da41ab-0.zVzmE > li > div > a', (links) => links.map((link) => link.href));
    //const location = await page.$$eval('#__next > div.sc-52106605-1.JIgPc > div > div > main > ul > li:nth-child(1) > div > a > div > div.sc-a3bd7ea-2.cNIcgU > div:nth-child(1) > span', (el) => el.map((element) => element.innerText));
    const companies = await page.$$eval('.sc-efBctP.dpAAMR.sc-a3bd7ea-6.cQyvth', (el) => el.map((element) => element.innerText));
  
    //Depois, as demais informações, fazendo um loop para que vá em cada link buscar as demais informações, e também dando 
    //push nos nomes das empresas para suas respectivas vagas pelo index
    for (let i = 0; i < newJobLinks.length; i++) {
        const link = newJobLinks[i];
        const company = companies[i]; 
    
        try {
          await page.goto(link);
          await page.waitForTimeout(3000);
  
          const title = await page.$eval('h1', (element) => element.innerText);
          const publicationDate = await page.$eval('.sc-673bf470-2.fWfcGH > p', (element) => element.innerText);
          const location = await page.$eval('.sc-673bf470-5.sc-673bf470-6.dMZQvc.viDKT > span', (element) => element.innerText);
          const obj = {
            company,
            title,
            location,
            publicationDate,
            link,
          };
  
          const isDuplicate = jobsList.some(
            (existingObj) => existingObj.link === obj.link
          );
  
          if (!isDuplicate) {
            jobsList.push(obj);
          }
        } catch (error) {
          console.error("Erro ao processar um link:", error.message);
    }
};

  // Limitando a 100
  if (jobsList.length > 100) {
    jobsList.length = 100;
  }

  //Escrevendo as informações no doc CSV
  const csvData = jobsList.map(job => { return Object.values(job).map(value => `"${value}"`).join(",");}).join("\n");
  fs.writeFileSync("jobs.csv", csvData, "utf8");

  await browser.close();
  console.log("Everything is done.");
})();
