import Sequelize from 'sequelize';

const schema = {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    from: {
        type: Sequelize.INTEGER(2),
        allowNull: false
    },
    to: {
        type: Sequelize.INTEGER(2),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

export default schema;