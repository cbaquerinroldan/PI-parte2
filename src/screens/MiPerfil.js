import { View, Text, Pressable, StyleSheet } from "react-native";

function MiPerfil({ navigation }) {

  function logout() {
    console.log("Usuario deslogueado");
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del usuario</Text>

      <Pressable style={styles.button} onPress={() => {
          logout(); 
          navigation.navigate("Login");
        }}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}

export default MiPerfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold"
  },

  button: {
    backgroundColor: "#dc3545",
    borderRadius: 6
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
});