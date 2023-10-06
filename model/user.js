module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      username:{
        type: DataTypes.TEXT,
        allowNull:false,
      },
      email:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password:{
        type:DataTypes.TEXT,
        allowNull:false,
      },
      confirmPassword:{
        type: DataTypes.TEXT,
        allowNull:false,
      }, 
    });
    return User;
  };