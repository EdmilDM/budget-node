const {GraphQLServer} = require('graphql-yoga');
const appRoot = require('app-root-path');
const {prisma} = require(`${appRoot}/generated/prisma-client/index`);
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const User = require('./resolvers/user');
const Income = require('./resolvers/income');
const Expense = require('./resolvers/expense');

const resolvers = {
  Query,
  Mutation,
  User,
  Income,
  Expense,
};

const server = new GraphQLServer({
  typeDefs: `${appRoot}/config/schema.graphql`,
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
