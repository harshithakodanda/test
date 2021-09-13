import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Text from "components/Text";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import ButtonIconHeader from "components/ButtonIconHeader";
import SearchBox from "components/Home/SearchBox";
import { Colors } from "configs";
import Theme from "style/Theme";
import ButtonIcon from "components/Buttons/ButtonIcon";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import { useTheme } from "configs/Theme";
import Line from "components/Layout/Line";
import scale from "utils/scale";

interface ConditionsAndSymptomsProps {}

const ConditionsAndSymptoms = memo(({}: ConditionsAndSymptomsProps) => {
  const { navigate, setOptions } = useNavigation();
  const route: any = useRoute();
  const [keySearch, setKeySearch] = useState("");
  const { theme } = useTheme();
  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <Layout style={styles.header}>
          <ButtonIconHeader
            style={{ marginTop: getStatusBarHeight() + scale(8) }}
          />
          <SearchBox
            placeholder={"Enter condition, symptom..."}
            value={keySearch}
            onChangeText={setKeySearch}
            shadow={false}
            style={{
              backgroundColor: theme.placeholder,
              marginHorizontal: 16,
              marginBottom: 12,
              flex: 1,
            }}
          />
        </Layout>
      ),
    });
  }, [keySearch]);

  const renderItem = useCallback((item, index) => {
    return (
      <View>
        <TouchableOpacity
          key={index.toString()}
          style={{
            padding: 24,
          }}
        >
          <Text size={15} lineHeight={24} color={Colors.BlueCrayola} medium>
            {item}
          </Text>
        </TouchableOpacity>
        <Line />
      </View>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Layout
          style={{
            paddingTop: 16,
            borderRadius: 16,
            ...Theme.shadow,
          }}
        >
          <View
            style={{
              ...Theme.flexRow,
              paddingHorizontal: 24,

              paddingBottom: 16,
            }}
          >
            <ButtonIcon
              icon={"condition"}
              style={{
                width: 32,
                height: 32,
                backgroundColor: Colors.TealBlue20,
              }}
              tintColor={Colors.TealBlue}
              disabled
            />
            <Text size={15} lineHeight={18} bold marginLeft={16}>
              All Conditions & Symptoms
            </Text>
          </View>
          <Line />
          {DATA_CONDITIONS.map(renderItem)}
        </Layout>
      </ScrollView>
      <ButtonIcon icon={"atoz"} style={styles.buttonFilter} />
    </Container>
  );
});

export default ConditionsAndSymptoms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    ...Theme.flexRow,
    paddingLeft: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace() + 16,
  },
  buttonFilter: {
    width: 56,
    height: 56,
    backgroundColor: Colors.Orange,
    borderRadius: 20,
    position: "absolute",
    alignSelf: "center",
    bottom: getBottomSpace() + 16,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowColor: Colors.Orange,
    shadowOpacity: 0.45,
    zIndex: 10,
  },
});

const DATA_CONDITIONS = [
  "Abdominal aortic aneurysm",
  "Acne",
  "Acute cholecystitis",
  "Acute lymphoblastic leukaemia",
  "Acute lymphoblastic leukaemia: Children",
  "Allergic rhinitis",
  "Allergies",
  `Alzheimer's disease`,
  "Binge eating",
  "Bipolar disorder ",
  "Bladder cancer ",
  "Blood poisoning (sepsis) ",
  "Bone cancer ",
  "Bone cancer: Teenagers and young adultss",
  "Bowel cancer ",
  "Bowel incontinence",
  "Bowel polyps ",
];
