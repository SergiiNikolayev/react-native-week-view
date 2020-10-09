import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  dateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dayOfTheWeek: {
    color: '#A3AAB2',
    fontSize: 13,
    marginBottom: 5,
  },
  monthDay: {
    fontSize: 11,
  },
});

export default styles;
