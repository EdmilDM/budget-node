function user(parent, args, context) {
  return context.prisma.income({id: parent.id}).user();
};

module.exports = {
  user,
};
