const express = require("express");
require("dotenv").config();
const { projectController } = require("../controllers/projects.controller");

const projectRouter = express.Router();

projectRouter.get("/", projectController.getprojects);

projectRouter.post("/addproject", projectController.addProject);

projectRouter.patch("/update/:id", projectController.update);

projectRouter.get("/details",projectController.dashboard);

module.exports = {
  projectRouter,
};
