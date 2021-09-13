import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import { useTheme } from "configs/Theme";

interface SearchSpecialDoctorProps {}

const SearchSpecialDoctor = memo(({}: SearchSpecialDoctorProps) => {
  const { theme } = useTheme();
  const { navigate, setOptions } = useNavigation();
  const [keySearch, setKeySearch] = useState("");
  const onSubmitEditing = useCallback(() => {
    navigate(Routes.SearchDoctorResults, { keySearch: keySearch });
    setKeySearch("");
  }, [navigate, keySearch]);
  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <Layout style={styles.header}>
          <ButtonIconHeader style={{ marginTop: getStatusBarHeight() }} />
          <SearchBox
            placeholder={"Enter name, speciality..."}
            value={keySearch}
            onChangeText={setKeySearch}
            shadow={false}
            style={{
              backgroundColor: theme.placeholder,
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
            tintColor={Colors.DodgerBlue}
          />
        </Layout>
      ),
    });
  }, [keySearch, onSubmitEditing]);
  return (
    <Container style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text size={17} lineHeight={20} bold>
          My Network 3
        </Text>
        <View style={{ marginTop: 24 }}>
          {DATA_MY_NETWORK.map((item) => (
            <ExpertsItem {...item} key={item.id.toString()} />
          ))}
        </View>
        <Text size={17} lineHeight={20} bold marginTop={24}>
          Maybe You Know
        </Text>
        <View style={{ marginTop: 24 }}>
          {DATA_MAYBE_U_KNOW.map((item) => (
            <ExpertsItem {...item} key={item.id.toString()} />
          ))}
        </View>
      </ScrollView>
      <ButtonIcon
        icon={SOURCE_ICON.filter}
        style={{
          position: "absolute",
          ...Theme.shadow,
          bottom: getBottomSpace() + 16,
          alignSelf: "center",
        }}
        color={Colors.PinkOrange}
        size={56}
        borderRadius={16}
        tintColor={Colors.White}
      />
    </Container>
  );
});

export default SearchSpecialDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...Theme.flexRow,
    paddingHorizontal: 24,
  },
  contentContainerStyle: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
  },
});

const DATA_MY_NETWORK = [
  {
    id: 0,
    name: "Jordan Singleton",
    faculty: "Physical Medicine & Rehabilitat...",
    rate: 4.6,
    numberOfReviews: 141,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    inNetwork: true,
    address: "Sun City, AZ 85351",
  },
  {
    id: 1,
    name: "Lucy Mann",
    faculty: "Anesthesiology",
    rate: 4.8,
    numberOfReviews: 753,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    inNetwork: true,
    address: "Leominster, MA 01453",
  },
  {
    id: 2,
    name: "Janie Phillips",
    faculty: "Pediatrics",
    rate: 4.8,
    numberOfReviews: 234,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    inNetwork: true,
    address: "Temple Hills, MD 20748",
  },
];
const DATA_MAYBE_U_KNOW = [
  {
    id: 3,
    name: "Donald Gregory",
    faculty: "Emergency Medicine",
    rate: 4.8,
    numberOfReviews: 141,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    address: "Temple Hills, MD 20748",
  },
  {
    id: 2,
    name: "Janie Phillips",
    faculty: "Pediatrics",
    rate: 4.8,
    numberOfReviews: 234,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    address: "Temple Hills, MD 20748",
  },
];
