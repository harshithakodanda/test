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
interface AboutUsProps {
  route: any;
}

const { width } = Dimensions.get("window");

const AboutUs = memo(({ route }: AboutUsProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  useEffect(() => {
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.boxInput}>
      <Image source={require("images/loginLogo.png")} style={styles.logo} />
          <Layout style={styles.box}>
          
          <Text size={17} lineHeight={20} style={styles.textAlign}>
          My Finance Wellness is a brand of Indcamb Solutions Private Limited. 
          Founded by a team of senior management professionals, our aim is to 
          transform lives through Financial Wellness. We educate people through 
          our “unbiased financial wellness workshops" & provide 
          "quick financial health assessment" to understand one’s financial health. 
          Through our “one-on-one financial mentoring” we provide comprehensive
           financial planning and guidance on personal finance aspects. 
           We have targeted to reach out to 6 Millon people who are at the bottom
            of the pyramid individually and as Micro Enterprises by 2025.
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


export default AboutUs;

