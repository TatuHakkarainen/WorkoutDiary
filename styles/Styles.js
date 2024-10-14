import { StyleSheet } from 'react-native';
import { MD3LightTheme } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    background: '#f6f6f6',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  textInput: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
  pickerContainer: {
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  total: {
    marginVertical: 10,
    fontSize: 16,
  },
  card: {
    marginVertical: 10,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    marginVertical: 10,
    fontSize: 16,
  },
});

export default theme;
export { styles };
