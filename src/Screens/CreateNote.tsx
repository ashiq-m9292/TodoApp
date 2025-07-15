import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Platform, StatusBar } from 'react-native';
import Components from '../Components/AllComponents';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { createNotesData, updateNotesData } from '../Redux/Action';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useThemeColors from '../Components/ThemeHandle';


const CreateNote = ({ navigation }: any) => {
    const dispatch = useDispatch<any>();
    const isCreatingRef = useRef(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const themeColors = useThemeColors();

    // latest readable time and date
    const liveReadableDate = new Date().toLocaleString();

    // notes save function 
    const notesHandleSave = () => {
        dispatch(createNotesData(title, description, navigation))
    }


    return (
        <View style={[styles.container, {backgroundColor: themeColors.background}]}>
            <Components.Header
                todoLength={liveReadableDate}
                saveNote={title === '' && description === '' ? false : true}
                createIcon={notesHandleSave}
            />
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='title'
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    style={[styles.textInputStyle, {backgroundColor: themeColors.textInputbackground}]}
                    maxLength={30}
                    multiline={true}
                />
                <TextInput
                    placeholder='description'
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                   style={[styles.textInputStyle, {backgroundColor: themeColors.textInputbackground}]}
                    multiline={true}
                />
            </View>
        </View>
    );
}

export default CreateNote;

const styles = StyleSheet.create({
    container: {
        flex: 1,
         marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    textInputContainer: {
        gap: moderateScale(30),
        marginTop: verticalScale(20),
        marginHorizontal: scale(10)

    },
    textInputStyle: {
        fontSize: moderateScale(24),
        fontWeight: '600',
        padding: moderateScale(10)
    },
})
