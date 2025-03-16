import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure you have this installed
import Diseases from './Diseases'; // Ensure this path is correct
import Cataract from './Cataract';
import Chalazion from './Chalazion';  
import Hypopyon from './Hypopyon'; 
import Keratitis from './Keratitis'; 
import Pterygium from './Pterygium'; 
import Main from "./Main";
import Scan from "./Scan";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Diseases" component={Diseases} />
        <Stack.Screen name="Chalazion" component={Chalazion} />
        <Stack.Screen name="Cataract" component={Cataract} />
        <Stack.Screen name="Hypopyon" component={Hypopyon} />
        <Stack.Screen name="Keratitis" component={Keratitis} />
        <Stack.Screen name="Pterygium" component={Pterygium} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Main') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Scan') {
            iconName = focused ? 'scan' : 'scan-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000080',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: { backgroundColor: '#ADD8E6', borderTopColor: '#A7A59B', borderTopWidth: 1 },
      })}
    >
      <Tab.Screen name="Main" component={Main} options={{ title: 'Main' }} />
      <Tab.Screen name="Scan" component={Scan} options={{ title: 'Scan' }} />
    </Tab.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
