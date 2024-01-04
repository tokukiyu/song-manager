// src/redux/reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from './songs';

const rootReducer = combineReducers({
  songs: songsReducer,
});

export default rootReducer;
