CREATE TABLE Users (
    ID INTEGER NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    password varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE Items (
    name varchar(255) NOT NULL,
    price varchar(255) NOT NULL
);


INSERT INTO Items (name, price) VALUES ('book',350);