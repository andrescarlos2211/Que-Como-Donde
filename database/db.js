import {Sequelize} from 'sequelize';
export const sequelize = new Sequelize(
    'quecomodonde','admin','cEdzl9zld7Jg5lgTmBqVKwpPz4YWRtMU',{
        host:'dpg-chc2jbe7avjcvo1sh8rg-a.postgres.renderer-staging.com',
        dialect:'postgres',
        // logging: false,
        pool: {
          max: 10000,
          min: 1,
          acquire: 30000,
          idle: 10000
        }
});

export async function testConnection(){
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

