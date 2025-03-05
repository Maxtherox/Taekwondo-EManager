const {Router} = require("express");
const UsersController = require('../controllers/usersController')
const UsersValidatedController = require("../controllers/UsersValidatedController");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router();
const usersValidatedController = new UsersValidatedController();
const usersController = new UsersController

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", usersController.index);
usersRoutes.get("/", usersController.update);
usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index);

module.exports = usersRoutes;