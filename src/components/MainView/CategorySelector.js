import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../constants/colors';
import { widthPercentage, heightPercentage,fontPercentage } from '../../utils/ResponsiveSize';
import LinearGradient from 'react-native-linear-gradient';

const CategorySelector = ({ onSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState(7);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        onSelect(category); // 클릭된 카테고리를 상위 컴포넌트로 전달
    };

    return (
        <View style={{
            width: widthPercentage(250),
            paddingTop: heightPercentage(1.5),
            paddingBottom: heightPercentage(1.5),
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: colors.fontWhite,
            borderColor: "#D9D9D9",
            borderWidth: 1.5,
        }}>
            <TouchableOpacity
                style={{
                    paddingTop: heightPercentage(2),
                    paddingBottom: heightPercentage(3),
                    paddingHorizontal: widthPercentage(20),
                    borderRadius: 20,
                    backgroundColor: selectedCategory === 7 ? 'rgba(104, 185, 1, 0.80)' : '#fff',
                    borderColor: selectedCategory === 7 ? '#D9D9D9' : '#4CAF50',
                    borderWidth: 1.5,
                }}
                onPress={() => handleCategorySelect(7)}
            >
                <Text style={{
                    fontSize: fontPercentage(13),
                    fontWeight: 'bold',
                    color: selectedCategory === 7 ? '#fff' : '#4CAF50',
                }}>판매</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleCategorySelect(8)}
                style={{
                    paddingTop: heightPercentage(3),
                    paddingBottom: heightPercentage(4),
                    paddingHorizontal: widthPercentage(20),
                    borderRadius: 20,
                }}
            >
                <LinearGradient
                    colors={
                        selectedCategory === 8
                            ? ['rgba(104, 185, 1, 0.80)', 'rgba(64, 162, 219, 0.80)']
                            : ['#fff', '#fff']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        paddingTop: heightPercentage(2),
                        paddingBottom: heightPercentage(3),
                        paddingHorizontal: widthPercentage(20),
                        borderRadius: 20,
                        borderColor: selectedCategory === 8 ? '#D9D9D9' : '#4CAF50',
                        borderWidth: 1.5,
                    }}
                >
                    <Text
                        style={{
                            fontSize: fontPercentage(13),
                            fontWeight: 'bold',
                            color: selectedCategory === 8 ? '#fff' : '#4CAF50',
                        }}
                    >
                        공구
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    paddingTop: heightPercentage(2),
                    paddingBottom: heightPercentage(3),
                    paddingHorizontal: widthPercentage(19),
                    borderRadius: 20,
                    backgroundColor: selectedCategory === 9 ? 'rgba(64, 162, 219, 0.80)' : '#fff',
                    borderColor: selectedCategory === 9 ? '#D9D9D9' : '#4CAF50',
                    borderWidth: 1.5,
                }}
                onPress={() => handleCategorySelect(9)}
            >
                <Text style={{
                    fontSize: fontPercentage(13),
                    fontWeight: 'bold',
                    color: selectedCategory === 9 ? '#fff' : '#4CAF50',
                }}>나눔</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CategorySelector;
