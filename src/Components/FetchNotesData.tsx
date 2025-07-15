import React from 'react';
import { Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import CheckBox from 'react-native-check-box';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const FetchNotesData = ({ navigation, noteData, selectedMode, setSelectedMode, selectedItem, setSelectedItem, loading }: any) => {
  const toggleSelctedNotes = (_id: any) => {
    if (selectedItem.includes(_id)) {
      setSelectedItem(selectedItem.filter((note: any) => note !== _id))
    } else {
      setSelectedItem([...selectedItem, _id])
    }
  }

  // loader 
  // if (loading) {
  //   return (
  //     <ActivityIndicator color={"aqua"} size="large"
  //       style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //     />
  //   )
  // }

  return (
    <SafeAreaView style={styles.container}>
      {
        loading ? (
          <ActivityIndicator color={"aqua"} size={"large"} style={{ marginTop: verticalScale(200) }} />
        ) : (
          <FlatList
            ListFooterComponent={<View style={{ height: verticalScale(126) }}></View>}
            data={noteData}
            horizontal={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => {
                  setSelectedMode(true);
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
    </SafeAreaView>
  );
}

export default FetchNotesData;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(12),
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
    fontSize: moderateScale(30),
    color: '#3D74B6'
  },
  textTwo: {
    fontSize: moderateScale(20),
    color: '#3D74B6'
  },
})
