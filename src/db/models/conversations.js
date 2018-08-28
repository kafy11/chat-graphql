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
    }
};

export default schema;