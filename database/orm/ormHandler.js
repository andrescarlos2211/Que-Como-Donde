import { sequelize } from '../db.js'
import { User_credentials } from './user_credentials.js'
import { Publications } from './publications.js'
import { QueryTypes } from 'sequelize';

export async function syncTables() {
    try {
        await sequelize.sync();
        console.log('Tables sucessfully sync')
    }
    catch (error) {
        console.log('Error synchronizing tables', error);
    }
};
export async function createUser(_email, _username, _password, _profilepic, _isadmin) {
    try {
    const newuser = await User_credentials.create({
        username: _username,
        password: _password,
        email: _email,
        profilepic: _profilepic,
        isadmin: _isadmin
    })
    return newuser
}
catch (error){
    console.log(error)
}}


export async function emailExists(email) {
    const mail = await User_credentials.query('SELECT email FROM user_credentials WHERE email=$1',
        {
            bind: [email],
            type: QueryTypes.SELECT,
        });
    let count = 0;
    const filteredMail = mail.filter(element => element.email === email);
    if (filteredMail.length > 0) {
        console.log('Email exists');
    }
    else {
        console.log('Email does not exist');
    }
}

//Parametros de usuario segun user id

export async function profiledata(userid) {
    try {
      const users = await User_credentials.findAll({
        where: { user_id: userid },
        raw: true
      });
      return users;
    } catch (error) {
      console.log('Error getting users', error);
    }
  }

//obtener listado de usuarios

export async function getUser(username) {
    try {
        let users = await sequelize.query
            ("SELECT email as username,password, isadmin, user_id, profilepic, username as nameuser FROM user_credentials where email = $1 LIMIT 10",
                {
                    bind: [username],
                    type: QueryTypes.SELECT
                });
        return users;
    }
    catch (error) {
        console.log('Error getting users', error);
    }
}


//Funcion creadora de publicaciones

export async function createPublication(_publication_name, _publication_price,
    _publication_description, _region_id, _comuna_id, _keyword1, _keyword2,
    _publication_qty, _user_id, _imgdir) {
    try {
        const publ = await Publications.create({
            publication_name: _publication_name,
            publication_price: _publication_price,
            publication_description: _publication_description,
            region_id: _region_id,
            comuna_id: _comuna_id,
            keyword1: _keyword1,
            keyword2: _keyword2,
            publication_qty: _publication_qty,
            user_id: _user_id,
            imgdir: _imgdir,
        })
    }
    catch (error) {
        console.log(error);
    }
}

export async function getpublications(_query) {
    try {
        let users = await sequelize.query
            ("SELECT publication_name FROM publications where email = $1 LIMIT 10",
                {
                    bind: [username],
                    type: QueryTypes.SELECT
                });
        return users;
    }
    catch (error) {
        console.log('Error getting users', error);
    }
};

export async function creaRegion(_nombre_region) {
    try {
        let publ = await Region.create({
            nombre_region: _nombre_region
        })
    }
    catch (e) {
        console.log(e);
    }
};

export async function creaComuna(_nombre_comuna, _region_id) {
    try {
        let publ = await Comuna.create({
            nombre_comuna: _nombre_comuna,
            region_id: _region_id,

        })
    }
    catch (e) {
        console.log(e);
    }
};