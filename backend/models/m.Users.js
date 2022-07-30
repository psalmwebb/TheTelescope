const  sequelize  = require('sequelize');
const db = require('../connection');

const Users = db.define('tbl_users',{
    id: {
        primaryKey: true,
        type: sequelize.INTEGER,
        unique: true,
        autoIncrement: true
    },
    uuid: {
        type: sequelize.UUID,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize.STRING
    },
    username: {
        type: sequelize.STRING
    },
    firstname: {
        type: sequelize.STRING
    },
    lastname: {
        type: sequelize.STRING
    },
    phone: {
        type: sequelize.STRING
    }, 
    password: {
        type: sequelize.STRING
    },
    createdAt: {
        type: sequelize.DATE
    },
});

Users.sync({false: true})

module.exports = Users;