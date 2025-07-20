import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../Redux/ColorAction';
import useThemeColors from './ThemeHandle';


const Header = ({ headerStyle, showTitle, title, notesLength, Cancel, CancelOnPress, SelectAll, saveNote, selectedMode, selectAllOnPress, createIcon, showSwitch }: any) => {
    const navigation = useNavigation<any>();
    const isDarkMode = useSelector((state: any) => state.Theme.isDarkMode);
    const themeColors = useThemeColors();
    const dispatch = useDispatch<any>();

    // switch handle function 
    const handleSwitch = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <View style={styles.container}>
            <View style={[styles.HeaderContainer, headerStyle]}>
                {
                    showTitle ?
                        <View>
                            <Text style={{ fontSize: moderateScale(34), fontWeight: 'bold', color: '#3D74B6' }}>{title}</Text>
                        </View>
                        : <TouchableOpacity>
                            <Icon name='arrow-back' size={30} color={'black'} onPress={() => navigation.goBack()} />
                        </TouchableOpacity>
                }
                {
                    selectedMode ?
                        <TouchableOpacity onPress={CancelOnPress}>
                            <Text style={{fontSize: moderateScale(24), fontWeight: 'bold', color: '#3D74B6'}}>{Cancel}</Text>
                        </TouchableOpacity>
                        : null
                }

                {
                    saveNote ?
                        <TouchableOpacity onPress={createIcon}>
                            <Icon name="checkmark-sharp" size={40} color={'black'} />
                        </TouchableOpacity>
                        : null
                }
                {
                    selectedMode ?
                        <TouchableOpacity onPress={selectAllOnPress}>
                            <Text style={{ fontSize: moderateScale(24), fontWeight: 'bold', color: '#3D74B6' }}>{SelectAll}</Text>
                        </TouchableOpacity>
                        : null
                }
                {
                    showSwitch ?
                        <Switch
                            value={isDarkMode}
                            onValueChange={handleSwitch}
                            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                        />
                        : null
                }
            </View>
            <View>
                <Text style={{ fontSize: moderateScale(24), fontWeight: 'bold', color: '#3D74B6' }}>{notesLength}</Text>
            </View>
        </View>
    );
}

export default Header;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DED3C4',
        width: '100%',
        height: verticalScale(100),
        justifyContent: 'flex-end',
        paddingLeft: scale(10),
        paddingRight: scale(4),
        paddingVertical: verticalScale(10),
        gap: moderateScale(5)
    },
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

