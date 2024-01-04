// src/sagas.js
import { takeLatest, put } from 'redux-saga/effects';
import { updateSong } from './songsSlice';

function* handleUpdateSong(action) {
  // Here you can make API calls to update the song
//   console.log('API call to update song:', action.payload);
  // For illustration, let's dispatch the updateSong action immediately
  yield put(updateSong(action.payload));
}

function* rootSaga() {
  yield takeLatest('songs/updateSong', handleUpdateSong);
}

export default rootSaga;
