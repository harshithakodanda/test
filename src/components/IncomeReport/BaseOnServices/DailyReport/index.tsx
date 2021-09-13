import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Button } from "react-native";
import Text from "components/Text";
import { height, width } from "configs/Const";
import { Colors } from "configs";
import { SOURCE_ICON } from "images";
import Theme from "style/Theme";
import { formatNumber } from "utils/formatNumber";
import Layout from "components/Layout/Layout";
import Line from "components/Layout/Line";
import { getData } from "storage/store";
import { useIsFocused } from "@react-navigation/native";
import {
  datePickerFormat,
  datePickerToApiFormat,
} from "storage/sqlite";
import DatePicker from "react-native-datepicker";
import { production } from "api/api";
import axios from "axios";

export default memo(() => {
  const [fromDate, setFromDate] = useState<any>(datePickerFormat());
  const [toDate, setToDate] = useState<any>(datePickerFormat());
  const [orgId, setOrgId] = useState(null);
  const [trans, setTrans] = useState([]);

  let isFocused = useIsFocused();

  const getGLReport = async (id: any) => {
    const response = await axios.get(
      production.GetGLReport +
        "?OrgId=" +
        id +
        "&StartDate=" +
        datePickerToApiFormat(fromDate) +
        "&EndDate=" +
        datePickerToApiFormat(toDate)
    );

    setTrans(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    getData("userOrganizationProfileData").then((res) => {
      if (res) {
        setOrgId(res.id);
        getGLReport(res.id);
      } else setOrgId(null);
    });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Layout style={styles.box}>
          <View style={[{ paddingLeft: 20 }, Theme.flexRow]}>
            <Text size={13}>From:{"  "}</Text>
            <View style={Theme.flexRow}>
              <DatePicker
                // style={styles.datePicker}
                date={fromDate}
                maxDate={toDate}
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
                  setFromDate(date);
                }}
              />
            </View>
          </View>

          <View style={[{ paddingLeft: 20 }, Theme.flexRow]}>
            <Text size={13}>To:{"       "}</Text>
            <View style={Theme.flexRow}>
              <DatePicker
                // style={styles.datePicker}
                date={toDate}
                maxDate={new Date()}
                minDate={fromDate}
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
                  setToDate(date);
                }}
              />
            </View>
            <Button  title="Submit" onPress={()=>getGLReport(orgId)}/>

          </View>

        </Layout>

        <Layout style={styles.box}>
          <View style={[styles.topView, Theme.flexRow]}>
            <Text size={13}>Mode:{"  "}</Text>
            <View style={Theme.flexRow}>
              <Text color={Colors.DodgerBlue} bold size={13}>
                Money In
              </Text>
              <Text
                size={15}
                style={{
                  textAlign: "left",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {" "}
                +
              </Text>
            </View>
          </View>

          <Line />

          <View style={styles.item}>
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
          {trans.map((value, index: any) => {
            if (value["transactionType"] == "Money In")
              return (
                <View key={index} style={[styles.item]}>
                  <View style={{ flex: 2, borderWidth: 0 }}>
                    <Text
                      size={12}
                      style={{ textAlign: "left", marginLeft: 10 }}
                    >
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

        <Layout style={styles.box}>
          <View style={[styles.topView, Theme.flexRow]}>
            <Text size={13}>Mode:{"  "}</Text>
            <View style={Theme.flexRow}>
              <Text color={Colors.DodgerBlue} bold size={13}>
                Money Out
              </Text>
              <Text
                size={15}
                style={{
                  textAlign: "left",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {" "}
                -
              </Text>
            </View>
          </View>

          <Line />

          <View style={styles.item}>
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
          {trans.map((value, index: any) => {
            if (value["transactionType"] == "Money Out")
              return (
                <View key={index} style={[styles.item]}>
                  <View style={{ flex: 2, borderWidth: 0 }}>
                    <Text
                      size={12}
                      style={{ textAlign: "left", marginLeft: 10 }}
                    >
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
    paddingBottom: 16,
    marginBottom: 10,
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
