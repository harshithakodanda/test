import React, { memo } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import ButtonIcon from "components/ButtonIcon";
import { SOURCE_ICON } from "images";
import QuestionItem from "components/QuestionItem";
import UserInfo from "components/ConsultDetail/UserInfo";
import DoctorRate from "components/DoctorRate";

interface ExpertsProps {}

const Experts = memo(({}: ExpertsProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...Theme.flexRow,
          paddingHorizontal: 24,
          borderBottomWidth: 1,
          borderBottomColor: Colors.WhiteSmoke,
          paddingBottom: 16,
        }}
      >
        <ButtonIcon
          icon={SOURCE_ICON.help}
          size={32}
          borderRadius={8}
          color={Colors.TealBlue20}
          disabled
        />
        <Text size={15} lineHeight={18} bold marginLeft={16}>
          Experts
        </Text>
      </View>
      {dataExperts.map((item) => (
        <TouchableOpacity
          style={{
            padding: 24,
            borderBottomColor: Colors.WhiteSmoke,
            borderBottomWidth: 1,
          }}
          activeOpacity={0.54}
          key={item.id.toString()}
        >
          <DoctorRate {...item} />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={{
          padding: 12,
          ...Theme.center,
          borderTopColor: Colors.WhiteSmoke,
          borderTopWidth: 1,
          ...Theme.flexDirection,
        }}
      >
        <Text size={13} lineHeight={22} color={Colors.DodgerBlue}>
          See All
        </Text>
        <Image
          source={SOURCE_ICON.arrowRight}
          style={{ width: 16, height: 16, marginLeft: 4 }}
        />
      </TouchableOpacity>
    </View>
  );
});

export default Experts;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: Colors.White,
    borderRadius: 16,
    marginTop: 16,
  },
});

const dataExperts = [
  {
    id: 0,
    name: "Jordan Singleton",
    faculty: "Physical Medicine & Rehabilitat...",
    rate: 4.6,
    numberOfReviews: 141,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    inNetwork: true,
  },
  {
    id: 1,
    name: "Lucy Mann",
    faculty: "Anesthesiology",
    rate: 4.8,
    numberOfReviews: 753,
    avatar: require("images/avatar/sarah.png"),
    online: true,
  },
  {
    id: 2,
    name: "Janie Phillips",
    faculty: "Pediatrics",
    rate: 4.8,
    numberOfReviews: 234,
    avatar: require("images/avatar/sarah.png"),
    online: true,
  },
  {
    id: 3,
    name: "Donald Gregory",
    faculty: "Emergency Medicine",
    rate: 4.8,
    numberOfReviews: 141,
    avatar: require("images/avatar/sarah.png"),
    online: true,
  },
  {
    id: 4,
    name: "Alfred Craig",
    faculty: "Pediatrics",
    rate: 4.6,
    numberOfReviews: 234,
    avatar: require("images/avatar/sarah.png"),
    online: true,
  },
];
