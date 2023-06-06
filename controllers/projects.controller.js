const { projectModel } = require("../models/projects.model");

const projectController = {
  getprojects: async (req, res) => {
    const { page, sort, search } = req.query;
    try {
      if (page != undefined && sort != undefined && search != undefined) {
        if (page == 1) {
          const projects = await projectModel
            .find({
              $or: [
                { Projectname: { $regex: search } },
                { Reason: { $regex: search } },
                { Type: { $regex: search } },
                { Category: { $regex: search } },
                { Priority: { $regex: search } },
                { Department: { $regex: search } },
                { Location: { $regex: search } },
                { Status: { $regex: search } },
                { Startdate: { $regex: search } },
                { EndDate: { $regex: search } },
              ],
            })
            .skip(0)
            .limit(10)
            .sort({ [sort]: -1 })
            .collation({ locale: "en", caseLevel: true });
          res.status(200).send(projects);
        } else {
          const projects = await projectModel
            .find({
              $or: [
                { Projectname: { $regex: search } },
                { Reason: { $regex: search } },
                { Type: { $regex: search } },
                { Category: { $regex: search } },
                { Priority: { $regex: search } },
                { Department: { $regex: search } },
                { Location: { $regex: search } },
                { Status: { $regex: search } },
                { Startdate: { $regex: search } },
                { EndDate: { $regex: search } },
              ],
            })
            .skip((page - 1) * 10)
            .limit(10)
            .sort({ [sort]: -1 })
            .collation({ locale: "en", caseLevel: true });
          res.status(200).send(projects);
        }
      } else if (
        page != undefined &&
        sort != undefined &&
        search == undefined
      ) {
        if (page == 1) {
          const projects = await projectModel
            .find()
            .skip(0)
            .limit(10)
            .sort({ [sort]: 1 })
            .collation({ locale: "en", caseLevel: true });
          res.status(200).send(projects);
        } else {
          const projects = await projectModel
            .find()
            .skip((page - 1) * 10)
            .limit(10)
            .sort({ [sort]: 1 })
            .collation({ locale: "en", caseLevel: true });
          res.status(200).send(projects);
        }
      } else {
        res.status(200).send({
          Success: "false",
          Message: "Page and search both query should present",
        });
      }
    } catch (err) {
      res.status(404).send({
        Success: "false",
        Message: "Error connecting api",
      });
    }
  },
  addProject: async (req, res) => {
    try {
      const data = req.body;

      if (data.length < 10 || data.length > 10) {
        return res.status(404).send({
          Success: "false",
          Message: "Error in request body",
        });
      }

      const project = new projectModel(data);
      await project.save();

      res.send({
        Status: "true",
        Message: "New project added successfully",
      });
    } catch (err) {
      res.send({
        Success: "false",
        Message: "Error connecting api",
      });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    try {
      await projectModel.findByIdAndUpdate({ _id: id }, payload);
      res.status(200).send({
        Status: "true",
        Message: "Project updated successfully",
      });
    } catch (err) {
      res.status(404).send({
        Success: "false",
        Message: "Error connecting api",
      });
    }
  },
  dashboard: async (req, res) => {
    try {
      const total = await projectModel.count();
      const completed = await projectModel.count({ Status: "Running" });
      const closed = await projectModel.count({ Status: "Closed" });
      const cancelled = await projectModel.count({ Status: "Cancelled" });
      const registered = await projectModel.count({ Status: "Registered" });
      const Strategyo = await projectModel.count({
        Department: "Strategy",
        Status: "Running",
      });
      const Financeo = await projectModel.count({
        Department: "Finance",
        Status: "Running",
      });
      const Qualityo = await projectModel.count({
        Department: "Quality",
        Status: "Running",
      });
      const Manufacturingo = await projectModel.count({
        Department: "Manufacturing",
        Status: "Running",
      });
      const STOo = await projectModel.count({
        Department: "STO",
        Status: "Running",
      });
      const HRo = await projectModel.count({
        Department: "HR",
        Status: "Running",
      });

      const Strategyc = await projectModel.count({
        Department: "Strategy",
        Status: "Closed",
      });
      const Financec = await projectModel.count({
        Department: "Finance",
        Status: "Closed",
      });
      const Qualityc = await projectModel.count({
        Department: "Quality",
        Status: "Closed",
      });
      const Manufacturingc = await projectModel.count({
        Department: "Manufacturing",
        Status: "Closed",
      });
      const STOc = await projectModel.count({
        Department: "STO",
        Status: "Closed",
      });
      const HRc = await projectModel.count({
        Department: "HR",
        Status: "Closed",
      });
      const delay=0;

      const details = {
        scrollbar:[total,closed,completed,delay,cancelled],
        total: total,
        completed: completed,
        closed: closed,
        cancelled: cancelled,
        registered: registered,
        delay: 0,
        chartdata: [Strategyo, Financeo, Qualityo, Manufacturingo, STOo, HRo],
        chartdataclosed: [
          Strategyc,
          Financec,
          Qualityc,
          Manufacturingc,
          STOc,
          HRc,
        ],
      };
      res.status(200).send(details);
    } catch (err) {
      res.status(404).send({
        Success: "false",
        Message: "Error connecting api",
      });
    }
  },
};

module.exports = { projectController };
