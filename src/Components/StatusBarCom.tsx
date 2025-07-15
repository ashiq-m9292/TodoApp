import React from 'react';
import { View, Text, StatusBar } from 'react-native';

const StatusBarCom = () => {
    return (
        <View>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'red'}
            />
        </View>
    );
}

export default StatusBarCom;
