import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { SOURCE_ICON } from "images";
import TabBar from "components/TabBar";
import {
  View,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // add this library
import Text from "components/Text";
import ModalSlideBottom from "components/ModalSlideBottom";
import useModalAnimation from "hooks/useModalAnimation";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { Colors, Routes } from "configs";
import Theme from "style/Theme";
import ButtonBorder from "components/Buttons/ButtonBorder";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { fakeData } from "container/Consults/TodayConsults";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import Line from "components/Layout/Line";
import { useTheme } from "configs/Theme";
import LayoutItem from "components/Layout/LayoutItem";
import DatePicker from "react-native-datepicker";
import InputApp from "components/InputApp";
import ButtonIconHeader from "components/ButtonIconHeader";
import { Icon } from "react-native-elements";
import { clearAll, getData, storeData } from "storage/store";
import axios from "axios";
import { datePickerFormat, datePickerToApiFormat, dateTimeFormat, db, queries } from "storage/sqlite";
import { production } from "api/api";

interface Transaction {
  organizationId: Number;
  customerId: Number;
  transactionDate: String;
  transactionType: String; //[Money In, MoneyOut]
  paymentMode: String; //[Cash,Online,Credit]
  transactionLedger: String; // [FirstDropDown]
  creditLedger: String; //[OnClick of Credit, DropDown Value]
  amount: String;
  referenceNo: String;
  additionalInfo: String;
  processed: Boolean;
  //id: any;
}

interface props {
  type: String;
  getDailyBalance: (orgId:any)=>void
}

const ModalVideo = memo(({ type,getDailyBalance }: props) => {
  const { theme } = useTheme();
  const { visible, open, close, transY } = useModalAnimation();
  const { setOptions, navigate } = useNavigation();
  const [amount, setamount] = useState("");
  const [transactionLedger, settransactionLedger] = useState(
    type == "Money In" ? "Sales Account" : "Bank Charges"
  );
  const [creditLedger, setcreditLedger] = useState(
    type == "Money In" ? "Advance from Customers" : "Advance to Suppliers"
  );

  const [mode, setMode] = useState<any>([]);
  const [tabActive, setTabActive] = React.useState<number>(0);
  const [transactionDate, settransactionDate] = useState<any>(datePickerFormat());
  const [referenceNo, setreferenceNo] = useState<any>("");
  const [additionalInfo, setadditionalInfo] = useState<any>("");
  const [organizationId, setorganizationId] = useState(0);
  const [customerId, setcustomerId] = useState(0);
  const [processed, setprocessed] = useState(false);
  const [moneyIn, setMoneyIn] = useState([]);
  const [moneyOut, setMoneyOut] = useState([]);
  const [creditMoneyIn, setCreditMoneyIn] = useState([]);
  const [creditMoneyOut, setCreditMoneyOut] = useState([]);

  const MODE = [
    {
      id: 0,
      type: "Cash",
      isTrue: true,
    },
    {
      id: 1,
      type: "Online",
      isTrue: false,
    },
    {
      id: 2,
      type: "Credit",
      isTrue: false,
    },
  ];
  useFocusEffect(
    useCallback(() => {
      setMode(MODE);
    }, [])
  );
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
        elevation: 0,
      },
      headerLeft: () => (
        <ButtonIconHeader icon={SOURCE_ICON.close} marginLeft={24} />
      ),
    });
  });

  const initialiseDropdown = ()=>{
    db.transaction((tx) => {
      tx.executeSql(
        queries.selectMoneyIn,
        [],
        (_, { rows }:any) => {
          setMoneyIn(rows["_array"]);
        },
        (_, err) => {
          console.log(err);
          return false;
        }
      );
      tx.executeSql(
        queries.selectMoneyOut,
        [],
        (_, { rows }:any) => {
          setMoneyOut(rows["_array"]);
        },
        (_, err) => {
          console.log(err);
          return false;
        }
      );
      tx.executeSql(
        queries.selectCreditMoneyIn,
        [],
        (_, { rows }:any) => {
          setCreditMoneyIn(rows["_array"]);
        },        (_, err) => {
          console.log(err);
          return false;
        }
      );
      tx.executeSql(
        queries.selectCreditMoneyOut,
        [],
        (_, { rows }:any) => {
          setCreditMoneyOut(rows["_array"]);
        },
        (_, err) => {
          console.log(err);
          return false;
        }
      );
    });
  }

  const onClose = useCallback(() => {
    close();
  }, []);

  

  const onSave = async () => {
    const trans: Transaction = {
      organizationId,
      customerId,
      transactionDate: datePickerToApiFormat(transactionDate),
      transactionType: type,
      paymentMode: MODE[tabActive].type,
      transactionLedger,
      creditLedger,
      amount,
      referenceNo,
      additionalInfo,
      processed,
    };

    console.log(trans)

    await axios
    .post(
      production.PostCashBook,
      JSON.parse(JSON.stringify(trans))
    )
    .then((res) => {
      //console.log(res.data)
      if (res.data == "success") {
        getDailyBalance(organizationId)
       console.log("success")
      }
    })
    .catch((e) => console.log(e.message));

    close();
  };

  useEffect(() => {
    open();
    getData("userProfileData").then((user) =>
      user ? setcustomerId(user.id) : setcustomerId(0)
    );
    getData("userOrganizationProfileData").then((org) =>
      org ? setorganizationId(org.id) : setorganizationId(0)
    );

    initialiseDropdown()

   
  }, []);

  return (
    <Modal
      visible={visible}
      onRequestClose={close}
      transparent
      animationType={"none"}
    >
      <ModalSlideBottom onClose={close} transY={transY}>
        <LayoutItem
          style={{
            marginTop: 22,
            paddingBottom: 8 + getBottomSpace(),
          }}
        >
          <LayoutItem
            style={{
              paddingBottom: 24,
              paddingHorizontal: 24,
            }}
          >
            <View>
              <TabBar
                onChangeTab={(index) => {
                  setTabActive(index);
                }}
                style={styles.tabBar}
                tabs={["Cash", "Online", "Credit"]}
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 80 }}
              >
                <View style={Theme.flexRow}>
                  <Text
                    size={17}
                    lineHeight={30}
                    bold
                    marginBottom={20}
                    marginRight={80}
                  >
                    {type}
                  </Text>
                  <DatePicker
                    style={styles.datePicker}
                    date={transactionDate}
                    maxDate={new Date()}
                    mode="date"
                    format="DD/MM/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={SOURCE_ICON.calendar}
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 12,
                        width: 24,
                        height: 24,
                      },
                      dateInput: {
                        borderWidth: 0,
                        marginLeft: 0,
                        marginRight: 0,
                      },
                    }}
                    onDateChange={(date) => {
                      settransactionDate(date);
                    }}
                  />
                </View>

                <View style={{ marginTop: 20 }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: theme.placeholder,
                      borderRadius: 4,
                      marginBottom: 10,
                    }}
                  >
                    {type == "Money In" && (
                      <Picker
                        mode="dropdown"
                        selectedValue={transactionLedger}
                        style={styles.editPrice}
                        onValueChange={(itemValue, itemIndex) =>
                          settransactionLedger(itemValue)
                        }
                      >
                        {moneyIn.map((key:any,i)=>{
                           return(
                            <Picker.Item
                            key={i}
                            label={key.value}
                            value={key.value}
                          />
                           )
                        })}
                      </Picker>
                    )}
                    {type == "Money Out" && (
                      <Picker
                        mode="dropdown"
                        selectedValue={transactionLedger}
                        style={styles.editPrice}
                        onValueChange={(itemValue, itemIndex) =>
                          settransactionLedger(itemValue)
                        }
                      >
                       {moneyOut.map((key:any,i)=>{
                           return(
                            <Picker.Item
                            key={i}
                            label={key.value}
                            value={key.value}
                          />
                           )
                        })}
                      </Picker>
                    )}
                  </View>

                  {tabActive === 2 && (
                    <>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: theme.placeholder,
                          borderRadius: 4,
                        }}
                      >
                        {type == "Money Out" && (
                          <Picker
                            itemStyle={{ borderColor: "red", borderWidth: 2 }}
                            mode="dropdown"
                            selectedValue={creditLedger}
                            style={styles.editPrice}
                            onValueChange={(itemValue, itemIndex) =>
                              setcreditLedger(itemValue)
                            }
                          >
                           {creditMoneyOut.map((key:any,i)=>{
                           return(
                            <Picker.Item
                            key={i}
                            label={key.value}
                            value={key.value}
                          />
                           )
                        })}                          
                        </Picker>
                        )}
                        {type == "Money In" && (
                          <Picker
                            itemStyle={{ borderColor: "red", borderWidth: 2 }}
                            mode="dropdown"
                            selectedValue={creditLedger}
                            style={styles.editPrice}
                            onValueChange={(itemValue, itemIndex) =>
                              setcreditLedger(itemValue)
                            }
                          >
                             {creditMoneyIn.map((key:any,i)=>{
                           return(
                            <Picker.Item
                            key={i}
                            label={key.value}
                            value={key.value}
                          />
                           )
                        })}         
                          </Picker>
                        )}
                      </View>
                    </>
                  )}

                  {/* //add changes  */}
                </View>

                <InputApp
                  title={"Amount"}
                  marginTop={10}
                  value={amount}
                  onChangeText={setamount}
                  keyboardType="number-pad"
                  iconLeft={
                    <Icon
                      color="#02b4b8"
                      name="rupee"
                      type="font-awesome"
                      size={22}
                      style={{ alignSelf: "center" }}
                    />
                  }
                  isShowIconLeft
                />

                <InputApp
                  title={"Ref #"}
                  marginTop={18}
                  value={referenceNo}
                  onChangeText={setreferenceNo}
                  iconLeft={
                    <Icon
                      color="#02b4b8"
                      name="info"
                      type="file-info"
                      size={22}
                      style={{ alignSelf: "center" }}
                    />
                  }
                  isShowIconLeft
                />

                <InputApp
                  title={"Additional Info"}
                  marginTop={18}
                  value={additionalInfo}
                  onChangeText={setadditionalInfo}
                  iconLeft={
                    <Icon
                      color="#02b4b8"
                      name="info"
                      type="font-awesome"
                      size={22}
                      style={{ alignSelf: "center" }}
                    />
                  }
                  isShowIconLeft
                />
              </ScrollView>
            </View>
          </LayoutItem>
          <Line />

          <View
            style={{ ...Theme.flexRow, marginTop: 12, marginHorizontal: 24 }}
          >
            <ButtonBorder
              style={{ flex: 1, marginRight: 8 }}
              title={"Cancel"}
              onPress={onClose}
              placeholder
            />
            <ButtonLinear
              white
              styleButton={{ flex: 1, marginLeft: 8 }}
              style={{ marginTop: 0 }}
              title={"Save"}
              onPress={onSave}
            />
          </View>
        </LayoutItem>
      </ModalSlideBottom>
    </Modal>
  );
});

export default ModalVideo;

const styles = StyleSheet.create({
  container: {},
  DropDown: {
    fontSize: 17,
    margin: 10,
  },
  editPrice: {
    height: 48,
    marginRight: 20,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  datePicker: {
    width: 156,
    height: 48,
    borderRadius: 8,
    borderColor: Colors.GrayBlue,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 4,
  },
  tabBar: {
    marginTop: 14,
    marginHorizontal: 24,
    alignSelf: "center",
    position: "absolute",
  },
});
