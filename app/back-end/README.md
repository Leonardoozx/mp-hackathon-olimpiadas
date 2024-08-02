# Olympic Games 2024

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)]()

## Overview

"Olympic Games 2024" is a microservice developed to provide information about Olympic events. The service exposes APIs using GraphQL, REST, and gRPC for interacting with event data.

## Architecture

The project follows a hexagonal architecture, also known as ports and adapters architecture. This pattern aims to create loosely coupled application components that can be easily connected to the software environment through ports and adapters, facilitating component replacement and test automation.

## Basic Structure

**domain**

 - `use-cases`: Business logic.
 - `services`: Apply use cases to build results.
 
**interfaces**

 - Defines contracts.

**controllers**

 - Entry point to the domain. Applies input validation and cache handling (if needed).

**adapters**

 - Class that transforms (adapts) one interface to another.

**app**

 - Application boundary. I/O should be configured here.

## Deploy

The project can be run locally or in a Docker container. To run the service, follow the instructions below:

### Run Locally

1. **Install dependencies and start the service:**

    ```bash
    make install
    make start-http
    ```

    The service will be available at http://localhost:4000/graphql.

    Check if it is working:

    ```bash
    curl --location -g --request GET 'http://localhost:4000/graphql?query={health(input:{name:%22Foobar%22}){message}}'
    Expected response:
    ```

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

## Docker container

```bash
make docker-build
```

Run the Docker container:

```bash
make docker-run
```
The service will be available on the ports specified in the Makefile (default: 4000 for GraphQL and 50051 for gRPC).

## Useful Commands

Run tests:
```bash
make run-tests
```

Run build:
```bash
make build
```

Run the linter:
```bash
npm run lint
```

## APIs
### GraphQL

- Query: GetEvents

  ```
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

  Payload example:

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

  Response example:

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
            "name": "Men's Basketball Final",
            "venueName": "Stadium",
            "eventName": "Final",
            "detailedEventName": "Men's Basketball Final",
            "startDate": "2024-08-01T10:00:00Z",
            "endDate": "2024-08-01T12:00:00Z",
            "status": "Scheduled",
            "isMedalEvent": 1,
            "isLive": 0,
            "competitors": [
              {
                "countryId": "USA",
                "countryFlagUrl": "https://example.com/flags/usa.png",
                "competitorName": "John Doe",
                "position": 1,
                "resultPosition": "Gold",
                "resultWinnerLoserTie": "Win",
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

#### Keep it simple!