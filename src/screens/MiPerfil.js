import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config"





function MiPerfil({ navigation }) {
  const [username, setUsername] = useState("");

  function logout() {
    auth.signOut()
  }

  useEffect(() => {
    db.collection("users")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot(docs => {

        docs.forEach(doc => {
          setUsername(doc.data().username);
        });
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del usuario</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>Usuario: {username}</Text>
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