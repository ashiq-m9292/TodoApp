
import { DATA_REQUEST, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILURE, DATA_CREATE_SUCCESS, DATA_UPDATE_SUCCESS, DATA_DELETE_SUCCESS } from "./Constant";


const initialState = {
    loading: false,
    data: [],
    error: null
};

export const getNotesApiData = (State = initialState, action: any) => {
    switch (action.type) {
        case DATA_REQUEST:
            return { ...State, loading: true, error: null };
        case DATA_REQUEST_SUCCESS:
            return { ...State, loading: false, data: action.payload };
        case DATA_REQUEST_FAILURE:
            return { ...State, loading: false, error: action.payload };
        case DATA_CREATE_SUCCESS:
            return { ...State, loading: false, data: action.payload };
        case DATA_UPDATE_SUCCESS:
            return { ...State, loading: false, data: State.data.map((item: any) => item._id === action.payload._id ? action.payload : item) }
        case DATA_DELETE_SUCCESS:
            return { ...State, loading: false, data: State.data.filter((item: any) => !action.payload.includes(item._id)), }
        default:
            return State
    }

};