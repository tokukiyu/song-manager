const SongList = require('../model/songList');

exports.getAllSongLists = async (req, res) => {
  try {
    const songLists = await SongList.find({ user: req.userId }).populate('songList');
    res.json(songLists);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createSongList = async (req, res) => {
  try {
    const { songList } = req.body;
    const newSongList = new SongList({ user: req.userId, songList });
    await newSongList.save();
    res.status(201).json(newSongList);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addSongToSongList = async (req, res) => {
  try {
    const { songId } = req.body;
    const songListId = req.params.id;

    const updatedSongList = await SongList.findByIdAndUpdate(
      songListId,
      { $push: { songList: songId } },
      { new: true }
    ).populate('songList');

    if (updatedSongList) {
      res.json(updatedSongList);
    } else {
      res.status(404).json({ error: 'Song list not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removeSongFromSongList = async (req, res) => {
    try {
      const { songId } = req.body;
      const songListId = req.params.id;
  
      const updatedSongList = await SongList.findByIdAndUpdate(
        songListId,
        { $pull: { songList: songId } },
        { new: true }
      ).populate('songList');
  
      if (updatedSongList) {
        res.json(updatedSongList);
      } else {
        res.status(404).json({ error: 'Song list not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };