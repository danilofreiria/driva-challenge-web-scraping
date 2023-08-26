import fs from "fs";

// Função para adicionar os cabeçalhos
const addHeader = async (header, fileCsv) => {
    try {
        const fileToFormat = await fs.promises.readFile(fileCsv, "utf-8");
        const joinHeader = header.join(",");
        const formatTable = `${joinHeader}\n${fileToFormat}`; // Não remova a linha do cabeçalho original

        await fs.promises.writeFile(fileCsv, formatTable, "utf-8");

        return `File successfully formatted and updated!`;
    } catch (error) {
        return `Error: ${error}`;
    }
};

export { addHeader };
