const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name:{//allowNull es porque es obligatorio
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex' // la combinacion de name y mana_cost es unico
    },
    description:{
      type: DataTypes.STRING,
    },
    mana_cost:{
     type: DataTypes.FLOAT,
     allowNull: false,
     unique: 'compositeIndex',  // la combinacion de name y mana_cost es unico
     validate:{
     min: 10.0,
     max: 250.0
    }
    },
    summary:{
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${this.mana_cost} points of mana) - Description: ${this.description}`;
      }
    }
  })
}