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
        <View style={styles.perfil}>
      
      <Text style={styles.title}>Perfil del usuario</Text>
     <Text style={styles.label}>Usuario</Text>
      <Text style={styles.text}>{username}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.text}>{auth.currentUser?.email}</Text>
      </View>
      <Text style={styles.subtitulo}>Últimos posteos</Text>
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF7F1",
        padding: 20
    },

    perfil: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F2B8A0"
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ff9e80ff",
        marginBottom: 20
    },

    label: {
        fontSize: 14,
        color: "#7A3E2B",
        fontWeight: "600"
    },

    text: {
        fontSize: 18,
        color: "#4E342E",
        marginBottom: 15
    },

    subtitulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff9e80ff",
        marginBottom: 15
    },

    button: {
        backgroundColor: "#ff9e80ff",
        padding: 14,
        borderRadius: 12,
        marginTop: 20
    },

    buttonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "bold"
    }
});

export default MiPerfil;

