import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CheckBox from 'react-native-check-box';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { getTodoData, toggleTodo } from '../Redux/TodoAction';
import useThemeColors from './ThemeHandle';


const FetchTodoData = ({ navigation, todoSelectedItem, todoSelectedMode, setTodoSelectedItem }: any) => {
  const raw = useSelector((state: any) => state.TodoApiData.data)
  const dispatch = useDispatch<any>();
  const themeColors = useThemeColors();

  const todos = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
  const pendingTodo = todos.filter((todo: any) => !todo.completed)
  const completedTodo = todos.filter((todo: any) => todo.completed)

  // toggle selected functioinaliteis
  const todoToggleSelcted = (_id: any) => {
    if (todoSelectedItem.includes(_id)) {
      setTodoSelectedItem(todoSelectedItem.filter((todo: any) => todo !== _id))
    } else {
      setTodoSelectedItem([...todoSelectedItem, _id])
    }
  };

  // handle bouncy CheckBox
  const handleToggleBouncy = async (_id: any) => {
    await dispatch(toggleTodo(_id));
    await dispatch(getTodoData());
  };

  // dueDate function 
  const isDueDate = (dueDateString: string) => {
    const now = new Date();
    const dueDate = new Date(dueDateString);
    return dueDate < now
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 200 }}>
        {
          pendingTodo.length ?
            pendingTodo.map((item: any) => <TouchableOpacity key={item._id} style={styles.itemContainer}>
              {
                todoSelectedMode ? false
                  : <BouncyCheckbox
                    size={35}
                    isChecked={item.completed}
                    onPress={() => handleToggleBouncy(item._id)}
                    fillColor='red'
                    unFillColor='aqua'
                  />
              }
              <TouchableOpacity style={{ width: '90%' }} onPress={() => navigation.navigate("TodoUpdateScreen", item = { item })} >
                <Text style={styles.textOne}>{item.todo} </Text>
                {
                  item.dueDate ?
                    <Text style={[styles.textTwo, { color: item.dueDate && isDueDate(item.dueDate) && 'red'  }]}>{ new Date(item.dueDate).toLocaleString()} </Text>
                    : null
                }
              </TouchableOpacity>
              {
                todoSelectedMode ?
                  <CheckBox style={{ width: '10%', alignSelf: 'center' }} isChecked={todoSelectedItem.includes(item._id)} onClick={() => todoToggleSelcted(item._id)} />
                  : null
              }
            </TouchableOpacity>)
            : null
        }
      {
        completedTodo.length ? (
            <Text style={{ fontSize: moderateScale(26), fontWeight: 'bold', color: themeColors.completedColor, marginLeft: scale(10), paddingTop: verticalScale(6) }}>Completed</Text>
        ) : null
      }
        {
          completedTodo.length ?
            completedTodo.map((item: any) => <TouchableOpacity key={item._id} style={styles.itemContainerTwo}>
              {
                todoSelectedMode ? false
                  : <BouncyCheckbox
                    size={35}
                    isChecked={item.completed}
                    onPress={() => handleToggleBouncy(item._id)}
                    fillColor='red'
                    unFillColor='aqua'
                  />
              }
              <TouchableOpacity style={{ width: '90%' }} onPress={() => navigation.navigate("TodoUpdateScreen", item = { item })} >
                <Text style={styles.textOne}>{item.todo} </Text>
                {
                  item.dueDate ?
                    <Text style={[styles.textTwo, { color: item.dueDate && isDueDate(item.dueDate) && 'red'  }]}>{ new Date(item.dueDate).toLocaleString()}</Text>
                    : null
                }
              </TouchableOpacity>
              {
                todoSelectedMode ?
                  <CheckBox style={{ width: '10%', alignSelf: 'center' }} isChecked={todoSelectedItem.includes(item._id)} onClick={() => todoToggleSelcted(item._id)} />
                  : null
              }
            </TouchableOpacity>)
            : null
        }
      </ScrollView>
    </View>
  );
};


export default FetchTodoData;

const styles = StyleSheet.create({
  container: {
  },
  itemContainer: {
    backgroundColor: '#DCC5B2',
    borderRadius: moderateScale(10),
    marginHorizontal: scale(10),
    marginTop: verticalScale(10),
    padding: moderateScale(8),
    flexDirection: 'row',
  },
  itemContainerTwo: {
    backgroundColor: '#DCC5B2',
    borderRadius: moderateScale(10),
    marginHorizontal: scale(10),
    marginTop: verticalScale(10),
    padding: moderateScale(8),
    flexDirection: 'row',
  },
  textOne: {
    fontSize: moderateScale(26),
    color: '#3D74B6',
  },
  textTwo: {
    fontSize: moderateScale(18),
    color: '#3D74B6'
  }
})
