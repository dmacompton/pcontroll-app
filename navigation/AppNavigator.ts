import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      App: MainTabNavigator,
      AuthLoading: AuthLoadingScreen,
      Auth: AuthNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
