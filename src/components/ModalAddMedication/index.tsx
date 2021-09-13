import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  TextInput,
  Modal,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { getBottomSpace } from "react-native-iphone-x-helper";
import InputApp from "components/InputApp";
import ModalNote from "components/ModalNote";
import ModalSelect from "components/ModalSelect";
import { themes, useTheme } from "configs/Theme";
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

const ModalAddMedication = React.memo(
  ({
    translateY,
    close,
    medications,
  }: {
    translateY: any;
    close: () => void;
    medications: { id: number; name: string };
  }) => {
    const [note, setNote] = React.useState("");
    const [visibleModalNote, setVisibleNote] = React.useState(false);
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
          <View style={styles.buttonSlider} />
          <Text
            size={17}
            lineHeight={20}
            bold
            marginLeft={24}
            marginTop={40}
            marginBottom={24}
          >
            Add Medication
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: "#F6F6F6",
              marginBottom: 16,
            }}
          />
          <InputApp
            title={"Medication Name"}
            editable={false}
            onPress={() => {
              close();
            }}
            value={medications.name}
            styleView={{ marginHorizontal: 24 }}
          />
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
            <Text size={14} lineHeight={28}>
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
          <ButtonLinear
            white
            title={"Send"}
            onPress={close}
            style={{ marginBottom: getBottomSpace() + 8, marginHorizontal: 24 }}
          />
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

export default ModalAddMedication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000020",
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
  buttonSlider: {
    width: 48,
    height: 6,
    backgroundColor: Colors.Platinum,
    marginTop: 12,
    borderRadius: 3,
    alignSelf: "center",
  },
});
