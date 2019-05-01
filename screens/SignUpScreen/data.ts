export type FieldName = 'email' | 'password' | 'firstName' | 'lastName';

export type FieldData = {
  fieldName: FieldName;
  fieldBackEndName: FieldBackEndName;
  placeholder: string;
  secureTextEntry?: boolean;
};

export type FieldBackEndName =
  | 'email'
  | 'password'
  | 'first_name'
  | 'last_name'
  | 'emailResendLink';

export const SIGN_UP_FIELD_DATA: FieldData[] = [
  {
    fieldName: 'firstName',
    fieldBackEndName: 'first_name',
    placeholder: 'First name'
  },
  {
    fieldName: 'lastName',
    fieldBackEndName: 'last_name',
    placeholder: 'Last name'
  },
  {
    fieldName: 'email',
    fieldBackEndName: 'email',
    placeholder: 'E-mail'
  },
  {
    fieldName: 'password',
    fieldBackEndName: 'password',
    placeholder: 'Password',
    secureTextEntry: true
  }
];
