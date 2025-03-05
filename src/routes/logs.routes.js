const {Router} = require("express");
const  LogsController = require('../controllers/logsController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const logsRoutes = Router();
const logsController = new LogsController

logsRoutes.post("/", logsController.create);
logsRoutes.get("/", logsController.index);
logsRoutes.put("/:id", logsController.update);
logsRoutes.delete("/:id", logsController.delete);

module.exports = logsRoutes;