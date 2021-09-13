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
import { Colors, Routes } from "configs";
import { useNavigation } from "@react-navigation/native";

interface HospitalItemProps {
  name: string;
  logo: ImageSourcePropType;
  address: string;
  distance: number;
  rate: number;
  numberReview: number;
}

const HospitalItem = memo(
  ({
    name,
    logo,
    address,
    distance,
    rate,
    numberReview,
  }: HospitalItemProps) => {
    const { navigate } = useNavigation();
    return (
      <TouchableOpacity
        style={{
          ...Theme.flexDirection,
          backgroundColor: Colors.White,
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 16,
          borderRadius: 16,
          ...Theme.shadow,
          marginBottom: 16,
        }}
        onPress={() => {
          navigate(Routes.HospitalDetail, {
            hospital: { name, logo, address, distance, rate, numberReview },
          });
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={logo}
            style={{ width: 64, height: 64, marginBottom: 10 }}
          />
          <Text>{distance} mil</Text>
        </View>
        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text size={15} lineHeight={18} bold color={Colors.DodgerBlue}>
            {name}
          </Text>
          <Text size={13} lineHeight={16} marginTop={8}>
            {address}
          </Text>
          <View style={{ ...Theme.flexRow, marginTop: 8 }}>
            <Image source={require("images/ic_star_rate.png")} />
            <Text size={13} lineHeight={16} semibold marginLeft={5}>
              {rate}{" "}
              <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
                ({numberReview} reviews)
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

export default HospitalItem;

const styles = StyleSheet.create({
  container: {},
});
