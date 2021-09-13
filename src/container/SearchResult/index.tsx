import React, { memo, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "components/Text";
import { useNavigation, useRoute } from "@react-navigation/native";
import Theme from "style/Theme";
import { Colors } from "configs";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import SearchBox from "components/Home/SearchBox";
import ButtonText from "components/Buttons/ButtonText";
import ScrollableTab from "components/ScrollableTab";
import AllSearchResults from "./components/All/All";
import AnswerSearchResults from "./components/Answer/Answer";
import TopicSearchResults from "./components/TopicSearchResults/TopicSearchResults";
import Experts from "./components/Experts";
import TipsSearchResults from "./components/Tips";

interface SearchResultProps {}

const SearchResult = memo(({}: SearchResultProps) => {
  const { setOptions, navigate, goBack } = useNavigation();
  const route: any = useRoute();
  const [keySearch, setKeySearch] = useState(route.params?.keySearch || "");

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <View style={styles.header}>
          <SearchBox
            placeholder={"Search patient, health issue, ..."}
            value={keySearch}
            onChangeText={setKeySearch}
            borderColor={Colors.Isabelline}
            shadow={false}
            style={styles.searchBox}
            autoFocus
          />
          <ButtonText
            title={"Cancel"}
            style={styles.cancelButton}
            onPress={goBack}
            titleColor={Colors.DodgerBlue}
            bold
          />
        </View>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollableTab
        tabStyle={{ backgroundColor: Colors.White }}
        labelStyle={{ lineHeight: 18 }}
        titleSize={15}
        titles={["All", "Answers", "Topics", "Experts", "Tips"]}
      >
        <AllSearchResults />
        <AnswerSearchResults />
        <TopicSearchResults />
        <Experts />
        <TipsSearchResults />
      </ScrollableTab>
    </View>
  );
});

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...Theme.flexRowSpace,
    backgroundColor: Colors.White,
    paddingRight: 24,
  },
  cancelButton: {
    height: 48,
    marginTop: getStatusBarHeight(),
  },
  searchBox: {
    backgroundColor: Colors.Isabelline,
    marginHorizontal: 24,
    marginBottom: 12,
    flex: 1,
  },
});
