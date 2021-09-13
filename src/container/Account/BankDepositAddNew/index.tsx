import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "configs";
import ButtonIconHeader from "components/ButtonIconHeader";
import { SOURCE_ICON } from "images";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Text from "components/Text";
import CheckBox from "components/CheckBox";
import Theme from "style/Theme";
import CheckBoxRound from "components/CheckBoxRound";
import { useTheme } from "configs/Theme";
import Content from "components/Layout/Content";
import TextInput from "components/TextInput";

export default memo(() => {
  const { setOptions } = useNavigation();

  const [term, setTerm] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const termCheck = useCallback(() => {
    setTerm(!term);
  }, [term]);

  const onChecking = useCallback(() => {
    setChecking(true);
    setSaving(false);
  }, [checking, saving]);

  const onSaving = useCallback(() => {
    setSaving(true);
    setChecking(false);
  }, [saving, checking]);

  const onAccountHelpIcon = () => {};
  const onRountingHelpIcon = () => {};
  const { theme } = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        elevation: 0,
        shadowColor: "transparent",
        backgroundColor: theme.backgroundHeader,
        height: getStatusBarHeight() + scale(72),
      },
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} icon={SOURCE_ICON.close} />
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Text style={styles.textAdd}>Add</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <Content
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.headerText}>Add Bank Account</Text>
        <Text marginBottom={24} lineHeight={22}>
          Securely enter your bank account details below to have payments from
          patient automatically deposited into your account.
        </Text>
        <Text style={styles.labelText}>First Name</Text>
        <TextInput value={value} style={styles.textInput} />

        <Text style={styles.labelText}>Last Name</Text>
        <TextInput value={value} style={styles.textInput} />

        <Text style={styles.labelText}>Account type</Text>
        <View style={styles.accountType}>
          <TouchableOpacity onPress={onChecking}>
            <CheckBoxRound isCheck={checking} />
            <Text style={styles.checkBox}>Checking</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onChecking}>
            <CheckBoxRound isCheck={saving} />
            <Text style={styles.checkBox}>Saving</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.labelText}>Account Number</Text>
        <View style={Theme.flexRowSpace}>
          <TextInput value={value} style={styles.textInput} />
          <ButtonIconHeader
            icon={SOURCE_ICON.help}
            style={styles.helpIcon}
            onPress={onAccountHelpIcon}
            tintColor={Colors.DodgerBlue}
          />
        </View>

        <Text style={styles.labelText}>Rounting Number</Text>
        <View style={Theme.flexRowSpace}>
          <TextInput value={value} style={styles.textInput} />
          <ButtonIconHeader
            icon={SOURCE_ICON.help}
            style={styles.helpIcon}
            onPress={onRountingHelpIcon}
            tintColor={Colors.DodgerBlue}
          />
        </View>
        <View style={Theme.flexDirection}>
          <CheckBox isCheck={term} onPress={termCheck} />
          <Text marginLeft={10} lineHeight={22}>
            I understand and accept the Payment Terms and I authorize Doctor
            Plus to deposit funds into my bank account
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Content>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  textAdd: {
    marginRight: 24,
    color: Colors.DodgerBlue,
    fontSize: 15,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  labelText: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },
  textInput: {
    width: "100%",
    flexDirection: "row",
    height: 48,
    fontSize: 15,
    fontWeight: "600",
    borderRadius: 8,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  helpIcon: {
    top: 12,
    right: 12,
    position: "absolute",
    borderWidth: 0,
    width: 24,
    height: 24,
  },
  checkBox: {
    marginRight: 64,
    marginLeft: 8,
  },
  accountType: {
    ...Theme.flexRow,
    marginBottom: 24,
    paddingTop: 16,
  },
});
