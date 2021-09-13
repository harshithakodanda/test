import React, { memo, useCallback } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Routes, Colors } from "configs";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import Theme from "style/Theme";
import Container from "components/Layout/Container";

const listScreen = [
  {
    id: 1,
    title: Routes.MonzoCardSelection,
    route: Routes.MonzoCardSelection,
  },
];
const Intro = memo(() => {
  const { navigate } = useNavigation();
  const renderItem = useCallback(
    ({ item }) => {
      const { title, route } = item;
      const onPressRoute = () => {
        navigate(route);
      };
      return (
        <TouchableOpacity
          onPress={onPressRoute}
          style={styles.item}
          activeOpacity={0.54}
        >
          <Text type={"H4"}>{title}</Text>
        </TouchableOpacity>
      );
    },
    [navigate]
  );

  return (
    <Container style={styles.container}>
      <Text type={"H2"}>Intro</Text>
      <FlatList
        data={listScreen}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.contentContainerStyle}
      />
    </Container>
  );
});

export default Intro;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  item: {
    paddingVertical: 12,
    borderBottomColor: Colors.Blue,
    borderBottomWidth: 1,
  },
  contentContainerStyle: {
    borderTopColor: Colors.Blue,
    borderTopWidth: 1,
    marginTop: 24,
  },
});
