import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Event.styles';

const Event = ({
   event,
   onPress,
   position,
   EventComponent,
   eventTextStyle,
   containerStyle,
   isAllday,
 }) => {
  const parseDescription = () => {
    const a = event.description.split(' ')
    const secondSpace = 2
    const eventTime = a.slice(0, secondSpace).join(' ')
    const eventDescription =  a.slice(secondSpace).join(' ');

    return <View>
      <Text
        style={[
          styles.descriptionTime,
          eventTextStyle && eventTextStyle,
          {
            color: event.textColor,
          },
        ]}>{eventTime}</Text>
      <Text
        style={[
          styles.description,
          eventTextStyle && eventTextStyle,
          {
            color: event.textColor,
          },
        ]}>{eventDescription}</Text>
    </View>
  }

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(event)}
      style={[
        styles.item,
        position,
        {
          backgroundColor: event.color,
        },
        containerStyle,
      ]}
      disabled={!onPress}
    >
      {EventComponent ? (
          <EventComponent event={event} position={position}/>
        ) :
        isAllday ?
          (<Text
              style={[
                styles.description,
                eventTextStyle && eventTextStyle,
                {
                  color: event.textColor,
                },
              ]}
            >
              {event.description}
            </Text>
          )
          : parseDescription()
      }
    </TouchableOpacity>
  );
};

const eventPropType = PropTypes.shape({
  color: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
});

const positionPropType = PropTypes.shape({
  height: PropTypes.number,
  width: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
});

Event.propTypes = {
  event: eventPropType.isRequired,
  onPress: PropTypes.func,
  isAllday: PropTypes.bool,
  position: positionPropType,
  containerStyle: PropTypes.object,
  eventTextStyle: PropTypes.object,
  EventComponent: PropTypes.elementType,
};

export default Event;
