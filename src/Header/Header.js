import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import {
  getFormattedDate,
  calculateDaysArray,
  availableNumberOfDays,
} from '../utils';
import styles from './Header.styles';

const getDayTextStyles = (numberOfDays) => {
  const fontSize = numberOfDays === 7 ? 12 : 14;
  return {
    fontSize,
  };
};

const Column = ({ column, numberOfDays, format, style, textStyle }) => {
  let text = getFormattedDate(column, format);

  if (format === 'dddd MMMM, D') {
    const dayOfTheWeek = text.split(' ', 1);
    const space = ' ';
    const monthDay = text.replace(`${dayOfTheWeek}${space}`, '');

    text = (
      <View style={styles.dateWrapper}>
        <Text style={styles.dayOfTheWeek}>{dayOfTheWeek}</Text>
        <Text style={styles.monthDay}>{monthDay}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.column, style]}>
      <Text
        style={[
          { color: style.color },
          getDayTextStyles(numberOfDays),
          textStyle,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const Columns = ({ columns, numberOfDays, format, style, textStyle }) => {
  return (
    <View style={styles.columns}>
      {columns.map((column) => {
        return (
          <Column
            style={style}
            textStyle={textStyle}
            key={column}
            column={column}
            numberOfDays={numberOfDays}
            format={format}
          />
        );
      })}
    </View>
  );
};

const WeekViewHeader = ({
  numberOfDays,
  initialDate,
  formatDate,
  style,
  textStyle,
}) => {
  const columns = calculateDaysArray(initialDate, numberOfDays);
  return (
    <View style={styles.container}>
      {columns && (
        <Columns
          format={formatDate}
          columns={columns}
          numberOfDays={numberOfDays}
          style={style}
          textStyle={textStyle}
        />
      )}
    </View>
  );
};

WeekViewHeader.propTypes = {
  numberOfDays: PropTypes.oneOf(availableNumberOfDays).isRequired,
  initialDate: PropTypes.string.isRequired,
  formatDate: PropTypes.string,
  style: PropTypes.object,
  textStyle: PropTypes.object,
};

WeekViewHeader.defaultProps = {
  formatDate: 'MMM D',
};

export default React.memo(WeekViewHeader);
