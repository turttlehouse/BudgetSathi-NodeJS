module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define("income", {
      SourceOfIncome:{
        type: DataTypes.TEXT,
        allowNull:false,
      },
      Amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Date:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      Remarks:{
        type: DataTypes.TEXT,
        allowNull:false,
      }, 
    });
    return Income;
  };