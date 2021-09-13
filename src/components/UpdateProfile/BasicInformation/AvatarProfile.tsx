import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Text from "components/Text";
import scale from "utils/scale";
import Theme from "style/Theme";
import { Colors } from "configs";
interface AvatarProfileProps {
  onPress?: () => void;
}

const AvatarProfile = (props: AvatarProfileProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          source={require("images/avatar/sarah.png")}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={Theme.flexOne}>
        <TouchableOpacity style={styles.buttonUpload} onPress={props.onPress}>
          <Text white size={13} lineHeight={16} bold>
            Upload Your Avatar
          </Text>
        </TouchableOpacity>
        <Text size={13} lineHeight={22} marginTop={12}>
          Your avatar should is a friendly and inviting head shot. Clearly
          indentifiable as you.
        </Text>
      </View>
    </View>
  );
};

export default AvatarProfile;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(40),
    ...Theme.flexRow,
  },
  avatar: {
    width: scale(112),
    height: scale(112),
    borderRadius: 36,
    marginRight: 24,
    overflow: "hidden",
  },
  buttonUpload: {
    height: 36,
    marginRight: 19,
    backgroundColor: Colors.TealBlue,
    ...Theme.center,
    borderRadius: 8,
  },
});
