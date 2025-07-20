import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import MainStack from './MainStack';
import { navigationRef } from '../Components/NavigationService';


const Routes = () => {
   
    return (
        <NavigationContainer ref={navigationRef}>
            <MainStack />
        </NavigationContainer>
    );
}

export default Routes;
