import { SafeAreaView, Alert, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useContext, useState } from 'react';
import WorkoutContext from '../context/WorkoutContext';
import { DatePickerModal } from 'react-native-paper-dates';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import vector icons
import { styles } from '../styles/Styles';

const sportOptions = [
  { label: 'Run', value: 'Run', icon: 'run' },
  { label: 'Skiing', value: 'Skiing', icon: 'ski' },
  { label: 'Swimming', value: 'Swimming', icon: 'swim' },
];

export default function AddWorkoutPage() {
  const [sport, setSport] = useState(sportOptions[0].value); // Default to the first sport
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const { workouts, setWorkouts, unit, convertDistance } = useContext(WorkoutContext);
  const theme = useTheme();

  const addWorkout = () => {
    let dist = parseFloat(distance);
    const dur = parseFloat(duration);

    if (isNaN(dist) || isNaN(dur) || dist <= 0 || dur <= 0) {
      Alert.alert('Invalid Input', 'Distance and duration must be positive numbers.');
      return;
    }

    if (unit === 'miles') {
      dist = convertDistance(dist, 'km');
    }

    const newWorkout = { sport, distance: dist, duration: dur, date: date.toDateString() };
    setWorkouts([...workouts, newWorkout]);

    Alert.alert('Success', 'Workout added successfully!');

    setSport(sportOptions[0].value);
    setDistance('');
    setDuration('');
    setDate(new Date());
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineLarge" style={[styles.header, { color: theme.colors.primary }]}>Add Workout</Text>

      <View style={styles.pickerContainer}>
        <Text variant="titleMedium">Select Sport</Text>
        <Picker
          selectedValue={sport}
          onValueChange={(itemValue) => setSport(itemValue)}
          style={styles.picker}
        >
          {sportOptions.map(option => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              icon={() => <MaterialCommunityIcons name={option.icon} size={20} />}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        label={`Distance (${unit === 'km' ? 'km' : 'miles'})`}
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
        style={styles.textInput}
      />
      <TextInput
        label="Duration (min)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        style={styles.textInput}
      />

      <Button mode="contained" onPress={() => setOpen(true)} style={styles.button}>
        Select Date
      </Button>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={() => setOpen(false)}
        date={date}
        onConfirm={(selectedDate) => {
          setDate(selectedDate.date);
          setOpen(false);
        }}
      />

      <Text variant="bodyMedium" style={{ marginVertical: 10 }}>
        Selected Date: {date.toDateString()}
      </Text>

      <Button mode="contained" onPress={addWorkout} style={styles.button}>
        Add Workout
      </Button>
    </SafeAreaView>
  );
}
