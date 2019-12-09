const utils = require('../utils');

function users(root, args, context, info) {
  utils.requestAuth(context);
  return context.prisma.users();
};

function expenses(root, args, context, info) {
  utils.requestAuth(context);
  return context.prisma.expenses();
};

function incomes(root, args, context, info) {
  utils.requestAuth(context);
  return context.prisma.incomes();
};

module.exports = {
  users,
  expenses,
  incomes,
};
