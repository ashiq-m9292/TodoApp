import React from 'react';
import { View,TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateButton = ({ onPressCreate, selectedMode }: any) => {
    return (
        <View style={styles.container}>
            {
                selectedMode ? null
                    : <TouchableOpacity style={styles.buttonContainer} onPress={onPressCreate}>
                        <Icon name='add' size={60} color={'red'} />
                    </TouchableOpacity>
            }
        </View>
    );
}

export default CreateButton;

const styles = StyleSheet.create({
    container: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: scale(50),
    marginRight: moderateScale(26)
    },
    buttonContainer: {
        width: scale(80),
        height: verticalScale(66),
        backgroundColor: 'green',
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: moderateScale(20),
    },
})
