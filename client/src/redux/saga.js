import { all } from 'redux-saga/effects'
import NotesSaga from './notes/saga'

export default function* RootSaga(){
     yield all([NotesSaga()])
}