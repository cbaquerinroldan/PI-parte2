import { auth, db } from "../firebase/config";
import { Text, View, FlatList } from "react-native"
import { useState, useEffect } from "react";
import Post from "../Componetes/Post";


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
    mostrarPost();
  }, []);
  return (
    <View>
      <FlatList
        data={posteo}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Post data={item.data} />}
      />

    </View>
  );
}

export default Home;