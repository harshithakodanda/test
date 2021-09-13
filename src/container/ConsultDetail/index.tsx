import React, { memo, useLayoutEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Text from "components/Text";
import { useNavigation, useRoute } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors, Routes } from "configs";
import { ConsultsType, height } from "configs/Const";
import Theme from "style/Theme";
import UserInfo from "components/ConsultDetail/UserInfo";
import ConsultTime from "components/ConsultDetail/ConsultTime";
import Detail from "components/ConsultDetail/Detail";
import AdditionalInformation from "components/ConsultDetail/AdditionalInformation";
import ButtonBorder from "components/Buttons/ButtonBorder";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { consult } from "type/consult";
import ModalChangePlan from "components/ConsultDetail/Modals/ModalChangePlan";
import ModalDeclineAlert from "components/ConsultDetail/Modals/ModalDeclineAlert";
import useModalAni from "hooks/useModalAni";
import ModalSendReason from "components/ConsultDetail/Modals/ModalSendReason";
import useModalWithKeyboard from "hooks/useModalWithKeyboard";
import scale from "utils/scale";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";

interface ConsultDetailProps {}
interface routeType {
  key: string;
  name: string;
  params: {
    item: consult;
    statusColor: string;
    statusName: string;
  };
}
const ConsultDetail = memo((props: ConsultDetailProps) => {
  const { theme } = useTheme();
  const route: routeType = useRoute();
  const { item, statusColor, statusName } = route.params;
  let title: string;
  switch (item.type) {
    case ConsultsType.Appointment:
      title = "Online Appointment";
      break;
    case ConsultsType.Message:
      title = "Message Consult";
      break;
    case ConsultsType.VoiceCall:
      title = "Voice Call Consult";
      break;
    case ConsultsType.LiveChat:
      title = "Live Chat Consult";
      break;
    case ConsultsType.VideoCall:
      title = "Video Call";
      break;
  }
  const { setOptions, navigate } = useNavigation();
  const [visibleModalChange, setVisibleModalChange] = useState(false);
  const openChange = useCallback(() => {
    setVisibleModalChange(true);
  }, []);
  const closeChange = useCallback(() => {
    setVisibleModalChange(false);
  }, []);

  const [visibleModalDecline, setVisibleModalDecline] = useState(false);
  const openDecline = useCallback(() => {
    setVisibleModalDecline(true);
  }, []);
  const closeDecline = useCallback(() => {
    setVisibleModalDecline(false);
  }, []);

  const { visible, open, close, translateY } = useModalWithKeyboard(false); //show modal

  const onAccept = useCallback(() => {}, []);
  const onAnswer = useCallback(() => {}, []);
  const onChangePlan = useCallback(() => {
    openChange();
  }, []);
  const onContinueChat = useCallback(() => {}, []);
  const onDecline = useCallback(() => {
    openDecline();
  }, []);
  const onCallNow = useCallback(() => {
    navigate(Routes.VideoCall, { user: item.user });
  }, [navigate, item]);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Text size={17} lineHeight={20} bold marginBottom={8} center>
            {title}
          </Text>
          <Text
            size={13}
            lineHeight={16.32}
            center
            marginBottom={8}
            color={statusColor}
          >
            {statusName}
          </Text>
        </View>
      ),
      headerStyle: {
        shadowColor: "transparent",
        height: scale(108),
        backgroundColor: theme.backgroundItem,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  }, [setOptions, statusColor, statusName]);
  return (
    <Container style={{ ...Theme.flexOne }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        <UserInfo user={item.user} style={{ marginTop: 16 }} />
        <ConsultTime
          style={{ marginTop: 16 }}
          time={item.time}
          type={item.type}
          status={item.status}
        />
        <Detail
          style={{ marginTop: 16 }}
          details={item.details}
          status={item.status}
        />
        <AdditionalInformation
          style={{ marginTop: 16, marginBottom: 16 }}
          additionalInformation={item.additionalInformation}
        />
        {((item.type === ConsultsType.Appointment && item.status < 3) ||
          item.status === 1) && (
          <TouchableOpacity style={{ marginTop: 16, marginBottom: 40 }}>
            <Text
              size={13}
              lineHeight={16}
              color={Colors.GrayBlue}
              center
              textDecorationLine={"underline"}
            >
              {item.type === ConsultsType.Appointment && "Cancel Appointment"}
              {item.type !== ConsultsType.Appointment &&
                item.status === 1 &&
                "Are you done? Finish consult now."}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Layout
        style={{
          paddingTop: 12,
          paddingBottom: 21,
          paddingHorizontal: 24,
        }}
      >
        {item.type === ConsultsType.Appointment && item.status === 2 && (
          <ButtonBorder title={"Change Plan"} onPress={onChangePlan} />
        )}
        {item.type === ConsultsType.LiveChat && item.status === 1 && (
          <ButtonLinear
            white
            title={"Continue chat with Patient"}
            style={{ marginTop: 0 }}
            onPress={onContinueChat}
          />
        )}
        {item.status === 3 && (
          <View style={Theme.flexRow}>
            <ButtonBorder
              style={{ flex: 1, marginRight: 8 }}
              title={"Decline"}
              onPress={onDecline}
            />
            {item.type === ConsultsType.VideoCall ? (
              <ButtonLinear
                styleButton={{ flex: 1, marginLeft: 8 }}
                style={{ marginTop: 0 }}
                title={"Call Now"}
                white
                onPress={onCallNow}
              />
            ) : (
              <ButtonLinear
                styleButton={{ flex: 1, marginLeft: 8 }}
                style={{ marginTop: 0 }}
                title={"Accept"}
                onPress={onAccept}
                white
              />
            )}
          </View>
        )}
        {item.status === 2 && item.type !== ConsultsType.Appointment && (
          <View style={Theme.flexRow}>
            <ButtonBorder
              style={{ flex: 1, marginRight: 8 }}
              title={"Decline"}
              onPress={onDecline}
            />
            {item.type === ConsultsType.VoiceCall ? (
              <ButtonLinear
                styleButton={{ flex: 1, marginLeft: 8 }}
                style={{ marginTop: 0 }}
                title={"Call Now"}
                onPress={onCallNow}
                white
              />
            ) : (
              <ButtonLinear
                styleButton={{ flex: 1, marginLeft: 8 }}
                style={{ marginTop: 0 }}
                title={"Answer"}
                onPress={onAnswer}
                white
              />
            )}
          </View>
        )}
      </Layout>
      <Modal
        visible={visibleModalChange}
        onRequestClose={closeChange}
        transparent
        animationType={"fade"}
      >
        <ModalChangePlan close={closeChange} />
      </Modal>
      <Modal
        visible={visibleModalDecline}
        onRequestClose={closeDecline}
        transparent
        animationType={"fade"}
      >
        <ModalDeclineAlert
          close={closeDecline}
          user={item.user}
          openSendReason={open}
        />
      </Modal>
      <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={"fade"}
      >
        <ModalSendReason close={close} translateY={translateY} />
      </Modal>
    </Container>
  );
});

export default ConsultDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    justifyContent: "flex-end",
    flex: 1,
  },
});
