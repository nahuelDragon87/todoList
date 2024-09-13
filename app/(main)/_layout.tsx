import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors[colorScheme ?? 'light'].tint,
        headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
      }}
    >
      {/* Primera pantalla en la pila */}
      <Stack.Screen
        name='index'
        options={{
          title: "TODO's",
          headerShown: true,
        }}
      />
    </Stack>
  );
}

