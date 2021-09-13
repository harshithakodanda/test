import React from "react";
import { memo, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "configs";
import ButtonIconHeader from "components/ButtonIconHeader";
import { SOURCE_ICON } from "images";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { categoryList } from "type/category";
import useModalAnimation from "hooks/useModalAnimation";
import ButtonChangeCategory from "components/ButtonChangeCategory";
import ModalSlideBottom from "components/ModalSlideBottom";
import ModalChangeCategory from "components/ModalChangeCategory";
import { FREQUENCY_LIST_EXAMPLE, CATEGORY_LIST_EXAMPLE } from "configs/Data";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Text from "components/Text";
import Theme from "style/Theme";
import ButtonText from "components/Buttons/ButtonText";
import ButtonIcon from "components/Buttons/ButtonIcon";
import TabBar from "components/TabBar";
import GenderFilter from "components/GenderFilter";
import ButtonLinear from "components/Buttons/ButtonLinear";
import UserInfo from "components/ConsultDetail/UserInfo";
import ButtonChangeFrequency from "components/ButtonChangeFrequency";
import ModalChangeFrequency from "components/ModalChangeFrequency";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

const PATIENTS_LIST = [
  {
    name: "Ethel Howard",
    gender: "Female",
    age: 28,
    phone: "542-430-3067",
    img: require("images/avatar/sarah.png"),
  },
];

export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const { theme } = useTheme();

  const {
    open: openCategory,
    close: closeCategory,
    visible: visibleCategory,
    transY: transYCategory,
  } = useModalAnimation();
  const {
    open: openFrequency,
    close: closeFrequency,
    visible: visibleFrequency,
    transY: transYFrequency,
  } = useModalAnimation();
  const [category, setCategory] = React.useState(CATEGORY_LIST_EXAMPLE[0]);
  const [frequency, setFrequency] = useState<any>(FREQUENCY_LIST_EXAMPLE[0]);
  const [genderFilter, setGenderFilter] = React.useState([1, 2]);
  const [patients, setListPatients] = React.useState<any>(PATIENTS_LIST);
  const [tabActive, setTabActive] = React.useState<number>(0);

  const onChangeCategory = useCallback((item: categoryList) => {
    setCategory(item);
    closeCategory();
  }, []);

  const onChangeFrequency = useCallback((item: categoryList) => {
    setFrequency(item);
    closeFrequency();
  }, []);
  React.useLayoutEffect(() => {
    const onPublic = () => {};
    setOptions({
      headerStyle: {
        ...styles.headerStyle,
        backgroundColor: theme.background,
      },
      headerTitle: "Add New Guide",
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} icon={SOURCE_ICON.close} />
      ),
      headerRight: () => (
        <ButtonText
          onPress={onPublic}
          title={"Public"}
          bold
          marginRight={24}
          titleColor={Colors.DodgerBlue}
        />
      ),
    });
  }, [setOptions]);

  const setAddImage = React.useCallback(() => {}, []);

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

  const onHandleAddTask = React.useCallback(() => {}, []);

  const onHandleAddPatients = React.useCallback(() => {
    const patient = [...patients, {}]; // new array need to update
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView
        style={{ backgroundColor: Colors.Snow }}
        contentContainerStyle={{ paddingBottom: getBottomSpace() + 24 }}
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.addView}>
          <ButtonIcon onPress={setAddImage} icon={"whitePlus"} />
          <Text size={13} lineHeight={16} marginTop={16}>
            Add Guide Image
          </Text>
        </View>
        <KeyboardAvoidingView
          style={{ paddingHorizontal: 24 }}
          behavior="padding"
        >
          <TextInput
            placeholderTextColor={Colors.Platinum}
            placeholder="Enter guide name"
            multiline={true}
            style={styles.input}
          />
          <Text bold size={17} lineHeight={20} marginTop={64}>
            For Patient who
          </Text>
          <GenderFilter
            genderFilter={genderFilter}
            onPressFilter={onPressFilter}
            onPressAll={onPressAllGender}
          />
          <Text size={13} lineHeight={16} marginBottom={4}>
            Age
          </Text>
          <View style={Theme.flexRow}>
            <ButtonChangeFrequency
              style={{ width: "40%", marginRight: 16 }}
              frequency={frequency}
              onPress={openFrequency}
            />
            <ButtonChangeFrequency
              style={{ flex: 1 }}
              frequency={frequency}
              onPress={openFrequency}
            />
          </View>
          <Text size={13} lineHeight={16} marginTop={24} marginBottom={4}>
            Category
          </Text>
          <ButtonChangeCategory category={category} onPress={openCategory} />
          <Text size={13} lineHeight={16} marginTop={24} marginBottom={4}>
            Share
          </Text>
          <TabBar
            onChangeTab={(index) => setTabActive(index)}
            
            tabs={["Public", "Private"]}
          />
          {tabActive === 1 &&
            patients.map((item: any, index: number) => {
              return (
                <UserInfo key={index} user={item} style={styles.userInfo} />
              );
            })}
          {tabActive === 1 && (
            <TouchableOpacity
              activeOpacity={0.54}
              onPress={onHandleAddPatients}
              style={{ ...Theme.flexDirection, ...Theme.center, marginTop: 24 }}
            >
              <Text
                bold
                color={Colors.DodgerBlue}
                size={13}
                lineHeight={22}
                marginRight={4}
              >
                Add Patients
              </Text>
              <Image source={SOURCE_ICON.add} />
            </TouchableOpacity>
          )}
          <Text bold size={17} lineHeight={20} marginTop={48}>
            What Patient will do
          </Text>
          <View style={styles.inputView}>
            <Text size={13} lineHeight={16}>
              Task Detail
            </Text>
            <TextInput style={styles.textInput} multiline={true} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginTop: 24,
              }}
            >
              <View style={{ ...Theme.flexOne, marginRight: 16 }}>
                <Text marginBottom={4}>Frequency</Text>
                <ButtonChangeFrequency
                  frequency={frequency}
                  onPress={openFrequency}
                />
              </View>
              <ButtonIconHeader
                style={styles.optionButton}
                tintColor={Colors.GrayBlue}
                icon={SOURCE_ICON.option}
              />
            </View>
          </View>
          <ButtonLinear
            white
            onPress={onHandleAddTask}
            leftChildren={
              <Image source={SOURCE_ICON.whitePlus} style={styles.iconButton} />
            }
            title={"Add Task"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <Modal
        visible={visibleCategory}
        onRequestClose={closeCategory}
        transparent
        animationType={"none"}
      >
        <ModalSlideBottom onClose={closeCategory} transY={transYCategory}>
          <ModalChangeCategory onChangeCategory={onChangeCategory} />
        </ModalSlideBottom>
      </Modal>
      <Modal
        visible={visibleFrequency}
        onRequestClose={closeFrequency}
        transparent
        animationType={"none"}
      >
        <ModalSlideBottom onClose={closeFrequency} transY={transYFrequency}>
          <ModalChangeFrequency onChangeCategory={onChangeFrequency} />
        </ModalSlideBottom>
      </Modal>
    </Container>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addView: {
    height: 264,
    backgroundColor: Colors.Isabelline,
    ...Theme.center,
  },
  input: {
    marginTop: 32,
    fontSize: 24,
  },
  tabBar: {
    marginTop: 16,
  },
  inputView: {
    backgroundColor: Colors.White,
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    borderColor: Colors.Isabelline,
    height: 100,
    maxHeight: 200,
  },
  iconButton: {
    marginRight: 12,
  },
  userInfo: {
    marginTop: 24,
    backgroundColor: Colors.WhiteSmoke,
    marginHorizontal: 24,
  },
  optionButton: {
    width: 50,
    height: 50,
  },
  headerStyle: {
    shadowColor: "transparent",
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
});
