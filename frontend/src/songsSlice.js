// src/songsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
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

export const { setSongs, setLoading, setError, addSong, updateSong, deleteSong } = songsSlice.actions;
export default songsSlice.reducer;
