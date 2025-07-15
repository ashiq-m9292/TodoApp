import { TOGGLE_THEME } from "./Constant";

const initialState = {
    isDarkMode: false
}


export const toggleReducer = (State = initialState, action: any) => {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...State, isDarkMode: !State.isDarkMode
            }
        default:
            return State
    }
}
