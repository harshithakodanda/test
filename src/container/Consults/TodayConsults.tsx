import React, { memo, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import Text from "components/Text";
import { width, ConsultsType } from "configs/Const";
import Theme from "style/Theme";
import scale from "utils/scale";

interface TodayConsultsProps {}

export const fakeData = [
  {
    id: 0,
    user: {
      name: "Ethel Howard",
      gender: "Female",
      age: 28,
      phone: "542-430-3167",
      img: require("images/avatar/sarah.png"),
    },
    status: 1,
    time: {
      timeRemaining: "19:19 mins left",
      date: "Today, Jan 5, 2020",
      timeRange: "09:30 AM - 10:00 AM",
    },
    type: ConsultsType.LiveChat,
    details: {
      askFor: "Ask for her daughter, 4 years old",
      question:
        "Late falling of milk teeth on a child, resulting in two rows of milk and permanent teeth at the same time, what could help?",
      image: {
        uri: require("images/down.png"),
        title: "My daughter teeth",
        uploadTime: "Uploaded Jan, 03 2020",
      },
    },
    additionalInformation: {
      diagnosedConditions: null,
      medications: null,
      allergies: null,
    },
  },
  {
    id: 1,
    user: {
      img: require("images/avatar/sarah.png"),
      name: "Devin Shelton",
      gender: "Male",
      age: 30,
      phone: "753-140-5210",
    },
    status: 2,
    type: ConsultsType.Message,
    time: {
      date: "Today, Jan 5, 2020",
      receivedTime: "Received message at 09:12 AM",
    },
    details: {
      askFor: "For his daughter, 4 years old",
      question:
        "I think my child has been exposed to chickenpox, what should I do? How long does it take to show signs of chickenpoxafter being exposed?",
      image: {
        uri: require("images/down.png"),
        title: "Redness on the back of the neck",
        uploadTime: "Uploaded Jan, 03 2020",
      },
    },
    additionalInformation: {
      diagnosedConditions: {
        value: "Chickenpox",
        time: "(Jan 5, 2020)",
      },
      medications: null,
      allergies: null,
    },
  },
  {
    id: 2,
    user: {
      name: "John Ray",
      gender: "Male",
      age: 30,
      phone: "968-926-0227",
      img: require("images/avatar/sarah.png"),
    },
    status: 3,
    type: ConsultsType.VoiceCall,
    time: {
      date: "Today, Jan 5, 2020",
      receivedTime: "Received request at 09:34 AM",
      timeRemaining: "4 hours left to confirm",
    },
    details: {
      askFor: "For his daughter, 4 years old",
      question:
        "Late falling of milk teeth on a child, resulting in two rows of milk and permanent teeth at the same time, what could help?",
      image: {
        uri: require("images/down.png"),
        title: "Redness on the back of the neck",
        uploadTime: "Uploaded Jan, 03 2020",
      },
    },
    additionalInformation: {
      diagnosedConditions: {
        value: "Chickenpox",
        time: "(Jan 5, 2020)",
      },
      medications: null,
      allergies: null,
    },
  },
  {
    id: 3,
    user: {
      name: "Ethel Howard",
      gender: "Female",
      age: 28,
      phone: "542-430-3167",
      img: require("images/avatar/sarah.png"),
    },
    status: 2,
    type: ConsultsType.Appointment,
    time: {
      date: "Today, Jan 5, 2020",
      timeRange: "08:00 PM - 08:30 PM",
    },
    details: {
      askFor: "For her daughter, 3 years old",
      question:
        "I think my child has been exposed to chickenpox, what should I do? How long does it take to show signs of chickenpoxafter being exposed?",
      image: null,
    },
    additionalInformation: {
      diagnosedConditions: {
        value: "Chickenpox",
        time: "(Jan 5, 2020)",
      },
      medications: null,
      allergies: null,
    },
  },
];

const TodayConsults = memo((props: TodayConsultsProps) => {
  const stillInProgressConsults = fakeData.filter((i) => i.status === 1);
  const nextConsults = fakeData.filter((i) => i.status !== 1);
  return (
    <View style={styles.container}>
      {stillInProgressConsults.length !== 0 || nextConsults.length !== 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 40,
            paddingHorizontal: 24,
          }}
        >
          <>
            {stillInProgressConsults.length > 0 && (
              <View style={{ paddingBottom: 32 }}>
                <Text size={17} lineHeight={20} bold marginBottom={23}>
                  Still in Progress
                </Text>
                {stillInProgressConsults.map((item) => (
                  <ConsultsItem {...item} key={item.id.toString()} />
                ))}
              </View>
            )}
            {nextConsults.length > 0 && (
              <View style={{ paddingBottom: 32 }}>
                <Text size={17} lineHeight={20} bold marginBottom={23}>
                  Next Consults [{nextConsults.length}]
                </Text>
                {nextConsults.map((item) => (
                  <ConsultsItem {...item} key={item.id.toString()} />
                ))}
              </View>
            )}
          </>
        </ScrollView>
      ) : (
        <View style={{ height: "70%", ...Theme.center }}>
          <Image
            source={require("images/down.png")}
            style={{ width: scale(160, true), height: scale(160, true) }}
          />
          <Text size={15} lineHeight={24} marginTop={scale(56, true)}>
            No upcoming consults!
          </Text>
        </View>
      )}
    </View>
  );
});

export default TodayConsults;

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
  },
});
