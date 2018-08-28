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
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user2_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

export default schema;