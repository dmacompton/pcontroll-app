import React from "react";
import { Button, StyleSheet, View } from "react-native";

import Auth from "../utils/Auth";

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = () => {
    Auth.setAuth();

    Auth.getUserToken().then(p => {
      if (p) {
        this.props.navigation.navigate("App");
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
