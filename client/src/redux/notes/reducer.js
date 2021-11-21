import { combineReducers } from "redux"
import { addNoteReducer } from "./create/reducer"
import { getNotesReducer } from "./get/reducer"

const reducer = combineReducers({
     getAll: getNotesReducer,
     createNote: addNoteReducer,
})

export default reducer