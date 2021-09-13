import React, { memo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import { Colors, Constants, Routes } from "configs";
import Theme from "style/Theme";
import { ConsultsStatus, ConsultsType } from "configs/Const";
import { useLinkProps, useNavigation } from "@react-navigation/native";
import { consult } from "type/consult";
import { useTheme } from "configs/Theme";

interface PastConsultsItemProps {
  id: number;
  user: {
    img: number;
    name: string;
    gender: string;
    age: number;
    phone: string;
  };
  status: number;
  time: consult["time"];
  type: ConsultsType;
}

export const getStatus = (status: ConsultsStatus) => {
  switch (status) {
    case ConsultsStatus.stillInProgress:
      return {
        statusName: "Still in Progress",
        statusColor: Colors.BlueCrayola,
      };
    case ConsultsStatus.accepted:
      return {
        statusName: "Accepted",
        statusColor: Colors.TealBlue,
      };
    case ConsultsStatus.unConFirmed:
      return {
        statusName: "Unconfirmed",
        statusColor: Colors.Orange,
      };
    case ConsultsStatus.completed:
      return {
        statusName: "Completed",
        statusColor: Colors.Jade,
      };

    case ConsultsStatus.iDeclined:
      return {
        statusName: "I Declined",
        statusColor: Colors.RedNeonFuchsia,
      };
    case ConsultsStatus.iCanceled:
      return {
        statusName: "I Canceled",
        statusColor: Colors.RedNeonFuchsia,
      };

    case ConsultsStatus.patientCanceled:
      return {
        statusName: "Patient Canceled",
        statusColor: Colors.RedNeonFuchsia,
      };
    default:
      return {
        statusName: "Unconfirmed",
        statusColor: Colors.Orange,
      };
  }
};

const PastConsultsItem = memo((props: PastConsultsItemProps) => {
  let typeName: string;
  let iconSource: ImageSourcePropType;
  const { statusName, statusColor } = getStatus(props.status);

  switch (props.type) {
    case ConsultsType.Appointment:
      typeName = "Appointment";
      iconSource = require("images/ic_appointment.png");
      break;
    case ConsultsType.Message:
      typeName = "Message";
      iconSource = require("images/ic_type_message.png");
      break;
    case ConsultsType.VoiceCall:
      typeName = "Voice Call";
      iconSource = require("images/ic_type_call.png");
      break;
    case ConsultsType.LiveChat:
      typeName = "Live Chat";
      iconSource = require("images/ic_type_live_chat.png");
      break;
    case ConsultsType.VideoCall:
      typeName = "Video Call";
      iconSource = require("images/ic_type_video.png");
      break;
  }

  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const onPress = useCallback(() => {
    navigate(Routes.PastConsultDetail, {
      item: props,
      statusColor: statusColor,
      statusName: statusName,
    });
  }, [navigate, statusColor, statusName]);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.backgroundItem }]}
      onPress={onPress}
    >
      <View
        style={{
          width: 56,
          height: 56,
        }}
      >
        <Image
          source={props.user.img}
          style={{
            width: 56,
            height: 56,
          }}
        />
        <View
          style={{
            width: 24,
            height: 24,
            position: "absolute",
            bottom: -8,
            right: -8,
          }}
        >
          <Image source={iconSource} />
        </View>
      </View>

      <View style={{ flex: 1, marginLeft: 24 }}>
        <View style={Theme.flexRow}>
          <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
            {typeName}
          </Text>
          <Text size={13} lineHeight={16} marginLeft={18} color={statusColor}>
            {statusName}
          </Text>
        </View>
        <Text size={15} lineHeight={18} bold marginTop={8}>
          {props.user.name}
        </Text>
        <Text size={13} lineHeight={16} marginTop={8}>
          {props.time.timeRemaining ||
            props.time.receivedTime ||
            props.time.timeRange}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default PastConsultsItem;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 16,
    width: Constants.width - 48,
    ...Theme.shadow,
    ...Theme.flexRow,
    marginBottom: 16,
  },
});
