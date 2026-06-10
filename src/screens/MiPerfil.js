import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { db, auth } from "../firebase/config"
import Post from "../components/Post";


function MiPerfil({ navigation }) {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([])

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

     db.collection("posts")
        .where("Email", "==", auth.currentUser.email)
        .onSnapshot(docs => {
            let misPosts = []
            docs.forEach(doc => {
                misPosts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setPosts(misPosts)
        })}, []);



 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del usuario</Text>
      <Text>Usuario: {username}</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>Últimos posteos</Text>
      <FlatList 
          data={posts} 
          keyExtractor={item => item.id.toString()} 
          renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={navigation} />}/>
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