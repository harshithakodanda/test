import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Text from "components/Text";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import ButtonIconHeader from "components/ButtonIconHeader";
import SearchBox from "components/Home/SearchBox";
import { Colors, Routes } from "configs";
import Theme from "style/Theme";
import ButtonIcon from "components/Buttons/ButtonIcon";
import { SOURCE_ICON } from "images";
import Layout from "components/Layout/Layout";
import Container from "components/Layout/Container";

interface MedicationsProps {}

const Medications = memo(({}: MedicationsProps) => {
  const { navigate, setOptions } = useNavigation();
  const route: any = useRoute();
  const [keySearch, setKeySearch] = useState("");

  const renderItem = useCallback((item, index) => {
    return (
      <TouchableOpacity
        key={index.toString()}
        style={{
          padding: 24,
          borderBottomWidth: 1,
          borderBottomColor: Colors.WhiteSmoke,
        }}
        onPress={() => {
          navigate(Routes.MedicationDetail);
        }}
      >
        <Text size={15} lineHeight={24} color={Colors.BlueCrayola} medium>
          {item}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <Layout style={styles.header}>
        <ButtonIconHeader style={{}} />
        <SearchBox
          placeholder={"Enter condition, symptom..."}
          value={keySearch}
          onChangeText={setKeySearch}
          borderColor={Colors.Isabelline}
          shadow={false}
          style={{
            backgroundColor: Colors.Isabelline,
            marginHorizontal: 16,
            marginBottom: 0,
            marginTop: 0,
            flex: 1,
          }}
        />
      </Layout>

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
              borderBottomWidth: 1,
              borderBottomColor: Colors.WhiteSmoke,
              paddingBottom: 16,
            }}
          >
            <ButtonIcon
              icon={"medication"}
              style={{
                width: 32,
                height: 32,
                backgroundColor: Colors.TealBlue20,
              }}
              tintColor={Colors.TealBlue}
              disabled
            />
            <Text size={15} lineHeight={18} bold marginLeft={16}>
              All Medications
            </Text>
          </View>
          {DATA_CONDITIONS.map(renderItem)}
        </Layout>
      </ScrollView>
      <ButtonIcon icon={"atoz"} style={styles.buttonFilter} />
    </Container>
  );
});

export default Medications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    ...Theme.flexRow,
    paddingLeft: 24,
    paddingRight: 8,
    paddingTop: getStatusBarHeight(),
    paddingBottom: 12,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace() + 16,
    paddingTop: 16,
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
  "Abilify",
  "Acetaminophen",
  "Acyclovir",
  "Adderall",
  "Advair",
  "Advair Diskus",
  "Advil",
  `Albuterol`,
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
