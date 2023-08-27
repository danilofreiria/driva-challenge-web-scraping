import fs from "fs";

const countJobsByCity = (csvFilePaths) => {
  const cityCount = {};

  csvFilePaths.forEach((csvFilePath) => {
    const csvData = fs.readFileSync(csvFilePath, "utf-8");
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const cityIndex = headers.indexOf("Location");


    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const city = values[cityIndex].trim();

      if (city.length > 0) {
        const normalizedCity = city.toLowerCase();

        if (!cityCount[normalizedCity]) {
          cityCount[normalizedCity] = 0;
        }
        cityCount[normalizedCity]++;
      }
    }
  });

  const sortedCities = Object.keys(cityCount).sort(
    (cityA, cityB) => cityCount[cityB] - cityCount[cityA]
  );

  return sortedCities.map((city) => ({
    city,
    count: cityCount[city],
  }));
};

const csvFilePaths = [
  "../src/filesCSV/jobsFS.csv",
  "../src/filesCSV/jobsFE.csv",
  "../src/filesCSV/jobsBE.csv",
  "../src/filesCSV/jobsJAVA.csv",
  "../src/filesCSV/jobsNODE.csv",
  "../src/filesCSV/jobsPHP.csv",
  "../src/filesCSV/jobsPython.csv",
];

const topCities = countJobsByCity(csvFilePaths);
const destinyPath = "../src/filesCSV/top_cities_job_offers.csv"


const csvTable = [
  "id,City,Jobs Offer",
  ...topCities.filter((city, index) => {
    const excludedKeywords = [
      "efetivo",
      "oportunidades",
      "pessoa jurídica",
      "pessoas com deficiência",
      "mulheres",
      "senior",
      "react",
      "c#",
      "desenvolvedor",
      "banco de talentos"
    ];

    if (excludedKeywords.some(keyword => city.city.toLowerCase().includes(keyword))) {
      city.count = `"${city.count}"`; // Formatar apenas para cidades com palavras-chave
    }
    return !excludedKeywords.some(keyword => city.city.toLowerCase().includes(keyword));
  })
    .map((city, index) => {
      return `${index + 1},${city.city},${city.count}`; // Usar a variável city.count aqui
    })
].join("\n");
fs.writeFileSync(destinyPath, csvTable, "utf8");

console.log(csvTable)

console.log(`CSV table written to ${destinyPath}`);
