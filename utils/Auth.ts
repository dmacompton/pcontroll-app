import { AsyncStorage } from "react-native";

const getUserToken = async () => {
  return await AsyncStorage.getItem("userToken");
};

const clearAuth = async () => {
  return await AsyncStorage.clear();
};

const setAuth = async (token: string) => {
  return await AsyncStorage.setItem("userToken", token);
};

export default {
  getUserToken,
  clearAuth,
  setAuth
};


// get asyncstorage showAsyncStorageContentInDev()
