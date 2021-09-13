import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import HeaderButton from "components/HeaderButton";
import Theme from "style/Theme";
import Text from "components/Text";
import scale from "utils/scale";
import { Colors } from "configs";
import InputApp from "components/InputApp";
import TextInput from "components/TextInput";
import validationEmail from "utils/validation/email";
import ButtonLinear from "components/Buttons/ButtonLinear";
import ButtonChangeCode from "components/ButtonChangeCode";
import { TcodeArea } from "type/codeArea";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";

interface SignUpUiProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  isValidEmail: boolean;
  codeArea: TcodeArea;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  visiblePassword: boolean;
  onShowHidePassword: () => void;
  onSignUp: () => void;
  onTermOfUse: () => void;
  onPrivacyPolicy: () => void;
  onGoToLogin: () => void;
  openModalChange: () => void;
}

const SignUpUi = memo(
  ({
    email,
    setEmail,
    isValidEmail,
    codeArea,
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    visiblePassword,
    onShowHidePassword,
    onSignUp,
    onTermOfUse,
    onPrivacyPolicy,
    onGoToLogin,
    openModalChange,
  }: SignUpUiProps) => {
    const { theme } = useTheme();
    return (
      <Container style={styles.container}>
        <HeaderButton />
        <Text size={24} lineHeight={28} bold marginTop={scale(40)}>
          Welcome to My Finance Wellness!
        </Text>
        
        <Text size={13} lineHeight={16} marginTop={24}>
          Mobile Phone
        </Text>
        <View style={styles.phoneView}>
          <ButtonChangeCode codeArea={codeArea} onPress={openModalChange} />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.phoneNumber}
            borderColor={Colors.Isabelline}
          />
        </View>
        
        <ButtonLinear
          title={"Sign Up"}
          onPress={onSignUp}
          styleButton={styles.buttonLinear}
          white
        />
        <Text type="P6" color={Colors.DarkJungleGreen} center marginTop={28}>
          By clicking sign up you are agreeing to the{"\n"}
          <Text
            type="P6"
            color={Colors.BlueCrayola}
            onPress={onTermOfUse}
            center
          >
            Terms of use
          </Text>{" "}
          and the{" "}
          <Text
            type="P6"
            color={Colors.BlueCrayola}
            onPress={onPrivacyPolicy}
            center
          >
            Privacy policy
          </Text>
        </Text>
        <View style={styles.bottom}>
          <Text type="H6" color={Colors.GrayBlue}>
            Already have an account?{" "}
            <Text
              type="H6"
              color={Colors.BlueCrayola}
              semiBold
              onPress={onGoToLogin}
            >
              Log In
            </Text>
          </Text>
        </View>
      </Container>
    );
  }
);

export default SignUpUi;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  password: {
    marginTop: 24,
  },
  phoneNumber: {
    marginLeft: 8,
    flex: 1,
  },
  emailInput: {
    marginTop: scale(34),
  },
  bottom: {
    ...Theme.flexOne,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flag: {
    width: 32,
    height: 20,
  },
  changePhoneCode: {
    position: "absolute",
    right: 16,
    alignSelf: "center",
  },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
  buttonLinear: {
    marginTop: 24,
  },
});
