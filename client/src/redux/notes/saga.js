import { all } from "redux-saga/effects";
import { addNoteWatcher } from './create/action'
import { getNotesWatcher } from './get/action'
export default function* NotesSaga(){
     yield all([
          getNotesWatcher(),
          addNoteWatcher(),
     ])
}