import React, { memo } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import ButtonIcon from "components/ButtonIcon";
import { SOURCE_ICON } from "images";
import QuestionItem from "components/QuestionItem";
import UserInfo from "components/ConsultDetail/UserInfo";
import Layout from "components/Layout/Layout";

interface TopicsProps {}

const Topics = memo(({}: TopicsProps) => {
  return (
    <Layout style={styles.container}>
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
          Topics
        </Text>
      </View>
      {dataTopics.map((item) => (
        <TouchableOpacity
          key={item.id.toString()}
          style={{
            padding: 24,
            borderBottomWidth: 1,
            borderBottomColor: Colors.WhiteSmoke,
          }}
        >
          <Text size={15} lineHeight={24} color={Colors.DodgerBlue} medium>
            {item.name}
          </Text>
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
    </Layout>
  );
});

export default Topics;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    borderRadius: 16,
    marginTop: 16,
  },
});

const dataTopics = [
  {
    id: 0,
    name: "Swine flu",
  },
  {
    id: 1,
    name: "Flu shot (Immunization)",
  },
  {
    id: 2,
    name: "Avian flu (bird flu)",
  },
  {
    id: 3,
    name: "Preventing the Flu (Goal)",
  },
  {
    id: 4,
    name: "Flu (Influenza) (Condition)",
  },
];
