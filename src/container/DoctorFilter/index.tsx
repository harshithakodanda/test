import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors } from "configs";
import Theme from "style/Theme";
import InputApp from "components/InputApp";
import scale from "utils/scale";
import TagItem from "components/WorkProfile/TagItem";
import FilterProps from "./components/FilterProps";
import CheckBox from "components/CheckBox";
import GenderFilter from "components/GenderFilter";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

interface DoctorFilterProps {}

const DoctorFilter = memo(({}: DoctorFilterProps) => {
  const { setOptions, navigate } = useNavigation();
  const { theme } = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: "Filter",
      headerStyle: {
        shadowColor: "transparent",
        height: scale(108),
        backgroundColor: theme.backgroundItem,
      },
      headerLeft: () => (
        <ButtonIconHeader
          marginLeft={24}
          icon={require("images/ic_close.png")}
        />
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 16, padding: 8 }}>
          <Text color={Colors.DodgerBlue} size={15} bold>
            Reset All
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [setOptions]);

  const [nearbyMe, setNearbyMe] = useState(false);
  const [onMyNetwork, setOnMyNetwork] = useState(false);
  const [genderFilter, setGenderFilter] = useState([1, 2]);
  const [filterData, setFilterData] = useState({
    speciality: "",
    nearBy: "",
    language: "",
  });
  const onPressFilter = useCallback((gender: number) => {
    setGenderFilter((prev) => {
      const findGender = prev.findIndex((i) => i === gender);
      if (findGender >= 0) {
        return prev.filter((o) => o !== gender);
      } else {
        return [...prev, gender];
      }
    });
  }, []);
  const onPressAllGender = useCallback(() => {
    setGenderFilter((prev) => {
      return [1, 2];
    });
  }, []);
  const onShowExperts = useCallback(() => {}, []);
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <FilterProps
          style={{ marginTop: 32 }}
          title={"Speciality"}
          placeholder={"Search speciality..."}
          value={filterData.speciality}
          onChangeText={(text) => {
            setFilterData((prev: any) => {
              return { ...prev, nearBy: text };
            });
          }}
        />
        <View style={styles.spec}>
          {specialities.map((i, index) => (
            <TagItem title={i} key={index.toString()} />
          ))}
        </View>
        <FilterProps
          style={{ marginTop: 40 }}
          title={"Nearby"}
          placeholder={"Enter address..."}
          value={filterData.nearBy}
          onChangeText={(text) => {
            setFilterData((prev: any) => {
              return { ...prev, nearBy: text };
            });
          }}
          icon={"pin-map"}
        />
        <TouchableOpacity
          style={{ marginTop: 16, ...Theme.flexRow }}
          onPress={() => {
            setNearbyMe(!nearbyMe);
          }}
          activeOpacity={0.54}
        >
          <CheckBox
            isCheck={nearbyMe}
            onPress={() => {
              setNearbyMe(!nearbyMe);
            }}
          />
          <Text size={15} lineHeight={24} marginLeft={10} medium>
            Nearby me
          </Text>
        </TouchableOpacity>
        <FilterProps
          style={{ marginTop: 40 }}
          title={"Language"}
          placeholder={"Search language..."}
          value={filterData.language}
          onChangeText={(text) => {
            setFilterData((prev: any) => {
              return { ...prev, language: text };
            });
          }}
        />
        <View style={styles.spec}>
          {languages.map((i, index) => (
            <TagItem title={i} key={index.toString()} />
          ))}
        </View>
        <GenderFilter
          genderFilter={genderFilter}
          onPressFilter={onPressFilter}
          onPressAll={onPressAllGender}
        />
        <TouchableOpacity
          style={{ marginTop: 16, ...Theme.flexRow }}
          onPress={() => {
            setOnMyNetwork(!onMyNetwork);
          }}
          activeOpacity={0.54}
        >
          <CheckBox
            isCheck={onMyNetwork}
            onPress={() => {
              setOnMyNetwork(!onMyNetwork);
            }}
          />
          <Text size={15} lineHeight={24} marginLeft={10} medium>
            On My Network
          </Text>
        </TouchableOpacity>
        <ButtonLinear
          title={"Show 45+ consults"}
          onPress={onShowExperts}
          white
        />
      </ScrollView>
    </Container>
  );
});

export default DoctorFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace() + 16,
  },
  iconSearch: {
    ...Theme.icons,
    tintColor: Colors.DodgerBlue,
  },
  spec: {
    marginTop: 16,
    ...Theme.flexRow,
    flexWrap: "wrap",
  },
});
const specialities = ["Radiation Oncology", "Urology"];
const languages = ["English", "Spain"];
