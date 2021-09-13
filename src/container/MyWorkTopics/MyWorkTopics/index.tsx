import { View, StyleSheet,TextInput,ScrollView,Image,TouchableOpacity } from "react-native";
import React, {memo, useCallback, useLayoutEffect, useState  } from "react";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";
import ButtonLinear from "components/Buttons/ButtonLinear";
import Layout from "components/Layout/Layout";
import { formatNumber } from "utils/formatNumber";

export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [createdTopic, setCreatedTopic] = React.useState<any>([]);
  const [editPrice, setEditPrice] = useState<boolean>(false);

  const [investAmount, setInvestAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [doubleInvestAmount, setdoubleInvestAmount] = useState<string>("0");
  const [displayInvestAmount, setdisplayInvestAmount] = useState<string>("0");
  const [year, setYears] = useState<string>("0");

  useFocusEffect(
    React.useCallback(() => {
    
    }, [])
  );
  const { theme } = useTheme();

  const onSaveEdit = () => {
    setInvestAmount(investAmount);
    setInterestRate(interestRate);
    setEditPrice(!editPrice);
    setdoubleInvestAmount(formatNumber((Number(investAmount) * 2)));
    setdisplayInvestAmount(formatNumber((Number(investAmount))));
    setYears(Math.floor(72/Number(interestRate)).toString());
  };



  const onChangeInvestAmount = useCallback((text: string) => {
  setdisplayInvestAmount(formatNumber((Number(investAmount))));
    return setInvestAmount(text);
  }, []);

  const onChangeInterestRate = useCallback((text: string) => {
  //  setdoubleInvestAmount((Number(investAmount) * 2).toString());
  //  setYears(Math.floor(72/Number(text)).toString());
  setdisplayInvestAmount(formatNumber((Number(investAmount))));
    return setInterestRate(text);
   
  }, []);

  React.useLayoutEffect(() => {
  

    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
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
  }, [setOptions]);
  const toggleEditPrice = () => {
  //  setServicePrice(savedServicePrice);
    setEditPrice(!editPrice);
  };
  const renderHeader = React.useCallback(() => {
    return (
      <Text marginTop={24} marginLeft={24} bold size={24} lineHeight={28}>
        Rule of 72
      </Text>
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
        Rule of 72
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.boxInput}>
     
          <View>
          <Text size={15} lineHeight={22}  style={styles.boxInput1}>
          A simple formula that is popularly used to estimate the number of years to double the invested money at a given rate of interest or returns.
        </Text>
            <View>
              <Text>Amount</Text>
              <TextInput
                editable
                onChangeText={onChangeInvestAmount}
                placeholder={"Eg 50000"}
                value={investAmount}
                style={styles.editPrice}
                keyboardType="number-pad"
              />

              <Text>Interest Rate (%)</Text>
              <TextInput
                editable
                placeholder={"Eg 8"}
                onChangeText={setInterestRate}
                value={interestRate}
                style={styles.editPrice}
                keyboardType="number-pad"
              /> 
            </View>
            <View style={styles.rowstyle}>
            <ButtonLinear
                white
                style={styles.buttonSave}
                title={"Calculate"}
                onPress={onSaveEdit}
              />    
            </View>
          </View>
          <Layout style={styles.box}>
          <Text marginBottom={8} bold size={18}>
              Result
          </Text>
          <Text size={20} lineHeight={35}>
          It takes approximately {year} Years for amount of Rs. {displayInvestAmount} to grow into Rs. {doubleInvestAmount}  at  {interestRate}% p.a. interest rate.
          </Text>
          </Layout>
          <View>
          </View>
        </ScrollView>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textColor:{
    color: Colors.Red,
    fontStyle: "italic",
  },
  ImageDisplay:{
marginHorizontal:20,
  },
  box: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    margin: 5,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
  },
  boxInput:{
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 12,
    borderRadius: 10,
    shadowRadius: 10,
    textAlign:"justify"
  },
  boxInput1:{
    paddingHorizontal: 0,
    paddingVertical: 12,
    marginHorizontal: 0,
    borderRadius: 10,
    shadowRadius: 10,
    textAlign:"justify"
  },
  rowstyle:{
marginVertical:20,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonSave: {
    height: 50,
    marginTop: 0,
    padding:10
  },
  buttonCancel: {
    width: 50,
    height: 50,
    borderColor: Colors.Snow,
  },
  editPrice: {
    height: 48,
    marginRight: 20,
    marginBottom:10,
    borderColor: Colors.GrayBlue,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});

