import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import WithdrawHistoryItem from "components/WithdrawHistory/WithdrawHistoryItem";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import Line from "components/Layout/Line";
import numeral from "numeral";
import { formatNumber } from "utils/formatNumber";

const WITHDRAW_HISTORY = [
  {
    id: 0,
    title: "Payout December",
    time: "09:15 AM 01/02/2020",
    amount: 8120,
  },
  {
    id: 1,
    title: "Payout November",
    time: "10:15 AM 12/01/2019",
    amount: 6450,
  },
  {
    id: 2,
    title: "Payout October",
    time: "04:27 PM 11/03/2019",
    amount: 5280,
  },
  {
    id: 3,
    title: "Payout September",
    time: "10:15 AM 10/02/2019",
    amount: 6790,
  },
  {
    id: 4,
    title: "Payout August",
    time: "10:15 AM 09/03/2019",
    amount: 6450,
  },
  {
    id: 5,
    title: "Payout July",
    time: "10:15 AM 09/03/2019",
    amount: 6910,
  },
];

export default memo(() => {
  const { setOptions } = useNavigation();
  const [withdrew, setWithdrew] = React.useState<number>(0);
  const [withdrewHistory, setWithdrewHistory] = React.useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      setWithdrew(40000);
      setWithdrewHistory(WITHDRAW_HISTORY);
    }, [])
  );

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

  return (
    <Container style={styles.container}>
      <Text
        marginTop={24}
        marginBottom={12}
        bold
        size={24}
        lineHeight={28}
        marginLeft={24}
      >
        Withdraw History
      </Text>
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <Layout style={styles.box}>
          <View style={[styles.topView, Theme.flexRowSpace]}>
            <Text size={17} lineHeight={20} bold>
              Withdrew
            </Text>

            <Text bold size={40} lineHeight={59}>
              {formatNumber(withdrew)}
            </Text>
          </View>
          <Line />
          {withdrewHistory.map((item: any, index: number) => {
            return <WithdrawHistoryItem key={index} {...item} />;
          })}
        </Layout>
      </ScrollView>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
  box: {
    paddingVertical: 24,
    marginHorizontal: 24,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    marginTop: 28,
  },
  topView: {
    paddingHorizontal: 24,
    paddingBottom: 17,
  },
});
