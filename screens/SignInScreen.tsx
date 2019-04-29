import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";

import { login } from "../store/auth/actions";
import { StoreProps, iAction } from "../types";
import Auth from "../utils/Auth";
import DismissKeyboard from "../components/DismissKeyboard";

interface Props extends NavigationScreenProps<{}> {
  login: (login: string, password: string) => any;
  errors: string[];
}

interface State {
  email: string;
  password: string;
}

class SignInScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      email: "admin@gmail.com",
      password: "admin"
    };
  }

  signIn = () => {
    Keyboard.dismiss();
    const { email, password } = this.state;
    this.props.login(email, password).then((action: iAction) => {
      const {
        payload: { token }
      } = action;
      if (token) {
        Auth.setAuth(token);
        this.props.navigation.navigate("App");
      }
    });
  };

  onChangeEmail = (email: string) => this.setState({ email });

  onChangePassword = (password: string) => this.setState({ password });

  render() {
    const { email, password } = this.state;
    const { errors } = this.props;

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={this.onChangeEmail}
            value={email}
            placeholder="E-mail"
          />

          <TextInput
            style={styles.input}
            onChangeText={this.onChangePassword}
            secureTextEntry={true}
            value={password}
            placeholder="Password"
          />

          <TouchableOpacity onPress={this.signIn} style={styles.signIn}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>

          {errors.map(error => (
            <Text style={styles.error} key={error}>
              {error}
            </Text>
          ))}
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2374AB"
  },
  input: {
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: "#ffffff",
    marginVertical: 5
  },
  error: {
    color: "red"
  },
  signIn: {
    borderRadius: 3,
    borderColor: "white",
    borderWidth: 1,
    margin: 15
  },
  signInText: {
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 15
  }
});

export default connect(
  (state: StoreProps) => ({
    errors: state.auth.errors
  }),
  { login }
)(SignInScreen);
