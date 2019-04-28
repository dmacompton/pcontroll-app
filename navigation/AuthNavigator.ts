import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { isIOS } from "../constants";
import SignInScreen from "../screens/SignInScreen";

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default AuthStack;
