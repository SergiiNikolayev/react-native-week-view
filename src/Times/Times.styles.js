import { StyleSheet } from 'react-native';
import { CONTAINER_HEIGHT } from '../utils';

const styles = StyleSheet.create({
  columnContainer: {
    paddingTop: 10,
    width: 80,
  },
  label: {
    flex: -1,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: CONTAINER_HEIGHT * 0.02,
  },
});

export default styles;
