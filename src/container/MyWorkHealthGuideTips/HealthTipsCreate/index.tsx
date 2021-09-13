import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { memo, useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Colors } from "configs";
import ButtonIconHeader from "components/ButtonIconHeader";
import { SOURCE_ICON } from "images";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { width } from "configs/Const";
import { categoryList } from "type/category";
import useModalAnimation from "hooks/useModalAnimation";
import ButtonChangeCategory from "components/ButtonChangeCategory";
import ModalSlideBottom from "components/ModalSlideBottom";
import ModalChangeCategory from "components/ModalChangeCategory";
import { CATEGORY_LIST_EXAMPLE } from "configs/Data";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Text from "components/Text";
import Theme from "style/Theme";
import ButtonText from "components/Buttons/ButtonText";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

export default memo(() => {
  const { theme } = useTheme();

  const { setOptions, navigate } = useNavigation();
  const { open, close, visible, transY } = useModalAnimation();
  const [name, setName] = useState(CATEGORY_LIST_EXAMPLE[0]);

  const onPublicButton = () => {};
  const onChangeCategory = useCallback((item: categoryList) => {
    setName(item);
    close();
  }, []);

  React.useLayoutEffect(() => {
    const onPublic = () => {};
    setOptions({
      headerStyle: {
        shadowColor: "transparent",
        shadowRadius: 0,
        shadowOffset: { height: 0 },
        elevation: 0,
        backgroundColor: theme.background,
      },
      headerTitle: () => <Text style={styles.headerTitle}>Add New Tip</Text>,
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} icon={SOURCE_ICON.close} />
      ),
      headerRight: () => (
        <ButtonText
          onPress={onPublic}
          style={styles.headerRight}
          title={"Public"}
          titleColor={Colors.DodgerBlue}
        />
      ),
    });
  }, [setOptions]);

  return (
    <Container style={styles.container}>
      <ScrollView
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.WhiteSmoke }}
      >
        <TouchableOpacity style={styles.imagePlaceHolder} activeOpacity={0.54}>
          <View style={styles.iconPlaceHolder}>
            <Image source={SOURCE_ICON.whitePlus} />
          </View>
          <Text center marginTop={16}>
            Add Tip Image
          </Text>
        </TouchableOpacity>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.content}>
            <TextInput
              placeholderTextColor={Colors.Platinum}
              placeholder="Enter tip name"
              style={styles.tipName}
              multiline={true}
            />
            <Text style={styles.labelText}>Share tip on</Text>
            <ButtonChangeCategory category={name} onPress={open} />
            <Text style={styles.labelText}>Tips detail</Text>
            <TextInput style={styles.tipDetailField} multiline={true} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={"none"}
      >
        <ModalSlideBottom onClose={close} transY={transY}>
          <ModalChangeCategory onChangeCategory={onChangeCategory} />
        </ModalSlideBottom>
      </Modal>
    </Container>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    color: Colors.DodgerBlue,
    paddingRight: 24,
    borderWidth: 0,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  imagePlaceHolder: {
    height: 264,
    backgroundColor: Colors.Isabelline,
    ...Theme.center,
  },
  iconPlaceHolder: {
    borderRadius: 8,
    width: 40,
    height: 40,
    backgroundColor: Colors.DodgerBlue,
    ...Theme.center,
  },
  content: {
    paddingHorizontal: 24,
  },
  textPlaceHolder: {
    textAlignVertical: "center",
    textAlign: "center",
  },
  tipName: {
    width: width,
    marginTop: 32,
    marginBottom: 80,
    fontSize: 24,
    fontWeight: "bold",
  },
  select: {
    height: 48,
  },
  labelText: {
    marginTop: 24,
    marginBottom: 4,
  },
  tipDetailField: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.Isabelline,
    height: 48,
    padding: 4,
    backgroundColor: Colors.White,
    marginBottom: 80,
  },
});
