import { useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Colors } from "configs";
import { height } from "configs/Const";
import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Switch } from "react-native-gesture-handler";
import Theme from "style/Theme";
import Text from "components/Text";
import ButtonIcon from "components/Buttons/ButtonIcon";
import ButtonLinear from "components/Buttons/ButtonLinear";
import ButtonText from "components/Buttons/ButtonText";
import { useTheme } from "configs/Theme";
import Container from "components/Layout/Container";

export default memo(() => {
  const { setOptions } = useNavigation();
  const { theme } = useTheme();

  const [toggle, setToggle] = useState<boolean>(true);
  const [editPrice, setEditPrice] = useState<boolean>(false);

  const [savedServicePrice, setSavedServicePrice] = useState<string>("45");
  const [servicePrice, setServicePrice] = useState<string>("");
  const [description, setDescription] = useState<string>(
    "Send multiple messages /attachments. Get first responsewithin 4 hours."
  );

  const onChangePrice = useCallback((text: string) => {
    return setServicePrice(text);
  }, []);

  const onSaveEdit = () => {
    setSavedServicePrice(servicePrice);
    setEditPrice(!editPrice);
  };

  const onChangeDescription = useCallback((text: string) => {
    return setDescription(text);
  }, []);

  const onSwitch = () => {
    setToggle(!toggle);
  };

  const toggleEditPrice = () => {
    setServicePrice(savedServicePrice);
    setEditPrice(!editPrice);
  };

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
        elevation: 0,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  });
  return (
    <Container style={styles.container}>
      <View style={Theme.flexRowSpace}>
        <Text bold size={24} marginTop={24} marginLeft={24}>
          Send Message
        </Text>
        <Switch style={styles.switch} value={toggle} onValueChange={onSwitch} />
      </View>
      {toggle ? (
        <View>
          <Text right marginRight={36}>
            Open
          </Text>
          <View style={styles.content}>
            {editPrice ? (
              <View>
                <Text marginBottom={8}>Service Price ($)</Text>
                <View style={Theme.flexRowSpace}>
                  <TextInput
                    editable
                    onChangeText={onChangePrice}
                    value={servicePrice}
                    style={styles.editPrice}
                    keyboardType="number-pad"
                  />
                  <ButtonLinear
                    white
                    style={styles.buttonSave}
                    title={"Save"}
                    onPress={onSaveEdit}
                  />
                  <ButtonText
                    style={styles.buttonCancel}
                    title={"Cancel"}
                    titleColor={Colors.GrayBlue}
                    onPress={toggleEditPrice}
                  />
                </View>
              </View>
            ) : (
              <View style={{ ...Theme.flexRowSpace, height: 50 }}>
                <View style={{ height: 50 }}>
                  <Text marginBottom={8}>Service Price</Text>
                  <View style={Theme.flexRow}>
                    <Text>$ </Text>
                    <Text bold size={15}>
                      {savedServicePrice}
                    </Text>
                    <Text> / 30 mins</Text>
                  </View>
                </View>
                <ButtonIcon icon={"edit"} onPress={toggleEditPrice} />
              </View>
            )}
            <Text marginTop={24} marginBottom={8}>
              Consulted
            </Text>
            <View style={Theme.flexRow}>
              <Text size={17} bold marginRight={2}>
                234
              </Text>
              <Text>times</Text>
            </View>
            <View style={styles.description}>
              <Text marginBottom={4}>Description</Text>
              <TextInput
                multiline
                editable
                value={description}
                textAlignVertical="top"
                onChangeText={onChangeDescription}
                style={styles.descriptionTextInput}
              />
              <Text right color={Colors.GrayBlue} marginTop={8} size={11}>
                {description.length}/200
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text right marginRight={36}>
          Close
        </Text>
      )}
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  switch: {
    marginTop: 24,
    marginRight: 24,
    justifyContent: "center",
  },
  content: {
    marginTop: 20,
    marginHorizontal: 24,
    padding: 24,
    backgroundColor: Colors.White,
    borderRadius: 12,
    shadowOffset: { width: 5, height: 5 },
  },
  buttonSave: {
    width: 100,
    height: 50,
    marginTop: 0,
  },
  buttonCancel: {
    width: 100,
    height: 50,
    borderColor: Colors.Snow,
  },
  editPrice: {
    width: 100,
    height: 48,
    marginRight: 20,
    borderColor: Colors.DodgerBlue,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  description: {
    borderTopColor: Colors.WhiteSmoke,
    borderTopWidth: 1,
    marginTop: 24,
    paddingTop: 24,
  },
  descriptionTextInput: {
    padding: 16,
    height: 170,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.WhiteSmoke,
    lineHeight: 24,
    fontWeight: "600",
  },
});
