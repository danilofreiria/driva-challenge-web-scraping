import pup from "puppeteer";
import fs from "fs";

const url = "https://portal.gupy.io/";
const searchFor = "desenvolvedor";

// lista que recebe os anúncios de emprego
const jobsList = [];

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

  // Carregar mais vagas até atingir 100
  while (jobsList.length < 100) {
    const initialJobsCount = jobsList.length;
    await scrollBottom();

    // Aguardando carregamento por 2 seg
    await page.waitForTimeout(2000);

    // extraindo os links
    const newJobLinks = await page.$$eval(
      ".sc-97da41ab-0.zVzmE > li > div > a",
      (links) => links.map((link) => link.href)
    );

    // Validando que os links são unicos
    for (const link of newJobLinks) {
      if (!jobsList.includes(link)) {
        jobsList.push(link);
      }
    }

    // Parar o loop quando não adicionar nenhum link (a partir das 100 unidades)
    if (jobsList.length === initialJobsCount) {
      break;
    }
  }

  // Limitando a 100, já que o código tem pego 109 e me dá aflição.
  if (jobsList.length > 100) {
    jobsList.length = 100;
  }

  // Adicionar ao CSV
  const csvData = jobsList.join("\n");
  fs.writeFileSync("jobs.csv", csvData, "utf8");

  //   console.log("Collected job links:", jobsList);

  await browser.close();
  console.log("Everything is done.");
})();
