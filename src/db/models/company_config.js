import Sequelize from 'sequelize';

const schema = {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    logo: Sequelize.STRING(500),
    background: Sequelize.STRING(500),
    type: {
        type: Sequelize.STRING(45),
        default:'limit'
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

export default schema;