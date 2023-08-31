import express from "express";
import { getLanguages, getProjects, getProjectLanguages } from "./database.js";

const app = express();

app.get("/languages", async (_, res) => {
  const languages = await getLanguages();
  res.header("Access-Control-Allow-Origin", "*");
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

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
