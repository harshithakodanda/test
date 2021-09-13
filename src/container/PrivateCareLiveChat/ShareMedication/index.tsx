import React, { memo, useLayoutEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Colors } from "configs";
import ButtonIconHeader from "@components/ButtonIconHeader";
import { SOURCE_ICON } from "images";
import Theme from "style/Theme";
import ButtonText from "components/Buttons/ButtonText";
import SearchBox from "components/Home/SearchBox";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import ButtonIcon from "components/Buttons/ButtonIcon";
import { useTheme } from "configs/Theme";
import Content from "components/Layout/Content";
import Layout from "components/Layout/Layout";
import Line from "components/Layout/Line";

const MEDICATIONS = [
  {
    id: 1,
    title: "Abilify",
  },
  {
    id: 2,
    title: "Acetaminophen",
  },
  {
    id: 3,
    title: "Acyclovir",
  },
  {
    id: 4,
    title: "Adderall",
  },
  {
    id: 5,
    title: "Advair",
  },
  {
    id: 6,
    title: "Advair Diskus",
  },
  {
    id: 7,
    title: "Advil",
  },
  {
    id: 8,
    title: "Albuterol",
  },
];

const ShareMedication = memo(() => {
  const { setOptions } = useNavigation();

  const [search, setSearch] = React.useState<string>("");
  const [medications, setMedications] = React.useState<any>([]);
  const [selectedMedication, setSelectMedication] = useState<any>({});

  useFocusEffect(
    React.useCallback(() => {
      setMedications(MEDICATIONS);
    }, [])
  );
  const { theme } = useTheme();

  useLayoutEffect(() => {
    setOptions({
      title: "Share Medication",
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.backgroundHeader,
        height: 108 - getStatusBarHeight(),
      },
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} icon={SOURCE_ICON.back} />
      ),
      headerRight: () => (
        <ButtonText
          bold
          style={{ marginHorizontal: 24 }}
          title={"Share"}
          blueLight
          borderColor={theme.backgroundItem}
        />
      ),
    });
  }, [setOptions]);

  const onHandleSearch = useCallback(() => {}, []);

  const renderMedicationItem = useCallback(
    (data) => {
      return data.map((item: any, index: number) => {
        const { title } = item;

        return (
          <View>
            <TouchableOpacity
              onPress={() => setSelectMedication(item)}
              activeOpacity={0.54}
              style={[Theme.flexRowSpace, styles.medicationItem]}
              key={index}
            >
              <Text semiBold color={Colors.DodgerBlue} size={15}>
                {title}
              </Text>
              <View style={[{ ...Theme.icons, ...Theme.center }]}>
                {item.id === selectedMedication.id ? (
                  <Image source={require("images/ic_checkbox_active.png")} />
                ) : (
                  <View style={styles.checkBox} />
                )}
              </View>
            </TouchableOpacity>
            <Line />
          </View>
        );
      });
    },
    [selectedMedication]
  );

  return (
    <View style={styles.container}>
      <Content
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.searchView}>
          <SearchBox
            style={styles.searchBar}
            placeholder={"Enter name, condition, symptoms..."}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={onHandleSearch}
          />
        </View>
        <Layout style={styles.contentView}>
          <View style={[Theme.flexDirection, styles.topView]}>
            <View style={styles.medicationView}>
              <Image source={SOURCE_ICON.medication} />
            </View>
            <Text marginLeft={15} size={15} bold>
              All Medications
            </Text>
          </View>
          <Line />
          {renderMedicationItem(medications)}
        </Layout>
      </Content>
      <ButtonIcon icon={"atoz"} style={styles.buttonFilter} />
    </View>
  );
});

export default ShareMedication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 24,
    paddingBottom: getBottomSpace() + 24,
  },
  searchView: {
    marginHorizontal: 24,
  },
  searchBar: {
    backgroundColor: Colors.Isabelline,
    borderWidth: 0,
    marginTop: 0,
  },
  contentView: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 24,
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
  },
  medicationItem: {
    paddingLeft: 24,
    paddingRight: 27,
    paddingVertical: 24,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: "#979797",
    borderRadius: 3,
    borderWidth: 1,
  },
  medicationView: {
    backgroundColor: Colors.OysterBay,
    width: 32,
    height: 32,
    borderRadius: 8,
    ...Theme.center,
  },
  topView: {
    alignItems: "center",
    paddingBottom: 8,
    marginLeft: 24,
  },
});
