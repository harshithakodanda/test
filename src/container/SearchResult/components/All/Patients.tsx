import React, { memo } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import ButtonIcon from "components/ButtonIcon";
import { SOURCE_ICON } from "images";
import QuestionItem from "components/QuestionItem";
import UserInfo from "components/ConsultDetail/UserInfo";

interface PatientsProps {}

const Patients = memo(({}: PatientsProps) => {
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
          Patients
        </Text>
      </View>
      {dataPatients.map((item) => (
        <UserInfo
          user={item}
          key={item.id.toString()}
          style={{
            borderRadius: 0,
            shadowRadius: 0,
            elevation: 0,
            shadowColor: "transparent",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            borderBottomWidth: 1,
            borderBottomColor: Colors.WhiteSmoke,
          }}
        />
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

export default Patients;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: Colors.White,
    borderRadius: 16,
    marginTop: 16,
  },
});

const dataPatients = [
  {
    id: 0,
    name: "Lulu Farmer",
    gender: "Female",
    age: 21,
    phone: "789-109-4926",
    img: require("images/avatar/sarah.png"),
  },
  {
    id: 1,
    name: "Ada Pierce",
    gender: "Female",
    age: 25,
    phone: "211-330-8852",
    img: require("images/avatar/sarah.png"),
  },
  {
    id: 2,
    name: "Bess Newton",
    gender: "Female",
    age: 23,
    phone: "895-986-8551",
    img: require("images/avatar/sarah.png"),
  },
  {
    id: 3,
    name: "Paul Yates",
    gender: "Male",
    age: 30,
    phone: "896-771-7037",
    img: require("images/avatar/sarah.png"),
  },
  {
    id: 4,
    name: "Ada Graves",
    gender: "Male",
    age: 23,
    phone: "034-807-8944",
    img: require("images/avatar/sarah.png"),
  },
];
