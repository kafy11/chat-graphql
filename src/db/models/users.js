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
        type: Sequelize.STRING(255),
        allowNull: false
    },
    password: {
        type: Sequelize.CHAR(32),
        allowNull: false
    },
    email: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    gender: {
        type: Sequelize.STRING,
    },
    date_birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    age: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    bio: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    location: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: true
    },
    distance: {
        type: Sequelize.DOUBLE(),
        allowNull:true,
    },
    visible: {
        type: Sequelize.INTEGER,
        defaultValue:1
    },
    photo: Sequelize.STRING(500),
    reset_pass: {
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
};

export default schema;