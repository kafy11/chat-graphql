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
        type: Sequelize.STRING
    },
    path : {
        type: Sequelize.STRING
    },
    type : {
        type: Sequelize.STRING
    }
};

export default schema;