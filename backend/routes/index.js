const router = require("express").Router();
const videoRoute = require("./video.route");
console.log('In routes');
router.use("/videos", videoRoute);

module.exports = router;