import { SafeAreaView, FlatList } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useContext } from 'react';
import WorkoutContext from './WorkoutContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons
import { styles } from '../styles/Styles';

export default function WorkoutListPage() {
  const theme = useTheme();
  const { workouts, unit, convertDistance } = useContext(WorkoutContext);

  const totalDistances = workouts.reduce((acc, workout) => {
    acc[workout.sport] = (acc[workout.sport] || 0) + workout.distance;
    return acc;
  }, {});

  const getIconForSport = (sport) => {
    switch (sport) {
      case 'Run':
        return 'run';
      case 'Skiing':
        return 'ski';
      case 'Swimming':
        return 'swim';
      default:
        return 'help-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge" style={[styles.header, { color: theme.colors.primary }]}>
        Workout List
      </Text>
      {Object.entries(totalDistances).map(([sport, total]) => (
        <Text key={sport} style={styles.total}>
          Total {sport} Distance: {(unit === 'miles' ? convertDistance(total, 'miles') : total).toFixed(2)} {unit}
        </Text>
      ))}
      <FlatList
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={`${item.sport} (${item.date})`}
              left={() => <MaterialCommunityIcons name={getIconForSport(item.sport)} size={24} />}
            />
            <Card.Content>
              <Text>Distance: {(unit === 'miles' ? convertDistance(item.distance, 'miles') : item.distance).toFixed(2)} {unit}</Text>
              <Text>Duration: {item.duration} min</Text>
            </Card.Content>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}
