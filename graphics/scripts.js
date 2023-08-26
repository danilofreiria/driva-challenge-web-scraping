import {Papa} from "papaparse";
import {Chart} from "chart.js"; // Certifique-se de que a importação do Chart.js está correta

// Função para processar os dados após a leitura do CSV
const processData = (results) => {
    const data = results.data;

    const cities = data.map(entry => entry.location);
    const counts = data.map(entry => parseInt(entry.Id));

    const ctx = document.getElementById('devGraph').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cities,
            datasets: [{
                label: 'Vagas por Cidade',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// lendo e processando o arquivo
const readCSV = (filePath) => {
    Papa.parse(filePath, {
        download: true,
        header: true,
        complete: processData
    });
}

// Chama a função para cada arquivo CSV
readCSV('../src/filesCSV/jobsJAVA.csv');
readCSV('../src/filesCSV/jobsNODE.csv');
readCSV('../src/filesCSV/jobsPHP.csv');
readCSV('../src/filesCSV/jobsPython.csv');
