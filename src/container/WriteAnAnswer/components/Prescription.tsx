import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Text from "components/Text";

interface PrescriptionProps {
  information: any;
}

const Prescription = memo(({ information }: PrescriptionProps) => {
  return (
    <View style={{}}>
      <Text size={15} lineHeight={18} bold marginBottom={12}>
        Acyclovir
      </Text>
      <Text size={13} lineHeight={22}>
        800 mg Aciclovir four times daily, with or without food. Treatment
        should continue for five days.
      </Text>
    </View>
  );
});

export default Prescription;

const styles = StyleSheet.create({
  container: {},
});
