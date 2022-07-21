module.exports = (Sequelize, DataTypes) => {
  const Expense = Sequelize.define(
    "Expense",
    {
      date: {
        type: DataTypes.STRING,
      },
      itemName: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.STRING,
      },
    },
    { underScore: true }
  );

  Expense.associate = ({ User }) => {
    Expense.belongsTo(User, {
      foreignKey: {
        name: "userId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Expense;
};
