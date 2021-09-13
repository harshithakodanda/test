import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Colors } from "configs";
import Theme from "style/Theme";
import Text from "components/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "configs/Theme";

interface PhotosItemProps {
  id?: number;
  image?: any;
  name?: String;
  date?: String;
  size?: String;
  onPress?: () => void;
}

export default memo(({ image, name, date, size, onPress }: PhotosItemProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.backgroundItem }]}
      activeOpacity={0.54}
      onPress={onPress}
    >
      <Image style={styles.image} source={image} />
      <View style={styles.view}>
        <Text marginBottom={8} bold>
          {name}
        </Text>
        <Text marginBottom={8} color={Colors.GrayBlue}>
          {date}
        </Text>
        <Text color={Colors.GrayBlue}>{size}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    borderRadius: 16,
    backgroundColor: Colors.White,
    marginBottom: 12,
    shadowColor: "rgba(0, 64, 128, 0.04)",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 2,
  },
  image: {
    marginVertical: 24,
    marginRight: 24,
    marginLeft: 16,
    width: 78,
    height: 64,
    borderRadius: 4,
  },
  view: {
    marginVertical: 24,
  },
});
