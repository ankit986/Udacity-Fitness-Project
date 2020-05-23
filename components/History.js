import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { timeToString, getDailyRemainderValue } from "../util/helper";
import { fetchCalenderResults } from "../util/api";
import { receiveEntries, addEntry } from '../actions/entry';
import UdaciFitnessCalendar from 'react-native-calendars'
import { white } from '../util/colors';
import DateHeader from '../util/DateHeader';
import MetricCard from './MetricCard';
import { AppLoading } from 'expo'


class History extends Component {
  state = {
    laoding: true
  }

  componentDidMount() {
    const { dispatch } = this.props
    fetchCalenderResults()
      .then((entries) => {
        return dispatch(receiveEntries(entries))
      })
      .then(({ entries }) => {
        console.log(entries)
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyRemainderValue()
          }))
        }
      })
      .then(() => this.setState(() => ({ laoding: false })))
  }

  renderEmptyDate({ formattedDate }) {
    return (
      <View style={styles.items}>
        <DateHeader date={formattedDate} />
        <Text style={styles.noDataText}>
          You Didn't logged any data for this.
        </Text>
      </View>
    )
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => {
    return (
      <View>
        {today
          ? <View style={styles.item}>
            <DateHeader data={formateDate} />
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </View>
          : <TouchableOpacity onPress={() => { console.log('onpress') }}>
            <MetricCard formattedDate={formattedDate} metrics={metrics} />
          </TouchableOpacity>}
      </View>
    )
  }



  render() {
    const { entries } = this.props

    if (this.state.laoding === true) {
      return <AppLoading />
    }

    return (
      <View>
        <UdaciFitnessCalendar
          items={entries}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})


function mapStateToProps(entries) {

  return {
    entries
  }
}

export default connect(
  mapStateToProps,
)(History)