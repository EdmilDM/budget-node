const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const utils = require('../utils');

function postExpense(root, args, context, info) {
  const userId = utils.requestAuth(context);
  return context.prisma.createExpense({
    user: {connect: {id: userId}},
    amount: args.amount,
    type: args.type,
    description: args.description,
    date: new Date().toString(),
  });
};

function postIncome(root, args, context, info) {
  const userId = utils.requestAuth(context);
  return context.prisma.createIncome({
    user: {connect: {id: userId}},
    amount: args.amount,
    description: args.description,
    date: new Date().toString(),
  });
};

async function deleteUser(root, args, context, info) {
  utils.requestAuth(context);
  return await context.prisma.deleteUser({id: args.id});
};

async function deleteExpense(root, args, context, info) {
  utils.requestAuth(context);
  return await context.prisma.deleteExpense({id: args.id});
};

async function deleteIncome(root, args, context, info) {
  utils.requestAuth(context);
  return await context.prisma.deleteIncome({id: args.id});
};

async function signup(root, args, context, info) {
  const password = await bcrypt.hash(args.password, 16);
  const user = await context.prisma.createUser({username: args.username,
    password: password});
  const token = jwt.sign({userId: user.id}, env.APP_SECRET);
  return {
    token,
    user,
  };
};

async function login(root, args, context, info) {
  const user = await context.prisma.user({username: args.username});
  if (!user) {
    throw new Error('Invalid username or password.');
  }
  const validate = await bcrypt.compare(args.password, user.password);
  if (!validate) {
    throw new Error('Invalid username or password.');
  }
  const token = jwt.sign({userId: user.id}, env.APP_SECRET);
  return {
    token,
    user,
  };
};

module.exports = {
  signup,
  login,
  deleteUser,
  deleteExpense,
  deleteIncome,
  postExpense,
  postIncome,
};
