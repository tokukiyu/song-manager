const express = require("express");
const router = express.Router();

const songsController=require('../controller/songController')

router.post("/add", songsController.addSong);
router.get("/get", songsController.getAllSongs);
router.delete("/delete/:id", songsController.deleteSong);
router.post("/update/:id", songsController.updateSong);

module.exports = router;