function user(parent, args, context) {
  return context.prisma.expense({id: parent.id}).user();
};

module.exports = {
  user,
};
