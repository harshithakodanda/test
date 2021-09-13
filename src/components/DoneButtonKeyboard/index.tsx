import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { useKeyboardShowTranslation } from "hooks/useKeyboardShowTranslation";
import Animated from "react-native-reanimated";
import { Colors } from "configs";
import Theme from "style/Theme";

interface DoneButtonKeyboardProps {
  onPress: () => void;
}

const DoneButtonKeyboard = memo((props: DoneButtonKeyboardProps) => {
  const { doneButtonTranslate } = useKeyboardShowTranslation(72);
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: doneButtonTranslate }] },
      ]}
    >
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text size={13} lineHeight={18} semibold color={Colors.WhiteSmoke}>
          Done
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

export default DoneButtonKeyboard;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -60,
    right: 16,
  },
  button: {
    backgroundColor: Colors.GrayBlue,
    padding: 12,
    borderRadius: 4,
    ...Theme.center,
  },
});
