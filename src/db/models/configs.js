import Sequelize from 'sequelize';

const schema = {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    interest: {
        type: Sequelize.STRING
    },
    age_from: {
        type: Sequelize.INTEGER
    },
    age_to: {
        type: Sequelize.INTEGER
    }
};

export default schema;