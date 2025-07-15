import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesData } from '../Redux/Action';
import Components from '../Components/AllComponents';
import Share from 'react-native-share';
import useThemeColors from '../Components/ThemeHandle';


const Notes = ({ navigation }: any) => {
  const dispatch = useDispatch<any>();
  const { data, loading } = useSelector((state: any) => state.NotesData);
  const [selectedMode, setSelectedMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const themeColors = useThemeColors();

  // fetch notes data
  useFocusEffect(
    useCallback(() => {
      dispatch(getNotesData());
    }, [dispatch])
  );

  // backPress handler with multiple checkbox
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (selectedMode) {
          setSelectedMode(false)
          // ye check item ko uncheck kar deta hai
          setSelectedItem([])
          // app ko exit se rokega
          return true
        }
        // allow karega exit karna
        return false
      }
      const handler = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => handler.remove();

    }, [selectedMode])
  )

  // select all functionality
  const selectAllFunction = () => {
    if (selectedItem) {
      const allSelect = data.map((note: any) => note._id)
      setSelectedItem(allSelect)
    }
  }

  // share functionality
  const shareFunction = async (item: any) => {
    try {
      if (selectedItem.length === 0) {
        return
      }
      const message = selectedItem.map((item: any) => `${item.title} \n ${item.description}`).join('\n\n.....\n\n')
      await Share.open({
        title: 'Share Notes',
        message: message
      })
    } catch (error) {
      console.warn("error in share function", error)
    }
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Components.StatusBarCom />
      {/* notes header  */}
      <Components.Header
        showTitle={true}
        title="Notes"
        notesLength={data.length}
        selectedMode={selectedMode}
        setSelectedMode={() => setSelectedMode(!selectedMode)}
        Cancel="Cancel"
        CancelOnPress={() => {
          setSelectedMode(false);
          setSelectedItem([]);
        }}
        selectAllOnPress={selectAllFunction}
        SelectAll="SelectAll"
        showSwitch={true}
      />
      {/* notes fetch Components  */}
      <Components.FetchNotesData
        noteData={data}
        navigation={navigation}
        selectedMode={selectedMode}
        setSelectedMode={() => setSelectedMode(!selectedMode)}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        loading={loading}

      />

      {/* notes create button  */}
      <Components.CreateButton
        onPressCreate={() => navigation.navigate("CreateNote")}
        selectedMode={selectedMode}
        setSelectedMode={() => setSelectedMode(!selectedMode)}
      />

      {/* notes bottom button  */}
      {
        selectedMode ?
          <Components.BottomButton
            selectedItem={selectedItem}
            setSelectedMode={setSelectedMode}
            shareFunction={shareFunction}
          />
          : null
      }
    </SafeAreaView>
  );
}

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
})

