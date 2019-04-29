import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Auth from "../utils/Auth";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { logout } from "../store/auth/actions";

interface Props extends NavigationScreenProps<{}> {
  logout: () => void;
  errors: string[];
}

class SettingsScreen extends React.Component<Props> {
  static navigationOptions = {
    title: "Settings"
  };

  logout = () => {
    this.props.logout();
    this.props.navigation.navigate("Auth");
    Auth.clearAuth();
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logout} style={styles.signOut}>
          <Text style={styles.signOutText}>Logout</Text>
        </TouchableOpacity>
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
  signOut: {
    borderRadius: 3,
    borderColor: "red",
    borderWidth: 1,
    margin: 10
  },
  signOutText: {
    color: "red",
    paddingVertical: 10,
    paddingHorizontal: 15
  }
});

export default connect(
  () => ({}),
  { logout }
)(SettingsScreen);
