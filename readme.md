## GraphQL Learning Project

A simple hello world application for learning graphql.

play around with the [graphql endpoint](https://graphql-hello-world-ajet.herokuapp.com/graphql) or the [apollo studio](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fgraphql-hello-world-ajet.herokuapp.com%2Fgraphql&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIq6FHAA6eVSRRMAzvk5TXQwwJZgf1dm%2BJAENE-LkQA2yAOYoAFgHkAZgFUWeUeNoCGABwhMUbarskMUCAB4oJF3vYYBfe693OQzoA)

To run locally:

- prerequisites that are installed and in PATH
  - git
  - node.js
  - yarn
- clone this repository
- cd into the repository
- run `yarn install`
- run `yarn generate`
- run `yarn dev`

Tech Stack:

- [node.js](https://nodejs.org/en/) (runtime)
- [yarn](https://www.npmjs.com/package/yarn) (package manager)
- [express.js](https://www.npmjs.com/package/express) (http server)
- [apollo-server-express](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express) (graphql express middleware)
- [prisma](https://www.prisma.io/) (ORM)
- [sqlite](https://www.sqlite.org/index.html) (database) [temporary, will change]
- [graphql-codegen](https://www.graphql-code-generator.com/) (generate static types from graphql schema)
- [heroku](https://heroku.com) (cloud platform)
