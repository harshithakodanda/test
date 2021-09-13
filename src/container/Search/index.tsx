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
import TopPatient from "./components/TopPatient";
import TrendingTopics from "./components/TrendingTopics";
import { SOURCE_ICON } from "images";
import LinearColors from "components/LinearColors";
import Theme from "style/Theme";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Container from "components/Layout/Container";
import Content from "components/Layout/Content";
import Layout from "components/Layout/Layout";
import scale from "utils/scale";
import { useTheme } from "configs/Theme";
import Line from "components/Layout/Line";

interface SearchProps {}

const Search = memo(({}: SearchProps) => {
  const { setOptions, navigate } = useNavigation();
  const { theme } = useTheme();
  const [keySearch, setKeySearch] = useState("");
  const onFocus = useCallback(() => {
    navigate(Routes.RecentSearch);
  }, [navigate]);
  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <Container style={styles.header}>
          <SearchBox
            placeholder={"Search patient, health issue, ..."}
            value={keySearch}
            onChangeText={setKeySearch}
            shadow={false}
            style={{
              marginLeft: 24,
              marginBottom: 12,
              flex: 1,
              backgroundColor: theme.placeholder,
            }}
            onFocus={onFocus}
          />
        </Container>
      ),
    });
  }, []);
  return (
    <Content
      style={styles.container}
      contentContainerStyle={styles.scrollStyle}
      showsVerticalScrollIndicator={false}
    >
      <TopPatient />
      <TrendingTopics />
      <View style={styles.searchSpecial}>
        <Text size={17} lineHeight={20} bold>
          Search Special
        </Text>
        <Layout style={styles.content}>
          {searchControl.map((item, index) => (
            <View>
              <TouchableOpacity
                key={item.id.toString()}
                style={[
                  { backgroundColor: theme.backgroundItem },
                  styles.controlItem,
                  index !== searchControl.length - 1 && styles.border,
                ]}
                onPress={() => {
                  item.route && navigate(item.route);
                }}
              >
                <View style={Theme.flexRow}>
                  <LinearColors
                    colors={[Colors.TealBlue, Colors.TurquoiseBlue]}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      ...Theme.center,
                      marginRight: 16,
                    }}
                  >
                    <Image
                      source={item.icon}
                      style={{ tintColor: Colors.White }}
                    />
                  </LinearColors>
                  <Text size={15} lineHeight={18}>
                    {item.name}
                  </Text>
                </View>
                <Image source={SOURCE_ICON.arrowRight} />
              </TouchableOpacity>
              <Line />
            </View>
          ))}
        </Layout>
      </View>
    </Content>
  );
});

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingBottom: getBottomSpace() + 40,
  },
  searchSpecial: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  content: {
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 12,
    ...Theme.shadow,
  },
  controlItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    ...Theme.flexRowSpace,
  },
  border: {},
  scrollStyle: {
    paddingBottom: getBottomSpace() + 12,
  },
  header: {
    ...Theme.flexRowSpace,
    paddingRight: 24,
  },
});

const searchControl = [
  {
    id: 0,
    name: "Expert",
    icon: SOURCE_ICON.doctor,
    route: Routes.SearchSpecialDoctor,
  },
  {
    id: 1,
    name: "Conditions & Symptoms",
    icon: SOURCE_ICON.condition,
    route: Routes.ConditionsAndSymptoms,
  },
  {
    id: 2,
    name: "Medications",
    icon: SOURCE_ICON.medication,
    route: Routes.Medications,
  },
  { id: 3, name: "Procedures", icon: SOURCE_ICON.procedure },
  { id: 4, name: "Hospitals", icon: SOURCE_ICON.hospital },
];
