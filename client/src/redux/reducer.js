import { combineReducers } from "redux"
import reducer from "./notes/reducer"

const RootReducer = combineReducers({
     notes: reducer,
})

export default RootReducer