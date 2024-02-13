import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('your_database','name','password', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
})

export default sequelize;
