import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors } from "configs";
import Theme from "style/Theme";
import { TextInput } from "react-native-gesture-handler";
import useModalWithKeyboard from "hooks/useModalWithKeyboard";
import SearchMedication from "components/SearchMedication";
import ModalAddMedication from "components/ModalAddMedication";
import ModalSelect from "components/ModalSelect";
import ModalShareFiles from "components/ModalShareFiles";
import AddAnswer from "components/AddAnswer";
import DoneButtonKeyboard from "components/DoneButtonKeyboard";
import ModalShareDoctor from "components/ModalShareDoctor";
import AnswerField from "./components/AnswerField";
import { AnswerFieldType } from "type/answerFieldType";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import scale from "utils/scale";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

interface WriteAnAnswerProps {}

const shareFilesOptions = [
  {
    id: 0,
    name: "Take a Photo",
  },
  {
    id: 1,
    name: "Take a Video",
  },
  {
    id: 2,
    name: "From Doctor Plus Library",
  },
  {
    id: 3,
    name: "From Photos",
  },
];
const shareInfoOptions = [
  {
    id: 0,
    name: "Share Doctor Profile",
  },
  {
    id: 1,
    name: "Share Health Guide",
  },
  {
    id: 2,
    name: "Share Hospital/Clinic",
  },
];

const WriteAnAnswer = memo((props: WriteAnAnswerProps) => {
  const writeAnAnswer = useSelector((state: RootState) => state.writeAnAnswer);
  const { setOptions, navigate } = useNavigation();
  const [answer, setAnswer] = useState("");
  const inputRef: any = useRef();
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visibleSelectShare, setVisibleSelectShare] = React.useState(false);
  const [visibleSelectShareInfo, setVisibleSelectShareInfo] = React.useState(
    false
  );
  const { visible, open, close, translateY } = useModalWithKeyboard(false);
  const {
    visible: visibleShareFiles,
    open: openShareFiles,
    close: closeShareFiles,
    translateY: translateYShareFiles,
  } = useModalWithKeyboard(false);
  const [selectedMedication, setSelectedMedication] = useState({
    id: -1,
    name: "string",
  });

  const onShowSearchMedication = useCallback(() => {
    setVisibleSearch((value) => true);
  }, [navigate]);
  const onHideSearchMedication = useCallback(() => {
    setVisibleSearch((value) => false);
  }, [navigate]);

  const onShowShareFiles = useCallback(() => {
    setVisibleSelectShare((value) => true);
  }, [navigate]);
  const onHideShareFiles = useCallback(() => {
    setVisibleSelectShare((value) => false);
  }, [navigate]);

  const onShowSelectShareFilesInfo = useCallback(() => {
    setVisibleSelectShareInfo((value) => true);
  }, [navigate]);
  const onHideSelectShareFilesInfo = useCallback(() => {
    setVisibleSelectShareInfo((value) => false);
  }, [navigate]);
  // modal share doctor
  const [visibleShareDoctor, setVisibleShareDoctor] = useState(false);

  const onShowShareDoctor = useCallback(() => {
    setVisibleShareDoctor(true);
  }, []);
  const onHideShareDoctor = useCallback(() => {
    setVisibleShareDoctor(false);
  }, []);

  const onSendPatient = useCallback(() => {}, []);
  const onShareInfo = useCallback(() => {
    onShowSelectShareFilesInfo();
  }, []);
  const onPressSearchRecord = useCallback(
    (item: { id: number; name: string }) => {
      setSelectedMedication(item);
    },
    []
  );
  const { theme } = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: "",
      headerStyle: {
        shadowColor: "transparent",
        height: scale(108),
        backgroundColor: theme.backgroundItem,
      },
      headerLeft: () => (
        <ButtonIconHeader
          marginLeft={24}
          icon={require("images/ic_close.png")}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16, padding: 8 }}
          onPress={onSendPatient}
        >
          <Text
            color={answer.length > 0 ? Colors.DodgerBlue : "#E0E0E0"}
            size={15}
            bold
          >
            Send Patient
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [setOptions, answer]);
  return (
    <Container style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 32,
          paddingBottom: 110 + getBottomSpace(),
        }}
      >
        <Text size={24} lineHeight={28} bold>
          Write an Answer
        </Text>
        <Image
          source={require("images/ic_quote.png")}
          style={{ marginVertical: 16 }}
        />
        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder={"Tell patient about your conclusion and recommendation"}
          multiline
          placeholderTextColor={Colors.GrayBlue}
          maxLength={2000}
          ref={inputRef}
          style={{
            fontSize: 15,
            lineHeight: 24,
            minHeight: 120,
            marginBottom: 8,
          }}
        />
        <Text size={11} lineHeight={14} color={Colors.GrayBlue} right>
          {answer.length}/2000
        </Text>
        <AnswerField
          icon={require("images/ic_medication.png")}
          type={AnswerFieldType.prescription}
          title={"Prescription"}
          information={{}}
          onClear={() => {}}
        />
        <AnswerField
          icon={require("images/ic_attach.png")}
          type={AnswerFieldType.attachedFiles}
          title={"Attached Files"}
          information={{}}
          onClear={() => {}}
        />
        <AnswerField
          icon={require("images/ic_doctor.png")}
          type={AnswerFieldType.shareInfo}
          title={"Share Info"}
          information={{}}
          onClear={() => {}}
        />
      </ScrollView>
      <AddAnswer
        style={{
          ...Theme.flexRowSpace,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: getBottomSpace() + 24,
          paddingHorizontal: 24,
          paddingTop: 16,
          backgroundColor: theme.backgroundItem,
        }}
        {...{ onShareInfo, onShowSearchMedication, onShowShareFiles }}
      />
      <DoneButtonKeyboard
        onPress={() => {
          inputRef.current.blur();
        }}
      />

      <Modal
        visible={visibleSearch}
        onRequestClose={onHideSearchMedication}
        transparent
        animationType={"slide"}
      >
        <SearchMedication
          close={onHideSearchMedication}
          onPressItem={onPressSearchRecord}
          openAdd={open}
        />
      </Modal>
      <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={"fade"}
      >
        <ModalAddMedication
          close={close}
          translateY={translateY}
          medications={selectedMedication}
        />
      </Modal>
      <Modal
        visible={visibleSelectShare}
        onRequestClose={() => {
          setVisibleSelectShare(false);
        }}
        transparent
        animationType={"fade"}
      >
        <ModalSelect
          onPressItem={openShareFiles}
          choices={shareFilesOptions}
          close={onHideShareFiles}
        />
      </Modal>
      <Modal
        visible={visibleSelectShareInfo}
        onRequestClose={onHideSelectShareFilesInfo}
        transparent
        animationType={"fade"}
      >
        <ModalSelect
          onPressItem={onShowShareDoctor}
          choices={shareInfoOptions}
          close={onHideSelectShareFilesInfo}
        />
      </Modal>
      <Modal
        visible={visibleShareFiles}
        onRequestClose={close}
        transparent
        animationType={"fade"}
      >
        <ModalShareFiles
          close={closeShareFiles}
          translateY={translateYShareFiles}
        />
      </Modal>
      <Modal
        visible={visibleShareDoctor}
        onRequestClose={onHideShareDoctor}
        transparent
        animationType={"slide"}
      >
        <ModalShareDoctor onClose={onHideShareDoctor} />
      </Modal>
    </Container>
  );
});

export default WriteAnAnswer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
