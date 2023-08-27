const data = {
    tables: [
        "JAVA", "PHP", "Node.js", "Python "],
    ids: [100, 62, 34, 33]
};

const backFront = {
    tables: ["Backend", "Frontend", "FullStack"],
    ids: [100, 36, 100]
};

const cityJobs = {
    tables: ["São Paulo", "Brasília", "Porto Alegre", "Barueri", "Rio de Janeiro", "Belo Horizonte"],
    ids: [188, 29, 23, 21, 18, 14] 
};

const ctx = document.getElementById('devGraph').getContext('2d');
const backFrontCtx = document.getElementById('backendFrontendGraph').getContext('2d');
const cityCtx = document.getElementById('cityJobsGraph').getContext('2d');

const commonOptions = {
    responsive: true,
    indexAxis: 'y', 
    scales: {
        x: {
            beginAtZero: true
        },
        y: {
            tableLayout: 'fixedRows'
        }
    },
    plugins: {
        legend: {
            display: false 
        }
    }
};

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data.tables,
        datasets: [{
            label: 'Quantidade de vagas por Linguagem',
            data: data.ids,
            backgroundColor: [
                'rgba(194, 0, 17, 0.5)', 
                'rgba(104, 31, 162, 0.5)', 
                'rgba(10, 160, 17, 0.5)',   
                'rgba(235, 244, 5, 0.5)'  
            ]
        }]
    },
    options: commonOptions
});

new Chart(backFrontCtx, {
    type: 'bar',
    data: {
        labels: backFront.tables,
        datasets: [{
            label: 'Quantidade de vagas por Stack',
            data: backFront.ids,
            backgroundColor: [
                'rgba(66, 79, 255, 0.5)', 
                'rgba(242, 117, 15, 0.5)',
                'rgba(3, 183, 158, 0.5) '
            ]
        }]
    },
    options: commonOptions
});

new Chart(cityCtx, {
    type: 'bar',
    data: {
        labels: cityJobs.tables,
        datasets: [{
            label: 'Quantidade de vagas por cidade',
            data: cityJobs.ids,
            backgroundColor: [
            "rgba(204, 0, 0, 0.5)", 
            "rgba(0, 102, 204, 0.5)", 
            "rgba(0, 153, 51, 0.5)",
            "rgba(255, 153, 0, 0.5)",
            "rgba(255, 0, 102, 0.5)", 
            "rgba(102, 51, 153, 0.5)", 
            ]
        }]
    },
    options: commonOptions
});
