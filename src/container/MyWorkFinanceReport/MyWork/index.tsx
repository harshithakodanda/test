import React, { memo, useCallback } from "react";
import { View, StyleSheet, Switch, FlatList } from "react-native";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import Theme from "style/Theme";
import FeatureItem from "components/FeatureItem";
import keyExtractor from "utils/keyExtractor";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { FEATURE_ICON } from "images/MyWork";
import Container from "components/Layout/Container";
import scale from "utils/scale";

const FEATURE = [
  {
    id: 0,
    img: FEATURE_ICON.financeReport,
    title: "Hani Hani Money",
    route: Routes.FinanceReport,
  },
  {
    id: 1,
    img: FEATURE_ICON.healthFeed,
    title: "Rule of 72",
    route: Routes.MyWorkTopics,
  },
  {
    id: 2,
    img: FEATURE_ICON.healthGuide,
    title: "Rule of 114",
    route: Routes.HealthGuide,
  },
  {
    id: 3,
    img: FEATURE_ICON.healthTip,
    title: "Rule of 144",
    route: Routes.HealthTips,
  },
  {
    id: 4,
    img: FEATURE_ICON.careTeam,
    title: "Financial Ratio Calculator",
    route: Routes.MyWorkNetwork,
  },
  {
    id: 5,
    img: FEATURE_ICON.consultMange,
    title: "EMI Calculator",
    route: Routes.ServicesManagement,
  },
];

export default memo(() => {
  const [clinicStatus, setClinicStatus] = React.useState<boolean>(true);

  const toggleSwitch = useCallback(() => {
    setClinicStatus(!clinicStatus);
  }, [clinicStatus]);

  const renderFeatureItem = useCallback(({ item, index }) => {
    return (
      <FeatureItem
        style={index % 2 === 0 ? { marginRight: 16 } : null}
        {...item}
      />
    );
  }, []);

  return (
    <Container style={styles.container}>
      <Text
        marginTop={getStatusBarHeight()}
        marginHorizontal={24}
        bold
        size={24}
        lineHeight={28}
      >
        Financial Tools
      </Text>

    
      <FlatList
        data={FEATURE}
        renderItem={renderFeatureItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={true}
      />
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    marginTop: scale(32),
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: getBottomSpace(),
  },
});
