import React, { useEffect, useState, memo } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { LinearGradient } from "react-native-svg";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import { SOURCE_ICON } from "images";
import {
  RouteConfig,
  RouterConfigOptions,
  useNavigation,
} from "@react-navigation/native";
import { useTheme } from "configs/Theme";
import { Block } from "galio-framework"; //add changes
import { normalize } from "configs/services/size"; //add changes
import { Icon } from "react-native-elements"; // library to be added
import TextualSlider from "react-native-range-slider-expo/src/TextSlider"; // library to be added
import { Slider } from "react-native-range-slider-expo"; //add changes
import Layout from "components/Layout/Layout";
import Theme from "style/Theme";
import { formatNumber } from "utils/formatNumber";
const { width } = Dimensions.get("window");

interface ServicesManagementItemProps {
  id?: number;
  name?: String;
  description?: String;
  price?: String;
  route?: string;
}

export default memo(
  ({ name, description, price, route }: ServicesManagementItemProps) => {
    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount]: any = useState(0);
    const [rate, setRate]: any = useState(0);
    const [tenure, setTenure]: any = useState(0);

    useEffect(()=>{},[amount,rate,tenure])

    const interest = rate / (12 * 100);
    const emi: any =
      (amount * interest * Math.pow(1 + interest, tenure * 12)) /
      (Math.pow(1 + interest, tenure * 12) - 1);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 10, marginBottom: 60}}> 
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: width * 0.9,
                marginTop: 1,
              }}
            >
              <Text
                style={{
                  fontSize: normalize(18),
                  color: "#006ee6",
                  width: width * 0.4,
                }}
              >
                Loan Amount:
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{
                    width: width * 0.4,
                    borderWidth: 0.5,
                    borderRadius: 0,
                    fontSize: normalize(18),
                    paddingLeft: 20,
                    height: normalize(30),
                  }}
                  keyboardType="decimal-pad"
                  value={!isNaN(amount) || amount != 0 ? amount.toString() : ""}
                  onChangeText={(text) => {
                    setAmount(text);
                  }}
                />
                <View style={{ backgroundColor: "#006ee6", padding: 10 }}>
                  <Icon
                    color="white"
                    name="rupee"
                    type="font-awesome"
                    size={normalize(12)}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                width: width * 0.9,
                paddingLeft: 10,
                marginTop: 1,
              }}
            >
              <TextualSlider
                valueOnChange={(value) => {
                  {
                    setAmount(value.value);
                  }
                }}
                
                values={[
                  { value: 0, text: "0L" },
                  { value: 100000, text: "1L" },
                  { value: 200000, text: "2L" },
                  { value: 300000, text: "3L" },
                  { value: 400000, text: "4L" },
                  { value: 500000, text: "5L" },
                  { value: 600000, text: "6L" },
                  { value: 700000, text: "7L" },
                  { value: 800000, text: "8L" },
                  { value: 900000, text: "9L" },
                  { value: 1000000, text: "10L" },
                  { value: 1200000, text: "12L" },
                  { value: 1500000, text: "15L" },
                  { value: 1800000, text: "18L" },
                  { value: 2000000, text: "20L" },
                  { value: 2500000, text: "25L" },
                ]}
                initialValue={parseInt(amount)}
                knobColor="#02b4b8"
                valueLabelsBackgroundColor="#006ee6"
                inRangeBarColor="#222D87"
                outOfRangeBarColor="#1DAD27"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: width * 0.9,
                marginTop: 1,
              }}
            >
              <Text
                style={{
                  fontSize: normalize(18),
                  color: "#006ee6",
                  width: width * 0.4,
                }}
              >
                Interest Rate:
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{
                    width: width * 0.4,
                    borderWidth: 0.5,
                    borderRadius: 0,
                    fontSize: normalize(18),
                    paddingLeft: 20,
                    height: normalize(30),
                  }}
                  keyboardType="decimal-pad"
                  value={!isNaN(rate) || rate != 0 ? rate.toString() : ""}
                  onChangeText={(text) => {
                    setRate(text);
                  }}
                />
                <View style={{ backgroundColor: "#006ee6", padding: 10 }}>
                  <Icon
                    color="white"
                    name="percent"
                    type="font-awesome"
                    size={normalize(12)}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                width: width * 0.9,
                paddingLeft: 10,
                marginTop: 1,
              }}
            >
              <Slider
                min={0}
                max={40}
                step={0.25}
                valueOnChange={(value) => {
                  setRate(value);
                }}
                initialValue={parseInt(rate)}
                knobColor="#02b4b8"
                valueLabelsBackgroundColor="#006ee6"
                inRangeBarColor="#222D87"
                outOfRangeBarColor="#1DAD27"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: width * 0.9,
                marginTop: 1,
              }}
            >
              <Text
                style={{
                  fontSize: normalize(18),
                  color: "#006ee6",
                  width: width * 0.4,
                }}
              >
                Loan Tenure:
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{
                    width: width * 0.4,
                    borderWidth: 0.5,
                    borderRadius: 0,
                    fontSize: normalize(18),
                    paddingLeft: 20,
                    height: normalize(30),
                  }}
                  keyboardType="decimal-pad"
                  value={!isNaN(tenure) || tenure != 0 ? tenure.toString() : ""}
                  onChangeText={(text) => {
                    setTenure(text);
                  }}
                />

                <View style={{ backgroundColor: "#006ee6", padding: 10 }}>
                  <Icon
                    color="white"
                    name="calendar"
                    type="font-awesome"
                    size={normalize(12)}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                width: width * 0.9,
                paddingLeft: 10,
                marginTop: 1,
              }}
            >
              <Slider
                min={0}
                max={20}
                step={0.5}
                valueOnChange={(value) => {
                  setTenure(value);
                }}
                initialValue={parseInt(tenure)}
                knobColor="#02b4b8"
                valueLabelsBackgroundColor="#006ee6"
                inRangeBarColor="#222D87"
                outOfRangeBarColor="#1DAD27"
              />
            </View>
            <Layout style={styles.box}>
              <View style={Theme.flexRowSpace}>
                <Text bold size={17}>
                  Calculations
                </Text>
              </View>
              <View style={[{ marginTop: 8 }, Theme.flexRowSpace]}>
                <Text size={15}>Approximate Loan EMI</Text>
                <Text size={15} style={[{ marginTop: 8 }]}>
                  {" "}
                  {formatNumber(Number.isFinite(parseInt(emi)) ? parseInt(emi) : 0)}
                  {"\n"}
                </Text>
              </View>
              <View style={[{ marginTop: 8 }, Theme.flexRowSpace]}>
                <Text size={15}>Approximate Interest</Text>
                <Text size={15} style={[{ marginTop: 8 }]}>
                  {" "}
                  {formatNumber(Number.isFinite(parseInt(emi))
                    ? parseInt((emi * tenure * 12).toFixed(3) - amount)
                    : 0)}
                  {"\n"}
                </Text>
              </View>
              <View style={[{ marginTop: 8, marginBottom:20 }, Theme.flexRowSpace]}>
                <Text size={15}>Total</Text>
                <Text size={15} style={[{ marginTop: 8 }]}>
                  {" "}
                  {formatNumber(Number.isFinite(parseInt(emi))
                    ? parseInt(
                        (parseInt(emi) * tenure * 12).toFixed(3) + amount
                      )
                    : 0)}
                  {"\n"}
                </Text>
              </View>
            </Layout>
          </ScrollView>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
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
  contentView: {
    // backgroundColor: Colors.White,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 24,
    paddingLeft: 64,
    paddingRight: 24,
  },
  box: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 0,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    marginTop: 28,
    marginBottom: 28,
  },
});
