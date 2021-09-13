import React, { memo, useCallback, useLayoutEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import { useNavigation } from "@react-navigation/native";
import Theme from "style/Theme";
import MedicationMenu from "./components/MedicationMenu";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import ButtonIconHeader from "components/ButtonIconHeader";
import { width } from "configs/Const";
import { SOURCE_ICON } from "images";
import ScrollViewAnimatedHeader from "components/ScrollViewAnimatedHeader";
import FreeConsultsItem from "components/FreeConsultsItem";
import Container from "components/Layout/Container";

interface MedicationDetailProps {}

const MedicationDetail = memo(({}: MedicationDetailProps) => {
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
        <Image
          source={require("images/down.png")}
          style={{ zIndex: 10 }}
        />
        <View style={styles.content}>
          <Text size={24} lineHeight={28} bold>
            Amoxicillin
          </Text>
          <Text size={15} lineHeight={24} marginTop={16}>
            Amoxicillin is used to treat many different types of infection
            caused by bacteria, such as tonsillitis, bronchitis, pneumonia,
            gonorrhea, and infections of the ear, nose, throat, skin…
          </Text>
          <Text size={13} lineHeight={16} marginTop={32}>
            Created by
          </Text>
          <View style={{ ...Theme.flexRow, marginTop: 16 }}>
            <Image
              source={require("images/avatar/sarah.png")}
              style={{ width: 48, height: 48 }}
            />
            <View style={{ marginLeft: 16 }}>
              <Text size={15} lineHeight={18} bold color={Colors.DodgerBlue}>
                Dr. Russell Chavez
              </Text>
              <Text size={13} lineHeight={16}>
                Integrative Medicine
              </Text>
            </View>
          </View>
          <MedicationMenu />
          <Text size={17} lineHeight={20} bold marginTop={40} marginBottom={24}>
            Related Questions
          </Text>
          {relatedQuestions.map((item) => (
            <FreeConsultsItem {...item} key={item.id.toString()} />
          ))}
        </View>
      </ScrollViewAnimatedHeader>
    </Container>
  );
});

export default MedicationDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  content: {
    paddingTop: 32,
    paddingHorizontal: 24,
  },
});

const relatedQuestions = [
  {
    id: 0,
    question: `How can air pollution effect health? What are the health effects of air pollution?`,
    numberOfAnswers: 2,
    doctor: {
      name: "Madge Oliver",
      avatar: require("images/avatar/sarah.png"),
    },
    image: require("images/down.png"),
    answer: `Always use your own pen at the doctor's office and not the pen 100's of infected patients touched.`,
  },
];
