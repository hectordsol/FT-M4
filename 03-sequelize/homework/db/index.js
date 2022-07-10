const { Sequelize, Op } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize('postgres://postgres:postgresql@localhost:5432/henry_sequelize', {
  logging: false,
});

modelCharacter(db);
modelAbility(db);
modelRole(db);

// importamos los modelos de la base de datos
const { Character, Ability, Role } = db.models;

// 1 character tiene muchas ability
Character.hasMany(Ability);
Ability.belongsTo(Character);

// Muchos roles pueden tener muchos characters (conexion ida y vuelta)
Character.belongsToMany(Role, { through: 'Character_Role' });
Role.belongsToMany(Character, { through: 'Character_Role' });

module.exports = {
  ...db.models,
  db,
  Op
}