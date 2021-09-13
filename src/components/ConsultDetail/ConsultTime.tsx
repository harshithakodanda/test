import React, { memo } from "react";
import { View, StyleSheet, Image, ViewStyle } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import { consult } from "type/consult";
import { ConsultsStatus, ConsultsType } from "configs/Const";
import Layout from "components/Layout/Layout";
import Line from "components/Layout/Line";

interface ConsultTimeProps {
  style?: ViewStyle;
  time: consult["time"];
  type: consult["type"];
  status: ConsultsStatus;
}

const ConsultTime = memo((props: ConsultTimeProps) => {
  const { time } = props;
  let title = "Consult Time";
  switch (props.type) {
    case ConsultsType.Appointment:
      title = "Visit Time";
      break;
    case ConsultsType.LiveChat:
    case ConsultsType.Message:
    case ConsultsType.VoiceCall:
    case ConsultsType.VideoCall:
      if (
        props.status !== ConsultsStatus.accepted &&
        props.status !== ConsultsStatus.unConFirmed
      ) {
        title = "Consult Time";
      } else {
        title = "Request Time";
      }
      break;
    default:
      title = "Consult Time";
  }
  return (
    <Layout style={[styles.container, props.style]}>
      <View
        style={{
          ...Theme.flexRow,
          paddingBottom: 16,

          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: Colors.TealBlue20,
            ...Theme.center,
            marginRight: 16,
          }}
        >
          <Image source={require("images/ic_calendar.png")} />
        </View>
        <Text size={15} lineHeight={18} bold>
          {title}
        </Text>
      </View>
      <Line />
      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        {time.receivedTime && (
          <Text size={15} lineHeight={18} marginBottom={12}>
            {time.receivedTime}
          </Text>
        )}
        <Text size={15} lineHeight={18}>
          {time.date}
        </Text>
        <View style={Theme.flexRow}>
          {time.timeRange && (
            <Text size={15} lineHeight={18} bold marginTop={12}>
              {time.timeRange}
            </Text>
          )}
          {time.timeRange && (
            <Text
              size={13}
              lineHeight={16}
              color={
                !!time.timeRemaining ? Colors.RedNeonFuchsia : Colors.GrayBlue
              }
              marginLeft={9}
              marginTop={12}
            >
              {time.timeRemaining ? time.timeRemaining : "Alarm before 30 mins"}
            </Text>
          )}
        </View>
      </View>
    </Layout>
  );
});

export default ConsultTime;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.White,
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 24,
    ...Theme.shadow,
  },
});
