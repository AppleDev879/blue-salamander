import express from "express";
import { getLanguages, getProjects, getProjectLanguages } from "./database.js";
import "dotenv";
const app = express();

const port = process.env.API_PORT || 8080;
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

console.log(result.parsed);

app.get("/", async function (_, res) {
  res.send("API server is working");
});

app.get("/languages", async (_, res) => {
  const languages = await getLanguages();
  if (process.env.ENVIRONMENT || "" == "dev") {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.json(languages);
});

app.get("/projects", async (_, res) => {
  const projects = await getProjects();
  res.json(projects);
});

app.get("/project_languages", async (_, res) => {
  const projectLanguages = await getProjectLanguages();
  res.json(projectLanguages);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}
  `);
});
