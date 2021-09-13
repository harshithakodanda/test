import React, { memo, useLayoutEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Animated,
  FlatList,
} from "react-native";
import { IMAGE } from "images/Images";
import { width } from "configs/Const";
import { Colors } from "configs";
// import { AVATAR } from "images/avatar";
import ButtonLinear from "components/Buttons/ButtonLinear";
import scale from "utils/scale";
import { SOURCE_ICON } from "images";
import ProfileManagement from "components/WorkProfileManagement/ProfileManagement";
import About from "components/WorkProfileManagement/About";
import ReviewsMyServices from "components/WorkProfileManagement/ReviewsMyServices";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import Theme from "style/Theme";
import ButtonIconHeader from "components/ButtonIconHeader";
import keyExtractor from "utils/keyExtractor";
import ScrollTabButton from "components/ScrollableTab/ScrollTabButton";
import Text from "components/Text";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";

const PROFILE_MANAGEMENT = {
  id: 0,
  // avatar: AVATAR.wallace,
  name: "Dr. Martin Wallace",
  faculty: "Allergy & Immunology",
  address: "Temple Hills, MD 20748",
  rate: 4.8,
  review: 1387,
  online: true,
  patients: 1523,
  savedLives: 423,
  helpedPeople: 423200,
  thanksFor: 24200,
};

const ABOUT = {
  information:
    "Dr. Martin Wallace is Board Certified in Allergy and Immunology and Pediatrics and a South Jersey Top Doc. With over 23 years' private practice experience...",
  images: [IMAGE.map, IMAGE.map],
  address: "102 Centre Boulevard Suite B\nSaint Albans, NY 11412",
  phoneNumber: "481-766-6767",
  insurancePlans: ["Aetna", "AmeriHealth", "BlueCross BlueShield", "Cigna"],
  specialities: [
    { icon: "allergies", title: "Allergy And Immunology" },
    { icon: "heart", title: "Cardiology" },
  ],
  licensed: "New York",
  workExperience: "23 years",
  language: ["English", "Spanish", "French"],
  medicalSchool: "Boston University School of Medicine",
  establishSchool: "1985",
  education: ["FCPS", " MBBS", "Clinical Medicine"],
  certification: `MD '06`,
  awards: [
    { award: "Medicine Award Winners", year: "1990" },
    { award: "AMA Scientific Achievement Award", year: "2001" },
    { award: "APUA Leadership Award", year: "2016" },
  ],
};

const REVIEWS_MY_SERVICES = {
  content: [
    {
      circleColor: Colors.TealBlue,
      percentage: 86,
      percent: 96,
      title: "Recommend",
    },
    {
      circleColor: Colors.DodgerBlue,
      percentage: 80,
      percent: 92,
      title: "Start on Time",
    },
    {
      circleColor: Colors.Orange,
      percentage: 80,
      percent: 4.8,
      title: "Rating",
    },
  ],
  rating: 4.8,
  reviews: 1387,
  review: [
    {
      // avatar: AVATAR.myraDouglas,
      name: "Myra Douglas",
      rate: "5.0",
      date: "Jan 05, 2020",
      description:
        "Dr. Martin Wallace provides answers that are inspring and sensible. I know that but what lifestyle and food I need to know that?",
    },
    {
      // avatar: AVATAR.nancyBeck,
      name: "Nancy Beck",
      rate: 4.9,
      date: "Jan 02, 2020",
      description:
        "I found the answers provided by Dr. Martin Wallace to be knowledge, caring, inspring, well-reasoned and professional.",
    },
  ],
};

