import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Slider,
  Image
} from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducers from './reducers'
import AddEntry from './components/AddEntry'
import History from './components/History'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{flex:1}} >
          <Text>Test Aewa</Text>
          {/* <AddEntry /> */}
          <History />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: '100%',
    backgroundColor: '#aff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  slider: {
    width: '100%'
  }
});
