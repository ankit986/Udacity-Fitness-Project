import React from 'react';
import { View, StyleSheet , Text} from 'react-native';
import { getMetricMetaInfo } from '../util/helper'
import DateHeader from '../util/DateHeader';
import { gray } from '../util/colors'
export default function MetricCard({ formattedDate, metrics }) {
    return (
        <View>
            {formattedDate && <View><DateHeader date={formattedDate} /></View>}
            {Object.keys(metrics).map(metric => {
                const { getIcon, displayName, unit } = getMetricMetaInfo(metric)
                console.log("getIcon", displayName,unit)
                return (
                    <View style={styles.metric} key={metric} >
                        {getIcon()}
                        <View >
                            <Text style={{ fontSize: 20 }}>
                                {displayName}
                            </Text>
                            <Text style={{ fontSize: 16, color: gray }}>
                                {metrics[metric]} {unit}
                            </Text>
                        </View>
                    </View >
                )
            })}
        </View >
    )
}


const styles = StyleSheet.create({
    metric: {
        flexDirection: 'row',
        marginTop: 12
    },
}) 