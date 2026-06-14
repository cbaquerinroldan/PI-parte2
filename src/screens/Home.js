import { auth, db } from "../firebase/config";
import { View, Text, FlatList, ActivityIndicator, StyleSheet} from "react-native"
import { useState, useEffect } from "react";
import Post from "../components/Post"



function Home(props) {
  const [posteo, setPosteo] = useState([])
  const [loading, setLoading] = useState(true)

  function mostrarPost() {
    db.collection('posts')
    .orderBy('createdAt', 'desc') 
    .onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setPosteo(posts)
        setLoading(false)
      }
    )

  }
  useEffect(() => {
    auth.onAuthStateChanged(user => {
        if (!user) {
            props.navigation.navigate("Login")
        }else {
            mostrarPost()
        }
    })
}, [])

 
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF7F1", paddingTop: 10 }}>
      <View style={styles.contenedorTitulo}>
      <Text style={styles.titulo}>Últimos posteos</Text>
    </View>

      {loading ? 
      <ActivityIndicator color="#ff9e80ff" size="large" /> : <FlatList
        data={posteo}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={props.navigation} />}
      />}
      

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7F1",
    paddingTop: 15
  },

  contenedorTitulo: {
    backgroundColor: "#FFE5DB",
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 8,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2B8A0"
  },

  titulo: {
    color: "#7A3E2B",
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default Home;