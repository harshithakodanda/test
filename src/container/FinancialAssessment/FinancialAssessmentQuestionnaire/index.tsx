import React, { memo, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import { ScrollView } from "react-native-gesture-handler";
import SelectQuestion from "../SelectQuestions"; //add changes
import DoubleSelectQuestion from "../DoubleSelect"; //add changes
import SelectWithTextQuestion from "../SelectwithText"; //add changes
import ButtonLinear from "components/Buttons/ButtonLinear";
import ButtonBorder from "components/Buttons/ButtonBorder";
import Container from "components/Layout/Container";
import Theme from "style/Theme";
import ButtonIcon from "components/ButtonIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import axios from "axios";
import { getData, storeData } from "storage/store";
import { useNavigation } from "@react-navigation/native";
import { production } from "api/api";

const FinancialAssessmentQuestionnaire = memo(() => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [submit, setSubmit] = useState(false);
  const [answers, setAnswers] = useState({ ans_RevenueMode: "1",organizationId:0,customerId:0, ans_Years:0,ans_Months:0 });
  const headerAnimation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: headerAnimation.value * 255 }],
    };
  });
  const {navigate} = useNavigation();

  useEffect(() => {
  getData("userOrganizationProfileData").then(res=>{if(res){
    let ans=answers
    ans.organizationId=res.id
    setAnswers(ans)
  }})
  getData("userProfileData").then(res=>{if(res){
    let ans=answers
    ans.customerId=res.id
    setAnswers(ans)
  }})
    fetch(
     production.GetEnterpriseAssessment
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const updateAnswers = (id: any, value: any) => {
    setAnswers({ ...answers, [`ans_${id}`]: value });
  };

  const submitFalse = () => {
    setSubmit(false);
  };

  const handleSubmit = async () => {
    console.log(JSON.stringify(answers));

    if (Object.keys(answers).length == data.length+4) {
      setLoading(true)
    await  axios.post(
      production.PostEnterpriseAssessment,
        JSON.parse(JSON.stringify(answers))
      ) .then((res: any) => {
        storeData("financialWellnessAssessment",res.data)
        setLoading(false)
        navigate(Routes.FinancialAssessmentReport)
      })
      .catch((e: any) => console.log(e));
    } else {setSubmit(true);
    console.log(Object.keys(answers).length ,data.length+2)
    }
  };

  return (
    <Container style={styles.container}>
      <Animated.View style={[animatedStyles]}>
        <Text size={24} lineHeight={28} bold marginTop={40} marginLeft={20}>
          Financial Wellness Assessment
        </Text>
      </Animated.View>
      <View style={{ flex: 1, padding: 2 }}>
        {isLoading ? (
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center" }}
            color="#006ee6"
          />
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ScrollView>
              {data.map((questions, index) => {
                if (questions.inputType === "Select") {
                  return (
                    <SelectQuestion
                      answers={answers}
                      updateAnswers={updateAnswers}
                      key={index}
                      question={questions}
                      index={index}
                      submit={submit}
                      submitFalse={submitFalse}
                    />
                  );
                } else if (questions.inputType === "DoubleSelect") {
                  return (
                    <DoubleSelectQuestion
                      answers={answers}
                      updateAnswers={updateAnswers}
                      key={index}
                      question={questions}
                      index={index}
                      submit={submit}
                      submitFalse={submitFalse}
                    />
                  );
                } else if (questions.inputType === "SelectWithText") {
                  return (
                    <SelectWithTextQuestion
                      answers={answers}
                      updateAnswers={updateAnswers}
                      key={index}
                      question={questions}
                      index={index}
                      submit={submit}
                      submitFalse={submitFalse}
                    />
                  );
                }
              })}
               {submit && <Text style={{color:"red",textAlign:"center"}}>Please answer all the questions{"\n"}</Text>}

              <View
                style={{
                  ...Theme.flexRow,
                  marginTop: 48,
                  marginBottom:10,
                  marginHorizontal: 24,
                }}
              >
                {/* <ButtonBorder
              style={{ flex: 1, marginRight: 8 }}
              title={"Download"}
             // onPress={handleDownloadMessage}
              placeholder
            /> */}
                <ButtonLinear
                  white
                  styleButton={{ flex: 1, marginLeft: 8 }}
                  style={{ marginTop: 0 }}
                  title={"Submit"}
                  onPress={handleSubmit}
                  // onPress={handlePressMessage}
                />
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </Container>
  );
});

export default FinancialAssessmentQuestionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 20,
    width: 20,
  },
  btn: {
    flexDirection: "row",
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: "#979797",
    borderRadius: 3,
    borderWidth: 1,
  },
  backButton: {
    borderWidth: 1,
    borderColor: Colors.Platinum,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: Colors.BlueCrayola,
  },
  header: {
    paddingHorizontal: 24,
    // marginTop: getStatusBarHeight(true),
  },
  headerIcons: {
    ...Theme.flexRowSpace,
  },
});
