import React, { memo, useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,ActivityIndicator,Modal
} from "react-native";
import Text from "components/Text";
import Container from "components/Layout/Container";
import Theme from "style/Theme";
import ButtonIcon from "components/ButtonIcon";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { QUIZQUESTIONS} from "configs/Data";
import { width } from "configs/Const";
import Questions from "./Questions";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { TouchableOpacity } from "react-native-gesture-handler";

const FreeConsultsItem = memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [submit, setSubmit] = useState(false);
  const [count, setCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // const headerAnimation = useSharedValue(0);
  const submitFalse = () => {
    setSubmit(true);
    console.log("submit Hello")
  };
  useFocusEffect(
    React.useCallback(() => {
      setData(QUIZQUESTIONS);
      setLoading(false);
      // console.log(questions)
      //setHealthFeed(HEALTH_FEED_DATA);
    }, [])
  );

    const submitList = ()=>{
      console.log(answers)
    var a = 0;
      for (let answer of answers) {
        if(answer.correct){
          a=a+1
        }
    }
    setModalVisible(true)
    setCount(a)
    // alert ("Score : "+ a +" / 19")
  };

  const closeModal = ()=>{
    setModalVisible(false)
  }

  const setValue = (_id: any, value:any, correct:any) => {
    const someObject = answers.some(item => item.id === _id);
    if(someObject){
      const newList = answers.filter((item) => item.id !== _id);  
      setAnswers([...newList, {id:`${_id}`, text:value, correct:correct}])
    }else{
    setAnswers([...answers, {id:`${_id}`, text:value, correct:correct}]);
  }
   }

  return (
    <Container>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>Your have Scored  {count} </Text>
          {(count >= 14 ) &&  <Text style={styles.modalText}> Excellent </Text>}
          {(count < 14 && count >= 10 ) && <Text style={styles.modalText}> Good </Text>}
          {(count < 10 && count >= 5 ) && <Text style={styles.modalText}> Average </Text>}
          {(count < 5 && count >= 0 ) && <Text style={styles.modalText}> Poor </Text>}
            <ButtonLinear
           white
           title={"CLOSE"}
           style={styles.buttonClose}
          onPress={closeModal}
            /> 
              {/* <Text style={styles.textStyle}>Close</Text> */}
            
          </View>
        </View>
      </Modal>
      </View>
      <View style={{ flex: 1, padding: 2 }}>
      {isLoading ? (
        <ActivityIndicator
          style={{ flex: 1, alignSelf: "center", alignContent: 'center',}}
          color="#006ee6"
        />
      ) : (        
        <View>
          {data.map((item, index) => (
          <Questions
            key={index}
            question={item}
            index={index}
            submit={submit}
            submitFalse={submitFalse}
            setValue = {setValue}
          />
        ))}
        
        </View>
      )} 
      </View>
      <View>
     </View>
     <ButtonLinear
           white
           title={"SUBMIT"}
           style={styles.buttonLinear}
          onPress={submitList}
            /> 
    </Container>
  );
});

export default FreeConsultsItem;

const styles = StyleSheet.create({
  container: {
    width: width - 48,
    borderRadius: 16,
    marginRight: 12,
    ...Theme.shadow,
    marginBottom: 16,
  },
  image: {
    width: width - 48,
    height: ((width - 48) * 1 * 150) / 224,
    borderRadius: 16, // add changes
  },
  title: {
    position: "absolute",
    bottom: 12,
    left: 12,
    zIndex: 11,
  },
  linear: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  contentStyle: {
    paddingLeft: 24,
    marginTop: 24,
  },
  item: {
    ...Theme.flexRow,
    paddingVertical: 16,
  },
  contentContainerStyle: {
    paddingVertical: 18,
    paddingHorizontal: 16,
  }, 
  buttonLinear: {
    marginHorizontal: 10,
    width: width * 0.86,
    alignSelf: 'center',
  },
  buttonClose: {
    marginHorizontal: 10,
    width: width * 0.30,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#808080",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 3
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,

  }
 
});
