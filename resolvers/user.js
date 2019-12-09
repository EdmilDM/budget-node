function expenses(parent, args, context) {
  return context.prisma.user({id: parent.id}).expenses();
};

function income(parent, args, context) {
  return context.prisma.user({id: parent.id}).income();
};

module.exports = {
  expenses,
  income,
};
