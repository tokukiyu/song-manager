// src/sagas.js
import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { setSongs, setLoading, setError, updateSong, addSong } from './songsSlice';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API URL

function* handleUpdateSong(action) {
  try {
    const { id, title, artist } = action.payload;
    yield call(axios.put, `${apiUrl}/${id}`, { title, artist });
    yield put(updateSong(action.payload));
  } catch (error) {
    console.error('Error updating song:', error);
  }
}

function* handleFetchSongs() {
  try {
    yield put(setLoading(true));

    const response = yield call(axios.get, apiUrl);
    yield put(setSongs(response.data));

    yield put(setLoading(false));
  } catch (error) {
    yield put(setError(error.message));
    yield put(setLoading(false));
  }
}

function* handleAddSong(action) {
  try {
    console.log('Handling addSong action:', action);
    const { title, artist } = action.payload;
    const response = yield call(axios.post, apiUrl, { title, artist });
    console.log('Response from server:', response.data);
    
    yield put(addSong(response.data));
    
  } catch (error) {
    console.error('Error adding song:', error);
  }
}

function* rootSaga() {
  yield takeLatest('songs/updateSong', handleUpdateSong);
  yield takeLatest('songs/fetchSongs', handleFetchSongs);
  yield takeLatest('songs/addSong', handleAddSong);
}

export default rootSaga;
