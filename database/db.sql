CREATE TABLE
    users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(16) NOT NULL,
        user_password VARCHAR(20) NOT NULL,
        fullname VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL
    );

CREATE TABLE
    publications(
        pub_id SERIAL PRIMARY KEY,
        pub_name VARCHAR(100) NOT NULL,
        pub_description VARCHAR(100) NOT NULL,
        user_id INT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
select regions.nombre_region as region, comunas.nombre_comuna from regions INNER JOIN comunas ON comunas.region_id = regions.region_id;
select nombre_region from regions;


SELECT nombre_comuna as ciudad FROM comunas WHERE region_id = 1;c