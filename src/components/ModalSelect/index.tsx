import { width } from "configs/Const";
import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Theme from "style/Theme";
import Text from "components/Text";
import { Colors } from "configs";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import { useTheme } from "configs/Theme";
import Line from "components/Layout/Line";

interface ModalSelectProps {
  close: () => void;
  choices: { id: number; name: string; color?: string }[];
  onPressItem: (item: any) => void;
}

const ModalSelect = memo(
  ({ close, choices, onPressItem }: ModalSelectProps) => {
    const { theme } = useTheme();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={close}
        />
        <View
          style={{
            paddingBottom: getBottomSpace() + 12,
            width: width,
            zIndex: 10,
            paddingHorizontal: 16,
          }}
        >
          <View style={[styles.topBorder, styles.bottomBorder]}>
            {choices &&
              choices.map((item, index) => {
                const onPress = () => {
                  onPressItem && onPressItem(item);
                  close();
                };
                return (
                  <View>
                    <TouchableOpacity
                      key={item.id.toString()}
                      activeOpacity={0.54}
                      style={[
                        { backgroundColor: theme.backgroundItem },
                        styles.selectItem,
                        index === 0 && styles.topBorder,
                        index === choices.length - 1 && styles.bottomBorder,
                      ]}
                      {...{ onPress }}
                    >
                      <Text
                        color={item.color && item.color}
                        size={15}
                        lineHeight={18}
                        semiBold
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                    <Line />
                  </View>
                );
              })}
          </View>
          <Layout
            style={{
              ...styles.selectItem,
              ...styles.topBorder,
              ...styles.bottomBorder,
              marginTop: 24,
            }}
          >
            <TouchableOpacity
              style={{ ...StyleSheet.absoluteFillObject, ...Theme.center }}
              onPress={close}
              activeOpacity={0.54}
            >
              <Text size={15} lineHeight={18} semiBold color={Colors.GrayBlue}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Layout>
          <Line />
        </View>
      </View>
    );
  }
);

export default ModalSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000054",
    justifyContent: "flex-end",
  },
  selectItem: {
    height: 50,
    ...Theme.center,
  },
  topBorder: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomBorder: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
