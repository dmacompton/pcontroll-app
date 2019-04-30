import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { signIn } from '../store/auth/actions';
import { StoreProps, iAction } from '../types';
import Auth from '../utils/Auth';
import DismissKeyboard from '../components/DismissKeyboard';
import Button from '../components/Button';

interface Props extends NavigationScreenProps<{}> {
  signIn: (data: { email: string; password: string }) => any;
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
      email: 'admin@gmail.com',
      password: 'admin'
    };
  }

  signUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  signIn = () => {
    Keyboard.dismiss();
    const { email, password } = this.state;
    this.props.signIn({ email, password }).then((action: iAction) => {
      const {
        payload: { token }
      } = action;
      if (token) {
        Auth.setAuth(token);
        this.props.navigation.navigate('App');
      }
    });
  };

  onChange = (key: 'email' | 'password') => (value: string) => {
    this.setState({ [key]: value } as Pick<State, keyof State>);
  };

  render() {
    const { email, password } = this.state;
    const { errors } = this.props;

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.smallBlock} />
          <View style={styles.mainBlock}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
            </View>

            <TextInput
              style={styles.input}
              onChangeText={this.onChange('email')}
              value={email}
              placeholder="E-mail"
            />

            <TextInput
              style={styles.input}
              onChangeText={this.onChange('password')}
              secureTextEntry={true}
              value={password}
              placeholder="Password"
            />

            <Button onPress={this.signIn} label="Sign In" />

            {errors.map(error => (
              <Text style={styles.error} key={error}>
                {error}
              </Text>
            ))}
          </View>
          <View style={styles.smallBlock}>
            <TouchableOpacity onPress={this.signUp} style={styles.signUp}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2374AB'
  },
  smallBlock: {
    height: '10%',
    alignItems: 'center'
  },
  mainBlock: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginVertical: 5
  },
  error: {
    color: 'red'
  },
  signUp: {
    alignItems: 'center',
    margin: 10,
    width: 100
  },
  signUpText: {
    color: '#fff',
    textDecorationLine: 'underline',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50
  },
  logoImage: {
    width: 142,
    height: 85,
    resizeMode: 'contain'
  }
});

export default connect(
  (state: StoreProps) => ({
    errors: state.auth.errors
  }),
  { signIn }
)(SignInScreen);
