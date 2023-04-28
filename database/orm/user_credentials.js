import {sequelize} from '../db.js'
import {DataTypes, Model} from 'sequelize'

export class User_credentials extends Model {}

User_credentials.init({
    user_id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    email:{
        type: DataTypes.STRING(30),
        allowNull: false,
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
    },
    profilepic:{
        type: DataTypes.STRING,
        allowNull: true
    },
},
{
sequelize,
createdAt: false,
updatedAt: false,
modelName: 'user_credentials'
});