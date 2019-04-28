import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  StyleSheet,
  Text
} from "react-native";

import Auth from "../utils/Auth";

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
    Auth.getUserToken().then(userToken => {
      console.log(userToken);
      this.props.navigation.navigate(userToken ? "App" : "Auth");
    });
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>AuthLoadingScreen</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
