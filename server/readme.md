## Ajet chat

A web based communication platform.

### Usage

[Live demo](https://ajet-chat-dev.herokuapp.com/) or [the graphql endpoint/playground](https://ajet-chat-dev.herokuapp.com/graphql).

### Screenshot

![image](https://user-images.githubusercontent.com/45019515/157102297-c5915a58-2a85-486a-b29e-cf4017403fe5.png)

### To run locally

- prerequisites that are installed and in PATH
  - git
  - node.js
  - yarn
- clone this repository
- cd into the repository
- run `yarn install`
- run `yarn dev`

### Tech Stack

- [node.js](https://nodejs.org/en/) (runtime)
- [yarn](https://www.npmjs.com/package/yarn) (package manager)
- [express.js](https://www.npmjs.com/package/express) (http server)
- [apollo-server-express](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express) (graphql express middleware)
- [prisma](https://www.prisma.io/) (ORM)
- [sqlite](https://www.sqlite.org/index.html) (database) [temporary, will change]
- [graphql-codegen](https://www.graphql-code-generator.com/) (generate static types from graphql schema)
- [heroku](https://heroku.com) (cloud platform)
