import AsyncStorage from '@react-native-async-storage/async-storage';

 export const storeData = async (item,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(item, jsonValue)
    //  console.log(item,jsonValue.substring(0,100))
    } catch (e) {
      console.log(e)
    }
  }

  export const getData = async (item) => {
    try {
      const jsonValue = await AsyncStorage.getItem(item)
      // if(jsonValue)console.log(item)
      // else console.log("culprit",item)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e) 
    }
  }

  export const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }