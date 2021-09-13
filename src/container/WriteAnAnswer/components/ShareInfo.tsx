import React, { memo } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";

interface ShareInfoProps {
  information: any;
}

const ShareInfo = memo(({ information }: ShareInfoProps) => {
  return (
    <View style={Theme.flexDirection}>
      <View
        style={{ width: 64, height: 64, borderRadius: 16, marginRight: 24 }}
      >
        <Image
          source={require("images/avatar/sarah.png")}
          style={{ width: 64, height: 64, borderRadius: 16 }}
        />
        <Image
          source={require("images/ic_online_status.png")}
          style={{ position: "absolute", right: -16, top: -6 }}
        />
        <Image
          source={require("images/ic_my_network.png")}
          style={{ position: "absolute", bottom: -19, alignSelf: "center" }}
        />
      </View>
      <View style={{ justifyContent: "space-between" }}>
        <Text size={15} lineHeight={18} color={Colors.DodgerBlue}>
          Dr.Margaret Wells
        </Text>
        <Text size={13} lineHeight={16}>
          Allergy & Immunology
        </Text>
        <View style={Theme.flexRow}>
          <Image source={require("images/ic_star_rate.png")} />
          <Text size={13} lineHeight={16} marginLeft={5}>
            4.8{" "}
            <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
              (1387 reviews)
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
});

export default ShareInfo;

const styles = StyleSheet.create({
  container: {},
});
