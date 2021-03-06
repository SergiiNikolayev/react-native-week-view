import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    alignItems: 'flex-start',
    position: 'absolute',
    borderRadius: 0,
    flex: 1,
    overflow: 'hidden',
  },
  descriptionTime: {
    marginVertical: 1,
    marginHorizontal: 2,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'left',
    fontSize: 13,
  },
  description: {
    marginVertical: 1,
    marginHorizontal: 2,
    color: '#fff',
    textAlign: 'left',
    fontSize: 13,
  },
});

export default styles;
