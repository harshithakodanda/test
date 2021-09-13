import React, { memo } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import { Colors, Routes } from "configs";
import ButtonIconHeader from "components/ButtonIconHeader";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";
import ButtonText from "components/Buttons/ButtonText";
import ButtonIcon from "components/Buttons/ButtonIcon";
import LinearColors from "components/LinearColors";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useTheme } from "configs/Theme";
import Layout from "components/Layout/Layout";
import Container from "components/Layout/Container";

const FEATURE = [
  {
    icon: SOURCE_ICON.whiteAdditional,
    title: "Overview",
    //route: Routes.
  },
  {
    icon: SOURCE_ICON.whiteCondition,
    title: "Conditions & Symptoms",
    //route: Routes.
  },
  {
    icon: SOURCE_ICON.whiteMedication,
    title: "Medications",
    //route: Routes.
  },
  {
    icon: SOURCE_ICON.procedure,
    title: "Procedures",
    //route: Routes.
  },
  {
    icon: SOURCE_ICON.healthGuide,
    title: "Health Guide",
    //route: Routes.
  },
];

export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [content, setContent] = React.useState<string>("");

  const onChangeContent = React.useCallback((text: string) => {
    if (text.length <= 2000) {
      return setContent(text);
    }
    let _text = text.substring(0, 2000);
    return setContent(_text);
  }, []);
  const { theme } = useTheme();
  React.useLayoutEffect(() => {
    const onPublic = () => {};

    setOptions({
      title: "Add New Topic",
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
      },
      headerLeft: () => (
        <ButtonIconHeader icon={SOURCE_ICON.close} marginLeft={24} />
      ),
      headerRight: () => (
        <ButtonText
          borderWidth={0}
          blueLight
          onPress={onPublic}
          bold
          title={"Public"}
          titleColor={Colors.DodgerBlue}
          marginRight={24}
        />
      ),
    });
  }, [setOptions]);

  return (
    <Container style={styles.container}>
      <ScrollView
        bounces={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Layout style={styles.addView}>
          <ButtonIcon style={styles.buttonAdd} icon={"whitePlus"} />
          <Text size={13} lineHeight={16} marginTop={16}>
            Add Topic Image
          </Text>
        </Layout>
        <Text
          bold
          size={24}
          lineHeight={28}
          marginTop={32}
          marginLeft={24}
          color={Colors.Platinum}
        >
          Enter topic
        </Text>
        <View style={styles.inputView}>
          <TextInput
            placeholderTextColor={Colors.GrayBlue}
            multiline
            placeholder={"Tell people some detail…"}
            style={styles.input}
            value={content}
            onChangeText={onChangeContent}
          />
        </View>
        <Text
          right
          marginRight={24}
          size={11}
          lineHeight={14}
          color={Colors.GrayBlue}
        >
          {content.length}/2000
        </Text>
        <Layout style={styles.box}>
          {FEATURE.map((item: any, index: number) => {
            const { icon, title, route } = item;

            const onPress = () => {
              route && navigate(route);
            };

            return (
              <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.54}
                style={styles.item}
                key={index}
              >
                <View style={Theme.flexRow}>
                  <LinearColors
                    vertical
                    colors={[Colors.TurquoiseBlue, Colors.TealBlue]}
                    style={styles.icon}
                  >
                    <Image source={icon} />
                  </LinearColors>
                  <Text>{title}</Text>
                </View>
                <Image source={SOURCE_ICON.arrowRight} />
              </TouchableOpacity>
            );
          })}
        </Layout>
      </ScrollView>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 12,
  },
  addView: {
    width: "100%",
    height: 256,
    ...Theme.center,
  },
  buttonAdd: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  inputView: {
    marginHorizontal: 24,
    marginTop: 16,
    height: 104,
    padding: 12,
  },
  input: {
    flex: 1,
    lineHeight: 18,
    fontSize: 15,
  },
  box: {
    borderRadius: 16,
    marginTop: 32,
    marginHorizontal: 24,
    paddingVertical: 8,
  },
  item: {
    ...Theme.flexRowSpace,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.TealBlue,
    ...Theme.center,
    borderRadius: 16,
    marginRight: 16,
  },
});
