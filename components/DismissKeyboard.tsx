import React from 'react';

import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface Props {
  children?: Array<React.ReactChild> | React.ReactChild;
}

const DismissKeyboard = ({ children }: Props) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
);

export default DismissKeyboard;
