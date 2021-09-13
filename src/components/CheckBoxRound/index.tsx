import React, { memo } from "react";
import {
    View,
    StyleSheet,
    Image,
    ViewStyle,
    TouchableOpacity,
} from "react-native";
import Theme from "style/Theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SOURCE_ICON } from "images";
import { round } from "react-native-redash";

interface CheckBoxProps {
    isCheck?: boolean | number;
    style?: ViewStyle;
    onPress?: () => void;
}

const CheckBox = memo(({ isCheck, style, onPress }: CheckBoxProps) => {
    return (
        <TouchableOpacity
            style={{ ...Theme.icons, ...Theme.center, ...style }}
            onPress={onPress}
        >
            {isCheck ? (
                    <Image source={SOURCE_ICON.radioActive} />
            ) : (
                    <View
                        style={styles.unChecked}
                    />
                )}
        </TouchableOpacity>
    );
});

export default CheckBox;

const styles = StyleSheet.create({
    container: {},
    unChecked: {
        width: 20,
        height: 20,
        borderColor: "#979797",
        borderRadius: 20,
        borderWidth: 1,
    },
});