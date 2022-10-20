import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
const { USERNAMEE = '' } = process.env;
const sequelize = new Sequelize('database', USERNAMEE, 'password', {
    host: 'localhost',
    dialect: 'mysql',
});
