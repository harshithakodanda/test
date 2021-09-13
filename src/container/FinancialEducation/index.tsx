import React, { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Text from "components/Text";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import ScrollableTab from "components/ScrollableTab";
import { Colors } from "configs";
import ButtonIcon from "components/ButtonIcon";
import Theme from "style/Theme";
import EducationVideoList from "./EducationVideoList";
import AnsweredConsults from "./Answered";
import { useNavigation } from "@react-navigation/native";
import Container from "components/Layout/Container";
import { useTheme } from "configs/Theme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import VideoComment from "components/Video/VideoFeedComment"
import { production } from "api/api";


interface FreeConsultsProps {}

const FreeConsults = memo(({}: FreeConsultsProps) => {
  const { theme } = useTheme();

  const { navigate, goBack } = useNavigation();
  const renderHeader = useCallback(() => {
    const headerAnimation = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: headerAnimation.value * 255 }],
      };
    });
    return (
      <Container style={styles.container}>
       
      </Container>
    );
  }, []);

  return (
    <Container style={styles.container}>
       <Text
        marginTop={getStatusBarHeight()}
        marginHorizontal={24}
        bold
        size={24}
        lineHeight={28}>
        MFW Education
      </Text>
      <ScrollableTab
        titles={["Videos", "Financial Quiz"]}
        titleSize={15}
        titleFocusStyle={true}
        {...{ renderHeader }}
        tabStyle={{ backgroundColor: theme.background }}
      >
        <VideoComment url={production.GetEducationVideo} horizontal={false}/>
        {/* <EducationVideoList /> */}
        <AnsweredConsults />
      </ScrollableTab>
    </Container>
  );
});

export default FreeConsults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    borderWidth: 1,
    borderColor: Colors.Platinum,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: Colors.BlueCrayola,
  },
  header: {
    paddingHorizontal: 24,
    marginTop: getStatusBarHeight(true),
  },
  headerIcons: {
    ...Theme.flexRowSpace,
  },
});
