// src/redux/sagas/index.js

import { all } from 'redux-saga/effects';
import songsSaga from './songs';

function* rootSaga() {
  yield all([
    songsSaga(),
    // Add other sagas here if needed
  ]);
}

export default rootSaga;
