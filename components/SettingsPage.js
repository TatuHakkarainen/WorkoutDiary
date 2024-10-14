import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import { RadioButton, Text, useTheme } from 'react-native-paper';
import WorkoutContext from './WorkoutContext';
import { styles } from '../styles/Styles'; // Import styles

export default function SettingsPage() {
  const theme = useTheme();
  const { unit, setUnit } = useContext(WorkoutContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineLarge" style={[styles.header, { color: theme.colors.primary }]}>
        Settings
      </Text>

      <Text style={styles.text}>Select Unit:</Text>
      <RadioButton.Group onValueChange={setUnit} value={unit}>
        <View style={styles.radio}>
          <RadioButton value="km" />
          <Text>Kilometers</Text>
        </View>
        <View style={styles.radio}>
          <RadioButton value="miles" />
          <Text>Miles</Text>
        </View>
      </RadioButton.Group>
    </SafeAreaView>
  );
}
