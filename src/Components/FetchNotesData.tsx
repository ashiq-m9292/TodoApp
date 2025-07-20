import React, { useState } from 'react';
import { Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import CheckBox from 'react-native-check-box';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { deleteNotesData } from '../Redux/Action';
import { Share } from 'react-native';
import useThemeColors from './ThemeHandle';

const FetchNotesData = ({ navigation, noteData, selectedMode, setSelectedMode, selectedItem, setSelectedItem, loading }: any) => {
  const dispatch = useDispatch<any>();
  const [shareItem, setShareItem] = useState<any>(null);
  const themeColors = useThemeColors();

  // selected ids 
  const toggleSelctedNotes = (_id: any) => {
    if (selectedItem.includes(_id)) {
      setSelectedItem(selectedItem.filter((note: any) => note !== _id))
    } else {
      setSelectedItem([...selectedItem, _id])
    }
  }

  // delete notes function 
  const deleteNotesFunction = () => {
    if (selectedItem.length === 0) {
      return
    } else {
      dispatch(deleteNotesData(selectedItem))
      setSelectedMode(false)
    }
  };

  // share functionality
  const shareFunction = async () => {
    if (selectedItem.length === 0) {
      return
    } else {
      const massage = `${shareItem.title}\n\n${shareItem.description}`;
      await Share.share({
        message: massage
      })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        loading ? (
          <ActivityIndicator color={"aqua"} size={"large"} style={{ marginTop: verticalScale(200) }} />
        ) : (
          <FlatList
            ListFooterComponent={<View style={{ height: verticalScale(10) }}></View>}
            data={noteData}
            horizontal={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => {
                  setSelectedMode(true);
                  setShareItem(item)
                }}
                onPress={() => navigation.navigate("DetailsScreen", item = { item })}
                style={styles.itemContainer}>
                <Text style={styles.textOne}>{item.title.slice(0, 20)}</Text>
                <Text style={styles.textTwo}>{item.readableDate + " | " + item.description.slice(0, 8)}</Text>
                {
                  selectedMode ?
                    <CheckBox style={{ alignSelf: 'flex-end' }} isChecked={selectedItem.includes(item._id)} onClick={() => toggleSelctedNotes(item._id)} />
                    : null
                }
              </TouchableOpacity>
            )}
          />
        )
      }
      {
        selectedMode ? (
          <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', alignSelf: 'center', gap: scale(100) }}>
            <TouchableOpacity
              onPress={shareFunction}
            >
              <Icon
                name='share-social-outline'
                color={themeColors.iconColor}
                size={36}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteNotesFunction}
            >
              <Icon
                name='trash-outline'
                color={themeColors.iconColor}
                size={36}
              />
            </TouchableOpacity>
          </View>
        ) : null
      }
    </SafeAreaView>
  );
}

export default FetchNotesData;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(12),
    flex: 1
  },
  itemContainer: {
    backgroundColor: '#DCC5B2',
    marginHorizontal: scale(10),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    marginBottom: verticalScale(14),
    gap: verticalScale(2),
    borderRadius: moderateScale(10),
  },
  textOne: {
    fontSize: moderateScale(26),
    color: '#3D74B6'
  },
  textTwo: {
    fontSize: moderateScale(16),
    color: '#3D74B6'
  },
})
