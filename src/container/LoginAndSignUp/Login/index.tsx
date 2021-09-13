import React, { memo, useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Text from "components/Text";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import scale from "utils/scale";
import { Colors, Routes } from "configs";
import Theme from "style/Theme";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { TcodeArea } from "type/codeArea";
import { useNavigation } from "@react-navigation/native";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneInput from "react-native-phone-number-input";
import InputApp from "components/InputApp";
import axios from "axios";

const { width } = Dimensions.get("window");
interface LoginProps {
  codeArea: TcodeArea;
  openModalChange: () => void;
}

const Login = memo(({ openModalChange, codeArea }: LoginProps) => {
  const { navigate } = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showFooter, setShowFooter] = useState(true);
  const [valid, setValid] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const save = async () => {
    try {
      if (validation()) {
        navigate(Routes.VerifyPhoneNumber, { phoneNumber });
        setValid(true);
      }
      // await AsyncStorage.setItem(STORAGE_KEY, "Vincent")
      else {
        setValid(false);
        setShowMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const validation = () => {
    if (typeof phoneNumber !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(phoneNumber)) {
        var error = "Enter Valid Mobile Number";
        return false;
      } else if (phoneNumber.length != 10) {
        error = "Enter Valid Mobile Number";
        return false;
      }
      return true;
    }
    return false;
  };

  return (
    <Container style={styles.container}>
            <KeyboardAvoidingView>

      <View style={styles.logoApp}>
        <Image source={require("images/loginLogo.png")} style={styles.logo} />
        <Text style={{ fontSize: 25, margin: 15, color: "#00008B" }}>
          Verify your number
        </Text>
        <Text type="H5" bold center style={{ paddingHorizontal: 10 }}>
          We will send you One Time Password on this mobile number
        </Text>
      </View>
        <TextInput
          editable
          maxLength={10}
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, '')
            setPhoneNumber(text);
            setShowFooter(false);
            setShowMessage(false);
          }}
          placeholder={"Mobile Number"}
          value={phoneNumber}
          style={styles.editPrice}
          keyboardType="number-pad"
          onSubmitEditing={() => setShowFooter(true)}
        />
        {showMessage && (
          <Text style={{ color: "red" }}>Enter a valid phone number</Text>
        )}
      <ButtonLinear
        white
        title={"Get OTP"}
        onPress={() => {
          save();
        }}
        styleButton={styles.buttonLogin}
      />
            </KeyboardAvoidingView>

      {/* <KeyboardAvoidingView enabled={false}> */}
      {/* <View style={styles.signUp}>
        <Text type="H6" color={Colors.GrayBlue}>
         
          <Text
            blueLight
            type="H6"
            color={Colors.BlueCrayola}
            semiBold
           
          >
             © 2021 ALL RIGHTS RESERVED, {"\n"} INDCAMB SOLUTIONS PVT. LTD.
          </Text>
        </Text>
      </View> */}
      {/* </KeyboardAvoidingView> */}
    </Container>
  );
});

export default Login;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  phoneNumber: {
    marginLeft: 2,
    flex: 1,
    height: 40,
  },
  logoApp: {
    marginTop: getStatusBarHeight() + scale(46),
    alignSelf: "center",
    alignItems: "center",
  },
  logo: {
    // marginBottom: 12,
    // marginLeft: 12,
    width: width / 2,
    height: width / 5,
  },
  inputLogin: {
    marginTop: scale(60),
  },
  icon: {
    width: 24,
    height: 24,
  },
  margin24: {
    marginTop: 24,
  },
  forgot: {
    alignSelf: "center",
    marginTop: 32,
  },
  signUp: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "flex-end",
    bottom: 0,
  },
  textUnderline: {
    textDecorationLine: "underline",
  },
  buttonLogin: {
    marginTop: 24,
  },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
  changePhoneCode: {
    position: "absolute",
    right: 16,
    alignSelf: "center",
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "#575DD9",
    margin: 24,
    width: 290,
    height: 64,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "300",
  },
  editPrice: {
    height: 48,
    marginRight: 0,
    borderColor: Colors.Isabelline,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});
