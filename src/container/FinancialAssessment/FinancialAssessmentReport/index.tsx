import React, { memo, useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Text from "components/Text";
import SearchBox from "components/Home/SearchBox";
import { Colors, Routes } from "configs";
import { Constants } from "configs";
import Theme from "style/Theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { LIST_DOCTOR_DATA, PRIVATE_CHAT } from "configs/Data";
import keyExtractor from "utils/keyExtractor";
import PrivateChatItem from "components/PrivateChat/PrivateChatItem";
import Container from "components/Layout/Container";
import { Icon } from "react-native-elements";
//import { normalize } from "services/size";
import { width } from "configs/Const";
import RNSpeedometer from "react-native-speedometer";
import ButtonLinear from "components/Buttons/ButtonLinear";
import Layout from "components/Layout/Layout";
import { SOURCE_ICON } from "images";
import { AVATAR } from "images/avatar";
import ButtonBorder from "components/Buttons/ButtonBorder";
import { getData } from "storage/store";
import axios from "axios";
import { production } from "api/api";

interface Assesment {
  accessToFinance: String;
  assessmentDate: String;
  businessCompliance: String;
  financialManagement: String;
  organizationId: number;
  overallPercentage: number;
  survivalStability: String;
}

export default memo(() => {
  const { navigate } = useNavigation();
  const [show, toggleShow] = useState(false);
  const [show1, toggleShow1] = useState(false);
  const [show2, toggleShow2] = useState(false);
  const [show3, toggleShow3] = useState(false);
  const [name, setName] = useState("");
  const [observationText, setObservationText] = useState("");
  const [businessname, setBusinessname] = useState("");
  const dummy: Assesment = {
    accessToFinance: "",
    assessmentDate: "dd/mm/yyyy",
    businessCompliance: "",
    financialManagement: "",
    organizationId: 0,
    overallPercentage: 0,
    survivalStability: "0%",
  };
  const [result, setResult] = useState<Assesment>(dummy);

  const updateValues = () => {
    getData("financialWellnessAssessment").then((res) => {
      if (res) {
        let date = new Date(res.assessmentDate);
        res.assessmentDate =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        setResult(res);
      }
    });
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    updateValues();
    getData("userProfileData").then((user) => setName(user.firstName));
    getData("userOrganizationProfileData").then(async (org) => {
      setBusinessname(org.businessName);
      let res: any = await axios.get(
        production.GetFinanceWellness +
          org.id
      );
      res = res.data;
      let date = new Date(res.assessmentDate);
      res.assessmentDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      setResult(res);
      if(res.overallPercentage == 0){
         setObservationText("")
      }
      else if (res.overallPercentage < 40 && res.overallPercentage > 0) {
        setObservationText(
          "Your current situation is financially unhealthy and to improve its financial and market situation you need to consult a financial advisor as the survival may be at risk in the short or medium term."
        );
      } else if (res.overallPercentage < 60) {
        setObservationText(
          "Your current situation is financially poor and you may have to consult a financial advisor to identify your weak financial indicators, overcome your poor financial management and improve your market conditions."
        );
      } else if (res.overallPercentage < 80) {
        setObservationText(
          "Your current financial situation is  good as your indicators offer substantial cushion against unpredicted events, but there are elements which could be improved. Consult a financial advisor to advise you on areas of improvement"
        );
      } else {
        setObservationText(
          "You are currently showing high levels of financial stability and market resilience, it appears to be financially well-managed and has a solid market position. Do consult a financial advisor to sustain your current level and also to look for further growth. "
        );
      }
    });
  }, [isFocused]);

  const handleDownloadMessage = React.useCallback(() => {
    alert("Downloading...");
  }, []);

  const handlePressMessage = React.useCallback(() => {
    navigate(Routes.FinancialAssessmentQuestionnaire);
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <Text
          marginTop={getStatusBarHeight()}
          marginHorizontal={24}
          bold
          size={24}
          lineHeight={28}
        >
          Your Wellness Assessment
        </Text>
        <Container style={styles.infoView}>
          <View style={Theme.flexRow}>
            <View>
              <View style={Theme.flexRow}>
                <Icon
                  color={Colors.ForestGreen}
                  name="user"
                  type="font-awesome"
                  size={30}
                  style={{ alignSelf: "center", marginRight: 10 }}
                />
                <View>
                  <Text size={20} marginLeft={16}>
                    {name}
                  </Text>
                  <Text size={15} marginLeft={16}>
                    {businessname}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => toggleShow(!show)}
                  style={Theme.flexRow}
                  activeOpacity={0.54}
                >
                 {result.overallPercentage>0 ? <Text bold size={13}>
                    Last Assessment done on {result.assessmentDate}
                  </Text> : <Text bold size={13}>
                  Assess your financial wellness
                  </Text> }
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Container>
        <Layout style={styles.box}>
          <Text bold size={17}>
            Our Observations
          </Text>
          <View style={{ paddingBottom: 60 }}>
            <RNSpeedometer
              labels={[
                {
                  name: result.overallPercentage>0?"Very Bad":"Yet to take",
                  labelColor: "#ff2900",
                  activeBarColor: "#ff2900",
                },
                {
                  name: "Bad",
                  labelColor: "#ff5400",
                  activeBarColor: "#ff5400",
                },
                {
                  name: "Ok",
                  labelColor: "#f2cf1f",
                  activeBarColor: "#f2cf1f",
                },
                {
                  name: "Good",
                  labelColor: "#14eb6e",
                  activeBarColor: "#14eb6e",
                },
                {
                  name: "Very Good",
                  labelColor: "green",
                  activeBarColor: "green",
                },
              ]}
              value={result.overallPercentage}
              size={200}
            />
          </View>

          <Text style={{ margin: 5 }}>{observationText}</Text>
        </Layout>
        <Layout style={styles.box}>
          <View>
            <View style={Theme.flexRowSpace}>
              <TouchableOpacity
                onPress={() => toggleShow(!show)}
                style={Theme.flexRow}
                activeOpacity={0.54}
              >
                <Image
                  source={require("images/SurvivalAndStability.png")}
                  style={{ marginRight: 10, height: 30, width: 30 }}
                />
                <Text bold size={15}>
                  Survival & Stability
                </Text>
              </TouchableOpacity>
              <Text
                style={{ fontSize: 15, color: "red", width: width * 0.15 }}
                onPress={() => toggleShow(!show)}
              >
                {result.survivalStability || "0%"}
                <Image
                  source={SOURCE_ICON.arrowRight}
                  style={{ marginLeft: 10 }}
                />
              </Text>
            </View>
            {show && (
              <Text style={{ fontSize: 14, padding: 10 }}>
                The stability and survival section tracks your enterprises
                ability to stay in business through unexpected market events,
                and as such is a proxy for business resilience. Questions in
                this section include the owner’s perception of the stability of
                their business, the ability to rebound from a loss of a major
                customer(s), the ability to operate a business without a sudden
                loss of revenue, the ability to make an investment purchase from
                current revenue or savings, insurance against risks, and whether
                it faces delays in receiving payments from customers.
              </Text>
            )}
          </View>
        </Layout>

        <Layout style={styles.box}>
          <View>
            <View style={Theme.flexRowSpace}>
              <TouchableOpacity
                onPress={() => toggleShow1(!show1)}
                style={Theme.flexRow}
                activeOpacity={0.54}
              >
                <Image
                  source={require("images/FinancialManagement.png")}
                  style={{ marginRight: 10, height: 25, width: 25 }}
                />
                <Text bold size={15}>
                  Financial Management
                </Text>
              </TouchableOpacity>
              <Text
                style={{ fontSize: 15, color: "red", width: width * 0.15 }}
                onPress={() => toggleShow1(!show1)}
              >
                {result.financialManagement || "0%"}
                <Image
                  source={SOURCE_ICON.arrowRight}
                  style={{ marginLeft: 10 }}
                />
              </Text>
            </View>
            {show1 && (
              <Text style={{ fontSize: 14, padding: 10 }}>
                The financial management section explores your enterprises’
                ability to manage funds and keep appropriate financial records
                on par with its business needs. Questions for this indicator
                consider the existence of a record-keeping system, whether
                expense records are kept, separating business and personal
                financial records, use of non-business income to cover the
                running costs of the business in times of low revenue, the
                ability to payments on time, and the owner’s perception of
                control over the financial situation of the business.
              </Text>
            )}
          </View>
        </Layout>

        <Layout style={styles.box}>
          <View>
            <View style={Theme.flexRowSpace}>
              <TouchableOpacity
                onPress={() => toggleShow2(!show2)}
                style={Theme.flexRow}
                activeOpacity={0.54}
              >
                <Image
                  source={require("images/AccessToFinance.png")}
                  style={{ marginRight: 10, height: 30, width: 30 }}
                />
                <Text bold size={15}>
                  Access to Finance
                </Text>
              </TouchableOpacity>
              <Text
                style={{ fontSize: 15, color: "red", width: width * 0.15 }}
                onPress={() => toggleShow2(!show2)}
              >
                {result.accessToFinance || "0%"}
                <Image
                  source={SOURCE_ICON.arrowRight}
                  style={{ marginLeft: 10 }}
                />
              </Text>
            </View>
            {show2 && (
              <Text style={{ fontSize: 14, padding: 10 }}>
                The access to finance component considers the ability of the
                business to access external funding when needed. The questions
                in this section include the loan repayment history of the
                business, its ability to borrow emergency funds, and its ability
                to access growth funding from formal financial institutions.
              </Text>
            )}
          </View>
        </Layout>

        <Layout style={styles.box}>
          <View>
            <View style={Theme.flexRowSpace}>
              <TouchableOpacity
                onPress={() => toggleShow3(!show3)}
                style={Theme.flexRow}
                activeOpacity={0.54}
              >
                <Image
                  source={require("images/BusinessCompliance.png")}
                  style={{ marginRight: 10, height: 30, width: 30 }}
                />
                <Text bold size={15}>
                  Business Compliance
                </Text>
              </TouchableOpacity>
              <Text
                style={{ fontSize: 15, color: "red", width: width * 0.15 }}
                onPress={() => toggleShow3(!show3)}
              >
                {result.businessCompliance || "0%"}
                <Image
                  source={SOURCE_ICON.arrowRight}
                  style={{ marginLeft: 10 }}
                />
              </Text>
            </View>
            {show3 && (
              <Text style={{ fontSize: 14, padding: 10 }}>
                The Business Compliance section refers to following of relevant
                laws and regulations for your industry. That means more than
                just the basic rules about taxes and accounting. Depending on
                what industry you work in, you might have to comply with large,
                complex sets of laws that have a significant impact on your
                operations.
              </Text>
            )}
          </View>
        </Layout>
        <View
          style={{
            ...Theme.flexRow,
            marginTop: 48,
            marginBottom: 10,
            marginHorizontal: 24,
          }}
        >
          <ButtonBorder
            style={{ flex: 1, marginRight: 8 }}
            title={"Download"}
            onPress={handleDownloadMessage}
            placeholder
          />
          <ButtonLinear
            white
            styleButton={{ flex: 1, marginLeft: 8 }}
            style={{ marginTop: 0 }}
            title={"Assessment"}
            onPress={handlePressMessage}
          />
        </View>
      </ScrollView>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {},
  email: {
    fontSize: 13,
    marginBottom: 8,
  },
  type: {
    fontSize: 13,
    color: Colors.GrayBlue,
  },
  searchView: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
  },
  statusView: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: Colors.White,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    position: "absolute",
    right: 8,
    ...Theme.center,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  contentStyle: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  buttonLinear: {
    alignContent: "space-around",
    width: (Constants.width - 88) / 2,
    padding: 10,
  },
  buttons: {
    flex: 2,
    flexDirection: "row",
  },
  box: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginHorizontal: 24,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    marginTop: 10,
  },
  infoView: {
    ...Theme.flexRowSpace,
    marginHorizontal: 24,
    marginBottom: 12,
    marginTop: 24,
  },
});
