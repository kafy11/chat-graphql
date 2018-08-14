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
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    photo: Sequelize.STRING(500),
    facebook_id: {
        type: Sequelize.INTEGER,
        default: 0
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

export default schema;