import React, { memo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { SOURCE_ICON } from "images";
import ButtonText from "components/Buttons/ButtonText";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import Theme from "style/Theme";
import SearchBox from "components/Home/SearchBox";
import ButtonIcon from "components/Buttons/ButtonIcon";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import { useTheme } from "configs/Theme";
import Line from "components/Layout/Line";

const CONDITIONS = [
  {
    id: 1,
    title: "Abdominal aortic aneurysm",
  },
  {
    id: 2,
    title: "Acne",
  },
  {
    id: 3,
    title: "Acute cholecystitis ",
  },
  {
    id: 4,
    title: "Acute lymphoblastic leukaemia ",
  },
  {
    id: 5,
    title: "Acute lymphoblastic leukaemia: Children",
  },
  {
    id: 6,
    title: "Allergic rhinitis",
  },
  {
    id: 7,
    title: "Allergies",
  },
  {
    id: 8,
    title: "Alzheimer's disease",
  },
];

export default memo(() => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const [search, setSearch] = React.useState<string>("");
  const [conditions, setConditions] = React.useState<any>([]);
  const [listMedication, setListMedication] = React.useState<any>([]);
  useFocusEffect(
    React.useCallback(() => {
      setConditions(CONDITIONS);
    }, [])
  );

  const onHandleRemove = (item: any) => {
    const filteredItems = listMedication.filter((e: any) => e.id !== item.id);
    setListMedication((prevState) => filteredItems);
  };

  const onChooseMedication = React.useCallback(
    (item, index) => {
      if (listMedication.includes(item)) {
        onHandleRemove(item);
      } else {
        setListMedication((prevState) => [...prevState, item]);
      }
    },
    [listMedication, onHandleRemove]
  );

  const renderMedicationItem = React.useCallback(
    (data) => {
      return data.map((item: any, index: number) => {
        const { title, id } = item;

        const checkId =
          listMedication.findIndex((i: number) => i.id === id) >= 0;

        return (
          <View>
            <TouchableOpacity
              onPress={() => onChooseMedication(item, index)}
              activeOpacity={0.54}
              style={[Theme.flexRowSpace, styles.medicationItem]}
              key={index}
            >
              <Text
                style={{ maxWidth: 239 }}
                semiBold
                lineHeight={24}
                color={Colors.DodgerBlue}
                size={15}
              >
                {title}
              </Text>
              <View style={[{ ...Theme.icons, ...Theme.center }]}>
                {checkId ? (
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
    [listMedication]
  );

  return (
    <Container style={styles.container}>
      <Layout style={styles.header}>
        <ButtonIconHeader />
        <SearchBox
          placeholder={"Search..."}
          value={search}
          onChangeText={setSearch}
          style={styles.searchBox}
        />
        <ButtonText
          borderColor={theme.backgroundItem}
          blueLight
          bold
          title={"Add"}
          titleColor={Colors.DodgerBlue}
        />
      </Layout>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View
          style={{ marginHorizontal: 24, flexWrap: "wrap", ...Theme.flexRow }}
        >
          {listMedication.map((item: any, index: number) => {
            const { title } = item;
            return (
              <View style={styles.item} key={index}>
                <Text white size={12} color={Colors.White}>
                  {title}
                </Text>
                <TouchableOpacity
                  onPress={() => onHandleRemove(item)}
                  activeOpacity={0.54}
                >
                  <Image source={SOURCE_ICON.whiteClose} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <Layout style={styles.contentView}>
          <View style={[Theme.flexDirection, styles.topView]}>
            <View style={styles.medicationView}>
              <Image source={SOURCE_ICON.condition} />
            </View>
            <Text marginLeft={15} size={15} bold>
              All Conditions & Symptoms
            </Text>
          </View>
          <Line />
          {renderMedicationItem(conditions)}
        </Layout>
      </ScrollView>
      <ButtonIcon icon={"atoz"} style={styles.buttonFilter} />
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 12,
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight() + 16,
    ...Theme.flexRow,
  },
  searchBox: {
    marginTop: 0,
    marginHorizontal: 16,
    borderWidth: 1,
    ...Theme.flexOne,
  },
  contentContainerStyle: {
    paddingTop: 12,
    paddingBottom: getBottomSpace() + 24,
  },
  contentView: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 16,
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
  topView: {
    alignItems: "center",
    paddingBottom: 8,
    marginLeft: 24,
  },
  medicationView: {
    backgroundColor: Colors.OysterBay,
    width: 32,
    height: 32,
    borderRadius: 8,
    ...Theme.center,
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
  item: {
    backgroundColor: Colors.DodgerBlue,
    paddingVertical: 8,
    paddingRight: 6,
    paddingLeft: 12,
    marginRight: 12,
    borderRadius: 4,
    marginTop: 12,
    ...Theme.center,
    ...Theme.flexRow,
  },
});
