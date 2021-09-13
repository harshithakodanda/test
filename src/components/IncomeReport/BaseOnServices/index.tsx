import React, { memo, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import Text from "components/Text";
import { height, width } from "configs/Const";
import { Colors } from "configs";
import { SOURCE_ICON } from "images";
import HighchartsReactNative from "lib/highcharts-react-native";
import Theme from "style/Theme";
import { formatNumber } from "utils/formatNumber";
import Layout from "components/Layout/Layout";
import Line from "components/Layout/Line";
import { getData } from "storage/store";
import { useIsFocused } from "@react-navigation/native";
import { datePickerFormat, datePickerToApiFormat, nextDatePickerFormat } from "storage/sqlite";
import DatePicker from "react-native-datepicker";
import axios from "axios";
import { production } from "api/api";
import { Button } from "react-native-elements";

export const CHART_FEATURE = [
  { name: "Cash", color: Colors.Malachite },
  { name: "Online", color: Colors.DodgerBlue },
  { name: "Credit", color: Colors.RedNeonFuchsia },
];

export default memo(() => {
  const [cash, setCash] = useState(0.0);
  const [online, setOnline] = useState(0.0);
  const [credit, setCredit] = useState(0.0);
  const [isLoading, setIsLoading] = useState(true);
  const [orgId, setOrgId] = useState(null);
  const [date, setDate] = useState<any>(datePickerFormat());
  const [trans, setTrans] = useState([]);

  let CHART_DATA = [
    {
      name: "Credit",
      y: credit,
      color: Colors.RedNeonFuchsia,
    },
    { name: "Online", y: online, color: Colors.DodgerBlue },
    {
      name: "Cash",
      y: cash,
      color: Colors.Malachite,
      sliced: true,
      selected: true,
    },
  ];
  let isFocused = useIsFocused();

  const getDailyReport = async (id: any) => {
    setTrans([])
    setCash(0)
    setCredit(0)
    setOnline(0)

    const response = await axios.get(
      production.GetDailyReport +
        "?OrgId=" +
        id +
        "&StartDate=" +
        datePickerToApiFormat(date) +
        "&EndDate=" +
        datePickerToApiFormat(date) 
            );

  //  console.log(response.data)

  

    setTrans(response.data.transactiondetails);
    for (var i = 0; i < response.data.transactionModeDetails.length; i++) {
      let mode = response.data.transactionModeDetails[i];
      if (mode.transactionModeName == "Cash") setCash(mode.percentage);
      else if (mode.transactionModeName == "Online") setOnline(mode.percentage);
      else setCredit(mode.percentage);
    }
  };

  useEffect(() => {

    getData("userOrganizationProfileData").then((res) => {
      if (res) {
          console.log(res)
        setOrgId(res.id);
        getDailyReport(res.id);
      } else setOrgId(null);
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const optionsChartPie = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "",
      align: "center",
      verticalAlign: "middle",
      y: 20,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          connectorWidth: 1,
          distance: 20,
        },
      },
    },
    series: [
      {
        name: " ",
        colorByPoint: true,
        minPointSize: 10,
        innerSize: "60%",
        zMin: 0,
        data: CHART_DATA,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Layout style={styles.box}>
          <View style={[styles.topView, Theme.flexRow]}>
            <Text size={13}>Date:{"  "}</Text>
            {/* <View style={Theme.flexRow}>
              <Text color={Colors.DodgerBlue} bold size={13}>
                Today
              </Text>
            </View> */}
            <DatePicker
              // style={styles.datePicker}
              date={date}
              maxDate={new Date()}
              mode="date"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconSource={SOURCE_ICON.calendar}
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 12,
                  width: 24,
                  height: 24,
                },
                dateInput: {
                  borderWidth: 0,
                  marginLeft: 48,
                  marginRight: 12,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
                //  console.log("yo")
              }}
            />
            <Button title="Submit" onPress={()=>getDailyReport(orgId)}/>
          </View>
          <View style={styles.chart}>
            {isLoading ? (
              <ActivityIndicator
                // style={{ flex: 1, alignSelf: "center", alignContent: 'center',}}
                color="#006ee6"
              />
            ) : (
              <HighchartsReactNative
                styles={styles.chartView}
                options={optionsChartPie}
                loader={false}
              />
            )}
          </View>
          <View style={styles.featureView}>
            {CHART_FEATURE.map((item, index) => {
              const { name, color } = item;
              return (
                <View style={Theme.center} key={index}>
                  <View
                    style={[
                      styles.icon,
                      { backgroundColor: color ? color : Colors.DodgerBlue },
                    ]}
                  >
                    <Image source={SOURCE_ICON[`${name}`]} />
                  </View>
                  <Text size={11} marginTop={8}>
                    {name}
                  </Text>
                </View>
              );
            })}
          </View>
          <Line />

          <View style={styles.item}>
            <View style={{ flex: 0.6, borderWidth: 0 }}>
              <Text size={13}>Mode</Text>
            </View>
            <View style={{ flex: 2, borderWidth: 0 }}>
              <Text size={13} style={{ textAlign: "left", marginLeft: 10 }}>
                Transaction Ledger
              </Text>
            </View>
            <View style={{ flex: 1.2, borderWidth: 0 }}>
              <Text size={13} style={{ textAlign: "right" }}>
                Amount
              </Text>
            </View>
          </View>
          {trans.map((value: any, index: any) => {
            return (
              <View key={index} style={[styles.item]}>
                <View
                  style={{ flex: 0.6, borderWidth: 0, flexDirection: "row" }}
                >
                  {value["transactionType"] == "Money In" && (
                    <Text
                      size={15}
                      style={{
                        textAlign: "left",
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      +{" "}
                    </Text>
                  )}
                  {value["transactionType"] == "Money Out" && (
                    <Text
                      size={15}
                      style={{
                        textAlign: "left",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      -{" "}
                    </Text>
                  )}
                  <Text size={12} style={{ textAlign: "left" }}>
                    {value["paymentMode"]}
                  </Text>
                </View>
                <View style={{ flex: 2, borderWidth: 0 }}>
                  <Text size={12} style={{ textAlign: "left", marginLeft: 10 }}>
                    {value["transactionLedger"]}
                  </Text>
                </View>
                <View style={{ flex: 1.2, borderWidth: 0 }}>
                  <Text size={13} style={{ textAlign: "right" }}>
                    {formatNumber(value["amount"])}
                  </Text>
                </View>
              </View>
            );
          })}
        </Layout>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
  box: {
    borderRadius: 16,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 10,
    paddingBottom: 16,
  },
  topView: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Snow,
  },
  chart: {
    height: height / 3.5,
    width: width / 1,
    alignSelf: "center",
    paddingHorizontal: 24,
  },
  chartView: {
    flex: 1,
  },
  arrow: {
    transform: [{ rotate: "90deg" }],
    marginBottom: 4,
    marginLeft: 6,
  },
  icon: {
    width: 16,
    height: 16,
    borderRadius: 4,
    ...Theme.center,
  },
  featureView: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    ...Theme.flexRowSpace,

    marginTop: 24,
  },
  incomeView: {
    marginHorizontal: 24,
    marginTop: 24,
    ...Theme.flexRowSpace,
  },
  item: {
    marginTop: 16,
    paddingHorizontal: 24,
    ...Theme.flexRowSpace,
  },
});
