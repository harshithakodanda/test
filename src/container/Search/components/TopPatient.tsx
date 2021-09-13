import React, { memo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";
import { Colors } from "configs";
import scale from "utils/scale";

interface TopPatientProps {}

const TopPatient = memo(({}: TopPatientProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text size={17} lineHeight={20} bold>
          Top Patient
        </Text>
        <TouchableOpacity style={Theme.flexRow}>
          <Text
            blueLight
            size={13}
            lineHeight={20}
            color={Colors.BlueCrayola}
            medium
          >
            See All
          </Text>
          <Image source={SOURCE_ICON.arrowRight} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...Theme.flexDirection,
          paddingHorizontal: 24,
          paddingTop: 24,
        }}
      >
        {dataTopPatient.map((item) => (
          <TouchableOpacity
            key={item.id.toString()}
            style={{
              width: scale(72),
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <Image source={item.avatar} />
            <Text size={11} lineHeight={14} center marginTop={12}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

export default TopPatient;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    ...Theme.flexRowSpace,
    paddingHorizontal: 24,
  },
});

const dataTopPatient = [
  {
    id: 0,
    avatar: require("images/avatar/sarah.png"),
    name: "Dylan Oliver",
  },
  {
    id: 1,
    avatar: require("images/avatar/sarah.png"),
    name: "Birdie McKenzie",
  },
  {
    id: 2,
    avatar: require("images/avatar/sarah.png"),
    name: "Jared Lee",
  },
  {
    id: 3,
    name: "Marion Berry",
    avatar: require("images/avatar/sarah.png"),
  },
];
