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
    publication_description:{
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    product:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    publication_ubication:{
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    keyword1:{
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    keyword2:{
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    publication_qty:{
        type: DataTypes.INTEGER
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
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