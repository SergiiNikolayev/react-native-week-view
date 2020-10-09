import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { getCurrentMonth, availableNumberOfDays } from '../utils';
import styles from './Title.styles';

const getFontSizeHeader = (numberOfDays) => {
  if (numberOfDays > 1) {
    return 12;
  }
  return 16;
};

const Title = ({
  style,
  showTitle,
  showCustomTitleText,
  customTitleText,
  numberOfDays,
  selectedDate,
  textStyle,
}) => {
  return (
    <View style={[styles.title, style]}>
      {showTitle ? (
        <Text
          style={[
            {
              color: style.color,
              fontSize: getFontSizeHeader(numberOfDays),
              textAlign: 'center',
            },
            textStyle,
          ]}
        >
          {showCustomTitleText &&
            (customTitleText || getCurrentMonth(selectedDate))}
        </Text>
      ) : null}
    </View>
  );
};

Title.propTypes = {
  showTitle: PropTypes.bool,
  showCustomTitleText: PropTypes.bool,
  customTitleText: PropTypes.string,
  numberOfDays: PropTypes.oneOf(availableNumberOfDays).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  style: PropTypes.object,
  textStyle: PropTypes.object,
};

export default React.memo(Title);
