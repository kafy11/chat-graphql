import Sequelize from 'sequelize';

const schema = {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
};

export default schema;