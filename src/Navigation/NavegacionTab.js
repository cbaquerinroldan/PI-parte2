import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import MiPerfil from '../screens/MiPerfil';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import CrearPost from '../screens/CrearPost';


const Tab = createBottomTabNavigator();

function NavegacionTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}
       options={{
        tabBarIcon: () => <Entypo name="home" size={24} color="black" />}}
        />
          <Tab.Screen name="Crear Post" component={CrearPost}
       options={{
        tabBarIcon: () => <FontAwesome5 name="plus-circle" size={24} color="black" />}}
        />
      <Tab.Screen name="Mi perfil" component={MiPerfil} options={{
        tabBarIcon: () => <FontAwesome5 name="user-alt" size={24} color="black" />
      }}
      />
    </Tab.Navigator>
  )
}
export default NavegacionTab;