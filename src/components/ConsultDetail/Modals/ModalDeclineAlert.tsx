import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import ButtonBorder from "components/Buttons/ButtonBorder";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { consult } from "type/consult";
import Layout from "components/Layout/Layout";

interface ModalDeclineAlertProps {
  close: () => void;
  user: consult["user"];
  openSendReason?: () => void;
}

const ModalDeclineAlert = memo((props: ModalDeclineAlertProps) => {
  const onConfirm = useCallback(() => {
    props.openSendReason && props.openSendReason();
    props.close();
  }, [props]);
  const onCancel = useCallback(() => {
    props.close();
  }, [props]);
  return (
    <View style={styles.container}>
      <Layout
        style={{
          paddingBottom: 32,
          paddingTop: 48,
          paddingHorizontal: 24,
          borderRadius: 16,
        }}
      >
        <Image
          source={require("images/img_warning.png")}
          style={{ alignSelf: "center" }}
        />
        <Text
          size={15}
          lineHeight={24}
          center
          marginTop={32}
          marginBottom={32}
          marginLeft={8}
          marginRight={8}
        >
          Are you sure want to decline voice call request from{" "}
          <Text size={15} lineHeight={24} bold>
            {props.user.name}
          </Text>
          ?
        </Text>
        <View style={Theme.flexRow}>
          <ButtonBorder
            style={{ flex: 1, marginRight: 8 }}
            title={"Yes"}
            onPress={onConfirm}
          />
          <ButtonLinear
            white
            styleButton={{ flex: 1, marginLeft: 8 }}
            style={{ marginTop: 0 }}
            title={"No"}
            onPress={onCancel}
          />
        </View>
      </Layout>
    </View>
  );
});

export default ModalDeclineAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Black68,
    ...Theme.center,
    paddingHorizontal: 16,
  },
});
