import fs from "fs";
import { addHeader } from "./formatData.js";


// Editando as tabelas CSV
let headers = ["ID", "Company", "Title", "Location", "Publication Date", "Link"]
let filesArray = ["../src/filesCSV/jobsFS.csv","../src/filesCSV/jobsFE.csv","../src/filesCSV/jobsBE.csv","../src/filesCSV/jobsJAVA.csv", "../src/filesCSV/jobsNODE.csv", "../src/filesCSV/jobsPHP.csv", "../src/filesCSV/jobsPython.csv"];

//Adicionando os cabeçalhos simultâneamente
const processJobsTables = async (header, arrayFiles) => {
    try {
        for (let file of arrayFiles) {
            const result = await addHeader(header, file);
            console.log(result);
        }
    } catch (error) {
        console.error(error);
    }
};

processJobsTables(headers, filesArray);
