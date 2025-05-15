const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'events_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'root',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mariadb',
        logging: false,
        dialectOptions: {
            connectTimeout: 60000,
            options: {
                requestTimeout: 30000
            },
            mariadb: {
                auth: {
                    type: 'mysql_native_password'
                }
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize; 