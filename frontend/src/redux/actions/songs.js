
export const SET_SONGS = 'SET_SONGS';
export const ADD_SONG = 'ADD_SONG';
export const UPDATE_SONG = 'UPDATE_SONG';
export const DELETE_SONG = 'DELETE_SONG';

export const setSongs = (songs) => ({
  type: SET_SONGS,
  payload: songs,
});

export const addSong = (song) => ({
  type: ADD_SONG,
  payload: song,
});

export const updateSong = (song) => ({
  type: UPDATE_SONG,
  payload: song,
});

export const deleteSong = (songId) => ({
  type: DELETE_SONG,
  payload: songId,
});
