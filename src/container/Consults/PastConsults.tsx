import React, { memo, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import Text from "components/Text";
import { width, ConsultsType, ConsultsStatus } from "configs/Const";
import Theme from "style/Theme";
import scale from "utils/scale";
import { Colors } from "configs";
import PastConsultsItem from "components/PastConsultsItem";

interface PastConsultsProps {}

export const fakeData = [
  {
    id: 0,
    user: {
      name: "Virginia Bailey",
      gender: "Female",
      age: 24,
      phone: "753-140-5210",
  
    },
    status: ConsultsStatus.completed,
    time: {
      date: "Today, Jan 5, 2020",
      timeRange: "09:30 AM - 10:00 AM",
    },
    type: ConsultsType.VideoCall,
    details: {
      askFor: "For her daughter, 3 years old",
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
];

const PastConsults = memo((props: PastConsultsProps) => {
  return (
    <View style={styles.container}>
      {fakeData.length !== 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 40,
            paddingHorizontal: 24,
          }}
        >
          <View style={Theme.paddingBottom}>
            <Text
              size={13}
              lineHeight={16}
              semiBold
              marginBottom={23}
              color={Colors.GrayBlue}
            >
              Today Jan 05, 2020 [{fakeData.length}]
            </Text>
            {fakeData.map((item) => (
              <PastConsultsItem {...item} key={item.id.toString()} />
            ))}
          </View>
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

export default PastConsults;

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
  },
});
