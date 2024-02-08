# Quick Surveys API

Este projeto consiste em uma API de enquetes construída com Node.js e TypeScript, utilizando o framework Fastify para o manejo de requisições HTTP, Prisma como ORM para interação com o banco de dados PostgreSQL, e Redis para gerenciamento de dados em cache. A API também emprega WebSockets para permitir a visualização em tempo real dos votos nas enquetes, implementando o padrão de design Pub/Sub para otimizar a entrega de atualizações aos clientes conectados.

## Aprendizados do Projeto

Durante o desenvolvimento deste projeto, foram adquiridos diversos conhecimentos importantes, dentre os quais se destacam:

-   **Fastify:** Aprendemos a utilizar este framework eficiente para Node.js, que se destaca por sua performance e simplicidade, facilitando a criação de rotas, manipulação de requisições e respostas, além de contar com um robusto sistema de plugins.
    
-   **Prisma:** Aprofundamos nosso conhecimento no uso do Prisma como ORM, explorando suas capacidades de modelagem de dados, migrações automatizadas e consultas otimizadas ao banco de dados PostgreSQL.
    
-   **Docker e Docker Compose:** Praticamos a containerização da aplicação e dos serviços de banco de dados (PostgreSQL) e cache (Redis), utilizando Docker e Docker Compose para simplificar a configuração, implantação e escalabilidade do projeto.
    
-   **WebSocket e Padrão Pub/Sub:** Implementamos WebSockets para habilitar a comunicação bidirecional em tempo real entre o servidor e os clientes. Além disso, aplicamos o padrão Pub/Sub usando Redis para gerenciar a subscrição e publicação de mensagens relacionadas aos votos nas enquetes, o que permitiu uma atualização eficiente e escalável das visualizações em tempo real.
    

## Como Rodar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter Docker e Docker Compose instalados em sua máquina para facilitar a execução dos serviços de banco de dados e cache.

### Passos para Execução

1.  **Clone o repositório**

bashCopy code

`git clone https://seu-repositorio-aqui.com/projeto-api-enquetes.git
cd projeto-api-enquetes` 

2.  **Configuração de Ambiente**

Copie o arquivo `.env.example` para um novo arquivo chamado `.env` e ajuste as variáveis de ambiente conforme necessário, incluindo as credenciais do banco de dados PostgreSQL e do Redis.

3.  **Inicie os Serviços com Docker Compose**

bashCopy code

`docker-compose up -d` 

Este comando irá subir os containers do PostgreSQL e do Redis, configurando-os conforme definido no arquivo `docker-compose.yml`.

4.  **Instalação de Dependências**

bashCopy code

`npm install` 

5.  **Execução das Migrações**

bashCopy code

`npx prisma migrate dev` 

Este comando irá aplicar as migrações no banco de dados, criando as tabelas necessárias.

6.  **Iniciar a Aplicação**

bashCopy code

`npm run dev` 

A aplicação será iniciada no modo de desenvolvimento, ouvindo por padrão na porta 3000. Você pode acessar a API através da URL `http://localhost:3000`.

## Visualização em Tempo Real dos Votos

A visualização em tempo real dos votos é habilitada através de WebSockets. Clientes conectados à aplicação recebem atualizações instantâneas sempre que um voto é registrado, graças à implementação do padrão Pub/Sub com Redis, que gerencia a publicação de eventos de voto e a subscrição dos clientes de forma eficiente e escalável.