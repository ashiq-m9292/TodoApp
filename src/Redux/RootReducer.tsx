import { combineReducers } from "redux";
import { getNotesApiData } from "./Reducer";
import { todoReducer } from "./TodoReducer";
import { toggleReducer } from "./ColorReducer";

const rootReducer = combineReducers({
    NotesData: getNotesApiData,
    TodoApiData: todoReducer,
    Theme: toggleReducer,
});


export default rootReducer;
