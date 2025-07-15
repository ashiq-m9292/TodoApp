import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { createTodo } from '../Redux/TodoAction';
import useThemeColors from '../Components/ThemeHandle';

const CreateTodo = ({ navigation }: any) => {
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch<any>();
  const themeColors = useThemeColors();

  // todo update function 
  const todoHandleSave = () => {
    dispatch(createTodo(todo, navigation))
  }

  return (
    <View style={[styles.todoContainer, { backgroundColor: themeColors.background }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Icon name='arrow-back' size={30} color={'black'} onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        {
          todo === '' ? false
            : (
              <TouchableOpacity onPress={todoHandleSave}>
                <Icon name='checkmark-sharp' size={50} />
              </TouchableOpacity>
            )
        }
      </View>
      <View style={styles.TextInputContainer}>
        <TextInput
          placeholder='To-Do'
          value={todo}
          onChangeText={(text) => setTodo(text)}
          multiline={true}
          style={[styles.textInputStyle, { backgroundColor: themeColors.textInputbackground }]}
        />
        <Icon name='notifications-outline' size={40} color={themeColors.iconColor} />
      </View>
    </View>
  );
}

export default CreateTodo;


const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    backgroundColor: '#DED3C4',
    width: '100%',
    height: verticalScale(120),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(20)
  },
  TextInputContainer: {
    marginTop: verticalScale(50),
    marginHorizontal: scale(10),
    gap: verticalScale(20),
  },
  textInputStyle: {
    borderWidth: 0.5,
    borderRadius: moderateScale(10),
    fontSize: moderateScale(24),
    padding: moderateScale(10)
  }
})
