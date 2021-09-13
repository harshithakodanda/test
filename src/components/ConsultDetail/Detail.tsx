import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image, ViewStyle } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import scale from "utils/scale";
import { ConsultsStatus, height } from "configs/Const";
import { consult } from "type/consult";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import Layout from "components/Layout/Layout";
import Line from "components/Layout/Line";

interface DetailProps {
  style?: ViewStyle;
  details: consult["details"];
  status: ConsultsStatus;
}

const Detail = memo((props: DetailProps) => {
  const { navigate } = useNavigation();
  const onWriteAnAnswer = useCallback(() => {
    navigate(Routes.WriteAnAnswer);
  }, []);
  return (
    <Layout style={[styles.container, props.style]}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Image source={require("images/ic_help_white.png")} />
        </View>
        <Text size={15} lineHeight={18} bold>
          Consult Details
        </Text>
      </View>
      <Line />
      <View style={{ paddingHorizontal: 24 }}>
        <Text size={15} lineHeight={18} marginTop={27} bold>
          {props.details.askFor}
        </Text>
        <Text size={15} lineHeight={24} marginTop={12}>
          {props.details.question}
        </Text>
        {props.details.image && (
          <View style={{ ...Theme.flexDirection, marginTop: 24 }}>
            <Image
              source={props.details.image.uri}
              style={{ width: scale(100), height: scale(72), marginRight: 16 }}
            />
            <View style={Theme.flexOne}>
              <Text size={13} lineHeight={22}>
                {props.details.image.title}
              </Text>
              <Text
                size={13}
                lineHeight={16}
                color={Colors.GrayBlue}
                marginTop={8}
              >
                {props.details.image.uploadTime}
              </Text>
            </View>
          </View>
        )}
      </View>
      {props.status === ConsultsStatus.completed && (
        <ButtonLinear
          white
          title={"Write an Answers"}
          style={styles.button}
          onPress={onWriteAnAnswer}
        />
      )}
    </Layout>
  );
});

export default Detail;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 24,
    ...Theme.shadow,
  },
  header: {
    ...Theme.flexRow,
    paddingBottom: 16,

    paddingHorizontal: 24,
  },
  button: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.TealBlue20,
    ...Theme.center,
    marginRight: 16,
  },
});
