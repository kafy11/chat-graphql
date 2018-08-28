import Sequelize from 'sequelize';

const schema = {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_liked_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

export default schema;