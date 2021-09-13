import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  TextInput,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { height } from "configs/Const";
import Layout from "components/Layout/Layout";
import { useTheme } from "configs/Theme";
import Line from "components/Layout/Line";
const data = [
  {
    id: 0,
    name: `The question is'n my speciality`,
  },
  {
    id: 1,
    name: `The patient behaves inappropriately`,
  },
];

const ModalSendReason = ({
  translateY,
  close,
}: {
  translateY: any;
  close: () => void;
}) => {
  const { theme } = useTheme();
  const [selectedReason, selectReason] = React.useState(-1);
  const [note, setNote] = React.useState("");
  const onChangeText = React.useCallback((text: string) => {
    if (text.length <= 150) {
      return setNote(text);
    }
    let _text = text.substring(0, 150);
    return setNote(_text);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.54)",
        justifyContent: "flex-end",
      }}
    >
      <TouchableOpacity
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        onPress={close}
        activeOpacity={1}
      />
      <Animated.View
        style={{
          backgroundColor: theme.backgroundItem,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          height: "auto",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          transform: [{ translateY: Animated.multiply(1, translateY) }],
        }}
      >
        <Text
          size={17}
          lineHeight={20}
          bold
          marginLeft={24}
          marginTop={40}
          marginBottom={24}
        >
          Tell us the reason
        </Text>
        <Line />
        {data.map((item) => {
          const onPress = () => {
            selectReason(item.id);
          };
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingVertical: 16,
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 24,
              }}
              key={item.id.toString()}
              onPress={onPress}
              activeOpacity={0.54}
            >
              <Text size={15} lineHeight={24}>
                {item.name}
              </Text>
              <View style={{ ...Theme.icons, ...Theme.center }}>
                {selectedReason !== item.id ? (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 3,
                      borderWidth: 1,
                      borderColor: "#979797",
                    }}
                  />
                ) : (
                  <Image source={require("images/ic_checkbox_active.png")} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        <Text
          size={13}
          lineHeight={16}
          marginBottom={4}
          marginTop={24}
          marginLeft={24}
          marginRight={24}
          bold
        >
          Optional Note
        </Text>
        <View
          style={{
            borderColor: theme.innearColor,

            borderWidth: 1,
            borderRadius: 8,
            marginHorizontal: 24,
            marginTop: 4,
            marginBottom: 8,
            height: 110,
            padding: 12,
          }}
        >
          <TextInput
            multiline
            style={{
              flex: 1,
              lineHeight: 18,
              fontSize: 14,
            }}
            value={note}
            onChangeText={onChangeText}
          />
        </View>
        <Text
          right
          marginRight={24}
          size={11}
          lineHeight={14}
          color={Colors.GrayBlue}
        >
          {note.length}/150
        </Text>
        <ButtonLinear
          white
          title={"Send"}
          onPress={close}
          style={{
            marginBottom: getBottomSpace() + 8,
            marginHorizontal: 24,
            marginTop: 24,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default ModalSendReason;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
