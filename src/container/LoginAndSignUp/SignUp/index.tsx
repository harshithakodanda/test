import React, { memo, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Modal, Image, FlatList } from "react-native";
import Theme from "style/Theme";
import scale from "utils/scale";
import validationEmail from "utils/validation/email";
import { phonesAreaCodes } from "configs/Data";
import SignUpUi from "./UI/SignUpUi";
import { useNavigation } from "@react-navigation/native";
import { Routes, Colors } from "configs";
import ModalSlideBottom from "components/ModalSlideBottom";
import TextInput from "components/TextInput";
import Text from "components/Text";
import ModalChangePhoneCode from "components/SignUp/ModalChangePhoneCode";
import { onChange } from "react-native-reanimated";
import { TcodeArea } from "type/codeArea";
import useModalAnimation from "hooks/useModalAnimation";

interface SignUpProps {}

const SignUp = memo((props: SignUpProps) => {
  const [email, setEmail] = useState("lehieuds@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("419-319-9837");
  const [password, setPassword] = useState("12345678");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [codeArea, setCodeArea] = useState(phonesAreaCodes[0]);
  const { visible, open, close, transY } = useModalAnimation();

  const { navigate } = useNavigation();

  const onShowHidePassword = useCallback(() => {
    setVisiblePassword((prev) => !prev);
  }, []);

  const onSignUp = useCallback(() => {
    navigate(Routes.VerifyPhoneNumber);
  }, []);
  const onTermOfUse = useCallback(() => {}, []);
  const onPrivacyPolicy = useCallback(() => {}, []);
  const onGoToLogin = useCallback(() => {
    navigate(Routes.Login);
  }, [navigate]);

  const onChangeCode = useCallback((item: TcodeArea) => {
    setCodeArea(item);
    close();
  }, []);

  useEffect(() => {
    const validation = validationEmail(email);
    setIsValidEmail(validation);
  }, [email]);

  return (
    <View style={styles.container}>
      <SignUpUi
        {...{
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
        }}
        openModalChange={open}
      />
      <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={"none"}
      >
        <ModalSlideBottom onClose={close} transY={transY}>
          <ModalChangePhoneCode onChangeCode={onChangeCode} />
        </ModalSlideBottom>
      </Modal>
    </View>
  );
});

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
});
