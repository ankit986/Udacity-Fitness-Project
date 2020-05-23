import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import {purple, white, gray} from '../util/colors'
export default function Stepper({ unit, onIncrement, onDecrement, value, steps }) {
  return (
    <View style={[styles.row, {justifyContent:'space-between'}]} >
      <View style={{}}>
        <TouchableHighlight style={styles.buttonBackground} onPress={onIncrement} >
          <FontAwesome style={styles.buttonText} name='plus' size={30} color='blue' />
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight style={styles.buttonBackground} onPress={onDecrement} >
          <FontAwesome style={styles.buttonText} name='minus' size={30} color='blue' />
        </TouchableHighlight>
      </View>
      <View>

        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}} >{unit}</Text>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems:"center"
  },
  buttonBackground:{
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  buttonText:{
    color:purple,
    fontSize:22,
    textAlign:"center",
  }
})