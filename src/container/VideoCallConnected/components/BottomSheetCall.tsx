import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Text from "components/Text";
import BottomSheet from "components/BottomSheet";
import ButtonIcon from "components/ButtonIcon";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import IconNotification from "components/Home/IconNotification";

interface BottomSheetCallProps {
  onSharedFile: () => void;
}

const BottomSheetCall = memo(({ onSharedFile }: BottomSheetCallProps) => {
  return (
    <BottomSheet maxHeight={100 - getBottomSpace()}>
      <View
        style={{
          paddingHorizontal: 24,
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 12,
          paddingBottom: 24,
        }}
      >
        <ButtonIcon
          size={56}
          borderRadius={16}
          icon={require("images/ic_live_chat.png")}
          style={{ marginRight: 28 }}
        />
        <ButtonIcon
          size={56}
          borderRadius={16}
          icon={require("images/ic_video_off.png")}
          style={{ marginRight: 28 }}
        />
        <ButtonIcon
          size={56}
          borderRadius={16}
          icon={require("images/ic_mute.png")}
          style={{ marginRight: 28 }}
        />
        <View>
          <ButtonIcon
            size={56}
            borderRadius={16}
            icon={require("images/ic_attach_large.png")}
            onPress={onSharedFile}
          />
        </View>
      </View>
    </BottomSheet>
  );
});

export default BottomSheetCall;

const styles = StyleSheet.create({
  container: {},
  notification: {
    position: "absolute",
    top: getStatusBarHeight() + 16,
    right: 24,
    zIndex: 10,
  },
});
