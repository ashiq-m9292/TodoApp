import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const TodoHeader = ({ headerStyle, showTitle, title, todosLength, showRigthIcon, todoMoreIcon, todoCreateIcon, todoSelectedMode, cancelOnpress, selectallOnpress }: any) => {
    const navigation = useNavigation<any>();


    return (
        <View style={styles.container}>
            <View style={[styles.HeaderContainer, headerStyle]}>

                {/* left icon or title  */}
                {
                    showTitle ?
                        <View>
                            <Text style={{ fontSize: moderateScale(34),  fontWeight: 'bold', color: '#3D74B6' }}>{title}</Text>
                        </View>
                        : <TouchableOpacity>
                            <Icon name='arrow-back' size={30} color={'black'} onPress={() => navigation.goBack()} />
                        </TouchableOpacity>
                }

                {/* right more vertical icon */}
                {
                    todoSelectedMode ? false
                        : <TouchableOpacity onPress={todoMoreIcon}>
                            <Feather name='more-vertical' size={40} />
                        </TouchableOpacity>
                }


                {/* cancel */}
                {
                    todoSelectedMode ?
                        <TouchableOpacity onPress={cancelOnpress}>
                            <Text style={{ fontSize: moderateScale(24),  fontWeight: 'bold', color: '#3D74B6' }}>Cancel</Text>
                        </TouchableOpacity>
                        : null
                }

                {/* select all text */}
                {
                    todoSelectedMode ?
                        <TouchableOpacity onPress={selectallOnpress}>
                            <Text style={{ fontSize: moderateScale(24), paddingRight: 10,  fontWeight: 'bold', color: '#3D74B6' }}>Select All</Text>
                        </TouchableOpacity>
                        : null
                }

            </View>
            <View>
                <Text style={{ fontSize: moderateScale(24), fontWeight: 'bold',  color: '#3D74B6' }}>{todosLength}</Text>
            </View>
        </View>
    );
}

export default TodoHeader;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DED3C4',
        width: '100%',
        height: verticalScale(100),
        justifyContent: 'flex-end',
        paddingLeft: scale(10),
        paddingVertical: verticalScale(10),
        gap: moderateScale(5)
    },
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textOne: {
        fontSize: moderateScale(30)
    },
    textTwo: {
        fontSize: moderateScale(20)
    },
})

