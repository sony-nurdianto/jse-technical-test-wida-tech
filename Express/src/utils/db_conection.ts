import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sales_database','root','Kohend@789', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
})

export default sequelize;
