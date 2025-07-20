import React, { useEffect } from 'react';
import { createStackNavigator, } from '@react-navigation/stack';
import BottomTab from './BottomTab';
import Screens from '../Screens/AllScreen';
import notifee, { EventType } from '@notifee/react-native';
import { navigate } from '../Components/NavigationService';


const Stack = createStackNavigator();
const MainStack = () => {
    useEffect(() => {
        const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
            if (type === EventType.PRESS) {
                navigate('Todos')
            }
        })
        notifee.getInitialNotification().then(notification => {
            if (notification) {
                navigate('Todos')
            }
        })
        return () => unsubscribe()
    }, [])
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>

            <Stack.Screen name='BottomTab' component={BottomTab} />

            <Stack.Screen name='CreateNote' component={Screens.CreateNote} />

            <Stack.Screen name='DetailsScreen' component={Screens.DetailsScreen} />

            <Stack.Screen name='TodoUpdateScreen' component={Screens.TodoUpdateScreen} />

            <Stack.Screen name='CreateTodo' component={Screens.CreateTodo} />


        </Stack.Navigator>
    );
}

export default MainStack;
