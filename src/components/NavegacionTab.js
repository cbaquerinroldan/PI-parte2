import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from "react-native";
import MiPerfil from '../screens/MiPerfil';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import NavegacionStack from "../components/NavegacionStack";

import CrearPost from '../screens/CrearPost';


const Tab = createBottomTabNavigator();

function NavegacionTab() {
  return (
    <Tab.Navigator style={styles.tabBar}>
      <Tab.Screen name="NavegacionStack" component={NavegacionStack}
       options={{
        tabBarIcon: () => <Entypo name="home" size={24} color="black" /> , headerShown: false, tabBarShowLabel:false}} 
        />
          <Tab.Screen name="Crear Post" component={CrearPost}
       options={{
        tabBarIcon: () => <FontAwesome5 name="plus-circle" size={24} color="black" /> , headerShown: false , tabBarShowLabel:false }}
        />
      <Tab.Screen name="Mi perfil" component={MiPerfil} options={{
        tabBarIcon: () => <FontAwesome5 name="user-alt" size={24} color="black" /> , headerShown: false , tabBarShowLabel:false
      }}
      />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        height: 60
    }
});
export default NavegacionTab;