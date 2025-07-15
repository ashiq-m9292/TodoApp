import { TODO_REQUEST, TODO_CREATE_SUCCESS, TODO_REQUEST_SUCCESS, TODO_REQUEST_FAILURE, DATA_REQUEST, DATA_REQUEST_SUCCESS, DATA_CREATE_SUCCESS, TODO_UPDATE_SUCCESS, TODO_DELETE_SUCCESS, TOGGLE_TODO } from "./Constant";

const initialState = {
    loading: false,
    data: [],
    error: null
};


export const todoReducer = (State = initialState, action: any) => {
    switch (action.type) {
        case TODO_REQUEST:
            return { ...State, loading: true, error: null };
        case TODO_REQUEST_SUCCESS:
            return { ...State, error: null, loading: false, data: action.payload };
        case TODO_CREATE_SUCCESS:
            return { ...State, error: null, loading: false, data: action.payload };
        case TODO_UPDATE_SUCCESS:
            return { ...State, error: null, loading: false, data: State.data.map((item: any) => item._id === action.payload._id ? action.payload : item) };
        case TODO_DELETE_SUCCESS:
            return { ...State, error: null, loading: false, data: State.data.filter((item: any) => !action.payload.includes(item._id)), };
        case TODO_DELETE_SUCCESS:
            return { ...State, loading: false, error: action.payload };
        case TOGGLE_TODO:
            return { ...State, error: null, loading: false, data: State.data.map((item: any) => item._id === action.payload._id ? action.payload : item) };
        default:
            return State;
    }
};