import React, { Component } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ErrorsSignUp } from '../../store/auth/reducer';
import {
  signUp,
  resendActivationLink,
  updateField,
  updateActivationCodeField
} from '../../store/auth/actions';
import { StoreProps } from '../../types';
import DismissKeyboard from '../../components/DismissKeyboard';
import Button from '../../components/Button';

import styles from './styles';
import { FieldName, FieldData, FieldBackEndName, SIGN_UP_FIELD_DATA } from './data';

interface Props extends NavigationScreenProps<{}> {
  signUpSuccessText: string;
  activatedCodeSuccessText: string;
  emailResendLink: string;
  errorActivatedCode: string[];
  errors: ErrorsSignUp;
  signUp: (data: { email: string; password: string; firstName: string; lastName: string }) => any;
  resendActivationLink: (email: string) => any;
  updateField: (data: { key: string; keyValidation: string; value: string }) => void;
  updateActivationCodeField: (data: { value: string }) => void;
}

interface State {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const renderError = (error: string | null) =>
  error ? (
    <Text style={styles.error} key={error}>
      {error}
    </Text>
  ) : null;

class SignUpScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };
  }

  signUp = () => {
    Keyboard.dismiss();
    const { email, password, firstName, lastName } = this.state;
    this.props.signUp({ email, password, firstName, lastName });
  };

  resendLink = () => {
    Keyboard.dismiss();
    const { emailResendLink, resendActivationLink } = this.props;
    resendActivationLink(emailResendLink).then(() => {
      console.log('email send to your email: ', emailResendLink);
    });
  };

  isValidSignUp = () => {
    const { email, password, firstName, lastName } = this.state;

    return !(email.length && password.length && firstName.length && lastName.length);
  };

  onChange = (key: FieldName | 'emailResendLink', keyValidation?: FieldBackEndName) => (
    value: string
  ) => {
    const { errors, updateField, updateActivationCodeField } = this.props;

    if (keyValidation && errors[keyValidation] && value.length) {
      updateField({
        key,
        keyValidation,
        value
      });
    }

    if (key === 'emailResendLink') {
      updateActivationCodeField({ value });
    }

    this.setState<never>({
      [key]: value
    });
  };

  renderErrors = (fieldName: FieldBackEndName) =>
    (this.props.errors[fieldName] || []).map(renderError);

  renderFields = () => SIGN_UP_FIELD_DATA.map(this.renderField);

  renderField = (fieldData: FieldData) => {
    const { fieldName, fieldBackEndName, placeholder, secureTextEntry } = fieldData;
    const errors: string[] = this.props.errors[fieldBackEndName] || [];
    const value = this.state[fieldName];

    return (
      <React.Fragment key={fieldName}>
        {this.renderTextInput({
          fieldName,
          fieldBackEndName,
          errors,
          placeholder,
          value,
          secureTextEntry
        })}
        {this.renderErrors(fieldBackEndName)}
      </React.Fragment>
    );
  };

  renderTextInput = ({
    fieldName,
    fieldBackEndName,
    errors,
    placeholder,
    value,
    secureTextEntry
  }: {
    fieldName: FieldName | 'emailResendLink';
    errors: string | string[];
    placeholder: string;
    value: string;
    fieldBackEndName?: FieldBackEndName;
    secureTextEntry?: boolean;
  }) => {
    return (
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

  renderResendCode = () => {
    const { errorActivatedCode, emailResendLink, activatedCodeSuccessText } = this.props;

    if (activatedCodeSuccessText) {
      return <Text style={styles.text}>{activatedCodeSuccessText}</Text>;
    }

    return (
      <>
        <Text style={styles.text}>
          Please enter your registered e-mail address here so that we can resend you the activation
          link
        </Text>
        {this.renderTextInput({
          fieldName: 'emailResendLink',
          errors: errorActivatedCode,
          placeholder: 'E-mail',
          value: emailResendLink
        })}
        {errorActivatedCode.map(renderError)}
        <Button
          onPress={this.resendLink}
          disabled={!emailResendLink.length}
          label="Resend activation link"
        />
      </>
    );
  };

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          {this.renderSignUp()}

          <View style={styles.hr} />

          {this.renderResendCode()}
        </View>
      </DismissKeyboard>
    );
  }
}

export default connect(
  ({ auth }: StoreProps) => ({
    errors: auth.errorsSignUp,
    errorActivatedCode: auth.errorActivatedCode,
    signUpSuccessText: auth.signUpSuccessText,
    activatedCodeSuccessText: auth.activatedCodeSuccessText,
    emailResendLink: auth.emailResendLink
  }),
  {
    signUp,
    resendActivationLink,
    updateField,
    updateActivationCodeField
  }
)(SignUpScreen);
