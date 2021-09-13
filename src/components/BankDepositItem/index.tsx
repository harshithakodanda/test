import { width } from "configs/Const";
import { SOURCE_ICON } from "images";
import React, { memo } from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import Theme from "style/Theme";
import Text from "components/Text";
import { Colors } from "configs";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated from "react-native-reanimated";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useTheme } from "configs/Theme";

interface BankDepositItemProps {
  id?: number;
  name?: String;
  accountNumber?: String;
  onPress?: () => void;
  onDefault?: () => void;
  isDefault?: boolean;
  isSelected?: boolean;
}

export default memo(
  ({
    name,
    accountNumber,
    onPress,
    onDefault,
    isDefault,
    isSelected,
  }: BankDepositItemProps) => {
    const { theme } = useTheme();
    const onSwipeRight = () => {
      return (
        <Animated.View>
          <View style={styles.secondPage}>
            <TouchableOpacity style={styles.delete} activeOpacity={0.54}>
              <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.default}
              activeOpacity={0.54}
              onPress={onDefault}
            >
              <Text style={styles.text}>Default</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.edit} activeOpacity={0.54}>
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    };

    return (
      <Swipeable
        renderRightActions={onSwipeRight}
        containerStyle={[
          styles.scrollView,
          { backgroundColor: theme.background },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.bankAccount,
            { backgroundColor: theme.backgroundItem },
          ]}
          onPress={onPress}
          activeOpacity={1}
        >
          <View style={[Theme.flexRowSpace, styles.checkBox]}>
            <View style={[{ ...Theme.icons, ...Theme.center }]}>
              {isSelected ? (
                <Image source={SOURCE_ICON.radioActive} />
              ) : (
                <View style={styles.unChecked} />
              )}
            </View>
          </View>
          <View style={Theme.flexDirection}>
            <View>
              <Text bold size={15} marginBottom={9}>
                {name}
              </Text>
              <Text>{accountNumber}</Text>
            </View>

            {isDefault ? (
              <Text marginLeft={8} color={Colors.GrayBlue}>
                Default
              </Text>
            ) : (
              <View></View>
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }
);

const styles = StyleSheet.create({
  bankAccount: {
    borderRadius: 12,
    ...Theme.flexRow,
    marginLeft: 24,
    height: 96,
  },
  scrollView: {
    marginBottom: 24,
    marginRight: 24,
    height: 96,
  },
  account: {
    ...Theme.flexRow,
    width: width - 36,
  },
  checkBox: {
    margin: 26,
  },
  delete: {
    backgroundColor: Colors.RedNeonFuchsia,
  },
  default: {
    backgroundColor: Colors.Orange,
  },
  edit: {
    backgroundColor: Colors.DodgerBlue,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  text: {
    textAlignVertical: "center",
    textAlign: "center",
    color: Colors.White,
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 16,
    width: 77,
    height: 96,
  },
  secondPage: {
    ...Theme.flexRow,
    borderRadius: 12,
  },
  unChecked: {
    width: 20,
    height: 20,
    borderColor: "#979797",
    borderRadius: 20,
    borderWidth: 1,
  },
});
