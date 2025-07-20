import { TODOS_URL } from "@env";
import { ToastAndroid } from "react-native";
import { TODO_REQUEST, TOGGLE_TODO, TODO_REQUEST_SUCCESS, TODO_CREATE_SUCCESS, TODO_REQUEST_FAILURE, TODO_UPDATE_SUCCESS, TODO_DELETE_SUCCESS } from "./Constant";

// create todo function
export const createTodo = (todoData: { todo: string, dueDate?: string }, navigation: any) => async (dispatch: any) => {
    dispatch({ type: TODO_REQUEST })
    try {
        let response = await fetch(`${TODOS_URL}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todoData)
        })
        let data = await response.json();
        if (response.ok) {
            dispatch({ type: TODO_CREATE_SUCCESS, payload: data })
            ToastAndroid.show("created Successfully", ToastAndroid.SHORT);
            navigation.reset({
                index: 0,
                routes: [{
                    name: "BottomTab",
                    state: { routes: [{ name: "Todos" }] }
                }]
            });
        }
        else {
            throw new Error(data.message)
        }
    } catch (error) {
        dispatch({ type: TODO_REQUEST_FAILURE, payload: Error instanceof Error ? Error.message : "Todo Request Failed" })
    }
}


// get todo function 
export const getTodoData = () => async (dispatch: any) => {
    dispatch({ type: TODO_REQUEST })
    try {
        let response = await fetch(`${TODOS_URL}/get`);
        let data = await response.json();
        if (response.ok) {
            dispatch({ type: TODO_REQUEST_SUCCESS, payload: data.getAll })
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        dispatch({ type: TODO_REQUEST_FAILURE, payload: Error instanceof Error ? Error.message : "Todo Request Failed" })
    }
}


// todo update function

export const updateTodo = (id: String, todo: String, dueDate: any, navigation: any) => async (dispatch: any) => {
    dispatch({ type: TODO_REQUEST })
    try {
        let response = await fetch(`${TODOS_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({todo, dueDate})
        })
        let data = await response.json();
        if (response.ok) {
            dispatch({ type: TODO_UPDATE_SUCCESS, payload: data })
            ToastAndroid.show("Updated Successfully", ToastAndroid.SHORT);
            navigation.reset({
                index: 0,
                routes: [{
                    name: "BottomTab",
                    state: { routes: [{ name: "Todos" }] }
                }]
            });
        }
        else {
            throw new Error(data.message)
        }
    } catch (error) {
        dispatch({ type: TODO_REQUEST_FAILURE, payload: Error instanceof Error ? Error.message : "Todo Request Failed" })
    }
}


// todo deleted function

export const deleteNotes = (ids: any,) => async (dispatch: any) => {
    try {
        let response = await fetch(`${TODOS_URL}/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: ids })
        })
        let data = await response.json();
        if (response.ok) {
            dispatch({ type: TODO_DELETE_SUCCESS, payload: ids })
            ToastAndroid.show("deleted Successfully", ToastAndroid.SHORT);
        } else {
            throw new Error(data.massage)
        }
    } catch (error) {
        dispatch({ type: TODO_REQUEST_FAILURE, payload: error instanceof Error ? error.message : "error in delete function" })
    }
}

// todo toggle function

export const toggleTodo = (id: String) => async (dispatch: any) => {
    dispatch({ type: TODO_REQUEST })
    try {
        let response = await fetch(`${TODOS_URL}/toggle/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        })
        let data = await response.json();
        if (response.ok) {
            dispatch({ type: TOGGLE_TODO, payload: data })
        }
        else {
            throw new Error(data.message)
        }
    } catch (error) {
        dispatch({ type: TODO_REQUEST_FAILURE, payload: Error instanceof Error ? Error.message : "Todo Request Failed" })
    }
}