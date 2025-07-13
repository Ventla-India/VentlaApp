import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    FlatList,
    ViewToken,
} from 'react-native';
import Header from '../../components/Header';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { moderateScale } from '../../utils/Responsive';
import GenericFlatList from '../../components/GenericFlatList';

const { width, height } = Dimensions.get('window');

type InformationDetailRouteParams = {
    information: any[];
    selectedIndex: number;
};

const InformationDetail = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, InformationDetailRouteParams>, string>>();
    const { information = [], selectedIndex = 0 } = route.params || {};
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);

    const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
        }
    });

    const slides = information.map((item, idx) => ({
        id: item.Id?.toString() || idx.toString(),
        text: item.Name || 'No Name Provided',
        backgroundColor: '#9DD6EB',
    }));

    useEffect(() => {
        if (flatListRef.current && slides.length > 0) {
            // @ts-ignore
            flatListRef.current.scrollToIndex({ index: selectedIndex, animated: false });
        }
    }, [selectedIndex, slides.length]);

    const renderSlideItem = ({ item }: { item: { id: string; text: string; backgroundColor: string } }) => (
        <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
            <Text style={styles.text}>{item.text}</Text>
        </View>
    );

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    return (
        <SafeAreaView style={styles.container}>
            <Header title="VentlaApp" showMenu={false} showBack={true} />
            <View style={styles.sliderContainer}>
                <GenericFlatList
                    data={slides}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderSlideItem}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                />

                {/* Dots Indicator */}
                {/* <View style={styles.dotsContainer}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sliderContainer: {
        flex: 1,
        height: height * 0.45,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        overflow: 'hidden',
        justifyContent: 'flex-end',
        marginTop: moderateScale(50),
    },
    slide: {
        width,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: moderateScale(10),
    },
    dot: {
        width: moderateScale(10),
        height: moderateScale(10),
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#000',
    },
});

export default InformationDetail;
