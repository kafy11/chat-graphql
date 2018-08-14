import Sequelize from 'sequelize';

const schema = {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    fantasy_name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    cnpj: {
        type: Sequelize.INTEGER(14),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    address: Sequelize.STRING(255),
    active: {
        type: Sequelize.INTEGER,
        default: 0
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

export default schema;