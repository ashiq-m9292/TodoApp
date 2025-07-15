import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { deleteNotes } from '../Redux/TodoAction';


const TodoButtonBottom = ({ setTodoEditModal, todoSelectedItem, setTodoSelectedMode }: any) => {
    const dispatch = useDispatch<any>();

    // todo delete function 
    const todoDeleteFunction = () => {
        if (todoSelectedItem.length === 0) {
            return
        } else {
            dispatch(deleteNotes(todoSelectedItem));
            setTodoSelectedMode(false),
                setTodoEditModal(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={todoDeleteFunction}
            >
                <Icon
                    name='trash-outline'
                    color={'black'}
                    size={36}
                />
            </TouchableOpacity>
        </View>
    );
}

export default TodoButtonBottom;


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
});


