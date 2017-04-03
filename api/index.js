const Router = require("express").Router;
const router = new Router();

// load post api routes
require("./post.js")(router);

module.exports = router;