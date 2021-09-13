import { useFocusEffect, useNavigation
 } from "@react-navigation/native";
 import { Icon } from 'react-native-elements' // library to be added
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors, Routes } from "configs";
import { SOURCE_ICON } from "images";
import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet,  ScrollView,TextInput,
  TouchableOpacity,
  Image } from "react-native";
import Text from "components/Text";
import { FlatList } from "react-native-gesture-handler";
import MyWorkNetworkItem from "components/MyWorkNetworkItem";
import keyExtractor from "utils/keyExtractor";
import ButtonIcon from "components/Buttons/ButtonIcon";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";
import InputApp from "components/InputApp";
import Theme from "style/Theme";
import Layout from "components/Layout/Layout";
import { formatNumber } from "utils/formatNumber";
import ButtonLinear from "components/Buttons/ButtonLinear";
import iconSet from "@expo/vector-icons/build/Fontisto";
const NETWORK_SAMPLE_DATA = [
  {
    id: 0,
    name: "Dr. Jordan Singleton",
    faculty: "Physical Medicine & Rehability",
    address: "Sun City, AZ 85351",
    rating: 4.6,
    review: 122,
    online: true,
  }
];

export default memo(() => {
  const [monthlyIncome, setmonthlyIncome] = useState("");
  const [monthlyLoan, setmonthlyLoan] = useState("");
  const [monthlyExpenditure, setmonthlyExpenditure] = useState("");
  const [monthlySavings, setmonthlySavings] = useState("");

  const [debtRatio, setdebtRatio] = useState("");
  const [savingsRatio, setsavingsRatio] = useState("");
  const [contingencyRatio, setcontingencyRatio] = useState("");
  const [insuranceValue, setinsuranceValue] = useState("");
  const [needsValue, setneedsValue] = useState("");
  const [wantsValue, setwantsValue] = useState("");
  const [savingsValue, setsavingsValue] = useState("");

  const [balance, setBalance] = React.useState<number>(0);
  const [totalIncome, setTotalIncome] = React.useState<number>(0);
  const [withdrew, setWithdrew] = React.useState<number>(0);
  const [incomeMonth, setIncomeMonth] = React.useState<number>(0);
  const { setOptions, navigate } = useNavigation();
  const [networkData, setNetworkData] = useState<any>([]);
  const { theme } = useTheme();

  useFocusEffect(
    useCallback(() => {
      setNetworkData(NETWORK_SAMPLE_DATA);
      setdebtRatio("0");
      setsavingsRatio("0");
      setcontingencyRatio("0");
      setinsuranceValue("0");
      setneedsValue("0");
      setwantsValue("0");
      setsavingsValue("0");
      
      setWithdrew(40000);
      setIncomeMonth(2490);
      
    }, [])
  );

  const onSaveEdit = () => {
    setdebtRatio((Math.floor(((Number(monthlyLoan)) * 100) / (Number(monthlyIncome)))).toString());
    setsavingsRatio((Math.floor(((Number(monthlySavings)) * 100) / (Number(monthlyIncome)))).toString());
    setcontingencyRatio(((Number(monthlyExpenditure)) * 3).toString());
    setinsuranceValue(((Number(monthlyIncome)) * 12 * 10).toString()); // formula

    setneedsValue(((Number(monthlyIncome)/10) * 5).toString());
    setwantsValue(((Number(monthlyIncome)/10) * 3).toString());
    setsavingsValue(((Number(monthlyIncome)/10) * 2).toString());
  };

  const onNetworkItem = (item: any) => {};
  const onSearchButton = () => {
    navigate(Routes.Search);
  };

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
        elevation: 0,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerRight:() =><TouchableOpacity
      style={[
        styles.container,
      ]}
      activeOpacity={0.54}
    >
      <Image
        source={require("images/smallLogo.png")}
       style={{height:40,width:40, margin:10}}
      />
    </TouchableOpacity>,
    });
  });

  const renderNetworkItem = useCallback(({ item }) => {
    return (
      <MyWorkNetworkItem
        style={styles.myWorkNetworkItem}
        onPress={() => onNetworkItem(item)}
        {...item} />
    );
  }, []);

  return (
    <Container style={styles.container}>
      
      <Text
        marginTop={12}
        marginHorizontal={24}
        marginBottom={8}
        bold
        size={24}
      >
        Financial Ratio Calculator
      </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.boxInput}>
        <Text size={15} lineHeight={22}  style={styles.boxInput1}>
        FINANCIAL RATIOS Calculators help determine the overall financial condition of businesses and organizations.
      A regular review of your ENTERPRISE FINANCIAL RATIOS can help you focus on areas that may need improvement. 
        </Text>

          <InputApp
            title={"Monthly Income"}
            value={monthlyIncome}
            editable
            keyboardType="number-pad"
            placeholder="Eg 50000"
            onChangeText={setmonthlyIncome}
            style={styles.phoneNumber}
            iconLeft={
              <Icon
              color="#02b4b8"
              name="rupee"
              type="font-awesome"
              size={22}
              style={{ alignSelf: "center" }}
            />
            }
            onPress={() => {}}
            styleView={{ ...Theme.flexOne, marginRight: 8 }}
            isShowIconLeft
          />
        <InputApp
          title={"Monthly Loan"}
          placeholder="Eg 30000"
          marginTop={12}
          value={monthlyLoan}
          onChangeText={setmonthlyLoan}
          keyboardType="number-pad"
          style={styles.phoneNumber}
          iconLeft={
            <Icon
            color="#02b4b8"
            name="rupee"
            type="font-awesome"
            size={22}
            style={{ alignSelf: "center" }}
          />
          }
          onPress={() => {}}
          styleView={{ ...Theme.flexOne, marginRight: 8 }}
          isShowIconLeft
        />
        <InputApp
          title={"Monthly Expenditure"} // Expenditure spelling
          placeholder="Eg 10000"
          marginTop={12}
          value={monthlyExpenditure}
          onChangeText={setmonthlyExpenditure}
          style={styles.phoneNumber}
          keyboardType="number-pad"
          iconLeft={
            <Icon
            color="#02b4b8"
            name="rupee"
            type="font-awesome"
            size={22}
            style={{ alignSelf: "center" }}
          />
          }
          onPress={() => {}}
          styleView={{ ...Theme.flexOne, marginRight: 8 }}
          isShowIconLeft
        />
        <InputApp
          title={"Monthly Savings"}
          placeholder="Eg 10000"
          marginTop={12}
          value={monthlySavings}
          onChangeText={setmonthlySavings}
          style={styles.phoneNumber}
          keyboardType="number-pad"
          iconLeft={
            <Icon
            color="#02b4b8"
            name="rupee"
            type="font-awesome"
            size={22}
            style={{ alignSelf: "center" }}
          />
          }
          onPress={() => {}}
          styleView={{ ...Theme.flexOne, marginRight: 8 }}
          isShowIconLeft
        />
        <ButtonLinear
          title={"Calculate Ratios"}
          styleButton={styles.buttonLinear}
          onPress={onSaveEdit}
          white
        />

