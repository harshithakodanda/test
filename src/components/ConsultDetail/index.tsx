import React, { memo, useLayoutEffect, useCallback, useState , useEffect} from "react";
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
import Constants, { ConsultsType, height, width } from 'configs/Const';
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
import TextInput from "components/TextInput";
import { useTheme } from "configs/Theme";
import { Picker } from "@react-native-picker/picker";
import InputApp from "components/InputApp";
import Container from "components/Layout/Container";
import Layout from "components/Layout/Layout";
import TabBar from "components/TabBar";
import DatePicker from "react-native-datepicker";
import { SOURCE_ICON } from "images";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getData, storeData } from "storage/store";
import Schedule from 'container/Schedule/index';

interface ConsultDetailProps {}



const ConsultDetail = memo((props: ConsultDetailProps) => {
  const { theme } = useTheme();
  const [selectedValue, setSelectedValue] = useState("Business Goals");
  const [period, setPeriod] = useState(0);
  const {setOptions, navigate } = useNavigation();
  const [tabActive, setTabActive] = React.useState<number>(0);
  const [business, setBussiness]= useState("");
  const [family, setFamilyGoals]=useState("");
  const [financial, setFinancialGoals] = useState("");
  const [fromDate, setFromDate] = useState<any>(new Date());
  const [dueDate, setDueDate] = useState<any>("0");
  const [remainder, setRemainder] = useState<any>("");
  const [nextremainder, setNextRemainder]= useState<any>("0");
  const [remarks, setRemarks] = useState("");
 
  React.useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.background,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerRight:() =><TouchableOpacity
      style={[
        styles.container,
      ]}
      activeOpacity={0.54}
    >
      <Image
        source={require("images/smallLogo.png")}
       style={{height:40,width:40, margin:10}}
      />
    </TouchableOpacity>,
    });
  }, [setOptions]);

  const onCancel = useCallback(() => {
    navigate(Routes.Schedule)
  }, []);

  const PeriodData = [
    {
      id: 0,
      date: "Month",
      isTrue: true,
    },
    {
      id: 1,
      date: "Year",
      isTrue: false,
    }
  ];
  const nxtReminder = (val) =>{
    var remainderdate = new Date(fromDate);
    if(remainder !== NaN){
      let months = (remainderdate.getMonth() + 1 + parseInt(val) ) % 12
      if(months == NaN || months == 0 ){
        setNextRemainder(remainderdate.getDate() + "/" + 12 + "/" + remainderdate.getFullYear() )
      }else{
        setNextRemainder(remainderdate.getDate() + "/" + months + "/" +  remainderdate.getFullYear() )
      }
     
    }else(console.log("Not set"))
  }

  const save = ()=>{
    console.log("save")
    let data = {
      
      type: selectedValue,
      business,
      financial,
      family,
      period,
      durationType:PeriodData[tabActive].date,
      fromDate,
      dueDate,
      remainder,
      nextremainder,
      remarks
    }
    // console.log(data);
    getData("goals").then(res=>{
      if(res){
        console.log(res)
        storeData("goals",[...res,data])
      }else{
        storeData("goals",[data])
      }
    })
    navigate(Routes.Schedule)
  }

  const dateChange = ()=>{
    var date = new Date(fromDate);
    if(tabActive==0){
      let month = (date.getMonth()+1+parseInt(period))%12
      if(month == NaN || month == 0 ){
        setDueDate(date.getDate() + "/" + 12 + "/" + date.getFullYear())
      }else{
        setDueDate(date.getDate() + "/" + month   + "/" + date.getFullYear() )
      }
    }else{
      let year = date.getFullYear()+parseInt(period)
      setDueDate(date.getDate() + "/" + (date.getMonth()+1) + "/" + year)
  }
  }

  useEffect(()=>{
    // dateChange();
    nxtReminder(0);
  },[])

  return (
    <Container style={styles.container}>
      <Text marginTop={24} bold type={"H2"}>Create Goals </Text>
      <ScrollView>
        <View style={{ margin: 10 }}>
        <View style={{ borderWidth: 1, borderColor: theme.placeholder, borderRadius:8, marginBottom:10,marginLeft:10, marginRight:20 }}>
                   <Picker
                    mode="dropdown"
                    selectedValue={selectedValue}
                    style={[styles.dropdown,{color: theme.activeTincolor}]}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }
                  >
                    <Picker.Item label="Business Goals" value="Business Goals" />
                    <Picker.Item label="Family Goals" value="Family Goals" />
                    <Picker.Item label="Financial Goals" value="Financial Goals" />
                  </Picker>
                   </View>
                  {selectedValue === "Business Goals" &&  
                  <View style={{ borderWidth: 1, borderColor: theme.placeholder, borderRadius: 8, marginBottom:10,marginLeft:10, marginRight:20 }}>
         <Picker
          mode="dropdown"
          selectedValue={business}
          style={[styles.dropdown,{color: theme.activeTincolor,fontFamily:"Mulish-Regular"}]}
          onValueChange={(itemValue, itemIndex) =>
           {setBussiness(itemValue);
          setFamilyGoals("");
        setFinancialGoals("");
      }
          }
        >
          <Picker.Item label="Complete the registration" value="Complete the registration" />
          <Picker.Item label="Complete GST registration" value="Complete GST registration" />
          <Picker.Item label="Maintain Daily records/accounts" value="Maintain Daily records/accounts" />
          <Picker.Item label="Deposit money in Bank" value="Deposit money in Bank" />
          <Picker.Item label="Open Current Account" value="Open Current Account" />
          <Picker.Item label="File ITR" value="Maintain File ITR" />
          <Picker.Item label="File GST" value="File GST" />
          <Picker.Item label="Expand Business " value="Expand Business " />
          <Picker.Item label="Expand Business to other locations" value="Expand Business to other locations" />
          <Picker.Item label="Improve Business " value="Improve Business " />
          <Picker.Item label="Increase Profitability" value="Increase Profitability" />
          <Picker.Item label="Reduce payments to Vendors" value="Reduce payments to Vendors" />
          <Picker.Item label="Recover Receivables" value="Recover Receivables" />
          <Picker.Item label="Reduce Overheads" value="Reduce Overheads" />
          <Picker.Item label="Increase the Bank OD limits" value="Increase the Bank OD limits" />
        </Picker>
         </View>}
         {selectedValue === "Family Goals" && <View style={{ borderWidth: 1, borderColor: theme.placeholder, borderRadius: 8, marginBottom:10,marginLeft:10, marginRight:20 }}>
         <Picker
          mode="dropdown"
          selectedValue={family}
          style={[styles.dropdown,{color: theme.activeTincolor}]}
          onValueChange={(itemValue) =>
            {setFamilyGoals(itemValue);
            setBussiness("");
            setFinancialGoals("");
          }
          }
        >
          <Picker.Item label="Save for Child(s) Education" value="Save for Child(s) Education" />
          <Picker.Item label="Save for Child(s) Marriage" value="Save for Child(s) Marriage" />
          <Picker.Item label="Buy Own House" value="Buy Own House" />
          <Picker.Item label="Go for House Lease" value="Go for House Lease" />
          <Picker.Item label="Save for Self Education" value="Save for Self Education" />
          <Picker.Item label="Save for Spouse Education" value="Save for Spouse Education" />
        </Picker>
         </View>}
         {selectedValue ==="Financial Goals" &&  
         <View style={{ borderWidth: 1, borderColor: theme.placeholder, borderRadius: 8, marginBottom:10,marginLeft:10, marginRight:20 }}>
         <Picker
          mode="dropdown"
          selectedValue={financial}
          style={[styles.dropdown,{color: theme.activeTincolor}]}
          onValueChange={(itemValue, itemIndex) =>
            {setFinancialGoals(itemValue);
              setBussiness("");
              setFamilyGoals("");
            }
          }
        >
          <Picker.Item label="Reduce informal loans" value="Reduce informal loans" />
          <Picker.Item label="Repay loans on time" value="Repay loans on time" />
          <Picker.Item label="Start Savings" value="Start Savings" />
          <Picker.Item label="Increase Savings" value="Increase Savings" />
          <Picker.Item label="Start Investments" value="Start Investments" />
          <Picker.Item label="Increase Investments" value="Increase Investments" />
          <Picker.Item label="Take Life Insurance" value="Take Life Insurance" />
          <Picker.Item label="Take Health Insurance" value="Take Health Insurance" />
          <Picker.Item label="Invest in Mutual Funds" value="Invest in Mutual Funds" />
          <Picker.Item label="Invest in Gold " value="Invest in Gold" />
          <Picker.Item label="Invest in Real Estate" value="Invest in Real Estate" />
          <Picker.Item label="Invest in Other Business" value="Invest in Other Business " />
          <Picker.Item label="Invest in Cryptocurrency" value="Invest in Cryptocurrency" />
          <Picker.Item label="RReduce NPA" value="Reduce NPA" />
        </Picker>
         </View>}
        
         {/* <InputApp
          title={"Period"}
          marginTop={24}
          value={period}
          onChangeText={setPeriod}
          keyboardType={'numeric'}
        /> */}
         <Text style={{ marginLeft:10}}>Period</Text>
         <View
            style={{ ...Theme.flexRow , marginBottom:10 }}
          >
              <TextInput
                editable
                onChangeText={(value)=>{setPeriod(value);
                  dateChange();
               }}
                value={period}
                style={styles.textInput}
                keyboardType="number-pad"
              />
             <View  style={{marginLeft:60, paddingTop:50, }}>
               <TabBar
                  onChangeTab={(index) => {
               
                    setTabActive(index)}}
                  style={styles.tabBar}
                  tabs={["   Month     ", "   Year     ",]}
                />
                </View>
        </View>
        <Text style={{ marginLeft:10}}>Start Date </Text>
        <DatePicker
            style={styles.datePicker}
            date={fromDate}
            minDate={new Date()}
            // mode="date"
            // format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={SOURCE_ICON.calendar}
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 10,
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
              setFromDate(date);
              dateChange()
                     }}
          />
            
        <Text style={{ marginLeft:10}}>Due Date </Text>
        <TextInput
                editable={false}
                placeholder={"DD/MM/YYYY"}
                value={dueDate}
                style={styles.date}
                // keyboardType="number-pad"
              />
        <Text style={{ marginLeft:10}}>Reminder Frequency </Text>
     
        <TextInput
                editable={true}
                onChangeText={(value)=>{setRemainder(parseInt(value));
                 // console.log(remainder);
                  nxtReminder(parseInt(value));
                }}
                placeholder={"In Months"}
                value={remainder}
                style={styles.date}
                keyboardType="number-pad"
              />
              <Text style={{ marginLeft:10}}>Next Reminder Date </Text>
        <TextInput
                 editable={false}
                placeholder={"DD/MM/YYYY"}
                value={nextremainder}
                style={styles.date}
                // keyboardType="number-pad"
              />
             <Text style={{ marginLeft:10}}>Remarks </Text>
        <TextInput
                 editable
                onChangeText={(value)=>setRemarks(value)}
                value={remarks}
                style={styles.date}
                // keyboardType="number-pad"
              />
                <View
            style={{ ...Theme.flexRow, marginTop: 12, marginHorizontal: 24 }}
          >
            <ButtonBorder
              style={{ flex: 1, marginRight: 8 }}
              title={"Cancel"}
              onPress={onCancel}
              placeholder
            />
            <ButtonLinear
              white
              styleButton={{ flex: 1, marginLeft: 8 }}
              style={{ marginTop: 0 }}
              title={"Save"}
              onPress={()=>{
                {save()}
              }}
            /> 
          </View>
                   </View>   
                   </ScrollView>
      </Container>
     
  );
});

export default ConsultDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editPrice: {
    height: 48,
    marginRight: 20,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    width:320,
  },
  textInput:{
    height: 48,
    width:180,
    marginLeft:10,
    marginRight: 20,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 26,
  },
  tabBar: {
    marginTop:5,
    marginLeft:70,
    // marginHorizontal: 64,
    alignSelf: "center",
    position: "absolute",
  },
  date:{
    height: 48,
    marginLeft:10,
    marginRight: 20,
    marginBottom:8,
    borderColor:"#000000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  dropdown:{
    height: 48,
    marginRight: 20,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    width:320,
    fontFamily: "Mulish-Regular",
  },
  datePicker: {
    width: 310,
    height: 48,
    borderRadius: 8,
    borderColor: Colors.Isabelline,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 4,
    marginLeft:10,
  }, 
  
});
