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
import ButtonText from "components/Buttons/ButtonText";
import Theme from "style/Theme";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { SOURCE_ICON } from "images";
import Content from "components/Layout/Content";
import Layout from "components/Layout/Layout";

interface RecentSearchProps {}

const RecentSearch = memo(({}: RecentSearchProps) => {
  const { setOptions, navigate, goBack } = useNavigation();
  const [keySearch, setKeySearch] = useState("");
  const onSubmitEditing = useCallback(() => {
    navigate(Routes.SearchResult, { keySearch: keySearch });
  }, [navigate, keySearch]);
  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <Layout style={styles.header}>
          <SearchBox
            placeholder={"Search patient, health issue, ..."}
            value={keySearch}
            onChangeText={setKeySearch}
            borderColor={Colors.TealBlue}
            shadow={false}
            style={styles.searchBox}
            autoFocus
            onSubmitEditing={onSubmitEditing}
          />
          <ButtonText
            blueLight
            title={"Cancel"}
            style={styles.cancelButton}
            onPress={goBack}
            titleColor={Colors.DodgerBlue}
            bold
          />
        </Layout>
      ),
    });
  }, [keySearch, setKeySearch]);
  return (
    <Content
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      <View style={{ ...Theme.flexRowSpace, marginBottom: 20 }}>
        <Text size={13} lineHeight={16} bold>
          Recent Searches
        </Text>
        <TouchableOpacity>
          <Text blueLight size={13} lineHeight={16} color={Colors.DodgerBlue}>
            Clear search history
          </Text>
        </TouchableOpacity>
      </View>
      {dataRecentSearches.map((item) => (
        <TouchableOpacity
          {...item}
          key={item.id.toString()}
          style={{ paddingVertical: 12, ...Theme.flexRow }}
        >
          <View style={styles.icon}>
            <Image source={SOURCE_ICON.history} />
          </View>
          <Text size={15} lineHeight={18}>
            {item.keySearch}
          </Text>
        </TouchableOpacity>
      ))}
    </Content>
  );
});

export default RecentSearch;

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace() + 12,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    ...Theme.flexRowSpace,
    paddingRight: 24,
  },
  cancelButton: {
    height: 48,
    marginTop: getStatusBarHeight(),
  },
  searchBox: {
    marginHorizontal: 24,
    marginBottom: 12,
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    ...Theme.center,
    backgroundColor: Colors.DodgerBlue,
    marginRight: 16,
  },
});

const dataRecentSearches = [
  {
    id: 0,
    keySearch: "Flu",
  },
  {
    id: 1,
    keySearch: "Air pollution",
  },
  {
    id: 2,
    keySearch: "Chickenpox",
  },
];
