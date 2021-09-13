import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import { FrequencyProps } from "type/category";

interface ButtonChangeFrequencyProps {
  style?: any;
  frequency: FrequencyProps;
  onPress: () => void;
}

export default memo(
  ({ frequency, onPress, style }: ButtonChangeFrequencyProps) => {
    const onShowModal = useCallback(() => {
      onPress && onPress();
    }, [onPress]);

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onShowModal}>
        <Text
          size={15}
          lineHeight={24}
          marginLeft={8}
          color={Colors.DarkJungleGreen}
        >
          {frequency.name}
        </Text>
        <View style={styles.changeFrequency}>
          <Image source={require("images/down.png")} />
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Isabelline,
    backgroundColor: Colors.White,
    ...Theme.flexRow,
    paddingHorizontal: 16,
  },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
  changeFrequency: {
    position: "absolute",
    right: 16,
    alignSelf: "center",
  },
});