<Layout style={styles.box}>
<Text size={20} lineHeight={20} marginTop={8}>
            Ratios
          </Text>    
         
          <View style={[{ marginTop: 55 }, Theme.flexRowSpace]}>
            <Text size={15}>Debt to Income Ratio</Text>
            <Text size={17}>{formatNumber(Number(debtRatio))} %</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>Saving to Income Ratio</Text>
            <Text size={17}>{formatNumber(Number(savingsRatio))} %</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>Contingency Reserve</Text>
            <Text size={17}>Rs. {formatNumber(Number(contingencyRatio))}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>Insurance Value</Text>
            <Text size={17}>Rs. {formatNumber(Number(insuranceValue))}</Text>
          </View>
          <View style={[{ marginTop: 23}]}>
            <Text size={17}>50:30:20 Rule</Text>
          </View>
          <View style={styles.item}>
          <View>
            <Text color={Colors.GrayBlue} size={11} lineHeight={14}>
              NEEDS
            </Text>
            <Text size={17} lineHeight={25} marginTop={2}>
           Rs {formatNumber(Number(needsValue))}
            </Text>
          </View>
          <View>
            <Text color={Colors.GrayBlue} size={11} lineHeight={14}>
              WANTS
            </Text>
            <Text size={17} lineHeight={25} marginTop={2}>
            Rs. {formatNumber(Number(wantsValue))}
            </Text>
          </View>
          <View>
            <Text color={Colors.GrayBlue} size={11} lineHeight={14}>
              SAVINGS
            </Text>
            <Text size={17} lineHeight={25} marginTop={2}>
            {formatNumber(Number(savingsValue))}
            </Text>
          </View>
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
  boxInput:{
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 12,
    borderRadius: 10,
    shadowRadius: 10,
  },
  box: {
    paddingHorizontal: 15,
    paddingVertical: 24,
    marginHorizontal: 0,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 0,
    marginTop: 28,
  },
  buttonLinear: {
    marginTop: 24,
  },
  featureView: {
    flexWrap: "wrap",
    paddingHorizontal: 24,
    marginTop: 8,
  },
  myWorkNetworkItem: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  contentContainerStyle: {
    paddingTop: 24,
    paddingBottom: getBottomSpace() + 16,
  },
  phoneNumber: {
    marginLeft: 2,
    flex: 1,
  },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },  boxInput1:{
    paddingHorizontal: 0,
    paddingVertical: 12,
    marginHorizontal: 0,
    borderRadius: 10,
    shadowRadius: 10,
    textAlign:"justify"
  },item: {
    paddingTop: 16,
    paddingHorizontal: 16,
    height: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
