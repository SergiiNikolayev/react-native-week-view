import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import memoizeOne from 'memoize-one';

import Event from '../Event/Event';
import {
  TIME_LABEL_HEIGHT,
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  calculateDaysArray,
  DATE_STR_FORMAT,
  availableNumberOfDays,
} from '../utils';

import styles, { CONTENT_OFFSET } from './Events.styles';

const MINUTES_IN_HOUR = 60;
const EVENT_HORIZONTAL_PADDING = 15;
const EVENTS_CONTAINER_WIDTH = CONTAINER_WIDTH - EVENT_HORIZONTAL_PADDING;
const MIN_ITEM_WIDTH = 4;

const areEventsOverlapped = (event1, event2) => {
  // return moment(event1.endDate).isSameOrAfter(event2.startDate);
  return moment(event1.endDate).isAfter(event2.startDate);
};

class Events extends PureComponent {
  getStyleForEvent = (item) => {
    const { isAllday } = this.props;

    const startDate = moment(item.startDate);
    const endDate = moment(item.endDate);
    const startHours = startDate.hours();
    const startMinutes = startDate.minutes();
    const totalStartMinutes = startHours * MINUTES_IN_HOUR + startMinutes;
    const top = this.minutesToYDimension(totalStartMinutes);
    const deltaMinutes = moment(item.endDate).diff(item.startDate, 'minutes');
    const height = this.minutesToYDimension(isAllday ? 60 : deltaMinutes);
    const width = this.getEventItemWidth();

    if (item.eventActualEndDate && isAllday) {
      // const start = startDate.isSame(item.eventActualEndDate, 'days');
      const isEndOfEvent = endDate.isSame(item.eventActualEndDate, 'days');

      if (isEndOfEvent) {
        return {
          top: top + 4,
          left: 0,
          height: height - 8,
          width: width - 8,
        };
      }

      return {
        top: top + 4,
        left: 0,
        height: height - 8,
        width: EVENTS_CONTAINER_WIDTH,
      };
    }

    return {
      top: top + CONTENT_OFFSET + 4,
      left: 5,
      height: height - 8,
      width: width - 6,
      borderRadius: 5,
    };
  };

  addOverlappedToArray = (baseArr, overlappedArr, itemWidth) => {
    // Given an array of overlapped events (with style), modifies their style to overlap them
    // and adds them to a (base) array of events.
    const nOverlapped = overlappedArr.length;
    if (nOverlapped === 1) {
      baseArr.push(overlappedArr[0]);
    } else {
      const dividedWidth = itemWidth / nOverlapped;
      const horizontalPadding = 3;
      overlappedArr.forEach((overlappedEventWithStyle, index) => {
        const { data, style } = overlappedEventWithStyle;
        baseArr.push({
          data,
          style: {
            ...style,
            width: Math.max(dividedWidth - horizontalPadding, MIN_ITEM_WIDTH),
            left: dividedWidth * index,
          },
        });
      });
    }
  };

  getEventsWithPosition = (totalEvents) => {
    const regularItemWidth = this.getEventItemWidth();

    return totalEvents.map((events) => {
      let overlappedSoFar = []; // Store events overlapped until now
      const eventsWithStyle = events.reduce((eventsAcc, event) => {
        const style = this.getStyleForEvent(event);
        const eventWithStyle = {
          data: event,
          style,
        };

        const nSoFar = overlappedSoFar.length;
        const lastEventOverlapped =
          nSoFar > 0 ? overlappedSoFar[nSoFar - 1] : null;
        if (
          !lastEventOverlapped ||
          areEventsOverlapped(lastEventOverlapped.data, event)
        ) {
          overlappedSoFar.push(eventWithStyle);
        } else {
          this.addOverlappedToArray(
            eventsAcc,
            overlappedSoFar,
            regularItemWidth,
          );
          overlappedSoFar = [eventWithStyle];
        }
        return eventsAcc;
      }, []);
      this.addOverlappedToArray(
        eventsWithStyle,
        overlappedSoFar,
        regularItemWidth,
      );
      return eventsWithStyle;
    });
  };

  minutesToYDimension = (minutes) => {
    const { hoursInDisplay } = this.props;
    const minutesInDisplay = MINUTES_IN_HOUR * hoursInDisplay;
    return (minutes * CONTAINER_HEIGHT) / minutesInDisplay;
  };

  yToHour = (y) => {
    const { hoursInDisplay } = this.props;
    const hour = (y * hoursInDisplay) / CONTAINER_HEIGHT;
    return hour;
  };

  getEventItemWidth = () => {
    const { numberOfDays } = this.props;
    return EVENTS_CONTAINER_WIDTH / numberOfDays;
  };

  processEvents = memoizeOne((eventsByDate, initialDate, numberOfDays) => {
    // totalEvents stores events in each day of numberOfDays
    // example: [[event1, event2], [event3, event4], [event5]], each child array
    // is events for specific day in range
    const dates = calculateDaysArray(initialDate, numberOfDays);
    const totalEvents = dates.map((date) => {
      const dateStr = date.format(DATE_STR_FORMAT);
      return eventsByDate[dateStr] || [];
    });
    const totalEventsWithPosition = this.getEventsWithPosition(totalEvents);
    return totalEventsWithPosition;
  });

  onGridClick = (event, dayIndex) => {
    const { initialDate, onGridClick } = this.props;
    if (!onGridClick) {
      return;
    }
    const { locationY } = event.nativeEvent;
    const hour = Math.floor(this.yToHour(locationY - CONTENT_OFFSET));

    const date = moment(initialDate).add(dayIndex, 'day').toDate();

    onGridClick(event, hour, date);
  };

  render() {
    const {
      eventsByDate,
      initialDate,
      numberOfDays,
      times,
      onEventPress,
      eventContainerStyle,
      eventTextStyle,
      EventComponent,
      isAllday,
    } = this.props;
    const totalEvents = this.processEvents(
      eventsByDate,
      initialDate,
      numberOfDays,
    );

    return (
      <View style={isAllday ? styles.allDayContainer : styles.container}>
        {times.map((time) => (
          <View
            key={time}
            style={[styles.timeRow, { height: TIME_LABEL_HEIGHT }]}
          >
            <View style={styles.timeLabelLine} />
          </View>
        ))}
        <View style={styles.events}>
          {totalEvents.map((eventsInSection, dayIndex) => (
            <TouchableWithoutFeedback
              onPress={(e) => this.onGridClick(e, dayIndex)}
              key={dayIndex}
            >
              <View style={isAllday ? styles.eventAllDay : styles.event}>
                {eventsInSection.map((item) => (
                  <Event
                    key={item.data.id}
                    event={item.data}
                    isAllday={isAllday}
                    position={item.style}
                    onPress={onEventPress}
                    EventComponent={EventComponent}
                    containerStyle={eventContainerStyle}
                    eventTextStyle={eventTextStyle}
                  />
                ))}
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    );
  }
}

Events.propTypes = {
  numberOfDays: PropTypes.oneOf(availableNumberOfDays).isRequired,
  eventsByDate: PropTypes.objectOf(PropTypes.arrayOf(Event.propTypes.event))
    .isRequired,
  initialDate: PropTypes.string.isRequired,
  hoursInDisplay: PropTypes.number.isRequired,
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEventPress: PropTypes.func,
  onGridClick: PropTypes.func,
  eventContainerStyle: PropTypes.object,
  eventTextStyle: PropTypes.object,
  EventComponent: PropTypes.elementType,
  isAllday: PropTypes.bool,
};

export default Events;
