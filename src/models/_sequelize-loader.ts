import { config } from 'dotenv';
import { Sequelize as BaseSequelize } from 'sequelize';

config();

const DATABASE_NAME = process.env['DATABASE_NAME'] ?? '';
const DATABASE_PASSWORD = process.env['DATABASE_PASSWORD'] ?? '';

const sequelize = new BaseSequelize('discord_db', DATABASE_NAME, DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

export const loader = {
    database: sequelize,
    Sequelize: BaseSequelize,
};
