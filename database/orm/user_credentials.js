import {sequelize} from './bd.js'
import {datatypes, model} from 'sequelize'

export class User_credentials extends Model {}

user_credentials.init({
    user_id:{
        type: DataTypes.INTEGER,
        primary_key: true,
        autoincrement: true
    },
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    }
},
{
sequelize,
createdAt: false,
updatedAt: false,
modelName: 'user_credentials'
});