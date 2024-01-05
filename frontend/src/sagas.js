
import { takeLatest, put } from 'redux-saga/effects';
import { updateSong } from './songsSlice';

function* handleUpdateSong(action) {
  yield put(updateSong(action.payload));
}

function* rootSaga() {
  yield takeLatest('songs/updateSong', handleUpdateSong);
}

export default rootSaga;
