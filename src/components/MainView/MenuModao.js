import React from 'react';
import { Modal, View, Text, ScrollView, Button } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
const MealModal = ({ isVisible, onClose, mealData, today }) => {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
                <View style={{

                    width: widthPercentage(250), // 가로 크기의 70%
                    height: heightPercentage(300), // 세로 크기의 70%
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: widthPercentage(5),
                    paddingTop: widthPercentage(10),
                    paddingBottom: widthPercentage(10),
                    alignContent: "center",
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: fontPercentage(17), fontWeight: '700', alignItems: "center" }}>식단</Text>
                    {mealData ? (<ScrollView style={{ marginTop: heightPercentage(10) }}>
                        {Object.keys(mealData).map((date, index) => (
                            <View key={index} style={{ padding: widthPercentage(12), marginTop: heightPercentage(5), borderRadius: 10, backgroundColor: today === date ? colors.lightGreen : 'transparent', borderColor: colors.green, borderWidth: today === date ? 2 : 1 }}>
                                <Text style={{ fontSize: fontPercentage(14), color: colors.green, paddingBottom: heightPercentage(3), fontWeight: '600', alignItems: "center" }}>{`${date} (${mealData[date].day})`}</Text>
                                <Text style={{ fontSize: fontPercentage(13), paddingBottom: heightPercentage(2), fontWeight: '600', alignItems: "center" }}>아침</Text>
                                <Text style={{ fontSize: fontPercentage(12), paddingBottom: heightPercentage(5), fontWeight: '400', alignItems: "center" }}>{mealData[date].breakfast.join(', ')}</Text>
                                <Text style={{ fontSize: fontPercentage(13), paddingBottom: heightPercentage(2), fontWeight: '600', alignItems: "center" }}>점심</Text>
                                <Text style={{ fontSize: fontPercentage(12), paddingBottom: heightPercentage(5), fontWeight: '400', alignItems: "center" }}>{mealData[date].lunch.join(', ')}</Text>
                                <Text style={{ fontSize: fontPercentage(13), paddingBottom: heightPercentage(2), fontWeight: '600', alignItems: "center" }}>저녁</Text>
                                <Text style={{ fontSize: fontPercentage(12), paddingBottom: heightPercentage(5), fontWeight: '400', alignItems: "center" }}>{mealData[date].dinner.join(', ')}</Text>
                            </View>
                        ))}
                    </ScrollView>):(
                    <Text style={{ fontSize: fontPercentage(14), fontWeight: '600' }}>식단 데이터가 없습니다:({ }</Text>

                    )}
                    <View style={{ marginTop: heightPercentage(10), width: widthPercentage(100) }}>
                        <Button title="닫기" onPress={onClose} color={colors.green} />
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default MealModal;
