import React, { memo, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Image, Modal } from "react-native";
import Text from "components/Text";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "configs";
import { SOURCE_ICON } from "images";
import Theme from "style/Theme";
import ButtonIcon from "components/Buttons/ButtonIcon";
import Moment from "moment";
import { useTheme } from "configs/Theme";

interface SetWorkingTimeItemProps {
  id?: number;
  isDefault?: boolean;
}

export default memo(({ isDefault }: SetWorkingTimeItemProps) => {
  const [fromTime, setFromTime] = useState<any>(
    Moment(new Date()).format("LT")
  );
  const [toTime, setToTime] = useState<any>(Moment(new Date()).format("LT"));
  const [showFromTime, setShowFromTime] = useState<boolean>(false);
  const [showToTime, setShowToTime] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);

  const onFromTime = () => {
    setShowFromTime(true);
  };

  const onToTime = () => {
    setShowToTime(true);
  };

  const onDelete = () => {
    setShow(false);
  };

  const onChangeFrom = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || fromTime;
    setFromTime(Moment(currentTime).format("LT"));
    setShowFromTime(!showFromTime);
  };

  const onChangeTo = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || toTime;
    setToTime(Moment(currentTime).format("LT"));
    setShowToTime(!showToTime);
  };
  const { theme } = useTheme();
  return (
    <View>
      {show && (
        <View style={styles.container}>
          <View>
            <Text>From</Text>
            <TouchableOpacity
              style={[
                styles.timePicker,
                { backgroundColor: theme.backgroundItem },
              ]}
              onPress={onFromTime}
            >
              <Image style={styles.icon} source={SOURCE_ICON.time} />
              <Text marginLeft={48}>{fromTime}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text>To</Text>
            <TouchableOpacity
              style={[
                styles.timePicker,
                { backgroundColor: theme.backgroundItem },
              ]}
              onPress={onToTime}
            >
              <Image style={styles.icon} source={SOURCE_ICON.time} />
              <Text marginLeft={48}>{toTime}</Text>
            </TouchableOpacity>
          </View>
          {isDefault ? (
            <View></View>
          ) : (
            <ButtonIcon
              icon={"close"}
              style={{
                backgroundColor: theme.background,
                marginTop: 24,
              }}
              onPress={onDelete}
            />
          )}
        </View>
      )}
      <View>
        {showFromTime && (
          <DateTimePicker
            mode="time"
            value={new Date()}
            is24Hour={false}
            display="spinner"
            onChange={onChangeFrom}
          />
        )}
      </View>
      <View>
        {showToTime && (
          <DateTimePicker
            mode="time"
            value={new Date()}
            is24Hour={false}
            display="spinner"
            onChange={onChangeTo}
          />
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    marginTop: 24,
  },
  content: {
    marginLeft: 8,
    marginRight: 15,
  },
  timePicker: {
    width: 140,
    height: 48,
    borderRadius: 8,
    // backgroundColor: Colors.White,
    borderColor: Colors.GrayBlue,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 4,
  },
  icon: {
    position: "absolute",
    left: 12,
    width: 24,
    height: 24,
  },
  time: {
    borderWidth: 0,
    marginLeft: 48,
    marginRight: 12,
  },
});
