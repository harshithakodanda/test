import React, { memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { width } from "configs/Const";
import keyExtractor from "utils/keyExtractor";
import HealthGuideItem from "components/HealthGuideItem";
import { Colors, Routes } from "configs";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/native";
import SavedGuideItem from "components/HealthGuideItem/SavedGuideItem";
import Container from "components/Layout/Container";

interface Props {
  data?: any;
}

export default memo(({ data }: Props) => {
  const { navigate } = useNavigation();
  const onSavedGuideItem = React.useCallback((item: any) => {
    navigate(Routes.HealthGuideSavedDetail, item);
  }, []);

  const renderSavedGuideItem = React.useCallback(({ item }) => {
    return <SavedGuideItem onPress={() => onSavedGuideItem(item)} {...item} />;
  }, []);

  return (
    <Container style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderSavedGuideItem}
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
