import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './Times.styles';
import moment from 'moment';
import { TIME_LABEL_HEIGHT } from '../utils';

const Times = ({ times, textStyle, hourContainerTextStyle }) => {
  return (
    <View style={styles.columnContainer}>
      {times.map((time) => (
        <View key={time} style={[styles.label, { height: TIME_LABEL_HEIGHT }, hourContainerTextStyle]}>
          <Text style={[styles.text, textStyle]}>{moment(time,'h:mm a').format('h A')}</Text>
        </View>
      ))}
    </View>
  );
};

Times.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default React.memo(Times);
