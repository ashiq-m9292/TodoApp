import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { deleteNotesData } from '../Redux/Action';

const BottomButton = ({ selectedItem, setSelectedMode, shareFunction }: any) => {
  const dispatch = useDispatch<any>();
  // notes delete function 
  const deleteNotesFunction = () => {
    if (selectedItem.length === 0) {
      return
    } else {
      dispatch(deleteNotesData(selectedItem))
      setSelectedMode(false)
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => shareFunction()}
      >
        <Icon
          name='share-social-outline'
          color={'black'}
          size={36}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={deleteNotesFunction}
      >
        <Icon
          name='trash-outline'
          color={'black'}
          size={36}
        />
      </TouchableOpacity>
    </View>
  );
}

export default BottomButton;


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
});