const {GraphQLServer} = require('graphql-yoga');
const appRoot = require('app-root-path');
const {prisma} = require(`${appRoot}/generated/prisma-client/index`);

const resolvers = {
  Query: {
    users: async (root, args, context, info) => {
      return context.prisma.users();
    },
    expenses: (root, args, context, info) => {
      return context.prisma.expenses();
    },
    incomes: (root, args, context, info) => {
      return context.prisma.incomes();
    },
  },
  Mutation: {
    postUser: (root, args, context, info) => {
      return context.prisma.createUser({
        username: args.username,
        password: args.password,
      });
    },
    postExpense: (root, args, context, info) => {
      return context.prisma.createExpense({
        user: {connect: {id: args.user}},
        amount: args.amount,
        type: args.type,
        description: args.description,
        date: new Date().toString(),
      });
    },
    postIncome: (root, args, context, info) => {
      return context.prisma.createIncome({
        user: {connect: {id: args.user}},
        amount: args.amount,
        description: args.description,
        date: new Date().toString(),
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: `${appRoot}/config/schema.graphql`,
  resolvers,
  context: {prisma},
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
