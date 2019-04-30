import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2374AB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hr: {
    width: '80%',
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  },
  input: {
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  inputError: {
    backgroundColor: '#ffa7a3',
    borderColor: 'red'
  },
  error: {
    color: 'red'
  },
  resendLink: {
    width: 200
  },
  text: {
    width: '80%',
    color: '#fff',
    margin: 10
  },
  button: {
    alignItems: 'center',
    margin: 10,
    width: 100
  },
  buttonText: {
    color: '#fff',
    textDecorationLine: 'underline',
    paddingVertical: 10,
    paddingHorizontal: 15
  }
});

export default styles;
