import {Sequelize} from 'sequelize';
export const sequelize = new Sequelize(
    'QueComoDonde','admin','passwds3cur3',{
        host:'localhost',
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

