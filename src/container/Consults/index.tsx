import React, { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import ButtonIconHeader from "components/ButtonIconHeader";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import ScrollableTab from "components/ScrollableTab";
import TodayConsults from "./TodayConsults";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import PastConsults from "./PastConsults";
import { useNavigation } from "@react-navigation/native";
import Container from "components/Layout/Container";

interface ConsultsProps {}

const Consults = memo((props: ConsultsProps) => {
  const { navigate } = useNavigation();

  const onSearch = useCallback(() => {
    navigate(Routes.Search);
  }, [navigate]);
  const onSchedule = useCallback(() => {}, []);
  const onFilter = useCallback(() => {
    navigate(Routes.PastConsultsFilter);
  }, [navigate]);

  return (
    <Container style={styles.container}>
      <ScrollableTab
        titles={["Today Consults", "Past Consults"]}
        renderHeader={(index: number) => {
          return (
            <View style={Theme.header}>
              <ButtonIconHeader marginLeft={24} />

              <View style={Theme.flexRow}>
                <ButtonIconHeader
                  icon={require("images/ic_search_normal.png")}
                  tintColor={Colors.DodgerBlue}
                  borderColor={Colors.DodgerBlue}
                  marginRight={24}
                  onPress={onSearch}
                />
                {index === 0 && (
                  <ButtonIconHeader
                    icon={require("images/ic_calendar.png")}
                    tintColor={Colors.DodgerBlue}
                    marginRight={24}
                    borderColor={Colors.DodgerBlue}
                    onPress={onSchedule}
                  />
                )}
                {index === 1 && (
                  <ButtonIconHeader
                    icon={require("images/ic_filter.png")}
                    tintColor={Colors.DodgerBlue}
                    marginRight={24}
                    borderColor={Colors.DodgerBlue}
                    onPress={onFilter}
                  />
                )}
              </View>
            </View>
          );
        }}
      >
        <TodayConsults />
        <PastConsults />
      </ScrollableTab>
    </Container>
  );
});

export default Consults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
