import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import scale from "utils/scale";
import { Colors } from "configs";
import CheckBox from "components/CheckBox";

interface DoctorItemProps {
  id: number;
  name: string;
  faculty: string;
  isInNetwork: boolean;
  img: ImageSourcePropType;
  onPress: () => void;
  isCheck?: boolean | number;
}

const DoctorItem = memo(
  ({
    id,
    name,
    faculty,
    isInNetwork,
    img,
    onPress,
    isCheck,
  }: DoctorItemProps) => {
    return (
      <TouchableOpacity
        style={{ ...Theme.flexRow, paddingHorizontal: 24, marginVertical: 12 }}
        onPress={onPress}
        activeOpacity={0.54}
      >
        <View
          style={{
            borderRadius: 20,
            width: scale(48),
            height: scale(48),
            marginRight: 24,
          }}
        >
          <Image source={img} style={{ width: scale(48), height: scale(48) }} />
        </View>
        <View>
          <Text
            size={15}
            lineHeight={18}
            bold={true}
            color={Colors.DodgerBlue}
            marginBottom={4}
          >
            Dr.{name}
          </Text>
          <Text size={13} lineHeight={16}>
            {faculty}
          </Text>
        </View>
        <CheckBox
          isCheck={isCheck}
          style={{ position: "absolute", right: 24 }}
          onPress={onPress}
        />
      </TouchableOpacity>
    );
  }
);

export default DoctorItem;

const styles = StyleSheet.create({
  container: {},
});
