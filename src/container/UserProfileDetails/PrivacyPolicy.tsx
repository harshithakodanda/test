import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,Dimensions
} from "react-native";
import Text from "components/Text";
import HeaderButton from "components/HeaderButton";
import Theme from "style/Theme";
import InputApp from "components/InputApp";
import scale from "utils/scale";
import { Colors, Routes } from "configs";
import TextInput from "components/TextInput";
import ButtonChangeCode from "components/ButtonChangeCode";
import ModalSlideBottom from "components/ModalSlideBottom";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";

import axios from "axios";
interface PrivacyPolicyProps {
  route: any;
}

const { width } = Dimensions.get("window");

const PrivacyPolicy = memo(({ route }: PrivacyPolicyProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  useEffect(() => {
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.boxInput}>
      
          <Layout style={styles.box}>
          
          <Text size={17} lineHeight={20} style={styles.textAlign}>
          We, at www.financewellness.com (the “Website”), value your privacy, and consider our relationship with you as invaluable and strive to respect and safeguard your right to privacy. We shall protect the personal information provided by you and shall not disclose the same to anyone unless it is required by law, directed by you, or necessary to provide our services to you or on your behalf.
          </Text>
          </Layout>

          <Layout style={styles.box}>
          
          <Text size={17} lineHeight={20} style={styles.textAlign}>
          Please visit the Privacy policy details at  
          </Text>
          <Text size={17} lineHeight={20} style={styles.emailText}>
          https://www.myfinancewellness.com/privacy-policy/
          </Text>
          <Text size={17} lineHeight={20} marginTop={20} style={styles.textAlign}>
          For questions related to updating or changing your account information or any other Information provided by you and for your valuable feedback regarding this Privacy Policy, please send an e-mail to 
          </Text>
          <Text size={17} lineHeight={20} style={styles.emailText}>
          support@myfinancewellness.com
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
  textAlign: {
    textAlign:"justify",

  },  emailText: {
    textAlign:"justify",
    color: Colors.Blue,
    fontStyle: "italic",
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
    textAlign:"justify"
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
  logo: {
    width: width/2,
    height: (width/5),
    alignItems: "center"
  },
});


export default PrivacyPolicy;

