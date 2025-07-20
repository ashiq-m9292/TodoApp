import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, StatusBar, TextInput, TouchableOpacity, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../Redux/TodoAction';
import useThemeColors from '../Components/ThemeHandle';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import notifee, { TriggerType, AndroidImportance } from '@notifee/react-native';

const TodoUpdateScreen = ({ navigation, route }: any) => {
    const { item } = route.params;
    const { id } = route.params;
    const [todo, setTodo] = useState(item.todo);
    const dispatch = useDispatch<any>();
    const themeColors = useThemeColors();
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<'date' | 'time'>('date');

    useEffect(() => {
        notifee.requestPermission();
    }, []);

    // todo update function 
    const todohandleUpdate = async (_id: any) => {
        await notifee.createChannel({
            id: 'default',
            name: 'default',
            importance: AndroidImportance.HIGH,
            sound: 'default'
        });
        await notifee.createTriggerNotification({
            title: 'Todo Reminder',
            body: todo,
            android: {
                channelId: 'default',
                pressAction: { id: 'default' },
            },
        },
            {
                timestamp: date.getTime(),
                type: TriggerType.TIMESTAMP
            }
        )
        const updateDate = date ? date.toISOString() : null;

        dispatch(updateTodo(item._id, todo, updateDate, navigation));
    }

    // change value date time 
    const onChange = (event: any, selectedDate?: Date) => {
        if (event.type === 'set' && selectedDate) {
            setDate(selectedDate);
        }
        setShow(false);
    }

    // date picker 
    const showDatePicker = () => {
        setShow(true);
        setMode('date');
    };

    // show Time 
    const showTimePicker = () => {
        setShow(true);
        setMode('time');
    };

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
                    style={[styles.textInputStyle, { backgroundColor: themeColors.textInputbackground }]}
                />
                <View style={{ flexDirection: 'row', gap: moderateScale(14) }}>
                    <Fontisto name='date' size={35} color={themeColors.iconColor} onPress={showDatePicker} />
                    <Icon name='time-outline' size={40} color={themeColors.iconColor} onPress={showTimePicker} />
                </View>
                {
                    show ?
                        <DateTimePicker
                            value={date}
                            mode={mode}
                            display='default'
                            onChange={onChange}
                            is24Hour={false}
                            locale='en-IN'
                        />
                        : null
                }
                <Text style={{ color: themeColors.iconColor, fontWeight: 'bold' }}>{new Date(item.dueDate).toLocaleString()}</Text>
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
        height: verticalScale(100),
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
