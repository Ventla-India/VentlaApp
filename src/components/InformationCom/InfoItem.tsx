import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import ImagePath from '../../constant/ImagePath';

interface InfoItemProps {
    type: 'info' | 'logo' | 'image';
    text: string;
}

const InfoItem = ({ type, text }: InfoItemProps) => {
    const renderIcon = () => {
        switch (type) {
            case 'info':
                return (
                    <Image source={ImagePath.informationIcon} style={styles.icon} />

                );
            case 'logo':
                return <Text style={styles.logo}>ventla</Text>;
            case 'image':
                return (
                    <Image
                        source={{ uri: ImagePath.informationIcon }}
                        style={styles.image}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {renderIcon()}
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: moderateScale(12),
        borderRadius: moderateScale(10),
        marginVertical: verticalScale(6),
        elevation: 1,
    },
    icon: {
        marginRight: scale(10),
    },
    text: {
        fontSize: moderateScale(14),
    },
    logo: {
        fontWeight: 'bold',
        color: '#800080',
        fontSize: moderateScale(16),
        marginRight: scale(10),
    },
    image: {
        width: scale(60),
        height: verticalScale(40),
        marginRight: scale(10),
        borderRadius: moderateScale(6),
    },
});

export default InfoItem;
