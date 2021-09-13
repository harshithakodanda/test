import React, { memo } from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import { SOURCE_ICON } from "images";
import Layout from "components/Layout/Layout";

interface ExpertsItemProps {
  name: string;
  faculty: string;
  rate: number;
  numberOfReviews: number;
  avatar: ImageSourcePropType;
  online?: boolean;
  inNetwork?: boolean;
  address?: string;
}

const ExpertsItem = memo(
  ({
    name,
    faculty,
    rate,
    numberOfReviews,
    avatar,
    online,
    inNetwork,
    address,
  }: ExpertsItemProps) => {
    return (
      <Layout style={styles.container}>
        <View style={{ width: 64, borderRadius: 16, marginRight: 24 }}>
          <Image
            source={avatar}
            style={{ width: 64, height: 64, borderRadius: 16 }}
          />
          {online && (
            <Image
              source={require("images/ic_online_status.png")}
              style={{ position: "absolute", right: -16, top: -6 }}
            />
          )}
          <View
            style={{
              alignSelf: "center",
              zIndex: 10,
              marginTop: 8,
              height: 16,
            }}
          >
            {inNetwork && <Image source={SOURCE_ICON["in-network"]} />}
          </View>
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <Text size={15} lineHeight={18} color={Colors.DodgerBlue}>
            Dr.{name}
          </Text>
          <Text size={13} lineHeight={16}>
            {faculty}
          </Text>
          <View style={Theme.flexRow}>
            <Image source={require("images/ic_star_rate.png")} />
            <Text size={13} lineHeight={16} semibold marginLeft={5}>
              {rate}{" "}
              <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
                ({numberOfReviews} reviews)
              </Text>
            </Text>
          </View>
          <Text size={13} lineHeight={16}>
            {address}
          </Text>
        </View>
      </Layout>
    );
  }
);

export default ExpertsItem;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexDirection,
    padding: 24,
    borderRadius: 16,
    ...Theme.shadow,
    marginBottom: 16,
  },
});
