import React from 'react';
import { View, Text } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab';
import Screens from '../Screens/AllScreen';

const Stack = createStackNavigator();
const MainStack = () => {
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
