import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Colors } from "configs";
import VideoCallHeader from "./components/VideoCallHeader";
import scale from "utils/scale";
import ButtonIcon from "components/ButtonIcon";
import BottomSheetCall from "./components/BottomSheetCall";
import ModalSlideBottom from "components/ModalSlideBottom";
import useModalAnimation from "hooks/useModalAnimation";
import ModalSharedFile from "./components/ModalSharedFile";
import Layout from "components/Layout/Layout";

interface VideoCallConnectedProps {}

const VideoCallConnected = memo(({}: VideoCallConnectedProps) => {
  const { visible, open, close, transY } = useModalAnimation();

  const onSharedFile = useCallback(() => {
    open();
  }, [open]);
  return (
    <Layout style={styles.container}>
      <VideoCallHeader />
      <View style={Theme.flexOne}>
        <Image
          source={require("images/avatar/sarah.png")}
          style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
        />
        <View
          style={{
            position: "absolute",
            top: 16,
            left: 16,
          }}
        >
          <Image
            source={require("images/avatar/sarah.png")}
            style={{
              width: scale(80),
              height: scale(120),
            }}
          />
        </View>
      </View>

      <BottomSheetCall {...{ onSharedFile }} />
      <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={"none"}
      >
        <ModalSlideBottom transY={transY} onClose={close}>
          <ModalSharedFile />
        </ModalSlideBottom>
      </Modal>
    </Layout>
  );
});

export default VideoCallConnected;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
});
