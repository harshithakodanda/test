import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "components/Text";
import { useNavigation, useRoute } from "@react-navigation/native";
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

interface SearchSpecialResultsProps {}

const SearchSpecialResults = memo(({}: SearchSpecialResultsProps) => {
  const { navigate, setOptions } = useNavigation();
  const route: any = useRoute();
  const [keySearch, setKeySearch] = useState(route.params?.keySearch || "");
  const onSubmitEditing = useCallback(() => {
    navigate(Routes.RecentSearch);
  }, [navigate]);
  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <Layout style={styles.header}>
          <ButtonIconHeader style={{ marginTop: getStatusBarHeight() }} />
          <SearchBox
            placeholder={"Enter name, speciality..."}
            value={keySearch}
            onChangeText={setKeySearch}
            borderColor={Colors.Isabelline}
            shadow={false}
            style={{
              backgroundColor: Colors.Red,
              marginHorizontal: 16,
              marginBottom: 12,
              flex: 1,
            }}
            onSubmitEditing={onSubmitEditing}
          />
        </Layout>
      ),
    });
  }, [keySearch]);
  return (
    <Container style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text size={15} lineHeight={18}>
          We found{" "}
          <Text size={15} lineHeight={18} bold>
            124
          </Text>{" "}
          experts
        </Text>
        <View style={{ marginTop: 24 }}>
          {DATA_RECENT_SEARCH.map((item) => (
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
      />
    </Container>
  );
});

export default SearchSpecialResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...Theme.flexRow,
    paddingLeft: 24,
  },
  contentContainerStyle: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
  },
});

const DATA_RECENT_SEARCH = [
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
  {
    id: 1,
    name: "Lucy Mann",
    faculty: "Anesthesiology",
    rate: 4.8,
    numberOfReviews: 753,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    address: "Leominster, MA 01453",
  },

  {
    id: 0,
    name: "Jordan Singleton",
    faculty: "Physical Medicine & Rehabilitat...",
    rate: 4.6,
    numberOfReviews: 141,
    avatar: require("images/avatar/sarah.png"),
    online: true,
    address: "Sun City, AZ 85351",
  },
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
];
