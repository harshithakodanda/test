import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import SharedFileItem from "./SharedFileItem";
import { height } from "configs/Const";
import Layout from "components/Layout/Layout";
import Container from "components/Layout/Container";

interface ModalSharedFileProps {}

const ModalSharedFile = memo(({}: ModalSharedFileProps) => {
  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text size={17} lineHeight={20} bold>
          Shared File
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingTop: 16 }}
        style={{ height: height * 0.6 }}
      >
        {dataSharedFile.map((item) => (
          <SharedFileItem key={item.id.toString()} {...item} />
        ))}
      </ScrollView>
    </Container>
  );
});

const dataSharedFile = [
  {
    id: 0,
    image: require("images/down.png"),
    name: "Redness on the back of the neck",
    uploadTime: "Uploaded Jan, 05 2020",
  },
  
];

export default ModalSharedFile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 22,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WhiteSmoke,
  },
});
