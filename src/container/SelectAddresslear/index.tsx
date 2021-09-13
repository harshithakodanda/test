import React, { memo, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView from "react-native-maps";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "configs";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import ButtonIconHeader from "components/ButtonIconHeader";
import TextInput from "components/TextInput";
import Theme from "style/Theme";
import { useTheme } from "configs/Theme";
import Layout from "components/Layout/Layout";

interface SelectAddressProps {}

const SelectAddress = memo((props: SelectAddressProps) => {
  const [keyword, setKeyword] = useState("");
  const { setOptions, navigate } = useNavigation();
  const { theme } = useTheme();

  useLayoutEffect(() => {
    setOptions({
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.backgroundHeader,
      },
      header: () => (
        <Layout
          style={{
            height: 108 - getStatusBarHeight(),
            paddingTop: getStatusBarHeight(),
            ...Theme.flexRow,
            paddingRight: 24,
          }}
        >
          <ButtonIconHeader
            marginLeft={24}
            icon={require("images/ic_close.png")}
            marginRight={24}
          />
          <TextInput
            iconLeft={
              <Image
                source={require("images/ic_pin_map.png")}
                style={styles.iconSearch}
              />
            }
            isShowIconLeft={true}
            value={keyword}
            style={Theme.flexOne}
            onChangeText={setKeyword}
            editable
            backgroundColor={Colors.Isabelline}
            borderColor={Colors.Isabelline}
            placeholder={"Enter country name, code..."}
          />
        </Layout>
      ),
    });
  }, [setOptions, keyword, setKeyword]);
  return (
    <View style={styles.container}>
      <Layout
        style={{
          paddingTop: 16,
          paddingBottom: 26,
          paddingHorizontal: 24,
          ...Theme.flexRow,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 16,
            backgroundColor: Colors.MediumTurquoise,
            marginRight: 24,
            ...Theme.center,
          }}
        >
          <Image
            source={require("images/ic_pin_map.png")}
            style={{
              ...styles.iconSearch,
              tintColor: Colors.White,
            }}
          />
        </View>
        <View>
          <Text size={13} lineHeight={16} color={Colors.BlueCrayola} semibold>
            Use current location
          </Text>
          <Text size={15} lineHeight={24}>
            102 Centre Boulevard Suite B, Sain...
          </Text>
        </View>
      </Layout>
      <View style={{ flex: 1 }}>
        <MapView style={StyleSheet.absoluteFillObject} />
      </View>
    </View>
  );
});

export default SelectAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconSearch: {
    width: 20,
    height: 20,
    tintColor: Colors.GrayBlue,
  },
});
