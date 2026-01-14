import AsyncStorage from '@react-native-async-storage/async-storage';

const saveDataLocal = async (key:string, value:any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log(`${key} saved successfully`);
    }catch (error){
        console.error(`Failed to save ${key}`, error);
    }
};

const getDataLocal = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Failed to retrieve ${key}`, error);
  }
};

const removeDataLocal = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`${key} removed successfully`);
  } catch (error) {
    console.error(`Failed to remove ${key}`, error);
  }
};

export default {
  saveDataLocal,
  getDataLocal,
  removeDataLocal,
};