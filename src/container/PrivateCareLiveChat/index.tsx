import React, {
  memo,
  useLayoutEffect,
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  View,
  StyleSheet,
  Modal,
  Platform,
  Easing,
  Keyboard,
  Animated,
} from "react-native";
import Text from "components/Text";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Colors, Routes } from "configs";
import ButtonIconHeader from "@components/ButtonIconHeader";
import InputToolbar from "@components/InputToolbar";
import { SOURCE_ICON } from "images";
import Theme from "style/Theme";
import moment from "moment";
import SentBubble from "./components/SentBubble";
import ReceivedBubble from "./components/ReceivedBubble";
import keyExtractor from "utils/keyExtractor";
import ModalSelect from "components/ModalSelect";
import useModalWithKeyboard from "hooks/useModalWithKeyboard";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { height, width } from "configs/Const";
import ButtonShare from "./components/ButtonShare";
import DoctorShare from "./components/DoctorShare";
import HealthGuideShare from "./components/HealthGuideShare";
import LiveChatConsult from "./components/LiveChatConsult";
import useKeyboard from "hooks/useKeyboard";
import { useTheme } from "configs/Theme";

export const EXAMPLE_CHAT_DATA = [
  {
    id: 0,
    liveChatHistory: true,
    content: {
      title: "Live Chat Consult",
      date: "Today, Jan 05, 2020",
      time: "09:30 AM - 10:00 AM",
    },
  },
  {
    id: 1,
    text: "Hello. How’r you?",
    createdAt: moment().subtract(10, "minutes").format("hh:mm"),
    user: {
      id: 1,
      name: "Uncalibrated",
    },
  },
  {
    id: 2,
    text: "Hi Doctor. I’m fine. Thanks",
    user: {
      id: 2,
      name: "Uncalibrated",
    },
  },
  {
    id: 3,
    text: "My daughter is 3 years old and she didn’t well  from 2 days ago.",
    user: {
      id: 2,
      name: "Uncalibrated",
    },
  },
  {
    id: 4,
    text: "Does she has others symptoms?",
    user: {
      id: 1,
      name: "Uncalibrated",
    },
  },
  {
    id: 5,
    text: "She didn’t eat well since 1 week",
    user: {
      id: 2,
      name: "Uncalibrated",
    },
  },
];

const menuOptions = [
  {
    id: 0,
    name: "Consult Information",
  },
  {
    id: 1,
    name: "Shared File",
  },
  {
    id: 2,
    name: "Finish this Consult",
    color: Colors.RedNeonFuchsia,
  },
];

