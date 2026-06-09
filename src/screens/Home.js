import { auth, db } from "../firebase/config";
import { Text, View, FlatList, ActivityIndicator } from "react-native"
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
    <View>
      {loading ? 
      <ActivityIndicator color="blue" size="large" /> : <FlatList
        data={posteo}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={props.navigation} />}
      />}
      

    </View>
  );
}

export default Home;