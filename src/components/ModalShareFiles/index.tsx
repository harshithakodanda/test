import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  Image,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { getBottomSpace } from "react-native-iphone-x-helper";
import InputApp from "components/InputApp";
import ModalNote from "components/ModalNote";
import Theme from "style/Theme";
import { height, width } from "configs/Const";
import scale from "utils/scale";
import ButtonText from "components/Buttons/ButtonText";
import ButtonBorder from "components/Buttons/ButtonBorder";
import UploadProgress from "components/UploadProgres";
import { useTheme } from "configs/Theme";

const ModalShareFiles = React.memo(
  ({ translateY, close }: { translateY: any; close: () => void }) => {
    const [note, setNote] = React.useState(
      "Condition sample: redness on the back of the neck"
    );
    const [visibleModalNote, setVisibleNote] = React.useState(false);
    const [isUpload, setUpload] = React.useState(false);
    const onAddFile = React.useCallback(() => {
      setUpload((value) => true);
      setTimeout(() => {
        close();
      }, 6000);
    }, []);
    const { theme } = useTheme();
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={close}
          activeOpacity={1}
        />
        <Animated.View
          style={[
            styles.modal,
            { backgroundColor: theme.backgroundItem },
            { transform: [{ translateY: Animated.multiply(1, translateY) }] },
          ]}
        >
          <View style={Theme.buttonSlider} />
          <View style={{ padding: 24 }}>
            <Text size={15} lineHeight={24}>
              Help the patient understand what they are looking at
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: scale(160),
              backgroundColor: theme.background,
              marginHorizontal: 24,
              borderRadius: 8,
              alignItems: "center",
            }}
            activeOpacity={0.54}
            onPress={() => {}}
          >
            <Image
              source={require("images/down.png")}
              style={{
                height: scale(160),
                width: scale(220),
                opacity: isUpload ? 0.4 : 1,
              }}
            />
            {isUpload && (
              <UploadProgress
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  overflow: "hidden",
                }}
              />
            )}
          </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setVisibleNote(true);
            }}
          >
            <Text size={15} lineHeight={24} semiBold>
              {note}
            </Text>
          </TouchableOpacity>
          <Text
            right
            marginRight={24}
            size={11}
            lineHeight={14}
            color={Colors.GrayBlue}
          >
            {note.length}/150
          </Text>
          <View
            style={{
              ...Theme.flexRow,
              width: width,
              paddingHorizontal: 24,
              paddingBottom: getBottomSpace() + 16,
              marginTop: 16,
            }}
          >
            <ButtonBorder
              title={"Cancel"}
              onPress={close}
              style={{ flex: 1, marginRight: 8 }}
            />
            <ButtonLinear
              white
              title={"Add"}
              onPress={onAddFile}
              styleButton={{
                flex: 1,
              }}
              style={{
                marginLeft: 8,
                marginTop: 0,
              }}
              disabled={isUpload}
            />
          </View>
        </Animated.View>
        <Modal
          visible={visibleModalNote}
          onRequestClose={() => {
            setVisibleNote(false);
          }}
          transparent
        >
          <ModalNote
            {...{ note, setNote }}
            close={() => {
              setVisibleNote(false);
            }}
          />
        </Modal>
      </View>
    );
  }
);

export default ModalShareFiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000054",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: Colors.Isabelline,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 24,
    marginTop: 4,
    marginBottom: 8,
    height: 110,
    padding: 12,
  },
  modal: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    height: "auto",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
