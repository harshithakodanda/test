import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Linking,
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
import { getData } from "storage/store";
import axios from "axios";
interface HelpProps {
  route: any;
}

const { width } = Dimensions.get("window");

const Help = memo(({ route }: HelpProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const [mobile, setMobile] = useState("");
  const [urlLink, seturlLink] = useState("");
  useEffect(() => {
    getData("userProfileData").then(user=>setMobile("https://app.myfinancewellness.com/Payment?mobileNo="+user.mobile));
    seturlLink("https://app.myfinancewellness.com/Payment?mobileNo="+{mobile});
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.boxInput}>
      
      <Layout style={styles.box}>
          
      <Text size={17} lineHeight={20} >For more information on My Finance Wellness Services and Features, {"\n"}Please visit
  <Text  size={17} lineHeight={20}  style={{color:'blue'}} onPress={() => Linking.openURL(mobile)}>
   {" "} Here 
  </Text> </Text>
          </Layout>

          <Layout style={styles.box}>
          
          <Text size={17} lineHeight={20} style={styles.textAlign}>
          Team My Finance Wellness is always ready to address your queries, feedback, or suggestions. Please reach out to us
          </Text>
          <Text size={17} lineHeight={20} marginTop={12} style={styles.emailText}>
          Email: info@myfinancewellness.com
          </Text>
          </Layout>

          <Layout style={styles.box}>
          
          <Text size={17} bold lineHeight={20} style={styles.textAlign}>
          Address: {"\n"}
          Corporate Office
          </Text>
          <Text size={17} lineHeight={20} style={styles.textAlign}>
          #72, 3rd Cross Road, Residency Road{"\n"}
          Ashok Nagar{"\n"}
          Bangalore, India - 560025{"\n"}
          </Text>
          
          <Text size={17} bold lineHeight={20} marginTop={20} style={styles.textAlign}>
          Registered Office
          </Text>
          <Text size={17} lineHeight={20} style={styles.textAlign}>
                20, 2nd Main, 3rd Block, HRBR Layout{"\n"}
                St. Thomas Town{"\n"}
                Bangalore, India - 560084{"\n"}
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
  emailText: {
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


export default Help;

