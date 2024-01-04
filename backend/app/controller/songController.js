
const Song = require('../model/songs');

// Get all songs
exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific song by ID
exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new song
exports.addSong = async (req, res) => {
  try {
    const { title, artist } = req.body;
    const newSong = new Song({ title, artist });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a song by ID
exports.updateSong = async (req, res) => {
  try {
    const { title, artist } = req.body;
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, { title, artist }, { new: true });
    if (updatedSong) {
      res.json(updatedSong);
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a song by ID
exports.deleteSong = async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (deletedSong) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
