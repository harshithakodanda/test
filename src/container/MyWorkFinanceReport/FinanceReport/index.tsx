import { View, StyleSheet,TextInput,ScrollView,Image,TouchableOpacity } from "react-native";
import React, {memo, useCallback, useLayoutEffect, useState  } from "react";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import Theme from "style/Theme";
import ScrollableTab from "components/ScrollableTab";
import { SOURCE_IMAGE } from "images/MyWorkTopic";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";
import ButtonLinear from "components/Buttons/ButtonLinear";
import Layout from "components/Layout/Layout";
import { red } from "react-native-redash/lib/typescript/v1";
import { formatNumber } from "utils/formatNumber";

export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [createdTopic, setCreatedTopic] = React.useState<any>([]);
  const [editPrice, setEditPrice] = useState<boolean>(false);

  const [investAmount, setInvestAmount] = useState<string>("");
  const [thirtyDayAmount, setthirtyDayAmount] = useState<string>("0");
  const [thirtyOneDayAmount, setthirtyOneDayAmount] = useState<string>("0");
  const [twentyEightDayAmount, settwentyEightAmount] = useState<string>("0");
  const [yearSavingAmount, setyearSavingAmount] = useState<string>("0");
  const [year, setYears] = useState<string>("0");

  useFocusEffect(
    React.useCallback(() => {
    
    }, [])
  );
  const { theme } = useTheme();

  const onSaveEdit = () => {
    setInvestAmount(investAmount);
    setEditPrice(!editPrice);
    setthirtyDayAmount(formatNumber((Number(investAmount) * 465)));
    setthirtyOneDayAmount(formatNumber((Number(investAmount) * 496)));
    settwentyEightAmount(formatNumber((Number(investAmount) * 406)));

    setyearSavingAmount(formatNumber(
        ((Number(investAmount) * 496) * 7) +
        ((Number(investAmount) * 465) * 4) +
        ((Number(investAmount) * 406) * 1)
        ));

  };



  const onChangeInvestAmount = useCallback((text: string) => {
    return setInvestAmount(text);
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
        Hani Hani Money
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
        Hani Hani Money
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.boxInput}>
     
          <View>
          <Text size={15} lineHeight={22}  style={styles.boxInput1}>
          A proven and a structured way to save money using the structured daily savings tool.
        </Text>
            <View>
              <Text>Daily Saving Amount (2,5,10 per day)</Text>
              <TextInput
                editable
                onChangeText={onChangeInvestAmount}
                placeholder={"Eg 10"}
                value={investAmount}
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
          You will be saving approximately an amount of Rs. {thirtyDayAmount} for a period of 30 days.
          and an yearly saving of approximately Rs. {yearSavingAmount}
          </Text>
          </Layout>
          <View>
          </View>

          <Layout style={styles.box}>
<Text size={20} lineHeight={20} bold marginTop={8}>
Monthly Savings (Approximate)
          </Text>    
         
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>April</Text>
            <Text size={17}>Rs. {thirtyDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>May</Text>
            <Text size={17}>Rs. {thirtyOneDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>June</Text>
            <Text size={17}>Rs. {thirtyDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>July</Text>
            <Text size={17}>Rs. {thirtyOneDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>August</Text>
            <Text size={17}>Rs. {thirtyOneDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>September</Text>
            <Text size={17}>Rs. {thirtyDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>October</Text>
            <Text size={17}>Rs. {thirtyOneDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>November</Text>
            <Text size={17}>Rs. {thirtyDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>December</Text>
            <Text size={17}>Rs. {thirtyOneDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>January</Text>
            <Text size={17}>Rs. {thirtyOneDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>February</Text>
            <Text size={17}>Rs. {twentyEightDayAmount}</Text>
          </View>
          <View style={[{ marginTop: 23 }, Theme.flexRowSpace]}>
            <Text size={15}>March</Text>
            <Text size={17}>Rs. {thirtyOneDayAmount}</Text>
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

