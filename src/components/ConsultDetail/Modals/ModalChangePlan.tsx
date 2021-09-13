import React, { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import ButtonBorder from "components/Buttons/ButtonBorder";
import ButtonLinear from "components/Buttons/ButtonLinear";

interface ModalChangePlanProps {
  close: () => void;
}

const ModalChangePlan = memo((props: ModalChangePlanProps) => {
  const onCallNow = useCallback(() => {
    props.close();
  }, []);
  const onCancel = useCallback(() => {
    props.close();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: 32,
          paddingHorizontal: 24,
          backgroundColor: Colors.White,
          borderRadius: 16,
        }}
      >
        <Text size={17} lineHeight={28} bold center>
          Are you want to change visit time?
        </Text>
        <Text size={15} lineHeight={24} center marginTop={16} marginBottom={32}>
          Please make a phone call for patient to negotiate if you want to
          change the visit time.
        </Text>
        <View style={Theme.flexRow}>
          <ButtonBorder
            style={{ flex: 1, marginRight: 8 }}
            title={"Call Now"}
            onPress={onCallNow}
          />
          <ButtonLinear
            white
            styleButton={{ flex: 1, marginLeft: 8 }}
            style={{ marginTop: 0 }}
            title={"Cancel"}
            onPress={onCancel}
          />
        </View>
      </View>
    </View>
  );
});

export default ModalChangePlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Black68,
    ...Theme.center,
    paddingHorizontal: 24,
  },
});
