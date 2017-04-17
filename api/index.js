const Router = require("express").Router;
const router = new Router();

/** @Represent load post api routes */
require("./post.js")(router);

module.exports = router;