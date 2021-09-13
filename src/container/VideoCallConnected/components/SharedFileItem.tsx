import React, { memo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import scale from "utils/scale";
import { Colors } from "configs";

interface SharedFileItemProps {
  image: ImageSourcePropType;
  size?: string;
  name: string;
  uploadTime?: string;
}

const SharedFileItem = memo(
  ({ image, size, name, uploadTime }: SharedFileItemProps) => {
    return (
      <TouchableOpacity style={{ ...Theme.flexDirection, marginVertical: 16 }}>
        <Image
          source={image}
          style={{ width: scale(100), height: scale(72), borderRadius: 4 }}
        />
        <View style={{ ...Theme.flexOne, marginLeft: 16 }}>
          <Text size={15} lineHeight={24} marginBottom={8}>
            {name}
          </Text>
          <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
            {uploadTime || size}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export default SharedFileItem;

const styles = StyleSheet.create({
  container: {},
});
