import React, { memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { width } from "configs/Const";
import keyExtractor from "utils/keyExtractor";
import TopicItem from "components/TopicItem";
import { Colors, Routes } from "configs";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/native";
import Container from "components/Layout/Container";

interface Props {
  data?: any;
}

export default memo(({ data }: Props) => {
  const { navigate } = useNavigation();
  const onTopicItem = React.useCallback((item: any) => {
    navigate(Routes.TopicDetails, item);
  }, []);

  const renderTopicItem = React.useCallback(({ item }) => {
    return <TopicItem onPress={() => onTopicItem(item)} {...item} />;
  }, []);

  return (
    <Container style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderTopicItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: getBottomSpace(),
  },
});
