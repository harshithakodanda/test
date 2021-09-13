import React, { memo, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Platform } from "react-native";
import Text from "components/Text";
import kFormat from "utils/format/kFormat";
import { Colors } from "configs";
import Theme from "style/Theme";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { width } from "configs/Const";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { SOURCE_ICON } from "images";
import ButtonIconHeader from "components/ButtonIconHeader";
import scale from "utils/scale";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";

export default memo(({ route }: any) => {
  const tipDetail = route && route.params;

  const {
    image,
    title,
    thanks,
    avatar,
    action,
    name,
    quantity,
    shareOn,
    description,
  } = tipDetail;

  const handlePressThank = React.useCallback(() => {}, []);
  const handlePressShare = React.useCallback(() => {}, []);

  useEffect(()=>{
    console.log("tipDetail")
  },[tipDetail])

  return (
    <Container style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        scrollEventThrottle={16}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Image style={styles.image} source={image} />
        <Text
          bold
          size={24}
          lineHeight={28}
          marginHorizontal={24}
          marginTop={32}
        >
          {title}
        </Text>
        <Text
          size={13}
          lineHeight={16}
          marginTop={16}
          marginLeft={24}
          color={Colors.GrayBlue}
        >
          {kFormat(thanks)} Thanks
        </Text>
        <Text size={13} lineHeight={16} marginTop={32} marginLeft={24}>
          Created by
        </Text>
        <View style={styles.details}>
          <Image style={styles.avatar} source={avatar} />
          <View>
            <Text bold size={15} lineHeight={18} color={Colors.DodgerBlue}>
              {name}
            </Text>
            <Text marginTop={4} size={13} lineHeight={16}>
              {quantity}
            </Text>
          </View>
        </View>
        <Text marginTop={16} marginLeft={24} size={13} lineHeight={16}>
          {action} a tip on <Text color={Colors.DodgerBlue}>{shareOn}</Text>
        </Text>
        <Text size={15} lineHeight={24} marginTop={27} marginHorizontal={24}>
          {description}
        </Text>
      </ScrollView>
      <Layout style={styles.buttonThank}>
        <ButtonLinear
          leftChildren={
            <Image source={SOURCE_ICON.thanks} style={{ marginRight: 8 }} />
          }
          style={{ marginTop: 0 }}
          title={"Thanks!"}
          onPress={handlePressThank}
          white
        />
      </Layout>
      <View style={styles.header}>
        <ButtonIconHeader
          backgroundColor={Colors.DarkJungleGreenOpacity}
          style={styles.buttonHeader}
          tintColor={Colors.White}
        />
        <ButtonIconHeader
          backgroundColor={Colors.DarkJungleGreenOpacity}
          style={styles.buttonHeader}
          icon={SOURCE_ICON.share}
          onPress={handlePressShare}
        />
      </View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: scale(264),
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 16,
  },
  details: {
    ...Theme.flexRow,
    marginTop: 16,
    marginLeft: 24,
  },
  buttonThank: {
    position: "absolute",
    width: width,
    bottom: 0,
    paddingBottom: getBottomSpace() + 16,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 96,
  },
  header: {
    ...Theme.flexRowSpace,
    position: "absolute",
    width: width,
    paddingHorizontal: 24,
    top: Platform.OS === "ios" ? getStatusBarHeight() + 22 : 22,
  },
  buttonHeader: {
    borderWidth: 0,
    borderRadius: 12,
  },
});
