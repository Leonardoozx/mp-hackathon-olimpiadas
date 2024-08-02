# Jogos Olímpicos 2024

[![contribuições bem-vindas](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)]()

## Visão Geral

"Jogos Olímpicos 2024" é um microsserviço desenvolvido para fornecer informações sobre eventos olímpicos. O serviço expõe APIs usando GraphQL, REST e gRPC para interação com dados de eventos.

## Arquitetura

O projeto segue uma arquitetura hexagonal, também conhecida como arquitetura de portas e adaptadores. Esse padrão visa criar componentes de aplicação fracamente acoplados que podem ser facilmente conectados ao ambiente de software através de portas e adaptadores, facilitando a substituição de componentes e a automação de testes.

## Estrutura Básica

**domínio**

 - `use-cases`: Regra de negócios.
 - `services`: Aplica casos de uso para construir resultados.
 
**interfaces**

 - Define contratos.

**controllers**

 - Ponto de entrada para o domínio. Aplica validação de entrada e gerenciamento de cache (se necessário).

**adapters**

 - Classe que transforma (adapta) uma interface para outra.

**app**

 - Fronteira da aplicação. I/O deve ser configurado aqui.

## Implantação

O projeto pode ser executado localmente ou em um contêiner Docker. Para executar o serviço, siga as instruções abaixo:

### Executar Localmente

1. **Instalar dependências e iniciar o serviço:**

    ```bash
    make install
    make start-http
    ```

    O serviço estará disponível em http://localhost:4000/graphql.

    Verifique se está funcionando:

    ```bash
    curl --location -g --request GET 'http://localhost:4000/graphql?query={health(input:{name:%22Foobar%22}){message}}'
    ```

    Resposta esperada:
    ```json
    {
      "data": {
        "health": {
          "uptime": "10",
          "timestamp": "2024-10-22" // YYYY-MM-DD
        }
      }
    }
    ```

## Contêiner Docker

```bash
make docker-build
```

Para executar o contêiner Docker:

```bash
make docker-run
```

O serviço estará disponível nas portas especificadas no Makefile (padrão: 4000 para GraphQL e 50051 para gRPC).

## Comandos Úteis
Executar testes:

```bash
make run-tests
```

Executar build:

```bash
make build
```
Rodar o linter:

```bash
npm run lint
```

## APIs
- GraphQL

  ```graphql
  query GetEvents($input: IGetEventsPayload) {
    getEvents(input: $input) {
      data {
        id
        day
        disciplineName
        disciplinePictogram
        name
        venueName
        eventName
        detailedEventName
        startDate
        endDate
        status
        isMedalEvent
        isLive
        competitors {
          countryId
          countryFlagUrl
          competitorName
          position
          resultPosition
          resultWinnerLoserTie
          resultMark
        }
      }
      links {
        first
        last
        prev
        next
      }
      meta {
        currentPage
        from
        lastPage
        path
        perPage
        to
        total
      }
    }
  }
  ```
  Exemplo de Payload:

  ```json
  {
    "input": {
      "country": "USA",
      "discipline": "Basketball",
      "venue": "Stadium",
      "date": "2024-08-01",
      "competitor": "John Doe",
      "page": 1
    }
  }
  ```
  Exemplo de Resposta:

  ```json
  {
    "data": {
      "getEvents": {
        "data": [
          {
            "id": 1,
            "day": "2024-08-01",
            "disciplineName": "Basketball",
            "disciplinePictogram": "🏀",
            "name": "Final do Basquete Masculino",
            "venueName": "Estádio",
            "eventName": "Final",
            "detailedEventName": "Final do Basquete Masculino",
            "startDate": "2024-08-01T10:00:00Z",
            "endDate": "2024-08-01T12:00:00Z",
            "status": "Agendado",
            "isMedalEvent": 1,
            "isLive": 0,
            "competitors": [
              {
                "countryId": "USA",
                "countryFlagUrl": "https://example.com/flags/usa.png",
                "competitorName": "John Doe",
                "position": 1,
                "resultPosition": "Ouro",
                "resultWinnerLoserTie": "Vitória",
                "resultMark": "98"
              }
            ]
          }
        ],
        "links": {
          "first": "/graphql?query={getEvents(input:{page:1})}",
          "last": "/graphql?query={getEvents(input:{page:10})}",
          "prev": null,
          "next": "/graphql?query={getEvents(input:{page:2})}"
        },
        "meta": {
          "currentPage": 1,
          "from": 1,
          "lastPage": 10,
          "path": "/graphql",
          "perPage": 10,
          "to": 10,
          "total": 100
        }
      }
    }
  }
  ```
  
#### Mantenha simples!