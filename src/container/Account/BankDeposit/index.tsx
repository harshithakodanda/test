import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Text from "components/Text";
import ButtonIconHeader from "components/ButtonIconHeader";
import * as React from "react";
import { useCallback, useState } from "react";
import { useLayoutEffect } from "react";
import { memo } from "react";
import { StyleSheet, View, Image,ScrollView, TouchableOpacity, } from "react-native";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";
import Theme from "style/Theme";
import scale from "utils/scale";
import { Colors, Routes } from "configs";
import InputApp from "components/InputApp";
import GenderItem from "components/UpdateProfile/BasicInformation/GenderItem";
import AvatarProfile from "components/UpdateProfile/BasicInformation/AvatarProfile";
import Layout from "components/Layout/Layout";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";


export default memo(() => {
  const { theme } = useTheme();
  const genders = [
    {
      id: 1,
      title: "Male",
      icon: require("images/ic_male.png"),
    },
    {
      id: 0,
      title: "Female",
      icon: require("images/ic_female.png"),
    },
  ];
  const { setOptions, navigate } = useNavigation();
  const [firstName, setFirstName] = useState("Rajesh");
  const [lastName, setLastName] = useState("Nagaral");
  const [mobileNumber, setmobileNumber] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [age, setage] = useState("");
  const [pincode, setpincode] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState<{
    id?: number | null;
    title?: string | null;
    icon: any;
  }>({ id: null, title: null, icon: null });

  const onUploadAvatar = useCallback(() => {}, []);

  const onChangeBirthday = useCallback((text: string) => {}, []);
  const onGoToChangeAddress = useCallback(() => {
    navigate(Routes.SelectAddress, { onChangeAddress: setHomeAddress });
  }, []);
  useFocusEffect(
    useCallback(() => {
     
    }, [])
  );
  useLayoutEffect(() => {
    const onAddBankDeposit = () => {
      navigate(Routes.BankDepositAddNew);
    };
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        shadowRadius: 0,
        shadowOffset: { height: 0 },
        elevation: 0,
        backgroundColor: theme.background,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  });



  return (
    <Container style={styles.container}>
      
      <Layout style={styles.box}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Text size={24} lineHeight={28} bold marginTop={16}>
          User Profile Information
        </Text>
        
        
        <InputApp
          title={"First Name"}
          marginTop={38}
          value={firstName}
          onChangeText={setFirstName}
          iconLeft={
            <Icon
            color="#02b4b8"
            name="user"
            type="font-awesome"
            size={22}
            style={{ alignSelf: "center" }}
          />
          }
          isShowIconLeft
        />
        <InputApp
          title={"Last Name"}
          marginTop={24}
          value={lastName}
          onChangeText={setLastName}
          iconLeft={
            <Icon
            color="#02b4b8"
            name="user"
            type="font-awesome"
            size={22}
            style={{ alignSelf: "center" }}
          />
          }
          isShowIconLeft
        />
        <InputApp
          title={"Mobile Number"}
          marginTop={24}
          value={mobileNumber}
          keyboardType={'numeric'}
          onChangeText={setmobileNumber}
          iconLeft={
            <Icon
            color="#02b4b8"
            name="mobile"
            type="font-awesome"
            size={22}
            style={{ alignSelf: "center" }}
          />
          }
          isShowIconLeft
        />
        <Text size={13} lineHeight={16} medium marginTop={24}>
          Gender
        </Text>
        <View style={{ borderWidth: 1, borderColor: theme.placeholder, borderRadius: 4, marginBottom:10 }}>
                   <Picker
                    mode="dropdown"
                    selectedValue={selectedValue}
                    style={styles.editPrice}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }
                  >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Third Gender" value="Third" />
                  </Picker>
        </View>
        
        <InputApp
          title={"Age"}
          marginTop={24}
          value={age}
          onChangeText={setage}
          keyboardType={'numeric'}
          iconLeft={
            <Icon
            color="#02b4b8"
            name="child"
            type="font-awesome"
            size={22}
            style={{ alignSelf: "center" }}
          />
          }
          isShowIconLeft
        />
         <InputApp
          title={"Pin Code"}
          marginTop={24}
          value={pincode}
          onChangeText={setpincode}
          keyboardType={'numeric'}
          iconLeft={
            <Icon
            color="#02b4b8"
            name="map-marker"
            type="font-awesome"
            size={22}
            style={{ alignSelf: "center" }}
          />
          }
          isShowIconLeft
        />
        <InputApp
          title={"Home Address"}
          marginTop={38}
          value={homeAddress}
          iconLeft={
            <Icon
            color="#02b4b8"
            name="home"
            type="font-awesome"
            size={22}
            style={{ alignSelf: "center" }}
          />
          }
          isShowIconLeft
          editable
         
        />
        <ButtonLinear
          white
          title={"Save Details"}
          style={styles.buttonLinear}
        />
      </ScrollView>
      </Layout>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 50,
    alignContent: "center",
    marginTop: 96,
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
  contentText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 32,
    marginTop: 50,
  },
  buttonImage: {
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 10,
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: 8,
  },
  inputApp: {
    marginTop: 24,
  },
  firstName: {
    marginTop: scale(38),
  },
  homeAddress: {
    marginTop: 32,
  },
  buttonLinear: {
    marginTop: 52,
  },
  genders: {
    marginTop: 24,
    ...Theme.flexRow,
    ...Theme.center,
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
  },editPrice: {
    height: 48,
    marginRight: 20,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,

  },
});
