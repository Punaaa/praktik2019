import { all } from 'redux-saga/effects'
import { watchUpdateBirthday, watchUpdateImage } from './Birthday/BirthdaySaga'

/**
 * Generator funktion ska alltid ha * lär dig använda
 */

export function* rootSaga(){
  yield all([
      watchUpdateBirthday(),
      watchUpdateImage()
  ])
}

