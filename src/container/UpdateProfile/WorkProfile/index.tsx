import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
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
import ModalChangePhoneCode from "components/SignUp/ModalChangePhoneCode";
import useModalAnimation from "hooks/useModalAnimation";
import { phonesAreaCodes } from "configs/Data";
import { TcodeArea } from "type/codeArea";
import TagItem from "components/WorkProfile/TagItem";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Layout from "components/Layout/Layout";
import Content from "components/Layout/Content";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";
import GenderItem from "components/UpdateProfile/BasicInformation/GenderItem";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { getData, storeData } from "storage/store";
import axios from "axios";
import { production } from "api/api";
interface WorkProfileProps {
  route: any;
}

interface Organization {
  businessName: string;
  businessType: string;
  ownerName: string;
  gst: string;
  lineOFBusiness: string;
  employeeCount: any;
  createdOn: string;
  modifiedOn: string;
  id: any;
  primaryCustomerId: any;
}

const WorkProfile = memo(({ route }: WorkProfileProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  let dummy = {
    businessName: "",
    businessType: "",
    ownerName: "",
    gst: "",
    lineOFBusiness: "",
    employeeCount: "",
    createdOn: "",
    modifiedOn: "",
    id: 0,
    primaryCustomerId: 0,
  };

  const [userProfileData, setUserProfileData] = useState({});
  const [userOrganizationProfileData, setUserOrganizationProfileData] =
    useState<Organization>(dummy);
   const isFocused = useIsFocused()
  useEffect(() => {
    setTimeout(()=>{
      getData("userOrganizationProfileData").then((res: any) => {
      //  console.log("test",res)
        if (res) {
          setUserOrganizationProfileData(res);
          setBusinessName(res.businessName || "");
          setBusinessType(res.businessType || "Proprietorship");
          setownerName(res.ownerName || "");
          setGst(res.gst || "");
          setOrgId(res.id);
          setLineOFBusiness(res.lineOFBusiness || "");
          setEmployeeCount(res.employeeCount>0 ? res.employeeCount.toString():"");
        } else setUserProfileData({});
      });
      getData("userProfileData").then((res) => {
        res ? setUserProfileData(res) : setUserProfileData({});
      });
    },1000)
    

  }, [isFocused]);

  const [code, setCode] = useState(phonesAreaCodes[0]);

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Proprietorship");
  const [ownerName, setownerName] = useState("");
  const [orgId, setOrgId] = useState(0);
  const [gst, setGst] = useState("");
  const [lineOFBusiness, setLineOFBusiness] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [valid, setValid] = useState(true);

  const onChangeCode = useCallback((item: TcodeArea) => {
    setCode(item);
    close();
  }, []);
  const onGoToOtherInfo = () => {
    if (
      businessName == "" ||
      businessType == "" ||
      ownerName == "" ||
      employeeCount == ""
    ) {
      setValid(false);
      return;
    }
    let data = {
      businessName,
      businessType,
      ownerName,
      gst,
      lineOFBusiness,
      employeeCount: parseInt(employeeCount),
      createdOn: new Date().toISOString(),
      modifiedOn: new Date().toISOString(),
      id: orgId,
      primaryCustomerId: userProfileData.id
    };
    storeData("userOrganizationProfileData", data);

  //  console.log("work",JSON.parse(
  //   JSON.stringify({
  //     userProfileData: JSON.parse(JSON.stringify(userProfileData)),
  //     userOrganizationProfileData: JSON.parse(JSON.stringify(data)),
  //   })
  // ))

    axios
      .post(
        production.PostUserProfile,
        JSON.parse(
          JSON.stringify({
            userProfileData: JSON.parse(JSON.stringify(userProfileData)),
            userOrganizationProfileData: JSON.parse(JSON.stringify(data)),
          })
        )
      )
      .then((res) => {
       //  console.log("work",res.status,res.data);
        storeData("userProfileData", res.data.userProfileData);
        storeData(
          "userOrganizationProfileData",
          res.data.userOrganizationProfileData
        );
      })
      .catch((e) => console.log(e));

    getData("registered").then((res) => {
      if (res) navigate(Routes.Account);
      else {
        storeData("registered", true);
             
        navigate(Routes.SentVerifySuccessful);
      }
    });
  };

  const { visible, open, close, transY } = useModalAnimation();

  return (
    <Container style={styles.container}>
      <HeaderButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text size={13} lineHeight={16} bold marginTop={32}>
          Step 2 of 2
        </Text> */}
        <Text size={24} lineHeight={28} bold marginTop={16}>
          Your Organization Profile
        </Text>
        <InputApp
          title={"Business Name"}
          marginTop={38}
          value={businessName}
          onChangeText={setBusinessName}
          iconLeft={
            <Icon
              color="#02b4b8"
              name="building"
              type="font-awesome"
              size={22}
              style={{ alignSelf: "center" }}
            />
          }
          isShowIconLeft
        />
        {!valid && businessName == "" && (
          <Text style={{ color: "red" }}>This is required</Text>
        )}

        <InputApp
          title={"Owner Name"}
          marginTop={24}
          onChangeText={setownerName}
          value={ownerName}
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
          editable
        />
        {!valid && ownerName == "" && (
          <Text style={{ color: "red" }}>This is required</Text>
        )}

        <Text type="H5" semiBold marginTop={24}>
          Business Type
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
            selectedValue={businessType}
            style={styles.editPrice}
            onValueChange={(itemValue, itemIndex) => setBusinessType(itemValue)}
          >
            <Picker.Item label="Proprietorship" value="Proprietorship" />
            <Picker.Item label="Partnership" value="Partnership" />
            <Picker.Item label="Unregistered" value="Unregistered" />
            <Picker.Item label="Pvt Ltd" value="PvtLtd" />
            <Picker.Item label="LLP" value="LLP" />
            <Picker.Item label="Non-Registered" value="NonRegistered" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        <InputApp
          title={"GST Number"}
          onChangeText={setGst}
          marginTop={24}
          value={gst}
          iconLeft={
            <Icon
              color="#02b4b8"
              name="id-card"
              type="font-awesome"
              size={22}
              style={{ alignSelf: "center" }}
            />
          }
          isShowIconLeft
        />
        {/* {!valid && gst == "" && (
          <Text style={{ color: "red" }}>This is required</Text>
        )} */}

        <InputApp
          title={"No of Employees"}
          value={employeeCount}
          marginTop={24}
          onChangeText={setEmployeeCount}
          keyboardType={"numeric"}
          iconLeft={
            <Icon
              color="#02b4b8"
              name="users"
              type="font-awesome"
              size={22}
              style={{ alignSelf: "center" }}
            />
          }
          isShowIconLeft
        />
        {!valid && employeeCount == "" && (
          <Text style={{ color: "red" }}>This is required</Text>
        )}

        <InputApp
          title={"Line of Business"}
          marginTop={24}
          onChangeText={setLineOFBusiness}
          value={lineOFBusiness}
          placeholder={"Ex- Manufacturing"}
          iconLeft={
            <Icon
              color="#02b4b8"
              name="sitemap"
              type="font-awesome"
              size={22}
              style={{ alignSelf: "center" }}
            />
          }
          isShowIconLeft
        />
        {!valid && lineOFBusiness == "" && (
          <Text style={{ color: "red" }}>This is required</Text>
        )}

        <ButtonLinear
          title={"Save"}
          style={{ marginTop: 25 }}
          white
          // children={
          //   <Image
          //     source={require("images/ic_next.png")}
          //     style={styles.buttonChildren}
          //   />
          // }
          onPress={onGoToOtherInfo}
        />
      </ScrollView>
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
    </Container>
  );
});

export default WorkProfile;

const styles = StyleSheet.create({
  container: { ...Theme.container },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
  phoneNumber: {
    marginLeft: 8,
    flex: 1,
  },
  iconSearch: {
    ...Theme.icons,
    tintColor: Colors.DodgerBlue,
  },
  spec: {
    marginTop: 8,
    ...Theme.flexRow,
    flexWrap: "wrap",
    paddingBottom: 32,
    borderBottomColor: Colors.TealBlue,
    borderBottomWidth: 1,
  },
  specLanguage: {
    marginTop: 8,
    ...Theme.flexRow,
    flexWrap: "wrap",
    paddingBottom: 52,
  },
  insurancePlans: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 4,
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: 8,
  },
  buttonAdd: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.Platinum,
    height: 36,
    ...Theme.center,
    borderRadius: 8,
    ...Theme.flexDirection,
  },
  iconRight: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  bottomContent: {
    paddingTop: 32,
    borderTopColor: Colors.TealBlue,
    borderTopWidth: 1,
    marginTop: 32,
  },
  orgs: {
    marginTop: 24,
    ...Theme.flexRow,
    ...Theme.center,
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
