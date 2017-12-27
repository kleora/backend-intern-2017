const Router = require("express").Router;
const router = new Router();

// load post api routes
require("./post.js")(router);
require("./comment.js")(router);

module.exports = router;