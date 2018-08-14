import Sequelize from 'sequelize';

const schema = {
    id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    person_name: {
        type: Sequelize.STRING(155),
        allowNull: false
    },
    person_email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    person_photo: Sequelize.STRING(500),
    status: {
        type: Sequelize.STRING(45),
        default:'invited'
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

export default schema;