export default memo(() => {
  const { theme } = useTheme();

  const { setOptions, navigate } = useNavigation();
  const [profileManagement, setProfileManagement] = React.useState<any>({});
  const [about, setAbout] = React.useState<any>({});
  const [reviewsMyServices, setReviewsMyServices] = React.useState<any>({});
  const [tabActive, setTabActive] = React.useState<any>(0);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      setProfileManagement(PROFILE_MANAGEMENT);
      setAbout(ABOUT);
      setReviewsMyServices(REVIEWS_MY_SERVICES);
    }, [])
  );

  const DATA = [{ id: 0 }, { id: 1 }, { id: 2 }];
  const TABS = ["About", "Reviews My Services"];
  const scrollDistance = 300;

  const heightAnim = scrollY.interpolate({
    inputRange: [0, scrollDistance / 2, scrollDistance],
    outputRange: [0, 0, 108 - getStatusBarHeight()],
    extrapolate: "clamp",
  });

  const opacityAnim = scrollY.interpolate({
    inputRange: [0, scrollDistance / 5, scrollDistance],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  const opacityAnim1 = scrollY.interpolate({
    inputRange: [0, scrollDistance / 1.5, scrollDistance],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const height = { height: heightAnim };
  const opacity = { opacity: opacityAnim };
  const opacity1 = { opacity: opacityAnim1 };

  useLayoutEffect(() => {
    setOptions({
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.backgroundHeader,
      },
      header: () => (
        <Animated.View
          style={[
            styles.headerAnim,
            height,
            opacity1,
            { backgroundColor: theme.backgroundItem },
          ]}
        >
          <View style={Theme.flexRow}>
            <ButtonIconHeader marginLeft={24} />
            <Text bold size={15} lineHeight={18} marginLeft={16}>
              {profileManagement.name}
            </Text>
          </View>
          <View style={Theme.flexRow}>
            <ButtonIconHeader
              borderColor={Colors.DodgerBlue}
              tintColor={Colors.DodgerBlue}
              icon={SOURCE_ICON.edit}
            />
            <ButtonIconHeader
              borderColor={Colors.DodgerBlue}
              tintColor={Colors.DodgerBlue}
              marginLeft={24}
              icon={SOURCE_ICON.share}
            />
          </View>
        </Animated.View>
      ),
    });
  }, [height, scrollY, setOptions]);

  const handleChangeTab = React.useCallback((index) => {
    setTabActive(index);
  }, []);

  const handlePressShare = React.useCallback(() => {}, []);

  const renderItem = React.useCallback(
    ({ item }) => {
      if (item.id === 0) {
        return (
          <Animated.View>
            <Image style={styles.background} source={IMAGE.background} />
            <Layout style={styles.box}>
              <ButtonLinear
                white
                leftChildren={
                  <Image style={styles.iconEdit} source={SOURCE_ICON.edit} />
                }
                style={styles.buttonUpdate}
                title={"Update Work Profile"}
              />
              <ProfileManagement {...profileManagement} />
            </Layout>
          </Animated.View>
        );
      } else if (item.id === 1) {
        return (
          <Layout style={styles.tabView}>
            {TABS.map((item, index) => {
              return (
                <ScrollTabButton
                  labelStyle={styles.labelStyle}
                  key={index}
                  title={item}
                  onPressTab={() => handleChangeTab(index)}
                  focus={tabActive === index}
                />
              );
            })}
          </Layout>
        );
      } else if (item.id === 2) {
        return tabActive === 0 ? (
          <About {...about} />
        ) : (
          <ReviewsMyServices {...reviewsMyServices} />
        );
      }
    },
    [about, profileManagement, tabActive]
  );

  return (
    <Container style={styles.container}>
      
      <Animated.View style={[styles.header, opacity]}>
        <ButtonIconHeader
          backgroundColor={Colors.DarkJungleGreenOpacity}
          style={styles.buttonHeader}
          tintColor={Colors.White}
        />
        <ButtonIconHeader
          backgroundColor={Colors.DarkJungleGreenOpacity}
          style={styles.buttonHeader}
          icon={SOURCE_ICON.share}
          onPress={handlePressShare}
        />
      </Animated.View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: scale(253),
  },
  box: {
    paddingTop: 105,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  iconEdit: {
    marginRight: 12,
  },
  buttonUpdate: {
    marginTop: 0,
    marginHorizontal: 46,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  contentContainerStyle: {
    paddingTop: -1,
    paddingBottom: getBottomSpace() + 38,
  },
  header: {
    ...Theme.flexRowSpace,
    position: "absolute",
    width: width,
    paddingHorizontal: 24,
    top: Platform.OS === "ios" ? getStatusBarHeight() + 22 : 22,
  },
  tabView: {
    ...Theme.flexRow,
    paddingHorizontal: 16,
  },
  buttonHeader: {
    borderWidth: 0,
    borderRadius: 12,
  },
  headerAnim: {
    paddingTop: 1,
    ...Theme.flexRowSpace,
    paddingRight: 24,
    backgroundColor: Colors.White,
  },
});
