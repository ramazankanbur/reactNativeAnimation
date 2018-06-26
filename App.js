import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ClapButton from './components/clapsButton';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
         <ClapButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fde3a7'
  },
});
