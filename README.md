# Desafio de Web Scraping - Análise de Vagas de Emprego (Plataforma Gupy)

Este projeto é parte do **Desafio de Web Scraping** da plataforma Driva. O objetivo é coletar dados sobre vagas de emprego na plataforma Gupy, realizar análises e visualizações desses dados e criar insights relevantes para o mercado de trabalho de tecnologia.

## Relatório de Análise de Dados com Web Scraping na Plataforma Gupy

### Introdução

Este relatório apresenta os resultados de uma análise de dados realizada através de web scraping na plataforma Gupy. O objetivo da análise é compreender as tendências de vagas de emprego relacionadas a linguagens de programação e tipos de stacks oferecidos por empresas, além de explorar as localizações onde essas oportunidades são mais frequentes.

### Metodologia

Para obter os dados necessários, foi utilizado o **Puppeteer**, uma biblioteca de automação de navegador para JavaScript. A plataforma Gupy foi acessada para buscar vagas relacionadas às palavras-chave "Node", "Java", "PHP" e "Python" para as linguagens, bem como "backend", "frontend" e "fullstack" para os tipos de stacks. O processo de web scraping envolveu pesquisar as palavras-chave, coletar os links das vagas e navegar através dos anúncios para obter informações como nome da empresa, detalhes da vaga e localização.

### Resultados e Análises

Após a coleta dos dados, as informações foram organizadas e analisadas para extrair insights relevantes. Foram identificadas as seguintes tendências:

1. **Linguagens de Programação mais Demandadas:** A análise revelou que as linguagens "Node", "Java", "PHP" e "Python" estão em alta demanda em vagas de emprego. As linguagens "Java" e "Node" se destacam com maior quantidade de oportunidades.

2. **Tipos de Stacks Procurados:** Entre os tipos de stacks, "backend", "frontend" e "fullstack" são frequentemente mencionados. "Backend" e "Fullstack" também apresentam uma demanda significativa.

3. **Localizações mais Frequentes:** As cidades com maior ocorrência de vagas incluem São Paulo, Brasília, Porto Alegre, Barueri, Rio de Janeiro e Belo Horizonte. Nota-se que algumas localizações podem conter caracteres especiais ou variações na nomenclatura.

### Conclusão

A experiência de realizar web scraping e análise de dados na plataforma Gupy foi um sucesso. Ao longo de aproximadamente 72 horas, foram aplicados conhecimentos de programação e análise para coletar, processar e extrair insights valiosos das vagas de emprego. A análise revelou tendências claras nas linguagens de programação, tipos de stacks e localizações mais procuradas pelos empregadores.

É importante ressaltar que a precisão dos resultados depende da qualidade dos dados disponíveis no momento da coleta e das possíveis mudanças na estrutura do site. Eventuais erros no processo de web scraping foram tratados de forma a minimizar impactos nos resultados.

Esse projeto destacou a importância de adquirir conhecimentos em web scraping e análise de dados para tomar decisões informadas e estratégicas com base em informações reais do mercado de trabalho.

*Este relatório foi elaborado com base nas análises realizadas até o dia 25 de agosto de 2023.*

## Sobre o Projeto

O projeto consiste em usar a biblioteca **Puppeteer** para realizar web scraping na plataforma Gupy. Foram coletados dados relacionados a vagas de emprego, incluindo linguagens de programação, tipos de stacks e localizações.

## Como Usar

1. Certifique-se de ter o **Node.js** instalado.
2. Clone este repositório em sua máquina local:
   ```
   git clone https://github.com/danilofreiria/driva-challenge-web-scraping.git
   ```
3. Navegue até o diretório do projeto:
   ```
   cd driva-challenge-web-scraping
   ```
4. Execute o comando para instalar as dependências:
   ```
   npm install
   ```
5. Para coletar dados, execute:
   ```
   node src/scraper.js
   ```
6. Para formatar e processar os dados, execute:
   ```
   node analysis/processData.js
   ```
7. Para quantificar os dados e gerar gráficos, execute:
   ```
   node analysis/quantifyData.js
   ```

## Estrutura do Repositório

- **`src/`**: Contém os arquivos JavaScript utilizados para a coleta de dados por meio do web scraping.
  - `index.js`: Script principal de web scraping para coleta de informações de vagas.
  - `utils.js`: Função auxiliar para geração de ID's.

- **`filesCSV/`**: Armazena os arquivos CSV com os dados brutos coletados das vagas.

- **`tablesFormat/`**: Contém os arquivos JavaScript para análise e processamento dos dados coletados.
  - `formatData.js`: Funções para adicionar headers aos arquivos CSV.
  - `processData.js`: Função para formatar e processar os dados coletados.
  - `quantifyData.js`: Funções para quantificar os dados e identificar tendências.

- **`graphics/`**: Os resultados das análises realizadas são armazenados aqui, incluindo gráficos e insights.

## Resultados e Insights

Os resultados das análises, incluindo gráficos e insights, estão disponíveis na pasta `graphics/` Rode o arquivo graph.html e acompanhe as tabelas.

## Observações

- Este projeto foi desenvolvido como parte do Desafio de Web Scraping da plataforma Driva.
- Os dados coletados podem estar sujeitos a mudanças na estrutura do site da Gupy.
- O código foi organizado em várias etapas, desde web scraping até análise e visualização de dados.