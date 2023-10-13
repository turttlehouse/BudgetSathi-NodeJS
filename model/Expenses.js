module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define("expense", {
      ExpenseCategory:{
        type: DataTypes.TEXT,
        allowNull:false,
      },
      Amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Date:{
        type:DataTypes.DATE,
        allowNull:false,
      },
      Remarks:{
        type: DataTypes.TEXT,
        allowNull:false,
      }, 
    });
    return Expense;
  };