import {sequelize} from '../db.js'
import { User_credentials } from './user_credentials.js'
import { Publications } from './publications.js'
import {QueryTypes} from 'sequelize';
import postgres from 'postgres';

export async function syncTables(){
    try{
        await sequelize.sync();
        console.log('Tables sucessfully sync')
    }
    catch (error){
        console.log('Error synchronizing tables', error);
    }
};
export async function createUser( _email,_username, _password){
    const newuser = await User_credentials.create({
        username: _username,
        password: _password,
        email: _email
    })
};
 
export async function emailExists(email) {
    const mail = await sequelize.query('SELECT email FROM user_credentials WHERE email=$1', 
    {
        bind: [email],
        type: QueryTypes.SELECT,
    });  
    let count = 0;
    const filteredMail = mail.filter(element=>element.email === email);
    if (filteredMail.length > 0){
        console.log('Email exists');
    }
    else {
        console.log('Email does not exist');
    }
}




export async function createPublication (_publication_name, _publication_price, 
_publication_description, _product){

    const publ = await Publications.create({

        publication_name_: _publication_name,
        publication_price: _publication_price,
        publication_description: _publication_description,
        product: _product

    })
}

