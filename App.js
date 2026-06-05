
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./src/screens/Login"
import Register from "./src/screens/Register"
import Home from "./src/screens/Home"

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />    
      </Stack.Navigator>
    </NavigationContainer>
  );
}