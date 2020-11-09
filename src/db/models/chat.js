import Sequelize from 'sequelize';

const chatModel = {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    }
};

export default chatModel;
