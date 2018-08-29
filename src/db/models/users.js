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
        type: Sequelize.CHAR(32),
        allowNull: false
    },
    email: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    gender: {
        type: Sequelize.STRING,
    },
    age: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    bio: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lat: {
        type: Sequelize.FLOAT(10, 6),
        allowNull: true
    },
    lon: {
        type: Sequelize.FLOAT(10, 6),
        allowNull: true
    },
    photo: Sequelize.STRING(500),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

export default schema;