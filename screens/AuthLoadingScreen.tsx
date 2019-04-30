import React from 'react';
import { ActivityIndicator, StatusBar, View, StyleSheet, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import Auth from '../utils/Auth';

interface Props extends NavigationScreenProps {}

export default class AuthLoadingScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = () => {
    Auth.getUserToken().then(userToken => {
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    });
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>AuthLoadingScreen</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
