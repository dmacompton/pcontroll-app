import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ExpoConfigView } from "@expo/samples";

import Auth from "../utils/Auth";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  logout = () => {
    Auth.clearAuth();
    this.props.navigation.navigate("Auth");
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logout} style={styles.helpLink}>
          <Text style={styles.helpLinkText}>Logout</Text>
        </TouchableOpacity>
        <ExpoConfigView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
    backgroundColor: "red",
    borderRadius: 3,
    padding: 14
  }
});
