import { StatusBar } from 'expo-status-bar';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import { WorkoutProvider } from './context/WorkoutContext';
import AddWorkoutPage from './components/AddWorkoutPage';
import WorkoutListPage from './components/WorkoutListPage';
import SettingsPage from './components/SettingsPage';
import theme from './styles/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import vector icons

const routes = [
  { key: 'addworkout', title: 'Add Workout', focusedIcon: 'run' },
  { key: 'workoutlist', title: 'Workouts', focusedIcon: 'clipboard-list' },
  { key: 'settings', title: 'Settings', focusedIcon: 'cog' },
];

export default function App() {
  const [index, setIndex] = useState(0);

  const renderScene = BottomNavigation.SceneMap({
    addworkout: AddWorkoutPage,
    workoutlist: WorkoutListPage,
    settings: SettingsPage,
  });

  const getIcon = ({ route, focused }) => {
    let iconName;
    switch (route.key) {
      case 'addworkout':
        iconName = 'run'; // Use running icon from MaterialCommunityIcons
        break;
      case 'workoutlist':
        iconName = 'clipboard-list'; // Use list icon
        break;
      case 'settings':
        iconName = 'cog'; // Use settings icon
        break;
    }
    return (
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={focused ? theme.colors.primary : 'gray'}
      />
    );
  };

  return (
    <PaperProvider theme={theme}>
      <WorkoutProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderIcon={getIcon} // Custom icon render method
        />
        <StatusBar style="auto" />
      </WorkoutProvider>
    </PaperProvider>
  );
}
