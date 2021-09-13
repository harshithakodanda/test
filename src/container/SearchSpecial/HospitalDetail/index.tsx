import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/Text";
import ButtonIconHeader from "components/ButtonIconHeader";
import Theme from "style/Theme";
import { Colors } from "configs";
import { SOURCE_ICON } from "images";
import ScrollViewAnimatedHeader from "components/ScrollViewAnimatedHeader";
import { useRoute } from "@react-navigation/native";
import ButtonIcon from "components/Buttons/ButtonIcon";
import RowInfo from "components/RowInfo";
import Container from "components/Layout/Container";

interface HospitalDetailProps {}

const HospitalDetail = memo(({}: HospitalDetailProps) => {
  const route: any = useRoute();
  const hospital = route.params?.hospital || {};
  const renderHeader = useCallback(() => {
    return (
      <View
        style={{
          paddingTop: 12,
          paddingBottom: 16,
          paddingHorizontal: 24,
          ...Theme.flexRowSpace,
        }}
      >
        <ButtonIconHeader
          backgroundColor={Colors.DarkJungleGreenOpacity}
          borderColor={Colors.DarkJungleGreenOpacity}
          style={{ borderWidth: 0 }}
          tintColor={Colors.White}
        />
        <ButtonIconHeader
          backgroundColor={Colors.DarkJungleGreenOpacity}
          borderColor={Colors.DarkJungleGreenOpacity}
          style={{ borderWidth: 0 }}
          icon={SOURCE_ICON.share}
          tintColor={Colors.White}
        />
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <ScrollViewAnimatedHeader renderHeader={renderHeader}>
        <Image source={require("images/down.png")} />
        <View style={{ ...Theme.shadow, marginTop: -40, marginLeft: 24 }}>
          <Image source={hospital.logo} style={{ width: 80, height: 80 }} />
        </View>
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text size={24} lineHeight={36} bold>
            {hospital.name}
          </Text>
          <RowInfo
            icon={"hospital"}
            value={hospital.address}
            style={{ marginTop: 24 }}
          />
          <RowInfo
            icon={"call"}
            value={"+1 212-523-5222"}
            style={{ marginTop: 24 }}
            titleColor={Colors.DodgerBlue}
            bold
          />
          <RowInfo
            icon={"hospital-bed"}
            value={"125 beds"}
            style={{ marginTop: 24 }}
          />
          <Text size={24} lineHeight={36} bold marginTop={48}>
            Overview
          </Text>
          <Text size={15} lineHeight={24}>
            Type: Nongovernment,{"\n"}
            Not-for-profit System: Continuum Health Partners {"\n"}
            Website:{" "}
            <Text size={15} lineHeight={24} color={Colors.DodgerBlue}>
              www.slrsurgery.org {"\n"}
            </Text>
            JCAHO Accredited {"\n"} {"\n"}
            Warning: Always call 911 in the case of emergency. Always call the
            hospital to confirm its location, hours of operation and services
            before heading to the hospital.
          </Text>
          <Text size={24} lineHeight={36} bold marginTop={48}>
            Services
          </Text>
          <Text size={15} lineHeight={24}>
            Angioplasty{"\n"}
            Breast Cancer Screening{"\n"}
            Cardiac Cath Lab{"\n"}
            Emergency Department{"\n"}
            End of Life Services: Hospice Program{"\n"}
            General Medical Surgical{"\n"}
            Geriatric Services{"\n"}
            HIV-AIDS Services{"\n"}
            Health Screenings{"\n"}
            Hemodialysis{"\n"}
            [Show All]{"\n"}
          </Text>
        </View>
      </ScrollViewAnimatedHeader>
    </Container>
  );
});

export default HospitalDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
