import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native';
import Components from '../Components/AllComponents';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { deleteNotes, getTodoData } from '../Redux/TodoAction';
import useThemeColors from '../Components/ThemeHandle';

const Todos = ({ navigation }: any) => {
  const { data } = useSelector((state: any) => state.TodoApiData);
  const dispatch = useDispatch<any>();
  const [todoEditModal, setTodoEditModal] = useState(false);
  const [todoSelectedMode, setTodoSelectedMode] = useState(false);
  const [todoSelectedItem, setTodoSelectedItem] = useState<any>([]);
  const themeColors = useThemeColors();


  useFocusEffect(
    useCallback(() => {
      dispatch(getTodoData());
    }, [dispatch]),
  );


  // select all functionality
  const selectAllTodos = () => {
    const allTodo = data.map((todo: any) => todo._id);
    if (todoSelectedItem) {
      setTodoSelectedItem(allTodo)
    }
  }

  return (
    <View style={[styles.todoContainer, { backgroundColor: themeColors.background }]}>

      {/* todo header */}
      <Components.TodoHeader
        showTitle={true}
        title={"Todos"}
        todosLength={data.length}
        showRigthIcon={true}
        todoSelectedMode={todoSelectedMode}
        setTodoSelectedMode={() => setTodoSelectedMode(false)}
        todoMoreIcon={() => setTodoEditModal(true)}
        cancelOnpress={() => {
          setTodoSelectedItem([]);
          setTodoSelectedMode(false);
          setTodoEditModal(false);
        }}
        selectallOnpress={selectAllTodos}
      />

      {/* todo edit modal */}
      {
        todoSelectedMode ? false
          :
          <Components.EditModal
            todoEditModal={todoEditModal}
            setTodoEditModal={() => setTodoEditModal(false)}
            editOnpress={() => setTodoSelectedMode(true)}
            todoSelectedMode={todoSelectedMode}
            setTodoSelectedMode={() => setTodoSelectedMode(false)}
            todoSelectedItem={todoSelectedItem}
          />
      }

      {/* todo fetch data  */}
      <Components.FetchTodoData
        todoData={data}
        navigation={navigation}
        todoSelectedMode={todoSelectedMode}
        setTodoSelectedMode={() => setTodoSelectedMode(false)}
        setTodoSelectedItem={setTodoSelectedItem}
        todoSelectedItem={todoSelectedItem}
      />

      {/* todo create button  */}
      {
        todoSelectedMode ? false
          : <Components.TodoCreateButton
            navigation={navigation}
          />
      }

      {/* todo bottom delete button  */}
      {
        todoSelectedMode ?
          <Components.TodoButtonBottom
            todoSelectedItem={todoSelectedItem}
            setTodoSelectedMode={() => setTodoSelectedMode(false)}
            setTodoEditModal={() => setTodoEditModal(false)}
          />
          : null
      }

    </View>
  );
}

export default Todos;

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
})
