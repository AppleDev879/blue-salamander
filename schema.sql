CREATE DATABASE my_portfolio;
USE my_portfolio;

CREATE TABLE languages (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    photo_url TEXT,
    display_order INT  
);

INSERT INTO languages (name) VALUES ('Flutter');
INSERT INTO languages (name) VALUES ('Dart');

CREATE TABLE projects (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(400) NOT NULL,
    content VARCHAR(2000) NOT NULL
);

INSERT INTO projects (title, content) VALUES ('Discord Bot', '<p>Use a slash-command to show the prices of equities.</p>');

CREATE TABLE project_langauge_relation(
    project_id integer NOT NULL,
    language_id integer NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (language_id) REFERENCES languages(id),
    UNIQUE (project_id, language_id)
);

INSERT INTO project_langauge_relation (project_id, language_id) VALUES(1, 1);
INSERT INTO project_langauge_relation (project_id, language_id) VALUES(1, 2);

CREATE TABLE skills (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(400) NOT NULL,
    content VARCHAR(2000) NOT NULL
);