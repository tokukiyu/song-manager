// src/redux/reducers/songs.js

import { SET_SONGS, ADD_SONG, UPDATE_SONG, DELETE_SONG } from '../actions/songs';

const initialState = [];

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SONGS:
      return action.payload;
    case ADD_SONG:
      return [...state, action.payload];
    case UPDATE_SONG:
      return state.map((song) => (song.id === action.payload.id ? action.payload : song));
    case DELETE_SONG:
      return state.filter((song) => song.id !== action.payload);
    default:
      return state;
  }
};

export default songsReducer;
