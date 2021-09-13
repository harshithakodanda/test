import React, { memo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Theme from "style/Theme";
import LinearColors from "components/LinearColors";
import { Colors, Constants, Routes } from "configs";
import OnboardingPage from "components/OnBoarding/OnBoardingPage";
import Animated from "react-native-reanimated";
import DotProgress from "components/OnBoarding/DotProgress";
import ButtonText from "components/Buttons/ButtonText";
import Text from "components/Text";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/native";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { Button } from "react-native-elements/dist/buttons/Button";

interface OnBoardingProps {}

const onboardingPages = [
  {
    id: 1,
    image: require("images/OnBoarding/img-1.png"),
    desc: "India's First Financial Wellness Brand. ",
  },
  {
    id: 2,
    image: require("images/OnBoarding/img-2.png"),
    desc: "Financial Education & Advisory Services!",
  },
  {
    id: 3,
    image: require("images/OnBoarding/img-3.png"),
    desc: "Personalised Financial planning for enterprises",
  },
  {
    id: 4,
    image: require("images/OnBoarding/img-4.png"),
    desc: "Feel confident, take control of your finances!",
  },
];

const { Value, event, set } = Animated;

const OnBoarding = memo((props: OnBoardingProps) => {
  const scrollX = new Value(0);
  const { navigate } = useNavigation();
  const onLogin = useCallback(() => {
    navigate(Routes.Login);
  }, [navigate]);
  const onSignUp = useCallback(() => {
    navigate(Routes.SignUp);
  }, [navigate]);
  const onGetHere = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <LinearColors
        style={StyleSheet.absoluteFillObject}
        colors={["#02b4b8", "#67d2d4"]}
      >
        <Animated.ScrollView
          horizontal
          snapToInterval={Constants.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={event([
            {
              nativeEvent: {
                contentOffset: { x: (x: number) => set(scrollX, x) },
              },
            },
          ])}
        >
          {onboardingPages.map((i, index) => (
            <OnboardingPage
              {...i}
              key={i.id.toString()}
              isFirstItem={index === 0}
              isLastItem={index === onboardingPages.length - 1}
            />
          ))}
        </Animated.ScrollView>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <DotProgress
            numberOfDots={onboardingPages.length}
            scrollX={scrollX}
          />
          {/* <ButtonText
          borderColor={Colors.White}
          title={"Log in"}
          style={styles.loginButton}
          white
          textProps={{ bold: true }}
          onPress={onLogin}
        /> */}
          <View
            style={{
              width: "60%",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity>
              <Button
                title={"Log in"}
                onPress={onLogin}
                style={{ width: "60%" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearColors>
    </View>
  );
});

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
  },
  loginButton: {
    width: 290,
    height: 50,
    position: "absolute",
    bottom: (Constants.height / 812) * 77 + getBottomSpace(),
    left: 32,
  },
  signUpButton: {
    width: (Constants.width - 88) / 2,
    height: 50,
    position: "absolute",
    bottom: (Constants.height / 812) * 77 + getBottomSpace(),
    right: 32,
    backgroundColor: Colors.White,
  },
  changeApp: {
    position: "absolute",
    bottom: 16 + getBottomSpace(),
    alignSelf: "center",
  },
});
