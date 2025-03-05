const {Router} = require("express");
const  CompetitorsController = require('../controllers/competitorsController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const competitorsRoutes = Router();
const competitorsController = new CompetitorsController

competitorsRoutes.post("/", ensureAuthenticated, competitorsController.create);
competitorsRoutes.get("/", ensureAuthenticated, competitorsController.index);
competitorsRoutes.get("/:id", ensureAuthenticated, competitorsController.show);
competitorsRoutes.put("/:id", ensureAuthenticated, competitorsController.update);
competitorsRoutes.delete("/:id", ensureAuthenticated, competitorsController.delete);

module.exports = competitorsRoutes;