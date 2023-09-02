import express from "express";
import { getLanguages, getProjects, getProjectLanguages } from "./database.js";
import dotenv from "dotenv";
import path from "path";

const app = express();

const envPath = path.join(import.meta.url, "../.env").split(":")[1];
const result = dotenv.config({ path: envPath });
if (result.error) {
  throw result.error;
}

const port = process.env.API_PORT || 8080;

app.use(req, res, next) {
  if (process.env.ENVIRONMENT == "dev") {
    res.header("Access-Control-Allow-Origin", "*");
  } else {
    res.header("Access-Control-Allow-Origin", "https://abarrett.io");
  }
  next();
}

app.get("/", async function (_, res) {
  res.send("API server is working");
});

app.get("/languages", async (_, res) => {
  const languages = await getLanguages();
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
