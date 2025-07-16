import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, View, ActivityIndicator, Image, StyleSheet } from "react-native";
import imagePath from "../constant/ImagePath";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { moderateScale } from "../utils/Responsive";
import COLORS from "../constant/Color";
import { WrapperContainerProps } from './ComponentsInterface';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    loaderView: {
        flex: 1,
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    logoStyle: {
        width: moderateScale(60),
        height: moderateScale(60),
    },
    indicatorStyle: {
        marginTop: moderateScale(-50),
    },
});

const WrapperContainer = ({
    children,
    style,
    isLoading,
    isSafeAreaView = true,
    statusBarColor = COLORS.App_Theme,
    statusBarContentColor = "light-content",
}: WrapperContainerProps): React.JSX.Element => {
    const rotation = useSharedValue(0);
    const shakeX = useSharedValue(0);

    // Define animation styles
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: shakeX.value },
            { rotate: `${rotation.value}deg` },
        ],
    }));

    useEffect(() => {
        // Horizontal shake animation
        shakeX.value = withRepeat(
            withTiming(5, { duration: 100 }),
            -1,
            true
        );
        // 360-degree rotation animation
        rotation.value = withRepeat(
            withTiming(360, { duration: 800 }),
            -1,
            false
        );
        return () => {
            shakeX.value = 0;
            rotation.value = 0;
        };
    }, []);

    if (isSafeAreaView) {
        return (
            <SafeAreaView style={[styles.container, style]}>
                <StatusBar barStyle={statusBarContentColor} backgroundColor={statusBarColor} />
                {children}
                {isLoading && (
                    <View style={styles.loaderView} pointerEvents="box-none">
                        <Animated.View style={animatedStyle}>
                            <Image
                                style={styles.logoStyle}
                                resizeMode="contain"
                                source={imagePath.backIcon}
                            />
                        </Animated.View>
                    </View>
                )}
            </SafeAreaView>
        );
    }

    return (
        <View style={[styles.container, style]}>
            <StatusBar barStyle={statusBarContentColor} backgroundColor={statusBarColor} />
            {children}
            {isLoading && (
                <View style={styles.loaderView} pointerEvents="box-none">
                    <Animated.View style={animatedStyle}>
                        <Image
                            style={styles.logoStyle}
                            resizeMode="contain"
                            source={imagePath.backIcon}
                        />
                    </Animated.View>
                </View>
            )}
        </View>
    );
};

export default React.memo(WrapperContainer);