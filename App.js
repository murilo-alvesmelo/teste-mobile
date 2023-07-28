import { StatusBar } from 'expo-status-bar';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Home from './src/screens/Home';
import Info from './src/screens/InfoPropriedade';
import { LogBox } from 'react-native';
import Historico from './src/screens/Historico';
import Perfil from './src/screens/Perfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state. Check:',
  "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45."
])

const storeDataUser = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    console.log(e)
  }
};

const Tab = createBottomTabNavigator()

function HomeStackScreen(props) {
  useEffect(() => {
    storeDataUser(props.route.params)
  }, [])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#144369',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        tabBarStyle: {
          backgroundColor: '#144369',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home'
          } else if (route.name === 'Historico') {
            iconName = 'clock'
          } else if (route.name === 'Perfil') {
            iconName = 'user'
          }


          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name='Inicio' component={Home}
      />
      <Tab.Screen
        name='Historico' component={Historico}
      />
      <Tab.Screen
        name='Perfil' component={Perfil}
      />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Info' component={Info} />
        <Stack.Screen name='Home' component={HomeStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
