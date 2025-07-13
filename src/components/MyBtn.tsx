import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
} from 'react-native';
import { moderateScale } from '../utils/Responsive';

interface MyBtnProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    accessibilityLabel?: string;
}

const MyBtn = ({
    title,
    onPress,
    style = {},
    textStyle = {},
    accessibilityLabel,
}: MyBtnProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.btn, style]}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || title}
        >
            <Text style={[styles.btnText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default MyBtn;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'blue',
        padding: moderateScale(10),
        borderRadius: moderateScale(5),
        alignItems: 'center',
        marginVertical: moderateScale(10),
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
