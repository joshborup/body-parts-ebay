DROP TABLE IF EXISTS purchase_history;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS users;


CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

INSERT INTO users
    (username, password, email)
VALUES
    ('joshborup', '$2b$12$RB/PIoTvFlC0aRDerOMV8.mgzVlZEVfIiIM/O45XisN08z6jZz6Dm', 'joshborup@gmail.com');

CREATE TABLE inventory
(
    part_id SERIAL PRIMARY KEY,
    part_name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL,
    quality TEXT NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO inventory
    (part_name, price, quality, image)
VALUES
    ('pancreas', 7, 'D', 'http://pancreatic.org/wp-content/uploads/2015/06/Head_Body_Tail-02.jpg');

CREATE TABLE purchase_history
(
    purchase_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(user_id),
    part_id INTEGER REFERENCES inventory(part_id)
);

INSERT INTO purchase_history
    ( user_id, part_id)
VALUES
    ( 1, 1);

SELECT users.user_id, username, password, email, purchase_date, part_name, inventory.part_id, price, quality, image
FROM users JOIN purchase_history
    ON (users.user_id = purchase_history.user_id)
    JOIN inventory ON(purchase_history.part_id = inventory.part_id);