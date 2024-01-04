const express = require("express");
const router = express.Router();

const songsController=require('../controller/songController')

router.post("/add", songsController.addSong);
router.get("/get", songsController.getAllSongs);
router.delete("/delete/:id", songsController.deleteSong);
router.post("/update/:id", songsController.updateSong);


const songListController=require('../controller/songListController')
//song list
router.get('/my-list', songListController.getAllSongLists);
router.post('/createList', songListController.createSongList);
router.post('/my-list/:id/add-song', songListController.addSongToSongList);
router.delete('/my-list/delete/:id', songListController.getAllSongLists);
module.exports = router;