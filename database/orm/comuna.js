import { sequelize } from '../db.js';
import { Region } from './region.js';
import { Model, DataTypes } from 'sequelize';

export class Comunas extends Model {}

Comunas.init({
    comuna_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_comuna: {
        type: DataTypes.STRING,
        allowNull: false
    },
    region_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'comuna'
});

Region.hasMany(Comunas, { foreignKey: 'region_id' });
Comunas.belongsTo(Region, { foreignKey: 'region_id' });
