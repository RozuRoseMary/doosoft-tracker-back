module.exports = (Sequelize, DataTypes) => {
  const Income = Sequelize.define(
    "Income",
    {
      date: {
        type: DataTypes.STRING,
      },
      itemName: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    { underScore: true }
  );

  Income.associate = ({ User }) => {
    Income.belongsTo(User, {
      foreignKey: {
        name: "userId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Income;
};
