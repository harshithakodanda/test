import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // add this library
import Text from "components/Text";
import HeaderButton from "components/HeaderButton";
import Theme from "style/Theme";
import scale from "utils/scale";
import { Colors, Routes } from "configs";
import InputApp from "components/InputApp";
import GenderItem from "components/UpdateProfile/BasicInformation/GenderItem";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import AvatarProfile from "components/UpdateProfile/BasicInformation/AvatarProfile";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";
import { Icon } from "react-native-elements";
import { getData, storeData } from "storage/store";
import axios from "axios";
import { production } from "api/api";
interface BasicInformationProps {}
const { width } = Dimensions.get("window");
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

interface User {
  gender: String;
  firstName: String;
  lastName: String;
  mobile: String;
  emailAddress: String;
  age: any;
  postalCode: String;
  address: String;
  id: any;
  createdOn: String;
  modifiedOn: String;
}

const BasicInformation = memo(({}: BasicInformationProps) => {
  const { theme } = useTheme();
  let dummy: User = {
    gender: "Male",
    firstName: "",
    lastName: "",
    mobile: "",
    emailAddress: "",
    age: "",
    postalCode: "",
    address: "",
    id: 0,
    createdOn: "",
    modifiedOn: "",
  };
  const [userProfileData, setUserProfileData] = useState<User>(dummy);
  const [userOrganizationProfileData, setUserOrganizationProfileData] =
    useState({});

  useEffect(() => {
    getData("phoneNumber").then((res) => {
      if (res) {
        setMobile(res);
      }
    });

    getData("userProfileData").then((res) => {
      if (res) {

        setUserProfileData(res);
        setGender(res.gender ? res.gender : "Male");
        setFirstName(res.firstName || "");
        setLastName(res.lastName || "");
        setPostalCode(res.postalCode || "");
        setAge(res.age > 0 ? res.age.toString() : "");
        setAddress(res.address || "");
        setEmailAddress(res.emailAddress || "");
      } else setUserProfileData(dummy);
    });
    getData("userOrganizationProfileData").then((res) => {
      {
        res
          ? setUserOrganizationProfileData(res)
          : setUserOrganizationProfileData({});
      }
    });
  }, []);

  const [gender, setGender] = useState("Male");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [age, setAge] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  
  const [firstNameFlag, setFirstNameFlag] = useState(true);
  const [lastNameFlag, setLastNameFlag] = useState(true);
  const [mobileFlag, setMobileFlag] = useState(true);
  const [emailAddressFlag, setEmailAddressFlag] = useState(true);
  const [ageFlag, setAgeFlag] = useState(true);
  const [postalCodeFlag, setPostalCodeFlag] = useState(true);
  const [addressFlag, setAddressFlag] = useState(true);

  const [valid, setValid] = useState(true);

  const { navigate } = useNavigation();

  const validateEmailAddress = () =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailAddressFlag(re.test(String(emailAddress).toLowerCase()))
    return re.test(String(emailAddress).toLowerCase())

}

const validateFirstName = () =>{
if(firstName.length<3){
  setFirstNameFlag(false)
  return false
  }
  setFirstNameFlag(true)

  return true
}

const validateLastName = () =>{
  if(lastName.length<1){
    setLastNameFlag(false)
    return false
  }
  setLastNameFlag(true)

  return true
}

const validateAddress = () =>{
  // if(address.length<5){
  //   setAddressFlag(false)
  //   return false
  // }
  setAddressFlag(true)

  return true
}

const validateMobile = ()=>{
  if(mobile.length<10){
    setMobileFlag(false)
    return false
  }
  setMobileFlag(true)

  return true
}

const validateAge = ()=>{
  if (age.length>3 || age.length<1 || parseInt(age)<=0){
    setAgeFlag(false)
    return false
  }
  setAgeFlag(true)

  return true
}

const validatePostalCode = ()=>{
  if (postalCode.length!=6){
    setPostalCodeFlag(false)
    return false
  }
  setPostalCodeFlag(true)
  return true
}

const validate =  ()=>{
  let v1 = validateAddress(),
  v2 = validateAge(),
  v3 = validateEmailAddress(),
  v4 = validateFirstName(),
  v5 = validateLastName(),
  v6 = validateAddress(),
  v7 = validatePostalCode(),
  v8 = validateMobile()

return (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8)
 
}

  const onGotoWorkProfile = () => {
    if (!validate()) {
      setValid(false);
      return;
    }
    let user = {
      gender,
      firstName,
      lastName,
      mobile,
      emailAddress,
      age: parseInt(age),
      postalCode,
      address,
      id: userProfileData.id,
      createdOn: new Date().toISOString(),
      modifiedOn: new Date().toISOString()
    };
    setUserProfileData(user);

    storeData("userProfileData", user);
    // console.log("user", JSON.parse(
    //   JSON.stringify({
    //     userProfileData: JSON.parse(JSON.stringify(user)),
    //     userOrganizationProfileData: JSON.parse(JSON.stringify(userOrganizationProfileData))
    //   })
    // ))

    axios
          .post(
            production.PostUserProfile,
            JSON.parse(
              JSON.stringify({
                userProfileData: JSON.parse(JSON.stringify(user)),
                userOrganizationProfileData: JSON.parse(JSON.stringify(userOrganizationProfileData))
              })
            )
          )
          .then((res) => {
           // console.log("user",res.status,res.data)
            storeData("userProfileData", res.data.userProfileData);
            storeData(
              "userOrganizationProfileData",
              res.data.userOrganizationProfileData
            );
          })
          .catch((e) => console.log(e));

    getData("registered").then((res) => {
      if (res) {
        
        navigate(Routes.Account);
      } else {
        navigate(Routes.WorkProfile);
      }
    });
  };

  return (
    <Container style={styles.container}>
      <View></View>
      <HeaderButton />
      {/* <Image source={require("images/loginLogo.png")} style={styles.logo} /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text size={24} lineHeight={28} bold marginTop={16}>
          Profile Information
        </Text>

        {/* <Image source={require("images/loginLogo.png")} style={styles.logo} /> */}
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
        {!valid && !firstNameFlag && (
          <Text style={{ color: "red" }}>Please enter at least 3 characters</Text>
        )}
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
        {!valid && !lastNameFlag && (
          <Text style={{ color: "red" }}>This is required</Text>
        )}
        <InputApp
          editable={true}
          title={"Mobile Number"}
          marginTop={24}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
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
        {!valid && !mobileFlag && (
          <Text style={{ color: "red" }}>Enter a valid 10 digit number</Text>
        )}

        <InputApp
          title={"Email Address"}
          marginTop={24}
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          iconLeft={
            <Image
              source={require("images/ic_type_message.png")}
              style={Theme.icons}
            />
          }
          isShowIconLeft
        />
        {!valid && !emailAddressFlag && (
          <Text style={{ color: "red" }}>Enter a valid email address</Text>
        )}

        <Text size={13} lineHeight={16} medium marginTop={24}>
          Gender
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: theme.placeholder,
            borderRadius: 4,
            marginBottom: 10,
          }}
        >
          <Picker
            mode="dropdown"
            selectedValue={gender}
            style={styles.editPrice}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
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
          onChangeText={setAge}
          keyboardType={"numeric"}
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
        {!valid && !ageFlag && (
          <Text style={{ color: "red" }}>Enter a valid age</Text>
        )}

        <InputApp
          title={"Pin Code"}
          marginTop={24}
          value={postalCode}
          keyboardType={"numeric"}
          onChangeText={setPostalCode}
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
        {!valid && !postalCodeFlag && (
          <Text style={{ color: "red" }}>Enter a valid 6 digit postal code</Text>
        )}

        <InputApp
          title={"Home Address"}
          onChangeText={setAddress}
          marginTop={38}
          value={address}
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
        {/* {!valid &&   (
          <Text style={{ color: "red" }}>This is required</Text>
        )} */}

        <ButtonLinear
          white
          title={"Save"}
          // children={
          //   <Image
          //     source={require("images/ic_next.png")}
          //     style={styles.buttonChildren}
          //   />
          // }
          onPress={onGotoWorkProfile}
          style={styles.buttonLinear}
        />
      </ScrollView>
    </Container>
  );
});

export default BasicInformation;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
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
  address: {
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
  logo: {
    // marginBottom: 12,
    marginLeft: width / 5,
    width: width / 2,
    height: width / 5,
  },
  editPrice: {
    height: 48,
    marginRight: 20,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});
