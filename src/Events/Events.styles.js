import { StyleSheet } from 'react-native';
import { CONTAINER_WIDTH } from '../utils';

const GREY_COLOR = '#E9EDF0';
export const CONTENT_OFFSET = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: CONTAINER_WIDTH,
    paddingTop: 0,
  },
  allDayContainer: {
    flex: 1,
    width: CONTAINER_WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: GREY_COLOR,
  },
  timeRow: {
    flex: 0,
  },
  timeLabelLine: {
    height: 1,
    backgroundColor: GREY_COLOR,
    position: 'absolute',
    right: 0,
    left: 0,
    paddingTop: -CONTENT_OFFSET,
  },
  event: {
    flex: 1,
    overflow: 'hidden',
    borderColor: GREY_COLOR,
    borderLeftWidth: 1,
    marginTop: -CONTENT_OFFSET,
  },
  eventAllDay: {
    flex: 1,
    overflow: 'hidden',
    borderColor: GREY_COLOR,
    borderLeftWidth: 1,
  },
  events: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
});

export default styles;
