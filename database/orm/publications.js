import {sequelize} from '../db.js'
import {DataTypes, Model} from 'sequelize'
import { User_credentials } from './user_credentials.js';

export class Publications extends Model {}

Publications.init({
    publication_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    publication_name:{
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    publication_price:{
        type: DataTypes.INTEGER
    },
    publication_DESCRIPTION:{
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
},
{
sequelize,
createdAt: false,
updatedAt: false,
modelName: 'publications'
});

User_credentials.hasMany(Publications, {foreignKey: 'user_id' },
{foreignKey: 'user_id'}
);
Publications.belongsTo(User_credentials, {foreignKey: 'user_id'}
);