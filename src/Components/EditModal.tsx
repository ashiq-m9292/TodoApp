import React, { useState } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const EditModal = ({ todoEditModal, setTodoEditModal, editOnpress, setTodoSelectedMode }: any) => {
    return (
        <Modal
            visible={todoEditModal}
            animationType='fade'
            transparent={true}
            onRequestClose={() => setTodoEditModal(false)}
        >
            <TouchableWithoutFeedback onPress={() => {
                setTodoEditModal(false);
                setTodoSelectedMode(false)
            }} >
                <View style={styles.container}>
                    <TouchableWithoutFeedback>
                        <TouchableOpacity style={styles.textContainer} onPress={editOnpress}>
                            <Text style={{ fontSize: 20 }}>Edit</Text>
                        </TouchableOpacity>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default EditModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        width: '16%',
        height: '4%',
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: verticalScale(30),
        alignSelf: 'flex-end',
        right: scale(34),
    }
})
