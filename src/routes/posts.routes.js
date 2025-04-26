// src/routes/posts.routes.js
const { Router } = require("express");
const PostsController = require('../controllers/PostsController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization"); // Middleware de autorização

const postsRoutes = Router();
const postsController = new PostsController();

// Definindo quais roles podem acessar/modificar posts
const adminOnly = verifyUserAuthorization(["admin"]); // Somente admin pode gerenciar posts

// Rotas Públicas (ou apenas para usuários logados)
// Qualquer usuário logado pode listar e ver posts
postsRoutes.get("/", ensureAuthenticated, postsController.index);
postsRoutes.get("/:id", ensureAuthenticated, postsController.show);

// Rotas Restritas (Admin)
// Somente admins podem criar, atualizar e deletar posts
postsRoutes.post("/", ensureAuthenticated, adminOnly, postsController.create);
postsRoutes.put("/:id", ensureAuthenticated, adminOnly, postsController.update);
postsRoutes.delete("/:id", ensureAuthenticated, adminOnly, postsController.delete);


module.exports = postsRoutes;