const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      validate:{
        validateCode(value) {
          if(value.toLowerCase() === 'henry'){
            throw new Error('El codigo no puede ser Henry');
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notIn: ["Henry", "SoyHenry" , "Soy Henry"]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      get(){
        var age = this.getDataValue('age'); 
        return age === null ? null : `${this.getDataValue('age')} years old`;
      }
    },
    race:{
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: 'Other'
    },
    hp: {//allowNull es porque es obligatorio
      type: DataTypes.FLOAT,
      allowNull: false
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  },
    {// esto es para quitar los timestamps createdAt y updatedAt de la tabla
      timestamps: false,
    
  })
}