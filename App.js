import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput } from 'react-native-elements';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDNg7Yvip2uARARUtmWgPkiGlZRaA9V06M',
      authDomain: 'nycda-b7787.firebaseapp.com',
      databaseURL: 'https://nycda-b7787.firebaseio.com',
      storageBucket: 'nycda-b7787.appspot.com'
    };
    firebase.initializeApp(firebaseConfig);
  }

  onLoginPress() {
    this.setState({
      error: '',
      loading: true
    });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: '',
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          error: 'Authentication failed',
          loading: false
        });
      });
  }

  onSignUpPress() {
    this.setState({
      error: '',
      loading: true
    });
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: '',
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          error: 'Authentication failed',
          loading: false
        });
      });
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text> Loading </Text>;
    }
    return (
      <View>
        <Button onPress={this.onLoginPress.bind(this)} title="Login" />
        <Button onPress={this.onSignUpPress.bind(this)} title="Sign up" />
      </View>
    );
  }

  render() {
    return (
      <View>
        <Text>Hello</Text>
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.email}
          autoCorrect={false}
          autoCapitalize={'none'}
          onChangeText={email => this.setState({ email })}
          placeholder="nate@nycda.com"
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          value={this.state.password}
          autoCorrect={false}
          autoCapitalize={'none'}
          secureTextEntry
          placeholder="*****"
          onChangeText={password => this.setState({ password })}
        />
        <Text>{this.state.error}</Text>
        {this.renderButtonOrLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
