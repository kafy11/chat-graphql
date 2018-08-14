import Sequelize from 'sequelize';

const schema = {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: Sequelize.STRING(90),
    image: Sequelize.STRING(500),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

export default schema;