const PrivateCareLiveChat = memo(() => {
  const { setOptions, goBack, navigate } = useNavigation();
  const [userName, setUserName] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [chatConversation, setConversation] = useState<any>([]);
  const [visibleMenuOption, setVisibleMenuOption] = useState<boolean>(false);
  const [visibleShare, setVisibleShare] = useState<boolean>(false);
  const scrollRef = useRef<any>();
  const transY = useRef(new Animated.Value(120)).current;
  const tranY = useRef(new Animated.Value(0)).current;

  const {
    visible: visible,
    open: open,
    close: close,
    translateY: translateY,
  } = useModalWithKeyboard(false);

  const keyBoard = useKeyboard();

  const hideMenuOptions = useCallback(() => {
    setVisibleMenuOption(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current.scrollToEnd();
    }, 200);
  }, [scrollRef]);
  const onScrollToEnd = useCallback(() => {
    setTimeout(() => {
      scrollRef.current.scrollToEnd();
    }, 200);
  }, [scrollRef]);

  useEffect(() => {
    if (keyBoard.keyboardShown) {
      Animated.timing(tranY, {
        toValue: -height / 10,
        duration: 0,
        useNativeDriver: true,
        easing: Easing.quad,
      }).start(() => onScrollToEnd());
    }
  }, [keyBoard.keyboardShown, onScrollToEnd]);

  useFocusEffect(
    React.useCallback(() => {
      setUserName("Ethel Howard");
      setTime("19:19 remaining (30 mins visit)");
      setConversation(EXAMPLE_CHAT_DATA);
    }, [])
  );
  const { theme } = useTheme();

  useLayoutEffect(() => {
    const onOption = () => {
      setVisibleMenuOption(true);
    };
    setOptions({
      title: (
        <View style={Theme.center}>
          <Text size={17} lineHeight={20} bold>
            {`${userName}`}
          </Text>
          <Text marginTop={6} color={Colors.GrayBlue} size={11} lineHeight={14}>
            {time}
          </Text>
        </View>
      ),
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.backgroundHeader,
      },
    });
  }, [setOptions, userName, time]);

  const toValue = useMemo(() => (Platform.OS === "ios" ? -0 : 0), []);

  const onShare = useCallback(() => {
    //setVisibleShare(true);
    Keyboard.dismiss();
    Animated.timing(transY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start();
  }, []);

  const onHideShare = useCallback(() => {
    //setVisibleShare(false);
    if (keyBoard.keyboardShown) {
      return;
    } else if (keyBoard.keyboardShown === false) {
      Animated.timing(transY, {
        toValue: 120,
        duration: 0,
        useNativeDriver: true,
        easing: Easing.quad,
      }).start();
    }
  }, [keyBoard.keyboardShown]);

  const onSendMessage = useCallback(
    (text: string) => {
      if (text === "") {
        return;
      } else {
        const newMessage = {
          id: chatConversation.length + 1,
          text: text,
          createdAt: moment().format("hh:mm"),
          user: {
            id: 1,
            name: "Uncalibrated",
          },
        };
        setConversation([...chatConversation, newMessage]);
        onScrollToEnd();
      }
    },
    [chatConversation, onScrollToEnd]
  );

  const onDoctorProfile = useCallback(() => {
    onHideShare();
    const newMessage = {
      id: chatConversation.length + 1,
      text: "Does she has others symptoms?",
      createdAt: moment().format("hh:mm"),
      user: {
        id: 1,
        name: "Uncalibrated",
      },
    };
    const shareDoctor = {
      id: chatConversation.length + 2,
      shareDoctor: true,
      content: {
        avatar: require("images/avatar/sarah.png"),
        name: "Dr.Christine Bradley",
        faculty: "Dermatology",
        rate: 4.5,
        review: 234,
        online: true,
      },
    };
    setConversation([...chatConversation, newMessage, shareDoctor]);
    onScrollToEnd();
  }, [chatConversation, onScrollToEnd]);

  const onHospitalClinic = useCallback(() => {}, []);

  const onHealthGuide = useCallback(() => {
    onHideShare();
    const newMessage = {
      id: chatConversation.length + 1,
      text: "You can check this health guide after consult finished",
      createdAt: moment().format("hh:mm"),
      user: {
        id: 1,
        name: "Uncalibrated",
      },
    };
    const shareHealthGuide = {
      id: chatConversation.length + 2,
      shareHealthGuide: true,
      content: {
        title: "Get Vaccinated",
        enroll: 543,
        name: "Dr.Sarah Conner",
        avatar: require("images/avatar/sarah.png"),
      },
    };
    setConversation([...chatConversation, newMessage, shareHealthGuide]);
    onScrollToEnd();
  }, [chatConversation, onScrollToEnd]);

  const onMedication = useCallback(() => {
    navigate(Routes.ShareMedication);
  }, []);

  const renderBubble = useCallback(({ item }) => {
    return item.liveChatHistory ? (
      <LiveChatConsult {...item.content} />
    ) : item.shareDoctor ? (
      <DoctorShare {...item.content} />
    ) : item.shareHealthGuide ? (
      <HealthGuideShare {...item.content} />
    ) : item.user.id === 1 ? (
      <SentBubble {...item} />
    ) : (
      <ReceivedBubble {...item} />
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.conversationView}>
        <Animated.FlatList
          ref={scrollRef}
          data={chatConversation}
          renderItem={renderBubble}
          keyExtractor={keyExtractor}
          onTouchStart={onHideShare}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
      <Animated.View
        style={{
          backgroundColor: Colors.White,
          position: "absolute",
          width: width,
          bottom: 0,
          paddingBottom: getBottomSpace() + 24,
          transform: [{ translateY: transY }],
        }}
      >
        <InputToolbar
          onSendMessage={onSendMessage}
          onScrollToEnd={onScrollToEnd}
          onSendFile={() => {}}
          onShare={onShare}
          onBlur={onHideShare}
          onFocusInput={onHideShare}
        />
        <View
          style={{
            paddingTop: 32,
            ...Theme.flexRowSpace,
            paddingHorizontal: 32,
          }}
        >
          <ButtonShare
            onPress={onDoctorProfile}
            icon={"whiteDoctor"}
            title={"Doctor Profile"}
          />
          <ButtonShare
            onPress={onHospitalClinic}
            icon={"hospital"}
            title={"Hospital/Clinic"}
            color={Colors.RedNeonFuchsia}
          />
          <ButtonShare
            onPress={onHealthGuide}
            icon={"healthGuide"}
            title={"Health Guide"}
            color={Colors.bDazzledBlue}
          />
          <ButtonShare
            onPress={onMedication}
            icon={"whiteMedication"}
            title={"Medication"}
            color={Colors.Orange}
          />
        </View>
      </Animated.View>
      <Modal
        visible={visibleMenuOption}
        onRequestClose={() => {
          setVisibleMenuOption(false);
        }}
        transparent
        animationType={"fade"}
      >
        <ModalSelect
          onPressItem={open}
          choices={menuOptions}
          close={hideMenuOptions}
        />
      </Modal>
    </View>
  );
});

export default PrivateCareLiveChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WhiteSmoke,
  },
  conversationView: {
    flex: 1,
    backgroundColor: Colors.WhiteSmoke,
  },
  contentContainerStyle: {
    paddingTop: 20,
    paddingBottom: getBottomSpace() + 60,
  },
});
