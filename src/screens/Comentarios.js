import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase/app";


function Comentarios(props) {
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);

  const idPosteo = props.route.params.id;

  useEffect(() => {
    db.collection("posts")
      .doc(idPosteo)
      .onSnapshot(doc => {
        setComentarios(doc.data().comentarios);
      });
  }, []);

  function agregarComentario() {
    db.collection("posts")
      .doc(idPosteo)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          email: auth.currentUser.email,
          texto: comentario,
          createdAt: Date.now(),
        }),
      })
      .then(() => {
        setComentario("");
      })
      .catch(error => console.log(error));
  }

  return (
    <View>
      <Text>Comentarios</Text>

      <TextInput
        value={comentario}
        onChangeText={text => setComentario(text)}
        placeholder="Escribí un comentario"
      />

      <Pressable onPress={agregarComentario}>
        <Text>Agregar comentario</Text>
      </Pressable>

      <FlatList
        data={comentarios}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.email}</Text>
            <Text>{item.texto}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Comentarios;