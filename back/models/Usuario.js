const {Sequelize, sequelize} = require('./database');

class Usuario extends Sequelize.Model {};

Usuario.init({
    matricula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cargo: {
        type: Sequelize.ENUM('admin', 'dev', 'programmer')
    }
},{
    sequelize,
    modelName: 'TesteSistema',
    tableName: 'usuario',
    timestamps: false
});

module.exports = Usuario;