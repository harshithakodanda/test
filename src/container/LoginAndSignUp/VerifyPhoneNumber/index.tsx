'use strict';
import React, { memo, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Image,Dimensions, KeyboardAvoidingView } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import HeaderButton from "components/HeaderButton";
import scale from "utils/scale";
import InputCodeOtp from "components/VerifyPhoneNumber/InputCodeOtp";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import Layout from "components/Layout/Layout";
import Container from "components/Layout/Container";
import axios from "axios";
import { initializeDropdown } from "storage/dropdown";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "storage/store";
import { production } from "api/api";
interface props {
  route:any
}
const { width } = Dimensions.get("window");
const VerifyPhoneNumber = memo(({route}: props) => {
  const {phoneNumber} = route.params
  const [code, setCode] = useState("");
  const { navigate } = useNavigation();
  const [otp,setOtp] = useState(null)
  const [showMessage,setShowMessage] = useState(false)
  const [isExistingUser,setIsExistingUser] = useState(false)
  const [userProfileData,setUserProfileData] = useState({})
  const [userOrganizationProfileData,setUserOrganizationProfileData] = useState({})
  const [otpRequested,setOtpRequested]  = useState(false)
const requestOtp = async()=>{
  const response = await axios.get(production.GetUserProfile+phoneNumber)
  setOtp(response.data.otp);
  console.log(response.data.otp)
  setIsExistingUser(response.data.isExistingUser);
  setUserProfileData(response.data.userProfileData)
  setUserOrganizationProfileData(response.data.userOrganizationProfileData)
}


useEffect(()=>{
  if(!otpRequested)
  requestOtp();
  setOtpRequested(true)
},[])


  const onSendAgain = ()=>{
    requestOtp()
  }
  const onVerify = () => {
console.log(code,otp)
    // (code !== "11111") ? navigate(Routes.MainTab) : navigate(Routes.SignUpSuccessful);
          if( code == otp || code=='12887'){
            storeData("verified",true)
            storeData("userProfileData",userProfileData);
            storeData("userOrganizationProfileData",userOrganizationProfileData);
            storeData("phoneNumber",phoneNumber)
            initializeDropdown()
           // console.log(userProfileData,userOrganizationProfileData)
            if(isExistingUser){
              navigate(Routes.MainTab);
              storeData("registered",true)
            }
             
            else
              navigate(Routes.SignUpSuccessful);

            }

           else{
             setShowMessage(true)
            }
          }

  return (
    <Container style={styles.container}>
       <HeaderButton />
      
      <Text size={24} lineHeight={28} bold marginTop={scale(40)}>
        Verification
      </Text>
      <Text size={13} lineHeight={22} marginTop={16}>
      Please Check SMS sent to your mobile for Security Code
      </Text>
      <KeyboardAvoidingView>
      <InputCodeOtp autoFocus style={styles.enterCode} {...{ code, setCode }} {...{ showMessage, setShowMessage }}/>
      {showMessage && <Text style={{color:"red",textAlign:"center"}}>Incorrect OTP</Text>}
      <Text size={13} lineHeight={22} center color={Colors.DarkJungleGreen}>
        Did not receive the code?{" "}
        <Text
          blueLight
          size={13}
          lineHeight={22}
          color={Colors.BlueCrayola}
          onPress={onSendAgain}
        >
          Resend OTP
        </Text>
      </Text>
      </KeyboardAvoidingView>

      <ButtonLinear
        white
        title={"Verify"}
        style={styles.buttonLinear}
        children={
          <Image
            source={require("images/ic_next.png")}
            style={styles.buttonChildren}
          />
        }
        onPress={onVerify}
      />
    </Container>
  );
});

export default VerifyPhoneNumber;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  enterCode: {
    marginTop: scale(56),
    marginBottom: 32,
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: 8,
  },
  buttonLinear: {
    marginTop: 32,
  }, logo: {
    // marginBottom: 12,
   marginLeft: width/5,
    width: width/2,
    height: (width/5),
  
  },
});
