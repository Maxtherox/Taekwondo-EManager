const {Router} = require("express");
const  ChampionshipController = require('../controllers/championshipController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const championshipRoutes = Router();
const campionshipController = new ChampionshipController

championshipRoutes.post("/", ensureAuthenticated, campionshipController.create);
championshipRoutes.get("/", ensureAuthenticated, campionshipController.index);
championshipRoutes.get("/:id", ensureAuthenticated, campionshipController.show);
championshipRoutes.put("/:id", ensureAuthenticated, campionshipController.update);
championshipRoutes.delete("/:id", ensureAuthenticated, campionshipController.delete);

module.exports = championshipRoutes;