const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_db", "root", "", {
    dialect: "mysql",
    host: "localhost"
});

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tag: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    sex: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    avatarId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
});

module.exports = User;