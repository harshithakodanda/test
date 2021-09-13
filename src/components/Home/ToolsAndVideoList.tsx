import React, { memo, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import Text from "components/Text";
import ImageBackgroundCustom from "components/ConsultDetail/ImageBackgroundCustom";
import Video from "components/Video/videoFeed";
import { SOURCE_ICON } from "images";
import Layout from "components/Layout/Layout";
import { Constants } from "configs";
import ButtonBorder from "components/Buttons/ButtonBorder";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import Transaction from "components/Transaction"; //Add Change
import { getData, storeData } from "storage/store";
import axios from "axios";
import { dateFormat, dateTimeFormat, db, queries } from "storage/sqlite";
import { prod, production } from "api/api";
import { Icon } from "react-native-elements";

interface ConsultForTodayProps {
  step: number;
  onPress?: () => void;
  style?: ViewStyle;
}

interface Transaction {
  organizationId: Number;
  customerId: Number;
  transactionDate: String;
  transactionType: String; //[Money In, MoneyOut]
  paymentMode: String; //[Cash,Online,Credit]
  transactionLedger: String; // [FirstDropDown]
  creditLedger: String; //[OnClick of Credit, DropDown Value]
  amount: String;
  referenceNo: String;
  additionalInfo: String;
  processed: Boolean;
}

let TMoney = {
  moneyIn: 0,
  moneyOut: 0,
  cashIn: 0,
  cashOut: 0,
};

const TaskstForToday = memo((props: ConsultForTodayProps) => {
  const { navigate } = useNavigation();
  const [show, toggleShow] = useState(false); //Add Change
  const [showOut, toggleShowOut] = useState(false); // Add Change
  const [openingBalance, setOpeningBalance] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);
  const [moneyIn, setMoneyIn] = useState(0);
  const [moneyOut, setMoneyOut] = useState(0);
  const [orgId, setOrgId] = useState(null);

  const getDailyBalance = async (id: any) => {
    const response = await axios.get(production.GetDailyBalance + "?Id=" + id);
    console.log(response.data);
    setOpeningBalance(response.data["openingBalance"]);
    setClosingBalance(response.data["closingBalance"]);
    setMoneyIn(response.data["totalCashIn"]);
    setMoneyOut(response.data["totalCashOut"]);
    //console.log(production.GetDailyBalance+"?Id="+id)
  };




  const isFocused = useIsFocused();

  useEffect(() => {
    getData("userOrganizationProfileData").then((res) => {
      if (res) {
        //  console.log(res)
        setOrgId(res.id);
        getDailyBalance(res.id);
      } else setOrgId(null);
    });
  }, [isFocused]);

  const goBack = () => {
    navigate(Routes.FinanceReport);
  };

  const goRuleof72 = () => {
    navigate(Routes.MyWorkTopics);
  };

  const goRuleof114 = () => {
    navigate(Routes.HealthGuide);
  };

  const goRuleof144 = () => {
    navigate(Routes.HealthTips);
  };

  const goRatioCalculator = () => {
    navigate(Routes.MyWorkNetwork);
  };

  const goemiCalculator = () => {
    navigate(Routes.ServicesManagement);
  };

  return (
    <View style={[styles.container, props.style]}>
      <View>
        <Video
          url={
            production.GetDashBoard
          }
          horizontal={true}
        />
        <View style={Theme.flexRow}>
          <ScrollView
            horizontal={true}
            style={{ marginTop: -10 }}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ marginRight: 25 }}>
              <View style={Theme.center}>
                <TouchableOpacity onPress={goBack}>
                  <View
                    style={[
                      styles.icon,
                      { backgroundColor: Colors.TealBlue, borderRadius: 8 },
                    ]}
                  >
                    <Image source={SOURCE_ICON.hospital} />
                  </View>
                  <Text size={11} marginTop={8}>
                    Hani Money
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginRight: 25 }}>
              <View style={Theme.center}>
                <TouchableOpacity onPress={goRuleof72}>
                  <View
                    style={[
                      styles.icon,
                      { backgroundColor: Colors.TealBlue, borderRadius: 8 },
                    ]}
                  >
                    <Image source={SOURCE_ICON.payment} />
                  </View>
                  <Text size={11} marginTop={8}>
                    Rule of 72
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginRight: 25 }}>
              <View style={Theme.center}>
                <TouchableOpacity onPress={goRuleof114}>
                  <View
                    style={[
                      styles.icon,
                      { backgroundColor: Colors.TealBlue, borderRadius: 8 },
                    ]}
                  >
                    <Image source={SOURCE_ICON.payment} />
                  </View>
                  <Text size={11} marginTop={8}>
                    Rule of 114
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginRight: 25 }}>
              <View style={Theme.center}>
                <TouchableOpacity onPress={goRuleof144}>
                  <View
                    style={[
                      styles.icon,
                      { backgroundColor: Colors.TealBlue, borderRadius: 8 },
                    ]}
                  >
                    <Image source={SOURCE_ICON.payment} />
                  </View>
                  <Text size={11} marginTop={8}>
                    Rule of 144
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginRight: 25 }}>
              <View style={Theme.center}>
                <TouchableOpacity onPress={goRatioCalculator}>
                  <View
                    style={[
                      styles.icon,
                      { backgroundColor: Colors.TealBlue, borderRadius: 8 },
                    ]}
                  >
                    <Image source={SOURCE_ICON.history} />
                  </View>
                  <Text size={11} marginTop={8}>
                    Ratios
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginRight: 25 }}>
              <View style={Theme.center}>
                <TouchableOpacity onPress={goemiCalculator}>
                  <View
                    style={[
                      styles.icon,
                      { backgroundColor: Colors.TealBlue, borderRadius: 8 },
                    ]}
                  >
                    <Image source={SOURCE_ICON.term} />
                  </View>
                  <Text size={11} marginTop={8}>
                    EMI
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <Layout style={styles.box}>
          <View style={Theme.flexRowSpace}>
            <Text bold size={17}>
              Cashbook
            </Text>
            <TouchableOpacity
              onPress={() => navigate(Routes.HealthFeedStack)}
              style={Theme.flexRow}
              activeOpacity={0.54}
            >
              <Text bold color={Colors.DodgerBlue} size={13}>
                Details
              </Text>
              <Image source={SOURCE_ICON.arrowRight} />
            </TouchableOpacity>
          </View>
          <View  style={[{ marginTop: 10 }, Theme.flexRowSpace]}>
          {/* <Icon
              color="#02b4b8"
              name="badge"
              type="simple-line-icons"
              size={22}
              style={{ alignSelf: "center" }}
            /> */}
          <Text size={12}>Premium Feature. 30 day trial period</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>Opening Balance</Text>
            <Text size={15}>Closing Balance</Text>
          </View>
          <View
            style={[{ marginTop: 13, marginBottom: 10 }, Theme.flexRowSpace]}
          >
            <Text size={17}>₹{openingBalance}</Text>
            <Text size={17}>₹{closingBalance}</Text>
          </View>
          <View style={{ borderWidth: 0.5, borderColor: "grey" }} />

          <View style={[{ marginTop: 10 }, Theme.flexRowSpace]}>
            <Text size={15}>Money In</Text>
            <Text size={15}>Money Out</Text>
          </View>
          <View style={[{ marginTop: 13 }, Theme.flexRowSpace]}>
            {/* <View style={[{flex:1},Theme.center]}> */}
            <Text
              size={17}
              style={{ color: Colors.ForestGreen, fontWeight: "bold" }}
            >
              ₹{moneyIn}
            </Text>
            {/* </View> */}
            {/* <View style={[{flex:1},Theme.center]}> */}
            <Text size={17} style={{ color: Colors.Red, fontWeight: "bold" }}>
              ₹{moneyOut}
            </Text>
            {/* </View> */}
          </View>

          <View style={styles.buttons}>
            <ButtonBorder
              style={{
                flex: 1,
                marginRight: 8,
                backgroundColor: Colors.ForestGreen,
              }}
              title={"+ Money In"}
              onPress={() => {
                toggleShow(!show);
              }} // Add Change
              placeholder
              white
            />

            <ButtonBorder
              style={{ flex: 1, marginRight: 8, backgroundColor: Colors.Red }}
              onPress={() => toggleShowOut(!showOut)} // Add Change
              title={"- Money Out"}
              white
            />
          </View>
        </Layout>
        {/* Add Change */}
        {show && <Transaction type={"Money In"} getDailyBalance={getDailyBalance} />}
        {showOut && (
          <Transaction type={"Money Out"} getDailyBalance={getDailyBalance}/>
        )}

        {/* Add Change */}
      </View>
      <ImageBackgroundCustom number={props.step} onPress={props.onPress} />
    </View>
  );
});

export default TaskstForToday;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    justifyContent: "space-between",
  },
  icon: {
    tintColor: Colors.White,
    alignSelf: "center",
    padding: 10,
  },
  contentIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 8,
    justifyContent: "center",
    padding: 10,
  },
  space: {
    padding: 10,
  },
  box: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 0,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    marginTop: 28,
  },
  buttonLinear: {
    alignContent: "space-around",
    width: (Constants.width - 88) / 2,
    padding: 10,
  },
  buttons: {
    flex: 2,
    flexDirection: "row",
    marginTop: 15,
  },
  buttonEdit: {
    width: 24,
    height: 24,
    backgroundColor: Colors.DodgerBlue,
  },
  backButton: {
    borderWidth: 1,
    borderColor: Colors.Platinum,
  },
  contentView: {
    // backgroundColor: Colors.White,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 24,
    paddingLeft: 64,
    paddingRight: 24,
  },
  imageLeft: {
    position: "absolute",
    top: 24,
    left: 24,
  },
  imageRight: {
    position: "absolute",
    top: 24,
    right: 24,
  },
});
