// src/songsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [
    { id: 1, title: 'Song 1', artist: 'Artist 1' },
    { id: 2, title: 'Song 2', artist: 'Artist 2' },
    // Add more initial songs as needed
  ],
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
    updateSong: (state, action) => {
      const { id, title, artist } = action.payload;
      const songToUpdate = state.songs.find((song) => song.id === id);
      if (songToUpdate) {
        songToUpdate.title = title;
        songToUpdate.artist = artist;
      }
    },
    deleteSong: (state, action) => {
      const idToDelete = action.payload;
      state.songs = state.songs.filter((song) => song.id !== idToDelete);
    },
  },
});

export const { addSong, updateSong, deleteSong } = songsSlice.actions;
export default songsSlice.reducer;
