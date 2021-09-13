import React, { memo } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
interface ButtonAddProps {
  title: string;
  onPress?: () => void;
}

const ButtonAdd = memo((props: ButtonAddProps) => {
  return (
    <TouchableOpacity style={styles.buttonAdd} onPress={props.onPress}>
      <Image
        source={require("images/ic_add_16.png")}
        style={styles.iconRight}
      />
      <Text size={13} lineHeight={16} color={Colors.GrayBlue} bold>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
});

export default ButtonAdd;

const styles = StyleSheet.create({
  buttonAdd: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.Platinum,
    height: 36,
    ...Theme.center,
    borderRadius: 8,
    ...Theme.flexDirection,
  },
  iconRight: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});
