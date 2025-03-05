const {Router} = require("express");
const  SubscriptionsController = require('../controllers/subscriptionsController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const subscriptionsRoutes = Router();
const subscriptionsController = new SubscriptionsController

subscriptionsRoutes.post("/", ensureAuthenticated, subscriptionsController.create);
subscriptionsRoutes.get("/", ensureAuthenticated, subscriptionsController.index);
subscriptionsRoutes.put("/:id", ensureAuthenticated, subscriptionsController.update);
subscriptionsRoutes.delete("/:id", ensureAuthenticated, subscriptionsController.delete);

module.exports = subscriptionsRoutes;