import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    typeCast: function castField(field, useDefaultTypeCasting) {
      // We only want to cast bit fields that have a single-bit in them. If the field
      // has more than one bit, then we cannot assume it is supposed to be a Boolean.
      if (field.type === "BIT" && field.length === 1) {
        var bytes = field.buffer();

        // A Buffer in Node represents a collection of 8-bit unsigned integers.
        // Therefore, our single "bit field" comes back as the bits '0000 0001',
        // which is equivalent to the number 1.
        return bytes[0] === 1;
      }

      return useDefaultTypeCasting();
    },
  })
  .promise();

async function getProjects() {
  const [rows] = await pool.query(`
select projects.id, projects.title, projects.content, projects.link, GROUP_CONCAT(languages.name SEPARATOR ', ') AS languages from projects left outer join project_langauge_relation on projects.id = project_langauge_relation.project_id left outer join languages on languages.id
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

// TODO: experiences
// async function getExperiences() {
//   const [rows] = await pool.query(`
//   SELECT *
//   `);
// }

async function getLanguages() {
  const [rows] = await pool.query(`
  select name,photo_url,display_name from languages where display_order IS
 NOT NULL ORDER BY display_order ASC `);
  return rows;
}

export { getLanguages, getProjects, getProjectLanguages };
