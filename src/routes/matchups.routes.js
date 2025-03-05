const {Router} = require("express");

const MatchupsController = require("../controllers/matchupsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const matchupsRoutes = Router();
const matchupsController = new MatchupsController();


matchupsRoutes.get("/:championshipId", ensureAuthenticated, matchupsController.generate)

module.exports = matchupsRoutes;