import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getLanguages() {
  const [rows] = await pool.query("SELECT name, id FROM languages");
  return rows;
}

async function getProjects() {
  const [rows] = await pool.query(`
select projects.id, projects.title, projects.content, GROUP_CONCAT(languages.name SEPARATOR ', ') AS languages from projects left outer join project_langauge_relation on projects.id = project_langauge_relation.project_id left outer join languages on languages.id
= project_langauge_relation.language_id GROUP BY projects.id;
`);
  return rows;
}

async function getProjectLanguages() {
  const [rows] = await pool.query(`
    select * from project_langauge_relation;
    `);
  return rows;
}

async function getExperiences() {
  const [rows] = await pool.query(`
  SELECT * 
  `);
}

export { getLanguages, getProjects, getProjectLanguages };
