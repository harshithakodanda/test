import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Theme from "style/Theme";
import Text from "components/Text";
import { Colors } from "configs";

interface AddAnswerProps {
  onShowSearchMedication: () => void;
  onShowShareFiles: () => void;
  onShareInfo: () => void;
  style: ViewStyle;
}

const AddAnswer = (props: AddAnswerProps) => {
  const {
    onShareInfo,
    onShowSearchMedication,
    onShowShareFiles,
    style,
  } = props;
  return (
    <View style={style}>
      <TouchableOpacity style={Theme.flexRow} onPress={onShowSearchMedication}>
        <Image source={require("images/down.png")} />
        <Text marginLeft={8} size={11} lineHeight={14}>
          Add {"\n"}Medication
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={Theme.flexRow} onPress={onShowShareFiles}>
        <Image source={require("images/ic_add_file.png")} />
        <Text marginLeft={8} size={11} lineHeight={14}>
          Add {"\n"}Files
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={Theme.flexRow} onPress={onShareInfo}>
        <Image source={require("images/ic_share_info.png")} />
        <Text marginLeft={8} size={11} lineHeight={14}>
          Share {"\n"}Info
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAnswer;

const styles = StyleSheet.create({
  container: {},
});
