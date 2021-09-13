import React, { memo, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Text from "components/Text";
import HeaderButton from "components/HeaderButton";
import Theme from "style/Theme";
import scale from "utils/scale";
import InputApp from "components/InputApp";
import { Colors, Routes } from "configs";
import ButtonLinear from "components/Buttons/ButtonLinear";
import ButtonAdd from "components/Buttons/ButtonAdd";
import { useNavigation } from "@react-navigation/native";
import Container from "components/Layout/Container";
interface OtherInformationProps {}

const OtherInformation = memo((props: OtherInformationProps) => {
  const [medicalSchool, setMedicalSchool] = useState(
    "Boston University School of Medicine"
  );
  const [educated, setEducated] = useState("FCPS, MBBS, Clinical Medicine");
  const [degree, setDegree] = useState("MD '06");
  const [year, setYear] = useState("1991");
  const [licenseCounty, setLicenseCounty] = useState("Boston");
  const [licenseOfState, setLicenseOfState] = useState("New York");
  const [licenseNumber, setLicenseNumber] = useState("24582");
  const [npiNumber, setNPINumber] = useState("2436862470");
  const [licenseExpiration, setLicenseExpiration] = useState("12/06/2022");
  const [certificationName, setCertificationName] = useState("");
  const [certificationYear, setCertificationYear] = useState("Select");
  const [awardName, setAwardName] = useState(
    "Certificate of Outstanding Contribution in Reviewing"
  );
  const [awardYear, setAwardYear] = useState("Select");

  const { navigate } = useNavigation();

  const onAddSchool = useCallback(() => {}, []);
  const onAddAdditionalCertification = useCallback(() => {}, []);
  const onAddAward = useCallback(() => {}, []);
  const onAddCertification = useCallback(() => {}, []);
  const onAddCertificationPhoto = useCallback(() => {}, []);
  const onDeleteCertificationPhoto = useCallback(() => {}, []);
  const onDeleteLicense = useCallback(() => {}, []);
  const onSendVerifyRequest = useCallback(() => {
    navigate(Routes.SentVerifySuccessful);
  }, [navigate]);
  return (
    <Container style={styles.container}>
      <HeaderButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text size={13} lineHeight={16} bold marginTop={32}>
          Step 3 of 3
        </Text>
        <Text size={24} lineHeight={28} bold marginTop={16}>
          Others Information
        </Text>
        <Text size={13} lineHeight={22} marginTop={16}>
          Your information will be share with our Medical Expert team who will
          verify your identity.
        </Text>
        <Text size={17} lineHeight={20} marginTop={scale(48)} bold>
          Education
        </Text>

        <InputApp
          title={"Medical School"}
          value={medicalSchool}
          marginTop={24}
          onChangeText={setMedicalSchool}
        />
        <InputApp
          title={"Educated"}
          value={educated}
          marginTop={24}
          onChangeText={setEducated}
        />
        <View style={styles.inputApp}>
          <InputApp
            title={"Degree"}
            value={degree}
            styleView={Theme.flexOne}
            onChangeText={setDegree}
          />
          <InputApp
            title={"Year"}
            value={year}
            styleView={styles.yearInput}
            onChangeText={setYear}
          />
        </View>
        <ButtonAdd title={"Add More School"} onPress={onAddSchool} />
        <View style={styles.centerContent}>
          <Text size={17} lineHeight={20} bold>
            Medical Board License
          </Text>
          <InputApp
            title={"License County"}
            onChangeText={setLicenseCounty}
            value={licenseCounty}
            marginTop={24}
          />
          <InputApp
            title={"License of State"}
            onChangeText={setLicenseOfState}
            value={licenseOfState}
            marginTop={24}
          />
          <View style={styles.inputApp}>
            <InputApp
              title={"License Number"}
              onChangeText={setLicenseNumber}
              value={licenseNumber}
              styleView={styles.licenseNumber}
            />
            <InputApp
              title={"NPI Number"}
              onChangeText={setNPINumber}
              value={npiNumber}
              styleView={styles.npiNumber}
            />
          </View>
          <InputApp
            title={"License Expiration"}
            onChangeText={setLicenseExpiration}
            value={licenseExpiration}
            marginTop={24}
            iconLeft={
              <Image
                source={require("images/ic_calendar.png")}
                style={Theme.icons}
              />
            }
            isShowIconLeft
          />
          <View style={styles.licenseImage}>
            <Image source={require("images/OtherInfo/license.png")} />
          </View>
          <TouchableOpacity
            style={Theme.alignSelfCenter}
            onPress={onDeleteLicense}
          >
            <Text
              size={13}
              lineHeight={16}
              color={Colors.GrayBlue}
              semiBold
              center
              marginTop={24}
              textDecorationLine={"underline"}
            >
              Delete Photo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContent}>
          <Text size={17} lineHeight={20} bold>
            {"Certifications & Awards"}
          </Text>
          <Text size={13} lineHeight={22} marginTop={12}>
            This information is only optional. You can skip it and update later.
          </Text>
          <Text size={15} lineHeight={18} marginTop={24} bold>
            Certifications
          </Text>
          <View style={styles.inputApp}>
            <InputApp
              title={"Certification Name"}
              value={certificationName}
              styleView={Theme.flexOne}
              onChangeText={setCertificationName}
            />
            <InputApp
              title={"Year"}
              value={certificationYear}
              styleView={styles.yearInput}
            />
          </View>
          <ButtonLinear
            styleButton={{ marginTop: 24 }}
            white
            title={"Attach Certification Photo"}
            leftChildren={
              <Image
                source={require("images/ic_attach.png")}
                style={styles.iconButton}
              />
            }
            onPress={onAddCertificationPhoto}
          />
          <ButtonAdd
            title={"Add More Certification"}
            onPress={onAddCertification}
          />
        </View>
        <View style={styles.award}>
          <Text size={15} lineHeight={18} bold>
            Awards
          </Text>
          <View style={styles.inputApp}>
            <InputApp
              title={"Award Name"}
              value={awardName}
              styleView={Theme.flexOne}
              onChangeText={setAwardName}
              multiline
            />
            <InputApp
              title={"Year"}
              value={awardYear}
              styleView={styles.yearInput}
            />
          </View>
          <View style={styles.licenseImage}>
            <Image source={require("images/OtherInfo/license.png")} />
          </View>
          <TouchableOpacity
            style={Theme.alignSelfCenter}
            onPress={onDeleteCertificationPhoto}
          >
            <Text
            
              size={13}
              lineHeight={16}
              color={Colors.GrayBlue}
              semiBold
              center
              marginTop={24}
              textDecorationLine={"underline"}
            >
              Delete Photo
            </Text>
          </TouchableOpacity>
          <ButtonAdd title={"Add More Award"} onPress={onAddAward} />
        </View>
        <View style={styles.centerContent}>
          <Text size={17} lineHeight={20} bold>
            {"Additional Links"}
          </Text>
          <Text size={13} lineHeight={22} marginTop={12}>
            This information is only optional. You can skip it and update later.
          </Text>
          <InputApp
            title={"Certification Name"}
            value={certificationName}
            marginTop={24}
            onChangeText={setCertificationName}
          />
          <ButtonAdd
            title={"Add More Certification"}
            onPress={onAddAdditionalCertification}
          />
        </View>
        <ButtonLinear
          white
          title={"Send Verify Request"}
          style={styles.sendButton}
          onPress={onSendVerifyRequest}
        />
      </ScrollView>
    </Container>
  );
});

export default OtherInformation;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  inputApp: {
    marginTop: 24,
    ...Theme.flexDirection,
  },
  yearInput: {
    width: 100,
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
  centerContent: {
    marginTop: scale(32),
    paddingTop: scale(48),
    borderTopColor: Colors.TealBlue,
    borderTopWidth: 1,
  },
  npiNumber: {
    ...Theme.flexOne,
    marginLeft: 8,
  },
  licenseNumber: {
    ...Theme.flexOne,
    marginRight: 8,
  },
  licenseImage: {
    marginTop: 24,
    height: 160,
    borderRadius: 8,
    backgroundColor: Colors.Isabelline,
    paddingHorizontal: scale(52),
  },
  iconButton: {
    ...Theme.icons,
    marginRight: 8,
  },
  award: {
    marginTop: scale(32),
    paddingTop: scale(32),
    borderTopColor: Colors.TealBlue,
    borderTopWidth: 1,
  },
  sendButton: {
    marginTop: scale(52),
  },
});
