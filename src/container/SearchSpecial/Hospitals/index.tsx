import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import SearchBox from "components/Home/SearchBox";
import { Colors, Routes } from "configs";
import ButtonIconHeader from "components/ButtonIconHeader";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";
import ExpertsItem from "container/SearchResult/components/Experts/ExpertsItem";
import ButtonIcon from "components/ButtonIcon";
import HospitalItem from "./components/HospitalItem";
import Layout from "components/Layout/Layout";
import Container from "components/Layout/Container";

interface SearchSpecialHospitalProps {}

const SearchSpecialHospital = memo(({}: SearchSpecialHospitalProps) => {
  const { navigate, setOptions } = useNavigation();
  const [keySearch, setKeySearch] = useState("");
  const onSubmitEditing = useCallback(() => {
    navigate(Routes.SearchDoctorResults, { keySearch: keySearch });
    setKeySearch("");
  }, [navigate, keySearch]);

  return (
    <Container style={styles.container}>
      <Layout style={styles.header}>
        <ButtonIconHeader style={{ marginTop: getStatusBarHeight() }} />
        <SearchBox
          placeholder={"Enter name, speciality..."}
          value={keySearch}
          onChangeText={setKeySearch}
          borderColor={Colors.Isabelline}
          shadow={false}
          style={{
            backgroundColor: Colors.Isabelline,
            marginHorizontal: 16,
            marginBottom: 12,
            flex: 1,
          }}
          onSubmitEditing={onSubmitEditing}
        />
        <ButtonIconHeader
          style={{ marginTop: getStatusBarHeight() }}
          icon={SOURCE_ICON.nearby}
          borderColor={Colors.DodgerBlue}
        />
      </Layout>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text size={15} lineHeight={24}>
          Find{" "}
          <Text size={15} lineHeight={24} bold>
            14
          </Text>{" "}
          hospital, clinic around you.
        </Text>
        <TouchableOpacity>
          <Text size={15} lineHeight={24} medium color={Colors.DodgerBlue}>
            Change location
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 24 }}>
          {DATA_HOSPITAL.map((item) => (
            <HospitalItem {...item} key={item.id.toString()} />
          ))}
        </View>
      </ScrollView>
    </Container>
  );
});

export default SearchSpecialHospital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...Theme.flexRow,
    paddingLeft: 24,
    paddingRight: 24,
  },
  contentContainerStyle: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
  },
});

const DATA_HOSPITAL = [
  {
    id: 0,
    name: "West End Pediatrics",
    logo: require("images/down.png"),
    address: "2 5th Ave Suite 8, NY 10011",
    distance: 0.5,
    rate: 4.8,
    numberReview: 141,
  },
  {
    id: 1,
    name: "Student Health Center - New York University",
    logo: require("images/down.png"),
    address: "726 Broadway, NY 10003",
    distance: 1,
    rate: 4.8,
    numberReview: 357,
  },
  {
    id: 2,
    name: "Rate My Hospital",
    logo: require("images/down.png"),
    address: "2 5th Ave Suite 8, NY 10011",
    distance: 1.5,
    rate: 4.8,
    numberReview: 753,
  },
  {
    id: 3,
    name: "Mount Sinai St. Luke’s Hospital Breast Center",
    logo: require("images/down.png"),
    address: "217 Grand St, NY 10013",
    distance: 2,
    rate: 4.8,
    numberReview: 141,
  },
  {
    id: 4,
    name: "West End Pediatrics",
    logo: require("images/down.png"),
    address: "2 5th Ave Suite 8, NY 10011",
    distance: 0.5,
    rate: 4.8,
    numberReview: 141,
  },
];
