import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screens from '../Screens/AllScreen';
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
const BottomTab = () => {
   
    return (
        <Tab.Navigator 
          screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, name }: any) => {
                    if (route.name === "Notes") {
                        name = 'home-outline'
                    } else if (route.name === "Todos") {
                        name = 'receipt-outline'
                    } 
                    return <Icon color={color} size={30} name={name} />

                },
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    
                },
                tabBarStyle: {
                    height: 80,
                    paddingTop: 8,
                }
            })}
        >
            <Tab.Screen name='Notes' component={Screens.Notes} />
            <Tab.Screen name='Todos' component={Screens.Todos} />
        </Tab.Navigator>
    );
}

export default BottomTab;
