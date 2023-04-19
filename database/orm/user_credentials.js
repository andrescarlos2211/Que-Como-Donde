import {sequelize} from '../db.js'
import {DataTypes, Model} from 'sequelize'

export class User_credentials extends Model {}

User_credentials.init({
    email:{
        type: DataTypes.STRING(30),
        primaryKey: true,
        unique: true
    },
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(20),
        allowNull: false
    }
},
{
sequelize,
createdAt: false,
updatedAt: false,
modelName: 'user_credentials'
});