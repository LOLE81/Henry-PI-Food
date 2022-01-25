const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER
    },
    healthScore: {
      type: DataTypes.INTEGER 
    },
    steps: {
      type: DataTypes.STRING
    },
    // createdInDb: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false,
    //     defaultValue: true
    // }
  });
};
