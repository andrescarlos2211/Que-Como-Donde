CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    user_password VARCHAR(20) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL
);


CREATE TABLE publications(
    pub_id SERIAL PRIMARY KEY,
    pub_name VARCHAR(100) NOT NULL,
    pub_description VARCHAR(100) NOT NULL,
    user_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
