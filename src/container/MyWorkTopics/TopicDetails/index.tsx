import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import { width } from "configs/Const";
import Theme from "style/Theme";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import ButtonIconHeader from "components/ButtonIconHeader";
import { SOURCE_ICON } from "images";
import LinearColors from "components/LinearColors";
import { useNavigation } from "@react-navigation/native";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import Line from "components/Layout/Line";

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

export default memo(({ route }: any) => {
  const [topicDetails, setTopicDetails] = React.useState<any>({});
  const { navigate } = useNavigation();

  const { image, title, avatar, name, faculty, description } = topicDetails;

  React.useEffect(() => {
    if (route.params) {
      setTopicDetails(route.params);
    }
  }, [route.params]);

  const onEdit = React.useCallback(() => {}, []);

  const onShare = React.useCallback(() => {}, []);

  return (
    <Container style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEventThrottle={16}
      >
        <Image style={styles.image} source={image} />
        <Text
          bold
          size={24}
          lineHeight={28}
          marginTop={32}
          marginHorizontal={24}
        >
          {title}
        </Text>
        <Text marginTop={16} marginHorizontal={24} size={15} lineHeight={24}>
          {description}
        </Text>
        <Text size={13} lineHeight={16} marginTop={32} marginLeft={24}>
          Created by
        </Text>
        <View style={styles.setRow}>
          <Image style={styles.avatar} source={avatar} />
          <View>
            <Text bold size={15} lineHeight={18} color={Colors.DodgerBlue}>
              {name}
            </Text>
            <Text size={13} lineHeight={16}>
              {faculty}
            </Text>
          </View>
        </View>
        <Layout style={styles.box}>
          {FEATURE.map((item: any, index: number) => {
            const { icon, title, route } = item;

            const onPress = () => {
              route && navigate(route);
            };

            return (
              <View>
                <TouchableOpacity
                  onPress={onPress}
                  activeOpacity={0.54}
                  style={styles.item}
                  key={index}
                >
                  <Layout style={Theme.flexRow}>
                    <LinearColors
                      vertical
                      colors={[Colors.TurquoiseBlue, Colors.TealBlue]}
                      style={styles.icon}
                    >
                      <Image source={icon} />
                    </LinearColors>
                    <Text>{title}</Text>
                  </Layout>
                  <Image source={SOURCE_ICON.arrowRight} />
                </TouchableOpacity>
                <Line />
              </View>
            );
          })}
        </Layout>
      </ScrollView>
      <View style={styles.header}>
        <ButtonIconHeader icon={SOURCE_ICON.whiteArrow} style={styles.button} />
        <View style={Theme.flexRow}>
          <ButtonIconHeader
            marginRight={24}
            icon={SOURCE_ICON.edit}
            style={styles.button}
            onPress={onEdit}
          />
          <ButtonIconHeader
            icon={SOURCE_ICON.share}
            style={styles.button}
            onPress={onShare}
          />
        </View>
      </View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: 264,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 16,
  },
  setRow: {
    marginTop: 24,
    marginLeft: 24,

    ...Theme.flexRow,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
  header: {
    ...Theme.flexRowSpace,
    width: width,
    position: "absolute",
    top: getStatusBarHeight() + 28,
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: Colors.DarkJungleGreenOpacity,
    borderWidth: 0,
  },
  box: {
    borderRadius: 16,
    marginTop: 40,
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
