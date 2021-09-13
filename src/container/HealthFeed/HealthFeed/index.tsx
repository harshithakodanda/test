import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import Theme from "style/Theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { formatNumber } from "utils/formatNumber";
import { FEATURE_ICON } from "images/MyWork";
import FeatureItem from "components/FeatureItem";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import { getData } from "storage/store";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import axios from "axios";
import { production } from "api/api";
const FEATURE = [
  {
    id: 0,
    img: FEATURE_ICON.incomeReport,
    title: "Daybook Report",
    route: Routes.DaybookReport,
  },
  {
    id: 1,
    img: FEATURE_ICON.withdraw,
    title: "Transfer Scroll Report",
  },
];

const today = new Date();

export default memo(() => {
  const { navigate, setOptions } = useNavigation();
  const [openingBalance, setOpeningBalance] = React.useState<number>(0);
  const [closingBalance, setClosingBalance] = React.useState<number>(0);
  const [moneyIn, setMoneyIn] = useState(0);
  const [moneyOut, setMoneyOut] = useState(0);
  const [orgId, setOrgId] = useState(null);

  const isFocused = useIsFocused();

  const getDailyBalance = async (id: any) => {
    const response = await axios.get(production.GetDailyBalance + "?Id=" + id);
    console.log(response.data);
    setOpeningBalance(response.data["openingBalance"]);
    setClosingBalance(response.data["closingBalance"]);
    setMoneyIn(response.data["totalCashIn"]);
    setMoneyOut(response.data["totalCashOut"]);
    //console.log(production.GetDailyBalance+"?Id="+id)
  };

  useEffect(() => {
    getData("userOrganizationProfileData").then((res) => {
      if (res) {
        //  console.log(res)
        setOrgId(res.id);
        getDailyBalance(res.id);
      } else setOrgId(null);
    });
  }, [isFocused]);

  useLayoutEffect(() => {
    setOptions({
      title: false,
    });
  }, [setOptions]);

  const onWithDrawHistory = () => {
    navigate(Routes.WithdrawHistory);
  };

  return (
    <Container style={styles.container}>
      <Text
        marginTop={getStatusBarHeight()}
        marginHorizontal={24}
        bold
        size={24}
        lineHeight={28}
      >
        Cash Book
      </Text>
      <Text style={{ textAlign: "right", marginRight: 30 }}>
        {today.getDate()}
        {"/"}
        {today.getMonth() + 1}
        {"/"}
        {today.getFullYear()}
      </Text>
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      >
        <Layout style={styles.box}>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>Opening Balance</Text>
            <Text size={17}>{formatNumber(openingBalance)}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>Closing Balance</Text>
            <Text size={17}>{formatNumber(closingBalance)}</Text>
          </View>
          <View style={[{ marginTop: 55 }, Theme.flexRowSpace]}>
            <Text size={15}>Total Money In</Text>
            <Text size={17}>{formatNumber(moneyIn)}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>Total Money Out</Text>
            <Text size={17}>{formatNumber(moneyOut)}</Text>
          </View>
        </Layout>
        <View style={[styles.featureView, Theme.flexRowSpace]}>
          {FEATURE.map((item, index) => {
            return <FeatureItem key={index} {...item} />;
          })}
        </View>

        <Layout style={styles.box}>
          <View style={[{ marginTop: 0 }]}>
            <Text size={20} style={{ marginBottom: 15 }}>
              Upcoming Reports
            </Text>
            <Text size={15} style={{ marginBottom: 5 }}>
              1) Trial Balance
            </Text>
            <Text size={15} style={{ marginBottom: 5 }}>
              2) Trading Account
            </Text>
            <Text size={15} style={{ marginBottom: 5 }}>
              3) Profit and Loss Account
            </Text>
            <Text size={15} style={{ marginBottom: 5 }}>
              4) Balance Sheet
            </Text>
          </View>
        </Layout>
      </ScrollView>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 24,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    marginTop: 28,
    marginBottom: 10,
  },
  featureView: {
    flexWrap: "wrap",
    paddingHorizontal: 24,
    marginTop: 8,
  },
});
