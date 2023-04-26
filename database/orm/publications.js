import { sequelize } from '../db.js'
import { DataTypes, Model } from 'sequelize'
import { User_credentials } from './user_credentials.js';
import { Region } from './region.js'; // solo se importa la clase Region
import { Comunas } from './comuna.js';

export class Publications extends Model { }

Publications.init({
    publication_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    publication_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    publication_price: {
        type: DataTypes.INTEGER
    },
    publication_description: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    keyword1: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    keyword2: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    publication_qty: {
        type: DataTypes.INTEGER
    },
    region_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comuna_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'publications'
});

User_credentials.hasMany(Publications, { foreignKey: 'user_id' });
Publications.belongsTo(User_credentials, { foreignKey: 'user_id' });

Region.hasMany(Publications, { foreignKey: 'region_id' });
Publications.belongsTo(Region, { foreignKey: 'region_id' });

Comunas.hasMany(Publications, { foreignKey: 'comuna_id' });
Publications.belongsTo(Region, { foreignKey: 'comuna_id' });

