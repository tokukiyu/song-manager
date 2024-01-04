const mongoose = require('mongoose');

const songListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  songList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    },
  ],
});

const SongList = mongoose.model('SongList', songListSchema);

module.exports = SongList;
