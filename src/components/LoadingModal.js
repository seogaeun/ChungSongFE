import React from 'react';
import { Modal, View, StyleSheet,Text, TouchableWithoutFeedback } from 'react-native';
import Loading from './Loading'; // 로딩 컴포넌트를 import합니다.
const LoadingModal = () => {
    return (
        <Modal
            animationType="none"
            transparent={true} // 투명한 배경
            visible={true} // 모달이 보이도록 설정
        >
            <View style={styles.modalBackground}>
                <Loading></Loading>
                <Text style={styles.centerText}>로딩 중입니다...</Text>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 투명한 회색 배경
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        color: 'white',
        fontSize: 20,
    },

});

export default LoadingModal;
