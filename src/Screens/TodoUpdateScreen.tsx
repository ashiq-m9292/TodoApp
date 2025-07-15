import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../Redux/TodoAction';
import useThemeColors from '../Components/ThemeHandle';

const TodoUpdateScreen = ({ navigation, route }: any) => {
    const { item } = route.params;
    const [todo, setTodo] = useState(item.todo);
    const dispatch = useDispatch<any>();
    const themeColors = useThemeColors();

    // todo update function 
    const todohandleUpdate = (_id: any) => {
        dispatch(updateTodo(item._id, todo, navigation))
    }

    return (
        <View style={[styles.todoContainer, { backgroundColor: themeColors.background }]}>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Icon name='arrow-back' size={30} color={'black'} onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <TouchableOpacity onPress={todohandleUpdate}>
                    <Icon name='checkmark-sharp' size={50} />
                </TouchableOpacity>
            </View>
            <View style={styles.TextInputContainer}>
                <TextInput
                    placeholder='Update To-Do'
                    value={todo}
                    onChangeText={(text) => setTodo(text)}
                    multiline={true}
                    style={[styles.textInputStyle, {backgroundColor: themeColors.textInputbackground}]}
                />
                <Icon name='notifications-outline' size={40} color={themeColors.iconColor} />
            </View>
        </View>
    );
}

export default TodoUpdateScreen;


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
