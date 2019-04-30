import React, { Component } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ErrorsSignUp } from '../../store/auth/reducer';
import { signUp, resendActivationLink } from '../../store/auth/actions';
import { SIGNUP_FAILED } from '../../store/auth/types';
import { iAction, StoreProps } from '../../types';
import DismissKeyboard from '../../components/DismissKeyboard';
import Button from '../../components/Button';

import styles from './styles';
import { FieldName, FieldData, FieldBackEndName, SIGN_UP_FIELD_DATA } from './data';

interface Props extends NavigationScreenProps<{}> {
  signUpSuccessText: string;
  signUp: (data: { email: string; password: string; firstName: string; lastName: string }) => any;
  resendActivationLink: (email: string) => any;
}

interface State {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  emailResendLink: string;
  errors: ErrorsSignUp;
}

class SignUpScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      email: 'dmacompton@gmail.com',
      password: 'admin',
      firstName: 'Dmitry',
      lastName: 'M',
      emailResendLink: 'some@mail.com',
      errors: {}
    };
  }

  signUp = () => {
    Keyboard.dismiss();
    const { email, password, firstName, lastName } = this.state;
    this.props.signUp({ email, password, firstName, lastName }).then((action: iAction) => {
      if (action.type === SIGNUP_FAILED) {
        this.setState({ errors: action.payload });
      }
    });
  };

  resendLink = () => {
    Keyboard.dismiss();
    const { emailResendLink } = this.state;
    this.props.resendActivationLink(emailResendLink).then(() => {
      console.log('email send to your email: ', emailResendLink);
    });
  };

  isValidSignUp = () => {
    const { email, password, firstName, lastName } = this.state;

    return !(email.length && password.length && firstName.length && lastName.length);
  };

  onChange = (key: FieldName, keyValidation?: FieldBackEndName) => (value: string) => {
    this.setState<never>(() => {
      const { errors } = this.state;

      if (keyValidation && errors[keyValidation] && value.length) {
        return {
          [key]: value,
          errors: {
            ...errors,
            [keyValidation]: []
          }
        };
      }

      return {
        [key]: value
      };
    });
  };

  renderErrors = (fieldName: FieldBackEndName) => {
    const errors = this.state.errors[fieldName] || [];

    return errors.map(error => (
      <Text style={styles.error} key={error}>
        {error}
      </Text>
    ));
  };

  renderFields = () => SIGN_UP_FIELD_DATA.map(this.renderField);

  renderField = (fieldData: FieldData) => {
    const { fieldName, fieldBackEndName, placeholder, secureTextEntry } = fieldData;
    const errors = this.state.errors[fieldBackEndName];
    const value = this.state[fieldName];

    return (
      <React.Fragment key={fieldName}>
        <TextInput
          style={{
            ...styles.input,
            ...(errors && errors.length ? styles.inputError : {})
          }}
          onChangeText={this.onChange(fieldName, fieldBackEndName)}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
        />
        {this.renderErrors(fieldBackEndName)}
      </React.Fragment>
    );
  };

  renderSignUp = () => {
    const { signUpSuccessText } = this.props;

    if (signUpSuccessText) {
      return <Text style={styles.text}>{signUpSuccessText}</Text>;
    }

    return (
      <>
        {this.renderFields()}

        <Button onPress={this.signUp} label="Sign Up" disabled={this.isValidSignUp()} />
      </>
    );
  };

  render() {
    const { emailResendLink } = this.state;

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          {this.renderSignUp()}

          <View style={styles.hr} />

          <Text style={styles.text}>
            Please enter your registered e-mail address here so that we can resend you the
            activation link
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={this.onChange('emailResendLink')}
            value={emailResendLink}
            placeholder="E-mail"
          />
          <Button onPress={this.resendLink} label="Resend activation link" />
        </View>
      </DismissKeyboard>
    );
  }
}

export default connect(
  (state: StoreProps) => ({
    signUpSuccessText: state.auth.signUpSuccessText
  }),
  { signUp, resendActivationLink }
)(SignUpScreen);
