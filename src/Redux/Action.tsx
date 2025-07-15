import { NOTES_URL } from "@env"
import { ToastAndroid } from "react-native";
import { DATA_REQUEST, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILURE, DATA_CREATE_SUCCESS, DATA_UPDATE_SUCCESS, DATA_DELETE_SUCCESS } from "./Constant";

// get data function
export const getNotesData = () => async (dispatch: any) => {
    dispatch({ type: DATA_REQUEST })
    try {
        let response = await fetch(`${NOTES_URL}/get`);
        let data = await response.json();
        if (response.ok) {
            dispatch({ type: DATA_REQUEST_SUCCESS, payload: data.getAll });
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        dispatch({ type: DATA_REQUEST_FAILURE, payload: error instanceof Error ? error.message : "get data failed" })
    }
}


// create data function
export const createNotesData = (title: String, description: String, navigation: any) => async (dispatch: any) => {
    try {
        let response = await fetch(`${NOTES_URL}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        });
        let data = await response.json();
        if (response.ok) {
            dispatch({ type: DATA_CREATE_SUCCESS, payload: data });
            ToastAndroid.show("Created Successfully", ToastAndroid.SHORT);
            navigation.reset({
                index: 0,
                routes: [{ name: "BottomTab" }]
            })
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        dispatch({ type: DATA_REQUEST_FAILURE, payload: error instanceof Error ? error.message : "create data failed" })
    }
}


// update notes function

export const updateNotesData = (id: any, title: String, description: String, navigation: any) => async (dispatch: any) => {
    try {
        let response = await fetch(`${NOTES_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        })
        let data = await response.json();
        if (!response.ok) {
            console.warn("server response error:", data);
            throw new Error(data.message || "failed to update")
        }
        if (response.ok) {
            dispatch({ type: DATA_UPDATE_SUCCESS, payload: data })
            navigation.reset({
                index: 0,
                routes: [{ name: "BottomTab" }]
            })
            ToastAndroid.show("Updated Successfully", ToastAndroid.SHORT);
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        dispatch({ type: DATA_REQUEST_FAILURE, payload: error instanceof Error ? error.message : "error in update function" })
    }
}


// delete function
export const deleteNotesData = (ids: any) => async (dispatch: any) => {
    try {
        let response = await fetch(`${NOTES_URL}/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: ids })
        })
        let data = await response.json();
        if (response.ok) {
            dispatch({ type: DATA_DELETE_SUCCESS, payload: ids })
            ToastAndroid.show("deleted Successfully", ToastAndroid.SHORT);
        } else {
            throw new Error(data.massage)
        }
    } catch (error) {
        dispatch({ type: DATA_REQUEST_FAILURE, payload: error instanceof Error ? error.message : "error in delete function" })
    }
}

