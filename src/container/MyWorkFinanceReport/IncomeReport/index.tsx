import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "components/Text";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Theme from "style/Theme";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors } from "configs";
import ScrollableTab from "components/ScrollableTab";
import DailyReport from "components/IncomeReport/BaseOnServices";
import BaseOnTime from "components/IncomeReport/BaseOnServices/DailyReport";
import Container from "components/Layout/Container";

export default memo(() => {
  const { setOptions } = useNavigation();

  useFocusEffect(React.useCallback(() => {}, []));

  React.useLayoutEffect(() => {
    setOptions({
      title: false,
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerStyle: Theme.headerStyle,
      headerBackground: () => (
        <Container style={{ ...Theme.headerBackGround }} />
      ),
    });
  }, [setOptions]);

  const renderHeader = React.useCallback(() => {
    return (
      <Text marginTop={24} marginLeft={24} bold size={24} lineHeight={28}>
        Daybook Report
      </Text>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollableTab
        titles={["Daily Report","GL Report"]}
        labelStyle={styles.labelStyle}
        renderHeader={renderHeader}
      >
        <DailyReport />
        <BaseOnTime />
      </ScrollableTab>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
