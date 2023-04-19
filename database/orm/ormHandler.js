import {sequelize} from '../db.js'
import { User_credentials } from './user_credentials.js'
import { Publications } from './publications.js'

export async function syncTables(){
    try{
        await sequelize.sync();
        console.log('Tables sucessfully sync')
    }
    catch (error){
        console.log('Error synchronizing tables', error);
    }
};
export async function createUser(_username, _password, _email){
    const newuser = await User_credentials.create({
        username: _username,
        password: _password,
        email: _email
    })
};
export async function createPublication (_publication_name, _publication_price, _publication_description, _product){
    const publ = await Publications.create({
        publication_name_: _publication_name,
        publication_price: _publication_price,
        publication_description: _publication_description,
        product: _product
    })
}