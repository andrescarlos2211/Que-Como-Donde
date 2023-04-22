import {sequelize} from '../db.js'
import { DataTypes, Model} from 'sequelize';

export class Region extends Model {}

Region.init({
    region_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_region:{
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
sequelize,
createdAt: false,
updatedAt: false,
modelName: 'region'
});