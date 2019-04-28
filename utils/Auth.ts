import { AsyncStorage } from "react-native";

const getUserToken = async () => {
  return await AsyncStorage.getItem("userToken");
};
const clearAuth = async () => {
  return await AsyncStorage.clear();
};
const setAuth = async () => {
  return await AsyncStorage.setItem("userToken", "abc");
};

export default {
  getUserToken,
  clearAuth,
  setAuth
};
