import React, { useState } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import Components from '../Components/AllComponents';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { updateNotesData } from '../Redux/Action';
import { useNavigation } from '@react-navigation/native';
import useThemeColors from '../Components/ThemeHandle';

const DetailsScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const { item } = route.params;
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const themeColors = useThemeColors();

  const handleUpdate = (_id: any) => {
    dispatch(updateNotesData(item._id, title, description, navigation))
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Components.Header todoLength={item.readableDate + " || " + item.description.length} saveNote={true} createIcon={handleUpdate} />
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder='title'
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={[styles.textInputStyle, { backgroundColor: themeColors.textInputbackground }]}
          maxLength={30}
          multiline={true}
        />
        <TextInput
          placeholder='description'
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={[styles.textInputStyle, { backgroundColor: themeColors.textInputbackground }]}
          multiline={true}

        />
      </View>
    </SafeAreaView>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  textInputContainer: {
    gap: moderateScale(30),
    marginTop: verticalScale(20),
    marginHorizontal: scale(10),

  },
  textInputStyle: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    padding: moderateScale(10)
  },
})
