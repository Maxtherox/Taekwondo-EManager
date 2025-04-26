const {Router} = require("express");
const usersRouter = require("./users.routes");
const competitorsRouter = require("./competitors.routes");
const subscriptionsRouter = require("./Subscriptions.routes");
const logsRouter = require("./logs.routes")
const championshipsRouter = require("./championships.routes");
const sessionsRouter = require("./sessions.routes");
const matchupsRouter = require("./matchups.routes");
const postsRouter = require("./posts.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/competitors", competitorsRouter);
routes.use("/subscriptions", subscriptionsRouter);
routes.use("/logs", logsRouter);
routes.use("/championships", championshipsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/matchups", matchupsRouter);
routes.use("/posts", postsRouter); // Define o prefixo da rota como /posts


module.exports = routes;