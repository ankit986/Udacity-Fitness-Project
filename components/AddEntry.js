import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyRemainderValue } from '../util/helper'
import ProjectSlider from './ProjectSlider';
import Stepper from './Stepper';
import DateHeader from '../util/DateHeader'
import TextButton from './TextButton'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { removeEntry, submitEntry } from "../util/api";
import { connect } from 'react-redux'
import { addEntry } from '../actions/entry'
import { purple, white } from '../util/colors'

function SubmitBtn({ onPress }) {
    return (
        <TouchableHighlight style={styles.submitBtn} onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableHighlight>
    )
}

class AddEntry extends Component {

    state = {
        bike: 0,
        run: 0,
        swim: 0,
        eat: 0,
        sleep: 0,
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }
    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] - step
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState({
            [metric]: value
        })
    }

    reset = () => {
        const key = timeToString()
        removeEntry(key)
        this.props.dispatch(addEntry({
            [key]: getDailyRemainderValue()
        }))
    }

    submit = () => {
        
        const key = timeToString()
        
        

        const entries = this.state
        

        this.props.dispatch(addEntry({
            [key]: entries
        }))

        this.setState({
            bike: 0,
            run: 0,
            swim: 0,
            eat: 0,
            sleep: 0,
        })

        submitEntry({key, entries})
    }

    render() {
        const metaInfo = getMetricMetaInfo();

        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons name='ios-happy' size={100} />
                    <Text style={{paddingBottom:10, paddingTop:10}}>You Have Successfully Added Your Todays fitness details</Text>
                    <TextButton onPress={this.reset} >Reset</TextButton>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'slider'
                                ? <ProjectSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                />
                                : <Stepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />

            </View>
        )
    }
}


function mapStateToProps(state) {
    const key = timeToString();
    
    return {
        alreadyLogged: state[key] && state[key].today === undefined
    }
}

export default connect(mapStateToProps)(AddEntry)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    submitBtn: {
        backgroundColor: purple,
        padding: 5,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: "center"
    },

    center:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    }
})