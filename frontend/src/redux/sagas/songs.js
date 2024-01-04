// src/redux/sagas/songs.js

import { takeLatest, put } from 'redux-saga/effects';
import { SET_SONGS, setSongs } from '../actions/songs';

// Replace this with actual API calls when connecting to the backend
function* fetchSongs() {
  const mockSongs = [
    {
      id: 1,
      title: 'Song 1',
      artist: 'Artist 1',
      genre: 'Pop',
      releaseYear: 2020,
    },
    {
      id: 2,
      title: 'Song 2',
      artist: 'Artist 2',
      genre: 'Rock',
      releaseYear: 2019,
    },
    {
      id: 3,
      title: 'Song 3',
      artist: 'Artist 3',
      genre: 'Hip Hop',
      releaseYear: 2021,
    },
  ];

  yield put(setSongs(mockSongs));
}

function* songsSaga() {
  yield takeLatest(SET_SONGS, fetchSongs);
}

export default songsSaga;
