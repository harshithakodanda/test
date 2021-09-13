import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";
import ScrollableTab from "components/ScrollableTab";
import { SOURCE_IMAGE } from "images/MyWorkTopic";
import Photos from "components/MyWorkLibrary/Photos";
import Documents from "components/MyWorkLibrary/Documents";
import Videos from "components/MyWorkLibrary/Videos";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ModalSelect from "components/ModalSelect";
import useModalWithKeyboard from "hooks/useModalWithKeyboard";
import ModalAddNote from "components/ModalAddNote";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

const PHOTOS_EXAMPLE_DATA = [
  {
    id: 0,
    image: SOURCE_IMAGE.chickenpox,
    name: "Photo_1234.JPG",
    date: "Uploaded : Feb 09,2021",
    size: "35 KB",
  },
  {
    id: 1,
    image: SOURCE_IMAGE.cardiology,
    name: "Photo_1234.JPG",
    date: "Uploaded : Feb 09,2021",
    size: "35 KB",
  },
  {
    id: 2,
    image: SOURCE_IMAGE.chickenpox,
    name: "Photo_1234.JPG",
    date: "Uploaded : Feb 09,2021",
    size: "35 KB",
  },
  {
    id: 3,
    image: SOURCE_IMAGE.cardiology,
    name: "Photo_1234.JPG",
    date: "Uploaded : Feb 09,2021",
    size: "35 KB",
  },
  {
    id: 4,
    image: SOURCE_IMAGE.chickenpox,
    name: "Photo_1234.JPG",
    date: "Uploaded : Feb 09,2021",
    size: "35 KB",
  },
];

const menuOptions = [
  {
    id: 0,
    name: "Take a Photo",
  },
  {
    id: 1,
    name: "Take a Video",
  },
  {
    id: 2,
    name: "From Photos",
  },
  {
    id: 3,
    name: "Others",
  },
];

export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [photosItem, setPhotosItem] = useState<any>([]);
  const { theme } = useTheme();

  const {
    visible: visibleMenuOption,
    open: openMenuOption,
    close: closeMenuOption,
    translateY: translateYMenuOption,
  } = useModalWithKeyboard(false);

  const {
    visible: visibleAddNote,
    open: openAddNote,
    close: closeAddNote,
    translateY: translateYAddNote,
  } = useModalWithKeyboard(false);

  useFocusEffect(
    useCallback(() => {
      setPhotosItem(PHOTOS_EXAMPLE_DATA);
    }, [])
  );

  const handleSearch = () => {
    navigate(Routes.Search);
  };
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
        elevation: 0,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerRight: () => (
        <View style={Theme.flexRow}>
          <ButtonIconHeader
            icon={SOURCE_ICON.search}
            tintColor={Colors.DodgerBlue}
            borderColor={Colors.DodgerBlue}
            marginRight={24}
            onPress={handleSearch}
          />
          <ButtonIconHeader
            icon={SOURCE_ICON.plus}
            tintColor={Colors.DodgerBlue}
            marginRight={24}
            onPress={openMenuOption}
          />
        </View>
      ),
    });
  }, [setOptions]);

  const handleSelectMenuOption = React.useCallback(() => {
    closeMenuOption();
    openAddNote();
  }, [closeMenuOption, openAddNote]);

  const renderHeader = React.useCallback(() => {
    return (
      <Text marginTop={24} marginLeft={24} bold size={24} lineHeight={28}>
        Library
      </Text>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollableTab
        titles={[`Photos [${35}]`, `Documents [${34}]`, `Videos [${8}]`]}
        labelStyle={styles.labelStyle}
        renderHeader={renderHeader}
      >
        <Photos data={photosItem} />
        <Documents />
        <Videos />
      </ScrollableTab>
      <Modal
        visible={visibleMenuOption}
        onRequestClose={closeMenuOption}
        transparent
        animationType={"fade"}
      >
        <ModalSelect
          onPressItem={handleSelectMenuOption}
          choices={menuOptions}
          close={closeMenuOption}
        />
      </Modal>
      <Modal
        visible={visibleAddNote}
        onRequestClose={closeAddNote}
        transparent
        animationType={"fade"}
      >
        <ModalAddNote close={closeAddNote} translateY={translateYAddNote} />
      </Modal>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: Colors.DarkJungleGreenOpacity,
    justifyContent: "flex-end",
  },

  topBorder: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomBorder: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  buttonSlider: {
    width: 48,
    height: 6,
    backgroundColor: Colors.Platinum,
    marginTop: 12,
    borderRadius: 3,
    alignSelf: "center",
  },
  addView: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace() + 24,
  },
  image: {
    alignSelf: "center",
    borderRadius: 0,
  },
  cancelButton: {
    marginTop: 0,
    width: 155,
    color: Colors.GrayBlue,
  },
  addButton: {
    marginTop: 0,
    width: 155,
  },
  textInput: {
    minHeight: 96,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.WhiteSmoke,
    shadowColor: Colors.boxShadow,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
